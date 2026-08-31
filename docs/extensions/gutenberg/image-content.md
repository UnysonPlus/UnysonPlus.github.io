---
title: Image + Content
sidebar_position: 58
---

# Image + Content

An image beside rich text, with a split ratio and full control over how the pair stacks on small screens.

The block renders through the [`image_content`](/shortcodes/media-elements/image-content) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `image` | The image |
| `content` | The text |
| `image_link` | Where the image links |
| `image_link_target` | Open in a new tab |
| `layout` | Image left or right |
| `column_ratio` | How the two divide the row |
| `vertical_align` | How they align vertically |
| `content_align` | Text alignment |
| `gap` | Space between them |
| `mobile_order` | Which comes first once stacked |
| `breakpoint` | The width at which they stack |
| `stack_image_width` | Image width once stacked |
| `stack_image_align` | Image alignment once stacked |
| `image_fit` | How the image fills its box |
| `image_ratio` | Crop ratio |
| `image_radius` | Corner rounding |
| `image_shadow` | Shadow depth |
| `image_style` | Image treatment preset |
| `content_max_width` | Maximum text measure |
| `content_color` | Text colour |
| `content_bg` | Text background |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[`mobile_order` is the setting people forget]
When an image-left row stacks, the image lands **above** the text by default. For a row whose text
introduces the image, that is the wrong order — and it is completely invisible at desktop width.

Set it deliberately, then check it narrow.
:::

:::note[`breakpoint` and `mobile_order` cannot be judged in the canvas]
They describe what happens at widths the canvas is not currently at. That is a limitation of any
single-width view, not of this preview specifically — use a page preview and resize.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
