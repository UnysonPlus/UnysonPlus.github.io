---
slug: membership-slider-extras
title: "How should a buyer order a video of any length, like 3 minutes, without a quote?"
authors: [jon]
tags: [extensions, architecture, admin-ui]
date: 2026-11-13
description: Buyers wanted to choose a custom video length at checkout. Decision — a "Slider" kind of checkout extra, priced per step above what the plan includes, capped at a maximum, with anything beyond it handled as a quote.
---

**The question:** What if the client wants a 3-minute video, or any custom length? Can the price go up by
itself as the client chooses a longer video?

<!-- truncate -->

## Context

The done-for-you video service sells reels up to 30 seconds, a "longer videos" extra up to 60 seconds and an
explainer of 60 to 90 seconds. Requests for longer videos (a walkthrough, an "about us" film) had no price, so
they needed a conversation exactly when the buyer was ready to pay.
[Checkout extras](./2026-11-13-membership-checkout-extras.md) had just made add-ons part of the checkout, but
each extra was a fixed amount behind a tick-box.

## Options considered

- **More fixed tiers** ("up to 3 minutes", "up to 5 minutes" as tick-boxes or plans). Simple, but a list of
  near-identical choices, and every new length means a new row.
- **A quote for everything longer.** Fair for odd jobs, but a slow path for the common case of "just a bit
  longer".
- **A free number field** ("how many minutes?"). Flexible, but prices like 2:47 read badly, and PayPal would
  get a billing plan for every distinct amount.
- **A slider extra: steps above what is included, up to a maximum.** The buyer drags to the length, sees the
  price follow, and the total updates.

## Decision

**A "Slider" kind of checkout extra** in the Membership extension: the plan sets what is included, the
maximum, the step and the price per step (as a time or a number with a unit). The explainer includes 90
seconds for US$19, then US$6 for every 30 seconds up to 5 minutes. Longer than that is a quote, offered on the
page and in the request form.

## Why

- **The price is visible before anyone asks.** A 3-minute explainer is US$37 on the slider, with no email
  needed.
- **Steps, not any number.** Steps keep prices readable, keep the per-minute rate steady and keep the number
  of PayPal billing plans small.
- **A maximum on purpose.** Past a few minutes the work depends on the client's material more than on the
  clock, so a fixed price would be wrong one way or the other. The cap turns those orders into a quote instead.
- **Nothing downstream changed.** The slider becomes an ordinary extra with a computed amount ("Video length
  (3:00)"), so the quote, coupons, tax, gateways, invoice and records handle it as they already did.
- **Useful beyond videos.** Seats, pages and hours are sold the same way.

The trade-off we accepted: monthly reel plans keep the simple "Longer videos" tick-box, because a length
slider multiplied by several videos a month reads confusingly. The slider is used where one purchase is one
video.
