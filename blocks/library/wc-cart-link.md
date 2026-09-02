---
title: Cart Link
description: The Unyson+ Cart Link WooCommerce block — A compact cart icon showing the current item count and total — for a header or menu bar, authored in the block editor and rendered by the WooCommerce integration.
---

# Cart Link

A compact cart icon showing the current item count and total — for a header or menu bar. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-cart-link/front.png" alt="The Cart Link block — a cart icon with an item count" width="62" />

## Options

| Option | What it does |
| --- | --- |
| Icon + counter | A cart glyph with a live item-count badge. |
| Total | Optionally show the running cart total beside the icon. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above uses the block's defaults on a store with sample products:

```html
<!-- wp:unysonplus/wc-cart-link {"upOptions":{}} /-->
```

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
