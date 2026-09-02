---
title: Cart
description: The Unyson+ Cart WooCommerce block — The full cart page — line items, quantities and totals. Shows an empty-cart notice when there is nothing in it, authored in the block editor and rendered by the WooCommerce integration.
---

# Cart

The full cart page — line items, quantities and totals. Shows an empty-cart notice when there is nothing in it. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-cart/front.png" alt="The Cart block — the WooCommerce cart contents (empty state)" width="1210" />

## Options

| Option | What it does |
| --- | --- |
| Cart table | The standard WooCommerce cart: products, quantities, and the order total. |
| Empty state | A "your cart is empty" notice with a link back to the shop when there are no items. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above uses the block's defaults on a store with sample products:

```html
<!-- wp:unysonplus/wc-cart {"upOptions":{}} /-->
```

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
