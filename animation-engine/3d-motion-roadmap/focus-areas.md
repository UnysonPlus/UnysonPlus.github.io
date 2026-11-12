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

**✅ Shipped.** Smooth scroll is now a **site-wide switch** — [Smooth Scroll](/animation-engine/smooth-scroll)
(Theme Settings → Site-wide UX → Smooth Scroll), Lenis-powered momentum with a smoothing/strength
control. And it shares **one clock** with the rest of the scroll engine: Smooth Scroll and
[Scroll Loop](/animation-engine/scroll-loop) run off a single Lenis instance via the `window.__upwLenis`
singleton (whichever boots first owns it), so every scroll effect scrubs against the same clock and
enabling both never spawns two.

:::tip[Biggest win, least work]
This was mostly wiring — the smooth-scroll library was already in the engine — which is exactly why it
was first, and why it shipped first.
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

1. **Beat keyframes (native, basic).** ✅ **Shipped as [Scroll Keyframes](/animation-engine/scroll-keyframes)** —
   give any element Start / Middle / End keyframed states across a pinned Section's scroll range, each
   with an easing pick, auto-driven from a [Scrollytelling](/animation-engine/scrollytelling) Full-screen Stage or the
   element's own viewport travel. This covers the large majority of what people want a timeline for, as
   a handful of builder options.
2. **Advanced controls.** ✅ The finer knobs (custom easing, start points, stagger, trigger ranges) sit in
   each effect's own inline **Advanced** section inside its card (for example Scroll Motion's Advanced
   Tweaks), so the basic panel stays uncluttered while power users still get depth.
3. **The Scroll Timeline Editor (visual).** ✅ **Shipped as the [Scroll Timeline](/animation-engine/scroll-timeline)**:
   a front-end, video-editor-style panel with one track per scroll animation, a playhead that scrubs the
   real page live, drag-to-retime for Scroll Motion tracks, and a beat-state editor for Scroll Keyframes.
   It was planned as a reuse of the Kinetic Scenes timeline; it shipped as a native editor built straight
   on the page's own ScrollTriggers, which made the bridge described below unnecessary. (For hover, click
   and load sequences, the Live Editor has its own [Interaction timeline](/extensions/live-editor).)

*The planning notes below are kept for the record of why it works this way.*

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

**The data model — native, bridged to the reused editor.** Everything stays **builder options**: basic
beat keyframes in the element panel, finer controls in the Advanced box. The reused player and
timeline editor speak a portable *scene* object, so a thin **compiler maps native options ⇄ scene** —
the scene is a compile target the editor renders and the player scrubs, **never a file stored on the
site**. So the visual editor **reads and writes the same native options** (a *view* over the settings),
and there is no parallel format or new home for a site's motion. That one mapping layer is the only
genuinely new piece; the runtime and the editor are reused.

## Area 3 — Real 3D scenes {#area-3--real-3d-scenes}

**Why it matters.** The single most impressive "3D motion" pattern is a **camera flying through a
real WebGL scene with depth** as you scroll. Current 3D is a single object, a single model, or CSS-3D
planes — never a scene you travel *through*.

**What shipped.** ✅ Rather than a separate element, the scenes ship as scroll-driven **presets of
[WebGL Object](/animation-engine/webgl-object)**, reusing its Three.js renderer: **Image Tunnel** (fly
through a tunnel of images), **Gallery Dolly** (glide past a curved gallery wall) and **Product Orbit**
(orbit a ring of images). You drop in your own media, pick a scene and tune a few knobs; the camera is
driven by scroll. Next: a WebGL design for the [Motion Gallery](/animation-engine/motion-gallery), for real
lighting and reflections across its card layouts (🚧 in progress).

:::warning[Performance is part of the design]
Real WebGL is reserved for one hero moment per page, always with a static image fallback, reduced-
motion support, and mobile throttling. See the [performance rules](./roadmap#guardrails).
:::

## And a few smaller additions

- **Rive elements** — ✅ **shipped as [Rive](/animation-engine/rive)**: interactive, stateful vector
  motion (icons/mascots that react to hover, scroll or data) at 60fps and tiny file sizes, with live
  inputs, data binding and JS control.
- **WebGL image transitions** — ✅ **shipped** as the **Image Transitions** preset of
  [WebGL Object](/animation-engine/webgl-object): a curated set of shader transitions (ripple, liquid,
  displace…) chosen from a dropdown, never hand-coded.

Next: [the libraries behind all this →](./toolbox)
