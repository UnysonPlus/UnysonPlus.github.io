---
title: Logo Grid
---

# Logo Grid

A grid — or a continuously scrolling row — of client and partner logos.

The block renders through the [`logo_grid`](/shortcodes/media-elements/logo-grid) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `logos` | The logos, each with an image or SVG and a name |
| `design` | Grid or marquee |
| `columns` | How many per row |
| `gap` | Space between logos |
| `logo_height` | Rendered logo height |
| `grayscale` | Desaturate the logos |
| `show_labels` | Print each logo's name beneath it |
| `autoplay` | Scroll the row continuously |
| `speed` | Marquee speed |
| `direction` | Marquee direction |
| `text_color` | Label colour |
| `box_bg` | Tile background |
| `font_size_preset` | Label size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The list is edited in the sidebar, not in a modal]
`logos` is an [`addable-popup`](/options/option-types/addable-popup) — a repeater. In the page
builder each item opens in a modal; in a block sidebar the items expand **in place**, so the canvas
preview stays visible while you type.

The stored value is identical either way, and an item added here shows up in the page builder exactly
as if it had been added there.
:::

:::note[A logo needs an image, an SVG or a name]
Entries with none of the three are dropped rather than rendered as a gap. If the grid looks shorter
than your list, that is why.
:::

:::note[The marquee is held still in the canvas]
With `autoplay` on the row scrolls continuously on the front end. It is static here: a marquee
running behind the sidebar you are typing in is a distraction rather than a preview, and it would
restart on every option change anyway.
:::

:::caution[`speed` and `direction` need `autoplay`]
They configure the marquee. A static grid has neither, so setting them alone changes nothing.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
