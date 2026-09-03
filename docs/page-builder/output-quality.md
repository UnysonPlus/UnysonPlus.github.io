---
title: "Output quality & the builder ceiling"
slug: /page-builder/output-quality
sidebar_position: 10
description: "How clean the flexbox Div's HTML/CSS output is, how it compares to Elementor / Bricks / Divi, and why a page builder's honest quality ceiling is ~9.5/10 — the last half-point is hand-coding, not a defect."
keywords:
  - page builder clean output
  - elementor bricks divi output comparison
  - semantic html page builder
  - utility classes vs inline styles
---

# Output quality & the builder ceiling

A fair question about any page builder: **how clean is the HTML/CSS it actually ships?** This page
records where the UnysonPlus flexbox **[Div](./the-div-element.md)** lands, how that compares to the
big builders, and — honestly — why a page builder's ceiling is about **9.5/10**, not 10.

## Where the output stands

The [clean-output work](./clean-output-plan.md) took the Div from "a `<style>` block glued to every
cell" to shared, cached classes plus one consolidated per-page stylesheet. Run through an independent
AI code review at each stage, the trajectory was:

| Version | State | Score |
|---|---|---|
| V1 | Scattered inline `<style>` blocks per cell | 🔴 **2/10** |
| V2 | Classes for most widths; section still had an inline `style` | 🟡 **7.5/10** |
| V3 | Leaner classes; section `style` still present | 🟡 **8/10** |
| V4 | **Zero inline styles** — `fw-contained` class + one consolidated footer sheet | 🟢 **9.5/10** |

At 9.5 the reviewer's verdict was *"best practice for page builders … as clean as page builder code
gets."*

## What "clean" means here

A page built from the pickers now emits:

- **Shared, cached classes** for everything structural — `fw-grid-N`, `fw-span-*`, `fw-fifth-*`,
  `fw-w-*`, `fw-collapse`, `fw-contained`.
- **A unique `fx-<id>` class** per element — the styling hook (see below).
- **One consolidated `<style>` per page**, in the footer, for the genuinely dynamic values a class
  can't express (a hand-typed width, a background, min-height) — keyed to `.fx-<id>`.
- **No inline `style` attributes** in the common case, and **no per-element `<style>` blocks**.

That's the same model **Elementor** (`post-<id>.css`), **Bricks** (`uploads/bricks/css/…`) and
**Divi** (`et-cache/…`) use: an id-class hook plus a generated stylesheet. All three sit at the same
ceiling for the same reasons.

## Why ~9.5 is the honest ceiling

A "10/10" as a reviewer describes it — a single descriptive class like `.grid-custom`, no generated
hashes, a bespoke media query — is **hand-written HTML for one specific layout**. No builder can
produce that, and it isn't a defect:

- **The `fx-<id>` hash is mandatory.** It's how a builder lets you give *one specific element* its
  own background or padding. Remove it and you lose per-element styling — the entire point of a
  builder.
- **"One descriptive class" and "arbitrary per-instance layouts" are mutually exclusive.** A human
  can name `.grid-custom` for a single page. A builder serving unlimited layouts has two choices:
  reusable **utility classes** (cached — what UnysonPlus, Bootstrap and Tailwind do) or a **unique
  generated class per element** (the hashes, just renamed). There is no third option.
- **Even the "perfect" hand-coded example uses `<div>` for its layout cells.** A generic grid cell
  *is* a `<div>`; semantics belong on meaningful regions, not every wrapper.

So "eliminate builder class bloat" really means "stop being a builder." The last half-point is a
category difference — bespoke hand-coding — not a quality gap.

## The one lever that *is* real: semantic tags

The genuinely actionable path toward more meaningful markup is **choosing the right HTML tag**, and
the Div supports it directly. Its **HTML Tag** control outputs a real semantic element:

- On a **Page**: `div`, `section`, `article`, `aside`, `nav`, `header`, `footer`.
- In the **Theme Builder** (header/body/footer parts): the above **plus `main`** (a page's single
  `<main>` belongs to the theme, so it's kept out of page content to avoid a nested/duplicate one).

Reach for them on regions that carry meaning — a card as `<article>`, a callout as `<aside>`, an
in-page menu as `<nav>`, a band's `<header>` / `<footer>` — and screen readers and crawlers get real
structure. Layout-only cells stay `<div>`, which is correct.

## Bottom line

The Div's output is a **lean, semantic DOM served by a shared, cached stylesheet** — level with the
best commercial builders, and a world away from the old per-element `<style>` soup. **9.5/10 is the
honest ceiling for page-builder output, and the Div is on it.** The remaining half-point is the
difference between *generating* a layout and *hand-writing* one — which is exactly the work the
builder is doing for you.
