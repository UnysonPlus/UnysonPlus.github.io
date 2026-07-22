---
slug: image-style-presets-and-separating-layout-from-skin
title: "Why image treatments became a Theme Settings preset, not more Card Styles"
authors: [jon]
tags: [architecture, shortcodes, option-types, performance]
date: 2026-07-22
description: The Posts shortcode had grown to 23 flat "Card Styles" that quietly conflated two different things — the card's layout (where the image and content sit) and its skin (a border/fill treatment or an image mask). Styles like Diagonal Split, Glassmorphism and Polaroid were really a base layout plus a decoration frozen into a one-off combo, overlapping with the existing Box Preset system. Rather than keep adding fixed combos, we split the axes — Card Layout stays structural, Box Presets own the card frame, and a new Image Styles component preset owns image treatments (crop, mask, filter, scrim) as composable token bundles consumed by any element with an image.
---

**The question:** The Posts "Card Style" list felt redundant — several styles are just an image
mask or a fill on top of a base layout, and we already have Box Presets. How should image
treatments be organized, and should they become a reusable Theme Settings preset?

<!-- truncate -->

## Context

Posts had **23 flat Card Styles** in one picker. Auditing them by what they actually change, only
~15 are genuinely distinct **layouts** (image-top, side, overlay, minimal, editorial, timeline,
circular, quote…). The rest are a **skin** bolted onto a base layout and frozen into a fixed
combo: `diagonal` is `standard` + a clip-path on the image; `glass` is `standard` + a translucent
fill; `polaroid` is `standard` + a framed box. The fills/borders already overlap with **Box
Presets** (Theme Settings → Components → Box Presets), and the image-mask ones had no home at all.

Meanwhile ~23 shortcodes across the framework render a content image (media-image, image-box,
gallery, team-member, testimonials, before-after…), none of which could share an image treatment.

## Options considered

1. **Keep adding Card Styles.** Every new look is another fixed combo (layout × frame × mask)
   baked into one file, only for Posts. Redundant, unversatile, and it doesn't help the other 22
   image-bearing elements.
2. **Reorganize the picker only.** Group the 23 into "Layouts" vs "Decorated" for clarity — helps
   readability but leaves the redundancy and the Posts-only scope intact.
3. **Separate the axes into composable presets.** Card Layout stays structural; the **Box Preset**
   (border/shadow/fill/corners, already exists) owns the frame; a **new Image Styles preset** owns
   image treatments (crop/aspect, corner radius/circle, clip + SVG masks, CSS filters incl. a
   blend-mode duotone, and a legibility scrim). A card becomes *layout × box × image-style* instead
   of one of 23 fixed combos.

## Decision

Option 3, phased and non-breaking:

- **Image Styles** is a new Theme Settings → Components library (built on the shared `addable-box`,
  like Background Patterns), producing a `.imgs-{slug}` class pickable on any element via a shared
  `sc_image_style_field()` / `sc_image_style_class()` helper pair — the same pattern as Color, Box
  and Table presets. Phase 1 wires it into **media-image** and **posts**; the other Tier-1 elements
  follow.
- Each preset is a **bundle of CSS custom properties**, not a hardcoded rule. `.imgs-{slug}` sets
  `--imgs-radius / --imgs-filter / --imgs-clip / --imgs-mask / --imgs-scrim …`, and one shared
  `.imgs-wrap` base rule consumes them.
- The fields are **curated** (a handful of great masks, filters, a scrim); anything exotic is the
  element's existing **Custom CSS (Advanced)** escape hatch.
- **Duotone** ships as the blend-mode approach (a grayscale image + a `mix-blend-mode: color` tint
  layer driven by a colour preset) — not SVG `feColorMatrix`, which is left as a Custom-CSS upgrade.
- **Animated hover** (zoom / grayscale-on-hover) stays with the **Animation Engine Hover module** —
  deliberately not duplicated here.
- The 23 Card Styles keep rendering; the picker will be **grouped** (Layouts vs Decorated), never
  reduced, so no saved page breaks.

## Why

- **Composability beats fixed combos.** 15 layouts × N box presets × M image styles expresses far
  more than 23 frozen rows, with no redundancy — and the image treatment now benefits *every*
  image-bearing element, not just Posts (exactly how Box and Color presets already pay off).
- **Token bundles are robust *and* customizable at once.** One base rule is hard to break;
  custom properties inherit, so a preset is pure data; and a power user overrides a single
  variable in Custom CSS instead of fighting specificity. This is the design-token pattern the
  research kept pointing to as the flexible one.
- **Right tool per treatment.** Angular masks use `clip-path`; organic masks use a self-contained
  SVG `mask-image` data-URI (CSP-safe, no external request); filters are one non-destructive
  chain; the scrim is a positioned `::after` with `isolation: isolate` so blends don't leak.
- **Curated + escape hatch.** A curated set covers ~95% cleanly; the Custom CSS option absorbs the
  long tail, so the preset UI stays approachable without capping power users.
- **No migration risk.** The preset is brand-new and unused, and the consumed value is a flat
  `imgs-{slug}` string — trivial to read, nothing to migrate, and the Card Style picker only gets
  regrouped, never pruned.
