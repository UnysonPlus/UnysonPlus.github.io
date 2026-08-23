---
slug: button-size-clustering-algorithm
title: "How should the Site Converter derive Button Size presets from a source's buttons?"
authors: [jon]
tags: [conversion, shortcodes, architecture]
date: 2026-08-23
description: "The converter turns a source site's buttons into a small set of reusable Button Size presets (.btn-lg / .btn-md / …). The naïve version deduped by exact computed values, kept only the top 3 by font-size, and re-matched each button by tolerance — which dropped sizes, mis-ranked them, and left buttons unassigned (rendering as the thin .btn base). We moved to a cluster → rank-by-visual-size → frequency-aware-name pipeline, with a fixed-height→Min-Height mapping and a closest-match fallback."
---

**The question:** A source page has N buttons with slightly different measured skins. How do we distil them into a clean, faithful set of reusable **Button Size presets** (`.btn-lg`, `.btn-md`, …) that every button can be assigned to?

<!-- truncate -->

## Context

The Site Converter derives Theme Settings from the source. For buttons it emits **colour presets** and **size presets**; each converted button then references a size class (`btn btn-primary btn-lg`). The size preset carries font-size, line-height, padding-x/y, radius and (new) **min-height**.

The first implementation:
1. Deduped button skins by **exact** `fontSize|px|py|radius`.
2. Sorted by **font-size** descending.
3. Kept the **top 3** → named Large / Medium / Small.
4. At map time, re-matched each button to a preset by tolerance (`fs ±1, py ±3, px ±4`).

Three failures showed up on a real site (modfii, 4 distinct button sizes):

- **Dropped sizes.** The top-3 cap discarded the 4th size. A button whose size was dropped matched nothing → **no `.btn-{slug}` class → the thin `.btn` base** (the "button stays thin" bug).
- **Noise as duplicates.** Computed values are noisy (`43.99` vs `44px`, `31.98` vs `32px`), so one design became several near-identical presets, bloating the list and burning the top-3 budget.
- **Mis-ranking.** Sorting by font-size alone put a `14px / h-11 (44px)` button *below* a `16px / h-9 (36px)` one, even though it's physically taller.
- **Fixed height lost.** A source `h-11` (44px, zero vertical padding, flex-centred) was approximated as a guessed Padding-Y instead of a real height.

## Options considered

1. **Just raise the cap + relax tolerances.** Keeps the fragile re-match; noise still sprawls; ranking still wrong. Rejected — treats symptoms.
2. **One preset per exact size, no cap.** Fixes dropping but explodes the list on noisy sites (5–6 near-dupes). Rejected.
3. **Cluster → rank-by-visual → frequency-name, keep all clusters, closest-match fallback.** Chosen.

## Decision

A four-part pipeline, identical in the PHP (`build_button_presets`) and JS (`deriveButtonPresets`) paths:

1. **Cluster** near-identical skins within a tolerance (fs ±1, px/py/height ±3). The representative value per property is the **mode** (most-common exact value in the cluster), so preset numbers stay clean (`44px`, not `43.99px`). This collapses computed noise into one preset per real design.
2. **Rank by visual size** — `max(fixedHeight, fontBox + 2·paddingY)` — the height a reader actually perceives. Ties (same height, different font) break by **font-size**, then by **frequency**.
3. **Frequency-aware naming** — the most-used cluster is tagged the base **"(Default)"**, and it wins ranking ties, so the dominant CTA size reads as the primary.
4. **Fixed height → Min Height** — a source sized by `h-11` populates the preset's new **Min Height** field (the button centres content via inline-flex), the exact reproduction instead of guessed padding.

Plus a **closest-match fallback** at assignment: if a button doesn't match a preset exactly, it takes the nearest (weighted to font-size). A real button is **never** left unassigned/thin.

## Why

Clustering is the key insight: the source's *intent* is a handful of button sizes, but its *computed output* is dozens of noisy measurements. Deduping on exact values confuses noise for design; clustering with a mode representative recovers the intent. Ranking by **visual size** (not font) matches how a human names Large/Medium/Small. Keeping **every** cluster + a **closest-match fallback** guarantees no button falls through to the unstyled base — the failure mode that caused the recurring "button stays thin" reports. And a dedicated **Min Height** option means a fixed-height button is reproduced exactly rather than approximated.

Deferred: **responsive size layers** (a button that changes size at breakpoints, `h-10 md:h-11`). That needs the size-preset option itself to become responsive (base/md/lg) plus media-query CSS generation — a separate feature, not a derivation change. The converter currently reproduces the desktop size.

*Status: Accepted.*
