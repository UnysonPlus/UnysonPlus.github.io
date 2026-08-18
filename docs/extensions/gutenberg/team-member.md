---
title: Team Member
sidebar_position: 30
---

# Team Member

A person card — photo, name, role, a short bio and links.

The block renders through the [`team_member`](/docs/shortcodes/components/team-member) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `image` | The photo |
| `name` | Their name |
| `job` | Role or job title |
| `desc` | A short bio |
| `card_rows` | Which rows appear on the card, and in what order |
| `box_style` | Box / border preset |
| `image_style` | Photo treatment preset |
| `text_color` | Text colour |
| `bg_color` | Card background |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`card_rows` is a repeater]
It is an [`addable-popup`](/docs/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::note[`card_rows` is a list, not a set of switches]
It decides which rows appear **and in what order** — and order is part of the answer, which is why it
is a repeater. Reordering it in the sidebar reorders the card.
:::

:::note[The page builder's card preview is not repeated here]
`card_preview` draws a small sample inside the page builder's options panel. The block already
previews the real card in the canvas, so a second approximation would only be one more thing that can
disagree.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
