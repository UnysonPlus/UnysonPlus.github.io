---
title: "Bootstrap Columns to CSS Grid & Flexbox"
slug: /page-builder/bootstrap-columns-to-css-grid-flexbox
sidebar_position: 4
sidebar_label: "Bootstrap columns → Grid/Flexbox"
description: "A complete cheat sheet for translating Bootstrap grid columns (col-md-6, col-4, offset, order) to modern CSS Grid and Flexbox — with a full 12-column width map and when to use flex vs grid."
keywords:
  - bootstrap columns to css grid
  - bootstrap grid to flexbox
  - convert col-md-6 to css grid
  - flexbox vs css grid columns
  - bootstrap col to flex-basis
  - css grid column span
  - translate bootstrap grid
  - responsive columns css
image: /img/page-builder.png
---

# Bootstrap Columns to CSS Grid & Flexbox

A practical cheat sheet for translating **Bootstrap grid columns** — `col-md-6`, `col-4`,
`offset-*`, `order-*` — into modern **CSS Grid** and **Flexbox**. Use it to modernise a legacy
layout, to understand what a Bootstrap class actually does, or to rebuild a page with the
UnysonPlus **Div** (which outputs clean flex/grid CSS instead of grid classes).

:::tip[The one thing to understand first]
**Bootstrap's grid IS flexbox underneath.** A `.row` is `display:flex; flex-wrap:wrap`, and each
`col-*` is just a `flex-basis` percentage. So most of this page is simply *recognising* what a
Bootstrap class already maps to in raw CSS — and where **CSS Grid** does the same job with less
math.
:::

## The structural pieces

| Bootstrap | CSS Flexbox | CSS Grid | UnysonPlus Div |
|---|---|---|---|
| `.container` | `max-width` + `margin-inline:auto` | `max-width` + `margin-inline:auto` | **Content Width** option |
| `.row` | `display:flex; flex-wrap:wrap` | `display:grid; grid-template-columns:…` | **Display = Flex / Grid** |
| `.col-*` | a flex child with a `flex-basis` | a grid item (`grid-column: span N`) | a child Div's **Width** preset |
| gutters (column padding) | `gap` | `gap` | **Gap** |
| `.col` (no number) | `flex: 1 1 0` (equal fill) | a `1fr` track | **Auto** width / **Grow to Fill** |

## The full 12-column width map

Every Bootstrap column width is `N / 12`. Here is the complete translation to a percentage,
a Flexbox `flex-basis`, a CSS Grid span, and the UnysonPlus Div width preset:

| Bootstrap | Fraction | Width % | Flexbox `flex` | CSS Grid | Div preset |
|---|---|---|---|---|---|
| `col-1` | 1/12 | 8.333% | `flex: 0 0 8.333%` | `grid-column: span 1` | `1` |
| `col-2` | 1/6 | 16.667% | `flex: 0 0 16.667%` | `span 2` | `2` |
| `col-3` | 1/4 | 25% | `flex: 0 0 25%` | `span 3` | `3` |
| `col-4` | 1/3 | 33.333% | `flex: 0 0 33.333%` | `span 4` | `4` |
| `col-5` | 5/12 | 41.667% | `flex: 0 0 41.667%` | `span 5` | `5` |
| `col-6` | 1/2 | 50% | `flex: 0 0 50%` | `span 6` | `6` |
| `col-7` | 7/12 | 58.333% | `flex: 0 0 58.333%` | `span 7` | `7` |
| `col-8` | 2/3 | 66.667% | `flex: 0 0 66.667%` | `span 8` | `8` |
| `col-9` | 3/4 | 75% | `flex: 0 0 75%` | `span 9` | `9` |
| `col-10` | 5/6 | 83.333% | `flex: 0 0 83.333%` | `span 10` | `10` |
| `col-11` | 11/12 | 91.667% | `flex: 0 0 91.667%` | `span 11` | `11` |
| `col-12` | 1/1 | 100% | `flex: 0 0 100%` | `span 12` | `12` |

:::note
This exact map is what the UnysonPlus **Site Converter** uses when it rebuilds a source's rows as
flex **Div** rows — a source `col-md-6` (or a measured 50% column) becomes a Div cell with width
preset `6`. See [Column widths &amp; the grid](./column-widths.md).
:::

## Everything beyond width

| Bootstrap | Flexbox | CSS Grid |
|---|---|---|
| `offset-3` | `margin-left: 25%` | `grid-column-start: 4` |
| `order-2` / `order-last` | `order: 2` | `order: 2` |
| `align-items-center` (on `.row`) | `align-items: center` | `align-items: center` |
| `justify-content-between` | `justify-content: space-between` | `justify-content: space-between` |
| `align-self-end` (on a column) | `align-self: end` | `align-self: end` |
| a row of 3 that wraps | `flex-wrap: wrap` + basis 33.3% | `grid-template-columns: repeat(3, 1fr)` |
| equal-height columns | automatic (flex stretches) | automatic (grid stretches) |

Notice that the **alignment property names are identical** across Bootstrap utilities, Flexbox and
Grid — `align-items`, `justify-content`, `align-self` all carry over unchanged.

## Flexbox vs CSS Grid — which to use

The most common question when leaving Bootstrap behind is *"flexbox or grid?"* A simple rule:

| You want… | Use | Why |
|---|---|---|
| A row that **wraps** to the next line when full | **Flexbox** | items keep their size and flow naturally |
| **N equal columns** (a true column layout) | **CSS Grid** | `repeat(N, 1fr)` — no percentage math, no wrap surprises |
| Items sized by their **content** (nav bar, tags, buttons) | **Flexbox** | `flex: 0 0 auto` or `flex: 1` per item |
| A **two-dimensional** layout (rows *and* columns aligned) | **CSS Grid** | grid aligns both axes; flex controls only one |
| An **uneven split** like 8 / 4 | either | Grid: `span 8` + `span 4`; Flex: basis 66.7% + 33.3% |

**Rule of thumb:** Flexbox is for **one-dimensional** flows (a row or a stack). CSS Grid is for
**two-dimensional** layouts and for real "columns."

## Quick answers

**What is the CSS Grid equivalent of `col-md-6`?**
A grid item spanning half the tracks — `grid-column: span 6` inside a 12-track grid, or simply one
cell of a `grid-template-columns: repeat(2, 1fr)` grid. As a width it is `50%`.

**What is `col-4` in flexbox?**
`flex: 0 0 33.333%` on the column, inside a `display:flex; flex-wrap:wrap` row.

**How do I make 3 equal columns without Bootstrap?**
`display:grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;` — that's it. No fraction
classes, no `.row` wrapper math.

**Do I still need a `.container`?**
Conceptually yes — you still want a centred max-width. In CSS that's `max-width` +
`margin-inline:auto`; in the UnysonPlus Div it is the **Content Width** option.

**How do offsets work without `offset-*`?**
Flexbox: `margin-left` (a percentage). CSS Grid: place the item with `grid-column-start`.

## How this maps to the UnysonPlus Div

The UnysonPlus **Div** (a flexbox/grid container) is the modern replacement for
Section → Row → Column authoring:

- Set the Div's **Display** to **Grid** and choose how many columns — that is your `.row` of
  equal `col-*` cells, output as clean CSS Grid.
- Set the Div's **Display** to **Flex** for one-dimensional rows and stacks that wrap.
- Each child Div's **Width** preset is the `N` from `col-N` (see the map above).
- **Content Width** gives you the `.container` (centred max-width).

The classic Section/Row/Column grid stays fully supported for existing pages — see the
[Page Builder Roadmap](./roadmap.md) for how the two coexist.

## See also

- [Page Builder Roadmap](./roadmap.md) — where the layout system is heading (Div-first, columns-as-grid)
- [Column widths &amp; the grid](./column-widths.md) — twelfths, the single `1_5` fifth, flex vs legacy wrapping
- [How the Page Builder works](./how-it-works.md) — the full data flow from a builder edit to rendered HTML
