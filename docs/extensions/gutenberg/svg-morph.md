---
title: SVG Morph
sidebar_position: 51
---

# SVG Morph

One SVG shape morphing into the next — a blob that shifts behind a hero, an icon that becomes another icon, a logo that resolves.

The block renders through the `svg_morph` element — the same PHP that runs in the page builder, so the front
end is identical either way.

:::caution[Needs the Animation Engine extension]
This element ships with the **Animation Engine**, which is **inactive by default**. Activate it under
*Unyson+ → Extensions* and the block appears in the inserter.

With the extension off the block does not register at all — deliberately, so it cannot appear as an
entry with an empty sidebar that renders nothing.
:::

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `shapes_list` | The shapes, in the order they morph |
| `loopback` | Return to the first shape at the end |
| `render_mode` | How the shape is drawn |
| `trigger` | What starts the morph |
| `easing` | The easing curve |
| `fill_color` | Fill colour |
| `stroke_color` | Stroke colour |
| `stroke_width` | Stroke thickness |
| `max_width` | Maximum rendered width |
| `align` | Horizontal alignment |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The order of `shapes_list` *is* the animation]
It is an [`addable-popup`](/docs/options/option-types/addable-popup) repeater, and the shapes morph in
the order they are listed. Reordering the list rewrites the sequence.
:::

:::caution[Shapes need compatible path data]
A clean morph needs paths with comparable point counts. Mismatched ones lurch rather than flow —
which is a property of the SVGs themselves, not something a setting can fix, which is why there is no
option for it. If a transition looks wrong, the fix is in the artwork.
:::

:::note[The preview holds the first shape]
Replaying the morph would restart on every option change — so `easing` and the shape order, the two
things you would be trying to judge, are exactly what the preview would never settle on long enough
to show.
:::
