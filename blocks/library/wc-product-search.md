---
title: Product Search
description: The Unyson+ Product Search WooCommerce block — A search form scoped to products only (not posts or pages), authored in the block editor and rendered by the WooCommerce integration.
---

# Product Search

A search form scoped to products only (not posts or pages). It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-product-search/front.png" alt="The Product Search block — a product-only search field" width="392" />

## Options

| Option | What it does |
| --- | --- |
| Field + submit | A search field wired to WooCommerce product results. |
| Placeholder + shape | The prompt text and the field shape (attached button, pill, and so on). |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above uses the block's defaults on a store with sample products:

```html
<!-- wp:unysonplus/wc-product-search {"upOptions":{}} /-->
```

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
