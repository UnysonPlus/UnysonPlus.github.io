---
sidebar_position: 6
title: Testing without a POS
description: How to develop and verify a POS integration with no physical hardware — vendor sandboxes, a tunnel to localhost, the Virtual Terminal, and the automated suite.
---

# Testing without a POS

You do not need a card terminal to build or verify this. Three layers cover everything:

| Layer | Covers | Needs |
| --- | --- | --- |
| **[Virtual Terminal](#the-virtual-terminal)** | Everyday flows, and every adversarial case a sandbox makes awkward | Nothing — it ships with the extension |
| **[Vendor sandbox](#vendor-sandboxes)** | Real vendor payloads, real webhook delivery, real OAuth | A free developer account |
| **[Automated suite](#the-automated-suite)** | Regressions, CI | Nothing — the ledger suite runs today |

Between them, the only thing left untested is the physical card reader, which is the POS vendor's
concern and not something this extension touches.

## The Virtual Terminal

**Unyson+ → POS Sync → Virtual Terminal.**

:::info Shipped in 1.0.3
:::

A screen that composes a correctly-signed event and posts it to your own endpoint, exactly as a till
would. Pick a product and a quantity, then fire a sale, refund or stocktake and watch it move real
stock.

It is a shipping feature, not a dev tool. It is also:

- the customer's **pre-launch check** ("did we wire this up right?") before opening the shop,
- the **support tool** for reproducing a merchant's problem on your own site,
- the **demo** — a sale visibly decrementing stock is the whole product in one screen.

### Two transports, and why it matters which one you use

The terminal can send its request two ways, and they are **not** interchangeable:

| | What it proves | What it misses |
| --- | --- | --- |
| **Real HTTP request** *(default)* | The whole path — web server, security plugins, rewrite rules, the handler | Nothing |
| **In-process** | The handler is correct | Everything in front of it |

In-process dispatch passes happily on a site where a security plugin blocks `/wp-json/`, the web
server strips headers, or loopback requests are firewalled — which are the three usual reasons a
real till's events never arrive. Use it to *isolate* a problem ("is it the handler or the network?"),
never to sign off.

### Firing your first event

1. **Unyson+ → Extensions** → activate **POS Sync**.
2. **Connections** → **Add connection**, name it after the till, mode **test**.
   ([details](./webhook-api.md#setup-step-by-step))
3. **Virtual Terminal** → pick that connection, leave the transport on **Real HTTP request**.
4. Choose a product — only products **with a SKU** are listed, because one without a SKU cannot be
   matched to a till line and offering it would only waste your time.
5. **Fire event.**
6. The result appears immediately (the queue is drained synchronously, so you get an answer rather
   than "pending"), and the full record is on **POS Sync → Log**.

In **test** mode the whole pipeline runs — signature, schema, matching, ordering, policy — and stops
only at the store write, which is recorded as what *would* have happened. Both the site-wide setting
and the connection's own must say live before anything moves real stock.

### Adversarial scenarios

The happy path is the easy part. These are the cases that break naive integrations — one click
each, and **each one checks its own expectation** rather than leaving you to squint at the log:

| Scenario | What should happen |
| --- | --- |
| **A normal sale** | Accepted (202) and queued. The baseline. |
| **Duplicate delivery** | Second delivery returns `200` with `duplicate: true`, and only **one** event exists. |
| **Offline till reconnects** | Three sales delivered newest-first are applied oldest-first. |
| **Stale stocktake** | A count older than one already applied is skipped, with a reason. |
| **Unknown SKU** | Accepted, then skipped **whole** — the item waits on the Unmatched screen, nothing is partially applied. |
| **Partial refund** | A refund of one line from a two-line sale is accepted. |
| **Expired signature** | `401 timestamp_outside_window`. Nothing written. |
| **Tampered body** | `401 signature_mismatch`. Nothing written. |
| **Byte-identical re-delivery** | Accepted and de-duplicated — **not** rejected. See below. |
| **Till clock drifting** | Accepted while inside the window, and the drift is recorded against the connection. |
| **Malformed payload** | `400` naming the exact field. Not retryable. |
| **Timestamp with no offset** | `400` — the schema requires an explicit UTC offset. |

:::note Byte-identical re-delivery is accepted, and that is deliberate
An earlier design cached each accepted signature and rejected a repeat as `replayed_request`. That
has been removed.

Every ingest route is **idempotent by construction** — the unique index means a repeat changes
nothing — so an attacker replaying a captured request achieves precisely nothing, and the cache
bought no protection. What it *did* do was break legitimate traffic: plenty of senders sign a
delivery once and re-send the identical bytes when they do not get a 2xx (GitHub's redelivery works
exactly this way), and against a nonce cache that retry came back `401`. An auth error is the sort
of thing that makes a POS stop retrying, or pages someone at 6am about a shop that is working fine.

The Virtual Terminal's own duplicate scenario is what surfaced this.
:::

:::tip Clock skew is measured on the *signing* timestamp
Not on `occurred_at`. The two are different clocks doing different jobs: `occurred_at` orders
events, `X-UPOS-Timestamp` bounds the request's lifetime. A till whose clock drifts corrupts the
first and trips the second, which is why the drift is recorded against the connection rather than
merely logged in passing.
:::

### Copy it as cURL

Every connection has a ready-to-run signed request you can hand to whoever is configuring the till.
It carries a **placeholder** secret, not the live one — copyable text ends up in chat logs — and it
is generated from the same signing code the endpoint verifies with, so it cannot drift from what is
actually accepted.

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

Four runnable suites, **187 assertions** between them. Both install the tables, exercise them and drop
them again, so they are safe to re-run and leave the site as they found it.

```bash
cd wp-content/plugins/unysonplus/framework/extensions/pos-sync
for m in 1 2 3 4; do
  php wp-cli.phar --path='<a WordPress install>' eval-file "tests/milestone-$m.php"
done
```

- **`milestone-1.php`** (36) — the ledger: idempotency, ordering, staleness, retry policy, log
  helpers. Needs no POS and no cart, which is precisely why that layer was built first.
- **`milestone-2.php`** (44) — the seam: matching, applying, atomicity, retry classification, test
  mode, recovery. It runs against a **fake in-memory driver rather than WooCommerce**, which is the
  point — everything above the seam is cart-agnostic, so its tests must not need a cart. The fake
  also makes capability negotiation and store-write failures producible on demand.
- **`milestone-3.php`** (62) — the webhook API: secrets, signing, authentication, validation,
  ingest, modes, connection management. Requests go through `rest_do_request()` rather than calling
  the controller directly, so routing, headers and status codes are genuinely under test — a suite
  that calls the callback by hand proves the callback works and nothing about whether the endpoint
  does.

- **`milestone-4.php`** (44) — the Virtual Terminal: signing parity, both transports, every
  scenario, and the cURL export. It also proves the scenarios *check something*, by breaking a
  behaviour and asserting the scenario notices — a self-test that always passes is worse than none.

:::tip Run all four
This keeps paying. Milestone 3's suite caught a `class_exists()` guard in Milestone 2's applier that
wrapped only half a branch; Milestone 4's duplicate scenario caught the nonce cache rejecting
legitimate re-deliveries. Cross-milestone runs are where that kind of thing surfaces.
:::

Two of the first suite's cases look like the same rule and are not — worth understanding before
editing the queue:

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
