---
title: Products
sidebar_position: 13
sidebar_custom_props: { icon: '/img/shortcode-icons/products.svg' }
---

# Products

Display a grid of **WooCommerce products** — recent, featured, on-sale, best-selling,
top-rated, or by category — with column, gap, image-ratio and alignment controls. The
card markup is clean and self-contained, while the **Add to Cart** button stays native
(AJAX add-to-cart and variable-product support are preserved).

:::note Requires WooCommerce
This element is part of the **[WooCommerce extension](/docs/extensions/woocommerce)** and only
appears in the builder when WooCommerce is active. Tabs: **Content**, **Style**,
**Animations**, **Advanced**.
:::

<img src="/img/shortcodes/products-backend.png" alt="Products element on the Page Builder canvas" width="936" />

## Content

<img src="/img/shortcodes/products-content.png" alt="Products options panel — Content tab" width="840" />

| Option | Choices |
| --- | --- |
| **Source** | Recent · Featured · On Sale · Best Selling · Top Rated · By Category |
| **Category** | A product category, or *All Categories*. With **By Category** it picks the category; for other sources it further filters the results. |
| **Number of Products** | How many to show (use `-1` for all) |
| **Order By** | Date · Title · Price · Popularity (sales) · Average Rating · Menu Order · Random — *Best Selling / Top Rated / On Sale set their own order and ignore this* |
| **Order** | Descending · Ascending |
| **Sale Badge** | Show a “Sale” badge on discounted products |
| **Star Rating** | Show the average star rating (when a product has reviews) |
| **Price** | Show the product price |
| **Add to Cart Button** | Show the native add-to-cart button |

## Style

<img src="/img/shortcodes/products-style.png" alt="Products options panel — Style tab" width="840" />

| Option | Choices |
| --- | --- |
| **Columns** | 2 · 3 · 4 · 5 · 6 (desktop; collapses to 2, then 1 on smaller screens) |
| **Gap** | Small · Medium · Large |
| **Image Ratio** | Natural · Square (1:1) · Portrait (3:4) · Landscape (4:3) |
| **Text Alignment** | Inherit · Left · Center · Right (title / price / button inside each card) |

:::tip Shop-page defaults vs. this element
This element controls **its own** grid wherever you place it. The **shop / category archive**
columns, products-per-page, related-products count and gallery thumbnails are set globally in
the [WooCommerce extension settings](/docs/extensions/woocommerce#settings).
:::
