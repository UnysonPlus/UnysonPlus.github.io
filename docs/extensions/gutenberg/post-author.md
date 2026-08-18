---
title: Post Author
sidebar_position: 67
---

# Post Author

The current post's author — a byline, with an optional avatar.

The block renders through the `post_author` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `author_prefix` | Text before the name, e.g. “By” |
| `link_to_author` | Link to the author archive |
| `show_avatar` | Show their avatar |
| `avatar_size` | Avatar size |
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

:::note[A byline, not a bio]
For the card with a description, avatar and social links, use the
[Author Box](./author-box.md) block instead.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
