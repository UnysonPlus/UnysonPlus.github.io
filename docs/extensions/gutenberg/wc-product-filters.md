---
title: Product Filters
sidebar_position: 94
---

# Product Filters

Filter controls for a product grid — price, attributes, categories.

The block renders through the `wc_product_filters` element — the same PHP that runs in the page builder, so the front
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
| `filters` | Which filters to offer |
| `panel_title` | Heading above them |
| `collapsible` | Let visitors collapse the panel |
| `box_style` | Panel box preset |
| `divider` | Dividers between filters |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[Pairs with a Products block]
It filters the shop query, so it needs a grid on the page to act on.
:::

:::note[Filters do not filter in the canvas]
A preview that changed which products were listed would stop being a preview of the grid you are
editing.
:::

:::note[Empty until your products have something to filter by]
The filters are built from the attributes and categories your products actually use, so a shop with
none shows nothing — and the block says so.
:::
