---
title: Product Search
---

# Product Search

A search field scoped to products.

The block renders through the `wc_product_search` element — the same PHP that runs in the page builder, so the front
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
| `placeholder` | What it says before anyone types |
| `button_text` | Button text |
| `button_icon` | Button icon |
| `layout` | Field and button arrangement |
| `field_shape` | Field shape |
| `size` | Field size |
| `button_style` | Button preset |
| `width` | Width |
| `alignment` | Alignment |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[Products only]
Unlike [Site Search](./site-search.md), which searches everything.
:::
