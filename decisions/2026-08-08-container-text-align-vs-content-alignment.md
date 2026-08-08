---
slug: container-text-align-vs-content-alignment
title: "Why section/column need a text_align option separate from content alignment (and why special_heading keeps its master alignment)"
authors: [jon]
tags: [page-builder, shortcodes, architecture]
date: 2026-08-08
description: A converted centered heading came out left-aligned because its centering lived on an intermediate wrapper (text-center max-w-2xl mx-auto), and the deterministic converter only read the h2's own classes. Fixing it raised a design question — should we drop special_heading's master Alignment now that we map alignment at the container level? We decided to add a text_align option to section and column (a genuinely different axis from the existing flexbox content-alignment), keep special_heading's master + per-element alignments, and treat alignment as a four-level Inherit cascade.
---

**The question:** When a converted `<div class="text-center max-w-2xl mx-auto"><h2>…</h2><p>…</p></div>`
comes out left-aligned, where does alignment belong? Should we add `text_align` to the column/section —
and if we do, is `special_heading`'s master **Alignment** option now redundant and safe to remove?

<!-- truncate -->

## Context

The deterministic Site Converter decomposes a source band into native shortcodes. A common source
pattern centers a heading intro on an **intermediate wrapper** — `text-center max-w-2xl mx-auto` — that
holds the `<h2>` and its subtitle `<p>`. The heading recognizer captured the **h2's own** classes
(`text-3xl md:text-4xl font-bold`), which carry no alignment, so the wrapper's `text-center` was dropped
and the heading rendered left. `special_heading` already has an `alignment` option and the mapper already
knew how to translate `text-center`/`max-w-*`/`mx-auto` — the classes just never reached it.

That surfaced the real question about layering. The column shortcode has a **content alignment**
(`content_h`/`content_v`) option, but that is flexbox cross/main-axis alignment (`align-items` /
`justify-content`) — it positions block children, it does **not** set `text-align`. `text-align` is a
separate, **inherited** CSS property. So a `text-center` wrapper holding *mixed* children (heading +
paragraph + buttons + stats) that decompose into sibling shortcodes could not be faithfully centered by
any existing option: `special_heading` can only center itself, and the column's content-alignment is the
wrong axis.

## Options considered

1. **Only fix the heading** (read the wrapper's classes into `special_heading`'s alignment). Fixes the
   reported case, but a centered wrapper with mixed content still can't center its non-heading siblings.
2. **Add container-level `text_align` and REMOVE `special_heading`'s master alignment** (treat the
   container as the single source of truth). Tempting — feels less redundant — but the master alignment is
   the only way to center *one* heading inside an otherwise-left column without moving its siblings, and
   removing a shipped option breaks stored values, presets, and Theme-Builder templates (needs a
   migration) for no real gain.
3. **Add container-level `text_align` AND keep all the heading alignments**, defaulting every level to
   Inherit so they cascade. (Chosen.)

## Decision

- **Add a `text_align` option to `section` and `column`**, reusing the *exact* `special_heading` alignment
  image-picker (Inherit / left / center / right swatches) for a consistent UI. Default `''` = Inherit
  (emits nothing) → purely additive, no migration, existing presets stay valid.
- **Keep `special_heading`'s master Alignment and the per-element (Overline/Title/Subtitle) alignments.**
- **Fix the heading wrapper-inheritance** in the converter so an intermediate `text-center`/`max-w-* mx-auto`
  wrapper's alignment + measure cascade onto the heading it flattens.
- The converter maps a source wrapper's `text-*` to the nearest container's `text_align` and leaves the
  heading master on Inherit, so headings cascade from the container.

Alignment is therefore a **four-level Inherit cascade**, each level overriding the one above:

```
Section text_align  →  Column text_align  →  Heading master Alignment  →  Overline/Title/Subtitle
```

## Why

- **`text_align` and content-alignment are different axes.** Flexbox `align-items`/`justify-content` cannot
  express inherited text centering; a mixed-content centered wrapper genuinely needs a container-level
  `text_align`. It's also a legitimately useful native option beyond the converter.
- **The master Alignment is an override, not a redundancy.** Container `text_align` centers *everything* in
  the container; the heading master lets one heading differ from its container without touching siblings.
  Because it defaults to Inherit and `text-align` inherits, a heading in a centered column auto-centers with
  the master untouched — and the master is still there when someone wants the override.
- **Removing a shipped option is a breaking change** (stored values, Preset Library, Theme-Builder
  templates, a schema migration) for no benefit, since the option isn't actually redundant.
- **Consistency:** the section/column picker reuses the special_heading swatches, so the whole alignment
  system looks and behaves the same everywhere.

A related cleanup shipped alongside: the converter no longer dumps inert Tailwind utility classes
(`text-3xl`, `font-bold`, mangled `md:text-4xl` / `text-foreground/70`) onto native heading parts — their
visual intent already rides the per-node computed base — while semantic accent utilities (`text-primary`)
and genuinely custom classes are preserved.
