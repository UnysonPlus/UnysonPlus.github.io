---
title: Column
description: The Unyson+ Column block — a layout container that holds and styles other blocks with its own background, padding, border and width, authored in the block editor and rendered by the column element.
---

# Column

A **layout container** — it holds other blocks and gives them their own background, padding, border, corner radius and width. Columns are the building units of a row: place several side by side for a multi-column section. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Column element](/shortcodes/layout-elements/column) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/column/front.png" alt="The Column block — a tinted container holding a heading and paragraph" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Background (`bg`, `bg_color`) | A solid colour or image behind the column's content. |
| Colours (`color`, `text_color`) | Text colour inside the column. |
| Border (`border`, `border_preset`, `radius`) | A border (or a saved border preset) and rounded corners. |
| Height (`height`, `full_height`) | A fixed or full-viewport-height column. |
| Border effects (`group_border_effects`) | Hover and decorative border treatments. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment and width), which inherit the site's design system from `theme.json`.

## Inner content

Unlike most library blocks, a Column is a **container**: you nest other blocks inside it in the editor, and it wraps them. The `upOptions` object stores the column's own styling; the content comes from the blocks you place within.

## Sample content

The demo above is a column with a tinted background and rounded corners, holding a heading and a paragraph:

```html
<!-- wp:unysonplus/column {"upOptions":{"bg_color":"#eef2ff","radius":"12","text_color":"#1e293b"}} -->
  <!-- wp:heading --><h3>Inside a column</h3><!-- /wp:heading -->
  <!-- wp:paragraph --><p>Columns hold and align other blocks.</p><!-- /wp:paragraph -->
<!-- /wp:unysonplus/column -->
```

## The column element

The block and the page builder's [Column element](/shortcodes/layout-elements/column) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
