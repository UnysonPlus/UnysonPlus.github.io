---
slug: choreography-forms-registry
title: "How should a new Motion-Gallery choreography 'look' get added — a core branch each time, or a registry?"
authors: [jon]
tags: [animation-engine, motion-gallery, architecture, extensions]
date: 2026-10-28
description: The Scroll-Choreography steps were each a hand-written pose generator in core, mirrored across a JS whitelist, a PHP picker and a PHP view whitelist — four edit sites per new look. Decision — keep the built-in looks as they are, but add a declarative registry (a PHP filter + a shared JS global) so a design or child theme contributes a resting pose with no core edit, and derive the picker and whitelist from the one filterable list.
---

**The question:** Each Scroll-Choreography "look" (stack, ring, cover flow, orbit, hero reel, …) is a hand-written
pose generator in the gallery runtime. Adding one meant editing **four** places in lockstep — the JS pose
function, the JS `VALID_FORMS` whitelist, the PHP Steps picker, and the PHP view whitelist. Should every new
look keep paying that core-edit tax, or should designs contribute their own resting pose declaratively?

<!-- truncate -->

## Context

- "Real-design layouts" on the roadmap wanted a choreography *step* to be a **real gallery design's layout**,
  not an abstract formation. We added seven faithful looks (Cover Flow, Film Strip, Orbit, Hero Reel, Focus
  Slider, Depth Stack, Mosaic) to reach 19 — but each one was four synchronized edits, and a missed mirror of
  the **view** whitelist (JS-only) silently dropped the new forms from `data-tdg-choreo` at render time. The
  duplication was actively causing bugs.
- The engine already had a precedent: **`registerDesign`** lets a child theme add a whole gallery *driver*
  without core edits. A choreography *form* is a much smaller unit (a pure `fn(N) → pose[]`), so the same
  "register, don't edit core" shape fits even better.
- Timing matters: a form must exist **before** a gallery first poses itself, and the gallery script loads in
  the footer — so a footer-loaded registration runs too late for the first paint.

## Options considered

- **Keep hand-writing each look in core.** Simple for us, but four edit sites per look, no extensibility for
  designs/child themes, and the mirror-drift bug it already caused.
- **Rewrite all 19 built-ins into a registry map.** Clean, but a large, risky transcription of working code
  for little gain — the built-ins don't need to move to make the system extensible.
- **A registry layer on top (chosen).** Leave the built-ins as-is; add a shared registry that `choreoForm`
  consults first, and derive the picker + view whitelist from one filterable PHP list.

## Decision

1. **A shared JS registry seeded in the head.** `CHOREO_FORMS` *is* `window.upwGallery3dForms` (a shared
   object). A design/child theme sets `window.upwGallery3dForms.<name> = fn(N)` in a `wp_head` inline — so the
   form is present the moment galleries init — or calls `window.upwGallery3d.registerChoreoForm(name, fn)` at
   runtime for later-inserted galleries. `choreoForm` checks the registry first, so a form can also override a
   built-in.
2. **One filterable PHP list feeds both the picker and the whitelist.** `fw_gallery_3d_choreo_formations`
   filters the formation list; the Steps picker and the view's accepted-keys list both read it, so a registered
   name shows in the UI and survives the view's `data-tdg-choreo` sanitising — killing the duplicate-whitelist
   bug class at the root.

## Why

- It matches the engine's existing extension story (`registerDesign`) and removes the four-edit tax **and** the
  mirror-drift bug — adding a look is now a drop-in, not a core change.
- Keeping the 19 built-ins untouched meant zero risk to shipped looks while still making the system open.
- Proven end-to-end: a non-core **"ribbon"** formation, defined only in a drop-in (PHP filter + head-seeded
  `fn(N)`), rendered correctly with no core edit — the property the whole decision was for.
  Status: **Accepted.**
