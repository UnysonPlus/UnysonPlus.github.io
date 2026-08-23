---
slug: option-mapping-registry-and-table
title: "How should the converter map ALL shortcode/theme-settings options — a detector per option?"
authors: [jon]
tags: [conversion, architecture]
date: 2026-08-23
description: Writing a bespoke detector per option doesn't scale. Options split into two kinds — preset-backed (value references a Theme Settings preset) and intrinsic scalars. Preset-backed options want ONE shared registration framework (capture → register a preset with a deterministic id → assign the option), which also bakes in the correct build ordering. Intrinsic options want ONE declarative source-signal → option table, so a new option is a row, not a function. The converter's own coverage reports rank what to add next; AI stays the last-resort tail.
---

**The question:** To map every shortcode and Theme-Settings option faithfully, does the deterministic converter need an individual detector per option — or is there a better, registration-style way to make all options map properly?

<!-- truncate -->

## Context

Each new option so far got its own hand-written detector (the accordion style/gap reader, the button-size algorithm, the gap snapper, the section padding distillation, …). That's dozens of bespoke functions, each re-discovering the same problems: where the signal lives (class vs computed), how to snap a measured value onto a scale, and — for preset-backed options — the build **ordering** (presets are assembled in the theme-settings pass, *after* the page is built). The box-preset bug (assigned boxes silently falling back to raw CSS because the lookup was empty during page build) was that ordering trap, hit again.

## The insight: options are two kinds, not one

**A. Preset-backed options** — the value references a Theme Settings preset: `background_pattern`, box preset / `border_preset`, color presets, section styles, button color/size, icon badges, text styles, the spacing/gap scale. You can't "detect" these into a scalar — the faithful mapping is *register a preset and point the option at it*.

**B. Intrinsic scalars** — the value is a direct property: alignment, margins, orientation, columns, corner radius, position, width mode. These are reads; there's nothing to register.

## Options considered

1. **A detector per option.** Maximum control, but O(N) bespoke functions, each re-solving signal-location + snapping + (for presets) ordering. Doesn't scale; it's how we got here.
2. **Hand everything to the local AI.** Non-deterministic; breaks the converter's reproducibility contract (see the "deterministic style classification" decision). Rejected as the primary.
3. **Two shared frameworks + a data-driven backlog.** Chosen.

## Decision

**Preset-backed options → one shared registration framework.** Capture the skin → `register_*()` returns a **deterministic id** (hash of the normalized skin) → the option is set to that id; the theme-settings pass emits the referenced presets. This is the pattern proven twice (Background Patterns, Box Presets). Generalizing it bakes in, once and for all:
- deterministic ids, so assignment and registration agree with no name/order coupling;
- the correct ordering (record during page build, emit during the theme-settings pass);
- reuse — any shortcode that wants a box/color/pattern/badge just registers and assigns.

**Intrinsic options → one declarative resolver over a spec table:** `{ source signal (CSS property or class pattern) → option key + value transform }`. Adding an option becomes adding a **row**, not a function; shared value-snappers (spacing scale, gap scale, radius buckets) are called by the table, not re-implemented per option.

**What to add next is data-driven.** The converter already emits `class-coverage.json` and `conversion-drops.json` — ranked lists of source signals it didn't map. Extend the registry/table by **frequency**, not by guessing. **AI stays the last-resort** for the genuinely ambiguous tail only.

## Why

A detector-per-option model makes coverage a function of how many functions someone hand-writes — unbounded and error-prone. Splitting on *how a value is expressed* (a preset reference vs a scalar) yields exactly two reusable mechanisms that cover the whole surface: registration handles everything preset-backed (and fixes the ordering class of bugs structurally), and a declarative table handles the scalars (turning "add an option" into "add a row"). The coverage reports turn the remaining work into a ranked backlog instead of a guessing game, and AI is reserved for the small ambiguous remainder where no measurable signal exists. Reproducibility — the converter's core contract — is preserved throughout, because both mechanisms are deterministic.

*Status: Accepted.*
