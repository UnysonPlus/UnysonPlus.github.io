---
title: WebGL Object
sidebar_position: 52
---

# WebGL Object

A generated 3D object — blob, torus, wave — rendered live with WebGL. A hero backdrop that is not a video file.

The block renders through the `webgl_object` element — the same PHP that runs in the page builder, so the front
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
| `style_preset` | Which object, and the settings that shape needs |
| `placement` | Where it sits, and how it is anchored |
| `scale` | Object size |
| `color_a` | First colour |
| `color_b` | Second colour |
| `background` | Background treatment |
| `bg_color` | Background colour |
| `auto_rotate` | Rotation speed |
| `noise_amount` | How much the surface deforms |
| `noise_speed` | How fast it deforms |
| `scroll_link` | Link movement to scroll |
| `pointer_follow` | React to the pointer |
| `pointer_strength` | How strongly |
| `parallax` | Parallax depth |
| `quality` | Render quality |
| `dpr_cap` | Pixel-ratio ceiling |
| `poster` | Still shown before WebGL starts |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[`quality` and `dpr_cap` are the battery settings]
This element runs a **continuous render loop on the visitor's GPU**. On a phone that is the difference
between a striking hero and a hot device with a draining battery.

They are exposed here, rather than treated as expert settings, because the two options that govern the
cost belong beside the effect that incurs it. Cap the pixel ratio — rendering a blob at 3× on a phone
buys nothing anyone can see.
:::

:::note[Set a `poster`]
It is what shows before WebGL initialises, on devices that refuse WebGL entirely, and in the editor
canvas. Without one, all three are a blank space.
:::

:::note[No WebGL context is created in the editor]
A live object would hold a GPU context and run a render loop behind the editor, starting a fresh one
on every re-render — several at once, since nothing tears the old ones down promptly. The canvas
shows the poster.
:::
