---
sidebar_position: 8.65
title: Scroll Keyframes
slug: /scroll-keyframes
description: Move any element through a Start / Middle / End keyframe timeline as you scroll — the builder's mini motion timeline. Auto-drives from a Scroll Story scene or the element's viewport travel.
---

# Scroll Keyframes

Give **any element** a mini **motion timeline**: it interpolates between a **Start**, an optional
**Middle**, and an **End** state — transform (X/Y, scale, rotate, 3D), opacity, blur — **as you
scroll**, each transition with its own easing. It's the builder answer to "keyframe several properties
over one scrubbable axis," without hand-writing code.

:::note[Where the scroll comes from — automatic]
- **Inside a [Scroll Story](/animation-engine/scrollytelling) stage** → the element plays across **its
  scene's slice** of the pinned scroll (so it scrubs while the scene is on screen).
- **Anywhere else** → it plays as the element **travels through the viewport** (enters → exits).

Same control, both cases — no setup.
:::

## Where to find it

Open any **Column or element** → **Animations** tab → **Scroll Keyframes** → pick the tile. It defaults
to a gentle **fade-up** (Start: nudged down + transparent → End: natural), so you see something
immediately; tune from there.

## The three states

| State | What it is |
| --- | --- |
| **Start** | The element's values at the beginning of the range (0%). Default: `Y +40px`, `opacity 0`. |
| **Middle** *(optional)* | A state it passes through at a chosen **% of the range**, with its own easing. Turn it on for a there-and-back or multi-stage move. |
| **End** | The values at the end of the range (100%). Default: natural (no offset, full opacity). |

Each state exposes **X**, **Y**, **Scale**, **Rotate**, **Rotate X/Y** (real 3D), **Opacity**, and
**Blur**. Anything left at its default simply doesn't move — so you only set what you want to animate.

**Easing** is per segment: *Ease into Middle* and *Ease into End* (Linear, Ease Out, Ease In, Ease
In-Out, Overshoot, Sine).

## Recipes

- **Parallax rise** — Start `Y 80`, End `Y -40` → the element drifts up faster than the page.
- **Scale-in on a Story scene** — put it in a Scroll Story column; Start `scale 0.8, opacity 0` → End
  natural; it scales in while its scene is pinned.
- **3D tilt-through** — Start `rotationY -25`, Middle `rotationY 0` (at 50%), End `rotationY 25` → the
  card turns through you as you scroll.
- **Focus pull** — Start `blur 12`, End `blur 0` → it sharpens as it arrives.

## Performance & accessibility

- **Loads only when used** — one tiny runtime, on pages that have a keyframed element.
- **One scroll clock** — rides the shared frame loop (the same one Smooth Scroll and the other scroll
  effects use), so it stays in sync and **pauses when the tab is hidden**.
- **Reduced motion** — visitors who ask for reduced motion see the element in its natural state, static.
- **Mobile** — a per-element *Run on mobile* switch (on by default) to bow out on phones if a move feels heavy.
- **No GSAP** — a small hand-rolled interpolation; a keyframed heading never pulls a library onto the page.
