---
slug: nested-column-inner-shortcode-aliases
title: "Why nested columns render through fw_inner_row / fw_inner_column alias shortcodes"
authors: [jon]
tags: [architecture, page-builder]
date: 2026-07-15
description: Nested columns rendered as garbage on the frontend — the closing [/column][/row] leaked out as literal text — because WordPress' shortcode parser can't nest the same tag inside itself. We render the nested level through distinct alias tags (fw_inner_row / fw_inner_column) that reuse the same callbacks, instead of rewriting how the builder renders.
---

**The question:** The first time I put a column inside a column, the frontend came out broken — the
content truncated and a literal `[/column][/row]` showed up as text on the page. Why does nesting the
same element blow up, and how do we render a column-inside-a-column without WordPress choking?

<!-- truncate -->

## Context

WordPress' `do_shortcode()` uses a **non-recursive regex**: it cannot pair the same shortcode tag
nested inside itself. A nested builder tree renders as
`[column] … [row] … [column] … [/column] … [/row] … [/column]` — the tag `column` (and `row`)
repeats in one branch. The parser binds the **outer** `[column]` to the **first** `[/column]` it
finds (the inner one), truncating the outer column's content and dumping the trailing
`[/column][/row]` onto the page as literal text. That was the exact broken output.

This never bit the builder before because in a normal `section → row → column → leaf` tree each tag
appears once per branch. Nested columns are the first time a tag repeats along a single path.

## Options considered

| Approach | Trade-off |
|---|---|
| **Distinct alias tags for the nested level** (`fw_inner_row` / `fw_inner_column`) rendered by the same row/column instances | Tiny, surgical; works *with* the existing shortcode pipeline. The rendered path becomes `column → fw_inner_row → fw_inner_column → leaf` with no repeated tag, so the parser is happy. Needs a one-line tag swap in the notation generator + a couple of `add_shortcode` aliases. |
| **Render the whole builder tree to HTML server-side**, bypassing shortcodes for nested content | Sidesteps the parser entirely, but means re-implementing how builder content renders — a second, parallel render path next to `do_shortcode`, and every shortcode's view/enqueue/atts decode would need to be reachable from it. Large surface, high drift risk. |
| **Depth-numbered tags** (`fw_inner_row_1`, `fw_inner_column_1`, `_2`, …) for arbitrary depth | Fully general, but registers an unbounded set of tags for a case the editor caps at one level. Complexity with no user-facing payoff. |

## Decision

**Alias tags.** `fw_inner_row` and `fw_inner_column` are registered with `add_shortcode()` pointing
at the **existing** row and column instances — `FW_Shortcode::render()` keys off `$this` (the
instance's own tag, view, options), not the tag WordPress passes in, so an aliased tag renders
byte-for-byte like the real one. The page-builder notation generator emits the alias tags for a row
synthesized inside a column (and the columns within it); a small `normalize_nested_columns()` pass
covers the correction-disabled single-item render path (the live editor re-rendering one column) so
that route can't re-break. We register **one** alias level, matching the editor's one-level cap.

## Why

The alias approach is the smallest change that works with the machinery we already have. The
shortcode render pipeline — view resolution, options decode, static enqueue, and the recursive
`do_shortcode($content)` inside each view — all keeps working untouched; we only rename the tag on
the way out so WordPress' parser sees a unique tag per nesting path. Rendering the tree to HTML
directly would have meant building and maintaining a whole second render path, and depth-numbered
tags would add unbounded registration for depth the editor never produces.

## Status

**Accepted, with a known one-level bound.** Because we register a single alias level, a *hand-built
or imported* tree nested two-plus levels deep would re-collide (`fw_inner_row` repeating along the
path). That's out of scope: the editor enforces one nested level, so the case can't arise through
normal authoring. If deeper nesting is ever needed, this becomes depth-numbered aliases — a bounded
extension of the same idea, not a redesign.
