---
title: Menu Toggle
sidebar_position: 70
---

# Menu Toggle

A hamburger button that opens a menu.

The block renders through the `menu_toggle` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `target` | The menu this button opens |
| `label` | Accessible label |
| `icon_style` | Which hamburger |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[`target` is the whole setting]
A toggle pointing at nothing is completely inert, with no visible symptom — it looks like a button and
does nothing when tapped. Set it, and test it at a phone width.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
