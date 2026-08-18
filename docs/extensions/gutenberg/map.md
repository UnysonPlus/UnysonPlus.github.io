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

:::note[The API key is set here, beside the map]
`map_engine` is a [`multi-picker`](/docs/options/option-types/multi-picker) that reveals the settings
its chosen service needs — including the key. That keeps the key where the map is configured, rather
than making a blank map into a hunt through settings pages.
:::

:::caution[Leave `disable_scrolling` on for a map inside a page]
Otherwise the wheel zooms the map when a visitor scrolls past it, and the page stops moving. It is
the single most common complaint about embedded maps.
:::
