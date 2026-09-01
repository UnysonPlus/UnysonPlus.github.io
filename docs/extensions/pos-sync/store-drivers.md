---
sidebar_position: 5
title: Store drivers
description: The FW_POS_Store interface, the WooCommerce implementation, and how each other WordPress e-commerce plugin is ranked as a target.
---

# Store drivers

A store driver translates ledger events into one e-commerce plugin's API. It is the only part of
POS Sync that knows WooCommerce (or FluentCart, or SureCart) exists.

:::info Shipped in 1.0.1
The seam and the WooCommerce driver are built. Exactly one driver is active at a time — with a
single cart installed it is chosen for you; with several, you pick on the Settings tab, because
guessing which cart owns a shop's stock is not a decision code should make silently.
:::

## The interface

```php
abstract class FW_POS_Store {

    /** Machine id: 'woocommerce', 'fluentcart', … */
    abstract public function get_id();

    /** Human label for the settings screen. */
    abstract public function get_label();

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

    /** Human-readable name for a reference, for the admin screens. */
    abstract public function describe( $store_ref );

    /** Set an absolute stock level. */
    abstract public function set_stock( $store_ref, $quantity, $location_ref = null );

    /** Apply a relative delta. */
    abstract public function adjust_stock( $store_ref, $delta, $location_ref = null );

    /** Record a completed till sale as an order, when the cart supports it. */
    abstract public function create_order( array $event, array $payload );

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

| Cart | Status | Notes |
| --- | --- | --- |
| **WooCommerce** | **Stable** | Largest install base by an order of magnitude. Mature stock API, Action Scheduler already present, well-understood variation model. |
| **FluentCart** | **Experimental** | WP-native, custom tables rather than post meta — which is exactly why the interface was drafted against it. Written against a documented API; not verified against a live install. |
| **SureCart** | **Experimental** | Hybrid: catalog and inventory are hosted, so every write is a remote call with somebody else's latency and rate limits. Written against a documented API; not verified. |
| **Easy Digital Downloads** | **Shipped, limited** | EDD has **no core inventory** — digital goods have no finite quantity. The driver honours the `_edd_stock` meta that inventory add-ons use and otherwise reports `stock_not_managed`. |
| **Ecwid** | Not planned | See below. |

:::warning What "experimental" means here
FluentCart, SureCart and Clover were written against documented APIs with no live install to check
against. Each one **refuses to activate unless every function it calls is actually present** — so a
wrong assumption disables the driver rather than writing wrong numbers into a shop. Events keep
being recorded, resolve to `no_store_driver`, and stay re-queueable.

The badge travels with the driver name everywhere it is offered, and the Settings screen
distinguishes "not installed" from "installed but this driver does not fit it". The second is a bug
report, and the [diagnostic report](./troubleshooting.md#the-diagnostic-report) contains exactly
which function was missing.
:::

## WooCommerce

The reference implementation, shipped.

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

Shipped, experimental.

The useful difference is structural: FluentCart stores products and orders in **custom tables**, not
the post/meta model. A driver interface that quietly assumes `get_post_meta()` breaks immediately —
which is precisely why it was the right second target. Its variant model also differs enough from
Woo's variations to test whether `find_by_sku()` returning an opaque string was the right call.
(It was. Returning a post ID would not have survived.)

`is_available()` requires the specific functions the driver calls, and that list *is* the
compatibility contract. If FluentCart's API differs, the Settings screen names the missing
functions rather than the driver half-working.

## Easy Digital Downloads

Shipped, and honest about its limits.

**EDD has no core inventory.** It sells digital goods, where the whole point is that there is no
finite quantity. There is an optional per-download *purchase limit*, but that is a cap on how many
times a file may be sold — not a stock level, and decrementing it from till sales would be a
different thing wearing the same word.

So the driver honours the `_edd_stock` meta that the common inventory add-ons use, and otherwise
reports `stock_not_managed`, which the applier already treats as a correct outcome rather than a
failure. An EDD shop selling only downloads will see events recorded, logged and skipped with a
legible reason. That is the right answer — a driver that invented stock for digital goods would
have been worse than none.

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

## What the applier guarantees

These rules live above the seam, in `FW_POS_Applier`, so every driver gets them for free — and no
driver should work around them:

- **`retry: true` means transient; `retry: false` means a decision.** "The cart is down" is worth
  retrying. "This SKU does not exist" will be just as true in five minutes, and retrying it five
  times only fills the log.
- **`stock_not_managed` is not a failure.** Plenty of catalogs deliberately do not track stock on
  some products; treating that as an error would retry forever.
- **An event with any unresolvable line is skipped whole.** Half a sale leaves stock wrong in a way
  nobody can see.
- **Test mode runs the entire pipeline** — matching included, so the unmatched queue still fills and
  a shop can fix its SKUs before going live — and stops only at the write.

## Writing your own

1. Extend `FW_POS_Store` in your own plugin.
2. Implement all nine methods. Declare capabilities honestly — claiming `partial_refunds` you
   cannot deliver produces silently wrong refunds, which is worse than declaring `false`.
3. Register it:

   ```php
   add_filter( 'fw_pos_store_drivers', function ( $drivers ) {
       $drivers['mycart'] = 'My_POS_Store_MyCart';
       return $drivers;
   } );
   ```

4. Run `tests/milestone-2.php` against it. It exercises the seam with a fake in-memory driver, so
   the assertions it makes are exactly the ones your driver has to satisfy.
