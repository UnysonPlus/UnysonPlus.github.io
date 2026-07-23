---
slug: gallery-3d-motion-picker-and-scroll-pinning
title: "3D Gallery Motion: a nested multi-picker (via a NEW key) plus CSS-sticky scroll pinning"
authors: [jon]
tags: [option-types, architecture, page-builder]
date: 2026-07-23
description: Scroll-scrub barely registered when the gallery scrolled past like normal content, and the flat Motion group mixed mode-specific sliders with no hint of what applied when. The gallery gained "Pin while scrubbing" (a pure CSS-sticky pin, no scroll hijacking) and its Motion options became a multi-picker nested inside the Design picker — stored under a NEW key so the old scalar `drive` never meets an array and the "blank error modal" migration class is unreachable.
---

**The question:** for the 3D Gallery's Scroll-scrub motion, should the gallery *pin* on screen while
the visitor's scroll drives the animation (instead of scrolling past with only a sliver of movement
visible)? And should the Motion options become a multi-picker so each mode reveals only its own
settings?

<!-- truncate -->

**Context:** with Motion = Scroll-scrub, the gallery owned only the ~1–1.5 viewport-heights of
scroll it took to pass through the viewport — a ring turned ~90° and was gone, so visitors barely
registered that they were driving it. At the same time the Motion group had grown flat and
confusing: Loop Duration applies only to Auto-rotate, the incoming pin controls only to
Scroll-scrub, On Hover only to Auto — all stacked together with no hint of what applied when. And
the framework carries a documented scar here: converting a saved *scalar* option to a multi-picker
*array* previously corrupted the options-render AJAX and produced the blank "error:" modal on
pre-existing items (the easing-options incident).

**Options considered:**

- **Pinning: scroll-hijack JS vs CSS `position: sticky`.** Hijacking (wheel interception) gives
  exact control but breaks native momentum, accessibility and mobile feel. CSS sticky — wrapper
  stretched to `stage + N × 100vh`, stage stuck viewport-centred inside it — keeps native scrolling,
  degrades to the old pass-through when unsupported, and needs only a progress-formula change in the
  shared driver.
- **Motion UI: flat group with better labels vs a nested multi-picker.** Labels don't scale — every
  new mode multiplies the irrelevant-slider pile. A multi-picker reveals per-mode settings, but had
  never been nested *inside* another multi-picker (the Design picker) before; verification showed
  both the PHP (render + value round-trip) and the JS (instance-scoped `> .choice-group` selectors,
  `pickerDescriptor.el === optionDescriptor.el` filtering, lazy `data-options-template` injection
  re-firing `fw:options:init`) handle nesting, provided choice keys never collide across levels.
- **Migration: reuse the `drive` key with JS+PHP migrators vs a NEW `motion` key.** Reusing the key
  re-enters the easing-options failure class and demands a custom builder-item JS migrator. A new
  key means existing saves simply have *nothing* there — the picker renders its default and the
  illegal-string-offset path is unreachable; the views fall back to the legacy flat keys so saved
  galleries keep behaving identically on the front end.

**Decision:** both. Scroll-scrub gained **Pin while scrubbing** (default on) + **Scroll Length
(viewports)**, implemented as CSS sticky in the shared layer so every design — current and future —
inherits it. Motion became an inline multi-picker (Auto/Continuous → loop/direction/hover;
Scroll-scrub → pin/length/direction; Static → nothing) stored under the **new `motion` key**, with
Drag to spin + Drag Momentum kept outside the picker because they layer over every mode.

**Why:** pinning is what makes scroll-scrub legible — the visitor holds the scene and *feels* the
scroll steering it, which is the entire point of the mode. The nested picker keeps the Motion UI
truthful (you only see what the chosen mode uses) and scales as designs and modes accumulate. The
new-key strategy was the decisive safety call: it converts a historically dangerous value-shape
migration into a no-op, at the negligible cost that pre-picker saves show the default Motion in the
modal until re-saved. Doing it days after the gallery shipped — before real saves accumulate — made
this the cheapest moment the change will ever have.
