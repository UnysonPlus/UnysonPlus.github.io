---
slug: converted-presets-on-top-keep-defaults
title: "When the converter derives a site's Box Presets, do we replace the built-in defaults or keep them?"
authors: [jon]
tags: [conversion, extensions, option-types]
date: 2026-08-22
description: "The Site Converter now distils a source into a full Box Preset library (every card/panel/chip/pill skin, with fill + hover). The question: should those site-derived presets REPLACE the plugin's built-in defaults (Card / Outline / Soft Shadow / Hover Lift), or sit alongside them? We keep the defaults but PREPEND the converted presets — the converted design system is primary (picked first, and what elements reference), while the generic defaults remain as a fallback for elements the source never had."
---

**The question:** After the Site Converter walks a source and clusters every box skin into on-brand Box
Presets, what happens to the plugin's four built-in defaults (Card / Outline / Soft Shadow / Hover Lift)?
Do the site-derived presets **replace** them, or do both coexist — and if both, in what order?

<!-- truncate -->

## Context

The theme-settings importer **replaces** the whole `border_presets` option (it doesn't merge), so whatever
the converter emits is the entire library the converted site ships with. That forces an explicit choice —
the emitted list has to *deliberately* contain the defaults, or they're gone. Two things pull in opposite
directions:

- The **converted presets are the site's design system.** On a faithful clone, "Feature Card", "Glass Stat
  Box", and "Problem Card" ARE the site's boxes; they're what every converted element references
  (`box_style` / `border_preset` = `boxp-<slug>`), and what a user should reach for first when adding a new
  card that matches the design.
- The **defaults are still useful.** A user who later adds an element the *source never had* (a plain
  bordered callout, a soft-shadow panel) wants a sensible generic starting point without hand-rolling one.
  And removing a built-in that some element or template already references would break it.

## Options considered

- **Replace the defaults with the converted presets.** Cleanest "this is your site" list — no generic noise.
  *Trade-off:* destructive. Any element/template pointing at a default `.boxp-card` / `.boxp-outline` loses
  its styling, and a user adding a non-source element has nothing generic to grab. Deleting built-ins that a
  store REPLACES (not merges) is a one-way loss.
- **Keep defaults first, converted appended after** (the original behaviour). Non-destructive, but the
  site-matching presets sit *below* four generic ones the user has to scroll past — the converted design
  system reads as secondary to boilerplate.
- **Keep defaults, PREPEND the converted presets** (chosen). Non-destructive AND the converted design system
  is primary.

## Decision

**Keep the built-in defaults, but put the converted presets ON TOP** — `array_merge( $derived, $defaults )`
(PHP) / `derived.concat(DEFAULTS)` (JS). The site-derived presets are what the user sees and selects first,
and what the converter assigns; the four generic defaults remain available below as a fallback. Same
ordering rule applies to the sibling preset families (section styles, buttons, icon badges) so the whole
Theme Settings → Components experience is "your site's stuff first, library defaults below".

## Why

The right axis is **primacy, not exclusivity.** The converted presets earn top billing because they're the
actual design system — but *removing* the defaults trades a real safety property (nothing that references a
built-in can break; there's always a generic starting point) for a purely cosmetic tidiness that the
ordering already delivers. Prepending gets the "this is your site" feel with none of the destructive risk,
and it's the same "your items first, library below" pattern users already know from every other picker in
the product. When in doubt between destructive-and-clean vs non-destructive-and-ordered, non-destructive
wins — you can always ignore a default, but you can't un-break a reference to a deleted one.
