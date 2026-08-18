---
title: Post Meta Field
sidebar_position: 65
---

# Post Meta Field

The value of a custom field on the current post — a price, a rating, a serving size, anything stored as post meta.

The block renders through the `post_meta` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `meta_key` | The custom field name |
| `before_text` | Text printed before the value |
| `after_text` | Text printed after it |
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

:::note[`before_text` and `after_text` are what make it readable]
A bare meta value — `4` — means nothing on a page. "Serves 4" means something.

They print **only when the field has a value**, so a post missing the field renders nothing rather
than a stranded label with a gap after it.
:::

:::note[The field name has to match exactly]
`meta_key` is the stored key, not the label you see in an admin screen. If nothing renders and the
field is definitely set, that mismatch is the usual reason.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
