---
title: Flexbox (Div)
sidebar_position: 58
description: "The Unyson+ Page Builder's modern layout element — one Flexbox Div you set to Flex, Grid or Block, surfaced as the Section, Flexbox (div) and Grid (div) tiles in the Layout Elements tab."
---

# Flexbox (Div)

The **Flexbox** is the modern layout element — **one** container you set to **Flex**, **Grid** or
**Block**, outputting a clean, semantic HTML tag. It's the primitive the builder now leads with, and
it replaces the classic Section → Row → Column scaffolding with a single element that maps directly
to how a developer writes a layout by hand.

In the palette's **Layout Elements** tab it appears as **three tiles** — all the same Flexbox
element, pre-set for the job you're starting:

| Tile | Sets | Outputs | Use it for |
| --- | --- | --- | --- |
| **Section** | HTML tag `section`, `display: block` | `<section>` | the full-width root band of a page — where you start |
| **Flexbox (div)** | HTML tag `div`, `display: flex` | `<div>` | a one-dimensional row or stack that can wrap |
| **Grid (div)** | HTML tag `div`, `display: grid` | `<div>` | a two-dimensional column layout (CSS Grid) |

:::tip[Full reference: The Div element]
This page is the layout-elements-section summary. The **complete** option reference — every control,
the responsive **Width** system (twelfths, fifths, content-sizing and custom values), Responsive
Collapse, and the item toolkit (Grow / Shrink / Align Self / Order) — lives on
**[The Div element](/page-builder/the-div-element)**.
:::

## Key options

- **HTML tag** (`html_tag`) — the semantic element it renders: `div` (default), `section`, `main`,
  `article`, `header`, `footer`, `aside` or `nav`. On a Page the tile picks this for you; in the
  Theme Builder each tag is its own **Structure** tile.
- **Display** (`display`) — **Flex** (default), **Grid**, or **Block**. Flex lays children on one
  axis; Grid arranges them in a two-axis grid; Block is normal document flow.
- **Direction / Wrap** (`direction`, `wrap`) — row or column, and whether children wrap to new lines
  (Flex mode).
- **Justify / Align** (`justify_content`, `align_items`, `align_content`) — how children are
  distributed and aligned on both axes.
- **Gap** (`gap`) — the space between children.
- **Grid tracks** (`grid_columns`, `grid_autofit`, `grid_min`, `grid_dense`) — fixed columns or
  auto-fit tracks with a minimum width (Grid mode).
- **Width** — a per-device width for the Div itself: the twelfths grid (as `fw-span-*`), the fifths
  `1/5`–`4/5`, content-sizing (Fit / Max / Min), or a custom `px` / `%` / `rem` / `vw` value. See
  **[The Div element → Width](/page-builder/the-div-element#width)**.
- **Responsive Collapse** — a multi-column Grid/Flex row steps down on its own (2 columns on
  tablets, one stacked column on phones), with an opt-out.

Each child Div also carries its own item options — **Order**, **Grow**, **Shrink** and **Align
Self** — for fine control inside a Flex parent.

## Where it lives

The Flexbox leads the **Layout Elements** palette tab. The classic Bootstrap containers
([Section](./section.md), [Container](./container.md), [Bleed Section](./bleed-section.md),
[Masonry Section](./masonry-section.md)) and the [column-width tiles](/page-builder/column-widths)
now sit together in the **Classic** tab.

The same primitive also powers the Theme Builder's
[Flexbox](/extensions/theme-builder/flexbox) (scoped to header/body/footer parts) and the
[Flexbox block](/blocks/library/flexbox) for the block editor — one engine, three surfaces.
