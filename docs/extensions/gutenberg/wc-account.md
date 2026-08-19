---
title: Account Link
sidebar_position: 99
---

# Account Link

A link to the account page, for a header.

The block renders through the `wc_account` element — the same PHP that runs in the page builder, so the front
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
| `show_label` | Show text beside the icon |
| `trigger` | What the link does |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[Where it goes depends on who is looking]
Logged out, it leads to the login form; logged in, to the account area. The canvas shows the state of
whoever is editing — which is always logged in.
:::
