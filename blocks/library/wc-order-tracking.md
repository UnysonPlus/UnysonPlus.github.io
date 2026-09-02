---
title: Order Tracking
description: The Unyson+ Order Tracking WooCommerce block — A form for customers to look up an order, authored in the block editor and rendered by the WooCommerce integration.
---

# Order Tracking

A form for customers to look up an order. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-order-tracking/front.png" alt="The Order Tracking block — an order-number and email lookup form" width="1210" />

## Options

| Option | What it does |
| --- | --- |
| (No options) | A self-contained form: the shopper enters their **order number** and **billing email**, and WooCommerce shows that order's status. Drop it on a "Track my order" page. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above uses the block's defaults on a store with sample products:

```html
<!-- wp:unysonplus/wc-order-tracking {"upOptions":{}} /-->
```

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
