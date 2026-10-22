---
slug: motion-gallery-scroll-choreography
title: "Scroll choreography for the Motion Gallery — a new design, a new shortcode, or a new motion mode? And how do you morph between gallery layouts?"
authors: [jon]
tags: [animation-engine, motion-gallery, architecture]
date: 2026-10-22
description: The Motion Gallery's big missing feature is scroll choreography — a gallery that starts as a stack, forms into one layout, reforms into another, then the images exit, all driven by scroll. Decision — add it as a new design inside the gallery_3d shortcode (not a new shortcode), built on a formation-timeline model (per-card poses lerped across scroll beats) that generalizes photo_scatter's existing scatter→tidy morph. Ship a curated formation set first (Tier 1), with morph-between-any-existing-designs as a follow-on.
---

**The question:** The Motion Gallery's most-requested missing feature is **scroll choreography** — a gallery
that starts as a stack of images, forms into a nice layout on scroll, reforms into a *different* layout on
further scroll, then the images exit on scroll. Do we add it as a **new shortcode**, a **new design** inside
the existing `gallery_3d` shortcode, or a **new motion mode**? And mechanically, how do you **morph between**
two gallery layouts?

<!-- truncate -->

## Context

- The Motion Gallery is deliberately **one shortcode (`gallery_3d`) with ~27 designs** in a picker. Every
  design is a single *formation* — the scroll-scrub motion mode (pinned stage + a `scrollProgress()` 0→1
  playhead) just drives that one arrangement; there's no "be a stack, then a ring, then a wall, then exit."
- But the mechanism already half-exists: **`photo_scatter` lerps cards from a scattered layout to a tidy grid
  on scroll** (a 2-beat morph), and **`sphere_cascade` sweeps its curvature** (bowl → grid → sphere). So the
  gallery can already interpolate a card between two states on scroll — what's missing is generalizing that
  from 2 baked states to an **ordered list of N formations**.
- A new design-registration API (`registerDesign` + a `ctx`) had just shipped, so a new design is cheap to add.

## Options considered

- **A new shortcode ("Choreograph Motion Gallery").** Rejected: it would duplicate everything `gallery_3d`
  already gives for free — card sourcing (media or a post type's featured images), the lightbox, captions,
  box styles, stage, the pin/progress plumbing — and leave two galleries to maintain.
- **A new motion *mode* (`choreograph`) on any design.** The most powerful (morph between *existing* designs),
  but it needs every built-in design refactored to expose a declarative `layout(i, n) → transform` first.
- **A new *design* (`scroll_choreography`) inside `gallery_3d` (chosen).** Self-contained, drops into the
  picker, reuses the whole gallery surface, and dogfoods the new registration API.

## Decision

**A new design, `scroll_choreography`, inside `gallery_3d`**, built on a **formation-timeline** model:

- A formation is a per-card pose `{ x, y, z, rotX, rotY, rot, scale, opacity }` — the common language the
  designs already speak internally.
- A choreography is an ordered list of formation **beats** (e.g. `stack → grid → ring → exit`). At scroll
  progress *p*, the runtime finds the two bounding beats and **lerps every card's pose between them** (smooth
  easing) — exactly what `photo_scatter` does for its two states, scaled to N. It rides the existing pin +
  `scrollProgress` playhead and honours reduced motion (snaps to the first formed look).
- **Tier 1 (shipped as a prototype):** a curated, cleanly-interpolable formation set (stack · grid · ring ·
  fan · wall · scatter-out) offered as Sequence presets. Verified live — a gallery stacks in, forms a grid,
  reforms into a 3D ring, then flies out, scrubbed by scroll.
- **Tier 2 (follow-on):** give each existing design a declarative `layout(i, n)`, so a choreography can morph
  between *any* two designs (ring → tunnel → sphere). Bigger refactor; natural next step.

## Why

- It delivers the exact "stack → form → reform → exit on scroll" effect while **reusing** the gallery's whole
  surface and the pin/progress engine — no duplicate shortcode, no parallel format.
- The **formation-timeline is the right primitive**: `photo_scatter` already proves the 2-beat lerp works, so
  generalizing to N is low-risk and opens the door to Tier 2 without rework.
- It's the Motion Gallery's version of the engine's **Scroll Keyframes** (beats across a pinned scroll range),
  keeping the mental model consistent across the engine. Status: **Accepted** (Tier 1 prototyped).
