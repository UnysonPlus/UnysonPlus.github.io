---
slug: payments-hidden-and-switched-on-on-demand
title: "Where should the shared payments system live, and who turns it on?"
authors: [jon]
tags: [ecommerce, extensions, architecture]
date: 2026-11-18
description: The shared payments code becomes its own Payments extension, hidden from the Extensions list. No extension lists it as a requirement, not even Shop, because a catalog-mode shop never takes money. Each extension installs and activates it the first time one of its features needs to take a payment, and it stays installed afterwards because it holds the payment records.
---

**The question:** The store, Membership, Forms and Bookings will share one payments system. Where should it
live? On its own extension, hidden and activated automatically when needed? And what about shops in catalog
mode, which never take a payment?

<!-- truncate -->

## Context

The extension manager already has what a hidden extension needs. A manifest with `display = false` keeps an
extension out of the Extensions list. `standalone = false` marks it as something that exists only for other
extensions, and an extension listed under another's `requirements/extensions` is downloaded and activated with
it. The manager also has public `install_extensions()` and `activate_extensions()` methods.

One combination is a trap: `display = false` with `standalone = true` is activated on every site, on any admin
page load, whether or not the site sells anything.

## Options considered

1. **In the core.** Always there, nothing to install. But the public package is meant to stay lean, every site
   would carry gateway code, webhooks and ledger tables, and a payment fix would need a core release.
2. **A hidden extension that Shop, Membership, Forms and Bookings each list as a requirement.** The manager
   does all the work. But a free members site, a site with only a contact form, a bookings site without
   deposits and a catalog-mode shop would all get payment code they never use.
3. **A hidden extension that only Shop requires**, the others activating it on demand. Closer, but a
   catalog-mode shop shows products and takes enquiries without ever taking money.
4. **A hidden extension that nobody requires, switched on on demand by every extension.** One rule for all
   four, at the cost of a small shared helper in place of the manifest requirement.

## Decision

Option 4. Payments is its own extension (`payments`, repository `UnysonPlus-Payments-Extension`) with
`display = false` and `standalone = false`, and **no extension lists it as a requirement**. It is installed and
activated the first time a feature needs to take money:

| Extension | What switches Payments on |
| --- | --- |
| Shop | Selling is switched on (catalog mode off) |
| Membership | Its Payments module is switched on |
| Forms | A form gets a Take payment action |
| Bookings | A bookable gets a deposit |

Sites that already take payments through Membership or Forms get it during the one-time migration. Once
active, Payments adds its own admin screen for provider keys, the ledger, invoices, tax and coupons; hidden
from the Extensions list does not mean hidden from the owner. It is **not removed** when the last selling
feature is switched off, because it holds payment history, invoices and tax records that have to be kept. With
nothing selling, it does nothing and its menu item hides.

The phased plan is on the [Shop roadmap](/extensions/shop/roadmap).

## Why

- **Payment code only where money is taken.** Catalog shops, free memberships and plain forms are common, and
  none of them should load gateways or expose webhook endpoints.
- **One rule is easier to reason about than two.** "Whoever takes money switches it on" covers every present
  and future extension, with no special case for Shop.
- **Its own release cycle.** A gateway fix ships as a Payments release without waiting for the core.
- **Records outlive selling.** Leaving it installed protects the ledger from being lost by tidying up.

*Status: Accepted.*
