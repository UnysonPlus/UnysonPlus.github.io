---
slug: option-type-docs-index-plus-selective-deep-dives
title: "Why option-type docs are one index + a dozen deep-dives, not 52 stubs"
authors: [jon]
tags: [option-types, documentation, architecture]
date: 2026-07-18
description: The framework has 52 option types and every one of our recurring bugs traces to a contract that isn't visible from the code — a saved value shape, a hidden whitelist, an alias. Rather than drop an AGENTS.md in all 52 folders (busywork that goes stale) or leave it undocumented, we settled on a two-tier scheme — one root index mapping all 52, plus deep-dive AGENTS.md only for the gotcha-prone ~dozen — and standardized the filename on AGENTS.md so it matches the "read the nearest AGENTS.md" rule.
---

**The question:** Would it help to add a markdown file to each option-type folder in
`framework/includes/option-types`?

<!-- truncate -->

## Context

The framework ships **52 option types** and only 4 folders had any docs (in two different naming
conventions). Meanwhile nearly every option-type bug we hit is the same shape: a **contract that
isn't visible from the code signature**. Recent examples, all from real sessions:

- `multi-inline` renders children from a **hardcoded whitelist** in `view.php`; a child type it
  doesn't know saves fine but draws a **blank row, no error**. And captions come from `$cfg['title']`,
  not `'label'`. Both cost a full round-trip to rediscover.
- `predefined-colors-color-picker-compact` saves `{ predefined, custom }`, **not** a hex string.
- `typography` is canonical; `typography-v2` is a thin alias. `unit-input` submits a JSON string that
  `_get_value_from_input` decodes. `icon-v2` needs its pack enqueued before render.

None of that is guessable from `get_type()`. It's exactly what a short doc-next-to-the-code fixes.

## Options considered

| Option | Trade-off |
|---|---|
| **Leave it undocumented** | Zero effort, but we keep paying the same rediscovery tax, and the `multi-picker` CLAUDE.md section already proves we resort to documenting the worst offenders anyway. |
| **An `AGENTS.md` in all 52 folders** | Uniform, but ~40 of them are trivial (`switch`, `text`, `slider`) so most files would restate the obvious. Stubs train people to ignore the folder, and 52 files decay 52 ways. |
| **Two tiers: one index + selective deep-dives** | One root file maps all 52 (the thing you read first); deep-dives exist only where the contract bites. Highest signal, least rot. |

## Decision

**Two tiers, and standardize the filename on `AGENTS.md`.**

- **Tier 1 — one root `option-types/AGENTS.md` index.** A table of all 52: purpose, **saved value
  shape**, aliases, and a 📖/⚠ marker pointing to the deep-dive. This is the map — it's what would
  have said "multi-inline routes children through a whitelist" up front.
- **Tier 2 — a deep-dive `AGENTS.md` only for the gotcha-prone ~dozen** (`multi-inline`, `typography`,
  `color-picker`, `rgba-color-picker`, `icon-v2`, `predefined-colors-color-picker-compact`,
  `unit-input`, plus the pre-existing `multi-picker`, `background-pro`, `spacing`). Each follows one
  template: **What it is · Saved value shape · How to consume · Gotchas · Canonical snippet.**
- **Naming:** `AGENTS.md` for agent-facing contract docs (matches the existing *"read the `AGENTS.md`
  nearest the code before editing"* rule). A genuine human maintenance note stays `README.md` — e.g.
  `icon/README.md` is a "how to regenerate the icon data" procedure, not a usage contract, so it was
  left as-is.

Two rules keep them alive: **document the contract, not the code** (a prose restatement of the PHP is
what drifts), and the **cross-cutting rules stay in CLAUDE.md** — the folder docs are the local
deep-dive and link back, so the two never disagree.

## Why

A doc's value is the delta between what the code shows and what you need to know. For a `switch` that
delta is ~zero; for `multi-inline` it's a whole afternoon. Spending equal words on both is what makes
doc folders rot. The index covers the cheap 80% in one maintainable file, and the deep-dives spend
real words only where the contract has already drawn blood — which, not coincidentally, is the set we
kept re-learning the hard way.

Status: **Accepted.** Root index + 10 folder deep-dives written; new deep-dives added when a type's
contract bites, not preemptively.
