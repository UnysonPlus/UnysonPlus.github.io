---
title: Add to Cart
description: The Unyson+ Add to Cart WooCommerce block — A standalone add-to-cart button (with optional price and quantity) for a chosen product, authored in the block editor and rendered by the WooCommerce integration.
---

# Add to Cart

A standalone add-to-cart button (with optional price and quantity) for a chosen product. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-add-to-cart/front.png" alt="The Add to Cart block — a price, quantity and add-to-cart button" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Product (`product`) | The product the button adds to the cart. |
| Quantity (`quantity`) | Show a quantity selector beside the button. |
| Price (`show_price`, `price_position`) | Show the product price, before or after the button. |
| Before / After (`before`, `after`) | Short text around the button. |
| Button (`group_button`) | The button label and style. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above shows one seeded product:

```html
<!-- wp:unysonplus/wc-add-to-cart {"upOptions":{"product":"54"}} /-->
```

The `product` value is a product ID — pick the product in the block's inspector rather than typing it by hand.

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
