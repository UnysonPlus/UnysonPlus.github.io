---
sidebar_position: 11
title: SVG Draw
slug: /svg-draw
---

# SVG Draw

:::tip Try it live
Watch line art trace itself in the **[SVG Draw playground](./playground.mdx)** — pick a preset,
tweak duration / stagger / direction / loop, restyle the stroke and fill, then copy the generated
sample. It runs the real runtime's `getTotalLength` measuring + staggered `stroke-dashoffset`
animation.
:::

A **self-drawing SVG** — line art, a signature, an animated divider or icon — that traces itself on as it scrolls into view. No heavy 3D library.

## Add it

Builder palette → **Media Elements** → **SVG Draw**.

## SVG source

Pick where the artwork comes from:

- **Built-in preset** — Signature · Underline · Arrow · Checkmark · Wave · Star · Heart · Circle
- **Paste SVG code** — your own markup (sanitized — scripts/handlers stripped)
- **Upload .svg file** — inlined from the Media Library

Outline (stroke) paths draw best.

## Options

| Group | Option | Notes |
| --- | --- | --- |
| **Draw** | Trigger | When scrolled into view *(default)* · On page load · On hover |
| | Draw duration | Seconds to trace the artwork |
| | Stagger between paths | Delay between each path (s) |
| | Direction | Normal · Reverse |
| | Loop | Draw, erase, redraw forever |
| **Stroke** | Stroke width · Stroke color | The drawn line |
| | Fill after drawing | Fade in a fill once the outline finishes |
| | Fill color | |
| **Style** | Max width · Alignment | Left · Center · Right (0 width = the SVG's natural size) |

## Performance & accessibility

- **Loads only when used** — its small CSS/JS is enqueued only on pages with an SVG Draw.
- **Safe:** pasted/uploaded SVG is sanitized (scripts, event handlers and `javascript:` URLs are stripped).
- **Reduced motion** is honoured — the artwork shows fully drawn.
