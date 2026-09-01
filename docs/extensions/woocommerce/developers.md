---
sidebar_position: 5
title: For developers
---

# For developers

Everything below is stable, public surface — the filter contract a theme implements, the helpers a
child theme or another extension can call, and the option keys behind the settings page.

## The theme contract

The extension detects whether the active theme is WooCommerce-aware and wires its settings to one of
two sets of filters. The detection happens at `after_setup_theme` (priority 99), after the theme has
had its say.

### A WooCommerce-aware theme

If the theme declares WooCommerce support itself, the extension steps aside and feeds these filters
instead — the theme owns the markup and decides what to do with the values:

| Filter | Default | Purpose |
| --- | --- | --- |
| `unysonplus_woocommerce_loop_columns` | `3` | Shop grid columns |
| `unysonplus_woocommerce_products_per_page` | `12` | Products per page |
| `unysonplus_woocommerce_sidebar` | `none` | Shop sidebar (`none` \| `left` \| `right`) |
| `unysonplus_woocommerce_thumbnail_columns` | `4` | Gallery thumbnail columns |
| `unysonplus_woocommerce_related_count` | `3` | Related-products count |

A theme can also override them directly, which wins over the saved setting:

```php
// Force a 4-column shop grid regardless of what is saved in the settings.
add_filter( 'unysonplus_woocommerce_loop_columns', function () {
    return 4;
} );
```

### Any other theme

When no theme integration is present, the same values are applied through WooCommerce's own filters
— `loop_shop_columns`, `loop_shop_per_page`, `woocommerce_product_thumbnails_columns` and
`woocommerce_output_related_products_args` — plus `add_theme_support( 'woocommerce' )` and the
gallery features, and a small baseline stylesheet.

You do not choose between the two paths; the extension picks the right one.

## Helper functions

All of these are defined in the extension's `helpers.php`, are safe to call whether or not
WooCommerce is active, and are guarded with `function_exists()` so they can be safely called from a
theme that might run without the extension.

### `upwc_wc_catalog_mode()`

```php
if ( function_exists( 'upwc_wc_catalog_mode' ) && upwc_wc_catalog_mode() ) {
    // The store is a lookbook — do not print a price or a cart button.
}
```

True when [Catalog Mode](./catalog-mode.md) is on, whether or not Disable Purchasing is on with it.

Catalog Mode works by unhooking WooCommerce's price / add-to-cart *templates*. Anything that renders
a price or cart button **without** going through those hooks — a custom card, a widget, a theme
partial — must check this helper, or it will keep selling from a shop that is meant to be a catalog.

### `upwc_wc_catalog_locked()`

```php
if ( function_exists( 'upwc_wc_catalog_locked' ) && upwc_wc_catalog_locked() ) {
    return; // Nothing can be bought — this element has nothing to do.
}
```

True when Catalog Mode **and** Disable Purchasing are both on. Use it to hide anything that only
makes sense in a shop that sells: a cart link, a mini-cart, a checkout button. The extension's own
shop-only elements gate on exactly this.

### `upwc_wc_enquiry_html( $product )`

```php
echo upwc_wc_enquiry_html( $product ); // '' when the enquiry button is off or unconfigured
```

Returns the [enquiry button](./catalog-mode.md#enquiry-button) markup for one product, or an empty
string. Already escaped. Use it if you are rendering your own product card and want the same button
the archives get.

### `upwc_wc_truthy( $value )`

Normalizes a stored switch value (`'yes'`, `'1'`, `true`, …) to a boolean. Settings are stored as
strings, so compare with this rather than `== true`.

## Reading a setting

Every value on the settings page is stored in the extension's settings option:

```php
$columns = fw_get_db_ext_settings_option( 'woocommerce', 'shop_columns' );
$mode    = upwc_wc_truthy( fw_get_db_ext_settings_option( 'woocommerce', 'catalog_mode' ) );
```

### Option keys

| Key | Type | Default |
| --- | --- | --- |
| `shop_columns` | select `2`–`6` | `3` |
| `products_per_page` | text (number) | `12` |
| `shop_sidebar` | `none` \| `left` \| `right` | `none` |
| `gallery_thumbnail_columns` | select `2`–`6` | `4` |
| `related_count` | text (number) | `3` |
| `gallery_zoom` | `yes` \| `no` | `yes` |
| `gallery_lightbox` | `yes` \| `no` | `yes` |
| `gallery_slider` | `yes` \| `no` | `yes` |
| `catalog_mode` | `yes` \| `no` | `no` |
| `catalog_lock_purchasing` | `yes` \| `no` | `no` |
| `catalog_closed_notice` | textarea | *(empty)* |
| `catalog_enquiry` | `yes` \| `no` | `no` |
| `catalog_enquiry_label` | text | `Request a Quote` |
| `catalog_enquiry_url` | text | *(empty)* |
| `sale_badge_style` | `text` \| `percent` | `text` |
| `ajax_add_to_cart` | `yes` \| `no` | `yes` |
| `show_breadcrumb` | `yes` \| `no` | `yes` |

### Reacting to a save

```php
add_action( 'fw_extension_settings_form_saved:woocommerce', function ( $before ) {
    // $before = the values as they were prior to this save.
    // Flush a cache, regenerate a stylesheet, …
} );
```

This fires whether the settings were saved from the Unyson+ → WooCommerce page or from the
Extensions manager, so a listener does not need to know which screen was used.

## What Disable Purchasing hooks

Useful to know if you are debugging why something will not add to the cart. When Catalog Mode and
Disable Purchasing are both on, the extension registers:

| Hook | Value |
| --- | --- |
| `woocommerce_is_purchasable` | `false` (priority 99) |
| `woocommerce_variation_is_purchasable` | `false` (priority 99) |
| `woocommerce_get_price_html` | `''` (priority 99) |
| `woocommerce_loop_add_to_cart_link` | `''` (priority 99) |
| `woocommerce_add_to_cart_validation` | `false` (priority 99) |
| `wp_loaded` @5 | removes `WC_Form_Handler::add_to_cart_action` and scrubs the `add-to-cart` request parameter |
| `template_redirect` | redirects Cart / Checkout to the shop, or renders the closed-shop message |

These are registered during `after_setup_theme` rather than on `wp`, because WooCommerce's
add-to-cart form handler runs on `wp_loaded` — waiting for the query would be too late to stop it.

To exempt something, run at a later priority than 99, or turn the setting off and implement your own
policy.

## The settings page

The settings page is `FW_Woocommerce_Settings_Page` and registers at
`admin.php?page=fw-woocommerce-settings`, under the `fw-extensions` parent menu, on `admin_menu`
priority 20. It only registers when the WooCommerce plugin is active.

It renders the extension's own `settings-options.php` schema through `fw()->backend->render_options()`
and saves on the page's `load-` hook, merging over stored values rather than writing wholesale. The
Extensions-manager card's *Settings* link is filtered (`fw_ext_manager_settings_url`) to point here,
so there is a single settings screen rather than two that can disagree.

## Element rendering

The product-card markup for `[wc_products]`, `[wc_product]` and the Load More / Quick View AJAX
endpoints is shared in `includes/products-render.php`, so the initial render, the appended pages and
the modal produce identical output. The mini-cart markup is shared between the `wc_mini_cart`
shortcode and the header/footer element by `upwc_render_mini_cart()` in
`includes/mini-cart-render.php`.

If you are adding an element that prints a price or a cart button, gate it on
`upwc_wc_catalog_mode()` / `upwc_wc_catalog_locked()` — that is the whole reason those helpers are
public.
