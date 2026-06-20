---
title: "WooCommerce"
---

# WooCommerce

Integrates **[WooCommerce](https://woocommerce.com/)** with the Unyson+ framework. It makes any
active theme WooCommerce-aware, adds shop **page-builder elements**, and centralises the catalog
layout in one settings page. The extension is completely **inert until WooCommerce is installed
and active** — enabling it on a site without WooCommerce changes nothing.

## Activation

Install and activate **WooCommerce**, then enable **WooCommerce** under **Unyson → Extensions**.
That's it — no configuration is required to get a working shop; the defaults below apply until
you change them.

## What it does

### Theme-aware, with a universal fallback

- **With a WooCommerce-aware theme** (e.g. the **UnysonPlus Theme**, which ships its own shop
  wrappers, sidebar handling and styles), the extension steps aside and feeds its settings into
  the theme's `unysonplus_woocommerce_*` filters.
- **With any other theme**, the extension declares WooCommerce support itself (including the
  product-gallery zoom / lightbox / slider), ships a small baseline stylesheet, and drives
  WooCommerce's own layout filters — so the shop looks reasonable out of the box anywhere.

### Page-builder elements

While WooCommerce is active, a dedicated **WooCommerce Elements** tab appears in the page builder
with all of the elements below. See the full reference at
**[WooCommerce Elements](/docs/shortcodes/woocommerce-elements)**.

- **Catalog:** [Products](/docs/shortcodes/woocommerce-elements#products) (grid **or carousel**;
  recent / featured / on-sale / best-selling / top-rated / by category / tag / attribute / specific
  IDs), [Product Categories](/docs/shortcodes/woocommerce-elements#product-categories),
  [Single Product](/docs/shortcodes/woocommerce-elements#single-product),
  [Product Page](/docs/shortcodes/woocommerce-elements#product-page),
  [Add to Cart Button](/docs/shortcodes/woocommerce-elements#add-to-cart-button).
- **Cart & pages:** [Cart Icon](/docs/shortcodes/woocommerce-elements#cart-icon),
  [Mini Cart](/docs/shortcodes/woocommerce-elements#mini-cart),
  [Account](/docs/shortcodes/woocommerce-elements#account),
  [Free Shipping Bar](/docs/shortcodes/woocommerce-elements#free-shipping-bar), and the classic
  [Cart · Checkout · My Account · Order Tracking](/docs/shortcodes/woocommerce-elements#cart--checkout--my-account--order-tracking)
  page elements.
- **Utility:** [Product Search](/docs/shortcodes/woocommerce-elements#product-search) and
  [Product Filters](/docs/shortcodes/woocommerce-elements#product-filters).

The Products grid also supports **percentage / Featured / New / Out-of-stock badges**, low-stock
notices, a **Quick View** modal, and **Load More** (AJAX) pagination.

## Settings

**Unyson → Settings → WooCommerce.** These control the **shop / category archive** and **single
product** pages site-wide:

| Setting | Default | Controls |
| --- | --- | --- |
| **Products per Row** | 3 | Columns in the shop / category product grid |
| **Products per Page** | 12 | Products shown before pagination |
| **Shop Sidebar** | None | Sidebar position on WooCommerce pages *(with a WooCommerce-aware theme)* |
| **Gallery Thumbnail Columns** | 4 | Thumbnails below the main product image |
| **Related Products** | 3 | Related products on a single product page (`0` hides them) |

### Shop Behavior

| Setting | Default | Controls |
| --- | --- | --- |
| **Catalog Mode** | Off | Hide prices + add-to-cart store-wide (lookbook mode) |
| **Sale Badge Style** | Text | Native sale flash as “Sale” or a percentage (“-25%”) |
| **AJAX Add to Cart** | On | Add simple products from shop archives without a reload |
| **Shop Breadcrumb** | On | Show the WooCommerce breadcrumb above shop / product content |
| **Gallery Zoom / Lightbox / Slider** | On | Toggle each product-gallery feature |

## For developers — the filter contract

A WooCommerce-aware theme exposes these filters; the extension's settings feed them, and a theme
can also override them directly. (Under a non-aware theme the extension applies the same values
through WooCommerce's own filters — `loop_shop_columns`, `loop_shop_per_page`,
`woocommerce_product_thumbnails_columns`, `woocommerce_output_related_products_args`.)

| Filter | Default | Purpose |
| --- | --- | --- |
| `unysonplus_woocommerce_loop_columns` | `3` | Shop grid columns |
| `unysonplus_woocommerce_products_per_page` | `12` | Products per page |
| `unysonplus_woocommerce_sidebar` | `none` | Shop sidebar (`none` \| `left` \| `right`) |
| `unysonplus_woocommerce_thumbnail_columns` | `4` | Gallery thumbnail columns |
| `unysonplus_woocommerce_related_count` | `3` | Related-products count |

```php
// Example: force a 4-column shop grid regardless of the saved setting.
add_filter( 'unysonplus_woocommerce_loop_columns', function () {
    return 4;
} );
```

:::note Cart & Checkout: blocks vs. classic
WooCommerce 9+ ships **block-based** Cart and Checkout pages by default; those blocks carry their
own styling and render cleanly inside the theme. The UnysonPlus Theme also polishes the **classic
shortcode** Cart / Checkout (`[woocommerce_cart]` / `[woocommerce_checkout]`) and single-product
pages — switch those pages to the classic shortcodes if you want full theme control over their
markup.
:::
