---
title: Countdown
sidebar_position: 59
---

# Countdown

A countdown to a date and time — a launch, a deadline, the end of a sale — with per-unit labels and a completed state.

The block renders through the [`countdown`](/shortcodes/interactive-elements/countdown) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `target` | The moment it counts down to |
| `show_days` | Show the days unit |
| `show_hours` | Show the hours unit |
| `show_minutes` | Show the minutes unit |
| `show_seconds` | Show the seconds unit |
| `label_days` | Label under the days |
| `label_hours` | Label under the hours |
| `label_minutes` | Label under the minutes |
| `label_seconds` | Label under the seconds |
| `on_complete` | What happens when it reaches zero |
| `complete_text` | What it says then |
| `alignment` | Horizontal alignment |
| `number_font` | Typography for the numbers |
| `number_color` | Number colour |
| `label_font` | Typography for the labels |
| `label_color` | Label colour |
| `box_preset` | Box style around each unit |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`target` is interpreted in the site's timezone]
Not the visitor's, and not the editor's. A sale that ends "at midnight" ends at midnight where the
site says it lives — check *Settings → General* if the countdown seems an hour out.
:::

:::note[The timer does not tick in the editor]
It shows the remaining time as of the moment it rendered. A target already in the past previews as
**completed**, which is the honest answer rather than a placeholder.

A ticking preview would also mean a repaint every second for as long as the sidebar is open.
:::

:::caution[Decide `on_complete` before the date arrives]
It is the setting nobody tests, because testing it means waiting. A countdown that reaches zero and
keeps showing zeros looks broken; one that hides itself can leave a hole in the layout.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
