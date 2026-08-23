---
slug: deterministic-style-classification-not-ai
title: "Should the converter use the local AI to pick a shortcode's style, or stay deterministic?"
authors: [jon]
tags: [conversion, architecture]
date: 2026-08-23
description: A FAQ accordion that was obviously a Separated card list converted as Flush. The tempting fix was to hand style classification to the local AI companion. We kept it deterministic instead — the signal is measurable in the source (per-item fill + radius + inter-item gap), the converter's contract is reproducibility, and the class-based fallback the detector was missing fixes it cleanly. The AI stays a last-resort verify pass for the genuinely ambiguous tail, which the capture service already wires as a hint.
---

**The question:** The deterministic converter classified a source FAQ accordion — clearly a *Separated* list of cards — as *Flush*. Should we fix the classifier, or let the local AI companion pick the closest style?

<!-- truncate -->

## Context

The source items were Radix accordion cards: `<div class="bg-card rounded-xl border border-border">` inside a `space-y-4` container. Unmistakably Separated (per-item fill + rounded corners + a border + vertical gaps). The converter emitted Flush.

Two real bugs, not a fuzzy judgment call:

1. **The detector read only computed styles** (`data-sc-cs`). On a class-based / raw-HTML source with no stamped computed styles, `background-color`, `border-radius` and `border-width` all read empty → no fill, no edge.
2. **`space-y-4` sets margin-*top* on children**, which neither the flex `gap` read nor the first item's `margin-bottom` can see → the inter-item gap read as 0.

Result: `gap < 4`, no bg, no edge → the Flush branch.

## Options considered

1. **Hand style classification to the local AI companion.** The capture service already builds an AI verify pass (`d._hint` carries the icon markup + item geometry), so extending it to "pick the closest accordion style" is easy.
2. **Fix the deterministic classifier** — read the Tailwind classes (`bg-*`, `rounded-*`, `border`, `space-y-*`/`gap-*`) as a fallback/complement to the computed reads.
3. **Both** — deterministic first, AI as a last-resort tie-breaker for the ambiguous tail.

## Decision

**Deterministic first (option 2), with the AI kept as the existing last-resort verify pass (the tail of option 3). Not AI-primary.**

The classifier now falls back to the item card's + container's utility classes: a non-transparent `bg-*` ⇒ has-fill; `rounded-*` ⇒ radius (xl→12, 2xl→16…); `border`/`border-*` ⇒ an edge; `space-y-N`/`gap-N` on the container (or `mb-N` on the item) ⇒ the inter-item gap; `divide-y` ⇒ a flush divider list. The FAQ now classifies as Separated with `corner_radius: md` and `item_spacing: mb-[16px]`. Both the PHP and JS paths carry the fallback.

## Why

- **Reproducibility is the converter's contract.** Same source → same output, every run. AI style-picking is non-deterministic; the same accordion could map to different styles across runs, which breaks the one guarantee the deterministic path exists to provide.
- **The signal is measurable, not ambiguous.** `bg-card rounded-xl border` in a `space-y-4` container *is* Separated — the CSS/classes encode it exactly. Reaching for an LLM to read a class list is a sledgehammer where a `strpos` suffices, and it adds a per-widget round-trip plus cost.
- **The converter must work with the AI off.** The local companion auto-detects a backend (API key → `claude` CLI → off); a core mapping decision can't depend on a backend that may be absent (headless/cron runs especially).
- **AI earns its place on the genuine tail.** A bespoke accordion with no clear style signals is where a verify pass helps — and the capture service already emits `_hint` for exactly that. Deterministic gets it right for the 95% that is measurable; AI confirms/corrects the ambiguous 5%. That division keeps the common case fast, free, and reproducible.

The broader principle: **push the deterministic detector as far as the source's measurable signal allows before delegating to AI.** Most "the converter guessed wrong" cases are a missing measurement (here, classes + `space-y`), not a case that needs judgment.

*Status: Accepted.*
