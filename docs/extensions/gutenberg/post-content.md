---
title: Post Content
sidebar_position: 62
---

# Post Content

The current post's content. Belongs in a template, not in a post.

The block renders through the `post_content` element — the same PHP that runs in the page builder, so the front
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

:::note[Core has a block for this too]
WordPress ships its own Post Content block, and in an ordinary post it does the same job.

This one renders through **your theme's** type scale and colour tokens — `font_size_preset` is the
theme's preset list rather than an arbitrary size — so it matches the rest of an UnysonPlus page
without hand-tuning. Use whichever fits: core's for a plain post, this one where the page is built
from UnysonPlus elements.
:::

:::caution[Do not place this inside a post]
It renders the post's content — so inside that post, it renders the post within itself. WordPress
guards against the infinite loop, but the result is never what anyone meant.

It belongs in a Theme Builder body template, where it marks the spot the content goes.
:::

:::note[Only three options, and that is deliberate]
The content's own formatting comes from the blocks and elements inside it. These three set the frame
around it, not its contents.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
