---
slug: gallery-choreography-chaining
title: "How should separate Motion Galleries chain into one scroll choreography — and on what animation engine?"
authors: [jon]
tags: [animation-engine, motion-gallery, architecture]
date: 2026-10-22
description: The scroll choreography should let an author drop in several real, independently-configured Motion Gallery shortcodes that connect into one scroll sequence. Decision — chain separate gallery shortcodes (not one abstract design, not a hidden container), run the choreography on GSAP + ScrollTrigger (the same timeline substrate Motion Sequence already uses, so chaining nests via tl.add with overlap), and use the pose engine rather than GSAP Flip under a pinned scrub (Flip's absolute coordinates break when the stage goes fixed).
---

**The question:** The scroll choreography should let an author drop in **several real, independently-configured
Motion Gallery shortcodes** that connect into one scroll sequence (gallery 1 plays, hands off to gallery 2, …).
How should that chaining be structured, and what animation engine should drive it?

<!-- truncate -->

## Context

- The first prototype was a single abstract `scroll_choreography` *design* with formation presets. The author's
  actual mental model is **separate gallery shortcodes on the canvas, each a real gallery, connected** — "if I
  have 5 steps I see 5 succeeding shortcodes."
- The engine already ships **Motion Sequence** — a `gsap.timeline()` that chains a Section's children with an
  **Overlap** knob on a scrub trigger ("choreography without code"). It's the chaining-with-overlap primitive
  already built; it just only recognizes CSS reveal/stagger tweens as steps.
- A survey of how GSAP / Framer Motion / native CSS do "chaining" all converged on *one timeline, units placed
  with overlap at the seams* — and on **GSAP Flip** as the standard tool for morphing between two measured
  layouts.
- The Motion Gallery runtime was a hand-rolled rAF driver; the rest of the engine runs on GSAP + ScrollTrigger.

## Options considered

- **One abstract "choreography" design** with formation presets. Rejected: no per-step config, and it isn't the
  "separate real shortcodes" model.
- **A hidden container holding steps.** Cleaner than loose siblings, but the author wants to *see* each gallery
  as its own shortcode; a container hides them.
- **Separate gallery shortcodes, chained (chosen).** Each is a full, independent gallery; they connect into one
  scroll sequence. The "connection" is a Section set to Motion Sequence (or a "link to the gallery above"), not
  a fragile sibling-ID scheme.
- **Engine:** keep the rAF lerp, or move to **GSAP + ScrollTrigger**. And for the layout morphs: **GSAP Flip**
  or a **pose engine** (per-card transforms).

## Decision

1. **Chain separate gallery shortcodes.** Each gallery is independently configured; chaining sequences them. A
   Section set to **Motion Sequence** is the clean "connection" (reorder/delete just re-reads document order).
2. **Run the choreography on GSAP + ScrollTrigger** (pinned + scrubbed), reusing the same timeline substrate
   Motion Sequence uses — so chaining is `tl.add(eachGallery.subTimeline, ">-overlap")`, and Motion Sequence's
   step contract generalizes from "a CSS tween" to "any element that hands back a GSAP timeline."
3. **Use the pose engine, not Flip, under a pinned scrub.** Flip is excellent for *non-pinned* layout reflows,
   but its `absolute` coordinates shift the moment the stage goes `position: fixed`, so cards jump/vanish at most
   scroll positions. The per-card pose engine (correct 3D transform order, driven by ScrollTrigger `onUpdate`)
   is the robust path; Flip stays available for non-pinned cases.

## Why

- It matches the author's model exactly (visible, independent shortcodes that connect) **and** reuses the engine's
  existing, proven timeline-with-overlap (Motion Sequence) instead of inventing a parallel mechanism.
- Standing on GSAP + ScrollTrigger gives pin, scrub, overlap and nested timelines for free and battle-tested,
  and lines the gallery up with the rest of the engine.
- The Flip finding saves a dead end: it's the "obvious" tool for morphing layouts, but not under a pinned scrub.
  Status: **Accepted** (engine + sequential chaining + **overlap handoff** built — one master timeline nesting
  each gallery's pose sub-timeline with overlap; real-design layouts and authoring sugar ahead).
