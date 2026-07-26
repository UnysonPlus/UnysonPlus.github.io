---
sidebar_position: 3
title: What the engine does today
slug: /3d-motion-roadmap/current-capabilities
description: An accurate map of the Animation Engine's current motion capabilities, grouped by scope.
---

# What the engine does today

An accurate map of what already exists, grouped by scope. The point of this page: the base is broad,
which is exactly why the [focus areas](./focus-areas) are so specific.

## The core it's built on

| Foundation | What it powers |
| --- | --- |
| **GSAP + ScrollTrigger + SplitText** | The industry-standard animation core — drives [Scroll Motion](/animation-engine/)'s scrub, pin and text reveals. |
| **Three.js (real WebGL)** | [WebGL Object](/animation-engine/webgl-object) — refractive glass/metal objects, particle systems, full-screen shaders. |
| **Google `<model-viewer>`** | [Model Viewer](/animation-engine/model-viewer) — glTF/GLB models with orbit, HDR lighting, and AR. |
| **Lenis smooth-scroll** | [Scroll Loop](/animation-engine/scroll-loop) — smooth, snapping, seamless section scroll. |

## On every element's *Animations* tab

- **Scroll Motion** — genuine scroll **scrub**, **pin** (with pin length), parallax, velocity-skew,
  colour-scrub, count-ups, and SplitText staggers, plus an advanced tier with curated easing curves.
- **[Hover Interactions](/animation-engine/hover)** — dozens of pointer effects: spotlight, lift, 3D
  tilt, magnetic pull, glow-border, glitch, text-scramble, WebGL image displace — stackable.
- **[Text Effects](/animation-engine/text-effects)** — kinetic typography: shimmer, typewriter,
  scramble, wave, split reveals, glitch, variable-font weight, 3D flip.
- **[Physics](/animation-engine/physics)** — spring/verlet motion: drag & throw, slingshot, float,
  orbit, gravity, jelly.
- **[Parallax](/animation-engine/parallax)**, **[Marquee](/animation-engine/marquee)**,
  **[Motion Path](/animation-engine/motion-path)** (travel an SVG path, scroll-scrub option),
  **[Flip Card](/animation-engine/flip-card)** (CSS-3D).

## Section-level orchestration

- **[Scroll Story / Scrollytelling](/animation-engine/scrollytelling)** — the flagship. A pinned
  full-screen stage where each column is a full-viewport scene played in order over a **scrubbed
  backdrop** (numbered frames, scrubbed video, or image), with beats, persistent layers, and a
  published scroll-progress value that child elements can scrub against. Includes the pan/dolly
  **camera-glide** over a still backdrop.
- **[Sticky Stack](/animation-engine/sticky-stack)** (deck-of-cards pin),
  **[Horizontal Scroll](/animation-engine/horizontal-scroll)** (incl. a 3D perspective wall),
  **[Scroll Loop](/animation-engine/scroll-loop)** (Lenis smooth + snap),
  **[Scroll Color Shift](/animation-engine/scroll-color-shift)**.
- **Motion Sequence** — the one true timeline today: it assembles a Section's children into a single
  `gsap.timeline()` on one trigger (play-once, or scrub-and-pin), tuned by an "overlap" control.

## Site-wide

- **[Cursor](/animation-engine/cursor)** (40+ styles), **[Page Transitions](/animation-engine/page-transitions)**,
  **[Preloader](/animation-engine/preloader)**, **[Scroll Progress](/animation-engine/scroll-progress)**,
  and animated **[Backgrounds](/animation-engine/backgrounds)** (35 Canvas/CSS effects).

## Real 3D & special elements

- **[WebGL Object](/animation-engine/webgl-object)** — real Three.js: glass/metal objects, image
  particles, full-screen shaders (plasma, aurora, fluid, image-distort), pointer + scroll reactive,
  with automatic quality drop and a poster fallback.
- **[Model Viewer](/animation-engine/model-viewer)** — glTF/GLB with orbit, HDR lighting, baked
  animation clips, **AR ("view in your space")**, hotspots and material variants.
- **[3D Gallery](/animation-engine/3d-gallery)** — CSS-3D ring / wall / sphere / orbit / scatter /
  stack / device layouts, scroll-scrubbable and able to sync to a Scroll Story beat.
- **[Image Sequence](/animation-engine/image-sequence)** (frame-scrub "video from stills"),
  **[SVG Draw](/animation-engine/svg-draw)** (self-drawing line art, scroll-scrub).

:::note The takeaway
This is a wide, capable base — more complete than most WordPress motion tools. That's *why* the
roadmap can be narrow and specific: a few high-leverage moves, not a rebuild.
:::

Next: [where we're leveling up →](./focus-areas)
