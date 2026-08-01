---
slug: arbitrary-spacing-values-over-renumber
title: "Exact spacing capture: arbitrary values (pt-[40px]) instead of renumbering the scale to Tailwind"
authors: [jon]
tags: [architecture, conversion, back-compat]
date: 2026-08-02
description: "The spacing scale is Bootstrap-aligned (0-5 match Bootstrap on purpose) and can't express values like 40px, so the Site Converter snapped captured padding with up to 12px of error. We considered renumbering the whole scale to Tailwind numbering, but it proved breaking on every front (migration surface, Bootstrap collision, divergence from the BS5 foundation). Instead we kept the scale untouched and added Tailwind-style ARBITRARY values (pt-[40px]) rendered by per-page dynamic CSS — non-breaking and more precise."
---

**The question:** the spacing scale (`unysonplus_default_spacing_scale()`) has no `32px` or `40px`
step — the range 24→48px is one gap — so the Site Converter, which snaps a source's captured padding
to the nearest slug, rendered e.g. a `40px` bottom padding as `48px` (up to 12px error). Should we
**renumber the whole scale to Tailwind numbering** (`pt-8`=32px, `pt-10`=40px…) to fill the gap, or
**keep the scale and add arbitrary values** (`pt-[40px]`)?

<!-- truncate -->

## Context

UnysonPlus is a **Bootstrap-5 framework**. The scale's `0–5` slugs deliberately equal Bootstrap's
`$spacers` (`pt-5`=48px in both), and it generates its own `.pt-N` utilities from that scale. The
`6–12` tail is a house extension. The gap surfaced converting real sites (a Wegic cupcake site whose
CTA uses `pb-10`=40px), and it kept demos reaching for scoped CSS instead of the native option.

We prototyped **both** approaches in a throwaway clone of the marketing site (`localhost/spacetest`).

## Options considered

- **Renumber the scale to Tailwind (slug = px ÷ 4).** Gains recognizable names and fills the gap, but
  every probe surfaced more breakage. It needs a one-time migration rewriting **three** stores — the
  saved `spacing_scale`/`gap_scale` presets (a saved override shadows the PHP default), the per-post
  builder JSON, and the site-wide `default_gap` trio (which the row gutter pulls via `--gap-N`). It
  **diverges from Bootstrap**: `pt-5` becomes 20px, so pasted Bootstrap markup silently mis-renders.
  And it revealed a two-read-path trap (the CSS getter and the admin field read the scale from
  different stores). Each issue is fixable, but collectively the surface area is large — for *naming*.
- **Keep the scale, add arbitrary values (`pt-[40px]`, `mb-md-[3.5rem]`).** A spacing option may hold
  an arbitrary token; the per-page dynamic CSS emits a matching escaped rule
  (`.pt-\[40px\]{padding-top:40px}`), breakpoint-aware. `sc_sanitize_class()` preserves only the strict
  arbitrary pattern (no XSS surface). Non-breaking — scale, containers, gutters, Bootstrap alignment,
  every existing `pt-N` untouched — and **more precise than the renumber** (any exact value, not just
  Tailwind's discrete steps). Contained to three files. The converter emits a preset slug when the
  captured px lands on the scale, else an exact `pt-[Npx]`.

## Decision

**Keep the Bootstrap-aligned scale exactly as-is and add arbitrary spacing values.** The converter now
captures spacing losslessly (proven by the browser-free `tailwind-matrix` fixture: all 35 Tailwind
steps round-trip exactly), and the pinky-bites CTA takes a true `pb-[40px]` (was 48px).

## Why

The renumber's only real benefit over arbitrary values was Tailwind-recognizable *names* — and for a
Bootstrap framework, Bootstrap-aligned names are the more coherent identity, not less. Arbitrary values
solve the actual problem (exact capture) with zero migration and zero divergence, so the naming-only
upside never justified the breakage. The clone-site trial was decisive: it caught the saved-scale
shadow, the `default_gap` gutter dependency, and the two-read-path trap that would each have silently
broken production had the renumber shipped straight to `localhost/`.

**Status: Accepted.** Follow-up: a "Custom…" branch on the spacing field (Phase 2) so custom values are
editable in the builder — converter-set values already render without it.
