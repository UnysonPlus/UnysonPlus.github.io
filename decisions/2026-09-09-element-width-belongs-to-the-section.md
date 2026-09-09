---
slug: element-width-belongs-to-the-section
title: "Why an element fills its parent instead of carrying its own width container"
authors: [jon]
tags: [architecture, shortcodes, back-compat]
date: 2026-09-09
description: "Converting Testimonials off its Bootstrap-style grid surfaced a leftover: it was the only element shipping its own Container option (fw-container), so a testimonials block inside an already-contained section was width-constrained twice. The question was whether an element should own its max-width at all, or leave that to the section/column it sits in. The decision: width is the section's job — the Container option now defaults to None (the element fills its parent), with Container/Fluid kept only as an opt-in escape hatch for full-width placements that have no containing section."
---

**The question:** While converting Testimonials off the Bootstrap-style `fw-row`/`fw-col` grid, its markup still emitted an inner width wrapper (`fw-container`, renamed to `.testimonials-container`). Inside a builder section that already constrains content width, that means the block is contained *twice*. Should an element carry its own max-width at all — or is width the responsibility of the section / column it sits in?

<!-- truncate -->

## Context

Testimonials had a **Container** option (`container_type`: None / Container / Fluid) defaulting to **Container**, echoed by all twelve of its design templates as a Bootstrap-style `.fw-container` (stepped max-widths: 540 → 1320px). It's a carryover from the original Unyson widget, when an element might be dropped into a raw full-width template with nothing else to constrain it.

But an audit of the sibling elements settled it quickly: **Testimonials was the only one with its own container option.** Image + Content, Tabs, Accordion, Carousel, Feature List, Icon Box — none of them carry `container_type`. They all fill their parent and let the section (or column, or the theme's content area for a bare shortcode) own the width. On the demo pages, where every element sits in a `fw-contained` flexbox band, the testimonials container was pure redundancy — a second max-width inside the first, and an extra wrapper div in output the whole modernization pass was trying to slim down.

## Options considered

- **Default the Container to None; keep the option.** The element fills its parent like every other element; Container / Fluid stay available as an opt-in for the genuinely-uncontained case. *Pro:* aligns Testimonials with the rest of the library, kills the double-containment and the extra div, and preserves an escape hatch. *Con:* one element still has an option none of the others do.
- **Remove the option entirely.** *Pro:* maximum consistency. *Con:* removes the one real use (a testimonials dropped into a full-width area with no containing section) with no replacement, and orphans a saved value on every existing instance.
- **Leave it as-is (default Container).** *Pro:* zero change. *Con:* keeps a Bootstrap-era wrapper and double-containment, contradicting the point of the conversion.

## Decision

**Width belongs to the section, not the element.** The `container_type` option now defaults to **None** — the element fills its parent, and the section / column owns the width, exactly like every other element. **Container / Fluid remain** as an opt-in escape hatch (self-contained `.testimonials-container` / `--fluid`, not `.fw-container`) for the rare full-width placement with no containing section. Instances that explicitly saved a container keep it (the change is to the default, not a removal), so nothing already built re-flows.

## Why

The section is where layout width is already decided — it's the one place the user sets contained-vs-full-width, and it's where every other element defers. An element re-asserting its own max-width fights that: it double-constrains inside a contained section and produces a wrapper that exists only to repeat a decision made one level up. Defaulting to None makes Testimonials obey the same rule as the rest of the library, removes a nesting level from the output, and drops the last Bootstrap-named wrapper the element emitted — while keeping Container/Fluid for the one case (no containing section) where the element really is the only thing that can set the width.
