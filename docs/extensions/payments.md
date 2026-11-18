---
sidebar_position: 19
title: "Payments — One Payments System for Every Unyson+ Extension"
sidebar_label: "Payments"
description: "Payments is the shared payments core of Unyson+: payment providers and their methods, one-off payments and subscriptions, one list of every payment and refund, a waiting state for bank transfers and cash, and webhooks. It is hidden, and switches on by itself the first time a feature takes money."
keywords: [wordpress payments, stripe wordpress, paypal wordpress, wordpress subscriptions, recurring payments, bank transfer payments, payment gateway api, refunds, payment webhooks, unyson payments]
---

# Payments

Payments is the part of Unyson+ that takes money. It is built once and shared, so the shop, memberships, paid
forms and bookings do not each carry their own copy of Stripe, PayPal and refunds.

:::note Where this stands
Payments takes **one-off payments and subscriptions**, and is the foundation the planned
[Shop](./shop/roadmap) is built on. **Membership can use it**, as a choice you switch on
([how](/membership/selling/payments#one-payment-system-for-the-whole-site-optional)); by default it keeps its
own payment settings. Forms and Bookings still use their own. Nothing changes on a site that already takes
payments until you choose it.
:::

## It switches on by itself

You will not find Payments in **Unyson+ → Extensions**. It is hidden on purpose: a site with a catalogue, a free
members area or a contact form never needs it, so it is not loaded there.

It is installed and switched on the first time a feature needs to take money. From then on a **Payments** item
appears in the admin menu. It stays installed even if you later stop selling, because it holds your payment
records.

## The Payments screen

**Payments → All payments** lists every payment from every extension in one place.

<img src="/img/extensions/payments/payments-list.png" alt="The Payments list: two totals at the top, filters, and one row per payment with customer, what it was for, method, amount, status and date" width="1672" />

- **Received this month** is the money that came in, with refunds taken off. A site that sells in more than one
  currency sees one total per currency.
- **Waiting for payment** counts the bank transfers and cash payments you still have to mark as received. The
  same number shows as a badge on the menu item.
- Filter by **status**, by **where it came from** (Shop, Membership, Forms, Bookings), or search by reference,
  name or email.

### Statuses

| Status | What it means |
| --- | --- |
| **Not finished** | The customer started paying and has not come back yet. |
| **Waiting for payment** | The customer was told how to pay (a bank transfer, cash) and the money has not arrived. |
| **Paid** | The money arrived. |
| **Failed** | The card was declined or the bank said no. |
| **Cancelled** | The customer gave up, the payment page expired, or you cancelled it. |
| **Partly refunded** | Some of the money was given back. |
| **Refunded** | All of it was given back. |

A payment marked **Test** was made while its provider was in test mode: no real money moved.

### One payment

Click a reference to open the payment: what it was for, who paid, the provider's own reference, and a **History**
of everything that happened to it and when.

<img src="/img/extensions/payments/payment-waiting.png" alt="One payment waiting for a bank transfer: its details, the instructions the customer was given, the Mark as received and Cancel buttons, and its history" width="1672" />

For a payment that is waiting, **Mark as received** records that the money arrived (and tells the extension it
belongs to, so the order or booking carries on), and **Cancel this payment** closes it.

### Refunds

A paid payment has a **Refund** box. Type an amount, or leave the full amount, for a full or part refund.

<img src="/img/extensions/payments/payment-refund.png" alt="The Refund box: an amount field, a note that the money goes back through the provider, and the Refund and record-only buttons" width="577" />

- **Refund** sends the money back to the customer through the provider (Stripe, PayPal).
- **Only record a refund made elsewhere** changes nothing at the provider. Use it when you already refunded the
  customer in the provider's own dashboard, or for a bank transfer or cash payment you gave back by hand.

A refund made in the Stripe or PayPal dashboard is picked up automatically when the provider notifies the site,
so you do not need to record it twice.

## Subscriptions

**Payments → Subscriptions** lists every subscription from every extension. The item appears in the menu once
the site has its first subscription.

<img src="/img/extensions/payments/subscriptions-list.png" alt="The Subscriptions list: how many are running and how many have a failed payment, then one row per subscription with customer, what it is for, price, provider, status, the next date, and the Payments and Stop renewals buttons" width="1672" />

A subscription is billed **by the provider** (Stripe or PayPal), not by your site. Renewals keep happening even
if the site is briefly down, and each one arrives in **All payments** as its own payment, marked *Renewal*.

| Status | What it means |
| --- | --- |
| **Not started** | The customer has not finished the provider's page. |
| **In trial** | A free trial is running. The **Next** column shows the first payment date. |
| **Active** | Paid up. **Next** shows the renewal date. |
| **Payment failed** | A renewal did not go through. The provider tries the card again by itself. |
| **Paused** | Billing is on hold. |
| **Ends soon** | Renewals are stopped. What was paid for still runs to the date shown. |
| **Ended** | Nothing more will be charged. |

- **Stop renewals** stops future charges at the provider. The customer keeps what they paid for until its date.
  It also tells the extension the subscription belongs to (a membership, for example), which decides what
  happens to the customer's access.
- **Keep it running** undoes that, while the subscription has not ended yet (Stripe only; a PayPal subscription
  cannot be restarted once cancelled).
- **Payments** opens that customer's payments.

Bank transfer and cash cannot be used for a subscription, because nothing can be charged again by itself.

## Settings

**Payments → Settings** is one place for every way the site takes money.

<img src="/img/extensions/payments/settings-provider.png" alt="The Stripe section of the settings: the on/off checkbox, mode, and the key and webhook secret fields" width="982" />

- **Currency**: the three-letter code your prices are in (USD, EUR, GBP, PHP…).
- One section per **provider**, each with **Offer … at checkout** to switch it on. The badge next to the name
  shows **On**, **On · test mode**, **Needs setting up** or **Off**.
- A saved secret is never shown again. Leave the field empty to keep it, or type a new one to replace it.

| Provider | What customers can pay with | What you need |
| --- | --- | --- |
| **Stripe** | Cards, Apple Pay, Google Pay and the local methods switched on in your Stripe account, on Stripe's own payment page | A secret key and a webhook signing secret, for test and for live |
| **PayPal** | A PayPal account or a card, on PayPal's own page | A Client ID, a Secret and a Webhook ID |
| **Bank transfer or cash** | Anything paid outside the site: a bank transfer, cash on delivery, pay at the desk | The name to show at checkout and the payment instructions |

In the bank transfer instructions, `{reference}` is replaced by the payment's reference and `{amount}` by the
amount.

### Webhooks

A webhook is how a provider tells your site that a payment went through, even if the customer closed the tab.
Each provider's settings show the address to give it, in this form:

```
https://your-site.com/wp-json/fw-payments/v1/webhooks/stripe
https://your-site.com/wp-json/fw-payments/v1/webhooks/paypal
```

The settings list the exact events to select for each provider. Every notification is checked before it is
believed: Stripe's by its signature, PayPal's by asking PayPal.

## Limits of this version

- **No coupon codes, invoices or tax rules yet.** Payments applies a discount or a tax rate it is given; the
  codes, the invoice documents and the per-country tax rules move in from Membership and Forms later.
- **PayPal cannot change the price of a running subscription** or restart a cancelled one. Stripe can do both.
- **Three providers.** Local providers come next on the [roadmap](./shop/roadmap): the Philippines first (GCash,
  Maya, QR Ph), then Southeast Asia, then other regions.
- Forms and Bookings do not use it yet. Membership does when its **Payment system** setting says so.

## For developers

Code that talks to Payments is always guarded with `class_exists( 'FW_Payments' )`, because the extension may
not be active.

### Switch it on

Call this from the admin action that turns a paid feature on. It installs the extension if it is missing and
activates it. It needs a user who may manage extensions, and the extension loads from the next request.

```php
$r = fw_ext_ensure_active( 'payments' );
if ( is_wp_error( $r ) ) {
    // Show $r->get_error_message() to the admin.
}
```

### Offer the methods

```php
$methods = FW_Payments::methods( array( 'currency' => 'PHP', 'country' => 'PH', 'amount' => 1500 ) );
// "stripe:stripe" => array( 'gateway' => 'stripe', 'method' => 'stripe', 'label' => 'Card',
//                           'description' => '…', 'delayed' => false ), …
```

Only providers that are switched on and set up are returned. `delayed` means the money arrives later.

### Ask for a payment

```php
$r = FW_Payments::charge( array(
    'source'      => 'shop',          // who is asking
    'source_id'   => $order_id,       // what for
    'amount'      => 49.00,           // the total, tax included
    'tax'         => 4.00,
    'currency'    => 'USD',
    'description' => 'Order S-1001: Mug, Poster',
    'customer'    => array( 'user_id' => 7, 'email' => 'ana@example.com', 'name' => 'Ana', 'country' => 'US' ),
    'gateway'     => 'stripe',
    'method'      => 'stripe',
    'urls'        => array( 'success' => $thanks_url, 'cancel' => $checkout_url ),
) );
```

It returns a `WP_Error`, or an array:

| `status` | What to do |
| --- | --- |
| `pending` with `redirect` | Send the customer to that address (the provider's payment page). |
| `waiting` with `instructions` | Show the instructions; the payment is marked as received later. |
| `paid` | Done. |

When the customer comes back to `urls.success`, Payments checks with the provider by itself.
`FW_Payments::returning()` gives the charge for the current request, so the page can show its status.

### Start a subscription

```php
$r = FW_Payments_Subscriptions::start( array(
    'source'      => 'membership',
    'source_id'   => $membership_id,
    'amount'      => 19.00,          // one period's price, before discount and tax
    'currency'    => 'USD',
    'bill_unit'   => 'month',        // day | week | month | year
    'bill_count'  => 1,              // every 1 month
    'trial_days'  => 14,             // optional
    'setup_fee'   => 0,              // optional, charged once with the first payment
    'discount'    => array( 'type' => 'percent', 'amount' => 20, 'duration' => 'repeating', 'months' => 3, 'code' => 'SPRING' ),
    'tax'         => array( 'rate' => 12, 'inclusive' => false, 'label' => 'VAT', 'country' => 'PH' ),
    'due_now'     => 0,              // what is charged today, for the first payment's row
    'description' => 'Gold plan, monthly',
    'customer'    => array( 'user_id' => 7, 'email' => 'ana@example.com', 'name' => 'Ana', 'country' => 'PH' ),
    'gateway'     => 'stripe',
    'method'      => 'stripe',
    'urls'        => array( 'success' => $thanks_url, 'cancel' => $checkout_url ),
) );
// array( 'id' => subscription id, 'charge_id' => first payment, 'status' => 'pending', 'redirect' => url ) or WP_Error
```

Ask for the methods with `'recurring' => true` so only those that can charge again are offered.

- `discount.duration` is `once`, `repeating` (for `months`) or `forever`; `discount.type` is `percent` or `fixed`.
- `tax` is a rate the site worked out, or `array( 'automatic' => true )` to let Stripe work it out.
- The first payment is an ordinary charge with a `subscription_id`. Each renewal is another charge with
  `type` `renewal`; an upgrade's difference is a charge with `type` `extra`. All of them fire
  `unysonplus_payments_paid`.
- The subscription is activated **before** its first charge is marked paid, so a paid listener finds its
  status and `period_end` already set.

```php
FW_Payments_Subscriptions::cancel( $id );            // stop at the end of the paid period
FW_Payments_Subscriptions::cancel( $id, true );      // stop now
FW_Payments_Subscriptions::resume( $id );            // undo a cancellation that has not taken effect
FW_Payments_Subscriptions::pause( $id, $until );     // unix time
FW_Payments_Subscriptions::unpause( $id );
FW_Payments_Subscriptions::switch_price( $id, array( 'amount' => 190, 'bill_unit' => 'year' ), 'prorate' ); // or 'none'
FW_Payments_Subscriptions::discount( $id, 30, 2 );   // 30% off the next 2 months
FW_Payments_Subscriptions::manage_url( $id, $return_url ); // where the payer changes their card

$sub     = FW_Payments_Subscriptions::get( $id );
$sub     = FW_Payments_Subscriptions::for_source( 'membership', $membership_id );
$charges = FW_Payments_Subscriptions::charges( $id );
```

Each returns `true` or a `WP_Error`. The provider is asked first, and the change is made on the site only when
the provider agreed.

| Hook | Arguments | When |
| --- | --- | --- |
| `unysonplus_payments_subscription_activated` | `$subscription`, `$ctx` | The payer agreed; it runs (or its trial does) |
| `unysonplus_payments_subscription_trial_ended` | `$subscription`, `$ctx` | The trial is over and the first period is paid |
| `unysonplus_payments_subscription_renewed` | `$subscription`, `$charge` | A renewal was paid |
| `unysonplus_payments_subscription_renewal_failed` | `$subscription`, `$charge` | A renewal payment failed |
| `unysonplus_payments_subscription_past_due` | `$subscription`, `$ctx` | It became overdue |
| `unysonplus_payments_subscription_extra_charge` | `$subscription`, `$charge` | The difference for an upgrade was charged |
| `unysonplus_payments_subscription_upcoming` | `$subscription`, `$data` | A renewal is coming (date, amount, card) |
| `unysonplus_payments_subscription_cancelling` | `$subscription`, `$ctx` | Renewals were stopped |
| `unysonplus_payments_subscription_resumed` | `$subscription`, `$ctx` | The cancellation was undone |
| `unysonplus_payments_subscription_paused` / `_unpaused` | `$subscription`, `$ctx` | Billing went on hold / came back |
| `unysonplus_payments_subscription_changed` | `$subscription`, `$ctx` | Its price was changed |
| `unysonplus_payments_subscription_ended` | `$subscription`, `$ctx` | Nothing more will be charged |

`$ctx['by']` is `site` or `provider`: who made the change. Use it so a listener does not send a change back to
where it came from.

### Hear what happened

Every extension's payments pass through the same hooks, so always check the source.

```php
add_action( 'unysonplus_payments_paid', function ( $charge ) {
    if ( 'shop' !== $charge['source'] ) {
        return;
    }
    my_shop_mark_order_paid( $charge['source_id'] );
} );
```

| Hook | Arguments | When |
| --- | --- | --- |
| `unysonplus_payments_created` | `$charge` | A charge was saved, before the provider is called |
| `unysonplus_payments_waiting` | `$charge` | The customer was told how to pay |
| `unysonplus_payments_paid` | `$charge` | The money arrived |
| `unysonplus_payments_failed` | `$charge` | The payment did not go through |
| `unysonplus_payments_cancelled` | `$charge` | It was abandoned, expired or cancelled |
| `unysonplus_payments_refunded` | `$charge`, `$amount` | Money was given back |
| `unysonplus_payments_changed` | `$charge`, `$old_status` | After any of the above |

Each hook fires **once** per change, even when a webhook arrives twice or together with the customer's return.

### Refund, and read

```php
FW_Payments::refund( $charge_id );                                // everything that is left, through the provider
FW_Payments::refund( $charge_id, 10.00 );                         // part
FW_Payments::refund( $charge_id, 10.00, array( 'online' => false ) ); // only record it

$charge  = FW_Payments::get( $charge_id );
$charges = FW_Payments::for_source( 'shop', $order_id );
```

### Ids sent to a provider

A provider is never given a bare row id. `FW_Payments_Gateway::tag( $charge_id )` gives `fwpay-12`, and
`untag()` reads it back (0 when it is not one of Payments'). One provider account often notifies more than one
address on the same site, and a bare number arriving at another extension's address could be read there as that
extension's own row.

### Add a provider

A provider is one class that extends `FW_Payments_Gateway`, and it brings its payment methods with it:
`methods( $ctx )` returns what the customer can choose for the order's currency and country.

```php
add_filter( 'unysonplus_payments_gateways', function ( $list ) {
    $list[] = new My_Gateway();
    return $list;
} );
```

A provider never changes a payment's status itself. It reports what happened with `FW_Payments::paid()`,
`waiting()`, `failed()`, `cancelled()`, `record_refund()` or `sync_refunded_total()`, and the service does the
rest.

| Filter | Use |
| --- | --- |
| `unysonplus_payments_gateways` | Register providers |
| `unysonplus_payments_methods` | Reorder, hide or rename the methods offered for an order |
| `unysonplus_payments_stripe_session` | Change the Stripe Checkout session before it is created |
| `unysonplus_payments_stripe_subscription_session` | The same, for a subscription |
| `unysonplus_payments_sources` | Name your own source in the admin list |
| `unysonplus_payments_capability` | Who may see and refund payments (default `manage_options`) |
