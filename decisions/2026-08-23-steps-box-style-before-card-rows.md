---
slug: steps-box-style-before-card-rows
title: "Future-proofing the Steps/Process shortcode — full Card Rows now, or a Box Preset first?"
authors: [jon]
tags: [shortcodes, architecture, conversion]
date: 2026-08-23
description: "The Steps shortcode's converted cards looked flat and dropped their icons. The bigger question behind the fix: should Steps adopt the shared Card Rows slot designer (like Posts / Testimonials / wc_products) to be maximally flexible, or take the smaller step of a Box Preset (box_style) that fits its existing marker + connector engine? We add box_style now and defer Card Rows — because Steps is a CONNECTED flow, not an independent card grid, so the grid Card Rows doesn't model its spine."
---

**The question:** To make the Steps/Process shortcode "future-proof," should it adopt the shared **Card
Rows** slot designer that Posts, Testimonials, wc_products and team-member use — a drag-to-reorder
row/slot layout with a live card preview — or take the smaller step of adding a **Box Preset** (`box_style`)
that layers onto its existing layout engine?

<!-- truncate -->

## Context

The trigger was a conversion complaint: a source "how it works" section whose steps are **boxed cards with
icons** converted to a flat, borderless number list — the boxed look and the per-step icons were both
dropped. Fixing the *detection* was unambiguous (read the boxed skin from computed styles, capture the icon
glyph, match the marker shape/accent). But it surfaced a design question: how much option surface should
Steps grow to reproduce designs like this faithfully, and to stay flexible for the future?

Card Rows is the obvious "future-proof" answer — it's the system every other card-like shortcode already
shares. The instinct was to give Steps the same treatment.

## Options considered

1. **Full Card Rows on Steps now.** Add a Card tab with a slot designer (marker/icon, number, title,
   content), a live card preview, and `box_style`. Maximally flexible and consistent with the other card
   shortcodes. **Cost:** a Steps **view rewrite** — the view would have to render from rows while still
   drawing the marker + connector spine, which Card Rows has no concept of. High risk for a shortcode whose
   value *is* its connected-flow layouts (horizontal / vertical / alternating / cards).

2. **Box Preset (`box_style`) now, Card Rows later.** Add just the shared `sc_card_box_style_field` +
   `sc_card_box_style_class` (the same Box Preset picker icon-box / testimonials use) to the Steps Design
   tab, stamped as `.boxp-{slug}` on every `.fw-steps__item`. Keep the marker/connector engine untouched.
   Small, shared, immediately useful; the Site Converter can auto-assign a captured box skin. Revisit Card
   Rows as a scoped, Steps-specific effort once there's a real need.

3. **Detection fixes only.** Ship the converter improvements (boxed → cards, icon capture, marker
   shape/accent) and add no new option surface. Faithful conversions, but no new editor control for
   hand-built steps.

## Decision

**Option 2** — add `box_style` now and defer Card Rows.

## Why

Card Rows models an **independent card grid**: each item is a self-contained stack of slots
(image/title/meta/excerpt) with no relationship to its neighbours. That's a perfect fit for Posts,
Testimonials, wc_products and team-member. **Steps is not that** — it's a *connected flow* with a marker +
connector spine and horizontal/vertical/alternating layouts. Dropping the grid Card Rows onto it would
either discard the connector model or fight it, and would force a view rewrite of the one part of the
shortcode that carries its identity.

`box_style`, by contrast, is pure win at low risk: it's the exact Box Preset system the rest of the
card-like shortcodes already share, it needs no view rewrite (one class on each step item), and it closes
the reported gap directly — a boxed source process now maps to `design: cards` **plus** a matching
`.boxp-` preset, while the converter also carries the per-step icon (→ `marker: icon`), marker shape and
accent colour. If a genuine need for per-step slot reordering appears later, it can be built as a
**Steps-specific** Card variant that keeps the connector spine — not a copy of the grid system. Ship the
80% that fits the shortcode's grain; don't retrofit the 20% that doesn't.

*Status: Accepted.*
