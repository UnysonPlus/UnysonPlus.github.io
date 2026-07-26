---
slug: scroll-keyframes-fixed-states-auto-progress
title: "The builder's 'motion timeline' is fixed Start/Middle/End keyframes on an auto progress source — not an editor"
authors: [jon]
tags: [animation, architecture]
date: 2026-07-26
description: "Phase 1 of the motion roadmap asked for a 'proper motion timeline' in the builder. We shipped Scroll Keyframes — a per-element Start / optional Middle / End interpolation driven by an automatic progress source (a Scroll Story scene, or the element's viewport travel) — rather than a dynamic keyframe-editor. This records why the pragmatic model won, and how it reuses Phase 0."
---

**The question:** the roadmap's Phase 1 is "a real motion timeline" for the builder — keyframing several
properties over one scrubbable axis. How much timeline do we actually build: a dynamic keyframe editor,
or something smaller that still covers the need? And what drives the scrub?

<!-- truncate -->

## Context

Two things were already in place from Phase 0:

- **Scroll Story publishes progress** — a pinned stage exposes `__storyProgress`, `__storyBeats`, and
  each scene's `__beatIndex`, and children already remap that to their scene's slice.
- **Shared runtime helpers** — `upwAnimRaf` (one frame loop), `upwScrollProgress` (0..1 viewport/pin
  progress), `upwReduceMotion`, `upwIsMobile`.

So the expensive parts (a scroll clock, a progress signal) existed. The open questions were the
**authoring model** and the **scope**.

## Options considered

**Keyframe model:**
- **Dynamic N-keyframe editor** — add any number of keyframes at custom scroll%, each with values +
  easing. The most "timeline-like", but it's a custom repeater/track UI — a product unto itself.
- **Fixed Start / optional Middle / End (chosen)** — three states, each with transform / opacity / blur
  + a per-segment easing. Built from standard option types, covers the roadmap's "2–3 keyframed states",
  ships now.

**Progress source:**
- **Scroll Story only** — the strict "beat keyframes on a pinned Section" reading. Simpler, but the
  element must live in a Story.
- **Auto (chosen)** — inside a Scroll Story → the element's scene slice (pinned range); anywhere else →
  the element's viewport travel. Works on pinned Sections *and* any scrolling element.

**Runtime:** GSAP, or hand-rolled. Scrollytelling is deliberately GSAP-free, and forcing GSAP onto every
page with a keyframed element fights the "ship only what a page uses" principle.

## Decision

**Scroll Keyframes** — a per-element option: a Start, an optional Middle (at a chosen %), and an End
state, each with x/y/scale/rotation/3D/opacity/blur + per-segment easing. Driven by an **automatic**
progress source (Story scene slice, else viewport travel). A tiny **hand-rolled** runtime interpolates
the states and rides `upwAnimRaf` — **no GSAP**.

## Why

- **Pragmatic 80%.** "2–3 states with easing" is what people reach a timeline for most of the time. It
  ships from standard option types instead of a bespoke editor, and a dynamic N-keyframe version can
  follow if demand appears.
- **Works everywhere.** The auto source means the same control choreographs an element across a pinned
  Scroll Story scene *or* as it scrolls past on an ordinary page — one feature, both cases.
- **Reuses Phase 0.** It plugs straight into the shared loop, the shared progress/reduce/mobile helpers,
  and the Story's published API — so it's small, consistent, and pauses off-screen / respects
  reduced-motion for free.
- **No forced GSAP.** Hand-rolled interpolation keeps it consistent with scrollytelling and off the
  critical path — a keyframed heading never drags GSAP onto the page.

*Status: Accepted — Phase 1 of the motion roadmap. Lives at `/animation-engine/scroll-keyframes`.*
