---
title: Mini Cart
description: The Unyson+ Mini Cart WooCommerce block — A cart icon that opens a slide-out panel listing what's in the cart, with a checkout link, authored in the block editor and rendered by the WooCommerce integration.
---

# Mini Cart

A cart icon that opens a slide-out panel listing what's in the cart, with a checkout link. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-mini-cart/front.png" alt="The Mini Cart block — a cart icon that opens a slide-out panel" width="62" />

## Options

| Option | What it does |
| --- | --- |
| Trigger icon | A cart glyph with an item-count badge. |
| Slide-out panel | Opens a panel with line items, subtotal and links to the cart and checkout. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above uses the block's defaults on a store with sample products:

```html
<!-- wp:unysonplus/wc-mini-cart {"upOptions":{}} /-->
```

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
