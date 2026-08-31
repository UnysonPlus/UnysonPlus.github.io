---
title: Image Hotspots
sidebar_position: 36
---

# Image Hotspots

An image with pins that reveal text on hover or click — product features, floor plans, annotated diagrams.

The block renders through the [`image_hotspots`](/shortcodes/media-elements/image-hotspots) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `image` | The base image |
| `hotspots` | The pins — position, title and text |
| `design` | Pin and popover design preset |
| `trigger` | Hover or click to reveal |
| `pin_size` | Pin size |
| `rounded` | Corner rounding on the image |
| `pin_color` | Pin colour |
| `pop_bg` | Popover background |
| `pop_color` | Popover text colour |
| `accent_color` | Accent colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`hotspots` is a repeater]
It is an [`addable-popup`](/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::note[Pins cannot be dragged in the canvas, and are not meant to be]
Dragging in the block editor moves the **block**. Pin positions are coordinates set per hotspot in
the repeater, and the popovers do not open in the preview either — that click belongs to selecting
the block.

Placing pins by eye is one of the things the page builder is still genuinely better at. Nothing stops
you starting there and finishing here; it is the same stored value.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
