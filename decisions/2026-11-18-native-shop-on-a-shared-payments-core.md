---
slug: native-shop-on-a-shared-payments-core
title: "Why build a native Unyson+ store, and why payments come first?"
authors: [jon]
tags: [ecommerce, extensions, architecture]
date: 2026-11-18
description: Unyson+ gets its own store extension, Shop, instead of relying only on WooCommerce, so that the store, memberships, bookings, paid forms and the CRM share one customer and one checkout. Because Forms and Membership already each carry their own Stripe, PayPal, offline gateways and coupons, the first phase merges them into one shared Payments extension that the store is built on.
---

**The question:** Can Unyson+ have its own e-commerce extension, fully connected to the CRM, Membership and the
other extensions, rather than only integrating with WooCommerce? And if so, where should building it start?

<!-- truncate -->

## Context

Unyson+ already sells things in three places, each built separately:

- The **WooCommerce extension** adds page-builder elements and shopper tools on top of WooCommerce, which still
  runs the store.
- **Membership** has a full payments module: a gateway interface with Stripe, PayPal and offline gateways,
  checkout, invoices, plan changes, single-item purchase, coupons, tax by country and gifts.
- **Forms** has its own payments too: product and amount fields, a Take payment action, and its *own* Stripe,
  PayPal and offline gateway classes and coupons.

The CRM already has a provider-neutral hook for stores, its purchase summaries (orders, total spent, products
bought per contact, per provider), and POS Sync already uses store drivers. So the connection points for a new
store exist. The payment code does not have one shared home.

## Options considered

1. **Keep WooCommerce as the engine and extend the WooCommerce extension.** Least work, and compatible with
   WooCommerce's plugin market. But the store stays a separate system with its own customers, checkout and
   account pages, and every connection to Membership or the CRM is a bridge into tables Unyson+ does not own.
2. **Stretch Membership's single-item purchase into a light digital store.** Small, and it reuses everything,
   but it has no catalogue, variants, stock or delivery, so it cannot become a real store.
3. **A native Shop extension, on a shared payments core.** The most work. It gives one customer, one checkout,
   one ledger and one account page across products, plans, bookings and paid forms, and it removes the
   duplicated gateway code instead of adding a third copy.

## Decision

Build **Shop**, a native store extension (`shop`, repository `UnysonPlus-Shop-Extension`). Start with
**Phase 0**: a shared **Payments** extension (`payments`) that merges the Membership and Forms gateways,
ledger, invoices, tax and coupons, with Membership, Forms and Bookings moved onto it through thin adapters and
a one-time migration. Shop is built on that core. The WooCommerce extension stays for sites that keep running
WooCommerce, and Shop gets a WooCommerce importer.

The phased plan lives on the [Shop roadmap](/extensions/shop/roadmap).

## Why

- **The point of a native store is the connection.** That only works if there is one checkout and one payment
  record. Building the store on Membership's gateways, or giving it a third set, would leave payments in two or
  three places that drift apart.
- **The duplication already costs something.** A new gateway, a fix to webhook handling, or a tax rule has to be
  written twice today. One core means it is written once and works in the store, the memberships, the forms and
  the bookings.
- **The connection points are ready.** The CRM's purchase summaries, Membership's member area and access engine,
  and POS Sync's store drivers were all designed to be plugged into, so most of Phase 5 is adapters rather than
  new systems.
- **WooCommerce users are not stranded.** Its extension keeps working, and the importer gives them a path
  across when they want one.

*Status: Accepted.*
