---
sidebar_position: 9
title: "Shop Developer Reference: Products, Variants, Stock and Hooks"
sidebar_label: "For developers"
description: "The Unyson+ Shop API for developers: read and write products and variants, change stock with a logged reason, hold stock while a customer pays, grant protected downloads, read enquiries, render cards and grids, and the filters and actions the shop fires."
keywords: [wordpress shop api, product variants api, stock api, shop hooks, unyson shop developer, product query]
---

# For developers

Guard code that talks to Shop with `class_exists( 'FW_Shop_Products' )`: the extension may not be active.

| Class | What it owns |
| --- | --- |
| `FW_Shop_Products` | The post type `fw_product`, taxonomies `fw_product_cat` and `fw_product_tag`, one product as a whole |
| `FW_Shop_Variants` | What can be bought: price, sale price, SKU, stock, picture per combination |
| `FW_Shop_Stock` | Every change to a stock number, the history, holds |
| `FW_Shop_Files` | Protected downloads and the right to them |
| `FW_Shop_Fields` | Extra fields from Custom Fields |
| `FW_Shop_Catalog_Mode` | Price visibility, the product button, enquiries |
| `FW_Shop_Render` | Cards, grids, the product page |
| `FW_Shop_Settings` | The option `fw_ext_shop`, and money |
| `FW_Shop_Import_Export` | The spreadsheet and the Shop file |

## Every product has at least one variant

A product without options has exactly one variant, with no attributes. Price, SKU, stock and picture are
always on a variant, so there is no "simple or variable" branch.

```php
$p = FW_Shop_Products::get( $id );
// id, title, slug, url, status, excerpt, content, image_id, gallery[], type, featured,
// options [ { name, values[], style, colors{} } ], variants[], has_options,
// price_min, price_max, on_sale, in_stock, manage_stock, backorders, low_stock,
// weight, length, width, height, sale_from, sale_to, price_hidden,
// files[], download_limit, download_days, categories[], tags[]

foreach ( $p['variants'] as $v ) {
    // id, attrs { Size: 'M' }, label 'M / Red', sku, price, sale_price, current, on_sale,
    // stock, available (null = not counted), status in|low|out|backorder, image_id, weight, enabled
}
$first = FW_Shop_Products::default_variant( $p );   // the first one a customer can pick
```

## Write a product

```php
// One price:
$id = FW_Shop_Products::create( array(
    'title' => 'Ceramic mug', 'excerpt' => 'Holds 350 ml.', 'content' => 'Made in small batches.',
    'price' => 24, 'sku' => 'MUG-1', 'stock' => 20, 'manage_stock' => true,
    'categories' => array( 'Kitchen' ), 'tags' => array( 'gift' ), 'image_id' => 123,
) );

// With options:
$id = FW_Shop_Products::create( array(
    'title'    => 'T-shirt',
    'options'  => array(
        array( 'name' => 'Size', 'values' => array( 'S', 'M' ), 'style' => 'buttons' ),
        array( 'name' => 'Colour', 'values' => array( 'Red', 'Blue' ), 'style' => 'swatch',
               'colors' => array( 'Red' => '#c8463c', 'Blue' => '#3f6fb5' ) ),
    ),
    'variants' => array(
        array( 'attrs' => array( 'Size' => 'S', 'Colour' => 'Red' ), 'price' => 28, 'sku' => 'TEE-S-RED', 'stock' => 5 ),
        // … one per combination: FW_Shop_Variants::combinations( $options ) lists them
    ),
) );

FW_Shop_Products::save( $id, array( 'price_hidden' => true ) );   // only the keys given are touched
```

`variants` makes the product's variants exactly what you pass: missing ones are deleted. To change one thing
on a product with options, read its variants, change the row and pass them all back.

## Find products

```php
$q = FW_Shop_Products::query( array(
    'category' => 'kitchen',      // slug, id or an array
    'featured' => true,
    'on_sale'  => true,
    'in_stock' => true,
    'orderby'  => 'price',        // menu | date | title | price | price-desc | rand
    'per_page' => 12,
) );                               // a WP_Query

$id = FW_Shop_Products::find_by_handle( 'ceramic-mug' );
$v  = FW_Shop_Variants::by_sku( 'MUG-1' );
$v  = FW_Shop_Variants::find( $id, array( 'Size' => 'M', 'Colour' => 'Red' ) );
```

For your own `WP_Query`, sort and filter on the mirrored meta: `_fw_shop_price`, `_fw_shop_max_price`,
`_fw_shop_on_sale` (`1`/`0`), `_fw_shop_stock_status` (`instock`/`outofstock`), `_fw_shop_featured`,
`_fw_shop_sku`.

## Stock

Never write a stock number yourself. These log the change, send the low-stock email and keep lists right.

```php
FW_Shop_Stock::change( $variant_id, -2, 'sale', '', 'S-1042' );           // 2 sold on order S-1042
FW_Shop_Stock::set( $variant_id, 40, 'restock', 'Delivery from the supplier' );

// While a customer pays:
$ok = FW_Shop_Stock::hold( $variant_id, 2, $token );   // true, or WP_Error "Only 1 is left."
FW_Shop_Stock::commit( $token, 'S-1042' );             // paid: the hold becomes a sale (safe to call twice)
FW_Shop_Stock::release( $token );                      // gave up

$can  = FW_Shop_Stock::can_buy( $variant, $qty );      // true or WP_Error with words for the customer
$rows = FW_Shop_Stock::history( array( 'variant_id' => $variant_id ) );
```

Reasons: `first`, `restock`, `adjust`, `damaged`, `returned`, `sale`, `refund`, `import`, `pos`, or your own.

## Downloads

```php
$token = FW_Shop_Files::grant( $product_id, array( 'email' => 'a@b.c', 'ref' => 'S-1042' ) );
foreach ( FW_Shop_Files::links( $token ) as $l ) { /* $l['name'], $l['url'] */ }
FW_Shop_Files::revoke( $token );   // after a refund
```

## Show products

```php
echo FW_Shop_Render::grid( array( 'category' => 'kitchen', 'per_page' => 6, 'columns' => 3 ) );
echo FW_Shop_Render::card( $p, array( 'heading_tag' => 'h2', 'show_category' => true ) );
echo FW_Shop_Render::price_html( $p );          // respects hidden prices
echo FW_Shop_Render::single( $p );              // pictures + name, price, options, stock, the button
echo FW_Shop_Render::specs( $p['id'] );         // extra fields, weight and size
```

The element is `[shop_products show="featured" columns="4" count="4"]`.

**Templates.** A theme overrides the two views by copying them to
`framework-customizations/extensions/shop/views/single.php` and `archive.php`, or by having its own
`single-fw_product.php` / `archive-fw_product.php`.

## Catalog mode and enquiries

```php
FW_Shop_Settings::selling();                         // true once "Start selling online" was clicked
FW_Shop_Catalog_Mode::shows_price( $p );             // for the current visitor
FW_Shop_Catalog_Mode::button( $p );                  // { type: enquiry|link|none, label, url }
$id = FW_Shop_Catalog_Mode::enquire( array( 'product' => $p['id'], 'variant' => $v['id'], 'qty' => 3,
    'name' => 'Ana', 'email' => 'ana@example.com', 'message' => '…' ) );
$rows = FW_Shop_Catalog_Mode::query( array( 'status' => 'new' ) );
```

REST: `POST /wp-json/fw-shop/v1/enquiry` with `product`, `variant`, `qty`, `name`, `email`, `phone`, `message`
→ `{ ok, message }`. Public, rate limited.

## Selling

Selling is layered like the rest of the shop. **The shop holds no payment code**: the checkout asks the shared
Payments extension for the money and listens to what it reports.

| Class | Owns |
| --- | --- |
| `FW_Shop_Cart` | A visitor's cart: `{ variant_id: qty }` and a coupon code, never a price |
| `FW_Shop_Shipping` | Delivery zones and what delivery costs |
| `FW_Shop_Checkout` | Cart → order → payment, and what follows a payment |
| `FW_Shop_Orders` | Orders, their lines (a copy of what was bought) and their history; the only place a status changes |
| `FW_Shop_Emails` | The emails, one per status |
| `FW_Shop_Pages` / `FW_Shop_Rest` | The cart, checkout and order pages, and the API that redraws them |

```php
FW_Shop_Checkout::start_selling();                    // switch Payments on, make the two pages, selling = 1
FW_Shop_Cart::add( $variant_id, 2 );                  // true | WP_Error ("Only 3 are left.")
FW_Shop_Cart::set_coupon( 'WELCOME10' );              // a code from Payments → Coupons
$c = FW_Shop_Cart::contents();                        // { lines, count, subtotal, weight, needs_shipping, coupon, notices }
$t = FW_Shop_Cart::totals( $c, array( 'address' => array( 'country' => 'PH', 'postcode' => '1203' ), 'shipping_method' => '0-std' ) );
// { subtotal, discount, methods, shipping, shipping_label, tax, tax_label, tax_included, total, currency, … }

$r = FW_Shop_Checkout::place( array(
    'email' => 'ana@example.com', 'name' => 'Ana Cruz',
    'address' => array( 'line1' => '12 Mabini St', 'city' => 'Manila', 'postcode' => '1203', 'country' => 'PH' ),
    'shipping_method' => '0-std', 'payment' => 'offline:offline',
) );
// WP_Error (code = the field: email, name, country, line1, city, shipping, payment, terms, cart, stock, coupon)
// or { order, status: redirect|on_hold|paid, redirect?, instructions? }

FW_Shop_Orders::get_by_number( 'S-1001' );            // with items, needs_ship
FW_Shop_Orders::query( array( 'status' => 'open' ) ); // paid + packed + on_hold
FW_Shop_Orders::move( $id, array( 'paid' ), 'packed', 'note' );   // true only for the call that changed it
FW_Shop_Shipping::methods_for( $address, $c );        // [ { id, label, cost } ], cheapest first, or WP_Error
```

**How an order follows its payment.** The charge is made with source `shop`, source_id = the order id and
reference = the order number. Then `unysonplus_payments_waiting` → **on_hold** (stock taken),
`_paid` → **paid** (stock taken once, cart emptied, downloads granted; an order with nothing to ship goes on to
**completed**), `_failed` / `_cancelled` → **cancelled** (stock and downloads back), `_refunded` → the refunded
amount, and **refunded** when it is everything. A payment that arrives after an order was cancelled still
marks it paid: money received is never ignored.

**Statuses:** `pending` (checkout started, not listed) · `on_hold` · `paid` · `packed` · `shipped` ·
`completed` · `cancelled` · `refunded`.

**REST** (`/wp-json/fw-shop/v1/`, open while the shop sells, `403` otherwise). A logged-in browser sends
`X-WP-Nonce`; get one from `admin-ajax.php?action=fw_shop_nonce` (pages may be cached).

| Route | Body | Answer |
| --- | --- | --- |
| `GET cart` | | `{ count, html }` |
| `POST cart/add` | `variant`, `qty` | `{ ok, message, count, cart_url }` |
| `POST cart/set` | `variant`, `qty` (0 removes) | `{ ok, message, count, html }` |
| `POST cart/coupon` | `code` (`''` removes) | `{ ok, message, count, html }` |
| `POST checkout/quote` | `address`, `shipping_method`, `payment`, `email` | `{ choices, summary, count }` |
| `POST checkout` | the checkout form | `{ ok, status, number, redirect }` or `{ ok: false, message, field }` |

The `html`, `choices` and `summary` are the pages' own renderings, so a redraw can never differ from the page.

**Shortcodes:** `[shop_cart]`, `[shop_checkout]` (builder elements; the checkout page also shows an order when
the address has `?fw_order=NUMBER&key=KEY`), `[shop_cart_link]` (Cart and the count).

## Hooks

| Action | When |
| --- | --- |
| `unysonplus_shop_product_saved ( $id )` | A product was saved through the shop |
| `unysonplus_shop_stock_changed ( $variant, $after, $delta, $reason, $ref )` | A stock number changed |
| `unysonplus_shop_low_stock ( $variant, $level )` | Once, when a variant falls to its low level |
| `unysonplus_shop_enquiry ( $enquiry, $product )` | A visitor asked about a product |
| `unysonplus_shop_downloaded ( $grant, $file )` | A customer downloaded a file |
| `unysonplus_shop_imported ( $report )` | An import finished |
| `unysonplus_shop_before_single`, `unysonplus_shop_after_single ( $product )` | Around the product page |
| `unysonplus_shop_order_{status} ( $order )` | An order reached a status: `_paid`, `_shipped`, `_cancelled`… |
| `unysonplus_shop_order_status ( $order, $old )` | After any status change |
| `unysonplus_shop_order_refund ( $order, $amount )` | Money was returned on an order |

| Filter | Use |
| --- | --- |
| `unysonplus_shop_product` | Change a product as it is read |
| `unysonplus_shop_products_query` | Change the `WP_Query` arguments of a product list |
| `unysonplus_shop_price_html` | Change how a price is written |
| `unysonplus_shop_shows_price` | Decide who sees a price (a trade-customer role, for example) |
| `unysonplus_shop_catalog_button` | Change the product button |
| `unysonplus_shop_product_action` | Replace the product button altogether |
| `unysonplus_shop_card`, `unysonplus_shop_single` | Change a card's or the product page's HTML |
| `unysonplus_shop_specs` | Add, change or hide specification rows |
| `unysonplus_shop_enquiry_mail`, `unysonplus_shop_low_stock_mail` | Change an email, or return `false` to send none |
| `unysonplus_shop_enquiry_to_crm` | Whether enquiries go to the CRM |
| `unysonplus_shop_setting` | Change a setting as it is read |
| `unysonplus_shop_capability` | Who may run the shop (default `manage_options`) |
| `unysonplus_shop_selling` | Whether the shop sells |
| `unysonplus_shop_cart` | Change the cart's contents as they are read |
| `unysonplus_shop_shipping_methods ( $methods, $address, $contents )` | Add or change delivery choices (a carrier's live rates) |
| `unysonplus_shop_countries` | Rename or add countries |
| `unysonplus_shop_email ( $mail, $type, $order )` | Change an order email, or return `false` to send none |
| `unysonplus_shop_customer_role` | The role of an account made at checkout |

Example: show prices only to a "trade" role.

```php
add_filter( 'unysonplus_shop_shows_price', function ( $yes, $product ) {
    return current_user_can( 'trade_customer' );
}, 10, 2 );
```

## Tables

`{prefix}fw_shop_variants`, `fw_shop_stock_log`, `fw_shop_holds`, `fw_shop_enquiries`, `fw_shop_downloads`,
`fw_shop_carts`, `fw_shop_orders`, `fw_shop_order_items`, `fw_shop_order_events`.
They are kept when the extension is switched off.
