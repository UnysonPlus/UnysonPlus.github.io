---
sidebar_position: 7
title: Square
description: Connecting Square to WordPress — sandbox setup with no hardware, catalog mapping, webhooks, and going live.
---

# Square

Square is the first-party provider driver: the best free sandbox of any POS vendor, a clean API, and
the largest share of the small-retail market POS Sync is aimed at.

:::info Status — planned
Milestone 5 on the [roadmap](./roadmap.mdx). Until it ships, Square can already be connected through
the [generic webhook API](./webhook-api.md) plus a small middleware step.
:::

## What the driver does

- **Connects by OAuth** — no pasting access tokens, and refresh is handled before expiry.
- **Subscribes to webhooks** — `payment.created`, `order.updated`, `refund.created`,
  `inventory.count.updated` — verifying Square's own signature before anything enters the ledger.
- **Imports the catalog** and matches to store products by SKU, presenting the remainder for
  mapping.
- **Maps locations** to stock sources.
- **Backfills** recent history on first connect, so the ledger does not start empty.

## Setting up a sandbox — no hardware

The whole flow, without a card reader.

### 1. Create a Square developer account

1. Go to [developer.squareup.com](https://developer.squareup.com/) and sign up. Free, no review.
2. **Applications → New application**. Name it (`UnysonPlus POS Sync — dev`).
3. Open it and switch the environment toggle to **Sandbox**. Every credential on the page is now a
   sandbox one — this toggle is easy to miss and produces confusing "unauthorized" errors later.

### 2. Note the sandbox credentials

From **Credentials** (Sandbox):

- **Application ID**
- **Access token** — for direct API calls while testing
- **OAuth Application secret** — for the OAuth flow

From **Locations**, note the sandbox **Location ID**. Square creates a default sandbox location for
you.

### 3. Expose your dev site

Square delivers webhooks from its own servers, so it cannot reach `localhost`. Start a tunnel:

```bash
cloudflared tunnel --url http://localhost/testsite
```

```php
// wp-config.php
define( 'FW_POS_PUBLIC_URL', 'https://random-words-1234.trycloudflare.com/testsite' );
```

→ [full tunnel notes](./testing.md#reaching-localhost)

### 4. Connect in WordPress

1. **Unyson+ → POS Sync → Connections → Add connection → Square**.
2. Set environment to **Sandbox** and paste the Application ID + OAuth secret.
3. **Connect with Square** → authorize the sandbox seller → you land back on the connection.
4. The connection now shows the sandbox seller name and available locations.

### 5. Subscribe to webhooks

The driver registers its own subscription. To do it by hand, in the developer dashboard under
**Webhooks → Subscriptions → Add**:

- **URL** — `https://<your-tunnel>/testsite/wp-json/unysonplus-pos/v1/square`
- **Events** — `payment.created`, `order.updated`, `refund.created`, `inventory.count.updated`
- **API version** — the current one

Use **Send test event** and confirm it appears in **POS Sync → Log**. Do this before pushing a real
sale — it isolates delivery problems from payload problems.

### 6. Import and map the catalog

1. On the connection, **Import catalog**.
2. Items matching a product by SKU are mapped automatically.
3. The rest land in the **Unmatched queue**: map to an existing product, create a draft, or ignore.

:::tip Fix SKUs first, not later
Most first-run mismatches are missing or inconsistent SKUs on the WordPress side. Sorting them out
before wiring up sales removes almost all the confusing behaviour that follows. Both systems must
agree on `HOODIE-BLU-M` down to the character.
:::

### 7. Push a sandbox sale

No hardware — create an order and pay it through the API:

```bash
# 1. Create an order
curl https://connect.squareupsandbox.com/v2/orders \
  -H "Square-Version: 2026-01-22" \
  -H "Authorization: Bearer $SANDBOX_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotency_key": "'"$(uuidgen)"'",
    "order": {
      "location_id": "'"$SANDBOX_LOCATION_ID"'",
      "line_items": [
        { "catalog_object_id": "'"$ITEM_VARIATION_ID"'", "quantity": "1" }
      ]
    }
  }'

# 2. Pay it — this is what fires payment.created
curl https://connect.squareupsandbox.com/v2/payments \
  -H "Square-Version: 2026-01-22" \
  -H "Authorization: Bearer $SANDBOX_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotency_key": "'"$(uuidgen)"'",
    "source_id": "cnon:card-nonce-ok",
    "location_id": "'"$SANDBOX_LOCATION_ID"'",
    "order_id": "'"$ORDER_ID"'",
    "amount_money": { "amount": 3500, "currency": "GBP" }
  }'
```

`cnon:card-nonce-ok` is Square's standard sandbox nonce for a successful card. Square publishes
others that simulate decline, CVV failure and insufficient funds — worth exercising, since a
declined payment must **not** move stock.

Within a second or two the sale appears in **POS Sync → Log** and stock decrements.

### 8. Exercise refunds and stocktakes

- **Refund** — `POST /v2/refunds` against the payment, full and partial. Confirm partial refunds
  restock only the refunded lines.
- **Inventory** — `POST /v2/inventory/changes/batch-create` with a `PHYSICAL_COUNT` adjustment,
  which fires `inventory.count.updated` and exercises the absolute-count ordering rule.

### 9. Replay a webhook

Square's dashboard lists delivered webhooks with a **Resend** button. Resending one is the single
best test of [idempotency](./architecture.md#1-idempotency): the event must be recorded as
`duplicate` and stock must **not** move again.

## Going live

1. Flip the developer dashboard to **Production** and copy the production credentials.
2. Create a **new connection** in WordPress with environment **Production**. Do not edit the sandbox
   one — keeping both lets you reproduce problems in sandbox while the shop trades.
3. Register the production webhook against the site's real HTTPS URL. Square requires HTTPS in
   production.
4. Import the production catalog and clear the Unmatched queue **before** enabling live mode.
5. Leave the connection in **test** mode for a trading day. Every event is logged, nothing is
   written — so you can compare what *would* have happened against the till's own reports.
6. Switch to **live**. Check the reconciliation report the next morning.

## Known Square-specific behaviour

- **Payments and orders arrive separately.** `payment.created` may land before `order.updated`
  carries the line items. The driver holds a payment briefly awaiting its order rather than
  recording a sale with no items.
- **Catalog variations, not products, hold SKUs.** Matching operates on
  `ITEM_VARIATION` objects; matching on `ITEM` finds almost nothing.
- **Modifiers are not stock items.** "Oat milk" on a coffee is a modifier, not a line item, and is
  ignored for stock unless explicitly mapped.
- **Multi-location is normal in Square** even for single-shop sellers (an online location often
  exists alongside the physical one). Map deliberately; taking "the first location" is a common
  source of phantom stock movements.
- **Amounts are already in minor units**, matching [this API's convention](./webhook-api.md#post-sale).
- **Sandbox and production ids are disjoint.** A sandbox catalog id means nothing in production —
  the catalog must be re-imported after going live.
