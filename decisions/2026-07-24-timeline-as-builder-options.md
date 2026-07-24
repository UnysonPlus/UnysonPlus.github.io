---
slug: timeline-as-builder-options
title: "How does a GSAP timeline become builder options a non-coder can drive?"
authors: [jon]
tags: [architecture, page-builder]
date: 2026-07-24
description: A GSAP timeline sequences several elements' animations with relative positions — the concept our per-element effect model couldn't express. Rather than a keyframe editor or a code field, the timeline became a Section behavior where the steps ARE the child elements in document order and one Overlap knob tunes how they flow, reusing the runtime's existing config builder so a step looks identical whether standalone or sequenced.
---

**The question:** the engine's model was one effect per element, each firing independently when it
scrolls into view. A GSAP *timeline* is the opposite — several elements animating in a choreographed
order with relative timing. How do you translate that into page-builder options a non-coder can
drive, without shipping a keyframe editor or a code field?

<!-- truncate -->

## Context

Users faked choreography by hand-tuning per-element `delay` values ("heading at 0, subtitle at 0.2,
button at 0.4") — brittle, because changing one duration means re-tuning every downstream delay. That
brittleness is exactly what timelines exist to remove: positions are relative, so the sequence holds
together when any single tween changes. But a timeline is a *code* construct; the builder needed a
shape a visual editor could express.

The framework had already solved a structurally identical problem twice: Sticky Card Stack and Scroll
Story both treat *"the child columns"* as the ordered units of a Section-level effect.

## Options considered

- **A keyframe/timeline editor UI** — most faithful to GSAP, but heavy, and it drags the builder
  toward being an animation tool rather than a page tool.
- **Per-element "start at N seconds" fields** — familiar, but it recreates the brittle absolute-delay
  problem the timeline was meant to solve.
- **A Section behavior where steps = children** *(chosen)* — mark a Section as a Motion Sequence and
  its children's existing Reveal/Stagger animations assemble into one `gsap.timeline()` in document
  order; one **Overlap** knob sets how far each step starts before the previous ends.

## Decision

Motion Sequence (engine 1.2.40), a Section-level module mirroring Sticky Stack / Scroll Story. Turn it
on and the descendant Reveal/Stagger steps play as one timeline on a single trigger (on-view or
scrub). The steps are the children in builder order; Overlap is the only timing control. Children keep
the effects they already have — the sequence only decides *when* each fires.

## Why

- **The translation is "positions become one knob, steps become the children."** `.to(b)` sequential,
  `.to(c,'<')` together, `.to(d,'+=0.5')` offset — the full position vocabulary collapses, for the
  common case, into "each step starts `overlap` seconds before the previous ends." A non-coder reads
  that as a single slider, not a timeline API.
- **No new vocabulary.** A child in a sequence uses the same Reveal it would use standalone; the
  runtime reuses its own `compound()` config builder, so a step is byte-identical either way
  (direction, distance, style, ease — including the Advanced ease). Existing pages gain choreography
  by flipping one Section option.
- **It matches a shape the framework and its users already know** (cards = columns, scenes = columns
  → steps = children), which is why it needed no new mental model and no new front-end asset — it
  rides the Scroll Motion runtime that's already present because the children use it.
- **Scoped to Reveal/Stagger first.** Those are the 95% choreography case (heading → subtitle →
  button) and the two effects that share the entrance config builder; other effects stay standalone.
  Per-element after/with/offset positioning is the natural next increment, once the one-knob version
  proves the shape.
