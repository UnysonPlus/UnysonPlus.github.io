---
title: Map
sidebar_position: 10
sidebar_custom_props: { icon: '/img/shortcode-icons/map.svg' }
---

# Map

An interactive map with multiple engines and tile styles. Tabs: **Content**, **Styling**,
**Animations**, **Advanced**.

:::tip[💡 Web dev tip: give an embedded map a title]
An embedded map is an `<iframe>`, and every iframe needs a `title` (e.g. "Map to our office") so screen-reader users know what it is before diving in. Embeds are heavy, too — loading the map only when it scrolls into view keeps the page fast. [MDN: the iframe element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) · [Web Dev Basics: Accessibility](/learn/accessibility)
:::

## Map Engine

| Engine | Notes |
| --- | --- |
| **OpenStreetMap** | Free, no API key |
| **Google Maps** | Requires an API key |

## Map Style (OpenStreetMap)

Eight tile families — some need a free API key:

`OpenStreetMap — Standard` · `CARTO (Light / Dark / Voyager)` · `OpenTopoMap — Terrain` ·
`CyclOSM — Cycling` · `Humanitarian (HOT)` · `Esri — World Imagery (Satellite)` ·
`Stadia / Stamen (API key)` · `Thunderforest (API key)` · `MapTiler (API key)`

Sub-styles:

- **CARTO** — Positron (Light), Dark Matter (Dark), Voyager
- **Stadia / Stamen** — Alidade Smooth, Alidade Smooth Dark, Outdoors, Stamen Toner, Stamen Terrain, Stamen Watercolor
- **Thunderforest** — OpenCycleMap, Transport, Landscape, Outdoors
- **MapTiler** — Streets, Satellite, Outdoor / Topo

API-key fields appear for Stadia, Thunderforest, MapTiler and Google as needed.

## Map Type (Google)

Roadmap, Terrain, Satellite, Hybrid.

## Other

Population Method, Map Height, Disable zoom on scroll, Background Color, Margin & Padding.

:::note[Screenshots — map styles]
Capture a few representative tile styles: `map-osm-standard`, `map-carto-dark`,
`map-esri-satellite`, `map-google-roadmap`.
:::

## Content

<img src="/img/shortcodes/map-content.png" alt="Map options panel — Content tab" width="840" />

## Styling

<img src="/img/shortcodes/map-styling.png" alt="Map options panel — Styling tab" width="840" />

![Map options panel — Styling tab](/img/shortcodes/map-styling.png)