---
title: Image
sidebar_position: 39
---

# Image

A single image with an explicit size, an optional link and a style treatment.

The block renders through the [`media_image`](/shortcodes/media-elements/media-image) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `image` | The image |
| `width` | Width, with a unit |
| `height` | Height, with a unit |
| `fetchpriority` | Loading priority hint for the browser |
| `link` | Where clicking it goes |
| `target` | Open that link in a new tab |
| `image_style` | Image treatment preset |
| `bg_color` | Background behind the image |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[Core has an Image block, and for a plain image it is the better choice]
This one exists for two things core does not offer: `image_style`, the theme's
[Image Style presets](/options/option-types/image-style-picker), and `fetchpriority`.

If you need neither, use core's Image block — it has better media-library integration and inline
editing.
:::

:::note[`fetchpriority` is the hero-image setting]
Set it to high on the one image above the fold that the page is about, and leave everything else
alone. It tells the browser to fetch that image before other resources, which is usually the single
biggest Largest Contentful Paint win available.

Setting it high on several images defeats the purpose — priority is only meaningful relative to
everything else.
:::

:::note[No stylesheet of its own]
This element is drawn by the theme's rules and the Image Style presets, so nothing is pushed into the
editor canvas for it.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
