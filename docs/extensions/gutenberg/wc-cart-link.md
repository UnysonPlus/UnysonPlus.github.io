---
title: Cart Link
sidebar_position: 97
---

# Cart Link

A link to the cart, with an item count and total — for a header.

The block renders through the `wc_cart_link` element — the same PHP that runs in the page builder, so the front
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
| `icon` | The cart icon |
| `label` | Text beside it |
| `show_count` | Show the item count |
| `show_total` | Show the cart total |
| `hide_when_empty` | Hide it when the cart is empty |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[The canvas shows YOUR cart]
This element renders the cart of the session it is rendered for, so an empty cart in the editor is
your cart being empty — not a placeholder.
:::

:::note[`hide_when_empty` is a small judgement call]
Hiding an empty cart is tidier; showing it tells a returning visitor their cart really is empty rather
than missing.
:::
