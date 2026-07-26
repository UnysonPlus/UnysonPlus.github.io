---
sidebar_position: 2
title: Motion vocabulary
slug: /3d-motion-roadmap/terminology
description: Plain-language definitions of scrub, pin, scrollytelling, motion timeline, real 3D vs CSS 3D, shaders, particles and more.
---

# Motion vocabulary

"3D motion" is a fuzzy phrase that covers several very different techniques. Here's the working
vocabulary — because the words map directly to the tools and the roadmap.

## Scroll-driven animation (the umbrella)

Any animation whose progress is tied to the **scroll position** rather than to a clock.

- **Scrollytelling / beats** — a page that advances through discrete "beats" of a story as you
  scroll: text scrolls past a pinned visual that changes per beat.
- **Scrub** — the animation's playhead is wired directly to the scrollbar. Scroll down plays it
  forward; scroll up rewinds it, frame-for-frame. This is what makes a camera move feel *controlled
  by scroll*.
- **Pin** — an element is frozen in place for a set scroll distance while things animate over or
  through it.
- **The premium recipe = pin + scrub + a sequenced timeline.** A section locks, a choreographed
  timeline plays across the pinned range, then releases. Almost every high-end scroll section is
  this.

:::tip You can already do this
[Scroll Motion](/animation-engine/) gives you genuine pin + scrub, and
[Scroll Story](/animation-engine/scrollytelling) gives you the pinned, beat-based cinematic stage.
:::

## Motion timeline

A tool concept: the ability to **sequence and keyframe several animated properties on one shared
time axis** — like After Effects or a video editor — with an easing curve per keyframe. Two flavours:

- **Code timeline** — you write the sequence in JavaScript (GSAP's `gsap.timeline()`). This is the
  reference implementation, and the engine already uses it internally.
- **Visual timeline / sequencer** — a GUI with tracks, keyframes and easing handles you scrub and
  edit live (like Theatre.js Studio, Rive's editor, or Spline's timeline). "Proper motion timeline"
  usually means this kind.

## Real 3D vs "CSS 3D"

- **Real 3D (WebGL)** — a GPU-rendered scene on a `<canvas>`: real geometry, lights, cameras,
  materials and shaders. True depth, reflections, particle clouds. Costs GPU and battery. This is
  what [WebGL Object](/animation-engine/webgl-object) and [Model Viewer](/animation-engine/model-viewer)
  use.
- **CSS 3D ("fake 3D")** — DOM elements tilted in a perspective box with `transform: rotate3d /
  translateZ`. Cheap, accessible, perfect for card flips, tilt, layered parallax depth and
  turntable-style rings — but they're flat planes in perspective, not a rendered scene. The
  [3D Gallery](/animation-engine/3d-gallery) and [Flip Card](/animation-engine/flip-card) live here.

Both are legitimate. CSS 3D delivers a lot of "depth" for almost no performance cost; real WebGL is
reserved for the moments that truly need a rendered scene.

## The rest of the words

| Term | What it means |
| --- | --- |
| **Camera moves** | Dolly (push in/out), pan, orbit, fly-through. Scrubbing a WebGL camera along a path = the "cinematic scroll." |
| **Parallax** | Background layers move slower than foreground for a sense of depth. |
| **Particles** | Many small sprites driven by math/physics — dust, sparks, morphing point clouds. |
| **Shaders (GLSL)** | Tiny GPU programs that create distortion, liquid/gooey, gradient-mesh and image-transition effects. |
| **Physics** | Spring/inertia simulation — weighty cursor followers, magnetic buttons, draggable momentum. |
| **Page transitions** | Animating between pages instead of a hard reload (fade / slide / morph). |

Next: [what the engine can do with all of this today →](./current-capabilities)
