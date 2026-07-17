---
sidebar_position: 12
title: 3D Gallery
slug: /3d-gallery
---

# 3D Gallery

:::tip Try it live
Preview every design in the **[3D Gallery playground](./playground.mdx)** — pick a design, tweak its
geometry, and watch it render with sample images. It runs the **real** module (the same CSS and 3D
driver the element ships), then copies the generated sample option.
:::

Your images, wrapped onto a moving 3D scene — a ring of cards revolving around the viewer, a curved
wall scrolling past, or a slowly spinning globe of photos. One element, a **Design** picker, and a
pure-CSS 3D scene driven by a single rAF loop (no library).

## Where to find it

Add **3D Gallery** from the builder palette → **Media Elements**. Drop your images into the
**Content** tab, then pick a **Design** on the **Design** tab — each design reveals its own geometry
controls. The shared card controls (Box Style, shadow, captions, click action) live on the **Style**
tab.

The element ships with the **Animation Engine** extension — activate it in **Extensions** if you
don't see it.

## The designs

**3D & Perspective**

- **Carousel Ring** — a ring of cards revolving around you. Tilt it back (**Ring Tilt**), open the
  loop up (**Ring Opening**), or roll the whole ring to a diagonal (**Diagonal Tilt**).
- **Panorama Wall** — a curved wall of cards scrolling sideways. **Curvature** is signed: negative
  wraps the wall *toward* you (concave), positive bulges it *away* (convex).
- **Card Sphere** — a spinning disco-ball of images. **Globe Size** zooms the sphere; **Card Size**
  sets how finely it tiles (the bands and card counts are derived to cover it).

More designs are on the way — the picker groups them by family, so the list grows without the
element changing.

## Shared options

Every design shares the same surrounding controls, so switching design keeps your setup:

- **Motion** — Auto-rotate / Continuous, plus **Drag**, **Scroll-scrub** and **Static**.
- **Loop Duration (s)** — seconds for one full loop; *lower is faster*.
- **On Hover** — **Slow down** (default), **Pause**, or **Keep rotating**. It reacts to the gallery
  itself, not the empty stage around it.
- **Card Ratio / Corner Radius / Card Padding**, **Box Style** + **shadow**, and **captions**.
- **On Card Click** — opens the shared gallery **lightbox**. Off by default (the cards are moving).
- **Use as Section Background** — fill the parent Section behind its content; the gallery then
  auto-runs and stays non-interactive.

## Set it up

1. Add a **3D Gallery** (builder palette → **Media Elements**) and add your **images**.
2. **Design** tab → pick a design, then tune its geometry.
3. Set **Loop Duration** and **On Hover** to taste.
4. **Save** — the scene renders and loops on the front end.

## Performance & accessibility

- **Loads only when used** — the CSS + driver are enqueued only on pages with the element, and the
  **lightbox** ships only if you turn the click action on.
- **Reduced motion** renders a **static** scene — no spin, no scroll.
- **One rAF loop** per gallery drives every card; there's no per-card timer and no library.
