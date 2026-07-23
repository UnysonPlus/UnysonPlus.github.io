---
slug: gallery-vs-3d-gallery-boundary
title: "Where does a new gallery design belong — the core Gallery or the 3D Gallery?"
authors: [jon]
tags: [architecture, shortcodes]
date: 2026-07-23
description: A scattered-tabletop photo effect (fly-in, settle, reshuffle) could have been a 21st layout of the core Gallery or a new design of the Animation Engine's 3D Gallery. It became the 3D Gallery's first Stack & Scatter design, and the choice produced a reusable boundary rule — arrangement + lightbox belongs to the core Gallery; choreography-first showcases belong to the 3D Gallery.
---

**The question:** a "Photo Scatter" effect — photos scattered flat on a tabletop, gliding in from
the edges, dwelling, then reshuffling to the next set — is unmistakably a *gallery*. The core
`[gallery]` element already has 20+ layout designs. So does a new gallery design belong there, or
in the Animation Engine's `[gallery_3d]`?

<!-- truncate -->

## Context

The effect came from replicating a cinematic product site whose search moment scatters file cards
across a photographic desk. Nothing in the framework matched: the core Gallery's designs (grid,
masonry, carousel, coverflow) are arrangements; sticky-stack's `messy` is a pinned scroll stack;
`image_box`'s polaroid frame is a static card. The scatter is defined by its *choreography* —
stagger-in, rest, sweep-out, cycle.

## Options considered

- **A 21st core Gallery design** — "it's where users look for galleries", always available
  (engine-off). But the core Gallery has no animation runtime: it would need the rAF driver,
  drag plumbing and reduced-motion handling duplicated from the 3D Gallery — exactly the
  parallel-machinery smell the CATALOG distinctness rule exists to prevent. And its designs would
  then split into two kinds (static vs choreographed) inside one picker.
- **A new design of `[gallery_3d]`** *(chosen)* — the 3D Gallery is the choreography line: a
  categorized Design picker where each design is a self-contained motion system over one shared
  rAF driver, with drag physics, per-card Box Styles, captions/lightbox/link plumbing, and
  "Use as Section Background". Its picker taxonomy had already reserved a **Stack & Scatter**
  category; Photo Scatter is its first occupant.

## Decision

`photo_scatter` shipped as a `[gallery_3d]` design (engine 1.2.36), not a core Gallery layout.

## Why

- **The test is one question: "is it still a design if nothing moves?"** A static scatter is just
  overlapping polaroids — the motion IS the design. Anything failing that test is choreography and
  belongs to the 3D Gallery; anything passing it (a grid, a justified layout) is an arrangement
  and belongs to the core Gallery.
- **Machinery gravity.** The 3D Gallery already owns everything the scatter needs — server-side
  card rendering (links/captions ride each card), the generation-guarded rAF runtime, Section
  Background mode, reduced-motion fallback. Zero duplication.
- **Engine-gating is product separation, not a loss.** Cinematic showcases are the Animation
  Engine's line; the core Gallery stays lean and always-available. Degradation is graceful either
  way (reduced motion = a static scatter; content is never lost).
- The boundary rule keeps future proposals from re-litigating this: file by the one-question test.
