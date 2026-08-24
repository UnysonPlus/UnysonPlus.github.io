---
title: WooCommerce Products — converter mapping
sidebar_label: WooCommerce Products
slug: /element-mapping/wc-products
description: How the UnysonPlus Site Converter maps a source wc_products into the WooCommerce Products (`wc_products`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# WooCommerce Products — converter mapping

Source `wc_products` → `wc_products`. This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 68 |
| **Recognizer** | `wc_products` |
| **Matches when** | A product grid on a WooCommerce-style page — repeating product cards (image, title, price, add-to-cart). |
| **Becomes** | `wc_products` |
| **Recognizer block shape** | `{ cols, count, has_ribbon }` |
| **Fallback** | Degrades to `code_block`. |

A placeholder product grid, set to show recent products in the source’s column count, with a matched card slot layout (badges/wishlist row, media+title+excerpt, rating row). You point Source at the real products/category; the source can’t carry per-product data.

## Option coverage

**4/15 options mapped natively** (27%) — 🟡 0 via CSS · ⚠️ 0 gaps (derivable, not yet) · ⚪ 11 default · ⚙️ 3 auto.


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `source` | Content | `select` | ✅ Native | Set to `recent` — you point it at your products / category |
| `columns` | Layout | `select` | ✅ Native | Column count from the source grid |
| `posts_per_page` | Content | `number` | ✅ Native | How many products to show |
| `slots` | Design | `group` | ✅ Native | Matched card slot layout (badges, media+title+excerpt, rating) |
| `category` | Content | `multi-select` | ⚪ Unmapped | You choose the category |
| `tags` | Content | `multi-select` | ⚪ Unmapped | Default |
| `order` | Content | `select` | ⚪ Unmapped | Default |
| `orderby` | Content | `select` | ⚪ Unmapped | Default |
| `gap` | Layout | `unit-input` | ⚪ Unmapped | Default |
| `pagination` | Behavior | `select` | ⚪ Unmapped | Default |
| `carousel` | Layout | `switch` | ⚪ Unmapped | Default |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `animation` | Animations | `group` | ⚪ Unmapped | Default off |
| `css_class` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `css_id` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `unique_id` | Advanced | `hidden` | ⚙️ Auto | Generated |
| `responsive_hide` | Advanced | `group` | ⚙️ Auto | Not set |
| `custom_attrs` | Advanced | `group` | ⚙️ Auto | Not set |

### Status legend

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚠️ **Gap** — A source signal exists, but the converter does not derive this yet — a mapping worth adding (a real TODO, not a limitation).
- ⚪ **Unmapped** — Left at default — no reliable source signal, or an intentional/UnysonPlus-specific choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
