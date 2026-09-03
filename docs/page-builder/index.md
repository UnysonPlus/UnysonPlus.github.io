---
title: "Free WordPress Page Builder"
slug: /page-builder
sidebar_position: 3
sidebar_label: "Page Builder"
description: "Free WordPress drag-and-drop page builder — build any layout visually with sections, columns and 100+ content elements. A free alternative to Elementor Pro, Divi and WPBakery."
---

# Page Builder

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Build premium pages in minutes.</p>
  <p class="ext-hero__sub">A visual drag-and-drop builder with sections, columns and 100+ content elements to build any layout — the page-building power Elementor Pro, Divi and WPBakery charge for, free.</p>
</div>

The Page Builder lets you compose pages visually from **shortcodes** (called *elements* in the
UI), using drag &amp; drop — no code required.

<img src="/img/page-builder.png" alt="The Unyson+ Page Builder — element palette with a populated Section on the canvas" width="968" />

This page is the practical "how to use it" entry point. If you want to understand what the
builder does under the hood — the stored JSON, how loose elements become a valid grid, how the
front end renders, and the value-shape traps to avoid when you extend it — read the deep-dive
pages linked at the bottom.

:::tip[Where the builder is heading]
The layout system is evolving toward one simple primitive (the **Div**, with Flex &amp; Grid) while
the classic Section/Row/Column grid stays fully supported. See the
**[Page Builder Roadmap](./roadmap.md)** for what's coming and why.
:::

## Enabling the builder

The Page Builder ships as the **Page Builder** extension (it lives inside the **Shortcodes**
extension). Activate **Shortcodes** and **Page Builder** from **Unyson+ → Extensions**, then
edit any page and switch the editor to the builder with the **Unyson Builder** button above the
content area.

## Basic workflow

1. Open a page in the editor and click **Unyson Builder**.
2. Drag an element from the palette — a **Section**, **Column**, or any content element — onto
   the canvas.
3. Configure it through its **options panel** (the modal that opens when you click the element).
4. **Save / Update** — the layout renders on the front end.

You don't have to build the full Section → Column → element nesting by hand: drop a content
element straight onto the canvas and the builder wraps it in a column, a row, and a section for
you when the page renders. That wrapping is done by the [items corrector](./items-corrector.md).

:::tip[Start with a prebuilt layout]
To skip building columns one by one, use **[Insert Section](./insert-section.md)** in the builder
header — pick a ready-made column layout (equal columns, offset & sidebar, multi-row, nested
multi-column, or masonry) and it drops a fully-formed section onto the page.
:::

## The element palette

Elements are grouped into tabs in a deliberate order — **Layout**, **Content**, **Media**,
**Interactive**, **Components**, **Header/Footer** — rather than alphabetically (see
`FW_Option_Type_Page_Builder::sort_thumbnails_helper()`). Every element has its own reference
page under [Shortcodes / Elements](/shortcodes/overview).

## Reusable content

The **Snippets** extension lets you save builder layouts and reuse them anywhere — as an
embeddable block (`[snippet id="123"]`) or as a global **Section** / **Column** template. See
[Snippets](../extensions/snippets.md) and [Global Templates](../extensions/global-templates.md).

## Editing modes

- **Desktop / Tablet / Phone** preview toggle re-previews the canvas at each breakpoint so
  responsive column widths, offsets and masonry counts are visible while you edit.
- **Bootstrap 3 Legacy Mode** (Page Builder settings) changes how columns wrap — see
  [Column widths &amp; the grid](./column-widths.md).

## Going deeper

- **[The Div element (Flex, Grid, Block)](./the-div-element.md)** — the modern layout primitive
  and its responsive Width control (twelfths, fifths, content-sizing, custom).
- **[How the Page Builder works](./how-it-works.md)** — the full data flow from a builder edit
  to rendered HTML.
- **[The builder JSON tree format](./builder-json-format.md)** — how a section / row / column /
  element is stored.
- **[The items corrector &amp; editor-load gotcha](./items-corrector.md)** — when
  `get_value_from_attributes()` runs (and when it does *not*).
- **[Migrating an option's value shape](./value-shape-migrations.md)** — the JS-side migration
  pattern that keeps old pages from breaking.
- **[Column widths &amp; the grid](./column-widths.md)** — twelfths, the classic column's single
  `1_5` fifth, and flex vs legacy wrapping (the Div's fuller Width control is in its own page above).
- **[The clean-DOM philosophy](./clean-dom.md)** — why UnysonPlus output stays un-bloated.

## See also

- [Extensions overview](../extensions/overview.md)
- [Option types](/options/option-types) — the building blocks of every element's options
