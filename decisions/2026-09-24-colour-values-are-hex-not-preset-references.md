---
slug: colour-values-are-hex-not-preset-references
title: "Why a converted colour is stored as hex, and not as a Color Preset reference"
authors: [jon]
tags: [color, site-converter, architecture]
date: 2026-09-24
description: "A converted heading carried color: rgb(245, 245, 245) — a literal, in a format nothing else in the palette used. Two questions followed: should an opaque colour be normalised to hex, and should the value point at a Color Preset instead of carrying a colour at all? The answers are yes, and not by default."
---

**The question:** A converted `h1` rendered with an inline `color: rgb(245, 245, 245)`. Every entry in the
generated palette is hex. Should the converter normalise `rgb()` to hex — and beyond format, should the
option hold a **Color Preset reference** (`predefined: 'ink'`) rather than a literal colour at all?

<!-- truncate -->

## Context

A compact colour value has two slots: `predefined` (a Color Preset slug, rendered as `var(--color-{slug})`)
and `custom` (a literal, passed through verbatim). The converter's colour helpers always wrote `custom`, and
several paths wrote the source's computed string unchanged — so an opaque `rgb()` went in as `rgb()` while
the palette beside it was hex.

Three things made the inconsistency more than cosmetic:

- The Theme Settings colour **picker** round-trips hex. A value it cannot parse is a value the user cannot
  edit in the UI that owns it.
- The palette **de-dupe compares strings**, so `rgb(245, 245, 245)` and `#f5f5f5` read as two different
  colours: both survive, and neither matches the other for any future preset lookup.
- It was already inconsistent *within a single value* — one assertion in the golden suite compared an
  overline colour of `rgb(255, 45, 85)` against a subtitle colour of `#737373`, from the same heading.

## Options considered

**1. Leave it.** The browser renders `rgb()` and hex identically, so nothing is visibly wrong. Rejected: the
picker and the de-dupe both care, and "renders the same" is not the same as "is the same value".

**2. Normalise every colour to hex, including translucent ones.** Rejected: `#rrggbbaa` is valid CSS but the
picker does not round-trip it, so this would trade one uneditable format for another — and lose alpha on any
picker that truncates to six digits.

**3. Normalise opaque colours to hex; leave translucent as `rgba()`/`hsla()`.** Adopted.

**4. Bind the value to a Color Preset whenever the colour matches a palette entry.** Not adopted — see below.

## Decision

**An opaque colour is stored as hex. A translucent one keeps its `rgba()` / `hsla()` form.** Implemented in
`clean_color_value()` and `ink_value()` on the PHP side and `toHex()` in `to-presets.mjs` on the JS side, so
both paths agree.

**Colour options keep a literal by default; they do not point at a Color Preset.** The tempting version of
this — "if the measured colour equals a palette entry, reference the preset" — binds on a *coincidence of
value*, not on intent. The converter's palette roles (Ink, Primary, Muted) are **inferred** from the source,
so a wrong inference would then propagate to every element that happened to share the colour, and a later
palette edit would move headings the user never linked to it. A literal is trivially changed per element; a
binding is a global commitment made on the converter's behalf.

## Why

The honest signal for a preset reference is not "these two colours are equal" but "**the source itself said
this colour was semantic**" — it wrote `text-primary` or `var(--foreground)` rather than a literal. That
information exists in the capture (the class list and the extracted semantic tokens), so a future binding can
be made on the source's own intent instead of on a value match. Until that is built, a literal is the
truthful translation: the source wrote a colour, so the conversion carries a colour.

## Footnote — the bug this uncovered

Chasing the format question surfaced a real corruption. The JS preset builder mapped the palette entry named
**Black** to the site's ink when no `--dark` token existed:

```js
'Black': vars['--dark'] || colors.ink,
```

On a dark source the ink is near-white, so `Black` held `rgb(245, 245, 245)` and every `var(--color-black)`
reference — in the theme or in a user's own CSS — resolved to near-white. The PHP path never did this: it
gives the ink its own `Ink` role and leaves `Black` literal. The JS path now matches it.
