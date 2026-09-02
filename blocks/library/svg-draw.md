---
title: SVG Draw
description: The Unyson+ SVG Draw block — an SVG whose strokes animate on as if hand-drawn, authored in the block editor and rendered by the SVG Draw animation element.
---

# SVG Draw

An **SVG that draws itself on** — the strokes animate in as if traced by hand, on scroll or on load. Great for signatures, icons, illustrations and underlines that reveal as the visitor arrives. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [SVG Draw element](/animation-engine/svg-draw) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/svg-draw/front.png" alt="The SVG Draw block — a checkmark path drawn as a stroke" width="360" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Source (`source`) | Paste **SVG markup**, upload an **SVG file**, or pick a built-in **preset**. |
| Stroke width (`stroke_width`) | The thickness of the drawn line. |
| Duration + Direction (`duration`, `direction`) | How long the draw takes, and whether it runs forward, reverse or both. |
| Stagger (`stagger`) | Offset multiple paths so they draw one after another. |
| Fill after (`fill_after`) | Fill the shape once the outline finishes drawing. |
| Loop (`loop`) + Trigger (`trigger`) | Replay the animation, and what starts it (on scroll into view, on load, on hover). |
| Alignment (`align`) + Max width (`max_width`) | Position and size within the column. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Part of the Animation Engine
SVG Draw is an **Animation Engine** element. Activate the Animation Engine extension to use it.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/svg-draw {"upOptions":{"svg":"<svg viewBox=\"0 0 100 100\"><path d=\"M15 52 L42 79 L86 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"8\"/></svg>","stroke_width":"8","align":"center"}} /-->
```

## The SVG Draw element

The block and the page builder's [SVG Draw element](/animation-engine/svg-draw) are two doors onto the same code. Its full option, markup and behaviour reference — including the live playground — is documented there.
