---
slug: one-browser-session-for-measure-tools
title: "Why the measurement tools share one browser session instead of each launching their own"
authors: [jon]
tags: [architecture, conversion, site-converter, documentation]
date: 2026-09-30
description: "Ten tools in the measurement folder each launched their own browser. That left three ways of resolving chromium, two different browsers, and five different definitions of 'the page has settled' — so a number from one tool was not strictly comparable to a number from another, and nothing said so. The decision: merge the machinery into a shared lib, keep the tools."
---

**The question:** the measurement tools had grown to ten files. Were they duplicating each other, or
conflicting? And if so, should the overlapping ones be merged?

<!-- truncate -->

## Context

The folder holds one tool per question: probe an element, screenshot a region, audit a conversion
band by band, diff pixels, check container widths, run a fixed-metric parity table. The tools look
independent, and mostly are. What they shared was the plumbing underneath.

Counted rather than guessed: eight of the ten each ran their own `launch` → `newPage` → `goto` →
settle. Computed-style extraction existed in five. "Load the source and the build, then compare"
existed in five. Pixel diffing in two.

Duplication on its own is only untidy. Two findings made it a correctness problem:

- **They did not all drive the same browser.** Three tools used `playwright-core` with the system
  Chrome channel; two imported bundled Chromium; three resolved a driver through their own
  `createRequire` fallback chain. So a font size reported by one tool and a font size reported by
  another came from different rasterisers with different UA defaults. Nothing in the folder
  mentioned it.
- **Each carried its own idea of "settled."** The wait after navigation ranged from nothing at all
  to 2500ms, across five different policies. The same element could measure differently depending
  on which tool asked.

There was also a second-order cost, paid in a real session: a band-comparison tool aligns the two
documents by section index. When the converted page sat one header-height higher than its source,
the bands no longer lined up and the tool produced three convincing "defects" that did not exist.
Each tool carries its own alignment assumption, so a flaw in one is invisible to the rest — and
invisible to the person reading its output.

## Options considered

**Leave it.** The tools work, and the duplication is boilerplate rather than logic. But the browser
split is a silent comparability bug, and every new tool adds a ninth copy and a sixth settle policy.

**Merge the overlapping tools into fewer, bigger ones.** Tempting on a file count, wrong on the
substance: `probe` answering "what is this element's margin" and `section-audit` answering "which
band drifted" are genuinely different questions with different outputs. Collapsing them produces one
tool with a mode flag for every question, which is harder to use, not easier.

**Merge the machinery, keep the tools.** Extract the session and the element reader into a shared
`lib/`, leave each entry point alone.

## Decision

**Merge the machinery, keep the tools.** `lib/browser.mjs` owns the driver decision
(`playwright-core` + system Chrome, falling back to bundled, falling back to `PLAYWRIGHT_PATH`), one
settle policy, and the source-plus-build pair. `lib/elements.mjs` owns element selection — where
`--text` resolves to the *smallest* match, so a probe measures the leaf that carries the type rather
than the wrapper that contains it — plus rounding and the prop diff.

All eight browser-driving tools now import the session; none calls `launch` itself. The two pure
lenses stay untouched, because they are libraries already, not duplicated machinery.

The folder's guide gained the rule that makes it stick: **a new tool imports the session and does not
launch its own browser.** A tool with its own launch silently opts out of the shared browser, and its
numbers quietly stop being comparable to everything else.

## Why

The thing worth centralising was never the tools — it was the *definition of a measurement*. Which
browser, when the page counts as settled, which element a name resolves to, how a rect is rounded.
Those four answers are what make two numbers comparable, and they were being re-decided, slightly
differently, in every file.

Keeping the entry points separate preserves what was already right: each tool answers one question
and prints one shape of output. Merging them would have traded that for a flag-driven monolith while
leaving the actual defect — three browsers' worth of disagreement under the hood — exactly where it
was.

One incidental gain made the case concrete. Because the shared reader reports a document-relative
`y`, the very first run after the merge surfaced a vertical offset between source and build that the
old per-tool readers had never printed — the same class of gap that the band tool had previously
turned into three phantom findings.
