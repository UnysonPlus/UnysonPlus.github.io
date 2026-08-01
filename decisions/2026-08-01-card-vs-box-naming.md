---
slug: card-vs-box-naming
title: "Why an element's content layout is a “Card” but its skin is a “Box”"
authors: [jon]
tags: [naming, shortcodes]
date: 2026-08-01
description: Adding the Card Rows designer to Team Member surfaced a naming clash — the row designer sits on a "Card" tab, but the reusable border/shadow/fill preset applied to it is "Box Style / Box Presets". Do we collapse everything to one word? No — Card and Box name two different layers (content vs. skin), and the skin is used on non-cards too (columns), so "Box" must stay general. An element is a Card that HAS a Box Style.
---

**The question:** The new Card Rows designer lives on a **Card** tab, but the reusable border/corners/shadow/fill
preset you apply to that card is called **Box Style** (from **Box Presets**). That looked inconsistent — should
we rename everything to one word ("Box tab / Box Rows", or "Card Box Style / Card Box Presets")?

<!-- truncate -->

## Context

Several card-like elements (`testimonials`, `team_member`, `wc_products`, `posts`) now share a **Card Rows**
designer — an editable list of rows, each holding ordered content slots (image, name, price, excerpt…) with
inline/stacked layout + alignment. It lives on a **Card** tab.

Separately, those same elements expose a **Box Style** option (`sc_card_box_style_field()`, default label
"Box Style") that applies a reusable **Box Preset** — border, corners, shadow, fill, hover — managed in
**Theme Settings → Components → Box Presets** and emitted as a `.boxp-{slug}` class.

Relabelling Team Member's skin option to "Card Style" (to match its tab) is what triggered the review: now one
element said "Card Style" while every other said "Box Style", and the question of a single consistent term
came up in both directions.

The deciding fact: **Box Presets are not card-specific.** They're already applied to `column` (a layout
container), and are usable on any bordered container — sections, wrappers, image frames. "Box" is the CSS
box the preset actually controls; "Card" is only one *use* of a box.

## Options considered

- **Collapse everything to "Card"** (Card Style, Card Presets). Wrong the moment the preset is on a column —
  a column isn't a card. Narrows a general capability to one of its uses.
- **Collapse everything to "Box"** (Box tab, Box Rows). "Box Rows" is misleading — the rows arrange the
  card's *content blocks*, not boxes; and "Box tab" is vaguer than "Card tab" for what is literally a card
  designer. Drops the industry-standard term users recognise ("product card", "testimonial card").
- **"Card Box Style / Card Box Presets"** as a bridge. Redundant (a card *is* a box), longer, still not the
  default, and still wrong on a column.
- **Keep both terms in their lanes.** Card = the element's content layout; Box = the reusable skin applied
  to it. Fix only the one stray label.

## Decision

**Keep the two terms distinct — they name two different layers:**

- **Card** = the element and how its *content* is arranged → **Card tab**, **Card Rows**.
- **Box** = the reusable *container skin* (border, corners, shadow, fill, hover) → **Box Style**, **Box Presets**.

And revert the one outlier: **Team Member's "Card Style" → "Box Style"** (the default label), so every element's
skin option reads the same. The option stays on the Card tab; the tab context + description make it clear.

The teachable rule:

> A **Card** *has* a **Box Style**. The Card is the *contents*; the Box is the *frame*.

## Why

**They're genuinely different concepts, and the split is useful** — like "Page" vs. "Background". One answers
*"what's in it and where"* (Card Rows), the other *"what does the container look like"* (Box Style).

**"Box" has to stay general.** The same Box Preset skins a column or any container, not only cards. A label
should name the general capability, not one of its uses — so the user-facing term is the broad "Box", while the
developer-facing helper name (`sc_card_box_style_field`) can carry the "card" hint.

**Analogy — a framed poster:** the **Card** is the poster (its picture + text + layout); the **Box** is the
frame (border, matting, drop shadow). You can put the same frame around a different poster — or around a mirror
that isn't a poster at all. That's exactly why **Card** stays specific and **Box** stays general.

*Status: Accepted.*
