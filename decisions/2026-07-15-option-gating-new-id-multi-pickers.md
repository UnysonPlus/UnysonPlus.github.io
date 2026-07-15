---
slug: option-gating-new-id-multi-pickers
title: "Why option-gating pickers use a new option id instead of migrating the old scalar"
authors: [jon]
tags: [option-types, page-builder, back-compat]
date: 2026-07-15
description: To hide irrelevant options I converted flat selects (layout mode, card style, pagination type) into multi-pickers that reveal only the chosen value's sub-options — but that changes the saved value from a string to an array, and a leaf shortcode's modal opens with raw saved atts. The choice was to reuse the same option id and migrate every old scalar, or give the multi-picker a new id so a legacy scalar is never fed into it. We took the new id, plus frontend fallback reads, accepting that old instances show defaults in the builder until re-saved.
---

**The question:** I want the Design tab to show only the options that matter for the current choice — so
`layout_mode`, `card_style`, `pagination_type` should become image-pickers that reveal their own
sub-options. But those are existing selects with real saved data, and turning a select (a string) into a
multi-picker (an array) is a value-shape change. How do I do that without breaking every already-saved
Posts/Testimonials block?

<!-- truncate -->

## Context

Unyson's multi-picker is the mechanism for "pick X, reveal only X's options." Its stored value is nested:
`{ <picker_key>: 'value', 'value': { …sub-options } }`. Its PHP `_render` reads `$value[$picker_key]`.

The trap is how the editor loads values. A leaf shortcode is a page-builder "simple" item, and its modal
opens with **raw saved atts** — `new fw.OptionsModal({ values: model.get('atts') })` — *not* run through
any value-normalisation first. So if the saved `card_style` is the string `"overlay"` and the option is now
a multi-picker, `_render` does `"overlay"['style']` → an illegal-string-offset warning on PHP 7 and a fatal
`TypeError` on PHP 8. The symptom is the dreaded blank `error:` modal. Confirmed by reading both the
multi-picker option type and the simple-item's `scripts.js`.

## Options considered

| Approach | Editor safety | Migration cost |
|---|---|---|
| **Reuse the same id** (`card_style` becomes the multi-picker) + write a migrator | Needs a JS-side migrator that rewrites raw atts *before* the modal opens (PHP `get_value_from_attributes` isn't called on normal editor load) — fragile, and per-shortcode | High |
| **New option id** (`card`, `design`, `pagination`) for the multi-picker | A legacy scalar `card_style` is simply an orphaned att no option reads → no bad value ever reaches a multi-picker → no error | None |

For the **frontend**, either way needs the values to keep working. The moved sub-options (columns, gaps,
slider controls…) now live at new nested paths.

## Decision

**Give the multi-picker a new id, and normalise on read.** `layout_mode → design`, `card_style → card`,
`pagination_type → pagination` (and Testimonials' `design → design_settings`). The old scalar att is left
untouched and ignored — so it can never be fed into a multi-picker. On the frontend, a single
`normalize_atts()` step resolves every moved option **new-path → legacy-flat-path → default** back onto the
flat keys the view already reads, so nothing downstream changes. The accepted trade-off, surfaced and
agreed before building: **existing instances render unchanged on the site, but show the moved options at
their defaults in the builder until the block is re-opened and re-saved.**

## Why

The new-id route removes the failure mode entirely instead of trying to survive it. Migrating in place
would mean a bespoke JS atts-rewriter per shortcode, running at exactly the wrong moment (raw-atts modal
open), and getting it wrong is a fatal modal — high risk for a cosmetic gain. An orphaned scalar att costs
nothing: no option claims it, it's dropped on the next save, and the frontend fallback read keeps the old
value live in the meantime. We chose reliability (no migration, no blank modal) over editor-perfect
back-compat, because the only casualty is a one-time re-save, and only if someone edits an old block.
