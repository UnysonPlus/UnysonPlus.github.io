---
title: Notification
sidebar_position: 12
---

# Notification

A notice with an icon, an optional label and a message — inline in the content, pinned as an announcement bar, or floating as a toast. Core has an equivalent only in the sense that a coloured paragraph is an equivalent.

The block renders through the [`notification`](/shortcodes/content-elements/notification) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `message` | The notice text |
| `label_text` | A short label before the message, e.g. “Heads up” |
| `type` | Semantic colour — info, success, warning, danger and the rest |
| `border_style` | Filled or outline |
| `icon` | The icon shown beside the message |
| `layout` | Icon and text inline, or stacked |
| `dismissible` | Give the notice a close button |
| `auto_dismiss` | Close it automatically after this many seconds |
| `display_mode` | Inline, a bar pinned to the top or bottom, or a floating toast |
| `persist_dismiss` | Remember a dismissal so it does not come back on the next page |
| `text_color` | Overall text colour |
| `bg_color` | Background |
| `label_color` | Label colour |
| `message_color` | Message colour |
| `icon_color` | Icon colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The preview does not dismiss itself]
The canvas preview is inert, and here that is doing real work: live, the close button would let you
dismiss the block you are editing, and `auto_dismiss` would make it disappear a few seconds after
every render. Neither is a preview of anything.
:::

:::note[Pinned modes stay inside the canvas]
`display_mode` of bar-top, bar-bottom or floating pins the notice to the viewport. In the editor that
viewport is the canvas iframe, so a pinned notice sits inside the canvas rather than over the editor
chrome — the layout is honest and the editor stays usable.
:::

:::caution[`persist_dismiss` needs a dismissible notice]
Remembering a dismissal only means something if a visitor can dismiss it. With `dismissible` off, this
setting has nothing to remember.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
