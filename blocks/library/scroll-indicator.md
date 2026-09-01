---
title: Scroll Indicator
---

# Scroll Indicator

A scroll-down cue — text and an animated icon that jumps further down the page. The thing at the bottom of a full-height hero.

The block renders through the `scroll_indicator` element — the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `text` | The label, e.g. “Scroll” |
| `icon` | The icon |
| `target` | Where clicking it scrolls to |
| `layout` | Icon above, below or beside the text |
| `animation` | How the icon moves |
| `text_color` | Label colour |
| `icon_color` | Icon colour |
| `icon_size` | Icon size, with a unit |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[`target` is easy to get wrong and hard to notice]
It points at an anchor or selector further down the **same** page. An indicator aimed at nothing still
animates invitingly and then does nothing when clicked — a failure with no visible symptom until
someone tries it.

Set the target, and check it in a page preview rather than in the canvas.
:::

:::note[The preview is still, and does not scroll]
The bounce is held, and clicking does not jump: in the canvas that would scroll the **editor**, to an
element the editor may not have rendered yet.
:::
