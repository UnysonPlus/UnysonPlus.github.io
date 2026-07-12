---
sidebar_position: 8.56
title: Horizontal Scroll
slug: /horizontal-scroll
---

# Horizontal Scroll Section

:::tip Try it live
Scrub a gallery strip in the **[Horizontal Scroll playground](./playground.mdx)** — drag the vertical
scroll and the pinned panels travel sideways; switch between all 15 styles (standard, snap, center
focus, 3D carousel, perspective wall, velocity skew, drag…) and tune panel width & intensity. It runs
the real pin + per-panel transforms.
:::

Pin a Section and move its cards **sideways as the visitor scrolls down** — a gallery / timeline strip. **15 styles**, from a plain track to center-focus, a 3D carousel, a perspective wall, a velocity-driven skew, and a free drag-through. Pure sticky + one passive scroll listener, **no library**.

## Where to find it

It's a **Section-level** control: build a Section with **2+ columns** as the panels, then open the Section → **Animations** tab → **Horizontal Scroll** → pick a style (default **Off**).

The Section pins for as long as its horizontal travel lasts, then releases — the module loads its runtime **only** on pages that use it, and only the one chosen style's partial.

## The styles

**Track-level** — how the whole strip moves:

| Style | What it does |
| --- | --- |
| **Standard** | The row translates left as you scroll down. |
| **Reverse** | The row starts scrolled and moves right. |
| **Snap** | Snaps to whole-panel steps. |
| **Perspective Wall** | The strip tilts in 3D so panels recede toward one side. |
| **Velocity Skew** | The strip skews with scroll speed and eases back at rest. |
| **Drag / Flick** | Not pinned — a strip you grab and throw, with inertia. |

**Per-panel** — the track moves standard while each panel transforms by its distance from centre:

| Style | What the panels do |
| --- | --- |
| **Center Focus** | The centre panel is full; the sides scale + dim. |
| **3D Carousel** | Panels rotate in Y around the centre. |
| **Parallax** | Alternating panels drift at different speeds. |
| **Fade** / **Blur Focus** | Off-centre panels fade / blur. |
| **Grow In** | Panels grow in as they reach the centre. |
| **Arc** / **Wave** / **Zigzag** | Panels ride an arc, a sine wave, or an up/down zigzag. |

## Options

- **Panel width** — Natural (content width), Narrow (60%), Wide (80%) or Full-screen (100%).
- **Intensity** — the strength of the chosen style (how much the panels scale / tilt / skew / parallax).

## How it works

The Section gets a `position: sticky`, full-height pin box and its height is extended by the panel row's horizontal length, so scrolling *down* translates the row *across*. A passive, rAF-throttled scroll listener drives the track transform (and each panel's, for the per-panel styles). It honours **reduce motion** (the panels simply flow/wrap normally).
