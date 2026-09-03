---
slug: dom-duplication-vs-semantic-decomposition
title: "Should the Site Converter duplicate the source DOM, now that flexbox makes it possible?"
authors: [jon]
tags: [conversion, page-builder, architecture]
date: 2026-09-03
description: The flexbox Div can represent any source DOM tree, so a 1:1 structural clone is now possible — but semantic decomposition stays the default, with flexbox used for faithful layout and as a better fallback than code_block.
---

**The question:** The page builder's new **flexbox "Div"** is a universal container — arbitrary
nesting, flex/grid/block, per-device widths — so the Site Converter *could* now emit a 1:1 mirror of
the source's DOM tree. Should it? Is duplicating the source DOM the right output model?

<!-- truncate -->

## Context

The converter's job is to turn an existing site into a **native, editable** UnysonPlus page. Historically
it does **semantic decomposition**: a recognizer identifies a region as a known component (icon_box,
testimonials, counter, logo_grid, special_heading, pricing…) and emits that native shortcode, so the
user gets real elements they can configure — not a wall of divs. Anything it can't classify falls back
to a verbatim `code_block` (raw HTML).

The flexbox work of the last stretch (recursive `flexify_items`, container-width reproduction, the
Problem/Solution wrap fix) proved the flexbox Div can faithfully reproduce a source's **layout** — rows,
columns, nesting depth, widths, gaps. That capability raises the question: if flexbox can mirror any
DOM, why not just clone the DOM 1:1 and skip the recognizers?

## Options considered

- **1:1 DOM duplication (default).** Emit a nested flexbox for every source wrapper. Maximum "looks
  identical," minimum thought. But: the output is **div-soup** — dozens of meaningless containers, no
  native elements, frozen class-derived styling that doesn't map to Theme Settings / presets / palette,
  a tree bloated 3–5× by styling-only wrappers, and a huge error surface (every wrapper's computed
  styles → atts). It throws away the converter's whole reason to exist: editable, semantic output.
- **Semantic decomposition only.** Keep recognizers; `code_block` everything else. Editable where it
  works, but the fallback is a dead raw-HTML blob that ignores the design system and can't be edited.
- **Tiered: semantic first, flexbox for layout and as a structural fallback.** Decompose to native
  elements where possible; use flexbox to reproduce the *layout* those recognizers identify; and for a
  genuinely un-decomposable region, emit a **nested-flexbox mirror of that subtree** (leaves as
  text/image/code) instead of a flat `code_block`.

## Decision

**Semantic decomposition stays the default. Do NOT make the converter a DOM cloner.** Use the flexbox
Div in three tiers:

1. **Semantic where possible (primary):** the matching native element — the differentiator.
2. **Structural fidelity *within* that, via flexbox:** reproduce the layout skeleton (rows / columns /
   nesting / widths / gaps) the recognizers see. Mirror the DOM's *layout*, keep its *content* semantic.
3. **Flexbox as a *better fallback*:** for an un-decomposable subtree, emit a nested-flexbox structural
   mirror (containers → flexbox, leaves → native text/image, last resort → a small scoped `code_block`),
   replacing the old flat `code_block`.

In short: **mirror the container skeleton, decompose the leaves.**

## Why

The value of the converter is *editable, on-brand* output, not a screenshot in HTML. A 1:1 DOM clone
would look right and be useless — a frozen tree the user can't meaningfully edit, disconnected from the
design system. And the fidelity bugs we kept hitting (overflow, wrong widths, stacked grids) show that
reproducing layout faithfully is already hard *within* the semantic model; a full DOM mirror multiplies
that error surface across every wrapper. Reserving the structural mirror for the un-decomposable cases
(tier 3) captures most of the "looks identical" benefit exactly where semantic decomposition can't help,
without sacrificing editability where it can. This is the same principle as the block-theme roadmap's
*faithful degradation over fake nativeness*: a structural flexbox mirror is a better, editable
degradation than a raw `code_block`, and both beat pretending a bespoke widget is a native element.
