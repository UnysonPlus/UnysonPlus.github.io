---
title: Text Block
sidebar_position: 41
---

# Text Block

Rich text with typographic controls core does not have — columns, drop caps, a lead paragraph, measure and balance.

The block renders through the [`text_block`](/docs/shortcodes/content-elements/text-block) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `text` | The content |
| `text_align` | Alignment |
| `max_width` | Measure — how wide a line is allowed to run |
| `columns` | Split into columns |
| `balance` | Balance the last lines of headings and short paragraphs |
| `line_height` | Line height |
| `para_spacing` | Space between paragraphs |
| `lead` | Style the first paragraph as a lead |
| `link_underline` | How links are underlined |
| `dropcap` | A drop cap, and how it is styled |
| `text_color` | Text colour |
| `link_color` | Link colour |
| `bg_color` | Background |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[The text is edited in the sidebar, not in the canvas]
This is the block where the shared-renderer trade-off is felt most directly. The canvas preview is
server-rendered markup, not an editable surface, so writing happens in the sidebar's content field
and the canvas shows the result.

That is a real cost, and the honest advice is: **for ordinary prose, use core's Paragraph block.** It
edits in place and it is what the block editor is best at.

This element earns its place when the typographic options are the point — a two-column body, a drop
cap, a controlled measure, a lead paragraph. Core has none of those.
:::

:::note[`max_width` and `dropcap` are pickers]
Both are [`multi-picker`](/docs/options/option-types/multi-picker)s: a measure can be a preset or a
custom value, and a drop cap has its own settings once switched on. Only the chosen branch is saved.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
