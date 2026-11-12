---
sidebar_position: 4.7
title: Marquee
slug: /marquee
---

# Marquee

:::tip[Try it live]
Pick a direction and tweak the ticker in the **[Marquee playground](./playground.mdx)** —
speed, gap, separator, warp, curve, drag — and copy the generated sample.
:::

Turn any element's content into a **seamless, never-ending ticker** — running text, a logo band, scrolling cards. The content is cloned into a doubled track and translated by exactly one set, so the loop has no visible jump. Pure CSS/JS, no library.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/marquee/)** — an interactive showcase you can explore.

## Where to find it

Open any element → **Animations** tab → **Add Animation → Ambient → Marquee**, then pick a direction tile: **Left · Right · Up · Down**. Remove the card (×) to turn it off. Works best on a heading or text with large type, or a row of logos/images.

## Options

| Option | Notes |
| --- | --- |
| **Direction** | Left / Right / Up / Down |
| **Speed** | Slow · Normal · Fast, or a **Custom speed** (px/s) that overrides it |
| **Gap (px)** | Space between each repeat (0–200, default 40) |
| **Text orientation** | **Up / Down only.** Horizontal (stacked lines, the default) keeps normal lines that scroll vertically; **Vertical — sideways** and **Vertical — upright letters** turn the text itself on its side |
| **Separator** | Optional text shown between repeats (e.g. `•`) |
| **Pause on hover** | |
| **Pause / Play control** | Shows a small Pause / Play button on the marquee: an accessible way for visitors to stop looping motion (WCAG 2.2.2). Recommended for anything that scrolls on its own |
| **Fade edges** | Softly fade the content in/out at the container edges |
| **Text style** | Normal or **Outline** (hollow letters) |

### Warp & Distortion

| Option | Notes |
| --- | --- |
| **Skew horizontal / vertical** | Slant the ticker (−100…+100) |
| **Tilt (angle)** | Run the banner at an angle |
| **Bend (3D tilt)** | 3D perspective tilt — works on any content |
| **Curve (arc text)** | A **true curve** — the text follows a real arc (rainbow up / valley down). Text content only; overrides Bend for text. The element grows taller on its own to fit the arc. |
| **Wave** | The content undulates up/down as it scrolls (0–100) |

### Behavior

| Option | Notes |
| --- | --- |
| **React to scroll** | Speeds up with the visitor's scroll velocity, settles back when they stop |
| **Draggable** | Grab and flick the ticker, with momentum |

## Performance & accessibility

- **Seamless** — the content is doubled so the wrap is invisible for short text or long strips.
- **Loads only when used**; one shared render loop drives every marquee.
- **Reduced motion** and the engine-wide **Disable heavy effects on mobile** setting leave the content static (unclipped).
- **Pause / Play control** gives visitors a button to stop the movement.

:::tip[Curved headline]
For the demo-style curved headline, use a **Special Heading** with large, bold text → Marquee **Left** → **Curve** ~70. Bump it toward 100 for a rounder arc.
:::
