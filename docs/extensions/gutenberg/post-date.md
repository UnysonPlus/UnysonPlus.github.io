---
title: Post Date
sidebar_position: 63
---

# Post Date

The current post's published or modified date, in the format you choose.

The block renders through the `post_date` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `date_type` | Published or last-modified |
| `date_format` | How the date reads |
| `link_to_post` | Link the date to the post |
| `text_align` | Alignment |
| `text_color` | Date colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[This block is dynamic]
It renders whatever post it finds itself in, at render time. In the editor that is the post you are
editing — so the canvas shows *this* post's value, which on a new draft is often empty, correctly.

In a [Theme Builder](/docs/extensions/theme-builder/body-templates) template it stands for every post
the template serves.
:::

:::caution[`date_type` is worth a deliberate answer]
A **modified** date on an article published once and never touched shows the same value as its publish
date — harmless. A **published** date on a page revised every year tells readers it is older than it
is, which for anything time-sensitive costs you trust and clicks.

Pick the one that describes what the reader wants to know.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
