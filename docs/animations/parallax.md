---
sidebar_position: 5
title: Parallax
---

# Parallax

Drifts an element against the scroll for a sense of depth — great for images and background columns.

<img src="/img/animations/parallax-options.png" alt="Parallax — Scroll Motion options panel" width="840" />

## Options

| Option | Notes |
| --- | --- |
| **Axis** | Vertical · Horizontal |
| **Strength** | How much it drifts relative to the scroll (try 10–30) |
| **Run on mobile** | Off by default — parallax can feel heavy on phones |

## Set it up

1. Put the image (or content) in its own **Column**.
2. Open that column → **Animations** tab → **Scroll Motion (GSAP)**.
3. Set **Scroll Effect** to **Parallax**.
4. Choose an **Axis** and a **Strength** (start around 20).
5. **Save** — the element drifts as you scroll past it.

:::note
Parallax pairs beautifully with [Smooth Scroll](./smooth-scroll) — the drift becomes silky instead of stepped.
:::
