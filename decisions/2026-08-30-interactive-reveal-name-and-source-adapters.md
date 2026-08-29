---
slug: interactive-reveal-name-and-source-adapters
title: "Why the product-reveal element is called \"Interactive Reveal\" and built as source adapters"
authors: [jon]
tags: [naming, architecture, shortcodes]
date: 2026-08-30
description: I wanted the "hover/scroll a product and it explodes to show its internals" element, and to make it robust and future-proof. Two things got settled — what to call it, and how to shape it. The name is "Interactive Reveal" (not "Exploded View"), because explode is only one of many motions; and it is built as one small engine with pluggable source adapters (Image Sequence, Layered 2D, 3D Model, Rive) rather than a hardcoded shortcode, so a new reveal technique becomes a new adapter, never a rewrite.
---

**The question:** I want the element where hovering or scrolling a product image animates it apart to
reveal its internals (chip, driver, coil…). What do we call it, and how do we structure it so it stays
robust, flexible and future-proof instead of being one hard-coded effect?

<!-- truncate -->

## Context

The obvious name is "Exploded View" — it is the industrial-design term and it is exactly the demo that
sparked the idea. But the moment you look at real production sites, "explode" is just one motion among
several that all do the same editorial job: Apple-style **frame-sequence scrubbing**, **layered 2D
separation**, **true 3D** models with an authored explode clip, and **vector/Rive** state machines. The
same element should also be able to *assemble*, *peel*, *orbit*, *morph*, or simply scrub a rendered
turntable. A name that says "explode" would be lying the first time someone uses it to assemble.

The research also made the technical shape clear. There is no single "right" renderer: photoreal product
shots want a `<canvas>` image sequence; a marketing hero wants a few translated PNG layers; a spec sheet
wants a real glTF you can orbit; a stylised schematic wants Rive. They differ only in *how they paint a
frame* — everything else (the trigger, the 0→1 progress, placement, hotspots, lazy-load, reduced-motion,
the asset library) is shared. That is the same seam we already lean on elsewhere (the shortcode design
registry, the form-builder items): isolate what varies behind a tiny contract.

## Options considered

- **Name it for the effect ("Exploded View" / "Sequence" / "3D Viewer").** Honest about the demo, but
  each locks the element to one motion or one renderer, and dates badly the moment a second mode ships.
- **Name it for the container/interaction ("Interactive Reveal").** Describes the payoff — a visual that
  reveals its internals or its story as you interact — without committing to any one animation. The
  effects then live *inside* it as modes.
- **One hardcoded shortcode per technique** (an image-sequence element, a separate 3D element…). Fast to
  start, but duplicates the trigger/placement/hotspot/asset code four times and fragments the authoring
  experience; adding a fifth technique means a fifth element.
- **One engine + pluggable source adapters.** A thin engine owns the shared concerns and delegates
  painting to a source adapter implementing `init` / `render(progress)` / `hotspotAnchor` / `poster` /
  `destroy`. The "Source" option picks the adapter; everything else is written once.

## Decision

The element is **"Interactive Reveal"** (tag `reveal`), and the animation styles are **modes** inside it
— Explode, Assemble, Sequence, Layers, Orbit, Morph. Under the hood it is **one engine with pluggable
source adapters** (Image Sequence, Layered 2D, 3D `<model-viewer>`, Rive), all sharing a single trigger,
placement, hotspot, accessibility and asset pipeline. It ships as an **opt-in Animation Engine module**
(inactive by default, zero base bloat), and its frames/layers/models live as **"Reveal Packs"** in
`uploads/unysonplus/reveal/` — imported as a ZIP, shown as one poster in the picker — so 5 × 100 frames
never floods the Media Library, exactly the way Lottie, Rive and icon-packs already work.

## Why

Both halves of the decision serve the same goal: nothing authored today should break or need renaming
later. An effect-agnostic name means new motions don't make the label lie. The adapter contract means the
"explode technique of 2029" slots in as another adapter without touching the authoring UI or existing
pages — and the standards-based core (glTF + a Web Component, native CSS scroll timelines with a GSAP
fallback we already bundle) is the least-likely-to-rot foundation the research turned up. The Reveal-Pack
store reuses a pattern we have already shipped three times, so the clutter problem is solved with proven
plumbing rather than a Media-Library workaround.

*Status: Accepted — name and architecture settled at the design stage; the module is scoped to build in
phases (Layered 2D first to prove the feel, then Image Sequence, then 3D, then Rive).*
