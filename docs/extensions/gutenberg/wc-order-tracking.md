---
title: Order Tracking
sidebar_position: 104
---

# Order Tracking

A form for customers to look up an order.

The block renders through the `wc_order_tracking` element — the same PHP that runs in the page builder, so the front
end is identical either way.

:::caution[Needs the WooCommerce extension *and* the WooCommerce plugin]
This element ships with the **WooCommerce** extension, which is inactive by default, and it needs the
**WooCommerce plugin** installed and active.

With either missing the block does not register at all — so it appears in the inserter exactly when it
can actually work, rather than as an entry that renders nothing.
:::

## Settings

This element has **no settings of its own** — it renders WooCommerce's own template, and its appearance comes from WooCommerce settings and your theme. The block says so in the sidebar rather than showing an empty panel.

:::note[Not tied to a configured page]
Unlike the cart and checkout, order tracking has no page WooCommerce routes to, so this block can go
wherever it makes sense — a support page, a footer, an FAQ.
:::
