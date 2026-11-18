---
slug: move-to-shared-payments-without-moving-anything
title: "How do Membership and Forms move onto the shared Payments system without breaking sites that already take payments?"
authors: [jon]
tags: [ecommerce, extensions, architecture]
date: 2026-11-18
description: Nothing is migrated. Each extension keeps its own gateways and gets a bridge that routes every record to the system it was made on. Only new purchases follow a setting. New installs start on the shared system; a site that already takes payments its own way stays there until its owner switches. Coupons, tax and invoices are added to the shared system the same way, beside the extensions' own.
---

**The question:** Membership and Forms each have their own Stripe, PayPal, coupons and invoices, and real sites
already take payments with them. How do they move onto the one shared Payments system without billing anyone
twice, losing a renewal, or changing a site that works today?

<!-- truncate -->

## Context

Phase 0 of the [Shop roadmap](/extensions/shop/roadmap) puts everything that sells on one payments core. Two
extensions were there first:

- **Membership** bills subscriptions through its own Stripe and PayPal code, with its own webhook address, its
  own coupons, tax module and invoices.
- **Forms** has a simpler copy of the same, and Bookings takes its deposits through Forms.

A running subscription lives at the provider. It is tied to the keys that made it and reports to the webhook
address it was given. Whatever the site does, that subscription keeps renewing there.

## Options considered

**1. Migrate everything.** Copy the old payment and subscription rows into the shared ledger and point the old
webhook addresses at the new code.
- One system afterwards, nothing left behind.
- A migration of live billing records that cannot be tried on real data first. One wrong match renews a member
  twice or stops a renewal silently. The old webhook addresses would have to accept the old formats for ever.

**2. A hard switch.** From some version on, every extension uses the shared system.
- Simple to explain.
- A site updates the plugin and its checkout is suddenly asking for keys in a different place. Anything already
  renewing is orphaned.

**3. A bridge per extension, and nothing is moved.** Each extension keeps its own gateway code. A bridge wraps
each gateway and sends every record to the system it was made on. A setting decides only where NEW purchases go.
- A site that changes nothing sees nothing change.
- Both systems run side by side for as long as an old subscription lives, so the old code cannot be deleted yet.

## Decision

Option 3.

- **Records stay where they were made.** A record carries a mark of its system (a Payments charge id, a
  subscription id with a prefix). The bridge reads the mark, never the setting, when it cancels, pauses,
  refunds or confirms. Switching back is therefore safe too.
- **Only new purchases follow the setting.** Membership has "its own" or "the shared system". Forms has a third
  choice, Automatic, which uses the shared system when it is already switched on and Forms has no payment
  set-up of its own.
- **New installs start on the shared system.** Membership decides once, the first time its payment settings are
  opened on a site with no provider set up and no payment taken. A site with keys or payments of its own is
  left alone. Forms never switches Payments on by itself in Automatic, so a site with only a contact form still
  never loads it.
- **The owner is told what is left behind.** Payments → Settings counts the subscriptions that still renew
  through each extension's own keys, and says when those keys are no longer needed. The software never decides
  that on its own.
- **Coupons, tax and invoices follow the same rule.** The shared system gets its own coupon list, tax table and
  numbered invoices. Membership and Forms accept shared coupon codes while they are on the shared system, and
  keep their own lists (their own code wins). Membership keeps its tax module and its invoices, and Payments
  does not issue a second invoice for a membership payment. Invoices are off until switched on.
- **Ids sent to a provider are tagged**, because one provider account often notifies both the old and the new
  webhook address, and a bare row number arriving at the other one could match an unrelated payment.

## Why

The risk is not symmetrical. Leaving old code in place costs maintenance. A wrong migration costs a customer a
double charge or a lapsed membership, on someone else's live site, and it cannot be undone from here. So the
design removes the migration instead of trying to make it safe.

It also means the claim "nothing changes until you choose" can be checked: the tests run the old path with the
shared system installed and unused, and it behaves as before.

The cost is honest duplication for a while: two coupon lists, two invoice numberings, two sets of provider code.
They retire one at a time, when the settings screen shows that nothing depends on them any more.

**Status:** Accepted. None of the providers has yet been run against a real merchant account; the tests answer
each provider's API with a stand-in.
