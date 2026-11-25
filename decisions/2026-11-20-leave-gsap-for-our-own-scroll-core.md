---
slug: leave-gsap-for-our-own-scroll-core
title: Why the Animation Engine leaves GSAP for a scroll core of its own
authors: [jon]
tags: [animation-engine, animation, javascript, performance, architecture]
date: 2026-11-20
description: GSAP's free licence forbids it in no-code animation tools that compete with Webflow, and the engine only needs it for Scroll Motion and gallery chaining, so those move onto a small scroll core of our own and the vendored GSAP is removed.
---

**The question:** premium-looking AI-built templates animate beautifully without GSAP. "I'm thinking if we can just
ditch GSAP and build our own animation engine. Let's check first which animations rely on GSAP."

<!-- truncate -->

## Context

- **The templates.** Three AI-built template pages that were checked (a bookshop, an energy company and a juice
  brand) load no GSAP, ScrollTrigger, Lenis or Three.js. They are React apps, and their motion comes from the Motion
  library (formerly Framer Motion), which plays through the browser's own Web Animations API: from 9 to 296 running
  animations per page, all on transform, opacity and filter.
- **Our engine.** Of the Animation Engine's 35 modules, 30 already run on our own code: Interactions on Web
  Animations, Page Timelines on its own 4 KB runtime, Scroll Keyframes on a shared frame loop, and the rest. GSAP is
  used by **Scroll Motion** (tweens, ScrollTrigger scrub, pin and stagger, `matchMedia`, SplitText; about 47 KB
  gzipped), by the **chaining of Motion Gallery galleries** (one pinned, scrubbed master timeline), optionally by
  Smooth Scroll and Scroll Loop (GSAP's ticker drives Lenis when GSAP is present), by the Scroll Timeline and Scroll
  Ruler (they read ScrollTrigger's list), and by the GSAP Generator, which writes GSAP code.
- **The licence.** Since Webflow bought GSAP, the standard "no charge" licence forbids its use in tools that let
  people build visual animations without code where that competes with Webflow's own visual animation building.
  The Live Editor's Animate workspace, Interactions and the Scroll Motion presets are exactly such tools, and the
  roadmap now sets out to close the remaining gaps with Webflow. Where the line sits is vague: GSAP says it wants
  non-competing visual tools to keep using it, and other builders have read the clause as needing Webflow's written
  permission.

## Options considered

1. **Keep GSAP.** No work, and GSAP is excellent. But the product would rest on a competitor's goodwill and a vague
   clause, and every Scroll Motion page carries about 47 KB of library.
2. **Ask Webflow for written permission.** Settles the licence for now, but it can be refused or withdrawn later, and
   the dependency stays.
3. **Switch to another library** (Motion, anime.js). Free of that clause, but still a large outside dependency, and
   none of them pin sections the way ScrollTrigger does, so pinning would be ours to build anyway.
4. **Build the missing piece ourselves.** A small scroll core (scroll-linked progress, scrub, pinning, breakpoints, a
   registry) and a text splitter, then move Scroll Motion and gallery chaining onto it.

## Decision

**Option 4.** The engine gets its own scroll core and text splitter; Scroll Motion's presets and gallery chaining move
onto it one at a time, with their saved options unchanged; the GSAP Generator keeps writing GSAP code but loads GSAP
only in its own preview; and the vendored GSAP, ScrollTrigger and SplitText are removed once a release has shipped
with nothing loading them. The phases were on the roadmap; they shipped as [the scroll core](/animation-engine/scroll-core).

## Why

- **Most of the work is already done.** Everything but one module and one gallery feature runs without GSAP, and Page
  Timelines already has a pinned and unpinned scroll trigger of its own to grow from.
- **No licence risk** in the part of the product that competes most directly with Webflow.
- **Lighter pages:** Scroll Motion pages lose about 47 KB gzipped, and the whole engine runs on one clock.
- **One registry** of scroll-driven motion, which the Scroll Timeline, Scroll Ruler and the Animate workspace can all
  read, instead of reading a third-party library's internals.
- **Nothing breaks for existing pages:** each preset keeps its options and is compared old against new on its demo
  page before the next is moved.

*Check the current licence text at gsap.com before relying on this reading of it; it is not legal advice.*

**Status:** Accepted, and shipped in Animation Engine 1.5.34 (25 November 2026): [the scroll core](/animation-engine/scroll-core).
One change from the plan: GSAP stays in the plugin, loaded only for a Scroll Motion **Custom Code** snippet (the
author's own GSAP code, which the licence clause does not touch); nothing of the engine's own depends on it.
