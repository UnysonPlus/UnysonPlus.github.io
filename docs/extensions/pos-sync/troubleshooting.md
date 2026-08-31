---
sidebar_position: 8
title: Troubleshooting
description: Diagnosing wrong stock, rejected webhooks, stalled queues and drift — starting from the audit log.
---

# Troubleshooting

Almost every question is "why is this stock number wrong?", and almost every answer is in
**Unyson+ → POS Sync → Log**.

## Start at the log

Each event records what arrived, what was matched, what was applied, and what was skipped and why.
Filter by connection, SKU or state.

| State | Meaning |
| --- | --- |
| `pending` | Accepted, waiting on the queue. Normal for a few seconds. |
| `applied` | Stock was written. The row shows before/after levels. |
| `duplicate` | Already seen. **Correct behaviour** — a retried webhook. |
| `skipped` | Deliberately not applied. The reason is on the row. |
| `failed` | Applying threw after all retries. Needs attention. |

A `skipped` event is not a bug in itself — test mode, an unmatched SKU and a stale count all skip
correctly. Read the reason before treating it as a fault.

## Nothing arrives at all

Work outwards from the site.

1. **Is the endpoint reachable?**

   ```bash
   curl https://example.com/wp-json/unysonplus-pos/v1/ping -H "X-UPOS-Key: upos_live_…"
   ```

   No response → the REST API is blocked. Security plugins and some hosts block unknown
   `/wp-json/` namespaces by default; allowlist `unysonplus-pos`.

2. **Is the extension active?** POS Sync ships inactive. Check **Unyson+ → Extensions**.

3. **Is the connection live?** A connection in **test** mode logs everything and writes nothing —
   which looks exactly like "not working" if you have forgotten.

4. **Is the sender pointed at the right URL?** Through a tunnel, the URL changes every time a quick
   tunnel restarts. A stale URL in the vendor dashboard is the most common dev-time cause.

5. **Check the vendor's delivery log.** Square, Clover and Zettle all show attempts and response
   codes. If the vendor reports `200`s and your log is empty, the requests are reaching a different
   site than you think.

## `401` — signature rejected

In order of likelihood:

1. **The body was re-serialized after signing.** Sign the exact bytes you send. Building the JSON
   twice — once to sign, once to send — reorders keys or changes whitespace and invalidates the
   signature. Serialize once, into a variable, and use that variable for both.
2. **The signing string is wrong.** It is `{timestamp}\n{raw_body}` — a literal newline between,
   nothing else. No URL, no method.
3. **Clock drift.** More than 5 minutes from server time is rejected. Check the sender's clock; a
   virtual machine resuming from suspend is a classic offender.
4. **Wrong secret.** Secrets are shown once. If in doubt, rotate and reconfigure — you cannot read
   the existing one back.
5. **A proxy modified the body.** Some WAFs re-encode JSON. Compare the raw body length against
   `Content-Length` in the log.

## Stock is wrong

### Wrong by a consistent amount, always the same product

Almost always a **matching** problem — two products sharing a SKU, or a variable product whose
parent and variation both carry one. Search the log for the SKU; if two `store_ref` values appear,
that is the answer.

### Wrong after an outage

Expected, and what reconciliation is for. Check the **Reconciliation report**
(**POS Sync → Health**) and use **Resync** to pull authoritative counts from the POS.

### Wrong and drifting steadily

Something else is writing stock: another plugin, a CSV importer, a supplier feed. The log shows
what POS Sync applied; if the current level does not match the last `applied` row and no POS event
sits between, the write came from outside.

### Rewound to an older value

A stale absolute count was applied. This should be impossible — absolute counts older than the last
applied count are `skipped` — so it points at either clock skew on the till (check the skew warning
on the connection) or a POS sending `occurred_at` in local time with no offset.

:::warning Always send an explicit offset
`"occurred_at": "2026-09-01T14:32:11"` with no `Z` or `+01:00` is ambiguous, and ambiguity in the
ordering key is what causes rewinds. Every timestamp must carry an offset.
:::

## Items land in the Unmatched queue

Working as designed — POS Sync will not guess. Common causes:

- **No SKU on the WordPress product.** The usual one.
- **SKU mismatch.** Trailing spaces, case differences, or a hyphen where the POS has an underscore.
  The queue shows both values side by side.
- **Variable product with the SKU on the parent only.** Woo matches on variations; put the SKU
  there.
- **Genuinely not a stock item** — a bag charge, a service, a discount line. Mark it **ignored**
  once and it stops appearing.

## The queue is stalled

`pending` events piling up:

1. **Is Action Scheduler running?** With WooCommerce, check **WooCommerce → Status → Scheduled
   Actions**. A backlog there affects far more than POS Sync.
2. **Is WP-Cron disabled?** `DISABLE_WP_CRON` without a real system cron leaves nothing to run the
   queue. Add a server cron hitting `wp-cron.php`.
3. **Are jobs failing and retrying?** A `failed` event carries the error. A cart fatal usually shows
   here first.

## Refunds do not restock

- `"restock": false` in the payload — deliberate, for damaged goods.
- Partial refund where the driver reports `partial_refunds: false`. Check the capability row on
  **Health**.
- The refund references a `sale_external_id` never received. It is held for 24 hours, then applied
  as a standalone stock movement; the log says which happened.

## Duplicate orders in the store

If sales appear twice as orders but stock moved only once, the second is not a POS Sync duplicate —
the ledger's UNIQUE index makes that impossible. Look for the till sending **different**
`external_id` values for retries of the same sale. That is a POS misconfiguration: the idempotency
key must be stable across retries.

Search the log for two `applied` events with the same total and `occurred_at` but different
`external_id` values to confirm.

## Getting help

When reporting a problem, include:

- The **event id** from the log (not a screenshot of stock).
- The connection type and mode.
- The store driver and its capability row from **Health**.
- Whether the event shows as `applied`, `skipped` or `failed`, and the recorded reason.

The stored `payload` is the verbatim request, so an event id is usually enough to reproduce the
whole thing in the [Virtual Terminal](./testing.md#the-virtual-terminal).
