---
slug: preset-colors-live-linked-vs-frozen-hex
title: "Preset colors: why we keep the reference picker instead of a frozen hex"
authors: [jon]
tags: [color, architecture]
date: 2026-07-15
description: The basic color picker now shows the Color Presets as swatches — so do we still need the preset picker in Theme Settings? Yes, because one stores a live link to the palette and the other freezes a hex.
---

**The question:** Now that the basic `color-picker` shows the Color Presets as swatches, should we
just use it for every color in Theme Settings and drop the preset picker? Those colors go into the
dynamic stylesheet, not classes, anyway — so what's the preset picker even for?

<!-- truncate -->

## The premise is right, but points at the wrong distinction

It's true that Theme Settings colors emit CSS values, not classes. But the preset picker isn't about
classes — its value resolves to **`var(--color-{slug})`**, which keeps the color **live-linked to the
palette**. That is the real difference.

| | Basic `color-picker` (with preset swatches) | Preset picker (`predefined-colors-color-picker`) |
|---|---|---|
| Clicking a preset stores | the **frozen hex** (`#0d6efd`) | a **reference** → emits `var(--color-primary)` |
| Retune "Primary" later | ❌ stays the old hex | ✅ every color using it updates automatically |
| Emits a class? | no | no — in Theme Settings it emits `var()`, not a class |

## Decision

**Keep the preset picker** for palette-tied Theme Settings colors (menu, buttons, links, headings,
section styles). Use the basic `color-picker` only where a genuine one-off, frozen color is fine.

## Why

Live-linking is the entire point of Color Presets: *retune your brand once, the whole site follows.*
The basic picker's swatches are a **convenience** — quick access to brand colors — but they flatten
to a frozen hex. Swap the palette-tied colors to it and picking "Primary" freezes today's blue; a
rebrand to green next month leaves a trail of stale hexes to hunt down. That quietly kills the
feature.

## The unifying option (for later)

If we ever want a single control everywhere, the clean path is to make the basic picker's **swatches
store the preset reference** (the slug → `var(--color-slug)`) instead of the resolved hex — a custom
swatch handler. That would *add* live-linking to the basic picker, not drop the preset picker for a
frozen hex. A bounded future refactor, not something forced by the swatch change.
