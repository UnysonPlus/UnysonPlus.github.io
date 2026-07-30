---
slug: converter-first-fix-the-algorithm-not-the-output
title: "Converting a site: fix the converter's algorithm, not the output"
authors: [jon]
tags: [conversion, architecture]
date: 2026-07-31
description: "When an AI reproduces a source site and finds the converted output wrong, does it hand-patch that one site's CSS/options, or improve the deterministic Site Converter so it emits the fix itself? We chose the latter, enforced by a region-by-region loop that re-runs the converter to verify each fix — because the converter, not the page, is the product."
---

**The question:** while reproducing a source site, the converted output had many small misses (a
button missing its `shadow-lg`, a pill rendered as a plain `<span>`, borders and paddings off). The
fast instinct is to hand-fix that one site — nudge `misc_custom_css`, tweak a preset value — until it
matches. But should the AI hand-patch the output, or should every fix go into the **deterministic Site
Converter** so it produces the correct result on its own?

<!-- truncate -->

## Context
The Site Converter has two front-ends over one deterministic engine: the **capture service** (URL → JS
`capture-extract`/`to-pages`) and the **extension** (HTML upload → PHP `Mapper`/`Stitch`). Its promise is
that it converts a source into a UnysonPlus site — child theme, header, footer, sections — **with no AI at
runtime**.

In one build we ran only the capture service, then hand-authored the page tree and matched the source by
measuring one computed property at a time, iterating dozens of times and fixing each miss directly in the
site's database. The page ended up correct, but the effort produced **nothing reusable**: the next site
would need the same manual grind, and the converter was no smarter for it.

## Options considered
1. **Hand-fix the output per site.** Fast for a single page; the AI patches CSS/options until it matches.
   But it burns tokens that buy nothing for the next conversion, and it never proves — or improves — the
   product's core claim (converts without AI). Each site restarts from zero.
2. **Fix the converter's algorithm, verified by re-running it (chosen).** Every deterministically-expressible
   miss becomes an improvement to the JS **and** PHP paths; the converter is then re-run **for that region
   only** and re-measured to confirm the fix came out of the deterministic pass. Genuine judgment calls that
   can't be derived from the source are escalated, and if no rule emerges they're waived as tracked
   "AI-only residuals."

## Decision
**Fix the algorithm, not the output**, run as a region-by-region loop (header → footer → each section):
run the converter for everything first; measure a region against the source; for each diff, either improve
the converter and re-run that region until it passes, or escalate/waive if it's truly AI-only; never
hand-patch the site's output to make one page pass. The allowed-fix test is *"does the next site get this
for free?"* — a framework/shortcode fix (e.g. the `:where()` button-preset override) qualifies; a
site-specific DB patch does not. Prerequisites: the converter must support **per-region re-runs** so the
loop is cheap, and every waiver is logged to a known-limitations ledger.

## Why
The converter — not any individual page — is the product, for two reasons in priority order: **(1) tokens** —
the deterministic pass does the bulk once and every future site reuses each algorithm improvement, whereas
per-site hand-matching is O(sites) manual work; **(2) marketability** — a converter that needs an AI to
finish each site isn't sellable, one that converts perfectly on its own is, and each deterministic win is a
selling point. The more intelligent the deterministic engine becomes, the more tokens saved and the stronger
the pitch. The re-run-to-verify step is what keeps it honest: a fix only counts when the converter itself
emits it. Operational detail lives in the site-build protocol as **Rule −1 (converter-first region loop)**.
