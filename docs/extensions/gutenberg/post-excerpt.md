---
title: Post Excerpt
sidebar_position: 64
---

# Post Excerpt

The current post's excerpt — its hand-written summary, or a trimmed opening.

The block renders through the `post_excerpt` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
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

:::note[Length and trimming are WordPress's, not this element's]
There is no length option here on purpose. Excerpt length and the "read more" suffix are WordPress
settings (`excerpt_length` / `excerpt_more`), and an element that re-implemented them would disagree
with every other excerpt on the site.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
