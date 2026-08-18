---
title: Steps
sidebar_position: 17
---

# Steps

A numbered sequence — onboarding, a recipe, a process. Markers, connectors and per-step icons.

The block renders through the [`steps`](/docs/shortcodes/components/steps) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `steps` | The steps themselves |
| `design` | Layout preset |
| `marker` | What each marker shows — a number, an icon, a dot |
| `marker_shape` | Marker shape |
| `connector` | The line drawn between markers |
| `title_tag` | Which heading level step titles use |
| `accent_color` | Marker and connector colour |
| `icon_badge_preset` | Badge style behind an icon marker |
| `marker_text_color` | Number / icon colour |
| `title_color` | Step title colour |
| `text_color` | Step body colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The list is edited in the sidebar, not in a modal]
`steps` is an [`addable-popup`](/docs/options/option-types/addable-popup) — a repeater. In the page
builder each item opens in a modal; in a block sidebar the items expand **in place**, so the canvas
preview stays visible while you type.

The stored value is identical either way, and an item added here shows up in the page builder exactly
as if it had been added there.
:::

:::note[Numbers come from position, not from anything you type]
Step numbers are derived from where a step sits in the list, so reordering the repeater renumbers the
element. There is no stored number that can disagree with the order on screen.
:::

:::note[`title_tag` is a structure choice, not a size one]
Use it to keep the page's heading order sensible — steps under an `h2` section should usually be
`h3`. To make the titles bigger or smaller, use `font_size_preset`; changing the tag to get a size is
how a page ends up with an `h1` in the middle of it.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
