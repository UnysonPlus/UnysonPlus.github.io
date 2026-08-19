---
title: My Account
sidebar_position: 103
---

# My Account

WooCommerce's account area — orders, addresses, details.

The block renders through the `wc_my_account` element — the same PHP that runs in the page builder, so the front
end is identical either way.

:::caution[Needs the WooCommerce extension *and* the WooCommerce plugin]
This element ships with the **WooCommerce** extension, which is inactive by default, and it needs the
**WooCommerce plugin** installed and active.

With either missing the block does not register at all — so it appears in the inserter exactly when it
can actually work, rather than as an entry that renders nothing.
:::

:::caution[A page-level element — placement matters]
WooCommerce routes real behaviour through the pages configured under *WooCommerce → Settings →
Advanced*. Placing this block on some other page renders something that **looks** right without being
the page the shop is configured to use.

Use it to rebuild the configured page with UnysonPlus elements around it — not to create a second one.
:::

## Settings

This element has **no settings of its own** — it renders WooCommerce's own template, and its appearance comes from WooCommerce settings and your theme. The block says so in the sidebar rather than showing an empty panel.

:::note[Logged-out visitors see the login form]
The canvas shows whichever state the editing user is in, which is always logged in — so the login form
is the one state you cannot preview here.
:::
