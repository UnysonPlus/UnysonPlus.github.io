---
title: Call to Action
sidebar_position: 57
---

# Call to Action

A heading, a message and a button — the standard conversion band that sits between sections.

The block renders through the [`call_to_action`](/shortcodes/components/call-to-action) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `title` | Heading |
| `message` | Supporting text |
| `button_label` | Button text |
| `button_link` | Where it goes |
| `button_target` | Open in a new tab |
| `column_split` | How the text and button divide the row |
| `box_style` | Box / border preset |
| `bg_color` | Background |
| `title_color` | Heading colour |
| `message_color` | Message colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`column_split` offers only whole, allowed fractions]
It is a [`column-split`](/options/option-types/column-split) option. The control shows the
allowed splits in **lowest terms** — `1/2`, `1/3`, `5/12` — because that is how they are stored, and
offering `6/12` would mean the click was silently rewritten to `1/2` on save.
:::

:::note[Check the split at the real width]
The ratio is of the row, and the canvas column is rarely the width the row will finally have.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
