---
title: Add to Cart
---

# Add to Cart

An add-to-cart button for one product, with optional price and quantity.

The block renders through the `wc_add_to_cart` element — the same PHP that runs in the page builder, so the front
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
| `quantity` | Default quantity |
| `label` | Button text |
| `show_price` | Show the price |
| `price_position` | Where the price sits |
| `style` | Button preset |
| `size` | Button size |
| `shape` | Button shape |
| `width` | Button width |
| `alignment` | Alignment |
| `hover_animation` | Hover effect |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[For a landing page selling one thing]
Reach for this rather than the whole Product Page when the page is the sales pitch and the button is
the only WooCommerce part of it.
:::

:::note[A deleted product is named, not silent]
If the product this button points at is removed, the block says so rather than vanishing.
:::
