---
title: Product Page
sidebar_position: 92
---

# Product Page

A product's full page — gallery, summary, tabs and related products.

The block renders through the `wc_product_page` element — the same PHP that runs in the page builder, so the front
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

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[One option, because the element is WooCommerce's whole template]
Everything about how it looks comes from WooCommerce and your theme.
:::
