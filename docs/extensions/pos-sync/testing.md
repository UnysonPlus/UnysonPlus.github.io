---
sidebar_position: 6
title: Testing without a POS
description: How to develop and verify a POS integration with no physical hardware — vendor sandboxes, a tunnel to localhost, the Virtual Terminal, and the automated suite.
---

# Testing without a POS

You do not need a card terminal to build or verify this. Three layers cover everything:

| Layer | Covers | Needs |
| --- | --- | --- |
| **[Virtual Terminal](#the-virtual-terminal)** | Everyday flows, and every adversarial case a sandbox makes awkward | Nothing |
| **[Vendor sandbox](#vendor-sandboxes)** | Real vendor payloads, real webhook delivery, real OAuth | A free developer account |
| **[Automated suite](#the-automated-suite)** | Regressions, CI | Nothing — the ledger suite runs today |

Between them, the only thing left untested is the physical card reader, which is the POS vendor's
concern and not something this extension touches.

## The Virtual Terminal

**Unyson+ → POS Sync → Virtual Terminal.**

A screen that composes a correctly-signed event and posts it to your own endpoint, exactly as a till
would. Pick products, quantities and a location, then fire a sale, refund or stock adjustment and
watch it move real stock.

It is a shipping feature, not a dev tool. It is also:

- the customer's **pre-launch check** ("did we wire this up right?") before opening the shop,
- the **support tool** for reproducing a merchant's problem on your own site,
- the **demo** — a sale visibly decrementing stock is the whole product in one screen.

### Firing your first event

1. **Unyson+ → Extensions** → activate **POS Sync**.
2. **Connections** → **Add connection** → type **Generic webhook**, name it `Virtual Terminal`,
   mode **test**. ([details](./webhook-api.md#setup-step-by-step))
3. **Virtual Terminal** → select the connection.
4. Add a line item — the product picker searches by SKU, so anything missing a SKU shows up
   immediately as a real problem, not a test artefact.
5. **Fire sale.**
6. **POS Sync → Log** shows the event: received, matched, applied, with the resulting stock level.

In **test** mode the full pipeline runs — signature, schema, matching, ordering, policy — but the
store write is skipped and logged as `skipped: test_mode`. Switch to **live** to move real stock.

### Adversarial scenarios

The everyday path is the easy part. These presets fire the cases that break naive integrations, one
click each:

| Scenario | What it sends | Correct behaviour |
| --- | --- | --- |
| **Duplicate webhook** | The same `external_id` twice | Second recorded `duplicate`, `200`, stock moves **once** |
| **Out-of-order batch** | Three sales with descending `occurred_at`, delivered ascending | Applied by event time; a stale absolute count is `skipped` |
| **Partial refund** | Refund of one line from a two-line sale | Only that line restocks |
| **Refund before sale** | Refund whose `sale_external_id` has not arrived | Held, then applied when the sale lands |
| **Unknown SKU** | A line item matching nothing | Event `skipped`, item in the Unmatched queue, **no partial application** |
| **Stock below zero** | Sells more than is on hand | Honours the cart's backorder setting; never silently clamps |
| **Expired signature** | Timestamp 10 minutes old | `401`, nothing written |
| **Tampered body** | Valid signature, mutated body | `401`, nothing written |
| **Clock skew** | `occurred_at` 30 minutes in the future | Accepted, skew warning raised on the connection |

Each preset also exports a **signed cURL command**, so an integrator can reproduce the exact request
from their own environment.

:::tip These are the test suite
The scenario definitions are the same fixtures the [automated suite](#the-automated-suite) runs. A
scenario added here is a regression test everywhere.
:::

## Vendor sandboxes

Sandboxes are what make the "no hardware" claim real rather than a compromise. They emulate the
terminal end to end: you push a sale through the vendor's API and receive the same webhooks a
physical reader would send.

| Vendor | Sandbox | Notes |
| --- | --- | --- |
| **Square** | Free, no application review | Best of the group. Sandbox seller accounts, full catalog + inventory + webhooks, and **webhook replay** from the dashboard. |
| **Clover** | `sandbox.dev.clover.com` | Free developer account; a virtual merchant with test devices. |
| **Zettle (PayPal)** | Developer account | Adequate; a smaller sandbox surface. |
| **Lightspeed** | On request | Demo account, slower to obtain. |

→ **[Square, step by step](./square.md)** — the one to start with.

## Reaching localhost

Sandbox webhooks are delivered from the vendor's servers, which cannot reach
`http://localhost/testsite/`. This is the one genuine gap between "I have no POS" and "I have a POS
firing at my dev machine" — and a tunnel closes it in about a minute.

```bash
cloudflared tunnel --url http://localhost/testsite
# → https://random-words-1234.trycloudflare.com
```

Or with ngrok:

```bash
ngrok http 80 --host-header=localhost
```

Then, in WordPress, register the tunnel URL so generated webhook URLs and OAuth redirects use it
instead of `localhost`:

```php
// wp-config.php — development only
define( 'FW_POS_PUBLIC_URL', 'https://random-words-1234.trycloudflare.com/testsite' );
```

The endpoint the vendor should call becomes:

```
https://random-words-1234.trycloudflare.com/testsite/wp-json/unysonplus-pos/v1/sale
```

:::warning A tunnel exposes your dev site to the internet
Quick-tunnel URLs are unguessable but public. Keep connections in **test** mode, do not point one at
a site holding real customer data, and stop the tunnel when you finish. A named Cloudflare tunnel
with Access in front is the better option if you need one running for days.
:::

### Verifying the round trip

1. Start the tunnel; confirm the site loads over the tunnel URL.
2. `curl` the `/ping` endpoint **through the tunnel** — this separates tunnel problems from webhook
   problems, and does so before you have spent an hour on the wrong one.
3. Register the tunnel URL as the webhook endpoint in the vendor's sandbox dashboard.
4. Use the vendor's **send test event** button. It should reach **POS Sync → Log**.
5. Only then push a real sandbox sale.

## The automated suite

### What exists today

Milestone 1's ledger and queue ship with a runnable suite — **36 assertions** across
idempotency, ordering, staleness, retry policy and the log helpers. It needs no POS and no cart,
which is precisely why that layer was built first. It installs the tables, exercises them and drops
them again, so it is safe to re-run and leaves the site as it found it.

```bash
php wp-cli.phar --path='<a WordPress install>' \
  eval-file wp-content/plugins/unysonplus/framework/extensions/pos-sync/tests/milestone-1.php
```

Two of its cases look like the same rule and are not — worth understanding before editing the
queue:

- **Same batch.** Two stock counts waiting together are applied oldest-first, so the newer value
  simply lands last. That is the *ordering* rule.
- **Across batches.** The newer count was already applied when the offline till finally delivers
  the older one, so ordering cannot help and the older count must be refused on its own merits.
  That is the *staleness* rule.

Both are needed, and a suite that only covers the first appears to prove the second. Ours did,
briefly.

### What comes with the later milestones

Network calls make tests slow and flaky, so vendor responses get recorded once and replayed after:

- **Fixtures.** Every sandbox interaction is captured to `tests/fixtures/<vendor>/*.json` on first
  run and replayed thereafter, with `POS_RECORD=1` to re-record when a vendor changes payloads.
- **Driver tests** run against a real WooCommerce install, replaying the
  [adversarial scenarios](#adversarial-scenarios) end to end.
- **Signature tests** cover the [signing string](./webhook-api.md#authentication) in PHP, Node and
  Python, because cross-language signing mismatches are the most common integration failure.

## A realistic pre-launch checklist

Before a shop opens the doors:

1. Fire every [adversarial scenario](#adversarial-scenarios) against the live configuration in test
   mode. All pass.
2. Run a **catalog match report** — every product that will be sold at the counter resolves by SKU.
   Unmatched items are mapped or explicitly ignored.
3. Confirm the **location mapping**, or that single-store mode is deliberate.
4. Ring up a real £0.01 sale on the actual till and refund it. This is the one step no sandbox
   replaces — it proves the merchant's own hardware, network and account are configured.
5. Check the **reconciliation report** the next morning. Zero divergence.
6. Turn on **stalled-connection alerts** so a till that silently stops reporting is noticed the same
   day, not at the next stocktake.
