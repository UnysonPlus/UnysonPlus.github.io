---
title: Product Categories
---

# Product Categories

A grid of product categories, for browsing into the shop.

The block renders through the `wc_product_categories` element — the same PHP that runs in the page builder, so the front
end is identical either way.

:::caution[Needs the WooCommerce extension *and* the WooCommerce plugin]
This element ships with the **WooCommerce** extension, which is inactive by default, and it needs the
**WooCommerce plugin** installed and active.

With either missing the block does not register at all — so it appears in the inserter exactly when it
can actually work, rather than as an entry that renders nothing.
:::

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `number` | How many to show |
| `orderby` | Sort field |
| `order` | Ascending or descending |
| `parent` | Only children of this category |
| `ids` | Specific categories |
| `hide_empty` | Skip categories with no products |
| `columns` | How many per row |
| `gap` | Space between them |
| `alignment` | Alignment |
| `card_rows` | Which rows a card shows |
| `box_style` | Card box preset |
| `image_ratio` | Crop ratio |
| `image_size` | Which registered image size |
| `button_text` | Button text |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[`hide_empty` is worth a deliberate answer on a new shop]
With it off, a category created before its products still shows — either a useful placeholder or a
dead end, depending on how far along the shop is.
:::
