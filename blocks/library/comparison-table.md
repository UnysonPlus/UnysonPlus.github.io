---
title: Comparison Table
---

# Comparison Table

A feature-comparison table — plans, tiers, or this product against the alternatives. With a highlighted column and a sticky header.

The block renders through the [`comparison_table`](/shortcodes/components/comparison-table) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `columns` | The things being compared — one per column |
| `rows` | The features compared, and each column's value for them |
| `style` | Table design preset |
| `highlight_featured` | Emphasise the column marked featured |
| `sticky_header` | Keep the header row visible while scrolling |
| `center_cells` | Centre cell contents |
| `product_schema` | Emit product structured data |
| `accent_color` | Accent colour |
| `header_bg` | Header background |
| `header_text` | Header text colour |
| `text_color` | Cell text colour |
| `border_color` | Table borders |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[Fill the repeaters in order: columns first, then rows]
This is the only block with **two** repeaters, and they are not independent. Row values are defined
per column, so a row added before its columns exist has nowhere to put them.
:::

:::note[`sticky_header` sticks to the canvas, not the page]
The header pins itself to whatever is scrolling. In the editor that is the canvas iframe, so the
behaviour is real but the frame of reference is not the visitor's — check it in a page preview.
:::

:::caution[`product_schema` describes products, not plans in general]
It is right for a table comparing things you sell, with real prices and availability. On a
feature-matrix that is not a product listing, the markup describes something that is not there.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
