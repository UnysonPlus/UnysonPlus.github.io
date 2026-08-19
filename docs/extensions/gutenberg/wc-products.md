---
title: Products
sidebar_position: 90
---

# Products

A grid or carousel of products, from a query you build — the shop's main display element.

The block renders through the `wc_products` element — the same PHP that runs in the page builder, so the front
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
| `source` | Where products come from |
| `category` | Restrict to categories |
| `tags` | Restrict to tags |
| `attribute` | Restrict by attribute |
| `attribute_terms` | Which terms of it |
| `product_ids` | Specific products |
| `posts_per_page` | How many to show |
| `orderby` | Sort field |
| `order` | Ascending or descending |
| `layout` | Grid or carousel |
| `columns` | How many per row |
| `gap` | Space between cards |
| `alignment` | Alignment |
| `pagination` | Paginate the grid |
| `carousel_arrows` | Show carousel arrows |
| `card_rows` | Which rows a card shows, and in what order |
| `box_style` | Card box preset |
| `image_ratio` | Thumbnail crop ratio |
| `image_size` | Which registered image size |
| `rating_symbol` | Star, heart or another mark |
| `rating_fill_color` | Filled symbol colour |
| `rating_empty_color` | Empty symbol colour |
| `rating_size` | Symbol size |
| `show_ribbon` | Show the corner ribbon |
| `show_sale_badge` | Show a sale badge |
| `badge_style` | Badge design |
| `show_featured_badge` | Badge featured products |
| `show_new_badge` | Badge recent products |
| `new_days` | How recent counts as new |
| `add_to_cart_text` | Button text |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[The query runs for real in the editor]
The canvas shows this shop's actual products, so you can see whether the query returns what you meant.

**Add-to-cart is inert.** Live, a click would add a product to the *editor's* session cart — a real
cart belonging to whoever is logged in.
:::

:::note[Two ways to be empty, and the block says which]
No published products at all is a different problem from a query that excluded everything, and the fix
differs. The block names the one you have.
:::
