---
slug: gap-scale-mirrors-spacing-scale
title: "How should the spacing & gap scales handle modern mid-range and large gutters?"
authors: [jon]
tags: [spacing, conversion, architecture]
date: 2026-08-23
description: The gap scale stopped at slug 5 (3rem/48px) and both scales jumped 1.5rem→3rem with nothing between, so modern 32/40px steps and 64/80px gutters were unrepresentable — a converted `gap-16` (64px) snapped to 48px. We extended the gap scale to mirror the spacing scale (0–12), seeded the [32px]/[40px] mid-range in both, and taught the converter to emit exact `[NNpx]` arbitrary values against a dedicated gap scale — all additively, so existing slugs never change.
---

**The question:** UnysonPlus's spacing and gap scales inherit Bootstrap's `$spacers`. The gap scale caps at slug 5 (3rem/48px), and both scales jump straight from slug 4 (1.5rem/24px) to slug 5 (3rem/48px). Modern (Tailwind-era) layouts lean on the values *in between* (32px, 40px) and *above* (64px, 80px). How should the framework — and the Site Converter that maps real sites onto it — represent those?

<!-- truncate -->

## Context

The trigger was a fidelity bug in the Site Converter. Converting a hero whose grid used `gap-10 lg:gap-16` (40px mobile, 64px desktop) produced a **48px** gap — because:

- The **gap scale** stopped at slug 5 (48px), so 64px had nowhere to land and clamped.
- The converter's `gap_slug()` *snapped* to the nearest of `{4, 8, 16, 24, 48}`, so 40px → 48px too.
- Arbitrary `gap-[Npx]` tokens harvested from the source were being folded into the **spacing** scale, but the Section's Gap option reads the **gap** scale — so they never reached it.

The deeper issue is the **24px → 48px cliff** shared by both scales: `2rem` (32px) and `2.5rem` (40px) — the two steps modern designs use most for card/section padding and grid gaps — simply don't exist as named slugs.

The hard constraint: **you cannot renumber existing slugs.** Every built page, every converted site, and every theme preset references `.pt-11`, `.g-5`, `section--gap-5`, etc. Changing what a slug *means* silently breaks live content. So any fix has to be **purely additive**.

## Options considered

1. **Redefine the mid-range slugs** (make slug 5 = 2rem, shift the rest). Cleanest scale, but renumbers every existing reference — breaks all built/converted content. Rejected outright.
2. **Raise the gap cap only** (add 4rem, 5rem to the gap scale). Fixes 64/80px gutters but leaves the 32/40px cliff and the snap-to-48px behaviour. Half a fix.
3. **Extend the gap scale to mirror the spacing scale, seed the mid-range as bracketed arbitrary steps in both scales, and give the converter a dedicated gap scale with exact `[NNpx]` output.** Chosen.

## Decision

A four-part, entirely additive change:

1. **The gap scale now mirrors the spacing scale** — slugs 0–12 (0…8rem). `g-{slug}` ≡ `p-{slug}` mentally, and 56/64/72/80/96/112/128px gutters become expressible. Slugs 0–5 are byte-for-byte unchanged.
2. **The `[32px]` / `[40px]` mid-range is seeded into *both* scale defaults.** Bracket-named so they read as exact lengths in the dropdown. The gap generator and the Section view both sanitise `[32px]` → `.section--gap-32px`; on the spacing side the bracketed entries render on demand through the per-page arbitrary-spacing handler (`.pt-[32px]`).
3. **The Site Converter gained a dedicated `build_gap_scale()`** (parallel to `build_spacing_scale()`) that emits the extended base and appends any genuinely off-scale gutter the source uses — a `gap-[20px]` class or a computed `gap:Npx` — as an exact `[NNpx]` entry. Gap tokens no longer pollute the spacing scale.
4. **`gap_slug()` now resolves exactly** — an on-scale value returns the clean slug (`gap-16` = 64px → `7`), an off-scale value returns a lossless `[NNpx]` slug that `build_gap_scale()` has registered a preset for. No more snapping.

The PHP (`Stitch`/`Mapper`) and JS (`to-theme-settings`/`to-pages`) paths carry identical scales and logic.

## Why

The scale's job is to encode a design system's *intent* as a small, named, editable vocabulary. Bootstrap's `$spacers` encodes a 2013-era intent; modern component design leans on a denser mid-range and larger section gutters. Because slug **numbers are a public contract**, the only safe way to modernise is additively: keep 0–12 stable, mirror them across both scales so the mental model is one scale not two, and express everything off-scale as lossless bracketed arbitraries — the same mechanism the converter already used for spacing. The converter change is what makes it faithful: a real site's exact gutter is reproduced, not rounded to the nearest legacy step.

Deliberately **not** done: redefining the gap cap philosophy as "gaps over 3rem are section spacing." In practice hero and feature grids routinely use 64–80px column gaps; treating those as un-representable was the bug, not a feature.

*Status: Accepted.*
