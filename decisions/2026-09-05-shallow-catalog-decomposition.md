---
slug: shallow-catalog-decomposition
title: "Decomposing a deep catalog into native elements: shallow band-sections, not a faithful recursive tree"
authors: [jon]
tags: [conversion, architecture]
date: 2026-09-05
description: "A converted menu (jukeboxburgers.com's tabbed #menu) is a deep catalog — colour-banded category grids of {name, description, price} cards, ~7 nesting levels. The goal was to STOP shipping it as one opaque code block and decompose it into real, editable builder elements. A faithful recursive decomposer produced the right 464-node tree but wouldn't render: the page-builder's structure corrector flattens flexbox nesting past ~2 levels, so the intermediate bands/grids/cards were dropped. The decision is a SHALLOW-mapping decomposer that respects that limit — each band becomes a top-level Section (carrying its fill + padding), holding a heading and a grid flexbox of card flexboxes (exactly 2 flexbox levels), with colours on the NATIVE background option because custom_css silently voids on a comma-bearing rgb()/hsl(). Deep verbatim code blocks stay the fallback for genuinely irregular content."
---

**The question:** A converted section is a **deep catalog** — jukeboxburgers.com's `#menu`: colour-banded categories (APPETIZERS on white, CLASSIC BURGERS on near-black, CHAPLIN on red), each a grid of `{name, description, price}` cards, about **seven levels deep**. It was shipping as one opaque `.sc-tw` **code block** (faithful pixels, zero editability). How should the deterministic converter turn it into **real, editable builder elements** — and how far can that go?

<!-- truncate -->

## Context

We had just proven a **faithful recursive decomposer** on the reel *marquee* (shallow: a row of video cards), so the plan was to point it at the menu. It ran and produced the right *data* — the Main Menu snippet became **464 native nodes (238 flexboxes + 226 text/heading leaves), zero code blocks**. But it **rendered empty**.

The cause is a hard platform constraint, not a bug: the page-builder's **structure corrector flattens flexbox nesting past ~2 levels**. Serialized, a 7-level tree emitted only the top flexbox + one `fw_inner_flexbox` + the text leaves — every intermediate band, grid, and card was dropped. `do_shortcode` on the 2.9 MB string actually *worked*; it was the snippet render's auto-section unwrap plus the corrector's flattening that reduced it to nothing.

A second gotcha surfaced while fixing the fills: a flexbox's **`custom_css` silently voids the whole rule when it contains a comma** — a `background-color:hsl(0,0%,96%)` or `rgb(224, 224, 224)` kills the padding and radius sitting next to it in the same `selector{…}` block. Section/element **native background-pro options** carry those same colours fine.

## Options considered

- **Verbatim code block (status quo).** Pixel-faithful, but one opaque, non-editable block. Rejected as the target (kept as the fallback).
- **Faithful recursive decompose.** Mirror the exact DOM into nested flexboxes + native leaves. *Con:* the tree is genuinely faithful but **un-renderable** past the builder's nesting limit — the intermediate containers vanish. Rejected for deep catalogs; it remains right for shallow subtrees (the marquee).
- **Fix the builder to allow deep flexbox nesting.** *Con:* a large, risky change to the corrector/serializer touching every builder page, to serve one conversion shape. Deferred.
- **Shallow-mapping decompose.** Map the catalog's *known regular shape* onto a **flat** structure that stays inside the builder's limit. *Pro:* renders, editable, faithful; *con:* pattern-specific (only catalogs), not a general recursive engine.

## Decision

A **shallow catalog decomposer**. It recognizes the pattern — colour-banded category grids of item cards — and emits, per band, a **top-level Section** (the corrector accepts sections at the root, so nothing gets auto-wrapped-and-flattened) that carries:

- the **band fill** (arbitrary `bg-[hsl(…)]` resolved from the class; `bg-primary` from the computed style) on the Section's **native background** option, plus its vertical padding;
- a **heading** (title + description);
- a **grid flexbox** (desktop column count read from the responsive `…:grid-cols-N` classes) of **card flexboxes** — **exactly two flexbox levels inside the column**, the most the builder serializes.

Each card is one flexbox (`justify-between`) with the name+description on the left and the price on the right, its fill on the **native background** option, and only comma-free declarations (padding, radius, a hex-converted hairline border) in `custom_css`. Colours are never placed in `custom_css`.

Verified against the source: white / near-black / **red** bands, light-grey / dark / dark-red card fills, names, descriptions, prices, and 🌶️ emoji — **all faithful, all native, zero code blocks**. The deep-verbatim code block stays the fallback for genuinely irregular content, and the recursive decomposer stays the tool for shallow subtrees like the marquee.

## Why

The instinct — "decompose everything faithfully" — hit a real ceiling: the builder can't *represent* a 7-level flexbox tree, so a maximally faithful decomposition is un-shippable there. The shallow mapping trades *structural* faithfulness (a card is a flat flexbox, not a nested one) for something that actually renders as **real, editable elements** and reproduces the source's look — which is the whole point. It's pattern-specific by necessity: only because a catalog is *regular* can it be flattened without losing meaning; an arbitrary irregular subtree can't, so it stays verbatim. And the two hard-won platform facts are now baked into the code and this record — **sections nest at the root but deep flexboxes flatten past ~2 levels**, and **custom_css dies on a comma-bearing colour, so fills belong on the native background option** — so the next decomposer (pricing tables, spec grids) starts from them instead of re-discovering them.

*Status: Accepted.*
