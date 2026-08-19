---
title: Free Shipping Bar
sidebar_position: 100
---

# Free Shipping Bar

A progress bar showing how far the cart is from qualifying for free shipping.

The block renders through the `wc_free_shipping` element — the same PHP that runs in the page builder, so the front
end is identical either way.

:::caution[Needs the WooCommerce extension *and* the WooCommerce plugin]
This element ships with the **WooCommerce** extension, which is inactive by default, and it needs the
**WooCommerce plugin** installed and active.

With either missing the block does not register at all — so it appears in the inserter exactly when it
can actually work, rather than as an entry that renders nothing.
:::

## Settings

This element has **no settings of its own** — it renders WooCommerce's own template, and its appearance comes from WooCommerce settings and your theme. The block says so in the sidebar rather than showing an empty panel.

:::note[It reads your shipping zones]
The threshold comes from a WooCommerce shipping zone, and the progress from the current cart —
nothing here is the block's to decide.

With no free-shipping method configured there is nothing to show, and the block says so rather than
rendering an empty bar.
:::
