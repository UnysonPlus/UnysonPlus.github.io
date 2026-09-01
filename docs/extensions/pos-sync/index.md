---
sidebar_position: 1
title: POS Sync
description: Keep an online store in step with sales rung up on a physical till — a provider-agnostic sync bridge between any point-of-sale system and any WordPress e-commerce plugin.
---

# POS Sync

**POS Sync** keeps an online store in step with the physical shop. When a customer buys the last
blue hoodie at the counter, the website should stop selling it — within seconds, without anyone
touching WordPress.

That sounds like one integration. It is really two independent problems, and the whole design
follows from keeping them apart:

- **Which till?** Square, Clover, Zettle, Lightspeed, or a shop's own bespoke software.
- **Which store?** WooCommerce, FluentCart, SureCart, Easy Digital Downloads, Ecwid.

:::info Status — feature-complete for 1.0
The **ledger** is built (schema, idempotency, the event-time-ordered queue, retries, the audit log),
so is the **store driver seam** with WooCommerce on the end of it, and so is the
**[signed webhook API](./webhook-api.md)** — which means a real till can feed the ledger today. Any
POS with outbound webhooks, any middleware, or a shop's own software can post to it.
[282 assertions](./testing.md#the-automated-suite) cover them, needing neither hardware, a Square
account, nor — for most of them — a cart.

The **[Virtual Terminal](./testing.md#the-virtual-terminal)** is built, so all of it can be
exercised and demonstrated with no hardware at all — twelve adversarial scenarios, each checking its
own expectation. And the first-party **[Square driver](./square.md)** now ships: OAuth, webhooks,
catalog import and location mapping.

**Reconciliation and the operational layer** are built too: a nightly sweep that asks the POS what
it thinks the numbers are, an authority policy for who owns which field, and a health dashboard
whose alarm is *silence* — because a till that stops sending does not throw, it just goes quiet
while stock drifts.

Everything left on the [roadmap](./roadmap.mdx) is deliberately post-1.0: more store drivers, more
vendor drivers, and a batch importer.

The rest of this section is the **design of record**: the architecture, the wire format, and the
build order. The **[Roadmap](./roadmap.mdx)** tracks progress and updates itself from the extension
source — see [How this page stays current](./roadmap.mdx#how-this-page-stays-current).

Source: [`UnysonPlus-POS-Sync-Extension`](https://github.com/UnysonPlus/UnysonPlus-POS-Sync-Extension)
:::

## Why it is its own extension

It would be natural to add this to the WooCommerce extension. That turns out to be the expensive
choice.

With **N** POS providers and **M** e-commerce plugins, POS logic living inside a Woo-specific
extension means every provider driver has to be rewritten to add a second cart — **N×M** work.
Put a **normalized ledger in the middle** instead, and each side only has to know about that
ledger: **N+M**.

```
  Square ─┐                                    ┌─ WooCommerce
  Clover ─┤                                    ├─ FluentCart
  Zettle ─┼─► POS drivers ─► LEDGER ─► store ──┼─ SureCart
   Any    │                          drivers   ├─ EDD
 webhook ─┘                                    └─ …
```

The ledger is the canonical, cart-agnostic record of *what happened in the shop*: an item, a sale,
a refund, a stock movement. POS drivers only write to it. Store drivers only read from it. Neither
side knows the other exists.

Three practical consequences follow:

- **Scope stays clean.** The WooCommerce extension is about storefront integration. POS sync is
  background jobs, webhook endpoints, HMAC secrets, reconciliation and an audit log — a different
  concern, and one that shouldn't load for every Woo user who will never own a till.
- **The hard problems are cart-agnostic anyway.** Idempotency, out-of-order offline batches, refund
  restocking, location mapping — none of that is WooCommerce-shaped. Coupling it to
  `wc_update_product_stock()` buries generic logic inside one vendor's API.
- **Activation is independent.** A FluentCart shop shouldn't need the WooCommerce extension active.

→ The full reasoning, including the trade-offs considered, is in
**[Architecture](./architecture.md)**.

## What ships first

Deliberately narrow. POS integrations are maintenance-heavy — every vendor is bespoke and their
APIs move — so version 1 is one generic surface plus one polished driver, not five half-drivers.

| | What | Why first |
| --- | --- | --- |
| **1** ✅ | **[Generic webhook API](./webhook-api.md)** ✅ | Any POS with outbound webhooks, any middleware (Zapier / Make / n8n), or a shop's own till software can push to it. You ship a *spec*, not an integration — nothing to break when a vendor changes their API. |
| **2** ✅ | **[Virtual Terminal](./testing.md#the-virtual-terminal)** ✅ | Fires realistic synthetic sales at your own endpoint. Development test rig, customer pre-launch check, and live demo, all in one screen. |
| **3** ✅ | **[WooCommerce store driver](./store-drivers.md#woocommerce)** ✅ | The largest install base, and the reference implementation of the store seam. |
| **4** | **[Square provider driver](./square.md)** ✅ | Best free sandbox, cleanest API, biggest small-retail share. Proves the provider seam. |

Everything else — FluentCart, SureCart, Clover, Zettle, Lightspeed — is
[post-1.0](./roadmap.mdx), added on demonstrated demand.

## "But I don't own a POS machine"

You don't need one. Every serious POS vendor publishes a **free sandbox that emulates the hardware
entirely**: you create a test seller account, push a sale through their API, and receive the same
real webhooks a physical terminal would send.

Add the Virtual Terminal for the cases sandboxes make awkward — duplicate webhooks, out-of-order
offline batches, expired signatures — and hardware never enters the picture.

→ **[Testing without hardware](./testing.md)** walks the whole setup, including the tunnel that
lets sandbox webhooks reach a local XAMPP install.

## The decisions that matter most

These bite harder than any API plumbing. Each is settled here so the implementation doesn't have to
re-litigate it:

- **Stock has one owner.** The POS is authoritative for *stock levels*; the store is authoritative
  for *product content* — title, description, images, SEO — with a per-product override. Symmetric
  two-way stock sync with no declared authority produces drift and oversells, reliably.
- **Match on SKU. Always.** GTIN/barcode as a fallback. Never on product title.
- **Every event is idempotent.** Webhooks get retried; tills reconnect and re-send. The external
  transaction id sits behind a UNIQUE index, so a replay is recorded and dropped, never applied
  twice.
- **Apply by event time, not arrival time.** An offline till dumps its batch late and out of order.
  Ordering by arrival lets a stale sale overwrite a newer count.
- **Refunds, voids and partial returns restock.** This is where cheap integrations fall over.
- **Locations are explicit.** Each POS location maps to a stock source, or the site declares
  single-store mode. Never left implicit.

## Read next

- **[Architecture](./architecture.md)** — the ledger, the two driver seams, and the data model. Start here.
- **[Roadmap](./roadmap.mdx)** — what's built, what's next, verified against the source tree.
- **[The webhook API](./webhook-api.md)** — endpoints, signing, and the normalized payload schema.
- **[Store drivers](./store-drivers.md)** — the `FW_POS_Store` interface and each cart's notes.
- **[Square](./square.md)** — connecting Square, sandbox to production, step by step.
- **[Testing without a POS](./testing.md)** — sandbox, tunnel, Virtual Terminal, automated suite.
- **[Troubleshooting](./troubleshooting.md)** — when stock is wrong and you need to know why.
