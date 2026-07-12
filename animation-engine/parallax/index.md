---
sidebar_position: 4.5
title: Parallax Depth Layers
slug: /parallax
---

# Parallax Depth Layers

:::tip Try it live
Drift a layered hero in the **[Parallax playground](./playground.mdx)** — move your pointer over the
scene, tweak the Scene's intensity / smoothing / source, and click any layer (sky → mountains → card
→ accents) to change its depth, axis, direction, scale and depth-blur. It runs the real render loop.
:::

Give a scene a sense of **depth** — mark a few elements as *layers* with different depths and they drift at different speeds as the pointer moves (and/or as the page scrolls). Perfect for layered hero scenes, floating shapes, and illustrations. One shared render loop, **no library**.

## Where to find it

Open any element → **Animations** tab → **Parallax Layers**. It's a role picker:

| Role | Use it on | What it does |
| --- | --- | --- |
| **None** | — | Off (default) |
| **Scene** | the container (Section / Row / Column) | The tracking stage — pointer position is measured relative to it |
| **Layer** | each moving element inside | Drifts by its **Depth** as the pointer/scroll moves |

Global on/off: **Theme Settings → Site-wide UX → Effects → Enable parallax layers**.

:::tip Scene is optional
A **Layer** with no Scene ancestor tracks the **whole window** — so you can just drop a Depth on a few elements and get global mouse parallax. Mark a **Scene** when you want the effect scoped to one section (or several independent scenes on a page).
:::

## Scene options

| Option | Notes |
| --- | --- |
| **Driven by** | Pointer · Scroll · Pointer + Scroll |
| **Intensity** | How far the deepest layers travel (px) at full pointer/scroll |
| **Smoothing** | Higher = smoother, more lag as layers ease to the pointer |

## Layer options

| Option | Notes |
| --- | --- |
| **Depth** | 0–100. `0` = fixed; higher = closer / more movement |
| **Axis** | Both · Horizontal only · Vertical only |
| **Direction** | *With* the pointer, or *Against* (the classic background-recedes feel) |
| **Scale with depth** | Deeper layers sit slightly larger, hiding their edges as they move |
| **Depth blur** | A subtle blur that grows with depth (depth-of-field) |

## Set it up

1. Add a **Section** → **Animations** tab → **Parallax Layers → Scene** (Driven by: Pointer).
2. Put a few elements inside (images, shapes, a heading).
3. On each, set **Parallax Layers → Layer** with a different **Depth** — e.g. background `15`, midground `40`, foreground `80`. Set the background one to **Against** for extra depth.
4. **Save** and view — move the pointer and the layers separate by depth.

For an overlapping hero scene, absolutely-position the layers inside the Scene (the Scene is `position:relative`). On normal-flow elements you get a subtler drift.

## Performance & accessibility

- **One shared loop** drives every layer on the page; off-screen layers are culled.
- **Loads only when used.**
- **Reduced motion** and **Disable on mobile** skip it entirely (layers stay put).
- The **Pointer** source is skipped on touch screens; a Scene set to **Scroll** still moves.

:::note One transform per element
The runtime sets each layer's `transform` every frame, so a parallax layer and an entrance/physics transform on the **same** element don't combine. Put them on different elements.
:::
