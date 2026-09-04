---
title: "The Div element (Flex, Grid, Block)"
slug: /page-builder/the-div-element
sidebar_position: 5
description: "The Unyson+ Page Builder's modern layout primitive — one Div you set to Flex, Grid or Block, with a responsive Width control (twelfths, fifths, content-sizing and custom) that emits clean, semantic HTML."
keywords:
  - unysonplus div element
  - flexbox page builder
  - css grid page builder
  - responsive column width
  - fit-content wordpress builder
---

# The Div element (Flex · Grid · Block)

The **Div** is the modern layout primitive of the Page Builder — **one** container you set to
**Flex**, **Grid**, or **Block**. It replaces the classic Section → Row → Column scaffolding with a
single element that maps directly to how a developer writes a layout by hand
(`<section><div class="grid">…</div></section>`), so the DOM stays clean and semantic. The classic
grid is still fully supported — see the [Roadmap](./roadmap.md) for how the two models coexist.

:::note[Two flexboxes, one engine]
The same primitive powers the Theme Builder's [Flexbox](../extensions/theme-builder/flexbox.md)
(scoped to header/body/footer parts). This page documents the Div as it appears on **Pages and
Posts**. The controls below are shared.
:::

## Getting one

The **Layout Elements** tab leads with four Div presets — each is the *same* Div with a different
starting `Display` and HTML tag:

| Tile | Creates | Reach for it when… |
|---|---|---|
| **Section** | a Div tagged `<section>`, a full-width band by default | you're starting the root band of a page |
| **Block (div)** | a Div set to `display: block` | you just need a wrapper — grouping, spacing or a background around one thing |
| **Flexbox (div)** | a Div set to `display: flex` | you want a one-dimensional row or stack that can wrap |
| **Grid (div)** | a Div set to `display: grid` | you want columns — a card grid, an even split, a hero |

Everything after this is just options on that one element. In the **live editor**, the page root
holds only Sections — dropping a Block / Flexbox / Grid nests it into the last section (or makes one
to hold it).

## Display — how it arranges its children

The **Display** select is the master switch. It decides which of the option groups below apply:

| Display | Children flow as | Controls it reveals |
|---|---|---|
| **Flex** (default) | one axis — a row or a stack | Direction, Wrap, Justify, Align, Gap, Align Content, Reverse |
| **Grid** | a two-axis grid | Grid Columns, Auto-fit, Min Column Width, Dense Packing (+ Gap / Justify / Align) |
| **Block** | normal document flow | none — just a styled box |

### Flex controls

| Option | What it does |
|---|---|
| **Direction** | **Row** places children side by side (give each a **Width** to split the row); **Column** stacks them. Responsive — a Row header can stack to a Column on phones. |
| **Wrap** | Lets a row flow onto multiple lines when the children don't fit. |
| **Justify (main axis)** | Distributes children along the direction axis — start / center / end / space-between / space-around / space-evenly. |
| **Align (cross axis)** | Aligns children across the axis — stretch / start / center / end / baseline. |
| **Gap** / **Row Gap** / **Column Gap** | Spacing between children, from the spacing-scale presets. Responsive. |
| **Align Content (wrapped lines)** | With Wrap on, how the wrapped lines pack vertically. |
| **Reverse Order** | Flips the visual order (`row-reverse` / `column-reverse`) without touching the DOM order. |

### Grid controls

| Option | What it does |
|---|---|
| **Grid Columns** | A number (`3` = three equal columns) **or** a raw `grid-template-columns` value (`2fr 1fr`). Set **`12`** for a *spanning* grid: each child then uses its own **Width** as a track span — `1/3` = 4 tracks, `2/3` = 8 — so `1/3 + 2/3` tiles exactly. |
| **Auto-fit Columns** | Ignores the count and fits as many equal columns as the width allows, each at least the Min Column Width, reflowing with no breakpoints (`repeat(auto-fit, minmax(…, 1fr))`). |
| **Min Column Width** | The `min` in `minmax(min, 1fr)` — smallest a column gets before Auto-fit drops one. |
| **Dense Packing** | `grid-auto-flow: dense` — backfills holes left by spanned cells. Can reorder items visually. |

## Width Override — the star control {#width}

**Width Override** sets how wide *this* Div sits inside its parent. It's a responsive control with
**Desktop / Tablet / Phone** layers (base / `md` / `lg`), each offering the same picker:

### Twelfths (the familiar fractions)

The 12-column grid in lowest terms — one click each. These emit a clean `fw-span-{n}` class (no
inline CSS):

`1/12 · 1/6 · 1/4 · 1/3 · 5/12 · 1/2 · 7/12 · 2/3 · 3/4 · 5/6 · 11/12 · 1/1`

So a `1/2` cell is `fw-span-6`, a `1/3` is `fw-span-4`. Two `1/2` Divs in a Row split it evenly;
three `1/3` Divs make thirds.

### Fifths {#fifths}

A twelfths grid **can't** express fifths in lowest terms, so these are their own tiles — **`1/5`,
`2/5`, `3/5`, `4/5`** — for clean five-column layouts. Because there's no matching grid class, each
renders as an **exact percentage** via a small scoped `<style>` rule:

| Tile | Emits |
|---|---|
| `1/5` | `flex: 0 0 20%; max-width: 20%` |
| `2/5` | `flex: 0 0 40%; max-width: 40%` |
| `3/5` | `flex: 0 0 60%; max-width: 60%` |
| `4/5` | `flex: 0 0 80%; max-width: 80%` |

:::tip[Fifths differ from the classic column]
On the **classic** Section → Row → Column grid, only `1_5` exists (see
[Column widths](./column-widths.md)). The modern **Div** supports the full `1/5 – 4/5` set, so a
`2/5 + 3/5` split is one click each.
:::

### Content-sizing keywords {#content-sizing}

Three intrinsic-sizing widths let a Div size to **its own content** instead of a fraction of the
row. They emit `flex: 0 0 auto` with a CSS keyword width:

| Tile | Emits | Use for |
|---|---|---|
| **Fit** | `width: fit-content` | a button, a pill, a badge — as wide as its text, no wider |
| **Max** | `width: max-content` | never wraps — the widest the content wants to be |
| **Min** | `width: min-content` | as narrow as the content allows (wraps at every soft break) |

### Auto and Custom

| Tile | Meaning |
|---|---|
| **Auto** (`none`) | Inherit the natural flex behaviour — the child fills or shares the remaining space. Nothing is emitted. |
| **Custom** | A free value in **px / % / rem / vw** — for a width no preset covers. Emits a scoped rule. |

Because fifths, content-sizing and custom values are per-element scoped CSS (keyed to the Div's
unique id), they never leak to siblings and cost no global stylesheet weight.

## How this Div behaves as a flex / grid item

When the Div's **parent** is a Flex or Grid container, these fine-tune how it participates:

| Option | Effect |
|---|---|
| **Grow to Fill** | `flex-grow: 1` — expand to eat leftover space (flex). |
| **Prevent Shrinking** | `flex-shrink: 0` — never squeeze below its width (flex). |
| **Align Self** | Override the parent's cross-axis alignment for just this child. |
| **Order** | Move this child earlier/later visually without changing the DOM order (flex). |
| **Grid Column Start** | Inside a **Grid** parent, place this cell at an exact column (1–12) — position one item precisely **without empty spacer cells**. Combine with Width for the span. |

## Container & styling

| Option | Notes |
|---|---|
| **HTML Tag** | The semantic element emitted — `div` (plain), `section` (a full-width band), `article` (self-contained/repeatable, e.g. cards), `aside` (complementary). You pick the tag, you get that tag. |
| **Content Width** | Cap the Div's content to a centred max-width — pick a **named width** from the Container Width library (Narrow / Medium / Wide / …), a **Custom** value, or **Inherit** (full). |
| **Full-Width Band** *(sections)* | A `section` is a full-width band by default: background edge-to-edge, content inset to the Content Width. Turn this off for a fully-contained band. |
| **Background** | The shared background-pro control (colour / gradient / image / video overlay). |
| **Background Pattern / Section Variant** *(sections)* | A decorative SVG **pattern** layer over the background, and a named **Section Style** (Alt / Light / Dark / your own) that themes background + text together. |
| **Shape Dividers** *(sections)* | An angled/curved SVG shape on the top and/or bottom edge (colour, height, flip). |
| **Border / Box Style** | Border, radius and shadow presets. |
| **Min Height** | Responsive minimum height (e.g. a `100vh` hero). |
| **Aspect Ratio** | Lock the box to a ratio (16:9, 1:1, …). |
| **Text Alignment** | Horizontal alignment of the inline/text content (any tag). |
| **Margin & Padding** | Per-side spacing, responsive. |

## Clean output

The Div exists to produce **semantic, framework-free HTML**: you choose `nav`, you get a `<nav>`;
you set three equal columns, you get a real CSS Grid — not `div.row > div.col-md-4` scaffolding and
a wall of utility classes. An **empty** Div (a blank grid cell, say) even sheds the layout classes it
isn't using — while keeping its width/placement so it still holds its spot. That's the same
[clean-DOM philosophy](./clean-dom.md) the whole builder is moving toward.

## See also

- [Page Builder Roadmap](./roadmap.md) — why the Div is replacing Section/Row/Column
- [Bootstrap Columns to CSS Grid & Flexbox](./columns-to-grid.md) — Flex vs Grid vs Block from scratch
- [Column widths & the grid](./column-widths.md) — the classic column's width system
- [Theme Builder → Flexbox](../extensions/theme-builder/flexbox.md) — the same primitive for chrome
