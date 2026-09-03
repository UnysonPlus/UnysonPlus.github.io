---
title: Bleed Section
description: The Unyson+ Bleed Section block — A section whose background breaks out of the content column to span the full browser width, while the content stays aligned, authored in the block editor and rendered by the bleed-section element.
---

# Bleed Section

A section whose background breaks out of the content column to span the full browser width, while the content stays aligned. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Bleed Section element](/shortcodes/layout-elements/bleed-section) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/bleed-section/front.png" alt="The Bleed Section block — a full-bleed background with aligned content" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Background (`background`) | The full-bleed background — colour, gradient, image or video, edge to edge. |
| Overlay (`bleed_overlay_color`, `bleed_overlay_opacity`) | A scrim over the background so overlaid text stays readable. |
| Content alignment | The inner content stays aligned to your layout while the background bleeds full width. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Inner content

Bleed Section is a **container**: you nest other blocks inside it in the editor, and it wraps them. The `upOptions` object stores the bleed section's own styling; the content comes from the blocks you place within.

## Sample content

The demo above is a full-bleed band with a tinted background, holding a heading and a paragraph:

```html
<!-- wp:unysonplus/bleed-section {"upOptions":{"background":{"color":{"value":{"custom":"#eef2ff"}}}}} -->
  <!-- wp:heading --> … <!-- /wp:heading -->
  <!-- wp:paragraph --> … <!-- /wp:paragraph -->
<!-- /wp:unysonplus/bleed-section -->
```

Set the background with the block's background picker rather than typing the object by hand.

## The bleed section element

The block and the page builder's [Bleed Section element](/shortcodes/layout-elements/bleed-section) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
