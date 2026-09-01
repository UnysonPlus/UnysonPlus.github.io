---
title: Navigation Menu
---

# Navigation Menu

A WordPress navigation menu, by location or by name, with submenu styles and a depth limit.

The block renders through the `nav_menu` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `menu_source` | By theme location, or a specific menu |
| `orientation` | Horizontal or vertical |
| `submenu_style` | How submenus open |
| `depth` | How many levels to render |
| `alignment` | Horizontal alignment |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[Set `depth` for a menu in a narrow column]
An unrestricted deep menu placed in a sidebar or footer column opens submenus off-screen — which is
invisible until someone hovers, and never in the editor.
:::

:::note[Two ways to be empty, and the block says which]
A location with no menu assigned is a theme setting, not something to fix on this block — so it says
so, and points at *Appearance → Menus*.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
