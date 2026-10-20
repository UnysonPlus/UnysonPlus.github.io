---
slug: forms-own-payments
title: "Why does Forms take payments itself instead of using Membership's checkout?"
authors: [jon]
tags: [extensions, architecture, security]
date: 2026-10-20
description: Forms gets a small payment layer of its own (an order built on the server, a payments table, pluggable gateways starting with Pay later) rather than routing form payments through Membership, which may not be active and whose checkout is built around memberships.
---

**The question:** Membership already has Stripe, PayPal, bank transfer, coupons and tax. When forms start charging
money (order forms, donations, paid registrations), should they go through Membership's checkout, or should Forms
take payments itself?

<!-- truncate -->

## Context

Forms' roadmap Phase 6 adds Product, Amount and Calculated fields and a "Take payment" action. Membership's payments
module is mature, but everything in it is shaped around a membership: a pending membership is created before the
charge, a paid payment activates it, renewals extend it, and the checkout creates an account. Many sites that want
an order form or a donation box will never switch Membership on.

## Options considered

- **Route form payments through Membership.** Reuses tested gateway code, but makes Forms depend on an extension
  most form users do not need, and forces a one-off order into a flow built for memberships and accounts.
- **Move payments into core, shared by both.** The cleanest end state, but a large refactor of a working Membership
  module before Forms has charged a single cent.
- **Give Forms its own lean payment layer.** An order worked out on the server, a payments table linked to entries,
  and gateways behind one small interface (`FW_Forms_Gateway`), starting with Pay later; Stripe and PayPal follow,
  written against the same services Membership uses.

## Decision

Forms takes payments itself. `FW_Forms_Order` builds every order from the form's own definition and the raw posted
values; the "Take payment" action records a payment against the entry and hands it to a gateway registered on
`fw_ext_forms_gateways`. Pay later ships first; card gateways come next.

## Why

- **No dependency.** An order form works on a site with Forms and nothing else.
- **The amount is never the browser's.** Prices, quantities and formulas are recomputed on the server; the live
  total on the page is display only. That rule is easier to keep in a layer built for forms than to retrofit.
- **The pieces stay swappable.** If a shared payments core is ever extracted, Forms' gateways and Membership's can
  move into it; until then neither extension waits for the other.
