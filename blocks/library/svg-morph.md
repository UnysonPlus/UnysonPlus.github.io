---
title: SVG Morph
description: The Unyson+ SVG Morph block — an SVG shape that smoothly morphs into another, authored in the block editor and rendered by the Animation Engine.
---

# SVG Morph

An **SVG shape that morphs** smoothly into another — one path fluidly reshaping into the next, looping or triggered on scroll. A playful accent for icons, blobs and logos. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/svg-morph/front.png" alt="The SVG Morph block — a morphing SVG shape" width="240" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Source (`source`, `library`, `custom`) | Choose shapes from the built-in **library** or provide your own **custom** paths. |
| Shapes (`shapes_list`, `shape`, `d`, `markup`) | The sequence of shapes/paths to morph between. |
| Morph duration + Hold (`morph_dur`, `hold`) | How long each morph takes, and the pause on each shape. |
| Easing (`easing`) + Loopback (`loopback`) | The motion curve, and whether it reverses back through the sequence. |
| Render mode (`render_mode`, `stroke_width`) | Fill or stroke the shape, and the stroke thickness. |
| Trigger (`trigger`) | What starts the animation — on scroll into view, on load, or on hover. |
| Alignment (`align`) + Max width (`max_width`) | Position and size within the column. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Part of the Animation Engine
SVG Morph is an **Animation Engine** element. Activate the Animation Engine extension to use it.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above uses the default shape sequence:

```html
<!-- wp:unysonplus/svg-morph {"upOptions":{"align":"center"}} /-->
```
