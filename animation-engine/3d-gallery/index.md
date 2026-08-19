---
sidebar_position: 12
title: 3D Gallery
slug: /3d-gallery
---

# 3D Gallery

:::tip[Try it live]
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
- **Totem Wall** — a flat row of *independent* vertical totems: each column wraps its cards around
  its own axis into a rounded pillar and cascades vertically (up / down / alternate). **Curvature**
  is signed — negative curls each column away (concave), positive bulges it toward you into a full
  pill; **Zoom** sets the totem size (fewer, larger totems as it rises), and a steep **Tilt** gives
  the diagonal, diamond-lattice look.
- **Parallax Totem** — the depth-scatter sibling of Totem Wall. The same vertical totems, but each
  card floats at a *seeded* depth and size and drifts at a depth-varied speed — near cards faster
  than far ones (the parallax). Leave **Scatter**, **Size Variance** and **Parallax Depth** at 0 for
  a clean grid; raise them for a loose, floating depth field.
- **Card Tunnel** — an infinite perspective corridor. Four walls (ceiling, floor, left, right) of
  cards recede to a central vanishing point and fly **Forward** or **Backward**, recycling
  seamlessly. **Tunnel Size** widens the corridor (100%+ opens the walls past the frame for an
  immersive fly-through), **Card Length** streaks the panels, and **Depth Fade** dissolves the far
  end into the dark.
- **Spiral Stream** — cards threaded along a 3D helix that streams past the camera, each rotating
  around its own vertical axis so you see fronts, edge-on slivers and mirrored backs. **Spiral Turns**
  sets the revolutions, **Taper** narrows the coil into a vortex or flares it out, **Card Count** fills
  it, and **Scale Pulse** breathes the sizes for a living stream.
- **Depth Stack** — a deck of cards receding straight into depth (the front card the hero) that
  streams toward the camera: the front flies out and fades while the next comes forward and a new one
  fades in at the back. **Spread** (Fan, along **Spread Angle**) or **Scatter** fans the deck out,
  **Wobble** jitters the tilt, and **Depth Fade** + **Depth Blur** give a depth-of-field falloff.
  Pair it with **Motion → Scroll-scrub** so the visitor's scroll advances the stack.

**Carousel & Flow**

- **Card Reel** — a vertical cover-flow carousel. A single column of cards wraps around a horizontal
  cylinder: the centre card sits flat and forward (the focus) while the ones above and below tilt back
  along the curve. It flows up/down, or **Stop at Centre** snaps each card to the middle. **3D Curve**
  bends the cylinder from a flat vertical strip to a tight barrel.
- **Film Strip** — the horizontal sibling of Card Reel. A single row of cards wraps around a vertical
  cylinder: the centre card sits flat and forward (the focus) while the ones to the left and right
  tilt back. It flows left/right, or **Stop at Centre** snaps each card to the middle; **3D Curve**
  bends the cylinder from a flat horizontal row to a tight barrel.
- **Wheel Carousel** — cards fanned on a big Ferris-style wheel whose hub sits below the frame, so
  only the top arc shows. Each card rotates tangent to the wheel (upright at the top = the focus,
  tilting away at the sides) and the wheel steps around card by card. **Overshoot** lets a step sail
  past and settle, **Anticipation** winds it back first, and **Hold** pauses on each card; **Wheel
  Size** sets the radius.
- **Cover Flow** — the classic album cover flow: the centre card faces you, the immediate neighbours
  tilt to **Side Tilt** and recede, and further cards stack compressed behind. **One design covers
  both orientations** — set **Orientation** to Horizontal or Vertical (no need for two separate
  designs). **Stop at Centre** gives the snappy album-flick step.
- **Carousel Flow** — a flat focus carousel: the centre card is full size while the side cards scale
  down (**Side Card Scale**) and fade as they slide past. No tilt; Horizontal or Vertical.

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
