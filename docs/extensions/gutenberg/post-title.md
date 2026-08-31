---
title: Post Title
sidebar_position: 61
---

# Post Title

The current post's title, at the heading level you choose, optionally linked to the post.

The block renders through the `post_title` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `heading_tag` | Which heading level it renders as |
| `link_to_post` | Link the title to the post |
| `text_align` | Alignment |
| `text_color` | Title colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[This block is dynamic]
It renders whatever post it finds itself in, at render time. In the editor that is the post you are
editing — so the canvas shows *this* post's value, which on a new draft is often empty, correctly.

In a [Theme Builder](/extensions/theme-builder/body-templates) template it stands for every post
the template serves.
:::

:::note[Core has a block for this too]
WordPress ships its own Post Title block, and in an ordinary post it does the same job.

This one renders through **your theme's** type scale and colour tokens — `font_size_preset` is the
theme's preset list rather than an arbitrary size — so it matches the rest of an UnysonPlus page
without hand-tuning. Use whichever fits: core's for a plain post, this one where the page is built
from UnysonPlus elements.
:::

:::caution[Link it in a template, not on the post itself]
`link_to_post` is for a template — an archive or a card — where the title links to the post it names.
On the single post, it links to the page the reader is already on.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
