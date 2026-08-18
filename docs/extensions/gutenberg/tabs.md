---
title: Tabs
sidebar_position: 16
---

# Tabs

Tabbed panels, optionally with media beside the text, autoplay and deep links. Core has no tabs block, and the ones bundled with page-builder plugins rarely survive a theme change.

The block renders through the [`tabs`](/docs/shortcodes/interactive-elements/tabs) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `tabs` | The panels themselves — each with a title and content |
| `design` | Tab design preset |
| `tab_width` | How the tab strip distributes width |
| `alignment` | Horizontal alignment of the tab strip |
| `orientation` | Tabs above the panel, or beside it |
| `layout` | Panel layout — text only, or text with media |
| `media_side` | Which side the media sits on |
| `activate_on` | Click or hover to switch tabs |
| `activation` | Automatic or manual activation, for keyboard users |
| `mobile` | What tabs collapse into on small screens |
| `autoplay` | Cycle through the tabs by itself |
| `autoplay_interval` | How long each tab stays open |
| `fade` | Cross-fade between panels |
| `deep_link` | Let a URL open a specific tab |
| `remember` | Reopen the tab the visitor last used |
| `text_color` | Panel text colour |
| `bg_color` | Panel background |
| `tab_title_color` | Tab label colour |
| `tab_content_color` | Panel content colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The list is edited in the sidebar, not in a modal]
`tabs` is an [`addable-popup`](/docs/options/option-types/addable-popup) — a repeater. In the page
builder each item opens in a modal; in a block sidebar the items expand **in place**, so the canvas
preview stays visible while you type.

The stored value is identical either way, and an item added here shows up in the page builder exactly
as if it had been added there.
:::

:::note[The canvas shows the first tab, open]
Clicking a tab in the preview would switch panels rather than select the block — the same gesture
meaning two different things, and not the one the editor needs. To read or edit the other panels,
expand them in the Tabs repeater in the sidebar, which is where their content actually lives.
:::

:::caution[`deep_link` writes to the URL]
With it on, opening a tab updates the address bar so the tab can be linked to. That is usually what
you want for documentation and pricing pages, and usually not what you want for a tabbed teaser
halfway down a landing page, where it puts entries in the visitor's back button.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
