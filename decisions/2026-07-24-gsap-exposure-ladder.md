---
slug: gsap-exposure-ladder
title: "How far should the Animation Engine expose GSAP — and how do we teach it?"
authors: [jon]
tags: [architecture, javascript]
date: 2026-07-24
description: GSAP already powers Scroll Motion, but the options only exposed a curated slice — no easing control, no timelines, no escape hatch. The question was how much of the underlying library to surface without turning a builder into a code editor. The answer became a five-rung ladder from presets to a raw snippet field, with a "show me the generated GSAP" panel as the rung that teaches the library instead of hiding it.
---

**The question:** GSAP + ScrollTrigger already drive the Scroll Motion module, but the builder only
exposed a hand-picked slice — Style presets, direction, distance, start. Power users kept hitting a
wall (no easing choice, no way to choreograph several elements, no way to write anything the presets
couldn't express). How much of GSAP should we surface, and where does exposing-more stop being
"friendly to advanced users" and start being "a code editor bolted onto a page builder"?

<!-- truncate -->

## Context

Two forces pulled against each other. The framework's whole promise is *"native options before
code"* — a non-developer should build motion by clicking, not by learning an API. But GSAP is a real
library that's *already loaded*, and refusing to expose any of it wastes a capability the site is
already paying for. A blunt "add a GSAP code field" answers the power user and betrays the beginner;
"never expose anything" does the reverse.

There was also a stated goal beyond either audience: the owner wanted the engine to help people
*learn* GSAP and web animation "in our own way" — the builder as a teaching tool, not just a
generator.

## Options considered

- **Stay curated** — keep the presets, add nothing. Simple, but the wall stays and nothing is
  learned.
- **One raw GSAP code field** — maximal power, minimal work. But it's the antithesis of the
  clean-DOM / no-code promise, a support and security burden, and it teaches nothing (you either
  already know GSAP or you don't).
- **A graduated ladder** *(chosen)* — expose GSAP in rungs, each optional, each a no-op at its
  default, with a rung whose entire job is to *show* the code the earlier rungs generate.

## Decision

Five rungs, shipped across engine 1.2.38–1.2.41, on the Scroll Motion module:

1. **Presets** — pick a tile, it looks good. Most users never leave here.
2. **Advanced options** (1.2.38) — the GSAP knobs the presets normally decide: easing (curated eases
   + a validated custom string), scrub smoothing, ScrollTrigger markers. Collapsed behind a single
   "Default" row; every field renders byte-identically to before when left alone.
3. **Motion Sequence** (1.2.40) — choreography without code: a Section plays its children's
   Reveal/Stagger as one `gsap.timeline()`, the *steps are the children*, one Overlap knob tunes the
   flow. (Its own decision entry covers the timeline→options translation.)
4. **Show generated GSAP** (1.2.39) — a read-only panel inside each effect that prints the exact
   `gsap.from(el,{…})` the current settings produce, live. The teaching rung.
5. **Motion Snippet** (1.2.41) — a "Custom Code" effect: write your own GSAP with `el` / `tl` / `gsap`
   provided; the runtime manages lifecycle. The lossless escape hatch. (Security in its own entry.)

## Why

- **Every rung is opt-in and default-inert**, so the beginner experience is untouched — the ladder
  adds ceiling without raising the floor. That's what lets one panel serve both audiences.
- **Rung 4 is the keystone.** Exposing knobs (rung 2) or a code field (rung 5) is common; a panel
  that shows you *the code your own clicks generate* is not, and it's what turns the engine from a
  black box into a way to learn GSAP. The intended path is legible: build with options → read the
  generated GSAP → Copy → paste into a Motion Snippet → tweak. Each rung hands off to the next.
- **It respects "native options before code" without pretending code never matters.** Rungs 1–4 are
  all options; code only appears at rung 5, as the explicit, gated last resort — the same shape as
  styling's "everything is an option until Custom CSS."
- **Reuse over new surface.** Rungs 2 and 5 live inside the existing `gsap_motion` control; rung 4 is
  a value-less option type mirroring the 3D-gallery preview; rung 3 reuses the runtime's own config
  builder. No parallel systems.

## Note on the capture pipeline

The ladder also gave the site converter somewhere to put motion it detects but can't map to an
option: an advanced-tuned effect, or — when nothing fits — a Motion Snippet reconstructed from the
traced ScrollTrigger/transform data. Motion now has the same *map → tune → snippet-fallback → report*
ladder that styling has (*map → tune → Custom CSS → report*).
