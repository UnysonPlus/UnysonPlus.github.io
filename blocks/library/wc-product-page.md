---
title: Product Page
description: The Unyson+ Product Page WooCommerce block — A full single-product layout — gallery, summary, add-to-cart, tabs and related products — for a product you pick, anywhere on the site, authored in the block editor and rendered by the WooCommerce integration.
---

# Product Page

A full single-product layout — gallery, summary, add-to-cart, tabs and related products — for a product you pick, anywhere on the site. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-product-page/front.png" alt="The Product Page block — the gallery and summary of a full single-product layout" width="601" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Product (`product`) | The product whose full page to render — gallery, price, add-to-cart, description tabs and related products. |
| Content (`tab_content`, `group_product`) | Which parts of the standard single-product template to include. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above shows one seeded product:

```html
<!-- wp:unysonplus/wc-product-page {"upOptions":{"product":"54"}} /-->
```

The `product` value is a product ID — pick the product in the block's inspector rather than typing it by hand.

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
