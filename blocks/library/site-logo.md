---
title: Site Logo
---

# Site Logo

The site's logo — from Theme Settings, or a custom image for this placement.

The block renders through the `site_logo` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `source` | Theme Settings logo, or a custom image |
| `custom_image` | That custom image |
| `link_home` | Link it to the home page |
| `max_height` | Maximum rendered height |
| `alignment` | Horizontal alignment |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[Prefer the Theme Settings source]
Then a rebrand is one setting, not every page that shows a logo.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
