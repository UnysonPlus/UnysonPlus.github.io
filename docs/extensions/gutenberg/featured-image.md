---
title: Featured Image
sidebar_position: 42
---

# Featured Image

The current post's featured image, at a chosen size and with an optional style treatment.

The block renders through the `featured_image` element — the same PHP that runs in the page builder
and in [Theme Builder body templates](/extensions/theme-builder/body-templates), so the front
end is identical whichever surface places it.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `image_size` | Which registered size to render |
| `link_to` | Link to the post, the full file, or nothing |
| `text_align` | Alignment |
| `image_style` | Image treatment preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[It renders whichever post it is in]
This is a dynamic element: it shows **this** post's featured image, resolved at render time. It is
most at home in a Theme Builder template, where it stands for every post that uses that template.

In a single post it works too, and the canvas previews that post's own image.
:::

:::note[A draft with no featured image says so]
Rather than rendering nothing — which in a block preview is indistinguishable from a broken block —
the element prints a short editor-only note. Visitors never see it.
:::

:::note[No stylesheet of its own]
Drawn by the theme's rules and the Image Style presets, so nothing is pushed into the editor canvas
for it.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
