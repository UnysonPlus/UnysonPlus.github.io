---
slug: animated-heading-vs-engine-text-effects
title: "Is the Animated Heading shortcode redundant now that the Animation Engine has text effects?"
authors: [jon]
tags: [shortcodes, architecture, back-compat]
date: 2026-07-24
description: The Animation Engine's Text Effects already include rotating_words and typewriter, so the standalone Animated Heading shortcode looked like a duplicate. It was kept (and enriched) rather than folded into the engine, because the engine ships inactive by default — the shortcode is the only rotating headline that works out of the box.
---

**The question:** The Animation Engine → Text Effects module already ships `rotating_words`
and `typewriter` (among ~40 effects) that can be applied to any text element. Does the
standalone `animated_heading` shortcode still earn its place, or should it be deprecated in
favor of "special_heading + a text effect"?

<!-- truncate -->

## Context

`animated_heading` is a purpose-built rotating headline: before-text + rotating words +
after-text, with 6 rotation styles, a word-highlight, speed and colors — ~86 lines of
self-contained JS, no dependency. The Animation Engine's Text Effects cover the same two
*concepts* (typewriter, rotating words) plus 38 more, applied to any element's own text via a
`text_effect` option. On paper that's duplication.

## Options considered

- **Deprecate the shortcode** — steer users to `special_heading` + `text_effect: rotating_words`.
  One implementation, but it *requires the Animation Engine to be active* — and the engine ships
  **inactive by default** (opt-in in Extensions). Out-of-box rotating headlines would break.
- **Make the shortcode delegate to the engine when active** — a hybrid renderer. Adds a hard
  dependency branch and loses the no-engine fallback that is the shortcode's whole value; the
  engine effect also expects the element's own text, not a before/words/after split.
- **Keep it standalone, clarify positioning, and enrich it** *(chosen)* — accept the small,
  intentional overlap; make the two easy to tell apart in the UI/docs; and deepen the shortcode
  so it's clearly the better tool for its one job.

## Decision

Keep `animated_heading` as a **zero-dependency rotating headline**, distinct from the engine.
Its Animation picker now cross-references the Text Effects (and warns against stacking both),
and the shortcode gained playback controls (loop once / pause on hover / randomize), typewriter
caret controls, two rotation styles (blur, 3D-rotate) and two highlight styles (gradient, pill).

## Why

The deciding fact is that the **Animation Engine is opt-in and off by default** — a deliberate
choice so the base plugin stays lean. That makes the shortcode the *only* rotating headline that
works without asking the user to activate an extension, which is exactly the moment a beginner
reaches for one. Beyond that, the two serve different mental models — "drop a rotating-headline
element" vs. "sprinkle an effect onto any text" — and the shortcode's headline-specific options
(before/after static text, per-word highlight, purpose-built rotation styles) are richer for
that narrow job than the generic `rotating_words` effect. Folding it into the engine would trade
a tiny amount of duplicated code for a worse out-of-box experience and a new dependency. The
overlap is acceptable; the fix was positioning and depth, not consolidation.
