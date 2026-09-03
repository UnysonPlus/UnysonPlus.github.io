---
title: Section
description: The Unyson+ Section block — A full-width band of content — the top-level building block of a page, with its own background, padding, columns and dividers, authored in the block editor and rendered by the section element.
---

# Section

A full-width band of content — the top-level building block of a page, with its own background, padding, columns and dividers. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Section element](/shortcodes/layout-elements/section) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/section/front.png" alt="The Section block — a full-width band with a tinted background" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Background (`background`) | A solid colour, gradient, image or video behind the whole band. |
| Width (`is_fullwidth`, `container_width`) | A contained width or edge-to-edge full width. |
| Padding + Gap (`padding_top`, `padding_bottom`, `gap`) | Vertical space around and between the content. |
| Columns (`column_halign`, `column_valign`, `reverse_columns`) | How the blocks inside line up. |
| Dividers (`divider_top`, `divider_bottom`) | Shape dividers at the top and bottom edges. |
| Min height (`min_height`) | A minimum height — handy for hero bands. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Inner content

Section is a **container**: you nest other blocks inside it in the editor, and it wraps them. The `upOptions` object stores the section's own styling; the content comes from the blocks you place within.

## Sample content

The demo above is a full-width band with a tinted background, holding a heading and a paragraph:

```html
<!-- wp:unysonplus/section {"upOptions":{"background":{"color":{"value":{"custom":"#eef2ff"}}}}} -->
  <!-- wp:heading --> … <!-- /wp:heading -->
  <!-- wp:paragraph --> … <!-- /wp:paragraph -->
<!-- /wp:unysonplus/section -->
```

Set the background with the block's background picker rather than typing the object by hand.

## The section element

The block and the page builder's [Section element](/shortcodes/layout-elements/section) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
