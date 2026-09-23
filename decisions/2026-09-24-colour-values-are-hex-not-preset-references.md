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

**Colour options keep a literal by default; they do not point at a Color Preset.**

:::danger[Superseded the same day — see *Correction* below]
This half of the decision was **wrong**. An emitted colour that matches a palette entry now **does** bind to
that preset. The reasoning that follows is kept as written, because the way it fails is the useful part.
:::

The tempting version of
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

## Correction — the binding is provenance, not coincidence

*Added the same day, after the question was pushed back on.*

The argument above rests on the word **coincidence**, and that word does not survive contact with how the
palette is built. The converter **derives the palette from the source**: `Ink` *is* the body ink it measured,
`Primary` *is* the brand colour it found. So when a converted heading carries that same ink, the two are not
two things that happen to be equal — they are **one thing the converter wrote down twice**. Binding
re-attaches a value to the role the converter itself assigned moments earlier. That is provenance, not a
guess.

What the original reasoning got right is narrower than it claimed: binding a colour to a preset *it was not
derived from* would indeed be a guess. The rule as shipped only binds an **exact** match, so that case cannot
arise.

And the cost of not binding was concrete. The generated palette was **decorative**: a converted site had an
`Ink` entry holding `#f5f5f5`, a heading rendering `#f5f5f5`, and nothing connecting them. Editing `Ink` in
Theme Settings moved nothing. For a conversion — where the whole palette exists *because* of the source —
that is the wrong default.

### The revised rule

**A colour that exactly matches a palette entry is stored as a preset reference. A colour with no entry stays
a literal** — the deliberately-unique colour, which should not be forced into a role, nor should a one-off
preset be invented for it.

Four guards make it safe, and each is load-bearing:

- The `predefined` half stores a **prefixed class** (`text-ink`, `bg-ink`), emitted verbatim by the consumer —
  so the wrong prefix paints the wrong CSS property. Only fields whose kind is unambiguous bind.
- The halves are **mutually exclusive** (the preset wins), so binding **clears** `custom`; a literal left
  beside it would be a lie about what renders.
- Only an **opaque** match binds — a translucent value has no preset form. (The hex decision above is what
  makes matching possible at all: two spellings of one colour could never have matched as strings.)
- The palette itself is never rewritten to reference itself.

### The bug underneath it

Binding turned out to be **inert**, which only a browser measurement revealed: with the heading bound to
`Ink`, changing `Ink` to `#ff8800` left it rendering `#f5f5f5`. The section styler was emitting

```css
#hero h1:not([class*="boxp-"] *) { color: rgb(245,245,245) !important }
```

from the **same measurement** the heading node reads for its own Title Colour — one property written from two
places, and this one, an ID selector with `!important`, outranks both the option's output and the palette
class. The section rule now keeps the type it alone can carry (face, size, weight, tracking, case) and leaves
the colour to the heading.

That fix is worth more than the binding it unblocked, because it was never about presets: **the Title Colour
field in the builder was inert on every converted heading.** You could change it and the page would not move.
A duplicate writer for one property is not a style choice — it silently disables the control the user is
given.

### What still isn't done

Binding on the **source's own semantic tokens** — `text-primary`, `var(--foreground)` — rather than on the
resolved value. That signal is stronger still: it distinguishes "this colour is the brand ink" from "this
colour currently equals the brand ink". It remains future work; exact-value binding is the honest
approximation until then.
