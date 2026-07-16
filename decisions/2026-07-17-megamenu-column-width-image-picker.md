---
slug: megamenu-column-width-image-picker
title: "Why the Mega Menu column width is an inline image-picker, not the Column shortcode's responsive popover"
authors: [jon]
tags: [option-types, back-compat]
date: 2026-07-17
description: The Mega Menu column width was a plain select (auto / 1/2 / 1/3 / …). The page builder's Column shortcode already has a richer Width Override — a responsive (Phone/Tablet/Desktop) wrapper around a popover image-picker of width tiles. Rather than reuse that whole control for consistency, we adopted only its visual half — an inline image-picker of the same width tiles, dropping the responsive per-device wrapper (meaningless for a dropdown that just stacks on mobile) and the popover (the Settings modal has room, so inline saves a click).
---

**The question:** The Mega Menu's per-column width control was a plain `select`. The page builder's
Column shortcode has a much nicer "Width Override" — visual width tiles. Should the mega column width
just reuse that same control for consistency?

<!-- truncate -->

## Context

A Mega Menu column's width is set in the nav-menus **Settings** modal (`options/column.php`, the `width`
option) and drives a `mm-col-<fraction>` class the front-end walker emits. It shipped as a plain `select`:
`auto / 1/2 / 1/3 / 2/3 / 1/4 / 3/4 / 1/5 / 1/6`.

The Column **shortcode** solves the same "how wide is this column" problem far more visually. Its Width
Override is two things stacked: a **`responsive`** wrapper (Phone / Tablet / Desktop tabs, so you can
override the width per device) around a **`popover`** that holds an **`image-picker`** of width tiles. The
question was whether to lift that whole control into the mega menu for a consistent, premium feel.

## Options considered

- **Reuse the full responsive + popover Width Override.** Maximum consistency with the builder, but it
  imports two layers the mega menu doesn't need. Per-device widths are meaningless here — a mega panel
  doesn't lay out its columns responsively, it **stacks** them on small screens (governed separately by the
  Responsive → Mobile Columns setting). And the popover exists in the builder because the column toolbar is
  cramped; the nav Settings modal isn't.
- **Inline image-picker of the same width tiles, no responsive, no popover.** Take the part that's actually
  an upgrade — the visual tiles — and show it inline.
- **Leave it a `select`.** Works, but it's the one control in the otherwise-visual Mega Menu tab that makes
  you read fractions instead of seeing them.

## Decision

**An inline `image-picker`** of width tiles — each an inline data-URI SVG showing a mini row bar with the
column's fraction filled (three equal segments for `auto`). No `responsive` wrapper, no `popover`.

Crucially this is a **presentation-only** change: the image-picker stores the *same string keys* the select
did (`auto`, `1/2`, …), so every already-saved column width round-trips untouched — no migration, no
value-shape change, and the front-end walker (which maps the key to `mm-col-1-3` etc.) is unchanged.

## Why

The valuable half of the builder's control is the visual tiles; the responsive and popover halves are there
to solve builder-specific problems that don't exist in a mega dropdown. Copying them wholesale would add
per-device UI for a case the layout can't express and a click the modal doesn't need — complexity for the
sake of matching, which is the trap the "don't swap a working layout for a richer one" lessons keep flagging.
Adopting just the image-picker gets the on-brand, see-the-width feel that fits the rest of the Mega Menu tab,
inline so it's one glance and one click, while the unchanged value keys keep the blast radius at zero.
