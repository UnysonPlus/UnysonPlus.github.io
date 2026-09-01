---
title: SVG Draw
---

# SVG Draw

An SVG whose strokes draw themselves — a signature, a route, an underline, a line illustration that appears as you scroll to it.

The block renders through the `svg_draw` element — the same PHP that runs in the page builder, so the front end is identical either way.

:::caution[Needs the Animation Engine extension]
This element ships with the **Animation Engine**, which is **inactive by default**. Activate it under
*Unyson+ → Extensions* and the block appears in the inserter.

With the extension off the block does not register at all — deliberately. A block that appeared but
had an empty sidebar and rendered nothing would be indistinguishable from one that is broken.
:::

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `svg` | The SVG, and where it comes from |
| `trigger` | What starts the draw |
| `duration` | How long the draw takes |
| `stagger` | Delay between paths |
| `direction` | Which end it draws from |
| `loop` | Repeat |
| `stroke_width` | Stroke thickness |
| `stroke_color` | Stroke colour |
| `fill_after` | Fill the shape once drawn |
| `fill_color` | That fill colour |
| `max_width` | Maximum rendered width |
| `align` | Horizontal alignment |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The stroke is shown fully drawn]
Replaying the draw-on would restart on every option change — so `duration` and `stagger`, the two
settings you would actually be trying to judge, are precisely the ones the preview would never hold
still long enough to show. Preview the page to watch it draw.
:::

:::note[`fill_color` needs `fill_after`]
Without it the shape stays an outline, and the fill colour has nothing to fill.
:::
