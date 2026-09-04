---
title: Flexbox (Div)
sidebar_position: 58
description: "The Unyson+ Page Builder's modern layout element — one Flexbox Div you set to Flex, Grid or Block, surfaced as the Section, Block (div), Flexbox (div) and Grid (div) tiles in the Layout Elements tab."
---

# Flexbox (Div)

The **Flexbox** is the modern layout element — **one** container you set to **Flex**, **Grid** or
**Block**, outputting a clean, semantic HTML tag. It's the primitive the builder now leads with, and
it replaces the classic Section → Row → Column scaffolding with a single element that maps directly
to how a developer writes a layout by hand.

In the palette's **Layout Elements** tab it appears as **four tiles** — all the same Flexbox
element, pre-set for the job you're starting:

| Tile | Sets | Outputs | Use it for |
| --- | --- | --- | --- |
| **Section** | HTML tag `section`, `display: block` | `<section>` | the full-width root band of a page — where you start. New sections are a **full-width band** by default (background edge-to-edge, content contained) |
| **Block (div)** | HTML tag `div`, `display: block` | `<div>` | the simplest wrapper — grouping, spacing or a background around one thing |
| **Flexbox (div)** | HTML tag `div`, `display: flex` | `<div>` | a one-dimensional row or stack that can wrap |
| **Grid (div)** | HTML tag `div`, `display: grid` | `<div>` | a two-dimensional column layout (CSS Grid) |

:::tip[Full reference: The Div element]
This page is the layout-elements-section summary. The **complete** option reference — every control,
the responsive **Width** system (twelfths, fifths, content-sizing and custom values), Responsive
Collapse, and the item toolkit (Grow / Shrink / Align Self / Order) — lives on
**[The Div element](/page-builder/the-div-element)**.
:::

## Key options

- **HTML tag** (`html_tag`) — the semantic element it renders. On a Page the choices are the
  content-appropriate `div` (default), `section`, `article` and `aside` (the landmark tags
  `header` / `footer` / `nav` / `main` are built in the Theme / Header-Footer Builder, so they're
  left out of page content to avoid duplicate landmarks). The tile picks this for you.
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
- **Grid Column Start** (`col_start`) — inside a Grid parent, place a cell at an exact column
  (1–12) so you can position one item precisely **without empty spacer cells**. Combine with Width
  for the span.
- **Content Width** (`content_width`) — cap the content to a **named width** from the Container
  Width library (Narrow / Medium / Wide / …) or a custom value; **Inherit** leaves it full.
- **Full-Width Band** (`full_width`, sections only) — background edge-to-edge with content inset to
  the Content Width. On by default for new sections; turn off for a contained band.
- **Responsive Collapse** — a multi-column Grid/Flex row steps down on its own (2 columns on
  tablets, one stacked column on phones), with an opt-out.

Each child Div also carries its own item options — **Order**, **Grow**, **Shrink**, **Align Self**
and **Grid Column Start** — for fine control inside a Flex or Grid parent.

Sections get extra band styling on the **Styling** tab: a **Section Variant** (a named Section
Style), a **Background Pattern**, **Shape Dividers** (top / bottom), and **Text Alignment**. These
band-only controls appear only when the HTML tag is `section`.

## Where it lives

The Flexbox leads the **Layout Elements** palette tab. The classic Bootstrap containers
([Section](./section.md), [Container](./container.md), [Bleed Section](./bleed-section.md),
[Masonry Section](./masonry-section.md)) and the [column-width tiles](/page-builder/column-widths)
now sit together in the **Classic Layout** tab.

The same primitive also powers the Theme Builder's
[Flexbox](/extensions/theme-builder/flexbox) (scoped to header/body/footer parts) and the
[Flexbox block](/blocks/library/flexbox) for the block editor — one engine, three surfaces.
