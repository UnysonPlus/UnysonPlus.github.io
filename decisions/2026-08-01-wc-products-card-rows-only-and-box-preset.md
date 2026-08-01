---
slug: wc-products-card-rows-only-and-box-preset
title: "One card model for wc_products: drop the Classic/Slot toggle + the presence switches, add a Box Preset"
authors: [jon]
tags: [shortcodes, back-compat, conversion]
date: 2026-08-01
description: "The Products element let you control a card three overlapping ways — a Classic/Slot Card Layout toggle, per-element show/hide switches, AND a row/slot designer. We collapsed it to one model: the Card Rows designer is the card; presence is 'is the slot in a row.' The Classic toggle and the eight presence switches were removed (nothing had used them), and a Box Preset now supplies the card's skin natively."
---

**The question:** the `wc_products` (Products) element controlled a product card **three overlapping
ways** — a **Classic/Slot "Card Layout"** dropdown, a column of **per-element show/hide switches**
(Price, Rating, Rating Number, Short Description, Quick View, Add to Cart, Wishlist, Stock), *and* an
editable **Card Rows** slot designer. Do we keep all three, or is one model enough? And with the fixed
"Classic" markup gone, where should a card's **visual skin** (border, corners, shadow, hover) come from?

<!-- truncate -->

## Context

The overlap surfaced while polishing a converted storefront. To show a price you needed the **price
slot** in a row **and** `show_price = yes`. To pick the card look you chose **Classic** (badges pinned
over the image, whole-card link, fixed order) **or Slot** (build it from rows). A first-time user faced
"why isn't my price showing? — oh, two controls," and "Classic vs Slot?" with no obvious answer. Classic
was also the *default*, so its behaviour was the one most people would hit first.

Two facts unlocked the decision: the Products element had **never been used in saved content** (no
migration to worry about), and the only thing Classic could do that rows couldn't was **pin badges over
the image** — a look nothing on the sites actually needed.

## Options considered

- **Keep everything, just relabel.** Zero risk, but preserves the exact confusion (two-to-three controls
  for one outcome). A tax on every new user for no benefit.
- **Keep Classic for back-compat, default to Slot.** The usual safe move — but there was no back-compat to
  keep (zero saved usage), so this would carry a dead mode forever.
- **Collapse to rows-only; presence = "is the slot in a row."** Remove the Classic/Slot toggle and the
  eight presence switches; the Card Rows designer becomes the single card model. Keep only the toggles that
  configure *content within* a slot (which badge **types** appear in the `badges` slot; the Add-to-Cart
  label) — those aren't redundant with a slot's presence.
- **For the skin:** either (a) leave it to hand-written scoped CSS, or (b) add a **Box Preset** picker so a
  card inherits a reusable, on-brand box style (border/corners/shadow/fill + hover) the same way other
  elements do.

## Decision

**Rows-only, and a Box Preset for the skin.** The `card_layout` Classic/Slot dropdown and the eight
per-element presence switches were **removed** (rows-only render; a slot renders when it's in a row and the
product has that data — remove the slot to hide it). The **badge-type** toggles and the **Add-to-Cart
label** stay, because they configure a slot's *contents*, not its presence. A new **Card Box Style** option
(`sc_card_box_style_field()` → a `boxp-{slug}` class on every `.upwc-product`) supplies the card skin from
the shared **Box Presets** library; per-site scoped CSS remains the fallback the Site Converter emits from a
captured card. The Site Converter stopped emitting `card_layout` and now emits `card_rows` only.

## Why

One model beats three. Every "show X" switch duplicated what "is the X slot in a row" already answered, and
Classic/Slot forced a choice most users can't make on sight — pure confusion tax on an element with **zero
saved usage**, so removal cost nothing and needed no migration. The one capability only Classic had (badges
over the image) is trivially re-addable as a slot option the day a design needs it — YAGNI until then. And
the skin belongs in a **Box Preset**, not hand-CSS: it keeps cards on-brand, editable, and consistent with
every other boxed element, which is the whole point of the preset system.
