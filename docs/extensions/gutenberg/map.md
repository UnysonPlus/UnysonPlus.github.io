---
title: Map
sidebar_position: 37
---

# Map

An embedded map with markers — Google Maps or OpenStreetMap, your choice of provider.

The block renders through the [`map`](/docs/shortcodes/media-elements/map) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `data_provider` | Where the markers come from |
| `map_engine` | Which mapping service renders it, and its API key |
| `map_height` | Map height, with a unit |
| `disable_scrolling` | Stop the wheel zooming the map as you scroll past |
| `bg_color` | Background behind the map |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The map does not load in the editor, and that is the point]
A live embed would pull the provider's script and map tiles into the editor, count against your API
quota, and do it again on every re-render. The canvas shows the element's own placeholder frame
instead.

To see the real map, preview the page.
:::

:::caution[The API key is shown here, but not editable here]
`map_engine` is a [`multi-picker`](/docs/options/option-types/multi-picker) that reveals the settings
its chosen service needs, and the Google key is one of them — but in a block it is **read-only**, and
deliberately so.

The key is a **site-wide** setting: the option type stores it in a `wp_option`, not on the element. A
block's attributes never pass through that storage layer, so an editable field here would write the
key into this one block, where nothing reads it. The map would go on using the site-wide key, the
field would look saved, and the two would disagree permanently.

The block tells you whether a key is set and where to change it — the page builder or Theme Settings.
:::

:::note[Custom marker locations stay in the page builder]
The `location` field inside a custom locations list is a map-with-a-marker picker: choosing a point
means seeing a map. That is not something a sidebar column does well, and it is the one field in the
whole block set with no React control — the rest of this block is editable here.
:::

:::caution[Leave `disable_scrolling` on for a map inside a page]
Otherwise the wheel zooms the map when a visitor scrolls past it, and the page stops moving. It is
the single most common complaint about embedded maps.
:::
