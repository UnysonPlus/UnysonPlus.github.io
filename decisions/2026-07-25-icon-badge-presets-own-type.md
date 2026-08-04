---
slug: icon-badge-presets-own-type
title: "Why Icon Badges get their own preset type, not a fold into Box or Image Styles"
authors: [jon]
tags: [option-types, shortcodes, architecture]
date: 2026-07-25
description: The icon_box already has a per-element Icon Badge control (shape + color) but no way to reuse a badge look across a site. We're adding an Icon Badge preset — as its own Components tab modeled on Box Presets — rather than reusing Box Presets or Image Styles, because a badge bundles icon-specific concerns (a shaped tile plus a centered, colored glyph) that neither cleanly models.
---

**The question:** Should we add an "Icon Badge preset" like Box Presets — a reusable, globally-editable
badge style for icons in Theme Settings?

<!-- truncate -->

## Context

The `icon_box` shortcode already ships a full **Icon Badge** control: a shape (solid/outline variants —
circle, squircle, hexagon, ring), an Icon Badge Color, and a Background Color, all palette-linked. So
badges aren't new — what's missing is **reuse**. Today a feature grid with 6–12 icon boxes sets the same
"pink circle + white icon" badge 6–12 times, and there's no single lever to restyle them all.

That's the exact relationship **Box Presets** have to per-column box styling: you *could* set
border/radius/shadow on every column by hand, but the preset lets you define once, apply by picking it,
and change globally. An Icon Badge preset is that same move for icons.

## Options considered

| Option | Trade-off |
|---|---|
| **Leave it per-element** (status quo) | Zero new surface, but no reuse — repeated badges are hand-set and can't be restyled site-wide. |
| **Fold into Box Presets** | A badge IS a small box, but Box Presets are content-fit card skins with no fixed size, no shape beyond radius (squircle/hexagon/ring need clip-path), and no notion of a centered glyph with its own colour/size. Reusing it would be awkward and pollute the box type. |
| **Fold into Image Styles** | Image Styles target `<img>` treatments (crop/radius/mask). A font/SVG glyph in a shaped tile isn't an image. |
| **A dedicated Icon Badge preset type** | Its own tab; models exactly what a badge is. Slightly more surface (a 10th Components tab), but the clean fit. |

## Decision

Add **Icon Badge presets** as their **own Components tab** (order: Buttons → **Icon Badges** → Box
Presets), modeled on Box Presets for parity: a bespoke option type with **Default/Hover state tabs** and a
**live preview**. Fields = the whole Box-Preset set (background fill, border, corner radius, padding,
box-shadow, transition, hover FX, Default/Hover states) **plus** the icon-specific ones: **Badge Size**,
**Badge Shape** (reusing the shapes the `icon_box` badge already ships, for squircle/hexagon/ring beyond
radius), **Icon Color**, and **Icon Size**. Each preset emits a `.iconb-{slug}` class (matching the
`.boxp-` / `.imgs-` / `.tbl-` convention), pickable on `icon_box` (Styling → Icon Badge Preset) and other
icon-bearing elements.

## Why

A badge bundles **icon-specific concerns** the other preset types don't model — a *shaped tile* (circle,
squircle, hexagon, or an outline ring — not just a border-radius) wrapping a *centered glyph* with its own
colour and size, which can change on hover. Box Presets are card skins; Image Styles are `<img>`
treatments; neither expresses that cleanly, so folding would either distort those types or produce an
awkward badge. A focused type is more ergonomic and keeps each preset type coherent.

It also **generalizes an already-shipped control** rather than inventing a paradigm — the per-element
Icon Badge becomes reusable, exactly as Box Presets generalized per-column box styling. And it's a natural
**converter target**: since the Site Converter is being taught to cluster-and-emit presets, repeated badge
treatments become another clusterable `.iconb-{slug}` type alongside Box/Section/Image.

The one real cost is surface — a 10th Components tab — but the same was true of Box and Table presets, and
they earn their place on the layouts that use them. Icon-heavy sites (features, services, SaaS) are
exactly where badges repeat, so the reuse pays off there.

Status: **Accepted** — building it modeled on the `border-presets` pipeline.
