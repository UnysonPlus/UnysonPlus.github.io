---
slug: kinetic-scenes-pin-to-stage
title: "Why doesn't a scene reflow to its box like a web page?"
authors: [jon]
tags: [architecture, animation]
date: 2026-10-16
description: A scene keeps a fixed-shape frame per layout, like a video or an artboard, so it always looks as designed. Items that belong to the box rather than the picture are pinned to the stage instead, which puts them in the box's real corners on any shape.
---

**The question:** The homepage hero is 1905 × 833 but the scene is 16:9, so it shows strips of page at the sides and a
corner badge can't reach the hero's corner. Shouldn't the stage adjust to its container, so something placed bottom
right is always bottom right?

<!-- truncate -->

## Context

Inside a layout, every position in a scene is a percentage of a fixed-shape frame (16:9 on desktop, 4:5 on phones),
which scales with the stage. That is the model of motion tools (After Effects, Rive, Lottie): what you design is
exactly what plays. When the stage's shape differs, the frame is either trimmed or shown whole with space at the sides.

## Options considered

- **Reflow everything like a web page.** Every layer anchored to stage edges. Animations designed in one shape would
  break in others (paths, overlaps, camera moves), and nothing would look as designed.
- **A layout per shape.** Extra layouts for very wide or tall stages. Useful, but it is more design work and still
  cannot put an item in the exact corner of every shape.
- **Pin to the stage, per layer.** The frame stays; individual layers that belong to the box (a badge, a logo, a corner
  call to action) are placed against the stage instead.

## Decision

**Pin to the stage.** A top-level layer or group with `pin: "stage"` is laid out in a pin space that covers the whole
stage: its x / y are % of the stage, its sizes and text keep the frame's units (so it matches everything else), it sits
above the other layers and the camera does not move it. The player keeps the pin space fitted to the stage on every
resize, and the editor drags and aligns pinned layers in stage space. **Layouts by shape** stay on the roadmap for
ultrawide heroes.

## Why

It keeps what makes scenes reliable (the picture always plays as designed) while giving the few items that should
follow the box exactly the behaviour web designers expect, such as a badge that mirrors the sound button in the opposite
corner on any screen.
