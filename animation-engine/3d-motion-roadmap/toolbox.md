---
sidebar_position: 5
title: The modern motion toolbox
slug: /3d-motion-roadmap/toolbox
description: The libraries behind premium web motion, whether each offers a timeline, and how well each fits a page builder.
---

# The modern motion toolbox

The libraries that build these effects — with the two columns that matter most for a page builder:
does it provide a **timeline**, and does it fit a **preset/option model** (versus needing bespoke
per-project code)?

| Tool | What it's for | Timeline? | Fit for a builder |
| --- | --- | --- | --- |
| **GSAP** (+ ScrollTrigger, ScrollSmoother, SplitText, Flip, MotionPath) | The industry workhorse. Now 100% free including every plugin. ~80% of premium motion needs no WebGL. | ✅ The reference code timeline (`gsap.timeline`) | ★★★ Already the engine's core — extend its reach |
| **Lenis / Locomotive** | De-facto smooth-scroll; keeps the page and WebGL in lockstep. The perceived-quality substrate. | — (substrate) | ★★★ One global toggle. Already in the engine |
| **Theatre.js** (+ Studio) | The professional *visual* timeline/sequencer; bind its playhead to scroll to choreograph 3D cameras by hand. | ✅ The definitive visual one | Internal — author scenes in dev, ship the data |
| **Three.js / React Three Fiber** | Real WebGL 3D scenes, cameras, shaders, particles. The spectacle tier. | — (drive with GSAP/Theatre) | Curated parametric scenes, not open authoring |
| **Spline / `<model-viewer>`** | No-code 3D design (Spline); simplest glTF/GLB viewer (model-viewer, + AR). | Spline: ✅ visual | model-viewer already in; Spline good for a hero object |
| **Rive** | Interactive, stateful vector motion via its own fast runtime. 60fps, tiny files. | ✅ State machine + timeline editor | ★★★ Great builder atom — upload a file, wire a state |
| **Lottie** | Play designer-made vector animations (After Effects export). | Via the AE timeline | ★★ Easy atom; less interactive than Rive |
| **Curtains.js / OGL** | Bind WebGL shaders to existing HTML images/video (distortion, transitions) without rebuilding as a 3D scene. | — | Good for a curated image-effect preset set |
| **View Transitions API / Barba.js** | Native (now broadly supported) or JS-orchestrated page/route transitions. | — | Site-wide preset; the engine already ships Page Transitions |

## How to read this table

- **GSAP is the spine.** It's free, framework-agnostic, and already partly adopted. Nearly every
  premium scroll effect is achievable with GSAP + ScrollTrigger, no WebGL required. The plan leans
  into it.
- **Smooth scroll is a substrate, not an effect.** It has no timeline of its own — it's the layer
  that makes *everything else* feel expensive. One switch.
- **Theatre.js is for us, not for you.** It's how a cinematic 3D camera path gets authored during
  development; the finished motion ships as data and you tune a few knobs. You get the result without
  a timeline UI.
- **Real 3D stays curated.** Three.js/R3F power a *small set* of pre-built scenes. Open-ended 3D
  scene composition is a different kind of product and stays out of the builder.

Next: [the roadmap →](./roadmap)
