---
slug: woocommerce-conversion-detect-and-gate
title: "Converting a store — should the converter auto-detect WooCommerce, or gate it behind a checkbox?"
authors: [jon]
tags: [conversion, extensions, architecture]
date: 2026-08-21
description: 'When the Site Converter ingests a WooCommerce/e-commerce source, its product grids should map to real WooCommerce shortcodes (a live [wc_products] feed) instead of frozen static image cards. But emitting WooCommerce shortcodes on a site where WooCommerce is not installed produces broken output. So detection alone cannot drive emission. The decision: detect the store from the captured HTML AND gate emission behind a checkbox that is disabled unless WooCommerce is active — a belt-and-suspenders double gate, auto-ticked when both are true.'
---

**The question:** A converted store should get **live WooCommerce shortcodes** for its product grids
(`[wc_products]`, add-to-cart, etc.) rather than the static `image_box` cards a generic card grid becomes.
Should the converter simply **auto-detect** WooCommerce from the source and map accordingly — or put a
**checkbox** in the Convert panel, greyed out when WooCommerce isn't installed?

<!-- truncate -->

## Context

The Site Converter maps a source's DOM onto native UnysonPlus constructs. A product grid on the source
(cards with a title, image, price, and an add-to-cart control) currently falls through to the generic
card-grid path and renders as static `image_box` tiles — frozen content, no cart, no live catalog.

Two facts pull in opposite directions:

1. **The source can be detected.** A real WooCommerce/e-commerce page carries unambiguous signals in the
   captured HTML — the `woocommerce` body/wrapper class, `woocommerce-Price-amount`, `add_to_cart_button`,
   `data-product_id`, WooCommerce Blocks (`wc-block-*`), `Product` JSON-LD, and store-shaped URLs
   (`/product/`, `/cart`, `/checkout`).
2. **Emission can break the target.** `[wc_products]` and friends only render on a site where WooCommerce
   is **active**. Emit them on a plain install and the visitor sees raw, unparsed shortcodes — worse than
   the static cards we replaced. Detection tells us about the *source*; it says nothing about whether the
   *target* can render what we'd emit.

## Options considered

- **Auto-detect only (no UI).** Detect WooCommerce in the source and map product grids to WooCommerce
  shortcodes automatically. *Trade-off:* silently emits broken shortcodes whenever the target lacks
  WooCommerce, and gives the user no way to opt out (e.g. they're rebuilding the store on a page builder
  and don't want a live feed there). Detection is necessary but insufficient — it's the wrong single gate.
- **Checkbox only (no detection).** A plain "Map to WooCommerce" toggle, always available. *Trade-off:* a
  user can tick it on a non-store site and get a product feed where the source had a portfolio grid; and it
  offers no guidance about whether the option is even usable on this install.
- **Detect *and* gate (chosen).** A checkbox that is **`disabled` unless `class_exists('WooCommerce')`**
  (labelled "(WooCommerce not installed)" when off), **auto-ticked when the source is detected as a store**,
  and whose emission is gated a *second* time by the same source detection at build time. Both the target
  (WooCommerce active) and the source (reads as a store) must agree, and the user stays in control.

## Decision

**Detect the store, but gate emission behind a WooCommerce-active checkbox — a double gate.**

- `FW_Site_Converter_Sources::is_woocommerce_source($html)` scores the captured HTML (strong signals worth 2,
  corroborating ones worth 1; a threshold of 2 avoids a lone "cart" word false-positiving).
- The Convert panel's **"Map to WooCommerce"** checkbox is `disabled` unless WooCommerce is active on the
  install, so it's impossible to request an unrenderable mapping.
- The build reads the option (`map_woocommerce`), and the mapper only switches product grids to WooCommerce
  shortcodes when **the option is on, WooCommerce is active, *and* `is_woocommerce_source()` agrees** — so a
  mistaken tick on a non-store site is a no-op, not a broken feed.

## Why

The core insight is that **source detection and target capability are two different questions**, and each is
a necessary gate for a different failure mode. Detection prevents "portfolio grid became a shop"; the
WooCommerce-active gate prevents "raw `[wc_products]` on a site with no WooCommerce". Neither gate alone is
safe, so we require both and let detection *auto-tick* the option (convenience) while the WooCommerce-active
check *disables* it (safety). The result is a converter that does the smart thing by default on a real
store, degrades to the existing static-card behaviour everywhere else, and never emits output the target
can't render — with the user always able to override.

*Status: Accepted. The detection + gated checkbox + option threading ship first; the product-grid →
`[wc_products]` mapping itself lands next, built and verified against a live WooCommerce source.*
