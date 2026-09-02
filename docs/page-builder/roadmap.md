---
title: "Page Builder Roadmap"
slug: /page-builder/roadmap
sidebar_position: 2
sidebar_label: "Roadmap"
description: "Where the Unyson+ Page Builder is heading — one simple layout model built on the Div (Flex, Grid, Block), with columns done as CSS Grid, the familiar fractions kept as presets, and the classic Bootstrap grid still supported."
keywords:
  - unysonplus page builder roadmap
  - css grid page builder
  - flexbox page builder
  - modern wordpress layout builder
  - bootstrap to css grid migration
---

# Page Builder Roadmap

This is a living roadmap for the Page Builder's **layout system**. It's here so you can see what's
coming and why. Backward compatibility is a hard rule — see
[Your existing pages](#your-existing-pages) — so nothing here breaks what you've already built.

:::note[Status legend]
🟢 **Shipped** &nbsp;·&nbsp; 🟡 **In progress** &nbsp;·&nbsp; ⚪ **Planned** &nbsp;·&nbsp; 🔵 **Exploring**
:::

## The direction: one simple layout model

The layout system is moving from the classic **Section → Row → Column** (Bootstrap) grid to **one
primitive — the Div** — a container you set to **Flex**, **Grid**, or **Block**. That's the whole
model. It maps directly to real, modern HTML/CSS, and it means there's *one* way to lay out a page
instead of two.

```
Section    → a full-width band (a <section>)        ← start here
  Grid     → columns inside it                       ← "I want columns"
  Flexbox  → a row or a stack inside it              ← "I want things in a row"
      ↳ your content
```

That structure is exactly how a developer writes it by hand — `<section><div class="grid">…</div></section>` —
so the builder now teaches good structure instead of hiding it behind a grid framework. If you're
new to this, the [Bootstrap columns → CSS Grid &amp; Flexbox](./bootstrap-columns-to-css-grid-flexbox)
guide explains Flex vs Grid vs Block from scratch.

## What you'll see in the palette

The **Layout** tab leads with the modern primitives; the classic Bootstrap elements move into a
**Classic** group (still fully supported):

| Tile | Creates | For |
|---|---|---|
| **Section** | a modern Div, tagged `<section>`, with contained content | the root band of a page — where you start |
| **Grid** | a Div set to `display: grid` | columns (a card grid, an even split, a hero) |
| **Flexbox** | a Div set to `display: flex` | a one-dimensional row or stack that can wrap |
| *Classic ▸* | Section (Bootstrap) · Row · Column | existing pages &amp; anyone who prefers the old grid |

A beginner's instinct — *"click Section, it's the main content area"* — now lands on the **modern**
primitive, not the legacy one. No one has to understand "flex" or "grid" to start a page; they
discover Grid the moment they want columns.

## Columns without the math (but the fractions stay)

Modern builders dropped the palette of fixed column structures. Instead of picking "1/3 + 1/3 +
1/3" up front, you set a **Grid** and say how many columns — children fill the tracks. But the
fractions you know aren't going anywhere:

- They live on as **Width presets** on a cell — `1/2, 1/3, 1/4, 2/3, 5/6…` are all still one click.
- Under the hood a `1/3` cell becomes `grid-column: span 4`, a `2/3` cell becomes `span 8` — modern
  CSS Grid instead of a Bootstrap `col-*` class.
- An **uneven split** like 1/3 + 2/3 is a Grid with `grid-template-columns: 1fr 2fr`, or two cells
  at span 4 and span 8.
- **Auto** columns fill the remaining space (the grid equivalent of `flex: 1`).

So the *feel* is the same — familiar fractions — while the *output* is clean, responsive CSS Grid.

## What's coming

| Phase | What | Status |
|---|---|---|
| Content Width on the Div | A container option so a full-width `section` Div centres its content to a max-width (no accidental full-bleed). | 🟡 In progress |
| Converter → flex/grid | The **Site Converter** rebuilds a source's content rows as flex/grid **Div** rows instead of Bootstrap columns. | 🟡 In progress |
| Div = default wrapper | Dropping an element on an empty canvas wraps it in a **Div** (tagged `section` at the root, `div` when nested) — not Section → Column. | 🟡 In progress |
| Modern palette | **Section** (modern Div) / **Grid** / **Flexbox** lead the Layout tab; Bootstrap moves to **Classic**. | 🟡 In progress |
| Columns as Grid | Drop cells into a Grid Div; fractions become grid spans (`1/3` → `span 4`). | 🟡 In progress |
| Live Editor parity | The modern layout tiles + Div inserts now work in the front-end **Live Page Editor** too, matching the backend builder. | 🟡 In progress |

## Your existing pages {#your-existing-pages}

This is an evolution, not a rip-out:

- Every existing **Section / Row / Column** page keeps rendering and editing — the Bootstrap
  shortcodes are **not** removed, only demoted to the **Classic** palette group.
- The two models **coexist**. New pages lead with the Div; existing pages stay Classic — **no
  migration is needed and nothing is forced**. Rebuild a page on the Div model whenever you want, or
  simply leave it as it is.

## Principles

- **Straightforward for newcomers** — one obvious way to lay out a page; no dual systems in your face.
- **Nothing breaks** — backward compatibility is non-negotiable.
- **Clean output** — semantic HTML and vanilla CSS (grid spans, not a wall of utility classes).
- **Teaches good structure** — the builder mirrors how a developer hand-writes a modern layout.

:::info[This roadmap will move]
Scope and order can change as the work lands and as feedback comes in.
:::
