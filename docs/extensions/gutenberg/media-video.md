---
title: Video
sidebar_position: 40
---

# Video

A video at a fixed aspect ratio — self-hosted files, or an embed from YouTube, Vimeo and other oEmbed providers.

The block renders through the [`media_video`](/docs/shortcodes/media-elements/media-video) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `source_type` | Self-hosted or embedded, and the settings that source needs |
| `width` | Width, with a unit |
| `ratio` | Aspect ratio |
| `bg_color` | Background behind the video |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`source_type` is a picker that reveals its own options]
It is a [`multi-picker`](/docs/options/option-types/multi-picker): choosing an option reveals the
fields belonging to that choice, and **only the chosen branch is saved**.
:::

:::note[The video does not load in the editor]
For an embedded source it is not fetched at all: a live embed would pull the provider's player into
the editor and reload it on every re-render. The canvas shows the element's frame at the chosen
ratio.
:::

:::note[Two different "nothing here" messages, on purpose]
An empty URL and a URL that **cannot be embedded** are different problems, and the element says which
one you have. An unresolvable URL is usually a watch-page variant, a private video, or a provider
WordPress does not support — knowing that saves re-pasting the same address.
:::

:::note[The privacy and performance switches are on the source branch]
YouTube-nocookie and the lazy-load facade live inside the embed branch of `source_type`, alongside
the URL they apply to.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
