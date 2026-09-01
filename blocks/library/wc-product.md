---
title: Single Product
---

# Single Product

One product, rendered as a card — the same card the Products grid uses.

The block renders through the `wc_product` element — the same PHP that runs in the page builder, so the front
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
| `product` | Which product |
| `card_rows` | Which rows the card shows |
| `box_style` | Card box preset |
| `image_ratio` | Crop ratio |
| `image_size` | Which registered image size |
| `rating_symbol` | Rating mark |
| `rating_fill_color` | Filled colour |
| `rating_empty_color` | Empty colour |
| `rating_size` | Rating size |
| `show_ribbon` | Corner ribbon |
| `show_sale_badge` | Sale badge |
| `badge_style` | Badge design |
| `show_featured_badge` | Featured badge |
| `show_new_badge` | New badge |
| `new_days` | How recent counts as new |
| `add_to_cart_text` | Button text |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[A card, not a product page]
For the full page — gallery, tabs, variations — use [Product Page](./wc-product-page.md) instead.
:::
