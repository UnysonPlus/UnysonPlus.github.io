---
sidebar_position: 3
title: Physics Effects
slug: /physics
---

# Physics Effects

:::tip Try it live
Grab, fling and poke all 27 effects in the **[Physics playground](./playground.mdx)** — drag &
throw, cursor spring/attract/repel, float/pendulum/orbit, gravity drop, jelly/recoil/spin — and
copy the generated sample.
:::

Physics-driven motion you can attach to **any element** — grab-and-throw, buoyant floating, gravity drops, jelly wobbles and more. It runs on a tiny built-in spring/verlet integrator, **no library**.

## Where to find it

Open any element → **Animations** tab → **Physics**. The picker is a **popover of animated tiles** (each previews its motion, with the effect name on it). Leave it on **None** for no physics.

Global on/off: **Theme Settings → Site-wide UX → Physics**.

## The effects

**27 effects**, grouped:

| Group | Effects |
| --- | --- |
| **Drag** | Draggable (grab & throw — spring back or glide to a stop) · Slingshot |
| **Pointer** *(skipped on touch)* | Spring Follow · Attract · Repel · Orbit Cursor · Rubber Band · Inertia Tilt |
| **Ambient** *(continuous)* | Float · Levitate · Wind Sway · Pendulum · Wobble · Breathing · Drift · Orbit Point |
| **Entrance** *(on scroll-in)* | Gravity Drop · Gravity Rise · Weight Sag · Ragdoll · Pop In |
| **Container** | Bounce Box (bounces around its parent) |
| **Reaction** *(hover / click)* | Jelly · Squash & Stretch · Recoil · Shake · Momentum Spin |

Each effect reveals its own options (stiffness, damping, strength, distance, trigger, axis lock, and so on) once you pick it — with sensible defaults, so most effects work the moment you select them.

## Set it up

1. Open any element → **Animations** tab → **Physics**.
2. Pick an effect from the popover — e.g. **Draggable**, **Float**, **Pop In** or **Jelly**.
3. Tune its options if you like, then **Save**.
4. View the page — drag effects are grab-and-throw, ambient effects loop, entrance effects play as they scroll in, reaction effects fire on hover/click.

## Performance & accessibility

- **One shared loop.** A single render loop drives every physics element on the page.
- **Loads only when used** — the runtime is enqueued only on pages with a physics effect.
- **Reduced motion** skips **all** physics (every one is motion).
- **Touch:** pointer-following effects (Spring Follow, Repel, Orbit Cursor…) are skipped on touch screens; the engine-wide **Disable on mobile** honours phones.
- **Off-screen pause:** continuous effects pause when scrolled out of view or the tab is hidden.

:::note One effect per element
Physics overwrites the element's transform each frame, so a physics effect and an entrance transform on the **same** element don't combine — physics wins. Put them on different elements if you need both.
:::
