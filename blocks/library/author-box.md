---
title: Author Box
---

# Author Box

An author card — avatar, name, role, bio and social links — pulled from a WordPress user or typed in directly.

The block renders through the [`author_box`](/shortcodes/components/author-box) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `source` | Read from a user, or use the fields below |
| `user_id` | Which user, when reading from one |
| `name` | Name |
| `role` | Role or title |
| `bio` | Short bio |
| `avatar` | Photo |
| `socials` | Social links |
| `design` | Card design preset |
| `avatar_shape` | Avatar shape |
| `avatar_size` | Avatar size |
| `show_posts` | List their recent posts |
| `accent_color` | Accent colour |
| `card_bg` | Card background |
| `name_color` | Name colour |
| `text_color` | Text colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`socials` is a repeater]
It is an [`addable-popup`](/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::note[Both sets of fields are shown, whichever source you pick]
`source` decides whether the card reads from a WordPress user or from the fields typed beneath it.
Both are exposed rather than hidden by the choice, because a card set to read from a user would
otherwise present fields that silently do nothing — and the reverse is worse.
:::

:::note[On a draft, the post author is whoever is logged in]
With `source` set to the current post's author, the canvas shows that author as of now — which on a
new draft is you, not necessarily who it will be attributed to when it publishes.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
