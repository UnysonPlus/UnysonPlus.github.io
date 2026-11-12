---
sidebar_position: 11.2
title: SVG Morph
slug: /svg-morph
description: An SVG shape that morphs smoothly into another — a liquid blob loop, circle to square, heart to star, or your own shapes. Filled or outlined; loops, or plays on hover, scroll-in or click.
---

# SVG Morph

**SVG Morph** draws a shape that **morphs smoothly into the next**: a liquid blob that never stops moving, a circle that becomes a square, a heart that turns into a star, or your own logo outline. It works through a list of shapes in order, each with its own timing, and can loop forever or react to the visitor. It uses no morphing library: each shape is sampled into points and lined up so it doesn't twist.

## Where to find it

Builder palette → **Animation Engine** → **SVG Morph**. It needs the Animation Engine extension. It also exists as a block for the block editor: see [SVG Morph block](/blocks/library/svg-morph).

## Content tab

**Shapes**: the list the element morphs through, in order. Add two or more, and drag to reorder. Each shape has:

| Option | Default | What it does |
| --- | --- | --- |
| **Shape source** | Shape library | **Shape library**, **Upload / paste SVG**, or **Custom path**. |
| **Shape** (library) | Blob 1 | 12 shapes: Blob 1 · Blob 2 · Blob 3 · Circle · Square · Triangle · Diamond · Pentagon · Hexagon · Star · Heart · Droplet. |
| **SVG file or code** (upload) | — | Upload an `.svg` or paste `<svg>…</svg>`: the main outline is extracted and fitted automatically. Best with a single-shape silhouette. |
| **SVG path (d)** (custom) | — | Paste one path's `d`, in any coordinate space; it is fitted automatically. One closed shape. |
| **Morph duration (s)** | 1.2 | 0.2–8. How long the morph from this shape to the next takes. |
| **Hold before morphing (s)** | 0.6 | 0–6. Loop trigger only: how long this shape holds before it morphs on. |

| Option | Default | What it does |
| --- | --- | --- |
| **Loop back to first** | On | Morph from the last shape back to the first, for a seamless cycle. |
| **Render as** | Filled shape | **Filled shape** or **Outline (stroke)**. |
| **Trigger** | Loop | **Loop — morph forever**; **On hover — morph to the next shape**; **On view — morph once when scrolled in**; **On click — morph on each click**. |
| **Easing** | Ease In Out | **Linear**, **Ease In**, **Ease Out**, **Ease In Out**. |
| **Fill color** | `#2f74e6` | Used in Filled mode (theme colours available). |
| **Stroke color** | `#2f74e6` | Used in Outline mode. |
| **Stroke width (px)** | 3 | 1–16. |

## Style tab

| Option | Default | What it does |
| --- | --- | --- |
| **Size (px)** | 200 | 40–900. The shape is square; this is its width and height. |
| **Alignment** | Center | **Left**, **Center** or **Right**. |

The usual **Animations** and **Advanced** tabs are there too.

## Example

A soft background accent: three library shapes **Blob 1 → Blob 2 → Blob 3**, Trigger **Loop**, each Morph duration 2.4 s and Hold 0, Loop back on, filled in a light brand tint, Size 420. For a playful icon: **Heart → Star** on **On hover**.

## Limits

- One closed outline per shape. Shapes with holes or many separate parts are reduced to their main outline.
- **Reduce motion:** the shape stays on its first form.
- Not the same as [SVG Draw](/animation-engine/svg-draw), which traces a fixed line drawing rather than changing its shape.
