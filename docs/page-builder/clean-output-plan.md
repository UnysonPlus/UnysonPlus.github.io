---
title: "Clean flexbox output"
slug: /page-builder/clean-output-plan
sidebar_position: 9
description: "How the flexbox Div emits clean output — shared frontend-grid.css classes for every preset, and one consolidated footer stylesheet for the long tail, instead of a <style> block glued to each element (the Elementor / Bricks / Divi model)."
keywords:
  - unysonplus clean html output
  - flexbox utility classes
  - frontend-grid css
  - no inline styles page builder
---

# Clean flexbox output

The flexbox **Div** emits output as clean as the classic Bootstrap grid: **shared, cacheable
classes** for everything a preset can express, and — for the rare value no class can — **one
consolidated `<style>` per page** keyed to the element's id-class, never a `<style>` block glued to
each element. This is the model Elementor, Bricks and Divi all converged on, and it's what ships
today.

:::tip[Status: shipped]
All four phases below are live. A page built from the pickers emits **zero** per-element `<style>`;
only a hand-typed off-grid value adds a single small rule to the page's one consolidated block.
:::

## The problem it replaced

A six-column grid used to render a scoped `<style>` block before **every** cell:

```html
<div class="fw-flexbox fx-parent fw-grid" style="display:grid;grid-template-columns:repeat(6,…);">
  <style>.fx-a{flex:0 0 16.66% !important;max-width:16.66% !important;}</style>
  <div class="fw-flexbox fx-a fw-flex …"><p>Test</p></div>
  … ×6
</div>
```

Per-element `<style>` blocks (none cacheable), and a width that was redundant anyway — the grid
tracks already size the cells.

## The rule

> A **preset** is a shared class. The **long tail** (a hand-typed value, a per-device override,
> min-height, gap) goes into **one** consolidated stylesheet per page — never a `<style>` block per
> element, and never an inline `style` width.

## The class vocabulary

All shared, defined once in `frontend-grid.css` (the `builder` extension's Bootstrap-style layer):

| Width kind | Class | Notes |
|---|---|---|
| Twelfths (1/2, 1/3, 2/3, 5/12…) | `fw-span-1 … fw-span-11` | already existed; gap-aware in flex, `grid-column: span N` in a grid |
| Fifths (1/5–4/5) | `fw-fifth-1 … fw-fifth-4` | by numerator (20/40/60/80%); base + `-md-` + `-lg-` responsive |
| Content-sizing | `fw-w-fit` / `fw-w-max` / `fw-w-min` | `fit-content` / `max-content` / `min-content` |
| Grid row (equal, 1–12 cols) | `fw-grid-N` on the parent | sets `grid-template-columns: repeat(N, minmax(0,1fr))`; children carry **no** width |
| Responsive collapse | `fw-grid-collapse` / `fw-grid-collapse-1` / `fw-collapse` | 2 cols on tablet, 1 on phone |

Because a fifth/twelfth is a class, the width **stepper shows the fraction** (`1/6`, `2/5`) rather
than a raw percentage.

:::note[Why not one 60-base span vocabulary?]
An earlier sketch unified twelfths and fifths as one `fw-col-N` span out of 60 (LCM of 12 and 5).
We didn't ship that: **`fw-col-N` is already the 12-based Bootstrap column class**, so it would
collide. Twelfths keep `fw-span-*`; fifths get their own `fw-fifth-*`. Same result, no clash.
:::

## Grid rows carry no cell width

A Grid Div puts the layout on the **parent** — `fw-grid-6`, or a 12-track `fw-grid-12` for an
uneven split whose cells keep their `fw-span-*` (which a grid reads as `grid-column: span N`). The
**children carry no width at all**; the tracks size them. This holds for **existing** pages too:
when a cell's parent is a grid, the view drops the cell's stored width at render — so old grids
clean up with **no data migration**.

```html
<div class="fw-flexbox fx-… fw-grid fw-grid-6 fw-grid-collapse">
  <div class="fw-flexbox fx-… fw-flex fw-collapse"><p>Test</p></div>  ×6
</div>
```

## The long tail — one consolidated stylesheet

A value no class can express — a hand-typed `37.3%` or `220px`, a per-device custom width,
min-height, a row/column-gap override — is collected across the whole page into **one** `<style
id="fw-flex-inline-css">` printed in the footer, keyed to each element's `.fx-<id>`:

```html
<!-- in the footer, once per page -->
<style id="fw-flex-inline-css">
  .fx-9785ac49{flex:0 0 37.3% !important;max-width:37.3% !important;}
  .fx-4f472d6c{flex:0 0 62.7% !important;max-width:62.7% !important;}
</style>
```

That's exactly how Elementor (`post-<id>.css`), Bricks and Divi deliver instance CSS — an id-class
hook plus one generated sheet — so an off-grid value stays **exact** (no snapping) while the DOM
stays clean. (If a render happens after the footer has already fired — a late/AJAX partial — it
falls back to printing that one rule inline, so CSS is never lost.)

## Legacy pages: fractions snap to classes

A page built before these classes existed stored fifths/twelfths as custom percentages. On render,
an exact fraction stored as a custom `%` (`20%`, `16.66%`, …) **snaps to its shared class** —
identical width, clean output, no data change. Only a genuinely off-grid custom value takes the
consolidated-stylesheet path.

## The four phases (all shipped)

1. ✅ **Grid-template classes + bare cells** — `fw-grid-N` on the parent; grid cells drop their width
   at render. Existing grids clean up, no migration.
2. ✅ **Fifths as classes** — `fw-fifth-1…4` (base/tablet/desktop); the Insert Grid stores the fifth
   preset, and legacy custom `%` snaps to the class.
3. ✅ **Content-sizing as classes** — `fw-w-fit` / `fw-w-max` / `fw-w-min`.
4. ✅ **Consolidated long-tail stylesheet** — one footer `<style>` keyed to `.fx-<id>` for every
   remaining bespoke rule, replacing the per-element blocks.

The result: a lean, semantic DOM served by a **shared, cached** stylesheet plus one small per-page
block — the classic grid's promise, kept.
