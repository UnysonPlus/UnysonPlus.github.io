---
slug: computed-styles-vs-exhaustive-tailwind-map
title: "Converter translation: computed styles first, or an exhaustive Tailwind class map?"
authors: [jon]
tags: [conversion, architecture]
date: 2026-07-31
description: "The Site Converter kept dropping styles (a section's top margin, an overline color, a section background). Should we enumerate Tailwind's entire official utility set and pre-map every class to a native option, or keep reading resolved computed styles and just capture more properties? We chose computed-first — because the misses were never missing MAP entries, they were missing CAPTURED properties — with the official Tailwind scales kept for two narrow jobs computed styles genuinely can't do."
---

**The question:** the converter kept producing sections with the wrong spacing, a missing overline
color, a dropped background. One proposed fix: extract **all of Tailwind's official utility classes**
(a finite, canonical set) and selectively pre-map each to a shortcode option, so coverage is
"complete" and we stop missing things. Is that the right primary mechanism, or a regression to
brittle class-name parsing?

<!-- truncate -->

## Context
The converter used to parse class **names** (`bg-pink-100/40`, `py-20`) and translate them. We moved
it to read each element's **computed styles** — the browser's *resolved* values — because that is
source-agnostic: it works whether the source is Tailwind, Bootstrap, hand-written CSS, CSS-modules with
hashed names, or inline styles, and it captures arbitrary values (`p-[37px]`, `text-[#ab12cd]`) for free.

The recurring bugs, examined honestly, were **not** missing map entries. The "section has no padding"
bug was a section that separated itself with `margin-top: 96px` (mt-24) while our capture read only
`padding` — so we mapped `padding_top: 0` and the 96px vanished. The fix was one line: **capture
`margin` too**, then fold it into the section's padding. That fix now works for every source, not just
ones that literally wrote `mt-24`. Earlier misses (overline color, section background) were the same
shape: a computed property we hadn't captured yet.

## Options considered
1. **Exhaustive official-Tailwind class dictionary as the primary translator.** Enumerate Tailwind's
   finite utility set, map each class → native option. *Pro:* feels complete. *Con:* only fires when
   the source is literally Tailwind; can't represent arbitrary `[…]` values (so you need value parsers
   anyway); and it duplicates, for the active state, what `getComputedStyle` already returns for any
   class. It doesn't add coverage where the pain actually was.
2. **Computed-styles-first, capture more properties as gaps appear.** Keep reading resolved values;
   each miss = "capture this one more property." *Pro:* source-agnostic, arbitrary values free, one-line
   fixes that generalize. *Con:* can't see what isn't active at the single capture width (responsive
   variants, hover/focus states).
3. **A hybrid** — computed-first, plus the canonical Tailwind scales kept for the narrow jobs option 2
   can't do.

## Decision
**Option 3, weighted to computed-first.**

- **Runtime primary: computed styles.** Every new miss is fixed by capturing the missing computed
  property once (as we did for `margin`), not by growing a class table.
- **Keep the official Tailwind scales for two narrow jobs computed styles genuinely can't do:**
  (a) **responsive/state variants** (`md:`, `lg:`, `hover:`, `focus:`) that are invisible at the single
  1440px capture snapshot — the class name against Tailwind's canonical table is the *only* way to
  recover those values; and (b) a **clean canonical value reference** (we already hardcode the max-w
  tiers; the spacing scale mirrors the plugin exactly). This is the documented **next build**, not yet
  shipped — it's additive and only matters once a target relies on breakpoint-specific values.
- **Build an official-utility TEST MATRIX** (shipped). It feeds every step of Tailwind's canonical
  spacing + max-width scales through the real `toPages()` pipeline and flags coverage gaps —
  ceiling clamps and coarse collisions — turning "discover a gap when the user is frustrated" into "a
  test sweep surfaces gaps up front." It already earned its keep: it confirmed the converter's spacing
  scale mirrors the plugin's Bootstrap-5 `$spacers` default exactly, including the native `1.5rem→3rem`
  gap, so Tailwind 24–48px paddings snapping with up to 12px error is a **plugin-scale** reality, not a
  converter defect.
- **Keep a small, curated *semantic* class map** — only for class names that carry intent a raw value
  can't recover (`space-y-*` → `element_spacing`, a pill overline, container tiers). A dozen patterns,
  grown deliberately, not thousands of utilities.

## Why
The failure mode was never "not enough class mappings" — it was **computed properties we forgot to
capture**. Making *that* exhaustive (and guarding it with a test matrix) fixes the actual class of bug,
generalizes to non-Tailwind sources, and handles arbitrary values, while a 1:1 dictionary of every
utility would be high-maintenance, brittle to any non-Tailwind source, and redundant with computed
styles for the common case. The one thing computed styles can't see — variants inactive at capture time
— is exactly, and only, where the canonical Tailwind tables stay useful.
