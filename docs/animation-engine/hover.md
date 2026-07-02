---
sidebar_position: 4
title: Hover Interactions
---

# Hover Interactions

Pointer-driven effects that play **while hovering** an element — a magnetic pull toward the cursor, a 3D tilt, a spotlight glow, an image reveal, and more.

## Where to find it

Open any element → **Animations** tab → **Hover Interaction**. It's a **popover of animated tiles**; leave it on **None** for no hover effect.

Global on/off: **Theme Settings → Animations → Interactions**.

## The effects

| Effect | What it does | Key options |
| --- | --- | --- |
| **Magnetic** | The element is pulled toward the cursor | Strength |
| **3D Tilt** | Tilts in 3D following the pointer | Max tilt · Hover scale · Glare |
| **Spotlight** | A glow follows the cursor across the element | Glow color · Glow size |
| **Image Reveal** | Zoom / grayscale→color / shine sweep on an image | Style · Zoom |
| **Text Scramble** | Letters scramble then resolve | Duration |
| **Glow Border** | A glowing border traces the element | Glow color |
| **Underline Grow** | An underline grows in on hover | Line color · Grow from (left / center) |
| **Ripple** | A ripple expands from the cursor | Ripple color |
| **Lift** | Lifts up with an optional shadow | Lift distance · Shadow |
| **Color Shift** | Background fades to a new color | Hover background |

Colors use the theme **color-preset picker**, so they stay tied to your palette (with an inline custom-color option).

## Performance & accessibility

- **Loads only when used** — enqueued only on pages with a hover effect.
- **Pointer-only.** Skipped on touch screens (and honours the engine-wide **Disable on mobile**).
- **Reduced motion.** Motion-based effects (magnetic, tilt, scramble, ripple) are disabled; CSS effects like Image Reveal degrade gracefully.
