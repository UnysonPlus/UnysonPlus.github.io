---
sidebar_position: 4
title: Hover Interactions
slug: /hover
---

# Hover Interactions

:::tip Try it live
Every effect below is interactive in the **[Hover playground](./playground.mdx)** — pick an
effect, tweak its options, and copy the generated sample.
:::

Pointer-driven effects that play **while hovering** an element — a magnetic pull toward the cursor, a 3D tilt, a spotlight glow, an image reveal, and more.

## Where to find it

Open any element → **Animations** tab → **Hover Interaction**. It's a **popover of animated tiles**; leave it on **None** for no hover effect.

:::tip Stack several hover effects
Hover Interaction is **stackable** — after you add it, its tile stays in **Add Animation**, so you can add it again to combine effects on one element (e.g. **Lift + Ripple + Glow Border**). Each card picks one effect and they all run together. Just avoid pairing two *motion* effects (Magnetic / 3D Tilt / Lift) — they share the element's transform — pick one of those plus any number of decorations.
:::

## The effects

Every effect below is interactive in the **[playground](./playground.mdx)** ⚡. Grouped by kind:

**Pointer** (follow the cursor)

| Effect | What it does | Key options |
| --- | --- | --- |
| **Magnetic** | The element is pulled toward the cursor | Strength |
| **3D Tilt** | Tilts in 3D following the pointer | Max tilt · Hover scale · Glare |
| **Spotlight** | A glow — or a 2-colour gradient tint — follows the cursor | Style (glow / gradient) · Colors · Size |
| **Ripple** | A ripple expands from the cursor | Ripple color |
| **Cursor Blob** | A soft colour blob follows the pointer | Blob color · Size |
| **Cursor Trail** | Fading dots trail the pointer | Trail color · Dot size |
| **Flashlight** | A dark overlay with a torch hole that follows the pointer | Torch size · Darkness |
| **Depth Layers** | Inner children parallax at different rates | Depth |

**Motion**

| Effect | What it does | Key options |
| --- | --- | --- |
| **Lift** ⚡ | Lifts up with an optional shadow | Lift distance · Shadow |
| **Scale / Zoom**, **Push**, **Pulse**, **Bounce**, **Pop / Jelly**, **Skew**, **Rotate**, **Shake** | Transform-based motion on hover | (per effect) |
| **Squash & Stretch** | Elastic squash-and-stretch | Bounciness |

**Decoration**

| Effect | What it does | Key options |
| --- | --- | --- |
| **Glow Border**, **Gradient Border**, **Corner Brackets**, **Border Draw**, **Outline Expand** | Borders / frames drawn on hover | Colors · sizes |
| **Fill Sweep**, **Shine Sweep**, **Background Pan**, **Color Shift** | Colour sweeps & fills | Colors · speed |
| **Marching Ants** | An animated dashed outline runs around the box | Line color · Speed |
| **Shockwave** | An outline ring expands from the centre | Ring color |
| **Peel Corner** | A top-right corner folds up (dog-ear) | Fold shadow · Size |
| **Liquid Goo** | The element morphs its corners like a liquid blob | Morph speed |
| **Arrow Slide** | A CTA arrow slides + fades in (for links/buttons) | Arrow color |

**Text**

| Effect | What it does | Key options |
| --- | --- | --- |
| **Underline Grow** | An underline grows in on hover | Line color · Grow from |
| **Glitch**, **Letter Spacing**, **Text Scramble**, **Text Swap** | Type effects on hover | (per effect) |
| **Magnetic Letters** | Each character pulls toward the pointer | Strength |

**Image**

| Effect | What it does | Key options |
| --- | --- | --- |
| **Image Reveal** | Zoom / grayscale→color / shine sweep on an image | Style · Zoom |
| **Grayscale**, **Blur Focus**, **Brightness** | CSS filters on hover | Amount · direction |

Colors use the theme **color-preset picker**, so they stay tied to your palette (with an inline custom-color option). There's also a **WebGL Refract** effect (chromatic/liquid displacement) that needs the engine's Three.js pipeline.

## Performance & accessibility

- **Loads only when used** — enqueued only on pages with a hover effect.
- **Pointer-only.** Skipped on touch screens (and honours the engine-wide **Disable on mobile**).
- **Reduced motion.** Motion-based effects (magnetic, tilt, scramble, ripple) are disabled; CSS effects like Image Reveal degrade gracefully.
