---
title: Gallery
sidebar_position: 29
---

# Gallery

An image gallery — grid, masonry or carousel — with captions and a lightbox. Core has a Gallery block; this is the one with layout families, image treatments and caption sources.

The block renders through the [`gallery`](/shortcodes/media-elements/gallery) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `source` | Where the images come from, and which ones |
| `design_settings` | Layout family, and the settings it needs |
| `container_type` | How wide the gallery runs |
| `click` | What a click does — lightbox, link, nothing |
| `captions` | Whether and where captions show |
| `caption_source` | Which media field the caption comes from |
| `hover_zoom` | Zoom an image slightly on hover |
| `box_style` | Box / border preset |
| `image_style` | Image treatment preset |
| `text_color` | Text colour |
| `bg_color` | Background |
| `caption_color` | Caption colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[Three pickers, because that is what a gallery is]
`source`, `design_settings` and `click` are all
[`multi-picker`](/options/option-types/multi-picker)s: where the images come from, how they are
laid out, and what happens when one is clicked. Each reveals a different set of fields, and only the
chosen branch is saved.
:::

:::note[The images are chosen here]
The media picker inside `source` is a [`multi-upload`](/options/option-types/multi-upload):
thumbnails with reorder and remove controls, and WordPress's own media modal behind an **Add media**
button. Everything a gallery needs is in the sidebar.
:::

:::note[An empty canvas usually means an empty source]
With the source set to a post's attached media, the preview shows what **this** post has attached —
which for a new draft is nothing. The element says so in place of rendering a broken grid.
:::

:::note[The lightbox does not open in the editor]
Neither does a carousel design advance. Both would take the click the editor needs to select the
block.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
