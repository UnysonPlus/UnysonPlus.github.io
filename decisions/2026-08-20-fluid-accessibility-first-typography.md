---
slug: fluid-accessibility-first-typography
title: "Why theme typography went fluid and accessibility-first"
authors: [jon]
tags: [option-types, architecture, accessibility, performance]
date: 2026-08-20
description: 'The theme sized type with one desktop value per element plus a single mobile step-down at 768px, which left tablets on desktop sizes, jumped at the boundary, and skipped any non-px unit. After researching current practice (WordPress core theme.json, Utopia, Material, the CLS literature), we moved typography to fluid clamp() built on a modular scale — with the WCAG-200%-zoom constraint (rem + vw, never vw alone) designed in from the start rather than bolted on.'
---

**The question:** How should the theme handle responsive typography long-term — keep stepping sizes at
a breakpoint, add per-device controls to every field, or move to a fluid type system? And what has to
be true for a fluid system to not fail accessibility?

<!-- truncate -->

## Context

Type was stored as a single desktop value per role (body, h1–h6) and made "responsive" by one generated
`@media (max-width: 767.98px)` block that scaled each size by a tiered percentage. Converting a source
site surfaced the failure modes: tablets (≥768px) rendered full desktop sizes, the boundary was a visible
jump, small phones still overflowed (one fixed value below 768px), and any size stored as `rem`/`em`
skipped the px-only scaler entirely.

## Options considered

- **Keep the stepped model, add more breakpoints.** Familiar, but every breakpoint is still a jump, and
  it multiplies the values to maintain.
- **Add Phone/Tablet/Desktop controls to every typography field.** Maximum control, but triples an
  already-dense tab, still only changes at breakpoints, and most users won't fill three values — so the
  defaults must be good regardless.
- **Fluid `clamp()` on a modular scale (chosen).** One authored value scales smoothly across every
  viewport. Matches where the ecosystem has landed: WordPress core (`theme.json` `fluid: true`), Utopia,
  Material's role/token scale.

## Decision

Move typography to **fluid `clamp()` built on a modular type-scale engine**, with per-device controls
kept only as an optional override, and the **WCAG 1.4.4 (resize to 200%) constraint designed in**: every
generated clamp uses a `rem + vw` preferred value and a rem-anchored max — never `vw` alone. A tiered
mobile floor and a body minimum keep small sizes readable, and a guardrail flags over-steep curves.

## Why

- **A `vw`-only clamp breaks browser zoom.** Viewport units don't change when the user zooms, so a
  vw-based size stays visually fixed at 200% zoom — a direct WCAG 1.4.4 failure. Anchoring both the
  preferred value and the max in `rem` means zoom (and the user's font-size preference) still scale the
  text. This is the single constraint that dictated the whole implementation; bolting fluid on without it
  is the trap most implementations fall into.
- **Fluid removes the real defects.** Smooth scaling covers tablets (no more desktop-on-tablet), erases
  the breakpoint jump, and stops small-phone overflow — the exact problems the stepped model caused.
- **A scale beats per-element hand-tuning.** A base size × a ratio yields a coherent set of steps that
  elements reference, so the whole system stays consistent instead of drifting per heading.
- **It's the interoperable baseline.** WordPress core already ships this model; aligning lets the block
  editor and the builder agree, and keeps us on the same footing as the major themes/builders.
- **The overhaul is the moment to fix font CLS too.** Owning how type and fonts are declared let us add
  `font-display: swap` (already present) plus metric-matched fallback `@font-face` rules, so the web-font
  swap doesn't shift layout.

## Status

Accepted — shipped as Phases 0–4 (fluid clamp foundation, scale engine, authored Type Scale UI, semantic
roles + `theme.json` fluid + fallback metrics). Per-device per-role overrides and the dedicated authored
control follow with the v3 option type.
