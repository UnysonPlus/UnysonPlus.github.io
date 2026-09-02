---
slug: choreography-guide-for-keyframe-authoring
title: "How should authors pick the scroll % for a 3D choreography keyframe"
authors: [jon]
tags: [architecture, page-builder]
date: 2026-09-02
description: The Model Viewer scroll choreography asks for each keyframe At scroll % which is impossible to guess against a real page, so instead of a percentage label on the slider thumb we ship an opt-in front-end guide with a marker in the scroll for each keyframe and a live HUD of the current percent and pose.
---

**The question:** Model Viewer's Scroll Choreography asks for each keyframe's *At (scroll %)* —
`0` = start, `100` = end. But a typical author cannot guess that "section 3" is ~48%. What is the best
way to help them set it?

<!-- truncate -->

## Context

A choreography is a list of keyframes, each a pose at a scroll position (0–100%). The slider already
shows the number on its thumb and 0/25/50/75/100 ticks, so *reading* the value is not the problem —
**mapping a percentage to the author's actual page is.** Nothing on screen connects "48%" to "the
section where I want the model to arrive." The author ends up typing a number, publishing, scrolling,
and guessing again.

Two ideas were floated: a percentage label riding next to the slider thumb in the builder, or a
front-end overlay that reports the live state of the choreography as you scroll.

## Options considered

- **A percentage guide on the slider thumb (builder-side).** Cheap, but nearly redundant — the thumb
  already shows the number and the track is already ticked. It still leaves the real gap: the number
  means nothing without the page next to it.
- **An opt-in front-end guide (markers + live HUD).** While enabled, the front end pins a labelled
  marker in the scroll at each keyframe (`① 0%`, `② 22%`…) so the author sees which keyframe lines up
  with which real section, and shows a live HUD of the current scroll % plus the model's interpolated
  X/Y/scale/turn/tilt/opacity. The author scrolls their real page, reads the % where they want a pose,
  types it into `At %`, and turns the guide off before publishing. This is exactly how scroll timelines
  are authored elsewhere (GSAP's ScrollTrigger markers + a readout).
- **Author keyframes relative to sections instead of a percentage.** The most "intuitive" framing, but
  it couples the model to sibling sections it cannot reliably see from inside the page builder, and it
  throws away the portable, page-length-independent percentage model. A visual guide over a percentage
  keeps the robust model *and* makes it legible.

## Decision

Ship the **opt-in front-end Choreography Guide** — a `choreo_guide` switch (default off) that renders
per-keyframe markers pinned in the scroll plus a live HUD of the scroll % and interpolated pose, and is
turned off before publishing. The slider-thumb percentage idea is dropped as redundant; section-relative
authoring is not pursued (it would sacrifice the portable percentage model for less robustness).

## Why

The difficulty was never reading the number — it was relating the number to the page. Only the front
end can show that relationship, so the fix belongs there: markers make "48%" concrete by placing it next
to the author's own section, and the HUD closes the loop by naming the exact percentage as they scroll.
It keeps the underlying model a simple, portable 0–100% (no coupling to sibling sections), adds nothing
to the published page unless the author leaves it on, and mirrors the tool authors already reach for when
choreographing scroll.
