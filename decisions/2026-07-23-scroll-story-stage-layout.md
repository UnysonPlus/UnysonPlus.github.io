---
slug: scroll-story-stage-layout
title: "Why cinematic scroll pages became a Scrollytelling layout, not a new module"
authors: [jon]
tags: [architecture, page-builder]
date: 2026-07-23
description: Replicating a scroll-hijacked launch site (a fixed camera-ride image sequence with full-screen content slides keyed to scroll) needed a proper authoring model, not hand-assembled code blocks. It became a second layout of the existing Scrollytelling module — "Full-screen Stage" — where every column is a scene and a backdrop scrubs behind them, instead of a parallel new module.
---

**The question:** we keep building cinematic scroll-driven sites (a pinned "camera ride"
frame-sequence background with full-screen text scenes keyed to scroll segments). Should that
become a brand-new Animation Engine module / shortcode, or grow out of something that already
exists — and either way, how does a *typical builder user* author one without touching code?

<!-- truncate -->

## Context

Replicating a scroll-hijacked SPA launch page proved the effect stack was ~90% there — the
`image_sequence` element covers a pinned scrubbed ride, and Scrollytelling covers pinned-step
narratives — but the *composite* (scenes overlaid ON the ride, paced by scroll) had no authoring
model. The first replication hand-assembled it from sequential bands plus fixed-position CSS,
which works visually but is expert assembly: a normal user can't reproduce or edit it.

## Options considered

- **A new "Scroll Story" module/shortcode** — a clean slate, but it would duplicate
  Scrollytelling's pin + transition machinery and add a parallel 29-style list, violating the
  CATALOG distinctness rule (extend a module's style list rather than create a near-duplicate).
- **Keep hand-assembling per site** — zero framework work, but every cinematic site becomes
  bespoke code blocks; no builder editability, no reuse, the opposite of "a proper system".
- **A second *layout* of Scrollytelling** *(chosen)* — the module already owns pinning, step
  activation, 29 transition styles and reduced-motion fallbacks. A `layout: stage` option turns
  every column into a full-viewport **scene** (scenes reuse the layer classes, so all 29
  transitions apply unchanged), adds a **Backdrop** (numbered frame-sequence pattern / scrubbed
  video / fixed image) driven by total story progress, and a **Scene length** pacing knob.

## Decision

Scrollytelling gained a **Full-screen Stage** layout (engine 1.2.28). The authoring model is
deliberately column-shaped: *one `1_1` column per scene, normal elements inside, no wrappers* —
the same mental model Sticky Stack already uses (cards = columns). The runtime pins the stage
full-bleed for `scenes × scene_length` screens, activates scenes from scroll progress, scrubs the
backdrop, and auto-groups consecutive buttons into a side-by-side CTA row.

## Why

- **Extend, don't duplicate.** The interaction model (pin + scroll-keyed states + transition
  styles) is Scrollytelling's; only the composition (full-screen scenes + backdrop) was missing.
  One module, two layouts beats two modules sharing 90% of their code and style lists.
- **Typical-user mental model.** "A slideshow that scroll drives, over a background that rides
  along" maps to things builders already know: columns as scenes, an image-picker for the
  transition, three text fields for the frame pattern. No fixed-position CSS, no code blocks.
- **Round-trip with capture.** The capture service's known-limitations plan detects exactly this
  pattern on source sites (fixed overlays + canvas + numbered frame requests); with a stage
  layout in the framework, a captured scroll-hijacked site can be emitted as ONE editable story
  section instead of an unmappable 0-section page.
