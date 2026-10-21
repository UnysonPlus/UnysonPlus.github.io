---
slug: reuse-kinetic-scenes-scroll-timeline
title: "A proper scroll-timeline editor for the Animation Engine — reuse Kinetic Scenes, or build one?"
authors: [jon]
tags: [animation-engine, architecture]
date: 2026-10-21
description: The Animation Engine has no visual way to choreograph scroll — you tune per-element sliders blind. A visual tracks-and-keyframes editor is wanted. Build one, or reuse the Kinetic Scenes timeline (the fixed-viewport, time-based editor we already ship), driven by scroll? A feasibility probe found the player already drives a seekable GSAP timeline from scroll (pinned stage, header offset, smoothing) and its timeline UI is a clean, self-contained component. Decision — reuse both, bridged by a native-options ⇄ scene compiler so the builder's data model stays native and no parallel scene file is ever stored.
---

**The question:** The Animation Engine's weakest point is *authoring*. You set scroll motion per
element through option sliders, with no way to **see** or coordinate how a whole page choreographs as
you scroll. We want a proper visual tracks-and-keyframes timeline. Do we build one inside the page
builder, or **reuse the Kinetic Scenes timeline** — the fixed-viewport, *time*-based editor we already
ship — driven by **scroll** instead of a clock?

<!-- truncate -->

## Context

Two things we already own change the calculus:

- **Kinetic Scenes** is a working timeline editor + player for fixed-viewport scenes. A full visual
  timeline editor built from scratch inside a builder is "a product unto itself" — but we have that
  product.
- A **pinned Section** supplies the two things Kinetic Scenes needs: a **fixed stage** (pin it and the
  viewport freezes for a known slice of scroll) and a **playhead** (that scroll distance). So a "scroll
  scene" is just Kinetic Scenes with the playhead swapped from a clock to scroll progress.

The only open question was whether the Kinetic Scenes code is actually coupled to its time clock, or
can be driven by an external scroll progress — i.e. reuse vs. rebuild.

## The probe (2026-10-21)

Read the Kinetic Scenes `packages/player` and `apps/studio` directly:

- **Player — not coupled to a clock.** It compiles the whole scene into **one seekable GSAP timeline**
  and exposes `tl.progress(p)` / `tl.time(t)`. It already ships a **`scroll.ts`** module
  (`linkToScroll({ … setProgress })`) that drives `tl.progress(p)` from scroll position — with a
  **pinned sticky stage** for `length` window-heights, a **sticky-header `offset`** parameter, and
  **smoothing**. It plays a portable **Scene JSON** via `mount(host, scene, opts)`. Scroll-scrubbing is
  a first-class, shipping mode; the clock (`play()`/`pause()`) and scroll are two drivers of the same
  seekable timeline.
- **Editor — a clean reusable component.** `Timeline.tsx` (~692 lines) + `KeyframeEditor.tsx` are
  **props-driven and store-agnostic** (no zustand/context) — they take a `Scene` in and emit a `Scene`
  out via callbacks. They are bound to the **Scene format** and the studio's `lib/*` ops (sceneOps,
  keyframes, markers, cameraOps), not to the app shell.

## Options considered

- **A — Scene-native.** Store a Scene JSON per pinned "Scroll Scene"; reuse player + editor as-is.
  Fastest and maximum reuse — but the scene becomes a **parallel format** alongside native builder
  options, a second place a site's motion lives.
- **B — Compile native ⇄ Scene (chosen).** The builder stores **native options**; a thin compiler maps
  them to a Scene the player scrubs and the reused editor edits. Native data model preserved; reuse
  **both** runtime and editor. Cost: one bidirectional mapping layer to build and keep in sync.
- **C — Rebuild the editor natively, reuse only the player.** Most control, least reuse, biggest build —
  and wasteful, since the Timeline component is already reusable.

## Decision

**Reuse Kinetic Scenes — both the player and the Timeline/keyframe editor — bridged by a
native-options ⇄ scene compiler (option B).** The scene is a **compile target / view**, never a file
stored on the site. The Animation Engine stays the home of the data (native builder options + the
Advanced box); the compiler produces a scene on the fly for the player to scrub and the editor to edit.

## Why

- The player **already does scroll** (pin + offset + smoothing, seekable timeline). Rebuilding a scroll
  runtime (C) would duplicate shipping code; being coupled to a clock (the risk that justified a probe)
  turned out to be false.
- The Timeline editor is a **clean, reusable component**, so a from-scratch builder timeline (C) is
  wasted effort.
- Keeping the data model **native** (the roadmap's stated goal) rules out A's parallel Scene file — the
  compiler keeps the scene ephemeral, so there is no second home for a site's motion and nothing to
  drift out of sync in the database.
- The remaining cost is **one well-scoped mapping layer**, far smaller than building either a scroll
  runtime or a timeline UI from scratch.

This is Phase 1b of the Animation Engine
[3D Motion & Roadmap](/animation-engine/3d-motion-roadmap/roadmap). Status: **Accepted**.
