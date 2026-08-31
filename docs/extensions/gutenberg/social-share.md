---
title: Social Share
sidebar_position: 15
---

# Social Share

Share buttons for the current page. No third-party script, no tracking pixel — the links are plain share URLs rendered server-side.

The block renders through the [`social_share`](/shortcodes/components/social-share) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `networks` | Which networks to show, and in what order |
| `share_source` | What gets shared — this page, or a URL you supply |
| `custom_url` | The URL to share, when the source is custom |
| `share_text` | Text pre-filled in the share dialog |
| `design` | Button design preset |
| `shape` | Button shape |
| `size` | Button size |
| `show_label` | Print the network name beside the icon |
| `layout` | Row or column |
| `align` | Horizontal alignment |
| `custom_color` | Button colour |
| `icon_color` | Icon colour |
| `font_size_preset` | Label size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The preview's links are not the front end's]
With `share_source` set to the current page, the URL is resolved when the page renders — and a draft
has no final permalink yet. The buttons in the canvas may therefore point somewhere the published
ones will not.

The preview is also inert on purpose: live, a click would open a share dialog for the post you are
still writing.
:::

:::note[Nothing is loaded from the networks]
The buttons are ordinary links to each network's share URL. No SDK, no iframe, no script from
Facebook or X — which is why they cost nothing in page weight and cannot track your visitors before
they click.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
