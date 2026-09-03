---
title: "Plan: clean flexbox output"
slug: /page-builder/clean-output-plan
sidebar_position: 9
description: "The plan for making the flexbox Div emit clean, Bootstrap-style shared utility classes instead of per-element <style> blocks — what's wrong today, the target output, and the phased fix."
keywords:
  - unysonplus clean html output
  - flexbox utility classes
  - frontend-grid css
  - no inline styles page builder
---

# Plan: clean flexbox output

The flexbox **Div** should emit output as clean as the classic Bootstrap grid did — **shared,
cacheable utility classes**, not a `<style>` block glued to every cell. Today it does this for
*some* widths and falls back to per-element `<style>` for the rest. This page is the plan to close
that gap.

## The problem, concretely

A six-column grid currently renders like this — a scoped `<style>` block before **every** cell:

```html
<div class="fw-flexbox fx-parent fw-grid" style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));">
  <style>.fx-a{flex:0 0 16.66% !important;max-width:16.66% !important;}</style>
  <div class="fw-flexbox fx-a fw-flex …"><p>Test</p></div>
  <style>.fx-b{flex:0 0 16.66% !important;max-width:16.66% !important;}</style>
  <div class="fw-flexbox fx-b fw-flex …"><p>Test</p></div>
  … ×6
</div>
```

Two things are wrong:

1. **Per-element `<style>` blocks.** Six identical rules, none cacheable, interleaved with the DOM.
2. **Redundant width inside a grid.** The parent is already `display:grid; grid-template-columns:
   repeat(6,…)` — the tracks size the cells. The `flex:0 0 16.66%` is inert in a grid and the
   `max-width` fights the track. The cell needs **no** width at all.

## Why it happens

There **is** a Bootstrap-style shared-class layer — `frontend-grid.css` in the `builder`
extension. It already carries:

- `fw-span-1 … fw-span-12` — the twelfths widths (gap-aware in a flex row, `grid-column: span N` in a grid),
- `fw-flex-*`, `fw-justify-*`, `fw-items-*`, gap utilities — the flex/grid container properties,
- `fw-grid-collapse` / `fw-collapse` — the responsive-collapse behaviour.

So **twelfths widths, container props, and collapse are already clean, shared classes.** The bloat
comes from the widths that *aren't* twelfths and therefore have no class to use:

| Width kind | Today | Should be |
|---|---|---|
| Twelfths (1/2, 1/3, 2/3, …) | `fw-span-*` class ✅ | unchanged |
| **Cell inside an equal Grid** | scoped `<style>` (16.66% …) | **no width** — the grid tracks size it |
| **Fifths (1/5–4/5)** | scoped `<style>` (20/40/60/80%) | a **shared class** (`fw-fifths-*`) |
| **Content-sizing (fit/max/min)** | scoped `<style>` | a **shared class** (`fw-w-fit` …) |
| **Arbitrary custom** (37.3%, 220px) | scoped `<style>` | **one inline var** + one shared rule, no `<style>` block |
| Responsive collapse | shared class ✅ | unchanged |

## The principle

> Anything a **preset** can express is a **shared class** in `frontend-grid.css`. A per-element rule
> exists **only** for a value the user typed by hand that no preset covers — and even then it rides
> on the element inline (a CSS variable), never in its own `<style>` block.

That's exactly the Bootstrap contract (`col-md-6` is a class; only a bespoke value needs bespoke
CSS), applied to the Div's full width vocabulary.

## The target output

The same six-column grid, after the plan:

```html
<div class="fw-flexbox fx-parent fw-grid fw-grid-collapse" style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));">
  <div class="fw-flexbox fx-a fw-flex fw-collapse"><p>Test</p></div>
  … ×6
</div>
```

A fifths row (20 / 60 / 20):

```html
<div class="fw-flexbox fx-row fw-flex fw-collapse">
  <div class="fw-flexbox fx-a fw-flex fw-fifths-1"><p>Test</p></div>
  <div class="fw-flexbox fx-b fw-flex fw-fifths-3"><p>Test</p></div>
  <div class="fw-flexbox fx-c fw-flex fw-fifths-1"><p>Test</p></div>
</div>
```

**Zero per-element `<style>` blocks.** Only shared, cached classes plus the one inline
`grid-template-columns` the dynamic track count genuinely needs.

## The phased fix

Each phase is independent and shippable on its own.

1. **Grid cells carry no width.** *(done for newly inserted grids.)* The Insert Grid inserter no
   longer stores a percentage on equal-grid cells. Remaining: at render time, when a cell's **parent
   is a Grid**, skip its custom width (the tracks size it) so **existing** pages clean up too, with
   no data migration. Twelfths cells keep their `fw-span-*` class — in a grid it becomes the
   `grid-column: span N`, which is correct and already shared.
2. **Fifths → shared classes.** Add `fw-fifths-1 … fw-fifths-4` (20/40/60/80%, gap-aware in a flex
   row) to `frontend-grid.css`. The width resolver emits the class for a fifth preset instead of a
   scoped rule.
3. **Content-sizing → shared classes.** Add `fw-w-fit` / `fw-w-max` / `fw-w-min` (fit/max/min-content)
   the same way.
4. **Arbitrary custom → inline variable.** For a value no preset covers, set `style="--fw-w:37.3%"`
   on the element and let one shared rule (`.fw-w-custom{flex:0 0 var(--fw-w);max-width:var(--fw-w)}`)
   apply it — no per-element `<style>` block. Per-device custom values (which need `@media`) remain
   the one case that emits a scoped rule, and even there it's **one** consolidated block per element,
   not one per breakpoint.
5. **Responsive collapse → shared classes.** *(done.)* `fw-grid-collapse` / `fw-grid-collapse-1` /
   `fw-collapse`, defined once, replace the per-element `@media` blocks.

## What's already done

- ✅ **Collapse is a shared class** — the per-element `@media` blocks are gone (phase 5).
- ✅ **New equal grids store no cell width** — the inserter stopped emitting the percentage (phase 1a).
- ✅ **Twelfths, container props, gaps** were already shared classes.

## What's left

- Phase 1b (render-time skip for existing grid cells), phases 2–4 (fifths, content-sizing, and
  arbitrary-custom as classes / inline variable).

When all phases land, the Div's output is what the classic grid promised — a lean, semantic DOM with
a **shared, cached** stylesheet — with none of the per-element `<style>` noise.
