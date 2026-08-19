---
slug: stage-typography-v3-then-promote
title: "Why the typography overhaul is staged as \"v3\", then promoted to canonical"
authors: [jon]
tags: [option-types, architecture, naming, back-compat]
date: 2026-08-20
description: 'A big typography overhaul risks every live site if it lands in place. We build it as a separate typography-v3 surface so the running typography control is never at risk, verify it, then promote v3 to the canonical name and retire the old one — the same move used when v2 was promoted to v1. "v3" is a staging name, not a permanent versioned control, so the namespace stays clean long-term.'
---

**The question:** A typography overhaul this large can't safely be edited in place on the live control.
How do we build and prove it without risking every site, and without leaving a messy `v1 / v2 / v3`
option-type namespace behind?

<!-- truncate -->

## Context

Typography settings drive every site's rendered type. The overhaul (fluid scale engine, new Type Scale
UI, role tokens, font pipeline) changes how sizes are authored and emitted. We had just promoted the
former `typography-v2` control to be the canonical `typography` — so we already had a pattern for
"prove a new control, then make it the default."

## Options considered

- **Edit the canonical control in place.** Fewest moving parts, but any regression hits all 13+ installs
  immediately, and there's no clean rollback while iterating.
- **Build a permanent parallel `typography-v3` and keep all three.** Safe to iterate, but leaves the
  namespace cluttered with versioned controls forever.
- **Stage as `typography-v3`, then promote it to canonical (chosen).** Iterate in isolation, verify, then
  rename v3 → the canonical `typography` and retire the old one — exactly the v2→v1 move.

## Decision

Develop the overhaul as an isolated **`typography-v3`** surface. Once verified across installs and the
converted test sites, **promote it to the canonical `typography`** and demote the current control to a
compatibility shim. "v3" is a **staging label**, not a permanent versioned control.

## Why

- **Zero blast radius while building.** The live control keeps running untouched, so iteration can't break
  a production site; rollback is just "don't promote."
- **Non-destructive by construction.** V3 emits into the same CSS custom properties (`--h1-font-size`
  etc.), so when it becomes canonical, built pages don't notice the swap; saved values fold forward.
- **A clean long-term namespace.** Because the destination is the canonical name — not a permanent
  `v3` — we don't accumulate versioned controls. The number is scaffolding that disappears on promotion.
- **A proven pattern.** This is the same staged promotion used for v2→v1, so the workflow and its
  guarantees are already understood.

## Status

**Superseded.** The dedicated `typography-v3` *option type* was built as a composite (fonts + the scale
in one control) and then removed: a single control bundling the whole scale read as bulky and confusing,
and it duplicated what the General → Typography tab already does. The correct home for the fluid scale is
a **group of ordinary options on the Typography tab** (the Phase 2 "Type Scale" group), not a bespoke
option type. So there is no v3 control to promote — the fluid engine (Phases 0–1), the tab controls
(Phase 2), the font-CLS layer (Phase 3) and the role/`theme.json` work (Phase 4) all stay; only the
option-type packaging was dropped. The lesson kept: reach for a new option *type* only when a control is
genuinely reusable across many contexts — not to bundle one tab's settings.
