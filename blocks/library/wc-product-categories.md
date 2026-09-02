---
title: Product Categories
description: The Unyson+ Product Categories WooCommerce block — A grid of product categories, authored in the block editor and rendered by the WooCommerce integration.
---

# Product Categories

A grid of product categories. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-product-categories/front.png" alt="The Product Categories block — a grid of WooCommerce category cards" width="1210" />

## Options

| Option | What it does |
| --- | --- |
| Which categories (`number`, `parent`, `ids`, `hide_empty`) | How many, from which parent, specific ones by ID, and whether to skip empty categories. |
| Order (`orderby`, `order`) | Sort by name, count, and so on. |
| Layout (`columns`, `gap`, `card_rows`, `image_ratio`, `box_style`) | Columns, spacing and the category-card style. |
| Button (`button_text`) | The label on each category link. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above uses the block's defaults on a store with sample products:

```html
<!-- wp:unysonplus/wc-product-categories {"upOptions":{}} /-->
```

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
