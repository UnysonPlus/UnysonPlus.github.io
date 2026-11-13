---
sidebar_position: 2.5
title: "How to add optional extras (order bumps) to a WordPress membership checkout"
sidebar_label: "Checkout extras"
description: "Offer optional add-ons at the Unyson+ Membership checkout: a longer version, a setup service, a printed copy, or a slider to choose a length or a number. Each has its own price, paid once or with every renewal, and the totals, coupons, tax and PayPal or Stripe include them."
keywords: [wordpress checkout add-ons, price slider checkout, pay per minute video, quantity add-on wordpress, membership order bump, checkout upsell wordpress, optional extras at checkout, subscription add-on price, paypal subscription setup fee, unyson+ membership]
---

# Checkout extras

**Checkout extras** are optional add-ons a buyer can tick on the checkout page, next to the plan they are
buying: a longer version, a setup service, a priority turnaround, a printed copy. Each extra has its own
price, and the buyer sees the total change before paying.

They turn "email us if you want more" into a choice the buyer makes on the spot, and every extra they tick
is paid with the plan, recorded on their membership and shown on their invoice.

<img src="/img/membership/front-extras.png" alt="The checkout for a monthly plan at USD 24.00 a month, with two extras ticked: Longer videos + USD 12.00 a month and Your own voice + USD 4.00 once, so Due today is USD 40.00 and then each renewal USD 36.00. Below, the Add to your order list with a third, unticked extra." width="680" />

Extras need the **Payments** module (**Membership → Modules**). See [Pricing table and
checkout](./pricing-and-checkout.md) for the checkout page itself.

## Add extras to a plan

1. Go to **Membership → Plans** and open the plan.
2. In the **Checkout extras** panel (under **Prices**), click **Add an extra**.
3. Fill in the row and save the plan.

<img src="/img/membership/plan-extras.png" alt="The Checkout extras panel of a plan, with three extras: Longer videos 12.00 Each period, Your own voice 4.00 Once, and Add an explainer video 19.00 Once, and an Add an extra button" width="1098" />

| Field | What it does |
| --- | --- |
| **Extra** | The name the buyer sees next to the tick-box, on the checkout lines and on the invoice. Rows without a name are dropped. |
| **Description** | One short line under the name: what they get. Optional. |
| **Amount** | The price of the extra, in the plan's currency. |
| **Paid** | **Once**: with the first payment only. **Each period**: with every payment of a repeating price. |
| **Kind** | **Tick-box**: the buyer ticks it or not. **Slider**: the buyer chooses how much (see [Slider extras](#slider-extras-let-the-buyer-choose-how-much)). |

A plan can offer up to 12 extras. Each plan has its own list, so the same extra can cost more on a bigger
plan (in the screenshot, "Longer videos" costs 12.00 a month on a plan with four videos a month and 3.00 on the
single video).

## Slider extras: let the buyer choose how much

Some add-ons are not yes-or-no but "how much": how long a video should be, how many seats, how many pages.
For those, set the extra's **Kind** to **Slider**. The buyer then drags a slider to the amount they want,
and pays for every step above what the plan already includes.

<img src="/img/membership/front-extras-slider.png" alt="The checkout for an Explainer video at USD 19.00 once. Under Add to your order, a Video length slider set to 3:00 between 1:30 and 5:00, showing + USD 18.00 once, with the line 1:30 included, then USD 6.00 for every 30 seconds more. The totals above read Video length (3:00) + USD 18.00 once and Due today USD 37.00." width="612" />

### Set one up

1. Open the plan, and in **Checkout extras** click **Add an extra**.
2. Give it a name ("Video length") and, if you like, a description ("Drag to the length you need.").
3. Set **Kind** to **Slider**. More settings appear under the description:

<img src="/img/membership/plan-extras-slider.png" alt="A Checkout extras row named Video length, Kind Slider, Amount 6.00 per step, Paid Once, with its slider settings: Shown as A time (minutes:seconds), Included 1:30, Up to 5:00, Step 0:30" width="1098" />

| Setting | What it does |
| --- | --- |
| **Shown as** | **A time (minutes:seconds)**: the values read 1:30, 2:00, 3:00. **A number**: they read 1, 2, 3 followed by the **Unit** ("seats", "pages"). |
| **Included** | Where the slider starts: what the plan's own price already covers. It costs nothing. For a time, write 1:30 or 90 (seconds). |
| **Up to** | The largest amount a buyer can choose. It is rounded down to a whole number of steps. |
| **Step** | How far one notch moves: 0:30 for half a minute, 1 for one seat. |
| **Unit** | For a number only: the word after it ("seats"). |
| **Amount** | The price of **one step**. |
| **Paid** | **Once** or **Each period**, exactly as for a tick-box extra. |

The price is the amount times the number of steps above **Included**. With the settings in the screenshots
(included 1:30, steps of 0:30 at USD 6.00, up to 5:00):

| The buyer chooses | Steps above 1:30 | The extra costs | With the USD 19.00 plan |
| --- | --- | --- | --- |
| 1:30 | 0 | Included | USD 19.00 |
| 2:00 | 1 | USD 6.00 | USD 25.00 |
| 3:00 | 3 | USD 18.00 | USD 37.00 |
| 5:00 | 7 | USD 42.00 | USD 61.00 |

### What the buyer sees

- The slider with its two ends ("1:30" and "5:00"), the value chosen, and its price ("+ USD 18.00 once", or
  **Included** at the start). The value and the price follow the slider as it moves.
- When they let go (or pause after using the arrow keys), the page refreshes the totals and keeps its place.
- Under it, the description followed by "1:30 included, then USD 6.00 for every 30 seconds more."
- In the totals, on the payment, the membership and the invoice, the extra shows with its value:
  **Video length (3:00)**.

Keep a sensible **Up to**. Past a certain size an order needs a conversation, not a price, so say so on your
page ("Longer than 5 minutes? Ask us for a price").

## How each kind is charged

| The plan's price | An extra paid **Once** | An extra paid **Each period** |
| --- | --- | --- |
| **Repeating** (every month, year…) | Paid with the first payment only. It is added to the price's setup fee. | Added to the repeating amount, so the first payment and **every renewal** include it. |
| **One-time** (one payment, lifetime) | Added to the payment. | Added to the payment (there is only one). |

With a free trial, the first payment holds only the setup fee and the **Once** extras; the **Each period**
extras start with the first paid period.

The checkout shows the result before the buyer pays:

- the plan's own price in the summary;
- one line per ticked extra ("+ USD 12.00 a month", "+ USD 4.00 once");
- **Due today** and **Then each renewal**, with any coupon and tax applied to the whole amount.

## What the buyer sees

The **Add to your order** list appears on the checkout page between the totals and the payment form. Ticking or
unticking an extra updates the price straight away (the page reloads with the new totals; without
JavaScript, the **Update the price** button does the same). The chosen extras are carried into the payment
form, so the buyer pays exactly what the totals showed.

Extras are not offered on a **free** plan or when someone buys a plan **as a gift**.

### Linking to a checkout with extras already ticked

Add `extras[]=<id>` to a checkout link for each extra to tick, where `<id>` is the extra's id (made from its
name: "Longer videos" becomes `longer-videos`):

```
/checkout/?plan=weekly&price=23&extras[]=longer-videos&extras[]=your-own-voice
```

A comma list works too: `extras=longer-videos,your-own-voice`. Ids that are not extras of that plan are
ignored.

A slider takes its value with `extras_qty[<id>]=<value>`. A time can be written as `3:00` or in seconds:

```
/checkout/?plan=videos-explainer&price=27&extras_qty[video-length]=3:00
```

A value between steps moves to the nearest step, and one outside the slider moves to its nearest end.

## Paying

Both payment services see the real amounts:

- **PayPal**: a one-time price becomes an order for the full total. A repeating price becomes a PayPal
  subscription whose monthly (or yearly…) amount includes the **Each period** extras, with the **Once** extras
  as its setup fee. Unyson+ makes one PayPal plan for each combination of extras the first time it is bought,
  and reuses it after that.
- **Stripe**: the same amounts, as the recurring price and a one-time setup line in Stripe Checkout.
- **Offline** (bank transfer): the instructions show the full total.

## What is recorded

- **The payment** keeps the list of extras it was for, with each one's name, amount and how it was paid.
- **The membership** keeps the extras it was bought with. They show as **Extras** on the member's record in
  **Membership → Members**, so you know what to deliver.
- **The invoice** has a line for each extra under the plan. A renewal invoice lists the **Each period**
  extras it includes.

## Moving a set-up to another site

Extras are part of the plan, so **Membership → Import / Export → Set-up file** carries them with the plan
and imports them back unchanged.

## Limits and notes

- **Changing an extra later** changes what new buyers see and pay. Memberships already running keep the
  amount they were bought at (their subscription was made with it). The same holds for removing an extra.
- **Extras are chosen at checkout only.** A member cannot add one to a running membership; sell it to them as
  its own plan, or change their plan.
- **A plan change** (Account → Change plan) moves to the new plan's price without extras.
- **Tax and coupons** apply to the plan and its extras together, like one price.

## For developers

- Class `FW_Membership_Extras` (Payments module): `for_plan( $plan )`, `chosen( $plan )`, `apply( $plan,
  $price, $chosen )`, `price_label( $extra, $price )`, `summary( $stored )`.
- Stored in the plan settings as `extras`: a list of `{ id, label, description, amount, billing, type }`, where
  `billing` is `once` or `each` and `type` is `fixed` (a tick-box) or `range` (a slider). A slider also has
  `start`, `max`, `step` (numbers; seconds for a time), `format` (`time` or `count`) and `unit`.
- A chosen slider comes back from `chosen()` with `value`, `steps`, `unit_amount` (the price per step) and
  `amount` (the total), and its `label` carries the value ("Video length (3:00)").
- Helpers: `parse_value( $raw, $format )`, `snap( $extra, $value )`, `format_value( $extra, $value )`,
  `step_label( $extra )`.
- `FW_Membership_Checkout::requested()` returns the price with the chosen extras applied; the original price
  is under `base` and the chosen extras under `extras`.
- Payment meta `extras` and membership meta `extras`: `{ id, label, amount, billing }` each.
- Action `unysonplus_membership_plan_main_panels` ( `$plan` ) adds a panel to the plan editor's main column.
