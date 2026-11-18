---
sidebar_position: 19
title: "Payments — One Payments System for Every Unyson+ Extension"
sidebar_label: "Payments"
description: "Payments is the shared payments core of Unyson+: payment providers and their methods, one list of every payment and refund, a waiting state for bank transfers and cash, and webhooks. It is hidden, and switches on by itself the first time a feature takes money."
keywords: [wordpress payments, stripe wordpress, paypal wordpress, bank transfer payments, payment gateway api, refunds, payment webhooks, unyson payments]
---

# Payments

Payments is the part of Unyson+ that takes money. It is built once and shared, so the shop, memberships, paid
forms and bookings do not each carry their own copy of Stripe, PayPal and refunds.

:::note Where this stands
This first version takes **one-off payments** and is the foundation the planned [Shop](./shop/roadmap) is built
on. **Membership and Forms still use their own payment settings today.** They move onto Payments in a later
step of the [roadmap](./shop/roadmap), together with recurring payments, coupons, invoices and tax. Nothing
changes on a site that already takes payments.
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

- **One-off payments only.** Subscriptions arrive when Membership moves onto Payments.
- **No coupons, invoices or tax yet.** They move in from Membership and Forms in the same step.
- **Three providers.** Local providers come next on the [roadmap](./shop/roadmap): the Philippines first (GCash,
  Maya, QR Ph), then Southeast Asia, then other regions.
- Membership, Forms and Bookings do not use it yet.

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
| `unysonplus_payments_sources` | Name your own source in the admin list |
| `unysonplus_payments_capability` | Who may see and refund payments (default `manage_options`) |
