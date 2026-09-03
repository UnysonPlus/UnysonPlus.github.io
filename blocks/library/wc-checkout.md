---
title: Checkout
description: The Unyson+ Checkout WooCommerce block — the full checkout form with billing, shipping, order review and payment, authored in the block editor and rendered by the WooCommerce integration.
---

# Checkout

The **checkout form** — billing and shipping details, an order review, and payment — so you can place the checkout anywhere, not just on the default WooCommerce page. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active. With an empty cart it shows a "your cart is empty" notice instead of the form.
:::

<img src="/img/blocks/wc-checkout/front.png" alt="The Checkout block — billing, shipping and payment form" width="1210" />

## Options

| Option | What it does |
| --- | --- |
| Checkout form | The standard WooCommerce billing / shipping fields, order review and payment methods. |
| Empty state | A notice with a link back to the shop when the cart has no items. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above shows the checkout with an item in the cart:

```html
<!-- wp:unysonplus/wc-checkout {"upOptions":{}} /-->
```

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
