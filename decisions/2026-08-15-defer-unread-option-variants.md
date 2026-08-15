---
slug: defer-unread-option-variants
title: "The options modal shipped 6.7 MB — ship schemas instead of markup?"
authors: [jon]
tags: [performance, option-types, architecture]
date: 2026-08-15
description: Opening any element's options modal cost ~6.7 MB and ~873 ms, and 95% of it was markup for picker choices the user had not selected — markup the save path never reads. Decision — an opt-in lazy_choices mode where unselected choices ship their JSON schema instead of rendered HTML and are rendered on demand. Includes the safety rule that separates this from an earlier attempt at the same idea that lost data.
---

**The question:** Every element's options modal took ~873 ms and ~6.7 MB to open. An existing
"lazy multi-picker" optimisation was already in place and clearly not working. What is actually
costing that, and can it be deferred without risking saved values?

<!-- truncate -->

## Context

Profiling one accordion modal, tab by tab:

| Tab | Time | Payload |
| --- | --- | --- |
| Content / Layout / Behaviour / Advanced | ~29 ms | ~138 KB |
| Styling | 58 ms | 282 KB |
| **Animations** | **842 ms** | **6,261 KB** |

The Animations tab holds 16 module cards, each a `multi-picker`. A multi-picker renders the picker
plus **every choice's sub-options**, showing one and hiding the rest. The Entrance picker alone
renders a settings block for all ~56 Animate.css effects. One card measured 703 KB containing 205
option-type instances.

The existing optimisation turned out to be doing nothing useful. It rendered every choice server-side
and moved the result into a `data-options-template` **attribute** — sparing the browser some DOM nodes
while transferring the same bytes (slightly more, once HTML-escaped) and spending the same render
time. A mechanism named "lazy" that deferred nothing.

Critically, `multi-picker::_get_value_from_input()` already persisted **only the selected choice's**
sub-values. So ~95% of that payload was markup the save path could never read.

## Options considered

- **Leave it.** It works, and the cost is invisible until you profile. But it is ~6 MB per modal open
  for every user of every element, forever.
- **Rewrite the editing layer** (a React canvas, client-side option state). Fixes it eventually, but
  it is a multi-year rewrite for a problem that turned out to be one control misbehaving.
- **Defer unselected choices** — ship their schema, render on demand when picked.

## Decision

**Defer them, behind an opt-in `lazy_choices` flag.** Unselected choices ship their option schema as
JSON instead of rendered HTML; when a choice is picked, the client renders it through the existing
`fw_backend_options_render` endpoint and injects the result.

| | Before | After |
| --- | --- | --- |
| One animation card | 703 KB | 151 KB |
| Animations tab | 6,261 KB · 842 ms | **1,679 KB · 60 ms** |
| Whole modal | 6,680 KB · 873 ms | **2,098 KB · 137 ms** |

Opt-in rather than default: most multi-pickers are small enough not to care, and an opt-in keeps the
blast radius at the one place with the problem.

## The safety rule — the part worth remembering

This exact idea had been tried before at a different level and **lost data**: whole animation cards
were deferred, and a field absent from the form makes the server derive its *default*, so
newly-added animations silently saved as `none`. The code carried a comment warning against
retrying it.

The distinction that makes deferral safe is one level down:

> **Defer only what the save path never reads.** If `_get_value_from_input()` collects just the
> active variant, the inactive variants' inputs are already ignored — so withholding them changes
> nothing. Never defer the **selector**, or a whole field: those *are* read, and their absence
> silently becomes a default.

Under that rule the picker is always rendered (so its value is always in the form), and the selected
choice's group is always present — initially, or fetched before the user can save. Two supporting
details: a **save gate** (the modal waits on in-flight renders before serializing, so a fast Save
after switching choice cannot serialize an incomplete form), and the schema attribute is **claimed
before fetching** and **restored on failure**, so a choice can retry rather than end up with no inputs.

## Why

- **The architecture was never the problem.** The same server-rendered options model went 6× faster
  by not rendering things nobody asked for. Editing latency had been filed as a structural weakness
  of the framework; it was a bug in one control.
- **The rule generalises.** Auditing all 75 elements with the same method found the pattern again in
  the `table` option type — 11 MB, rendering every row type's options *per cell*, with the save path
  again reading only the active one.
- **It is measurable, so it can be governed.** A healthy element modal is ~2 MB / ~130 ms. That
  number is now in the option-type and shortcode authoring guides with a snippet to check it, so a
  new element or animation module that regresses it is caught by its author rather than by users.

Status: **Accepted**, shipped in core 2.16.12 / Shortcodes 1.13.35. The `table` option type is the
known remaining case.
