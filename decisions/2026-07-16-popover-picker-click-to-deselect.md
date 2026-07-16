---
slug: popover-picker-click-to-deselect
title: "Why popover pickers deselect on click-again instead of needing a 'None' tile"
authors: [jon]
tags: [option-types, back-compat]
date: 2026-07-16
description: A popover image-picker (Background Effect, Cursor, Background Pattern, …) had no way to un-set a choice once picked — some pickers shipped a 'None' tile, others didn't, so the ability to clear was inconsistent. Rather than mandate a 'None' choice on every picker, we made the shared popover deselect the active tile when it's clicked again, clearing to the picker's own none/off choice when it has one so no consumer changes are needed.
---

**The question:** On the Background Effect popover you can pick an effect but never un-pick it — once a tile
is selected there's no way back to "off". Do we bolt a `None` tile onto every popover picker, or make the
popover itself let you select *and* deselect a choice?

<!-- truncate -->

## Context

The popover pickers (Animation Engine's Background Effect, Cursor, Hover, Text Effects, Page Transitions, plus
the Section/Container **Background Pattern**) are all image-picker multi-pickers. The image-picker is
radio-style: one tile is always selected, and re-clicking the active tile is a no-op. So the only way to reach
an "off" state was a dedicated `None` tile — and that was applied inconsistently: Backgrounds, Confetti,
Flip Card, Hover, Text Effects ship a `none`/`off` choice, while **Cursor deliberately strips it**
(`unset( $choices['none'] )`) and a few others (Page Transitions, Preloader, Scroll Progress) never had one.
Wherever the tile was missing, the picker was a one-way door.

The image-picker library actually *does* support click-to-deselect — but only when the `<select>` carries an
*implicit blank* option, which our pickers don't emit. So the capability was there, just never wired up.

## Options considered

- **Add a `None` tile to every picker.** Uniform, but easy to forget on the next new picker, clutters each
  tile grid with a blank square, and is exactly the per-picker boilerplate we keep re-litigating.
- **Native click-again-to-deselect in the shared popover layer.** One change in `multi-picker.js` fixes
  every popover picker at once — current and future. Matches the universal UI expectation (colour swatches,
  toggle buttons, filter chips all deselect on re-click).

## Decision

**Click-again-to-deselect, in the shared popover.** A capture-phase click handler on the popover's
image-picker detects a re-click of the already-active tile and clears the selection, then resyncs the tile UI
and the revealed sub-options (`chooseGroup('')` already hides them).

The back-compat-critical detail: **clearing prefers the picker's own `none`/`off` choice when it has one**, and
only falls back to `''` for pickers without one. So a picker that already handles a `none` sentinel (almost all
of them) gets deselect for **zero** downstream changes — the stored value is the same sentinel its renderer
already understands. The handful without one emit `''`, which their renderers already treat as "no effect"
(`! array_key_exists( $style, … )` bails, `! empty()` guards fall back to a default). No migration, no value
shape change.

## Why

The real defect wasn't a missing tile — it was that "how do you clear this control?" had a different answer per
picker. Fixing it once in the shared layer makes the behaviour consistent and free for every future picker,
and matches what people already expect from a re-click. Clearing to the existing sentinel (rather than a new
empty value) is what keeps the blast radius to a single JS file: consumers never learn a new "cleared" shape,
they keep seeing the `none`/`off` they were already written for. The redundant `None` tiles can stay as
harmless back-compat and be retired later — the important thing is you can now always get back to off.
