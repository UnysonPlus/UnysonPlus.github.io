---
sidebar_position: 4.9
title: Scroll Reveal
slug: /scroll-reveal
---

# Scroll Reveal

:::tip Try it live
Play with every reveal in the **[Scroll Reveal playground](./playground.mdx)** — the six clip-path
wipes and the Canvas **Pixelate In**, with live duration / delay / easing (and coarseness / steps /
speed for Pixelate). Hit **Replay** to watch it un-mask again.
:::

**Un-mask an element as it scrolls into view** — an animated **clip-path wipe** (up, down, left, right, an **iris** circle, or a **diagonal**), or a Canvas **Pixelate In** that resolves an image from chunky pixel blocks to sharp. Per-element, no library.

## Where to find it

It's a **per-element** control: open any element (Section, Column, or a leaf like a heading, image or icon box) → **Animations** tab → **Scroll Reveal** → pick a style (default **None**).

The module ships with the engine and loads its runtime **only** on pages that actually use a reveal — and only the one style's CSS/JS.

## The styles

| Style | What it does |
| --- | --- |
| **Wipe Up / Down / Left / Right** | The element's `clip-path` opens from one edge — a clean directional wipe. |
| **Iris** | A circular `clip-path` grows from the centre outward. |
| **Diagonal** | A corner-to-corner polygon wipe. |
| **Pixelate In** *(images)* | Canvas 2D pixel-resolve — the image draws at a fraction of its size with smoothing off (blocks), then steps up to full resolution. Best on an element with an `<img>`. |

## Options

**Clip wipes** share four options:

- **Duration (s)** — how long the wipe takes (0.2–2s).
- **Delay (s)** — wait after the element enters view before it starts.
- **Easing** — Ease / Ease Out / Ease In Out / Linear / Smooth-out (default) / Overshoot.
- **Replay on scroll** — re-run the wipe every time the element re-enters the viewport (otherwise it plays once).

**Pixelate In** has its own set (a stepped resolve has no easing):

- **Block coarseness (px)** — size of the starting pixel blocks (larger = chunkier start).
- **Steps** — how many resolution steps from blocks to sharp.
- **Step speed (ms)** — time per step.
- **Replay on scroll** — re-run the resolve on re-entry.

## How it works

The clip wipes are pure **CSS `clip-path`**: the element starts clipped (per direction) and the runtime adds an `is-in` class when the layout box scrolls into view, transitioning the clip to full. (A plain IntersectionObserver can't be used — a zero-area clip reports ratio 0 — so a passive, rAF-throttled scroll check on the *layout* box is used instead.) **Pixelate In** draws the `<img>` onto a `<canvas>` with image-smoothing off and steps the resolution up. Everything honours **reduce motion** (the element is shown instantly, fully revealed).
