---
sidebar_position: 5
title: Store drivers
description: The FW_POS_Store interface, the WooCommerce implementation, and how each other WordPress e-commerce plugin is ranked as a target.
---

# Store drivers

A store driver translates ledger events into one e-commerce plugin's API. It is the only part of
POS Sync that knows WooCommerce (or FluentCart, or SureCart) exists.

## The interface

```php
abstract class FW_POS_Store {

    /** Machine id: 'woocommerce', 'fluentcart', … */
    abstract public function get_id();

    /** Is this cart present and usable right now? */
    abstract public function is_available();

    /**
     * What this cart can actually do. The ledger degrades gracefully
     * rather than throwing when a capability is absent.
     *
     * @return array {
     *   @type bool $partial_refunds
     *   @type bool $multi_location_stock
     *   @type bool $variations
     *   @type bool $create_orders
     *   @type bool $backorders
     * }
     */
    abstract public function get_capabilities();

    /**
     * Resolve a SKU (or GTIN) to an opaque store reference.
     *
     * @return string|null 'product:42', 'variation:87', or null when unmatched.
     */
    abstract public function find_by_sku( $sku, $gtin = null );

    /** Set an absolute stock level. */
    abstract public function set_stock( $store_ref, $quantity, $location_ref = null );

    /** Apply a relative delta. Returns the resulting level. */
    abstract public function adjust_stock( $store_ref, $delta, $location_ref = null );

    /** Record a completed till sale as an order, when the cart supports it. */
    abstract public function create_order( array $event );

    /** Refund an order, restocking unless $restock is false. */
    abstract public function refund_order( $order_ref, array $lines, $restock = true );
}
```

Everything crossing this boundary is a **primitive or an array** — a SKU string, an integer
quantity, an opaque `store_ref`. No `WC_Product` objects, no cart-specific types. That constraint
is what keeps the ledger portable.

:::info Two implementations, from day one
This interface was written while sketching **both** WooCommerce and FluentCart. An interface
designed against one implementation always encodes that implementation's assumptions — and you find
out at the second one, when it is expensive to fix. Sketching the second driver on paper costs an
afternoon; discovering `set_stock()` implicitly requires a Woo product object costs a rewrite.

Sketching is not shipping. Only WooCommerce ships in v1.
:::

## Ranking the targets

| Cart | Priority | Reasoning |
| --- | --- | --- |
| **WooCommerce** | **v1** | Largest install base by an order of magnitude. Mature stock API, Action Scheduler already present, well-understood variation model. |
| **FluentCart** | **Next** | The genuine second target: WP-native, actively developed, growing fast, and with no first-party POS story of its own. Custom tables rather than post meta — which is exactly why it makes a good honesty check on the interface. |
| **SureCart** | Later | Hybrid — catalog and orders are hosted, so it behaves partly like the Ecwid case below. Cheap once the seam is proven. |
| **Easy Digital Downloads** | Later | Mostly digital goods, so physical stock sync is a niche need. Trivial to add. |
| **Ecwid** | Last / probably never | See below. |

## WooCommerce

The reference implementation.

- **Stock** goes through `wc_update_product_stock()` rather than direct meta writes, so Woo's own
  hooks, low-stock notifications and status transitions fire normally.
- **SKU lookup** uses `wc_get_product_id_by_sku()`, then falls back to a variation query — variable
  products keep their SKUs on the variation, and a driver that only checks parents silently misses
  most real catalogs.
- **Orders** are created with the POS sale as the payment method (`pos_sync`), the till name in the
  order note, and `_pos_external_id` in meta so the order is traceable back to the ledger event.
- **Refunds** use `wc_create_refund()` with `restock_items` honouring the event's `restock` flag.
- **HPOS** (High-Performance Order Storage) is supported; all order access goes through the CRUD
  layer, never direct `wp_posts` queries.
- **Capabilities**: partial refunds ✔ · variations ✔ · create orders ✔ · backorders ✔ ·
  multi-location stock ✘ (needs a multi-inventory plugin; single stock source otherwise).

## FluentCart

Sketched to validate the interface; shipped post-1.0.

The useful difference is structural: FluentCart stores products and orders in **custom tables**, not
the post/meta model. A driver interface that quietly assumes `get_post_meta()` breaks immediately —
which is precisely why it is the right second target. Its variant model also differs enough from
Woo's variations to test whether `find_by_sku()` returning an opaque string was the right call.
(It was. Returning a post ID would not have survived.)

## Ecwid, and why it is ranked last

Worth being explicit, because Ecwid is a reasonable thing to ask for.

Ecwid is **SaaS**. Its products, inventory and orders live on Ecwid's servers; the WordPress plugin
is essentially an embed. So an "Ecwid store driver" would not write to a local database — it would
make REST calls to Ecwid. Which means:

- WordPress becomes a **relay** between the POS and Ecwid, adding a hop, a failure mode and a
  latency budget, while owning none of the data.
- Ecwid already ships **its own POS integrations**, including Square. Connecting the till straight
  to Ecwid is fewer moving parts and better supported.
- The ledger's guarantees weaken. Idempotency and ordering still hold locally, but the actual stock
  lives behind someone else's API with its own rate limits and consistency behaviour.

The honest recommendation for an Ecwid merchant is: **connect your POS to Ecwid directly.** A driver
would exist only if enough people ask for a specific thing Ecwid's own integrations cannot do.

The same reasoning applies, more mildly, to any hosted cart — including parts of SureCart.

## Choosing at runtime

Only one store driver is active at a time. On activation POS Sync detects the available carts and
picks the single available one; with more than one it asks, and the choice is stored in settings.

```php
add_filter( 'fw_pos_store_driver', function ( $driver_id ) {
    return 'fluentcart';
} );
```

## Writing your own

1. Extend `FW_POS_Store` in your own plugin.
2. Implement all eight methods. Declare capabilities honestly — claiming `partial_refunds` you
   cannot deliver produces silently wrong refunds, which is worse than declaring `false`.
3. Register it:

   ```php
   add_filter( 'fw_pos_store_drivers', function ( $drivers ) {
       $drivers['mycart'] = 'My_POS_Store_MyCart';
       return $drivers;
   } );
   ```

4. Run the [Virtual Terminal's adversarial scenarios](./testing.md#adversarial-scenarios) against
   it. They exist for exactly this — a driver that survives duplicate webhooks, out-of-order
   batches and partial refunds is a driver that works in a shop.
