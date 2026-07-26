---
sidebar_position: 4
title: Where we're leveling up
slug: /3d-motion-roadmap/focus-areas
description: The three focus areas that separate everyday web motion from award-tier — scroll feel, a real motion timeline, and real 3D scenes.
---

# Where we're leveling up

The engine already covers the everyday motion vocabulary. These are the three areas — in priority
order — that separate a polished site from a studio showpiece. We're tackling them **one at a time**.

## Area 1 — Scroll feel {#area-1--scroll-feel}

**Why it matters.** Browsers run scroll-linked effects slightly out of sync with native scroll,
which causes micro-jitter — the single most noticeable "cheap vs. premium" tell. The fix the whole
industry uses is a **smooth-scroll interpolator** (Lenis) that keeps the page and the animations in
lockstep, frame-for-frame.

**Where we're going.** Promote smooth scroll to a **site-wide switch** (with a strength/smoothing
control) and route the scroll engine through it, so *everything* that scrolls shares one clock. The
result is that every scroll effect on the page suddenly feels like one polished system — and every
future scroll feature inherits that quality for free.

:::tip Biggest win, least work
This is mostly wiring — the smooth-scroll library is already in the engine (it powers
[Scroll Loop](/animation-engine/scroll-loop)). Making it global is the highest return for the least
effort, which is why it's first.
:::

## Area 2 — A real motion timeline {#area-2--a-real-motion-timeline}

**Why it matters.** Today each effect is a single preset with option sliders. A "proper motion
timeline" means **keyframing several properties over one shared, scrubbable axis** — "at the start,
hidden; a third of the way through, centered; near the end, exits left" — each step with its own
easing.

**Where we're going — pragmatically.** A full After-Effects-style visual timeline editor is a
product unto itself, and it doesn't fit neatly into a builder. So we ladder up instead:

1. **Beat keyframes** on a pinned Section — give each element 2–3 keyframed states across the pinned
   scroll range, each with an easing pick. This covers the large majority of what people want a
   timeline for, expressed as builder options, and it reuses the existing
   [Scroll Story](/animation-engine/scrollytelling) beat plumbing.
2. **(Optional, later)** a bounded "Motion Timeline" element for advanced users — a small
   tracks-and-keyframes UI that compiles down to a GSAP timeline.

The near-term answer to "proper motion timeline" is **beat keyframes** — real multi-step
choreography, without turning the builder into video-editing software.

## Area 3 — Real 3D scenes {#area-3--real-3d-scenes}

**Why it matters.** The single most impressive "3D motion" pattern is a **camera flying through a
real WebGL scene with depth** as you scroll. Current 3D is a single object, a single model, or CSS-3D
planes — never a scene you travel *through*.

**Where we're going.** The hard parts already exist: a Three.js runtime
([WebGL Object](/animation-engine/webgl-object)) and the scroll-progress plumbing that scenes can
scrub against. We'll add a **parametric "3D Scene" element** — a small set of pre-built, tunable
scenes (for example: dolly through a floating gallery, orbit a product, fly through a tunnel of
images) whose camera is driven by scroll. You drop in your own media, pick a scene, and tune a few
knobs — no 3D scene-building from scratch.

:::warning Performance is part of the design
Real WebGL is reserved for one hero moment per page, always with a static image fallback, reduced-
motion support, and mobile throttling. See the [performance rules](./roadmap#guardrails).
:::

## And a few smaller additions

- **Rive elements** — interactive, stateful vector motion (icons/mascots that react to hover, scroll
  or data) at 60fps and tiny file sizes.
- **WebGL image transitions** — a curated set of shader presets (ripple / liquid / displace) applied
  to image elements — chosen from a dropdown, never hand-coded.

Next: [the libraries behind all this →](./toolbox)
