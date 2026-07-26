---
sidebar_position: 1
title: 3D Motion & Roadmap
slug: /3d-motion-roadmap
description: How premium "3D motion" websites are built, what the Animation Engine can do today, and where it's headed next.
---

# 3D Motion & Roadmap

This is the vision section for the Animation Engine — a plain-language guide to how modern
**"3D motion"** websites are built, an honest map of **what the engine can already do**, and the
**roadmap** for where it's going next: real 3D scenes, motion timelines, and buttery site-wide
scroll.

:::info A living document
This is a forward-looking roadmap, not a changelog. Priorities and sequencing may shift — but the
direction below is where we're taking motion in UnysonPlus.
:::

## The short version

Most people assume a WordPress builder can't touch the "3D motion" you see on award-winning studio
sites. The Animation Engine is already much closer than that suggests:

- It runs on **GSAP + ScrollTrigger** — the same animation core the pros use.
- It has **real WebGL 3D** ([WebGL Object](/animation-engine/webgl-object) via Three.js and
  [Model Viewer](/animation-engine/model-viewer) for glTF/GLB models, with AR).
- It has a **cinematic scroll system** ([Scrollytelling / Scroll Story](/animation-engine/scrollytelling))
  with a pinned full-screen stage, scrubbed backdrops, and a camera-glide (pan + dolly) over a still
  image — the "Apple-style product ride" look.
- It has **frame-scrub "video-from-stills"** ([Image Sequence](/animation-engine/image-sequence)),
  self-drawing SVG, CSS-3D galleries, physics, kinetic text, a custom cursor, and more.

So the goal isn't to "catch up." It's to push past the everyday scroll-and-fade vocabulary into the
three things that define genuinely premium motion:

1. **[Scroll that feels effortless](./focus-areas.md#area-1--scroll-feel)** — one smooth-scroll
   substrate under everything.
2. **[A real motion timeline](./focus-areas.md#area-2--a-real-motion-timeline)** — keyframing several
   properties over one scrubbable axis, not just single-effect presets.
3. **[Real 3D scenes you move through](./focus-areas.md#area-3--real-3d-scenes)** — a camera flying
   through actual depth, not a flat image with a fake camera.

## How to read this section

| Page | What it covers |
| --- | --- |
| **[Motion vocabulary](./terminology.md)** | What "scrub," "pin," "motion timeline," "real 3D vs CSS 3D," shaders and particles actually mean |
| **[What the engine does today](./current-capabilities.md)** | The full, accurate map of current motion capabilities |
| **[Where we're leveling up](./focus-areas.md)** | The three focus areas that separate good from award-tier |
| **[The modern motion toolbox](./toolbox.md)** | The libraries behind these effects, and which fit a page builder |
| **[Roadmap](./roadmap.md)** | The phased plan, what we'll build vs. keep bespoke, and the performance rules every effect follows |

## About "camera-glide" background motion

A popular effect right now is a slow cinematic drift on a hero background — a camera that seems to
pan and push into a scene as you scroll. It looks 3D, but on most sites it's actually **2.5D**: a
flat image or video with a *faked* camera move over it. It reads as a nice drift, but never as depth
you can travel *through*.

The Animation Engine already produces this exact effect on purpose — see the **Backdrop Motion**
(`pan` / `dolly` / `pan_dolly`) options in [Scroll Story](/animation-engine/scrollytelling). The
roadmap's 3D work is about going **beyond** it: a camera moving through a real rendered scene, which
is the leap that separates a polished marketing page from a studio showpiece.
