---
slug: 3d-scenes-as-webgl-presets
title: Phase 2's scroll-camera 3D scenes — a new element, or presets of WebGL Object?
authors: [jon]
tags: [animation-engine, architecture]
date: 2026-10-29
description: The roadmap's parametric scroll-camera 3D scenes ship as scroll-driven presets of the existing WebGL Object element, reusing its Three.js renderer, WebGL budget, throttle and fallback, rather than as a separate "3D Scene" element.
---

**The question:** Phase 2 of the motion roadmap is "real 3D scenes" — a few pre-built, scroll-scrubbed
camera scenes (image tunnel, gallery dolly, product orbit). The roadmap had sketched them as a new
**parametric "3D Scene" element**. Building the first one (Image Tunnel), was a new element still right, or
should these be **presets of the existing [WebGL Object](/animation-engine/webgl-object)** element?

<!-- truncate -->

**Context.** WebGL Object already owns everything a scroll-camera scene needs: the vendored **Three.js**, a
canvas that sizes to the element or fills a Section background, a **per-page WebGL budget** (`MAX_LIVE`) that
falls back to a poster when spent, a **mobile / low-power throttle** (DPR cap, quality step-down), a
**reduced-motion** path, a **poster / CSS-gradient fallback** when WebGL is unavailable, in-view pause, and a
`style_preset` picker whose presets already range from lit 3D objects to full-screen shaders to a
`THREE.Points` image cloud. A scroll-scrubbed camera through image planes is just another preset shape on
that same substrate.

**Options considered.**

- **A new "3D Scene" element.** Clean conceptual home for "scenes," but it would duplicate the renderer
  bootstrap, the budget, the throttle, the fallback and the placement (inline / Section background) that
  WebGL Object already solved — a second WebGL element to keep in lockstep, for no new capability.
- **Presets of WebGL Object.** Add a "3D Scenes (scroll-driven)" family to the existing `style_preset`
  picker. Image Tunnel becomes `buildImageTunnel()` returning a `THREE.Group` of planes; `initOne` seats the
  camera and adds fog for that preset; a `renderFrame` branch dollies the camera from the shared
  scroll-progress. Everything else — budget, throttle, fallback, placement, disposal — is inherited.

**Decision.** Ship the scroll-camera scenes as **scroll-driven presets of WebGL Object.** Image Tunnel is the
first; Gallery Dolly and Product Orbit follow as further presets in the same family.

**Why.** The hard, already-solved parts of a "3D scene element" — a budgeted, throttled, gracefully-degrading
WebGL canvas that can be a Section background — are exactly WebGL Object. A separate element would re-pay all
of that to gain only a different label in the picker. Presets keep one WebGL element, one set of guardrails,
one fallback story, and let a scene ride every future improvement to that substrate for free. If a scene ever
needs authoring UI that can't live in a preset's option group, it can graduate to its own element then — but
nothing in a parametric, knob-tuned camera scene needs that today.
