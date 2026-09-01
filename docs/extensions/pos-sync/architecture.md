---
sidebar_position: 3
title: Architecture
description: The normalized ledger, the two driver seams, the data model, and the ordering and idempotency rules that keep stock correct.
---

# Architecture

POS Sync has one structural idea: **a normalized ledger in the middle, with a driver seam on each
side.** Everything else is a consequence.

## The shape

```
   ┌──────────────┐   normalize    ┌────────────┐   project    ┌──────────────┐
   │ POS PROVIDER │ ─────────────► │   LEDGER   │ ───────────► │ STORE DRIVER │
   │   drivers    │                │            │              │              │
   ├──────────────┤                │  pos_items │              ├──────────────┤
   │ Square       │                │  pos_events│              │ WooCommerce  │
   │ Clover       │                │  pos_map   │              │ FluentCart   │
   │ Generic      │                │            │              │ SureCart     │
   │  webhook     │                └────────────┘              │ EDD          │
   └──────────────┘                       ▲                    └──────────────┘
                                          │
                            ┌─────────────┴─────────────┐
                            │ queue · policy · matcher  │
                            │ reconciler · audit log    │
                            └───────────────────────────┘
```

A provider driver's only job is to turn one vendor's webhook into a normalized event. A store
driver's only job is to apply a normalized event to one cart. The interesting logic — idempotency,
ordering, matching, authority, reconciliation — lives once, in the middle, and is tested without
either side present.

### Why not put it in the WooCommerce extension?

The matrix argument is the decisive one. Bolt POS logic onto a Woo-specific extension and every
provider driver reaches into `wc_*` functions. Adding FluentCart then means rewriting all of them:
**N×M**. With the ledger between, adding a cart is one new store driver and adding a till is one
new provider driver: **N+M**.

Two supporting reasons:

- **The hard problems aren't Woo-shaped.** Out-of-order offline batches and partial-refund
  restocking are the same problems on every cart.
- **Nobody should carry code they don't use.** Webhook endpoints, HMAC secrets and a background
  queue shouldn't load on every Woo site whose owner has no till.

The cost is real — an abstraction layer is work, and a wrong interface is worse than none. That is
why the seam is [designed against two implementations from day one](#designing-the-seam-honestly).

## The data model

Three tables, prefixed `{$wpdb->prefix}pos_`.

### `pos_items` — the canonical item

One row per thing that can be sold, independent of how any cart models it.

| Column | Notes |
| --- | --- |
| `id` | Internal id, referenced by events. |
| `sku` | The matching key. Indexed, not unique — a SKU may exist in the POS before it exists in the store. |
| `gtin` | Barcode/UPC/EAN fallback. |
| `name` | For display in the log and the unmatched queue only. Never used for matching. |
| `store_ref` | The cart's own id, once matched (`product:42`, `variation:87`). Nullable. |
| `status` | `matched` · `unmatched` · `ignored`. |

### `pos_events` — the immutable log

Append-only. Nothing is ever updated in place; a correction is a new event.

| Column | Notes |
| --- | --- |
| `id` | |
| `connection_id` | Which till or integration sent it. |
| `external_id` | The POS's own transaction id. **`UNIQUE(connection_id, external_id)`** — this index *is* the idempotency guarantee. |
| `type` | `sale` · `refund` · `void` · `inventory` · `adjustment`. |
| `occurred_at` | When it happened **at the till**. Ordering key. |
| `received_at` | When it reached WordPress. Diagnostics only — never used for ordering. |
| `location_ref` | POS location id. |
| `payload` | The normalized JSON, stored verbatim for replay and audit. |
| `state` | `pending` · `applied` · `duplicate` · `failed` · `skipped`. |
| `error` | Why, when `failed` or `skipped`. |

### `pos_map` — external ↔ local identity

| Column | Notes |
| --- | --- |
| `connection_id` | |
| `entity` | `item` · `location` · `order` · `customer`. |
| `external_id` | |
| `local_id` | |

Separate from `pos_items` because the same physical product can carry different ids in two
connected systems, and because locations and orders need mapping too.

## The rules

These four are the difference between an integration that works in a demo and one a shop can open
the doors with.

### 1. Idempotency

A POS retries a webhook it didn't get a `2xx` for. A till reconnecting after an outage re-sends its
whole queue. Both are normal.

Every inbound event is written to `pos_events` **before** anything is applied. The
`UNIQUE(connection_id, external_id)` constraint makes a duplicate a database-level no-op: the
insert fails, the event is recorded as `duplicate`, and processing stops. Correctness does not
depend on remembering to check.

### 2. Timestamp ordering

Events are applied in **`occurred_at` order**, never arrival order.

Consider a till that goes offline at 09:00 and reconnects at 17:00. Its backlog arrives after the
whole afternoon's online orders. Applying by arrival lets a 09:15 stock count of `12` overwrite a
16:45 count of `3`. Applying by event time discards the stale value correctly.

This is why absolute stock counts carry `occurred_at` and are rejected when older than the last
applied count for that item — while *relative* adjustments (`-1 sold`) commute and can be applied in
any order.

:::warning Clock skew
`occurred_at` comes from the till, and tills drift. The ingest layer records the observed skew per
connection and warns above ±2 minutes; consistently large skew is surfaced on the health dashboard
rather than silently corrupting ordering.
:::

### 3. Authority

Two systems editing the same field will diverge. The only stable answer is to declare an owner per
field:

| Field | Owner | Rationale |
| --- | --- | --- |
| Stock level | **POS** | The shop floor is physical reality. |
| Price | **Configurable**, default store | Online promotions usually differ from counter pricing. |
| Title, description, images | **Store** | POS item names are terse counter labels. |
| SEO fields, categories | **Store** | No POS models these. |
| SKU, GTIN | **POS** | The POS is where they are printed and scanned. |

A per-product override exists for the awkward cases (an online-only bundle whose stock the POS
shouldn't touch).

### 4. Matching

SKU first, GTIN second, **never title**. Title matching seems helpful for about a week, then
silently moves stock between two products called "Blue Hoodie".

An item matching nothing goes to an **Unmatched queue** rather than being dropped or auto-created.
Auto-creating products from till data produces catalogs full of `MISC-1` and `Item 4` within days.
From the queue, one click maps it to an existing product, creates a draft product, or marks it
permanently ignored (for the "carrier bag 10p" line items every real shop has).

## Designing the seam honestly

An interface written against a single implementation always leaks that implementation's
assumptions, and you find out at the second implementation, when it is expensive.

So `FW_POS_Store` is written while **sketching both WooCommerce and FluentCart** — one to ship, one
on paper. That is an afternoon's work and it is what stops `set_stock()` from quietly requiring a
Woo product object. The same discipline applies to `FW_POS_Provider`, sketched against Square and
the generic webhook.

Sketching a second driver is not the same as building one. Only WooCommerce ships in v1.

→ **[Store drivers](./store-drivers.md)** has the interface itself.

## Processing an event, end to end

1. **Ingest.** The [REST endpoint](./webhook-api.md) verifies the signature and timestamp window,
   validates against the JSON Schema, and writes the event to `pos_events` as `pending`. Returns
   `202 Accepted`. Total work: one insert — a slow cart write can never time out a POS webhook.
2. **Queue.** An Action Scheduler job is enqueued. (Action Scheduler ships with WooCommerce; a
   WP-Cron fallback covers other carts.)
3. **Match.** Each line item is resolved to a `pos_items` row by SKU, then GTIN. Unresolved items go
   to the Unmatched queue and the event is marked `skipped` with a reason — never silently dropped.
4. **Authority check.** The policy engine decides which fields this event is allowed to write.
5. **Order check.** For absolute counts, `occurred_at` is compared against the last applied count.
   Stale events are recorded as `skipped`.
6. **Apply.** The active store driver performs the write. Failures retry with exponential backoff;
   after the final attempt the event is `failed` and surfaces on the health dashboard.
7. **Reconcile.** A nightly sweep compares POS counts to store stock and reports divergence,
   catching anything the event stream dropped entirely — because it will, eventually.

## Where the code lives

```
framework/extensions/pos-sync/
├── manifest.php
├── class-fw-extension-pos-sync.php
├── includes/
│   ├── class-fw-pos-schema.php          # tables + migrations
│   ├── class-fw-pos-ledger.php          # record_event(), is_duplicate()
│   ├── class-fw-pos-queue.php           # Action Scheduler + ordering
│   ├── class-fw-pos-matcher.php         # SKU/GTIN + unmatched queue
│   ├── class-fw-pos-policy.php          # field authority
│   ├── class-fw-pos-reconciler.php      # nightly sweep
│   ├── class-fw-pos-connections.php     # keys, scopes, rotation
│   ├── class-fw-pos-simulator.php       # Virtual Terminal engine
│   ├── class-fw-pos-log.php
│   ├── rest/
│   │   ├── class-fw-pos-rest-controller.php
│   │   ├── class-fw-pos-signature.php
│   │   └── schema/{sale,refund,inventory}.v1.json
│   ├── stores/
│   │   ├── class-fw-pos-store.php               # the interface
│   │   ├── class-fw-pos-store-woocommerce.php
│   │   └── class-fw-pos-store-fluentcart.php    # post-1.0
│   └── providers/
│       ├── class-fw-pos-provider.php            # the interface
│       ├── class-fw-pos-providers.php           # registry
│       └── square/
│           ├── class-fw-pos-provider-square.php
│           ├── class-fw-pos-square-api.php      # thin wp_remote_* client
│           ├── class-fw-pos-square-oauth.php    # connect + refresh
│           ├── class-fw-pos-square-webhooks.php # verify + normalize
│           └── class-fw-pos-square-catalog.php  # variation → SKU map
└── views/{settings,connections,virtual-terminal,log,health}.php
```

This layout is not decorative — it is what the
[roadmap's `detect` blocks](./roadmap.mdx#how-this-page-stays-current) look for when deciding
whether a task is done.
