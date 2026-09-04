---
slug: catalog-mode-for-menu-and-lookbook-conversions
title: "Why catalog/menu sites get Catalog Mode — auto-detected AND a checkbox"
authors: [jon]
tags: [conversion, extensions]
date: 2026-09-04
description: "A restaurant menu or a lookbook shows prices but has no cart or checkout — you browse, then reserve or enquire. When such a source is mapped to WooCommerce, add-to-cart buttons and a checkout are wrong. The question was whether to auto-detect catalog nature or add an explicit option under Map to WooCommerce; the decision is BOTH — a conservative is_catalog_source() auto-detector plus a Catalog Mode checkbox, both driving the bundled WooCommerce extension's EXISTING catalog mode rather than a new mechanism."
---

**The question:** Converting jukeboxburgers.com (a restaurant menu — prices shown, but you "Book a Table," there is no online ordering) with Map-to-WooCommerce enabled, should the converter **auto-detect that it is a catalog/menu** and suppress the shop machinery, or should we **add a Catalog Mode option under Map to WooCommerce**, or both?

<!-- truncate -->

## Context

WooCommerce conversion is already gated: the mapper only emits WooCommerce shortcodes when the user opts in AND `is_woocommerce_source()` sees real store signals (an add-to-cart button, `?add-to-cart=`, a Product JSON-LD, a `/cart` link). A menu site trips none of those, so — as it happens — jukebox mapped its menu to a native `pricing_table` and produced no cart at all. Good, but fragile and implicit: a slightly more shop-shaped source (a price list with a stray "add to cart", a lookbook with product permalinks) could flip `is_woocommerce_source()` and sprout a cart the source never had.

Crucially, the bundled **WooCommerce extension already ships a Catalog Mode** (`upwc_wc_catalog_mode()`, a "Catalog Mode" settings tab) that hides prices'/add-to-cart controls and locks purchasing store-wide. So the missing piece was never a rendering mechanism — it was *deciding when to turn it on during a conversion*.

## Options considered

- **Auto-detect only.** Add `is_catalog_source()` and silently enable Catalog Mode when it fires. *Pro:* zero user effort. *Con:* a heuristic will sometimes be wrong (a genuine store that reads catalog-ish, or a catalog the user actually wants to sell from), with no visible control to correct it.
- **A checkbox only.** Expose "Catalog Mode" under Map to WooCommerce and do nothing automatic. *Pro:* explicit and predictable. *Con:* the 90% case (a menu site) needs the user to know to tick it; most won't, and get a shop they didn't want.
- **A whole new catalog renderer in the converter.** Reproduce "no cart" by stripping WooCommerce output ourselves. *Con:* redundant — the extension already does exactly this, better and store-wide; duplicating it in the converter is a maintenance trap.
- **Both, driving the existing extension mode (chosen).** A conservative `is_catalog_source()` (prices present, NO add-to-cart / cart / checkout, AND a menu/reservation/lookbook cue) auto-enables Catalog Mode when the user maps to WooCommerce; a **Catalog Mode checkbox** under Map-to-WooCommerce lets the user force it on. Both just set the WooCommerce extension's `catalog_mode` setting on import — the extension owns the behavior.

## Decision

Do **both**, and let them **compose over the extension's existing Catalog Mode**:

- **`is_catalog_source($html)`** — deliberately conservative. It requires visible prices, the ABSENCE of any shopping machinery (add-to-cart / `?add-to-cart=` / `data-product_id` / a `/cart` or `/checkout` link / a WooCommerce price element), AND a specific browse-then-contact cue ("our menu", "book a table", "reserve", "lookbook", "our collection", "enquire", "request a quote"). Bare "menu" is excluded — it is a nav word.
- **Catalog Mode checkbox** under Map to WooCommerce. Ticking it forces Catalog Mode; leaving it unticked lets auto-detect decide.
- **Application:** on import, when the WooCommerce extension is active and (the box is ticked, OR the user mapped to WooCommerce AND the source auto-detects as a catalog), the converter sets the extension's `catalog_mode` setting — nothing more. The extension hides add-to-cart + cart/checkout. Auto-enable is gated on the user having opted into WooCommerce, so a non-store conversion never flips a store setting; an explicit tick always wins.

## Why

The user's framing — "auto-detect, or add an option?" — has a false either/or in it. Auto-detect is right for the common case (a menu converts to a clean catalog with no effort), and the explicit checkbox is the escape hatch for when the heuristic is wrong or the intent is deliberate (a real store the owner wants as a lookbook). They are complementary, not alternatives, and layering them costs almost nothing because the *behavior* already exists in the WooCommerce extension. Building a catalog renderer into the converter, by contrast, would duplicate a shipped feature and drift from it. Anchoring both the detector and the checkbox to the extension's `catalog_mode` setting keeps one source of truth for "this store is browse-only," editable afterward in WooCommerce settings like any other conversion output.

One clarifier the build surfaced: a true catalog source is, by construction, NOT `is_woocommerce_source` (it has no cart machinery), so it never maps to WooCommerce in the first place — which is why the menu site produced no cart even before this change. Catalog Mode's real value is the shop-shaped source the user wants browse-only, and as an explicit, discoverable guarantee rather than an implicit side effect of the store-detection gate.

*Status: Accepted.*
