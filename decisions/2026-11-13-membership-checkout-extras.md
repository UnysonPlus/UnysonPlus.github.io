---
slug: membership-checkout-extras
title: "How should a buyer add extras (a longer video, a setup service) to a plan they are buying?"
authors: [jon]
tags: [extensions, architecture, admin-ui]
date: 2026-11-13
description: Buyers needed to add optional extras to a membership plan at the point of sale. Decision — "Checkout extras" in the Membership extension, defined per plan and applied to the price before the quote, so coupons, tax and every payment gateway handle them unchanged.
---

**The question:** How does someone buy a longer video, or their own voice, with their plan? Should we just have
one checkout that shows all the options, with checkboxes for the additions?

<!-- truncate -->

## Context

The done-for-you video service sells monthly plans through the Membership extension's checkout and PayPal. Some
buyers want more than the plan: longer videos (paid for every video, so every month), their own voice (a
one-time set-up) or an explainer (one-time). Until now the page told them to ask, and they were sent a PayPal
link by hand: friction exactly when someone is ready to pay, and nothing recorded on their membership.

The checkout already works every price out in one place, a quote that the Coupons and Tax modules adjust, and
the gateways build their payments from the price's amount and setup fee (PayPal even caches a billing plan per
combination of those numbers).

## Options considered

- **Keep sending payment links by hand.** No work, but every extra is a conversation, nothing is on the
  membership, and the buyer cannot see the full price before paying.
- **An order form in the Forms extension.** Forms already has price fields, totals and PayPal. But it lives
  beside Membership, so the member's account, plan, renewals and invoices would not know about the extras.
- **Extras in the Membership checkout, as their own line items through every gateway.** Exact, but each
  gateway, the quote, coupons and tax would all need to learn about a second kind of item.
- **Extras in the Membership checkout, applied to the price before the quote.** Each plan lists its extras;
  the ticked ones are added to the price the checkout works with: "each period" extras to the repeating
  amount, "once" extras to the setup fee (on a one-time price, both to the amount).

## Decision

**Checkout extras in the Membership extension, defined per plan and applied to the price before the quote.**
The checkout shows them as tick-boxes with the totals updating before payment; the payment and the membership
record what was bought; the invoice and the member's record list them.

## Why

- **One checkout, the full price up front.** The buyer customises the order where they pay and sees "Due today"
  and "Then each renewal" before they click.
- **Nothing downstream had to change.** Because extras become part of the price, the quote, coupons, tax, PayPal
  (subscription amount + setup fee), Stripe and bank transfer all charge the right amounts as they are. That keeps
  the feature small and the risk low.
- **Per plan, not global.** The same extra can cost more on a bigger plan ("longer videos" is per video, so a
  plan with four videos a month charges four times as much), with no formula to configure.
- **Part of the plan, so it travels.** Extras live in the plan settings, which the Membership Import / Export
  set-up file already carries.
- **Useful beyond one site.** Order bumps and upsells are a common request for any site selling memberships.

The trade-offs we accepted: extras are bought at checkout only (a running membership cannot add one), a plan
change moves to the new price without extras, and PayPal gets one billing plan per combination of extras, made
on first use.
