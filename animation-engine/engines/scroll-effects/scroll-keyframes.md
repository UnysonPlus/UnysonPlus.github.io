---
sidebar_position: 5
title: Scroll Keyframes
slug: /scroll-keyframes
description: Move any element through a Start / Middle / End keyframe timeline as you scroll — the builder's mini motion timeline — or pin it with the one-click Pin · Hold · Exit mode. Auto-drives from a Scrollytelling Full-screen Stage scene or the element's viewport travel.
---

# Scroll Keyframes

Give **any element** a mini **motion timeline**: it interpolates between a **Start**, an optional
**Middle**, and an **End** state — transform (X/Y, scale, rotate, 3D), opacity, blur — **as you
scroll**, each transition with its own easing. It's the builder answer to "keyframe several properties
over one scrubbable axis," without hand-writing code. A second mode, **[Pin · Hold · Exit](#pin--hold--exit)**,
pins the element to the screen while it appears, holds and leaves.

:::note[Where the scroll comes from — automatic]
- **Inside a [Scrollytelling](/animation-engine/scrollytelling) Full-screen Stage** → the element plays
  across **its scene's slice** of the pinned scroll (so it scrubs while the scene is on screen).
- **Anywhere else** → it plays as the element **travels through the viewport** (enters → exits).

Same control, both cases — no setup.
:::

## Where to find it

Open any **Column or element** → **Animations** tab → **Add Animation** → **Scroll** → **Scroll Keyframes**,
then pick one of its two tiles: **Scroll Keyframes** (the free Start → Middle → End timeline below) or
**Pin · Hold · Exit**. Scroll Keyframes defaults to a gentle **fade-up** (Start: nudged down + transparent →
End: natural), so you see something immediately; tune from there.

## The three states

| State | What it is |
| --- | --- |
| **Start** | The element's values at the beginning of the range (0%). Default: `Y +40px`, `opacity 0`. |
| **Middle** *(optional)* | A state it passes through at a chosen **% of the range**, with its own easing. Off by default: turn on **Use a middle keyframe**, then set **Middle at** (5–95 % of the range, default 50). Use it for a there-and-back or multi-stage move. |
| **End** | The values at the end of the range (100%). Default: natural (no offset, full opacity). |

Each state exposes **X** and **Y** (±300 px), **Scale** (0–3), **Rotate** (±360°), **Rotate X/Y** (real
3D, ±180°), **Opacity** (0–1) and **Blur** (0–40 px). Anything left at its default simply doesn't move — so
you only set what you want to animate.

**Easing** is per segment: *Ease into Middle* and *Ease into End* (Linear, Ease Out, Ease In, Ease
In-Out, Overshoot (back), Sine). Both default to **Ease Out**. A **Run on mobile** switch (on by default)
sits under the states.

## Pin · Hold · Exit

The second tile is a one-click scroll choreography for **any element**: it **pins** the element to the
screen for a set number of screen-heights of scrolling, the element **appears**, **holds**, then **exits** —
no Scrollytelling section needed. You choose four things and it builds the keyframes for you:

| Option | What it does |
| --- | --- |
| **Pin length (screens)** | How long it stays pinned: 1–8 screen-heights of scrolling, default 2. |
| **Appear by** | How it enters as it pins: Fade in (default), Rise up, Drop down, From left, From right, Scale up, or Already there. |
| **Hold until (% of pin)** | When the exit starts: 5–100 % of the pin, default 60. |
| **Exit by** | How it leaves after the hold: Slide off left (default), Slide off right, Slide off top, Slide off bottom, Fade out, Scale away, or **Stay to the end** (it stays pinned for the whole length). |
| **Run on mobile** | On by default. |

The [Scroll Timeline](/animation-engine/scroll-timeline) shows it as a lane: drag its *appear* and *hold* beats to retime them.

## Recipes

- **Parallax rise** — Start `Y 80`, End `Y -40` → the element drifts up faster than the page.
- **Scale-in on a Stage scene** — put it in a Scrollytelling Full-screen Stage column; Start
  `scale 0.8, opacity 0` → End natural; it scales in while its scene is pinned.
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
