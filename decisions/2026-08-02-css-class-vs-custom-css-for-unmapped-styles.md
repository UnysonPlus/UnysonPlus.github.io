---
slug: css-class-vs-custom-css-for-unmapped-styles
title: "Unmapped styles: carry the source CSS class, or synthesize Custom CSS?"
authors: [jon]
tags: [conversion, architecture]
date: 2026-08-02
description: "For a decomposed element's styling that has no native shortcode option, should the converter just drop the source's utility class into the Advanced → CSS Class field (letting it resolve via the section's carried CSS), or synthesize Custom CSS from the computed value? The tempting 'just use the CSS class' answer breaks on WP's class sanitizer, spacing collisions, and preset specificity — so we settled on a 3-tier fallback with CSS Class as the default middle tier and computed-value Custom CSS as the mandatory safety net."
---

**The question:** a decomposed element carries styling a shortcode has no option for (a heading's
`font-extrabold leading-[1.1]`, a paragraph's `md:text-xl text-foreground/70`). The Special Heading
shortcode — and every shortcode's Advanced tab — has a **CSS Class** field. Rather than synthesizing
Custom CSS for each effect, why not just put the source's own utility classes in that field and let the
**section's carried CSS** render them? Isn't that cleaner and more editable?

<!-- truncate -->

## Context
We had just moved the heading translator to route source classes into the native Overline/Title/Subtitle
Class options (rather than per-effect Custom CSS), and it worked for the H1. The natural next step was to
generalize: "for anything that can't map to an option, just use the CSS Class." So we tried it on the
hero subtitle — routed its whole class list (`text-lg md:text-xl text-foreground/70 leading-relaxed`) into
`subtitle_class` and dropped the Custom CSS. It rendered **18px, fully opaque** — the source is **20px,
70% opacity**. Two of the three classes silently died.

The cause is three independent failure modes a plain carried class can't survive:

1. **WP's class sanitizer strips `:` `/` `[` `]`.** So `md:text-xl` → `mdtext-xl`, `text-foreground/70` →
   `text-foregroun`, `leading-[1.1]` → a broken token — none of which match the carried CSS's escaped
   selectors (`.md\:text-xl`, `.text-foreground\/70`, `.leading-\[1\.1\]`). Exactly the responsive /
   opacity / arbitrary classes we most need are the ones that get mangled.
2. **Spacing-utility name collisions.** `.px-8` / `.mb-6` collide 1:1 by name with the plugin's own
   `!important` utilities on a different scale (`--spacer-8` = 72px, not Tailwind's 32px), which win.
3. **Preset specificity.** A plain class is `(0,1,0)`; the display presets emit at `:root .display-N`
   `(0,2,0)` and beat it, so a carried `font-extrabold` / `leading-[1.1]` loses under a display heading.

## Options considered
1. **Just use the CSS Class field for everything unmapped.** *Pro:* cleanest, most editable, no synthetic
   CSS. *Con:* silently drops responsive/opacity/arbitrary classes (sanitizer), and quietly renders the
   wrong value under collisions/presets — the failures are invisible until measured.
2. **Always synthesize Custom CSS from computed values.** *Pro:* pixel-exact, wins with `!important`, no
   dependency on carried CSS or sanitizer. *Con:* opaque blobs in every element; nothing editable; can't
   represent responsive/hover states (computed is a single-width snapshot).
3. **A 3-tier fallback:** native option → CSS Class (for sanitizer-safe, non-colliding classes) →
   computed-value Custom CSS `!important` (for the residue).

## Decision
**Option 3.** Prefer the earliest tier that can carry the effect faithfully:

- **Tier 1 — native option** wherever one exists (size→`display_size`, colour→`title_color`, …).
- **Tier 2 — the CSS Class option**, but only for classes that are **sanitizer-safe** (no `:` `/` `[` `]`)
  **and non-colliding** (not a `p*/m*/gap/space` utility) **and** not out-specificity'd by a preset. These
  ride as the source's real class (editable) and resolve via the carried section CSS.
- **Tier 3 — Custom CSS `!important` with the COMPUTED value** — the only tier that survives all three
  failure modes, emitted just for what tiers 1–2 can't carry (mangled classes, collisions, preset
  overrides).

## Why
"Just use the CSS class" is the right *instinct* — a carried class is cleaner and more editable, so it
earns the default middle tier. But it can't be the whole answer, because the WP sanitizer, the plugin's
own spacing utilities, and preset specificity each silently defeat it on exactly the classes that matter
most. Custom CSS built from the resolved computed value is the one mechanism immune to all three, so it
stays as the mandatory safety net rather than a thing we're trying to eliminate. This composes with the
earlier computed-styles-first decision: computed values remain the source of truth for *correctness*; the
CSS Class field is how we hand that truth back to the user as an editable class *when the class can
actually win*. Verified end-to-end: hero H1 and subtitle both reproduce the source pixel-exact (72px/800/
lh72/mb24; 20px/lh28/70% opacity) with the safe classes on the class options and only the residue in
Custom CSS.
