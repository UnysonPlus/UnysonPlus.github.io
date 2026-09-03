---
title: Map
description: The Unyson+ Map block — an interactive map with custom markers, on free OpenStreetMap or Google Maps, authored in the block editor and rendered by the map element.
---

# Map

An **interactive map** with your own markers — on **OpenStreetMap** (free, no API key) or **Google Maps**. Drop pins with a title and description, set the height, and let visitors pan and zoom. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Map element](/shortcodes/media-elements/map) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/map/front.png" alt="The Map block — an OpenStreetMap of Lower Manhattan with a location marker" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Engine (`map_engine`) | **OpenStreetMap** (free, no API key) or **Google Maps** (needs an API key). |
| Locations (`data_provider`) | The markers. Each has a **location** (an address with coordinates), a **title** and a **description**. |
| Height (`map_height`) | The map's height. |
| Scrolling (`disable_scrolling`) | Turn off scroll-wheel zoom so the page scrolls past the map cleanly. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note OpenStreetMap needs no key
Choose the **OpenStreetMap** engine and the map works immediately — no account, no API key, no billing. Google Maps needs an API key with billing enabled in Google Cloud.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above places one marker on OpenStreetMap:

```html
<!-- wp:unysonplus/map {"upOptions":{
  "map_engine":{"engine":"osm"},
  "data_provider":{"population_method":"custom","custom":{"locations":[
    {"location":{"location":"New York, NY","coordinates":{"lat":40.7128,"lng":-74.006}},"title":"Our HQ"}
  ]}},
  "map_height":{"value":"420","unit":"px"}
}} /-->
```

Place markers with the block's map picker rather than typing coordinates by hand.

## The map element

The block and the page builder's [Map element](/shortcodes/media-elements/map) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
