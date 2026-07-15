---
slug: shortcode-designs-as-a-registry
title: "Why a shortcode's designs are a registry, not hardcoded templates"
authors: [jon]
tags: [architecture, shortcodes]
date: 2026-07-15
description: I wanted a shortcode (Testimonials, then Posts) to offer many swappable layouts without every new one bloating the view. The choice was a growing if/else of inline templates versus a single-source-of-truth registry that the picker, dispatcher and asset enqueue all read. We took the registry because adding a design then becomes one entry + one template file + one thumbnail, touching nothing else.
---

**The question:** I want a shortcode to ship lots of visual designs — and to keep adding more — without
the view file turning into an ever-growing pile of conditionals. How should "which design renders" be
structured so a new design is cheap and safe to add?

<!-- truncate -->

## Context

This started on the Testimonials shortcode and carried straight into Posts. Years ago the old Lastimosa
theme did something similar: a `style` picker, a one-line dispatcher (`include $atts['style'].'.php'`),
and one self-contained template per style. The instinct was right — it's just the strategy pattern for
view rendering, the same idea as WordPress block style variations — but the old implementation had rough
edges (an unguarded `include` built straight from saved data, whole-template duplication, PHP-compiled
CSS).

Posts already had a related seam: `views/parts/card-*.php` templates dispatched by a `$part_map` array
in the view. So the question was less "should designs be swappable" and more "where does the list of
designs live, and how many places have to change when I add one."

## Options considered

- **Hardcoded dispatch.** Keep a `$part_map` / `switch` in the view, add card CSS to the one bundled
  stylesheet, add the option to the picker by hand, and remember to wire the thumbnail. Works, but every
  new design edits three or four files, and the sources drift (a design in the map with no picker entry,
  or a picker entry with no CSS).
- **Registry as single source of truth.** One `registry.php` returning `key => { label, thumb, part,
  …meta }`. The options picker builds its choices from it, the view dispatcher resolves `key → part` from
  it, and (for Posts) the per-design CSS is auto-detected by filename. Composition behaviour that used to
  be hardcoded (hero-split's first card, alternating's zig-zag) became registry *meta* (`first_style`,
  `alternate`) so even those are declarative.

## Decision

**A registry.** `views/{designs,parts}/registry.php` is the one place designs are declared; the picker,
the dispatcher, and the asset layer all read it. **Adding a design = one registry entry + one template
file + one SVG thumbnail** (+ an optional CSS file), and nothing else changes. The dispatcher resolves
the design defensively — never `include` the raw saved value — falling back to the default design when
the key is unknown or the file is missing.

## Why

The whole point was to make "add another design" a non-event, and a registry is what delivers that: the
list can't drift out of sync because there's only one list, and a new design is additive by construction.
It also made the pattern portable — Testimonials went from 7 → 11 designs and Posts from 7 → 23 in this
session, each new one a copy-the-recipe change with no edits to the picker, view, or enqueue code. Reviving
the old template-dispatch idea was right; centralising the list (and guarding the dispatch) is what made it
hold up at 20+ designs instead of 2.
