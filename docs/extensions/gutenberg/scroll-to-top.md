---
title: Scroll to Top
sidebar_position: 72
---

# Scroll to Top

A back-to-top button, with an optional reading-progress bar.

The block renders through the `scroll_to_top` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `show_button` | Show the button |
| `show_progress` | Show a reading-progress bar |
| `icon` | The button icon |
| `position` | Which corner |
| `shape` | Button shape |
| `show_after` | How far down it appears |
| `progress_position` | Where the progress bar sits |
| `progress_height` | Progress bar thickness |
| `accent_color` | Button and bar colour |
| `icon_color` | Icon colour |
| `button_size` | Button size |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[One per page]
This is page chrome: it pins itself to the viewport rather than sitting in the flow. Two on one page
means two buttons in the same corner.

It belongs in a Theme Builder template, placed once, rather than in individual posts.
:::

:::note[In the canvas it pins inside the iframe]
The editor's canvas *is* the viewport as far as the button is concerned, so it sits inside the canvas
rather than over the editor chrome. It does not appear on scroll here, and clicking does not scroll.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
