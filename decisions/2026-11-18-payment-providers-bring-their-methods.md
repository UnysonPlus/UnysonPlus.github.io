---
slug: payment-providers-bring-their-methods
title: "How does Payments support many local payment methods, like GCash?"
authors: [jon]
tags: [ecommerce, extensions, architecture]
date: 2026-11-18
description: Payments is built around providers, not individual methods. Each provider is one adapter that reports the methods it offers for the shop's country and currency, so one adapter unlocks many local methods. After Stripe, PayPal and offline payments move into the shared core, the first new provider is PayMongo for the Philippines (GCash, Maya, QR Ph), then Xendit for Southeast Asia, then other regions as shops ask.
---

**The question:** Which payment methods can the shared Payments extension support? It should cover a lot of
them, including local ones such as GCash in the Philippines.

<!-- truncate -->

## Context

Local methods are rarely something a shop connects to directly. GCash, for example, reaches online shops
through payment providers in the Philippines, and a single provider usually offers a whole set: e-wallets, QR
payments, bank transfers, cards and over-the-counter cash. The existing Membership and Forms gateways are each
tied to one provider and treat it as one way to pay.

## Options considered

1. **One gateway class per payment method** (a GCash gateway, a Maya gateway, an iDEAL gateway). Simple to
   explain, but the same provider account, keys, webhooks and refund code would be repeated for every method,
   and the list never ends.
2. **One adapter per provider, which reports its methods.** The provider is written once. It tells Payments
   which methods the account has for a given country and currency, and checkout shows only those.
3. **Only a big international provider, and wait for it to add local methods.** Least work, but it leaves out
   shops in countries where that provider does not open accounts or does not carry the local wallets.

## Decision

Option 2. A **provider** is one adapter on the shared interface; it brings its **methods** with it, and
checkout filters them by the order's country and currency. The order of work:

1. Move **Stripe**, **PayPal** and **offline payments** (bank transfer, cash on delivery, pay on pickup) into
   the shared core.
2. **PayMongo** for the Philippines: GCash, Maya, QR Ph, cards and bank transfers.
3. **Xendit** for Southeast Asia: the Philippines, Indonesia, Malaysia, Thailand and Vietnam.
4. Other regions as shops ask for them: Mollie (Europe), Razorpay (India), Paystack and Flutterwave (Africa),
   Mercado Pago (Latin America), Square, and Dragonpay for online banking and cash payments in the Philippines.

The interface has to carry three things local methods need: a **waiting for payment** state (a bank transfer
or a cash payment can take days), a per-method answer to **can this be charged again** (most e-wallets cannot,
so renewals and repeat deliveries are offered only on methods that can), and **refunds that differ by method**.

The phased plan is on the [Shop roadmap](/extensions/shop/roadmap).

## Why

- **One file unlocks a region.** A provider adapter for Southeast Asia adds a dozen methods at once.
- **Customers see what they can use.** Filtering by country and currency keeps checkout short.
- **It starts where the need is.** Shops in the Philippines cannot rely on an international card provider for
  GCash, so a local provider comes first after the move.
- **The list can grow without a redesign.** A new region is a new file, not a change to checkout.

*Status: Accepted.*
