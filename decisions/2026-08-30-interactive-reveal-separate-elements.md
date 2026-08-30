---
slug: interactive-reveal-separate-elements
title: "Why \"Interactive Reveal\" is its own element, not a mode of one mega-element"
authors: [jon]
tags: [naming, architecture, shortcodes]
date: 2026-08-30
description: I wanted the hover/scroll product-reveal effect (a visual that comes apart to show its internals), robust and future-proof. Two things got settled — what to call it, and whether to unify the reveal techniques into one element or keep them separate. We keep them separate — Image Sequence (frame scrub) and Model Viewer (3D) already existed, so the new Layered-2D explode ships as its own element, Interactive Reveal, and the cross-cutting parts (hotspots, background/foreground placement, a clutter-free Reveal-Pack asset store) are built as shared services any of them can use.
---

**The question:** I want the "product reveal" effect — a visual that comes apart to show its
internals on scroll / hover / drag. It shows up as several techniques (frame scrubbing, layered
separation, true 3D). Do we build one clever element that switches between them, or separate
elements? And what do we call the new one, given "explode" is only one of its motions?

<!-- truncate -->

## Context

The initial instinct — captured in the first draft of this decision — was one engine with pluggable
"source adapters" (Sequence / Layers / 3D / Rive) behind a single element, so a new reveal technique
would be a new adapter, never a rewrite. Elegant on paper. Then reality: the Animation Engine already
ships **`image-sequence`** (its own description is literally *"the product-reveal effect"* — Apple-style
frame scrub) and **`model-viewer`** (interactive 3D glTF). Two of the three "modes" already exist as
clean, separate, working elements.

So the real fork wasn't "adapters vs hardcoded" — it was "merge the existing two (plus a new Layered
mode) into one mega-element, or leave them separate and add the missing piece."

Naming had the same shape: "Exploded View" is honest about the demo but the element also *assembles,
peels, orbits, morphs* — the name would lie the first time someone assembles instead of explodes.

## Options considered

- **One unified element with a mode switch (adapter engine).** One mental model, future-proof in the
  abstract. But it duplicates/absorbs two shipping elements, needs a big conditional options panel, and
  risks pulling 3D libraries onto pages that only want a 2-layer peel. And the flexibility is mostly
  unused: a given section is *either* a frame scrub *or* a 3D model *or* a layered explode — nobody
  toggles one instance between them.
- **Three separate, focused elements + shared services.** Keep `image-sequence` and `model-viewer`;
  build the missing **Layered-2D** technique as its own element. Put the cross-cutting concerns —
  hotspots, background/foreground placement, and a Reveal-Pack asset store — where every element (and
  future ones) can reuse them.

## Decision

Keep them **separate**. The new Layered-2D explode/peel element is **"Interactive Reveal"** (tag
`interactive_reveal`), a sibling to `image_sequence` and `model_viewer` under Media Elements. Its own
animation styles (explode / assemble / peel) stay as authored per-instance rather than a named
sub-mode. The reusable value lives as **shared services**: labelled **hotspots**, **placement**
(inline / section-background / foreground, with a pointer-events toggle), and a **Reveal-Pack** store
(`uploads/unysonplus/reveal/`, ZIP-imported, one poster — no Media-Library clutter) that both
Interactive Reveal and Image Sequence can draw on.

## Why

Two of the three already existed and worked; merging them was rework and risk for a flexibility users
don't exercise. Separate elements stay lean — each lazy-loads only its own dependencies (pick Model
Viewer, get the 3D libs; pick Interactive Reveal, ship almost nothing). And the genuinely reusable part
was never the renderer — it's the hotspots, the placement model, and the un-cluttered asset store — so
those become services shared across the family instead of being trapped inside one element. Future-proofing
is preserved differently than first planned: a fourth technique (e.g. Rive) is a new small element that
reuses the same shared services, and the standards-based cores (glTF + `<model-viewer>`, native CSS
scroll timelines with a GSAP fallback we already bundle) don't rot.

*Status: Accepted (supersedes the earlier "one engine + source adapters" draft). Interactive Reveal is
built (layers, 5 triggers incl. scroll/pin/hover/drag/toggle/autoplay, hotspots with leader lines,
placement); Reveal-Pack storage is the remaining shared service.*
