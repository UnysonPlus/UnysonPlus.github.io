---
title: Product
description: The Unyson+ Product WooCommerce block — A single product card — image, title, price, rating and an add-to-cart button — for any product you pick, authored in the block editor and rendered by the WooCommerce integration.
---

# Product

A single product card — image, title, price, rating and an add-to-cart button — for any product you pick. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-product/front.png" alt="The Product block — a single product card" width="314" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Product (`product`) | The product to show — pick it by name in the block; it stores the product ID. |
| Card (`tab_card`, `group_product`) | The same card styling as the Products grid — image ratio, badges, rating, button label — so a lone product matches the grid. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above shows one seeded product:

```html
<!-- wp:unysonplus/wc-product {"upOptions":{"product":"54"}} /-->
```

The `product` value is a product ID — pick the product in the block's inspector rather than typing it by hand.

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
