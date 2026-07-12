---
sidebar_position: 4.87
title: Motion Path
slug: /motion-path
---

# Motion Path

:::tip Try it live
Send a badge along any of the **37 shapes** in the **[Motion Path playground](./playground.mdx)** —
pick a shape, choose a drive (scroll / loop / on-view), tweak size, offset, easing and align-to-path,
then copy the generated sample. It runs the real runtime's path-sampling and `apply()` math.
:::

Send any element **travelling along a path** instead of a straight line — a wave, a loop, a spiral, a staircase, a star, or your own SVG path. Drive it by **scroll**, on a **loop**, or **once when it enters view**, and optionally **rotate it to follow the curve** so it noses along like it's on rails. Per-element, pure SVG geometry, no library.

## Where to find it

It's a **per-element** control: open any element (Section, Column, or a leaf like a heading, image or icon box) → **Animations** tab → **Motion Path** → pick a shape (default **None**).

The module ships active with the engine and loads its runtime **only** on pages that actually use a motion path.

## How it works

Each shape is an **SVG path in a normalized 0–100 box**. At runtime the element is moved **relative to the path's start point** — so it begins at its natural layout position and travels the shape from there, scaled to the **Path size** you set. Nothing about your layout changes; the element is only transformed.

You pick **how** it moves with the **Drive** option:

- **Scroll (scrubbed)** — the element's position along the path is tied to the scrollbar: as the element passes through the viewport, it walks the path from start to end. Scroll back up and it walks back. This is the "product flies in on a curve" effect.
- **Loop** — it travels the whole path continuously, forever, over the **Duration** you set. Great for a badge orbiting a circle or a shape tracing a figure-8.
- **On view** — it plays the path **once**, eased, the first time it scrolls into view.

Turn on **Align to path** and the element also **rotates to the path tangent** at every point, so an arrow, card or icon points the way it's heading.

## Shapes

**37 presets** — plus a **Custom path** where you paste your own SVG path data:

| Group | Shapes |
| --- | --- |
| **Curves & organic** | Wave, Arc, Loop, S-Curve, Zigzag, Spiral, Circle, Incline |
| **Loops & knots** | Figure 8, Double Loop, Knot |
| **Geometry** | Triangle, Square, Diamond, Pentagon, Hexagon, Octagon, Star |
| **Mechanical** | Stairs, Steps Down, L-Corner, Chevron, Lightning, U-Turn |
| **Physics-feel** | Bounce, Pendulum, Helix, Corkscrew, Swoosh, Comet, Ricochet |
| **Decorative** | Heart, Teardrop, Petal, Ribbon |
| **Straight** | Line, Drift |

## Options

| Option | Notes |
| --- | --- |
| **Shape** | The path the element travels — one of the 37 presets, or **Custom path** |
| **Drive** | **Scroll (scrubbed)** — position tied to the scrollbar · **Loop** — travels the path forever · **On view** — plays once on enter |
| **Duration** | For **Loop** / **On view** — one full pass along the path (0.5–20s, default 4) |
| **Path size** | How large the path is in pixels — the box the shape travels within (40–1200px, default 300) |
| **Start offset** | Begin part-way along the path (0–100%) |
| **Reverse** | Travel the path backwards |
| **Align to path** | Rotate the element to the path tangent, so it follows the curve's heading |
| **Easing** | For **Loop** / **On view** — Linear, Ease In, Ease Out, Ease In Out (Scroll drive stays linear with the scrollbar) |

## Custom paths

Choose the **Custom path** shape and paste an SVG path **`d`** into the field. Author it in a **0–100 coordinate box** (the same space the presets use) and the runtime scales it to your **Path size**. For example:

```
M0,50 C25,0 75,100 100,50
```

Any valid single-subpath `d` works (line, curve, arc commands). Keep it to **one subpath** — the element travels a continuous line, so a path with gaps would jump.

## Set it up

1. Open an element → **Animations** tab → **Motion Path**.
2. Pick a **shape** (or **Custom path** and paste your own `d`).
3. Choose a **Drive** — **Scroll** to scrub it with the page, **Loop** to run it forever, or **On view** to play once.
4. Set the **Path size**, and (optionally) a **Start offset**, **Reverse**, and **Align to path**.
5. **Save** and scroll — the element rides the path.

## Performance & accessibility

- **Loads only when used** — the base CSS + one runtime ship only on pages with a motion-path element; the shape rides in a data attribute, so there are **no per-shape files**.
- **Pure SVG geometry** — the runtime samples the path with `getPointAtLength` and moves the element with a `transform`; **one scroll listener** drives every scrubbed element, one `requestAnimationFrame` loop drives loop / on-view.
- **Reduced motion** — visitors who prefer reduced motion keep the element at its natural layout position (no travel).
- **Editor-safe** — the path runs on the front end; inside the Page Builder the element stays put so editing is simple.
