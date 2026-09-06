---
slug: glass-and-flex-basis-native-options
title: "Why glass (backdrop-blur) and flex-basis/min-width became native shortcode options + a theme token"
authors: [jon]
tags: [conversion, shortcodes, option-types]
date: 2026-09-06
description: "Auditing ~65 AI-generated demo sites (openhero.art) surfaced two recurring patterns the converter could only reproduce indirectly: frosted-glass cards (backdrop-filter) and `flex: 1 1 <basis>` card grids that wrap on a min-width. The question was whether to add native Section/Flexbox options and a global theme token for these, or keep leaning on box presets + scoped custom CSS. The decision: add native `backdrop_blur` (Section + Flexbox), `flex_basis` + `min_width` (Flexbox cells), and a site-wide Glass Surface design token (`--glass-*` + `.glass-surface`)."
---

**The question:** Across the openhero.art demo sites the same two patterns kept appearing — **frosted-glass panels** (`backdrop-filter: blur()` over a translucent fill) and **card grids that grow from a basis and wrap on a min-width** (`flex: 1 1 300px; min-width: 280px`). The converter could already *approximate* both (glass via a box preset's computed skin; wrapping via a hard Width Override). Do we need to give Flexbox / Section / Div native options for these — and a Theme Settings token for glass — or is the indirect path enough?

<!-- truncate -->

## Context

Two gaps showed up section-by-section:

- **Glass.** The mapper already carries a card's `backdrop-filter` into its **box-preset CSS**, so a glass *card* converts. But there was no way to put glass on a **Section band** (an overlapping/sticky translucent band over an image), and no editor-facing control at all — glass was an emergent property of a preset, not a thing you could turn on.
- **Flex sizing.** Flexbox cells had only a **Width Override**, which emits `flex: 0 0 <v>` — a *hard* size. The common responsive-card pattern is a *soft* size: a starting `flex-basis` the cell can grow past, plus a `min-width` that forces a clean wrap. Expressing it meant fighting the Width Override's `!important` fixed basis, and the converter had to fall back to scoped custom CSS per cell.

Custom CSS is the escape hatch we keep trying to shrink: it's invisible in the editor, brittle (the `selector{}` comma/`#` hazards), and it means the converted page can't be *edited* the way a native option can.

## Options considered

- **Add native options + a global token.** `backdrop_blur` on Section and Flexbox; `flex_basis` + `min_width` on Flexbox cells; a site-wide **Glass Surface** token (`--glass-blur/-bg/-border/-radius/-shadow` + a `.glass-surface` utility) so every glass panel tracks one definition. *Pro:* the patterns become first-class, editable, and the converter sets a real option instead of emitting custom CSS; one place tunes all glass. *Con:* more surface area on core shortcodes used by every install.
- **Keep leaning on box presets + scoped custom CSS.** *Pro:* no new options. *Con:* glass stays un-editable and section-glass stays impossible; the soft-flex pattern stays a custom-CSS special case fighting the hard Width Override.
- **Full Theme Settings "Glass" component with a preset library.** *Pro:* richest UI. *Con:* disproportionate — it drags in the Preset Library sync obligations for a single token, when what's wanted is one shared definition, not a library.

## Decision

Add the **native options** and ship the glass token as a **theme design token**, not a Theme Settings component:

- `backdrop_blur` (unit-input, px/rem) on **Section** and **Flexbox** — emits `backdrop-filter` (+ `-webkit-`), scoped to the box on Flexbox, inline on Section.
- `flex_basis` and `min_width` (responsive unit-inputs) on **Flexbox cells** — scoped rules on the cell's `fx-*` class, composing with `flex_grow` / `no_shrink` for the `flex: 1 1 300px` + `min-width` wrapping pattern.
- A **Glass Surface token**: `--glass-*` defaults in the theme (`theme-vars.php` + `style.css` fallback) and a `.glass-surface` utility guarded by `@supports (backdrop-filter)`.

The converter's glass **card** path stays on box presets (battle-tested); the native options cover Section bands + manual authoring, and the flex options replace per-cell custom CSS.

## Why

- **A recurring source pattern deserves a native option, not a custom-CSS special case.** These showed up on dozens of sites, not one — that's the bar for promoting a pattern into the option surface, and it makes the converted page editable afterward.
- **`flex-basis` ≠ Width Override.** They are genuinely different intents (soft starting size vs. hard fixed size); folding one into the other is what forced the custom-CSS workaround. Separate options keep both intents expressible and composable.
- **A design *token* is the right size for "glass," a component is not.** The value people want is *one shared definition every glass panel follows* — exactly what a CSS custom-property token gives — without the preset-library machinery a full Theme Settings component would pull in.
- **Backdrop-filter degrades safely.** The `@supports` guard means browsers without it just show the solid-ish fill, so the token can't break a layout.
