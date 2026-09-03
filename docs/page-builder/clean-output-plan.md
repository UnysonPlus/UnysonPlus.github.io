---
title: "Plan: clean flexbox output"
slug: /page-builder/clean-output-plan
sidebar_position: 9
description: "The plan for making the flexbox Div emit only shared utility classes — no style attributes, no per-element <style> blocks. A 60-base span-class system plus grid-template classes, exactly like the Bootstrap grid."
keywords:
  - unysonplus clean html output
  - flexbox utility classes
  - frontend-grid css
  - no inline styles page builder
---

# Plan: clean flexbox output

The flexbox **Div** should emit output as clean as the classic Bootstrap grid — **only shared,
cacheable utility classes.** No `style` attributes, no per-element `<style>` blocks. Today it does
this for twelfths and falls back to per-element CSS for everything else. This is the plan to close
that gap.

## The rule

> **Every width is a class.** No `style=""`, no `<style>` block, ever. If a value has no matching
> class, the control **snaps** it to the nearest one — it never falls back to inline CSS.

That's the Bootstrap contract (`col-md-6` is a class, full stop), applied to the Div's whole width
vocabulary.

## The problem, concretely

A six-column grid renders like this today — a scoped `<style>` block before **every** cell:

```html
<div class="fw-flexbox fx-parent fw-grid" style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));">
  <style>.fx-a{flex:0 0 16.66% !important;max-width:16.66% !important;}</style>
  <div class="fw-flexbox fx-a fw-flex …"><p>Test</p></div>
  … ×6
</div>
```

Two problems: (1) per-element `<style>` blocks, none cacheable; (2) the widths are redundant — the
grid tracks already size the cells.

## Why it happens

There **is** a Bootstrap-style shared-class layer — `frontend-grid.css` in the `builder` extension.
It already carries `fw-span-1…12` (twelfths), `fw-flex-*` / `fw-justify-*` / gap utilities, and the
`fw-grid-collapse` / `fw-collapse` responsive classes. So twelfths, container props, and collapse
are **already clean shared classes.** The bloat is the widths with **no class**: fifths, grid-cell
percentages, content-sizing, and arbitrary custom values.

## The class vocabulary

Two families of shared class, both defined once in `frontend-grid.css`.

### 1. Span classes — `fw-col-N`, base 60

**LCM(12, 5) = 60**, so every twelfth *and* every fifth is an exact integer span of 60 — one
vocabulary covers both, with no percentages:

| Fraction | class | | Fraction | class |
|---|---|---|---|---|
| 1/12 | `fw-col-5` | | 1/5 | `fw-col-12` |
| 1/6 | `fw-col-10` | | 2/5 | `fw-col-24` |
| 1/4 | `fw-col-15` | | 3/5 | `fw-col-36` |
| 1/3 | `fw-col-20` | | 4/5 | `fw-col-48` |
| 1/2 | `fw-col-30` | | 2/3 | `fw-col-40` |

Each class works in **both** contexts (extending the existing `fw-span-*` mechanism):

```css
.fw-flex > .fw-col-24{ flex:0 0 auto; width:calc(40% - var(--fw-flex-gap,0px)) }  /* flex: gap-aware width */
.fw-grid > .fw-col-24{ grid-column:span 24 }                                       /* grid: track span */
```

Because a span reduces back to a fraction, the width **stepper shows `1/6`** again — not `16.66%`.

### 2. Grid-template classes — one class on the parent, bare children

A 60-track grid would leak gaps *inside* a span, so grid **rows** name their template on the parent
and leave children bare. The Insert Grid layouts are a fixed set (~23 classes):

```css
.fw-grid-6{ grid-template-columns:repeat(6,minmax(0,1fr)) }   /* equal */
.fw-gt-1-2{ grid-template-columns:1fr 2fr }                   /* 1/3 + 2/3 */
.fw-gt-2-3{ grid-template-columns:2fr 3fr }                   /* 2/5 + 3/5 */
.fw-gt-1-2-1{ grid-template-columns:1fr 2fr 1fr }             /* 1/4 + 1/2 + 1/4 */
```

Content-sizing keeps three tiny classes (`fw-w-fit` / `fw-w-max` / `fw-w-min`); collapse is already
`fw-grid-collapse` / `fw-collapse`.

## The target output

```html
<div class="fw-flexbox fx-parent fw-grid fw-grid-6 fw-grid-collapse">
  <div class="fw-flexbox fx-a fw-flex fw-collapse"><p>Test</p></div>
  … ×6
</div>
```

A 2/5 + 3/5 row is just `fw-grid fw-gt-2-3` with two bare children. **Zero** `style` attributes,
**zero** `<style>` blocks — only shared, cached classes.

## The one trade-off

A width that matches no token — a hand-typed `37.3%`, or a free drag-resize to an odd ratio — has no
class. To keep the rule absolute, the Width control **snaps to the nearest 1/60** (≈1.67% steps,
visually imperceptible) so it always lands on a `fw-col-N`. Pristine output in exchange for widths
quantized to 60ths — the right trade for a layout builder, but a deliberate one.

## The phased fix

1. **Grid-template classes.** Add `fw-grid-2…12` + the `fw-gt-*` set to `frontend-grid.css`; the Grid
   view emits the class (not an inline template) and its children carry no width. Existing grids
   clean up at render time — no data migration. *(Highest priority — this is what the test pages need.)*
2. **`fw-col-N` span classes (base 60).** Add the class set; the width resolver emits `fw-col-N`
   (snapping to the nearest 60th) instead of a scoped percentage, for both flex and grid cells.
   Retire the per-element width `<style>` path. Update the stepper to show the reduced fraction.
3. **Content-sizing classes.** `fw-w-fit` / `fw-w-max` / `fw-w-min`.
4. **Remove the last inline styling.** Audit for any remaining `style=""` the Div emits (background,
   min-height, aspect-ratio, content-width) and move each to a class or a small consolidated rule
   where a class genuinely can't express it (e.g. a truly dynamic value stays the documented exception).

## Already done

- ✅ **Collapse is a shared class** — per-element `@media` blocks gone.
- ✅ **New equal grids store no cell width** — the inserter stopped emitting the percentage.
- ✅ Twelfths, container props, and gaps were already shared classes.

When all phases land, the Div's output is what the classic grid promised: a lean, semantic DOM with a
**shared, cached** stylesheet and not a single per-element style.
