---
title: Container
description: The Unyson+ Container block — A centered content box that constrains its content to a comfortable reading width, authored in the block editor and rendered by the container element.
---

# Container

A centered content box that constrains its content to a comfortable reading width. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Container element](/shortcodes/layout-elements/container) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/container/front.png" alt="The Container block — a centered, width-constrained content box" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Background (`background`) | A solid colour, gradient or image behind the box. |
| Width (`container_width`) | The maximum width the content is constrained to. |
| Padding (`padding_top`, `padding_bottom`) | Vertical space inside the box. |
| Min height (`min_height`) | A minimum height for the box. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Inner content

Container is a **container**: you nest other blocks inside it in the editor, and it wraps them. The `upOptions` object stores the container's own styling; the content comes from the blocks you place within.

## Sample content

The demo above is a centered box with a tinted background, holding a heading and a paragraph:

```html
<!-- wp:unysonplus/container {"upOptions":{"background":{"color":{"value":{"custom":"#ecfeff"}}}}} -->
  <!-- wp:heading --> … <!-- /wp:heading -->
  <!-- wp:paragraph --> … <!-- /wp:paragraph -->
<!-- /wp:unysonplus/container -->
```

Set the background with the block's background picker rather than typing the object by hand.

## The container element

The block and the page builder's [Container element](/shortcodes/layout-elements/container) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
