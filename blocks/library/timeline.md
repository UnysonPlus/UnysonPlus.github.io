---
title: Timeline
---

# Timeline

A vertical timeline of dated entries — company history, a roadmap, a set of milestones.

The block renders through the [`timeline`](/shortcodes/interactive-elements/timeline) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `items` | The entries — date, title, text and icon |
| `design` | Timeline layout preset |
| `marker` | What each marker shows |
| `card_style` | How each entry is boxed |
| `howto_schema` | Emit HowTo structured data for the entries |
| `accent_color` | Marker colour |
| `icon_badge_preset` | Badge style behind an icon marker |
| `line_color` | The vertical line |
| `card_bg` | Entry background |
| `date_color` | Date colour |
| `title_color` | Entry title colour |
| `text_color` | Entry body colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The list is edited in the sidebar, not in a modal]
`items` is an [`addable-popup`](/options/option-types/addable-popup) — a repeater. In the page
builder each item opens in a modal; in a block sidebar the items expand **in place**, so the canvas
preview stays visible while you type.

The stored value is identical either way, and an item added here shows up in the page builder exactly
as if it had been added there.
:::

:::note[The preview shows every entry revealed]
Entries reveal themselves as they scroll into view on the front end. The canvas shows them all
already revealed — a preview that hid half its content until you scrolled the editor past it would be
showing you less than you are editing.
:::

:::caution[`howto_schema` is only right for instructions]
It tells search engines these entries are the steps of a how-to. That is true of a setup guide and
false of a company history, and structured data that does not match the page is worth less than none.

Unlike Star Rating's review schema, this one is exposed in the sidebar: wrong HowTo markup is
generally ignored, while wrong review markup invites a penalty — a different level of risk deserves a
different level of friction.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
