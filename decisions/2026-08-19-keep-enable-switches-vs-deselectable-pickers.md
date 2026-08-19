---
slug: keep-enable-switches-vs-deselectable-pickers
title: "Why we keep the 'Enable' switch even though image-picker choices are now deselectable"
authors: [jon]
tags: [option-types, architecture, animation]
date: 2026-08-19
description: 'Once the popover image-picker gained a deselect gesture (clearing the selection means "none"), it was tempting to drop the separate "Enable X" switch above each Site-wide UX feature — deselecting the image could stand in for turning the feature off. We decided against it, because a switch and a deselect answer different questions, and folding them together loses state, hurts discoverability, and breaks the consistency of a tab whose other features have no image to deselect.'
---

**The question:** Now that image-picker choices in the popover can be deselected (clearing the
selection means "none"), should we remove the standalone "Enable page transitions" style switches
across Site-wide UX and let "no image selected" mean "off"?

<!-- truncate -->

## Context

The Site-wide UX tab (Page Transitions, Cursor, Preloader, Smooth Scroll, Dark Mode, Scroll
Progress, …) pairs an **Enable X** switch with the feature's controls. For the image-picker features
— e.g. Page Transitions with its searchable Fade / Content Fade-Up / Zoom tiles — the picker recently
gained a **deselect** gesture: clicking the selected tile clears it, storing "none". That raised a
fair question: if "none" is now a reachable state, isn't the separate enable switch redundant? Deselect
the transition → no transition → effectively off.

## Options considered

- **Remove the enable switch; treat "no image selected" as off.** Fewer controls, one less thing to
  reason about, and "none" becomes a first-class member of the choice set. But it overloads the picker
  with two jobs — *which variant* and *whether the feature runs at all* — and only works for features
  that actually have an image to deselect.
- **Keep the enable switch as the master on/off; deselect stays a "clear my choice" escape hatch.**
  One extra control per feature, but enablement and variant-choice stay orthogonal, and every feature
  in the tab toggles the same way.
- **Keep the switch, and for features where "none" is genuinely first-class, add an explicit "None"
  tile** rather than leaning on the subtle deselect gesture. Best of both where it applies, without
  changing the enable model.

## Decision

Keep the enable switches. Deselect is treated as what it's best at — a "none / clear" option *within*
the choice — not as the feature's on/off. Where "none" is a natural first-class member of a picker's
set, we prefer adding an explicit **None** tile over repurposing the deselect gesture, but the master
switch stays either way.

## Why

- **They answer different questions.** The switch is *"is this feature active at all?"*; the picker is
  *"which variant?"* An image-picker with nothing selected means "enabled, but no transition chosen" —
  an in-between state, not a clean off. The switch says off unambiguously.
- **Deselect discards the user's choice.** With a switch you can disable Page Transitions while keeping
  "Zoom" selected, then re-enable later with Zoom intact. If off means "no image selected", disabling
  wipes the configured variant and re-enabling forces a re-pick. Keeping enablement orthogonal to the
  choice is the more forgiving model.
- **Consistency across the tab.** Most Site-wide UX features have an enable switch but *no* deselectable
  image — Smooth Scroll (sliders), Dark Mode (a mode select), Scroll Progress (a color). Removing the
  switch only where there's an image picker splits the tab into two mental models: some features toggle
  via a switch, others via a "clear the tile" gesture. Uniform switches are easier to learn.
- **Discoverability.** "Enable page transitions: YES/NO" is obvious at a glance; "clear the image to
  disable" is a hidden affordance most users won't find. Deselect is a good escape hatch, not a good
  primary control.
- **Default direction.** The switch lets a feature ship **off by default** while still offering a
  sensible preselected tile (Fade) once enabled. Without the switch you either default the feature *on*
  (a tile is preselected) or present an empty, uninviting picker.

## Status

Accepted — no code change; this ratifies the existing pattern and rules out the "deselect replaces the
switch" simplification.
