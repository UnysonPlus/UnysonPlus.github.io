---
title: Widget Area
sidebar_position: 71
---

# Widget Area

A registered sidebar, rendered inline wherever you place it.

The block renders through the `widget_area` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `sidebar` | Which widget area |
| `text_color` | Text colour |
| `bg_color` | Background |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The contents live under Appearance → Widgets]
This block places the area; what is in it is managed there.

A widget area with no widgets counts as inactive and renders nothing — the block says so rather than
appearing broken.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
