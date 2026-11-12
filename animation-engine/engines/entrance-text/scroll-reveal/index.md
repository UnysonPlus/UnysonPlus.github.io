---
sidebar_position: 4.9
title: Scroll Reveal
slug: /scroll-reveal
---

# Scroll Reveal

:::tip[Try it live]
Play with the reveals in the **[Scroll Reveal playground](./playground.mdx)** — the basic clip-path
wipes and the Canvas **Pixelate In**, with live duration / delay / easing (and coarseness / steps /
speed for Pixelate). Hit **Replay** to watch it un-mask again.
:::

**Un-mask an element as it scrolls into view** — one of **20 clip-path wipes** (directional wipes, diagonals, splits, shapes that grow from the centre, and strips), or one of two Canvas image reveals: **Pixelate In**, which resolves an image from chunky pixel blocks to sharp, and **Dissolve In**, which fills it in block by block in random order. **22 styles** in all. Per-element, no library.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/scroll-reveal/)** — an interactive showcase you can explore.

## Where to find it

It's a **per-element** control: open any element (Section, Column, or a leaf like a heading, image or icon box) → **Animations** tab → **Add Animation** → **Scroll** → **Scroll Reveal**, then pick a style from the tile grid (it has a search box; hover a tile to preview it larger). Remove it with the card's **×**.

The module ships with the engine and loads its runtime **only** on pages that actually use a reveal — and only the one style's CSS/JS.

## The styles

**22 styles**, in three kinds:

| Style | What it does |
| --- | --- |
| **Wipe Left / Right / Up / Down** | The element's `clip-path` opens from one edge — a clean directional wipe. |
| **Diagonal**, **Diagonal (top-right)**, **Diagonal (bottom-left)**, **Diagonal (bottom-right)** | A corner-to-corner polygon wipe, from each of the four corners. |
| **Split Horizontal** / **Split Vertical** | Opens from the middle line outward, like doors (left and right, or top and bottom). |
| **Iris (circle)** | A circle grows from the centre outward. |
| **Box Expand**, **Rounded Box**, **Diamond**, **Ellipse**, **Triangle** | That shape grows from the centre until it uncovers the whole element. |
| **Chevron** | An arrow-shaped wipe that sweeps in from the left edge. |
| **Corner Iris** | A circle grows out of the top-left corner. |
| **Blinds (strips)** / **Bars (strips)** | The element opens as a set of strips: horizontal ones like venetian blinds, or vertical bars. |
| **Pixelate In** *(images)* | Canvas 2D pixel-resolve — the image draws at a fraction of its size with smoothing off (blocks), then steps up to full resolution. Best on an element with an `<img>`. |
| **Dissolve In** *(images)* | Canvas 2D random-block reveal — the image starts empty and its blocks fill in, in random order, until it is whole. Best on an element with an `<img>`. |

## Options

**The 20 clip wipes** share four options:

- **Duration (s)** — how long the wipe takes (0.2–2s). The default is **0.7s**, and that is
  deliberately brisk: a long wipe means a longer stretch where the element is still mostly
  clipped, and on a photo that reads as *an image that hasn't loaded* rather than as an effect.
  If you push this past about a second, scroll the page afterwards and check how it feels on
  arrival, not just in the editor.
- **Delay (s)** — wait after the element enters view before it starts.
- **Easing** — Ease / Ease Out / Ease In Out / Linear / Smooth-out (default) / Overshoot.
- **Replay on scroll** — re-run the wipe every time the element re-enters the viewport (otherwise it plays once).

**Pixelate In** has its own set (a stepped resolve has no easing):

- **Block coarseness (px)** — size of the starting pixel blocks (larger = chunkier start): 20–200, default 100.
- **Steps** — how many resolution steps from blocks to sharp: 3–8, default 5.
- **Step speed (ms)** — time per step: 40–300, default 80.
- **Replay on scroll** — re-run the resolve on re-entry.

**Dissolve In** has its own set too:

- **Block size (px)** — size of each dissolve block (smaller = finer grain): 8–80, default 24.
- **Batch speed (ms)** — the gap between each batch of blocks appearing: 10–120, default 40.
- **Replay on scroll** — re-run the dissolve on re-entry.

## How it works

The clip wipes are pure **CSS `clip-path`**: the element starts clipped (per direction) and the runtime adds an `is-in` class when the layout box scrolls into view, transitioning the clip to full. (A plain IntersectionObserver can't be used — a zero-area clip reports ratio 0 — so a passive, rAF-throttled scroll check on the *layout* box is used instead.)

The wipe **starts before the element reaches the screen**, and how far before depends on how long
the wipe itself takes — a 1.3s wipe is given roughly twice the head start of a 0.6s one — so that by
the time you are looking at it, it is well advanced or already finished. This is the
difference between an effect and a defect: trigger it only once the element is fully in view and
the reader arrives at a blank box and watches it open, which looks exactly like a broken image.
Measured on a real page, moving the trigger from the old value to this one took samples that were
still less than a quarter revealed on arrival from 9 (out of 46) to **none**, while still catching
17 of 46 part-way through, so the effect is plainly visible on an unhurried scroll. Scaling the head
start with the duration then cleared the remainder: on a page using 1.2–1.3s wipes, an ordinary
mouse-wheel scroll went from 1 blank and 5 half-open images to **none of either**.

One limit worth knowing: if you *fling* the page — scrolling several screens a second — no amount of
head start can finish a wipe that takes well over a second, and some elements will still be caught
opening. If that matters for your site, a shorter **Duration** is the fix, not a longer runway. **Pixelate In** draws the `<img>` onto a `<canvas>` with image-smoothing off and steps the resolution up; **Dissolve In** draws it onto a `<canvas>` that starts empty and fills its blocks in random order. Everything honours **reduce motion** (the element is shown instantly, fully revealed).
