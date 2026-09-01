---
sidebar_position: 4
title: The webhook API
description: Endpoints, HMAC request signing, and the normalized sale / refund / inventory payload schema that any POS or middleware can push to.
---

# The webhook API

The generic endpoint is the feature that makes POS Sync work with tills nobody has written a driver
for. Instead of an integration per vendor, there is **one documented, signed, versioned wire
format** — and anything that can make an HTTPS request can use it: a POS with outbound webhooks, a
middleware platform like Zapier / Make / n8n, or a shop's own till software.

Base URL: `https://example.com/wp-json/unysonplus-pos/v1`

:::info Shipped in 1.0.2
The endpoints, signing, connections and schema validation described here are all built and tested.
:::

## Setup, step by step

### 1. Activate and create a connection

1. **Unyson+ → Extensions** → activate **POS Sync**.
2. **Unyson+ → POS Sync → Connections** → **Add connection**.
3. Name it after the physical till (`Front counter`, `Market stall`) — this name appears on every
   log line, and one connection per till is what makes a misbehaving terminal identifiable.
4. Choose **Generic webhook** as the type.
5. Save. You are shown a **key** (`upos_live_a1b2c3…`) and a **secret**, once. Copy the secret now
   — it is never displayed again. If you lose it, rotate: that changes the secret but not the key,
   so it is one field to update at the till.

### 2. Set the connection's scopes and location

- **Scopes** — grant only what the till needs. A read-only monitoring integration should not hold
  `inventory:write`.
- **Location** — map the connection to a stock source, or leave it in single-store mode.
- **Mode** — `live` or `test`. Test-mode events run the full pipeline and appear in the log but do
  **not** write stock, which is what you want while an integrator is finding their feet.

### 3. Verify connectivity

```bash
curl https://example.com/wp-json/unysonplus-pos/v1/ping \
  -H "X-UPOS-Key: upos_live_a1b2c3…"
```

```json
{
  "ok": true,
  "connection": "Front counter",
  "mode": "test",
  "schema": "v1",
  "server_time": 1788000000
}
```

`server_time` is there so a sender can check its own clock against the server's before spending an
afternoon on a `timestamp_outside_window` that is really a wrong clock on the till.

`/ping` requires only the key, not a signature, so it isolates "can I reach the site" from "is my
signing correct".

### 4. Send a signed test sale

Every connection on the **Connections** tab has a *Show an example signed request* panel with a
ready-to-run cURL command — the correct signing, already assembled, with a placeholder where your
secret goes. Run it and watch the event land in **POS Sync → Log**, then hand the same shape to
whoever is configuring the till.

The [Virtual Terminal](./testing.md#the-virtual-terminal) tab will also compose and fire events for
you, including twelve adversarial scenarios that each check their own expectation.

## Authentication

Every request except `/ping` carries three headers:

| Header | Value |
| --- | --- |
| `X-UPOS-Key` | The connection's public key. |
| `X-UPOS-Timestamp` | Unix seconds when the request was signed. |
| `X-UPOS-Signature` | `sha256=` + HMAC-SHA256 of the signing string, hex-encoded. |

The signing string is the timestamp, a newline, and the **exact raw request body**:

```
{timestamp}\n{raw_body}
```

Sign the bytes you actually send. Re-serializing JSON before signing changes key order or
whitespace and produces a mismatch — the single most common integration bug.

<details>
<summary>Reference implementations</summary>

**PHP**

```php
$body      = json_encode( $payload );          // serialize ONCE
$timestamp = (string) time();
$signature = 'sha256=' . hash_hmac( 'sha256', $timestamp . "\n" . $body, $secret );
```

**Node**

```js
const body = JSON.stringify(payload);          // serialize ONCE
const timestamp = Math.floor(Date.now() / 1000).toString();
const signature =
  'sha256=' +
  crypto.createHmac('sha256', secret).update(`${timestamp}\n${body}`).digest('hex');
```

**Python**

```python
body = json.dumps(payload, separators=(",", ":"))   # serialize ONCE
timestamp = str(int(time.time()))
signature = "sha256=" + hmac.new(
    secret.encode(), f"{timestamp}\n{body}".encode(), hashlib.sha256
).hexdigest()
```

</details>

:::note How the secret is stored — a correction
An earlier version of this page said the secret was stored **hashed**. That was wrong, and it could
not have worked: verifying an HMAC means *recomputing* it, which needs the original bytes, so a
hashed secret would make every request fail.

It is stored **encrypted**, with a key derived from the site's WordPress salts — which live in
`wp-config.php`, not the database. That protects the realistic case: a leaked backup, an SQL
injection, a DB dump handed to a contractor. It does **not** protect against filesystem compromise,
because anyone who can read `wp-config.php` can decrypt everything. That is a real boundary and a
useful one, but it is a boundary, not a vault.

One consequence worth knowing: if the site's salts are rotated, existing secrets become
undecryptable and every connection must be re-issued. Requests then fail closed with
`secret_unavailable` rather than being silently accepted.
:::

Server-side, two things are checked, in order:

1. **Timestamp window** — more than 5 minutes from server time is rejected `401`. Bounds how long a
   captured request stays acceptable at all.
2. **Signature** — compared with `hash_equals()`, which is constant-time; a naive `===` leaks
   information through response timing.

:::note There is no nonce cache, on purpose
An earlier version of this page described a third check: the exact signature cached for the window's
length, so a request could not be replayed even inside its own five minutes. That has been removed.

Every route here is **idempotent by construction** — the `UNIQUE(connection_id, external_id)` index
means a repeat changes nothing — so replaying a captured request achieves precisely nothing. The
cache added no protection. What it *did* add was a `401` for senders that sign a delivery once and
re-send the identical bytes when they do not get a 2xx, which is how a great many webhook systems
retry. Turning a working retry into an authentication error is a worse outcome than the one the
cache was guarding against.

Repeats are handled where they should be: at the ledger, which answers `200 duplicate: true`.
See [Architecture → Idempotency](./architecture.md#1-idempotency).
:::

## Endpoints

### `POST /sale`

A completed transaction at the till.

```json
{
  "external_id": "sq-txn-9f3a2b81",
  "occurred_at": "2026-09-01T14:32:11Z",
  "location_ref": "front-counter",
  "currency": "GBP",
  "total": 4750,
  "line_items": [
    { "sku": "HOODIE-BLU-M", "quantity": 1, "unit_price": 3500 },
    { "sku": "SOCKS-GRY", "gtin": "5012345678900", "quantity": 2, "unit_price": 625 }
  ],
  "customer": { "email": "sam@example.com" },
  "meta": { "till": "2", "operator": "Priya" }
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `external_id` | ✔ | The POS's own transaction id. The idempotency key — must be stable across retries. |
| `occurred_at` | ✔ | ISO 8601 with an explicit offset. The ordering key. |
| `location_ref` | | Required when the connection maps more than one location. |
| `currency` | ✔ | ISO 4217. |
| `total` | ✔ | **Minor units** (pence/cents) as an integer. Never a float. |
| `line_items[].sku` | ✔* | SKU or GTIN required — at least one. |
| `line_items[].quantity` | ✔ | Negative quantities are rejected; use `/refund`. |
| `line_items[].unit_price` | | Minor units. Recorded, not applied — [the store owns price](./architecture.md#3-authority). |
| `customer` | | Optional. Used only to attach the order when the cart supports it. |
| `meta` | | Free-form, stored verbatim, shown in the log. |

**Response** — `202 Accepted`:

```json
{ "ok": true, "event_id": 1841, "state": "pending", "duplicate": false }
```

A replay returns `200 OK` with `"duplicate": true` — a success, not an error, so a retrying till
stops retrying.

:::warning Money is always an integer
`total` and `unit_price` are in **minor units**. `47.50` as a float is not exactly representable and
accumulates error across a day's takings; `4750` is exact. Every amount in this API is an integer.
:::

### `POST /refund`

```json
{
  "external_id": "sq-refund-77c1",
  "sale_external_id": "sq-txn-9f3a2b81",
  "occurred_at": "2026-09-02T10:04:00Z",
  "reason": "customer_return",
  "restock": true,
  "line_items": [{ "sku": "SOCKS-GRY", "quantity": 1, "unit_price": 625 }]
}
```

- Omit `line_items` for a full refund of the referenced sale.
- Include a subset for a **partial** refund — the case most integrations get wrong.
- `restock: false` for damaged goods that should not go back on the shelf.
- `sale_external_id` may reference a sale not yet seen (out-of-order arrival); the refund is held
  and applied once its sale lands, or after a 24-hour grace period as a standalone stock movement.

### `POST /inventory`

An **absolute** count from a stocktake:

```json
{
  "external_id": "count-2026-09-01-front",
  "occurred_at": "2026-09-01T22:00:00Z",
  "location_ref": "front-counter",
  "mode": "absolute",
  "counts": [
    { "sku": "HOODIE-BLU-M", "quantity": 7 },
    { "sku": "SOCKS-GRY", "quantity": 41 }
  ]
}
```

Or a **relative** adjustment (breakage, a delivery):

```json
{
  "external_id": "adj-9931",
  "occurred_at": "2026-09-01T11:15:00Z",
  "mode": "relative",
  "counts": [{ "sku": "MUG-CER", "quantity": -2, "reason": "breakage" }]
}
```

The distinction matters for ordering: **absolute** counts are rejected when older than the last
applied count for that item, because a stale absolute value would rewind reality. **Relative**
adjustments commute and are safe in any order.

### `GET /ping`

Key only, no signature. Returns connection name, mode and schema version.

## Errors

| Status | Meaning | What to do |
| --- | --- | --- |
| `202` | Accepted, queued | Nothing. Success. |
| `200` + `duplicate: true` | Already seen | Stop retrying. Success. |
| `400` | Schema validation failed | Fix the payload. The response body names the offending field. Do not retry unchanged. |
| `401` | Bad key, bad signature, or timestamp outside the window | The response `code` says which: `unknown_key`, `revoked_key`, `signature_mismatch`, `timestamp_outside_window` (with `skew_seconds`), `secret_unavailable`. A repeated delivery is **not** a 401 — it is a `200`. |
| `403` | Key valid, scope missing | Grant the scope on the connection. |
| `409` | Conflicting event (stale absolute count) | Expected; not an error condition. Do not retry. |
| `429` | Rate limited | Honour `Retry-After`. |
| `503` | POS Sync is not ready (tables missing) | Retry. The admin screen offers to create them. |
| `5xx` | Server side | Retry with exponential backoff. The endpoint is idempotent, so retrying is always safe. |

A `400` body:

```json
{
  "ok": false,
  "code": "schema_invalid",
  "message": "line_items[1].quantity must be a positive integer",
  "schema": "sale.v1"
}
```

## Versioning

The namespace carries the version: `unysonplus-pos/v1`. Within v1, only **additive** changes are
made — new optional fields, new enum members. A breaking change means `v2`, served alongside v1 for
at least twelve months.

The JSON Schemas are published at
`/wp-json/unysonplus-pos/v1/schema/{sale,refund,inventory}` — no authentication required — so
integrators can validate before sending. They are the same documents the endpoint validates
against, not a copy that can drift.

## Connecting a POS with no driver

The general recipe for any till with outbound webhooks:

1. Create a **Generic webhook** connection; note the key and secret.
2. In the POS, add a webhook pointing at `…/wp-json/unysonplus-pos/v1/sale`.
3. If the POS can shape its own payload and set headers, map its fields to the schema above and
   sign as described. Done.
4. If it can only send its own fixed format — the common case — put a **middleware** step between
   them (Make, n8n, a small Worker). It receives the vendor payload, reshapes it, signs it, and
   forwards. Roughly twenty lines.
5. Set the connection to **test mode** and push a real sale through. Confirm in the log.
6. Switch to **live**.

:::tip Middleware is not a workaround
For a shop with an unusual till, a twenty-line reshaper they control beats waiting for a
first-party driver that must then be maintained against someone else's API forever. That is the
point of publishing a spec rather than shipping N integrations.
:::
