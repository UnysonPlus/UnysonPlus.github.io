---
title: Lottie
sidebar_position: 43
---

# Lottie

A Lottie animation — vector motion exported as JSON — with playback triggers and speed control. Small files, sharp at any size.

The block renders through the [`lottie`](/shortcodes/media-elements/lottie) element — the same PHP that runs in the page builder, so the front end is identical either way.


## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `source` | A URL, or an uploaded file |
| `lottie_url` | The animation URL |
| `lottie_file` | The uploaded JSON file |
| `trigger` | What starts it — load, scroll into view, hover, click |
| `loop` | Repeat |
| `reverse_hover` | Play backwards when the pointer leaves |
| `speed` | Playback speed |
| `direction` | Forwards or backwards |
| `max_width` | Maximum rendered width |
| `alignment` | Horizontal alignment |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[Both source fields are shown, whichever source you pick]
An animation pointed at the field its `source` is not reading shows a blank frame with no
explanation. Exposing both makes that mismatch visible instead.
:::

:::note[The animation does not play in the editor]
The canvas shows the first frame. With `trigger` set to hover, a live preview would fire every time
the pointer crossed the block on its way to something else.
:::
