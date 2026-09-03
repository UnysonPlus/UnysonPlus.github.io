---
title: Flexbox
description: The Unyson+ Flexbox block — a flex/grid container that lays out the blocks inside it in a row, column or grid with full alignment control, authored in the block editor and rendered by the flexbox element.
---

# Flexbox

A **flex (or grid) container** — drop blocks inside and arrange them in a **row**, a **column** or a **grid**, with full control over direction, wrapping, gaps and alignment. The modern way to place cards, features or columns side by side that reflow cleanly on mobile. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Flexbox element](/extensions/theme-builder/flexbox) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/flexbox/front.png" alt="The Flexbox block — three cards laid out in a row" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Display (`display`) | Flex or grid layout. |
| Direction + Wrap (`direction`, `reverse`, `wrap`) | Row or column, forwards or reversed, and whether items wrap to new lines. |
| Alignment (`justify_content`, `align_items`, `align_content`) | How items are distributed and aligned on both axes. |
| Gap (`gap`) | The space between items. |
| Grid (`grid_columns`, `grid_autofit`, `grid_min`) | When in grid mode — fixed columns or auto-fit tracks with a minimum width. |
| Sizing (`width`, `content_width`, `min_height`) | The container's width and height. |
| Responsive (`base`, `sm`, `md`, `lg`) | Override direction, alignment and columns per breakpoint. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Inner content

Flexbox is a **container**: you nest other blocks inside it in the editor, and it arranges them. The `upOptions` object stores the layout; the content comes from the blocks you place within.

## Sample content

The demo above is a flex row with a 20px gap, holding three tinted **[Column](/blocks/library/column)** blocks:

```html
<!-- wp:unysonplus/flexbox {"upOptions":{"gap":"20"}} -->
  <!-- wp:unysonplus/column {"upOptions":{"bg_color":"#eef2ff"}} --> … <!-- /wp:unysonplus/column -->
  <!-- wp:unysonplus/column {"upOptions":{"bg_color":"#ecfdf5"}} --> … <!-- /wp:unysonplus/column -->
  <!-- wp:unysonplus/column {"upOptions":{"bg_color":"#fef3c7"}} --> … <!-- /wp:unysonplus/column -->
<!-- /wp:unysonplus/flexbox -->
```

## The flexbox element

The block and the page builder's [Flexbox element](/extensions/theme-builder/flexbox) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
