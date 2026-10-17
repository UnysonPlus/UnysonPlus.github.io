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

:::tip[Biggest win, least work]
This is mostly wiring — the smooth-scroll library is already in the engine (it powers
[Scroll Loop](/animation-engine/scroll-loop)). Making it global is the highest return for the least
effort, which is why it's first.
:::

## Area 2 — A real motion timeline {#area-2--a-real-motion-timeline}

**Why it matters.** Today each effect is a single preset with option sliders. A "proper motion
timeline" means **keyframing several properties over one shared, scrubbable axis** — "at the start,
hidden; a third of the way through, centered; near the end, exits left" — each step with its own
easing.

**Where we're going.** A full visual timeline editor used to read as "a product unto itself" that
doesn't fit a builder — but we now have a second asset that changes the calculus: **Kinetic
Scenes**, our standalone timeline editor for fixed-viewport scenes. We already *have* that product,
so rather than cram one into a builder modal we **reuse it**, and ladder up in three tiers:

1. **Beat keyframes (native, basic).** Give each element 2–3 keyframed states across a pinned
   Section's scroll range, each with an easing pick — built on the existing
   [Scroll Story](/animation-engine/scrollytelling) beat plumbing. This covers the large majority of
   what people want a timeline for, as a handful of builder options.
2. **Advanced controls (the Advanced box).** The finer knobs — per-keyframe offsets, stagger, custom
   easing, trigger ranges — live in the element's **Advanced** tab, so the basic panel stays
   uncluttered while power users still get depth.
3. **The Scroll Timeline Editor (visual).** A real tracks-and-keyframes editor for full
   choreography, built by **reusing the Kinetic Scenes timeline** rather than reinventing it.

**The idea that makes it fit.** Kinetic Scenes needs two things — a **fixed stage** and a
**playhead**. A **pinned Section gives you both**: pin it and the viewport is frozen for a known slice
of scroll (the stage), and that scroll distance *is* the playhead. So a "scroll scene" is simply
Kinetic Scenes with the playhead swapped from a **clock** to **scroll progress** (GSAP's `scrub`
already does exactly this) — same tracks, same keyframes, same stage; a second playhead source, not a
second editor. Pinning also dissolves the two hardest problems of timing against a page: a pin's
length is authored in `vh`, so keyframe positions stay stable and responsive across breakpoints.

**Where it's edited.** On the **front end**, where the real scroll context lives — launched from an
**Animation Engine Timeline** icon in the logged-in admin bar (and, in time, folded into the
**Live Editor**, which already overlays the rendered page). Authoring scroll timing inside a cramped
builder modal never made sense; editing it on the actual page does.

**Scope — a pinned Section first, then the whole page.** The first unit is a single **pinned "Scroll
Scene"** (bounded, stable, reuses the editor as-is). From there it grows to a **page-level overview** —
every section's triggers and scrubs on one scroll ruler — read-only first, then editable.

**The data model — native, not a parallel format.** Everything stays **builder options**: basic beat
keyframes in the element panel, finer controls in the Advanced box, and the visual editor **reads and
writes those same options**. The timeline is a *view* over native settings, so there is no separate
scene file to keep in sync and no new place for a site's motion to live.

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

:::warning[Performance is part of the design]
Real WebGL is reserved for one hero moment per page, always with a static image fallback, reduced-
motion support, and mobile throttling. See the [performance rules](./roadmap#guardrails).
:::

## And a few smaller additions

- **Rive elements** — interactive, stateful vector motion (icons/mascots that react to hover, scroll
  or data) at 60fps and tiny file sizes.
- **WebGL image transitions** — a curated set of shader presets (ripple / liquid / displace) applied
  to image elements — chosen from a dropdown, never hand-coded.

Next: [the libraries behind all this →](./toolbox)
