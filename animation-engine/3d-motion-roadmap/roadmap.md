---
sidebar_position: 6
title: Roadmap
slug: /3d-motion-roadmap/roadmap
description: The phased plan for 3D motion and timelines — what we build as presets, what stays curated, and the performance rules every effect follows.
---

# Roadmap

The plan is phased so each stage ships value on its own, and the expensive work (real 3D) rides on
foundations laid earlier. We're doing the three [focus areas](./focus-areas) **one at a time**.

## Phase 0 — Foundation

The highest return for the least effort — and the base everything else builds on.

- **Site-wide smooth scroll** — a Theme Settings toggle (plus a smoothing/strength control), with the
  scroll engine routed through it.
- **One scroll engine** — progressively bring the scroll-based sections onto a single scroll system
  so they all scrub against the same clock.
- **Shared guardrails** — a common reduced-motion + mobile-throttle + off-screen-pause helper every
  effect uses, so quality and accessibility are uniform.

**Outcome:** the whole engine feels like one polished system, and future scroll features get cheaper.

## Phase 1 — Motion timeline (the pragmatic 80%)

- **Beat keyframes** — per-element 2–3 keyframed states across a pinned Section's beats, each with an
  easing pick, built on the existing [Scroll Story](/animation-engine/scrollytelling) plumbing.
- **(Optional)** a bounded "Motion Timeline" element for advanced users, only if there's demand.

## Phase 2 — Real 3D scenes

- **A parametric "3D Scene" element** — a few pre-built, scroll-scrubbed camera scenes (gallery
  dolly, product orbit, image tunnel). You supply the media and tune a few knobs; the scene and its
  camera choreography are built in.
- **Stretch:** a real-WebGL variant of the [3D Gallery](/animation-engine/3d-gallery) for true depth,
  lighting and reflection.

## Phase 3 — Flourishes

- **Rive elements** (interactive vector motion), **curated WebGL image transitions** (ripple / liquid
  / displace presets), and richer particle presets in [WebGL Object](/animation-engine/webgl-object).

## At a glance

| Phase | Deliverable | Impact |
| --- | --- | --- |
| **0** | Site-wide smooth scroll + one scroll engine + shared guardrails | Very high |
| **1** | Beat keyframes (the timeline "80%") | High |
| **2** | Parametric scroll-camera 3D scene element | Very high |
| **3** | Rive + WebGL image transitions + particle presets | Medium–High |

## What we build vs. what stays curated {#build-vs-curated}

The guiding principle: be the **"GSAP-quality scroll + smooth-scroll + text-reveal + light-3D"**
builder that delivers the vast majority of premium motion through **presets** — plus a small,
performance-budgeted set of WebGL/Rive flourishes. Fully bespoke studio scenes stay a hand-built
concern; trying to genericize them is where builders drown.

| Build as presets | Use internally / curated | Not planned |
| --- | --- | --- |
| Site-wide smooth scroll | Theatre.js to author 3D camera scenes | A general visual timeline editor |
| One unified scroll engine | Three.js for a few parametric scenes | A user-facing shader editor |
| Beat keyframes on pinned sections | Spline for an optional no-code hero object | Open 3D scene composition from scratch |
| Rive / model-viewer / image-transition presets | Curtains.js/OGL for the shader preset set | Arbitrary per-project camera fly-throughs |
| Text reveals everywhere | | Whole-page WebGL as the only content layer |

## Performance & accessibility rules {#guardrails}

Every motion feature ships with these — they're part of the design, not an afterthought:

- **Respects reduced motion.** When a visitor has "reduce motion" set, heavy effects swap for instant
  or minimal states. This is mandatory.
- **Throttled on mobile.** Mobile GPUs thermally throttle; effects cap their work, cap resolution,
  and pause when off-screen or when the tab is hidden.
- **Progressive enhancement.** WebGL is detected and falls back to a static image or video. Real
  content always lives in the HTML (for SEO and screen readers) — 3D is an enhancement layer over the
  page, never the only source of content.
- **Web Vitals first.** On content and conversion pages, the light path ships by default; spectacle
  is reserved for pages where it adds meaning.

:::info Where this connects
The engine is already built this way — see [Performance](/animation-engine/performance) for how a
page loads only the effects it actually uses. The roadmap keeps that discipline as it grows.
:::
