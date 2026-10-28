---
slug: scroll-timeline-front-end-first
title: Where should the visual Scroll Timeline Editor live — in a builder modal or on the front end?
authors: [jon]
tags: [animation-engine]
date: 2026-10-29
description: Phase 1 of the visual Scroll Timeline Editor ships as a front-end, admin-only overlay that reads the page's live GSAP ScrollTriggers — because that is the one place every animated element and its real timing actually exist.
---

**The question:** we're building the visual Scroll Timeline Editor (roadmap item 1b) — a tracks-and-keyframes
view of a page's scroll motion. Should it live inside the page-builder **options modal** (next to the element's
settings), or as a **front-end** tool on the rendered page?

<!-- truncate -->

## Context

The engine already has the substrate: the `gsap-code-preview` option type shows how a builder-modal panel
reads its **sibling** option values live and re-renders on `fw:options:change`, and the Scroll Ruler already
enumerates every live `ScrollTrigger` on the rendered page. A timeline, though, is inherently a **page-level**
view — it has to show *every* element's animation and how they overlap in scroll order, not one element's
settings.

## Options considered

- **In the builder modal (per element).** Familiar home, next to the settings it edits. But a Section's modal
  cannot see its **children's** animation values — they live in each child's own options — so a Section-level
  timeline would need an AJAX round-trip to reassemble the descendants' timing from the saved builder JSON, and
  it still couldn't *scrub* real motion, because the rendered elements aren't in the modal.
- **On the front end, as an admin overlay.** The rendered page is the one place where **all** the animated
  elements and their **true** ScrollTrigger start/end values already exist, and where dragging a playhead can
  **scrub the real animations live**. The cost is that it's a separate surface from the options panel.

## Decision

Build it **front-end first**. Phase 1 ships as a bottom-docked, admin-only **Scroll Timeline** overlay that reads
`ScrollTrigger.getAll()`, draws one track per animation on a 0–100 % scroll axis, and scrubs the page with a
draggable playhead. Editing timing still happens in each element's **Animations** tab for now; Phase 2 adds
drag-to-retime that persists back into those same options (the native-options ⇄ scene compiler from the
[reuse-Kinetic-Scenes decision](/decisions/reuse-kinetic-scenes-scroll-timeline)).

## Why

The timeline's whole value is seeing — and scrubbing — **every** animation on the page at once, in true scroll
order. Only the rendered front end has all of that. A modal view would have to *reconstruct* the data it can't
see and still couldn't move the real elements, so it would be a weaker tool built the harder way. Keeping the
front end as the surface also lets the editor reuse the Scroll Ruler's trigger-reading groundwork and sit beside
it (one compact, one visual), and it leaves the eventual write-back as an additive Phase 2 rather than a
prerequisite.
