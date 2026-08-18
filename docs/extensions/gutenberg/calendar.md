---
title: Calendar
sidebar_position: 35
---

# Calendar

A month calendar with events, and an optional list of what is coming up.

The block renders through the [`calendar`](/docs/shortcodes/content-elements/calendar) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `events` | The events — title, date and link |
| `design` | Calendar design preset |
| `start_week` | Which day the week starts on |
| `show_list` | Show an upcoming-events list beneath |
| `list_limit` | How many entries that list holds |
| `accent_color` | Accent colour |
| `text_color` | Text colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`events` is a repeater]
It is an [`addable-popup`](/docs/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::caution[This block's output changes on its own]
The month rendered is the **current** month, and today's cell is marked at render time. Like Business
Info, it produces different output on different days with nobody editing it — so an event added for
last month simply stops appearing.
:::

:::note[`list_limit` only applies with `show_list` on]
It caps the upcoming list. With the list hidden there is nothing to cap.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
