---
slug: shape-dividers-own-library-geometry-only-preset
title: "Why shape dividers are their own library storing geometry only, with colour per-instance"
authors: [jon]
tags: [architecture, shortcodes, page-builder]
date: 2026-08-13
description: "Only the Section uses shape dividers, so the tidy move looks like folding them into Section Styles and letting each preset carry its colour. We did the opposite — a dedicated Shape Dividers library whose presets hold geometry alone, with colour, height and flip set per section, and a single shape set rotated per placement rather than separate top/bottom presets. The through-line is one rule — a preset stores the reusable asset, never the per-use decoration."
---

**The question:** Shape dividers are used by exactly one place — the Section. So why give them their
own Components tab instead of folding them into Section Styles? Should a divider preset carry its own
colour? And since the Top and Bottom pickers show the same shapes, should Bottom just be a flip of
Top, or should we ship separate bottom presets?

<!-- truncate -->

## Context

The Section shortcode had four hardcoded SVG edge shapes (tilt / curve / wave / triangle) with the
geometry duplicated between `options.php` (the choices) and `views/view.php` (the paths). Turning
that into a user-extensible **Shape Dividers** preset library — paste an `<svg>` or upload a `.svg`
and it appears in the picker — raised three placement questions at once, and they turned out to be
the same question wearing three hats.

## Options considered

**Where the library lives.** Fold it into Section Styles (both are section-scoped, one fewer tab), or
give it its own Components tab like Background Patterns.

**Where colour lives.** Bake a colour into each divider preset (so a preset is a finished look), or
keep colour a per-section field and let the preset be geometry only.

**How Top and Bottom relate.** Force Bottom to be a flip of Top (one pick), ship a separate set of
bottom presets, or keep one shared library with two independent picks.

## Decision

**A dedicated Shape Dividers library; presets store geometry only; one shape set oriented per
placement.** All three fell to the same principle: *a preset stores the reusable asset, and nothing
that is specific to a single use of it.*

**Own tab, because "only the Section uses it" is a today-fact, not a design boundary.** Background
Patterns is already its own tab even though the Section is *its* heaviest consumer too (patterns also
serve Containers and the site background). The established model here is one reusable asset library =
one Components tab. Section Styles is a different *category* — named colour/skin variants
(`.section--{slug}`) — so a geometry library filed under it would be a surprising place to find, and
would stack two `addable-box` libraries in one tab. And an edge shape is a general asset: a Container
edge or a standalone divider element could consume the same library later, exactly as patterns
outgrew being "just for sections." Merging also buys nothing structurally — the Section picker reads
the library through a resolver regardless of where the admin tab sits.

**Colour is per-instance, because the same shape is reused in many colours.** One wave divider is
white against a photo on one section and navy against a tint on the next. Bake colour into the preset
and each colour becomes a *separate preset* — the library bloats into near-duplicates and the user
maintains "wave-white", "wave-navy", "wave-slate". So the preset holds the path; **Colour, Height and
Flip are set per section** (revealed the moment a shape is picked). Geometry is the reusable asset;
colour is the per-use decoration.

**One shared library, rotated per placement — not a flip, not separate presets.** Top and Bottom are
independent picks (Wave on top, Triangle on bottom is legal), so forcing Bottom to be a flip of Top
would remove a real capability. Separate bottom presets would double the library for shapes that
already serve both edges: the Section draws a **top** divider by rotating the same path 180° so it
reads at the top edge, and a **bottom** divider as-authored. The only thing that was genuinely wrong
was the *picker thumbnails* — both pickers previewed the bottom orientation, so the Top picker looked
upside-down. That was fixed where the problem actually lived: the thumbnail generator orients its
preview per placement (Top thumbnails rotate 180° to match the render), leaving the data model — one
library, two independent picks — untouched.

Supporting decisions:

- **Built-ins keep their old slugs.** The four seeded shapes reuse `tilt` / `curve` / `wave` /
  `triangle`, so a section that saved `divider_top = {shape: 'wave', …}` before the library existed
  resolves identically afterward — no migration, byte-identical render.
- **The authoring control is the existing `svg-code` type, not a new one.** It already exists (the
  `svg-morph` shortcode uses it) and reads an uploaded `.svg` client-side with `FileReader`, so no
  file touches the media library and the SVG-mime block never applies. Reused, not rebuilt.
- **The picker is a popover image-picker** (same mechanism as Background Pattern): thumbnails in a
  panel, with the per-instance Colour / Height / Flip revealed in that same panel.

## Why this doesn't generalise

"Only one thing uses it, so nest it there" is often right — a control used by a single feature usually
belongs with that feature. It lost here because a shape divider is a *reusable asset*, not a
feature-local setting: it has its own author-once / apply-many lifecycle (like colours, patterns and
section styles), and asset libraries earn their own home. The tell is whether the thing is authored
once and reused, or configured per use. Geometry is the former and lives in the preset; colour is the
latter and does not.
