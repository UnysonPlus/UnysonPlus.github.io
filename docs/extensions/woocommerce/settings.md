---
sidebar_position: 2
title: Settings
---

# Settings

Everything the extension controls lives on one page: **Unyson+ → WooCommerce**.

![The WooCommerce settings page](/img/extensions/woocommerce/settings-page.png)

The settings are grouped into three boxes. Only the first is expanded when the page loads — click a
box title to open the others (that's the framework's standard behavior for option boxes, not
something specific to this page).

:::tip[Where these apply]
These settings drive the **shop / category archives** and **single product** pages site-wide. They
do *not* override a page-builder element's own options — a
[Products](/shortcodes/woocommerce-elements#products) element placed on a page has its own columns
and query settings, and uses those. The one exception is [Catalog Mode](./catalog-mode.md), which is
deliberately store-wide and reaches the elements too.
:::

## Shop Catalog

![The Shop Catalog settings](/img/extensions/woocommerce/settings-shop-catalog.png)

| Setting | Default | What it controls |
| --- | --- | --- |
| **Products per Row** | `3` | Columns in the shop / category product grid on desktop. Choose 2–6. |
| **Products per Page** | `12` | How many products show before pagination on shop / category pages. |
| **Shop Sidebar** | `None (full width)` | Sidebar position on WooCommerce pages: None, Left or Right. |

:::note[Shop Sidebar needs a WooCommerce-aware theme]
Sidebar placement is a *theme* decision — the extension can only ask for it. With the **UnysonPlus
Theme** (or any theme implementing the `unysonplus_woocommerce_sidebar` filter) this works as you'd
expect. Under any other theme the setting is ignored and the theme's own sidebar handling applies.
:::

## Single Product

![The Single Product settings](/img/extensions/woocommerce/settings-single-product.png)

| Setting | Default | What it controls |
| --- | --- | --- |
| **Gallery Thumbnail Columns** | `4` | Number of thumbnail columns below the main product image. |
| **Related Products** | `3` | How many related products show on a single product page. Use `0` to hide them entirely. |
| **Gallery Zoom** | On | Magnify the product image on hover. |
| **Gallery Lightbox** | On | Open product images in a fullscreen lightbox. |
| **Gallery Slider** | On | Use a thumbnail slider for the product gallery. |

The three gallery switches map to WooCommerce's own theme-support features
(`wc-product-gallery-zoom`, `-lightbox`, `-slider`). Turning one off removes that theme support, so
the corresponding script is never loaded — this is a real page-weight saving on product pages, not
just a visual toggle.

:::note[Gallery settings and your theme]
These apply when the **extension** declared WooCommerce support (i.e. your theme didn't). A theme
that declares the gallery features itself keeps control of them; the extension will not remove a
feature the theme explicitly asked for unless the corresponding setting is off.
:::

## Shop Behavior

![The Shop Behavior settings](/img/extensions/woocommerce/settings-shop-behavior.png)

| Setting | Default | What it controls |
| --- | --- | --- |
| **Catalog Mode** | Off | Hide prices and add-to-cart buttons across the shop — the lookbook switch. |
| **Disable Purchasing** | Off | With Catalog Mode on: makes the store genuinely un-buyable. |
| **Closed-Shop Message** | *(empty)* | With Disable Purchasing on: shown in place of the Cart / Checkout content. Empty = redirect to the shop instead. |
| **Enquiry Button** | Off | With Catalog Mode on: a link where the add-to-cart button used to be. |
| **Enquiry Button Text** | `Request a Quote` | The enquiry button's label. |
| **Enquiry Link** | *(empty)* | Where the enquiry button goes. Required — without it, no button is shown. |
| **Sale Badge Style** | `Text ("Sale")` | Whether the sale flash reads “Sale” or a percentage (“-25%”). |
| **AJAX Add to Cart** | On | Add simple products to the cart from shop archives without a page reload. |
| **Shop Breadcrumb** | On | Show the WooCommerce breadcrumb above shop / product content. |

The first five settings are one feature with several dials —
**[Catalog Mode](./catalog-mode.md)** covers them properly, including what each one blocks and what
it deliberately leaves working.

### Sale Badge Style

`Text` leaves WooCommerce's own “Sale!” flash alone. `Percent` replaces it with the actual discount,
computed per product from its regular and sale prices — a product at 200 reduced to 150 shows
`-25%`. Products without a valid sale price are untouched.

### AJAX Add to Cart

This overrides WooCommerce's own “Enable AJAX add to cart buttons on archives” option
(**WooCommerce → Settings → Products**). Leave it on unless the theme does something custom with the
loop button. It has no effect on single product pages, which always post the form.

### Shop Breadcrumb

Off removes `woocommerce_breadcrumb` from `woocommerce_before_main_content`. If your theme renders
its own breadcrumb (the UnysonPlus Theme does, via the
**[Breadcrumbs](/extensions/breadcrumbs)** extension), turning this off avoids showing two.

## Saving

The page saves on **Save Changes** and reloads with a confirmation notice. Values are merged over
what's already stored rather than written wholesale, so a setting that isn't on the form keeps its
value.

:::note[Where the values actually live]
All of it is stored as the extension's settings option, readable anywhere with
`fw_get_db_ext_settings_option( 'woocommerce', '<key>' )`. The
**[developer reference](./developers.md#reading-a-setting)** lists every key. The Extensions-manager
card's *Settings* link points at this same page, so there is one screen rather than two that can
disagree.
:::
