---
title: Free Shipping Bar
description: The Unyson+ Free Shipping WooCommerce block — a progress bar nudging shoppers toward the free-shipping threshold, authored in the block editor and rendered by the WooCommerce integration.
---

# Free Shipping Bar

A **progress bar** that tells shoppers how much more they need to spend to unlock free shipping — a proven nudge toward a bigger cart. It reads your store's free-shipping threshold and the current cart total live. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce + a free-shipping method
This block renders live store data, so it only works when the **WooCommerce** plugin is active **and** a shipping zone offers **Free Shipping with a minimum order amount** (WooCommerce → Settings → Shipping). Without that threshold there is nothing to count toward.
:::

<img src="/img/blocks/wc-free-shipping/front.png" alt="The Free Shipping Bar block — a progress bar toward the free-shipping threshold" width="1210" />

## Options

| Option | What it does |
| --- | --- |
| Progress bar | Fills as the cart total approaches the free-shipping minimum. |
| Messages | "Spend $X more for free shipping" while below the threshold, and a success message once it's met. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above shows the bar with an item in the cart, below the free-shipping threshold:

```html
<!-- wp:unysonplus/wc-free-shipping {"upOptions":{}} /-->
```

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
