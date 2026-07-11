---
sidebar_position: 4.8
title: 3D Flip Card
slug: /flip-card
---

# 3D Flip Card

:::tip Try it live
Pick a style and flip it in the **[Flip Card playground](./playground.mdx)** — seven styles,
hover / click / scroll / auto triggers, axis, depth, easing and the full back face — and copy
the generated sample.
:::

Turn any element into a **3D flip card**: its existing content becomes the **front**, and a **back face** you define (heading, text, image, button, colours) is revealed with a 3D turn. Seven flip styles, four triggers, pure CSS 3D transforms — no library.

## Where to find it

Open any element → **Animations** tab → **3D Flip Card** (a popover of style tiles). Pick a flip style; the settings below reveal. Works great on an Icon Box, an Image, or a plain container.

Global on/off: **Theme Settings → Site-wide UX → Effects → Enable 3D Flip Card**.

## Flip styles

| Style | What it does |
| --- | --- |
| **Flip** | The classic 180° card flip. |
| **Cube** | A solid quarter-turn — the card rotates like a face of a cube, with real depth. |
| **Fold** | The front folds away on a hinged edge (like a book cover), revealing the back. |
| **Door** | The front swings open on its side edge like a door. |
| **Diagonal** | Tumbles corner-to-corner on a diagonal axis. |
| **Pop** | A flip with a springy overshoot and a little scale bump for punch. |
| **Carousel** | A flip with depth, so it reads as a slab turning on a stand. |

Each style (except Diagonal, which is fixed) turns on your chosen **Direction / axis** — *Horizontal (Y axis)* or *Vertical (X axis)*.

## Triggers

| Trigger | Behavior |
| --- | --- |
| **Hover** | Flips while the pointer is over it, flips back on leave (pure CSS). |
| **Click / tap** | Toggles the flip on click; keyboard-accessible (focus + Enter/Space). |
| **Scroll into view** | Flips once, automatically, when it scrolls into view. |
| **Auto (loop)** | Flips back and forth on a timer (**Auto interval**). Pauses when off-screen or the tab is in the background. |

## The back face

| Option | Notes |
| --- | --- |
| **Back heading / text** | Your copy on the back. |
| **Back background image** | Optional image behind the back content (cover); a subtle scrim keeps text readable. |
| **Back button** | Optional call-to-action — **text** + **URL** (external links open in a new tab). |
| **Back content align** | Top / Center / Bottom. |
| **Back background / text color** | Preset (theme palette) or a custom colour. |

## Look & feel

| Option | Notes |
| --- | --- |
| **Card height** | Both faces share this height. |
| **Flip speed** | Duration of the turn. |
| **3D depth (perspective)** | Lower = more dramatic 3D. |
| **Easing** | Smooth · Spring (overshoot) · Ease out · Linear. |
| **Corner radius** | Rounds both faces. |

## Performance & accessibility

- **Pure CSS 3D transforms**, no library; the runtime **loads only on pages that use it**.
- **Auto** flips pause off-screen and in background tabs, so they never waste CPU.
- **Reduced motion** — the turn transition is disabled for visitors who ask their OS to reduce motion.

:::tip Feature-card grid
Put a **3D Flip Card** on each Icon Box in a row (style **Cube** or **Flip**, trigger **Hover**) and add a back heading + **button** — an instant interactive feature grid.
:::
