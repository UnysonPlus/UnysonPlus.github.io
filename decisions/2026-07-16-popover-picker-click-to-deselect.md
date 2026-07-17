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

## Update — retiring the redundant None tiles

Once deselect landed, the visible `None` tile became redundant clutter in the popover image-pickers. The key
caution: `none`/`off` is *also* the default value, the picker's `value`, the reveal-map key, and every
consumer's off-check — so it must **not** actually leave the code. "Removing the choice" only ever meant
removing the **tile**, while keeping `none`/`off` as the referenced off-sentinel.

Auditing first paid off: of the popover effect pickers, only **four** (Background Effect, Physics, Scroll
Motion, Text Effects) plus the Background Pattern picker actually rendered an explicit `None`/`off` *tile*
(a literal `'none' => $helper(...)` choice). The other seven (Confetti, Marquee, Motion Path, Parallax,
Scroll Reveal, Scroll Text Highlight, Scrollytelling) build their tiles from a loop whose source has **no**
`none`/`off` entry — they never had a None tile; `none`/`off` there is purely the sentinel. Deleting it would
have *broken* the off-state, so those were left alone.

For the five that did have a tile, the tile choice was deleted (and the value dropped from the picker's
"ungrouped" list), relying on the image-picker's standard **off-tile** (a 1×1 transparent value-holder the
option type emits for a value with no matching choice) to carry the `none` default.

## Correction — the delete broke it; hide, don't delete

That off-tile assumption was wrong, and it shipped a real bug: on a **new Section**, changing *any* option
silently set the Background Pattern to the first tile ("Dots"). Root cause: the off-tile is only a *synthetic*
value-holder emitted under specific conditions, so through the options modal's collect / re-render / lazy-tab
cycles the popover `<select>` couldn't reliably hold `none` — and a `<select>` with no selected option falls
back to its **first** `<option>`, which any save then persists. `none` deleted-as-a-choice was exactly the
"not orphaned" risk: it isn't just a sentinel value, it's the only thing that lets the control *represent*
"nothing selected" as a real, always-present option.

So the five pickers were reverted to **keep `none`/`off` as a real choice** and **hide its tile in JS**
(walk the image-picker library's own option objects, hide any `none`/`off` tile in a popover context). Same
visible result the user wanted — no redundant None tile, 12 pattern tiles, deselect still clears to `none` —
but now the value model is robust because `none` is a genuine, valid, always-present choice rather than a
conditional synthetic tile. The lesson: a "redundant" tile that's also the default/off state is load-bearing;
hide it, don't delete it.
