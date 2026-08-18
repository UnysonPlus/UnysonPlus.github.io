---
title: Post Terms
sidebar_position: 66
---

# Post Terms

The current post's terms from any taxonomy — categories, tags, or your own.

The block renders through the `post_terms` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `taxonomy` | Which taxonomy to read |
| `term_prefix` | Text before the list |
| `term_separator` | What goes between terms |
| `link_terms` | Link each term to its archive |
| `text_align` | Alignment |
| `text_color` | Text colour |
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

:::note[Any registered taxonomy, not just categories and tags]
That is the reason to reach for this over core's Post Terms block on a custom post type — a Recipe's
Cuisine, a Product's Brand.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
