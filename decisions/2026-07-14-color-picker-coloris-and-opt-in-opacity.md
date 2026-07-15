---
slug: color-picker-coloris-and-opt-in-opacity
title: "Why the color picker moved to Coloris, and why opacity is opt-in"
authors: [jon]
tags: [option-types, color]
date: 2026-07-14
description: We swapped the color picker from WordPress's Iris to Coloris so the whole brand palette shows as a clickable grid — and made opacity a per-option flag rather than turning it on everywhere.
---

**The question:** Now that we want every color control to show all the Color Presets as clickable
swatches, can we keep using WordPress's built-in Iris picker? And should opacity just be on
everywhere?

<!-- truncate -->

## Context

Iris (WordPress's Automattic picker) hard-codes its palette as a **single absolutely-positioned row**,
splitting the available width evenly by count. With ~26 brand presets, each swatch collapses to a
~3px sliver — technically "all shown", but unusable. Every attempt to wrap Iris's palette into a grid
fought its internals; a proven test showed real mouse clicks on the wrapped swatches were swallowed by
an overlapping element. That is a dead end worth abandoning.

## Options considered

- **Keep fighting Iris's layout** — fragile; swatches ended up unclickable.
- **Coloris** (modern, vanilla, MIT, ~10KB) — binds to a text input like Iris, so the value stays a
  plain string, and its swatches wrap into a grid natively.
- **Pickr / Spectrum** — good, but Pickr needs more wiring and Spectrum is poorly maintained.

## Decision

**Coloris**, bundled locally, replacing Iris across the whole `color-picker` option type (and the
`rgba-color-picker`, which now shares the same engine). Every color control shows the full brand
palette as a clickable grid.

## On opacity: opt-in, not on-by-default

Coloris can do an alpha slider, but we made it a **per-option flag** (`'alpha' => true`, default off):

- The plain `color-picker` stores a **6-digit hex**, and many consumers (CSS output, JS hex→RGB in
  glows / WebGL, presets) assume that. Forcing 8-digit `#rrggbbaa` everywhere would break them.
- Text colors are solid; opacity only makes sense for backgrounds, overlays, borders and glows.

So opacity is available where it helps, and off (fully backward-compatible) everywhere else.

## Why it took real click-testing

The lesson that stuck: a swatch grid that *looks* right but silently doesn't register clicks is
worse than no grid. Every step here was verified by actually clicking a swatch and confirming the
value changed — the check that had been missed on the earlier Iris grid attempt.
