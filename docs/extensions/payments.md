---
sidebar_position: 19
title: "Payments — One Payments System for Every Unyson+ Extension"
sidebar_label: "Payments"
description: "Payments is the shared payments core of Unyson+: nine payment providers and their methods (Stripe, PayPal, GCash and Maya through PayMongo, Xendit, Mollie, Razorpay, Paystack, Mercado Pago, bank transfer), one-off payments and subscriptions, coupons, tax by country, numbered invoices, refunds and webhooks. It is hidden, and switches on by itself the first time a feature takes money."
keywords: [wordpress payments, stripe wordpress, paypal wordpress, gcash wordpress, xendit wordpress, mollie wordpress, razorpay wordpress, paystack wordpress, mercado pago wordpress, wordpress subscriptions, wordpress coupons, wordpress invoices, wordpress tax, payment gateway api, refunds, payment webhooks, unyson payments]
---

# Payments

Payments is the part of Unyson+ that takes money. It is built once and shared, so the shop, memberships, paid
forms and bookings do not each carry their own copy of Stripe, PayPal and refunds.

:::note Where this stands
Payments takes **one-off payments and subscriptions**, with **coupons, tax by country and numbered invoices**,
through **nine providers**. It is the foundation the planned [Shop](./shop/roadmap) is built on.
**Membership**, **Forms** and **Bookings** can all take their payments through it
([who uses it](#who-takes-payments-through-it)). Nothing changes on a site that already takes payments its
own way until its owner chooses.

Every provider has been tested against a stand-in for its service, not against a real merchant account. Try
a test payment with your own test keys before taking real money.
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

## Coupons

**Payments → Coupons** is one list of discount codes for everything the site sells. A code can work
everywhere, or only for memberships, the shop or forms, or only for the things you name.

<img src="/img/extensions/payments/coupons-list.png" alt="The Coupons list: each code with its note, its discount, what it works for, how often it was used, when it runs and its status" width="1672" />

**Add coupon** opens the form:

<img src="/img/extensions/payments/coupon-edit.png" alt="The coupon form: the code and what it takes off, where it works, and its limits" width="1672" />

| Setting | What it does |
| --- | --- |
| **Code** | What the customer types. Capitals and small letters are the same. |
| **Takes off** | A percentage, or a fixed amount in the site's currency. |
| **On a subscription** | The first payment only, the first months (you say how many), or every payment. |
| **Works for** | Membership, Shop, Forms, Bookings. Tick none and it works for everything. |
| **Only these items** | One per line, as `kind:id`: `plan:5` is the membership plan with id 5; `product:12` and `category:3` are for the shop. Empty = the whole order. |
| **Smallest order** | The order must be at least this much. |
| **Uses in total** / **Uses per customer** | Empty = no limit. A customer is known by their account, or by their email. |
| **First purchase** | Only for someone who has never paid on this site. |
| **Runs** | A first and a last day. |
| **Status** | Archived stops a code working and keeps it on record. |

Good to know:

- **A use is counted when the payment is paid.** A checkout that is started holds one use for two hours, so the
  last use cannot be taken twice; it is given back if the payment fails or is cancelled. A refund does not give
  a use back.
- **A coupon that has been used is archived, not deleted**, so its payments keep their code.
- **Membership and Forms accept these codes** while they take payments through this system. Their own coupon
  lists keep working next to it; when both lists have the same code, the extension's own wins. In a form, a
  code limited to particular items does not work (a code limited to Forms as a whole does).
- A payment's page shows the code and what it took off.

## Tax

**Payments → Tax and invoices** holds one table of tax rates for the whole site.

<img src="/img/extensions/payments/tax-settings.png" alt="The Tax settings: charge tax, whether prices include tax, your country, the name on invoices, a table of rates by country and the rate for every other country" width="982" />

1. Tick **Charge tax**.
2. Say whether **your prices** already include tax, or tax is added at checkout.
3. Type **your country** (two letters). Its rate is used when a customer's country is not known.
4. Add one row per country you charge tax in: the country, the rate, and the name it has there (VAT, GST…).
5. **Every other country** is the rate for customers anywhere else. `0` means no tax there.

What tax does and does not do:

- The tax is worked out by whatever is selling (the shop, a form) from these rates, and shown on the payment
  and its invoice.
- **Membership has its own tax settings** (Membership → Payments → Settings), including tax worked out by
  Stripe. Those stay in charge of membership payments.
- These are flat rates per country. Reduced rates for some products, or rules by state or region, need the
  `unysonplus_payments_tax_rate` filter.

### The tax report

The **Tax report** tab adds up what was received in a period, by country.

<img src="/img/extensions/payments/tax-report.png" alt="The tax report: for each country, the number of payments, what was received, the tax in it, what was refunded, the tax refunded and the tax to report" width="1672" />

- **Tax to report** is the tax collected, less the tax in what you refunded.
- Payments are counted by the day they were paid. A refund is counted in the period its payment was paid in.
- Test payments are left out.
- **Download as a spreadsheet (CSV)** gives the same table as a file.

## Invoices

Invoices are **off until you switch them on**, on the same screen.

<img src="/img/extensions/payments/invoice-settings.png" alt="The Invoices settings: the on/off checkbox, the number prefixes and digits, the next invoice number, the business name, address and tax ID, and the text at the bottom" width="982" />

Once on:

- Every payment that is **paid** gets the next invoice number (`INV-00001`, `INV-00002`…).
- Every **refund** gets a credit note (`CN-00001`…) that names the invoice it corrects, with its share of the tax.
- Numbers never repeat and never go back. **Next invoice number** lets you continue from another system by
  typing a higher number.
- Each document **keeps a copy of what it said** when it was issued: your business details, the customer, the
  lines, the tax. Changing the settings later does not change a document you already sent.

<img src="/img/extensions/payments/invoice-page.png" alt="An invoice as the customer sees it: number and date, the business and the customer, two lines, the discount, the amount before tax, VAT at 20% and the total paid" width="938" />

- The **Invoices** tab lists every invoice and credit note, with a search and a CSV download.
- A payment's page lists its documents under **Documents**. Each opens on a page of its own, with a
  **Print or save as PDF** button. The page's address carries a key, so it can be sent to the customer and
  cannot be guessed.

<img src="/img/extensions/payments/payment-documents.png" alt="A payment with a part refund: the Refund box, a Documents panel with its invoice and credit note, and the history showing when each was issued" width="577" />

- Invoices start with payments paid **after** you switch them on. Earlier payments get none.
- **Membership makes its own invoices** for membership payments, so those are left out here.

## Settings

**Payments → Settings** is one place for every way the site takes money.

<img src="/img/extensions/payments/settings-provider.png" alt="The Stripe section of the settings: the on/off checkbox, mode, and the key and webhook secret fields" width="982" />

- **Currency**: the three-letter code your prices are in (USD, EUR, GBP, PHP…).
- One section per **provider**, each with **Offer … at checkout** to switch it on. The badge next to the name
  shows **On**, **On · test mode**, **Needs setting up** or **Off**.
- A provider that is off keeps its fields folded: **Set up …** opens them.
- A saved secret is never shown again. Leave the field empty to keep it, or type a new one to replace it.

| Provider | What customers can pay with | What you need |
| --- | --- | --- |
| **Stripe** | Cards, Apple Pay, Google Pay and the local methods switched on in your Stripe account, on Stripe's own payment page | A secret key and a webhook signing secret, for test and for live |
| **PayPal** | A PayPal account or a card, on PayPal's own page | A Client ID, a Secret and a Webhook ID |
| **PayMongo** | For shops in the Philippines: GCash, Maya, QR Ph, cards, GrabPay, online banking and BillEase, on PayMongo's own page | A secret key and a webhook secret key, for test and for live |
| **Xendit** | For shops in the Philippines, Indonesia, Malaysia, Thailand and Vietnam: e-wallets, QR payments, bank transfer, cards and cash at a counter, on Xendit's own page | A secret key and the webhook verification token, for test and for live |
| **Mollie** | For shops in Europe: iDEAL, Bancontact, cards, bank transfer, Przelewy24, BLIK, TWINT and the other methods in your Mollie account, on Mollie's own page | An API key, for test and for live |
| **Razorpay** | For shops in India: UPI, cards, netbanking and wallets, on Razorpay's own page | A key ID, a key secret and a webhook secret, for test and for live |
| **Paystack** | For shops in Nigeria, Ghana, South Africa, Kenya and Côte d'Ivoire: cards, bank transfer, USSD, mobile money and EFT, on Paystack's own page | A secret key, for test and for live |
| **Mercado Pago** | For shops in Argentina, Brazil, Chile, Colombia, Mexico, Peru and Uruguay: cards, Pix and bank transfer, and cash vouchers, on Mercado Pago's own page | An access token |
| **Bank transfer or cash** | Anything paid outside the site: a bank transfer, cash on delivery, pay at the desk | The name to show at checkout and the payment instructions |

In the bank transfer instructions, `{reference}` is replaced by the payment's reference and `{amount}` by the
amount.

### GCash, Maya and QR Ph (PayMongo)

Shops in the Philippines take local payments through **PayMongo**. One PayMongo account brings several
methods, and each one you switch on is offered **by name** at checkout: a customer picks *GCash* and
PayMongo's page opens straight on GCash.

<img src="/img/extensions/payments/settings-paymongo.png" alt="The PayMongo section of the settings: mode, the secret key and webhook secret key fields for test and live, and one Offer it / Do not offer it choice for each of GCash, Maya, QR Ph, Card, GrabPay, Online banking and BillEase" width="982" />

1. Set the site's **Currency** to `PHP`. PayMongo is only offered for prices in Philippine pesos.
2. Tick **Offer PayMongo at checkout** and choose the **Mode**.
3. Paste the **secret key** from PayMongo → Developers → API keys (`sk_test_…` while testing, `sk_live_…` for
   real payments).
4. In PayMongo → Developers → Webhooks, add an endpoint for the address shown in the settings, with the events
   `checkout_session.payment.paid`, `payment.refunded` and `payment.refund.updated`. Paste the webhook's
   **secret key** (`whsk_…`).
5. For each method, choose **Offer it** or **Do not offer it**.

| Method | Offered unless you switch it off |
| --- | --- |
| **GCash** | Yes |
| **Maya** | Yes |
| **QR Ph** (any bank or e-wallet app that scans QR Ph) | Yes |
| **Card** | Yes |
| **GrabPay** | No |
| **Online banking** | No |
| **BillEase** (pay later) | No |

Good to know:

- **Offer only the methods your PayMongo account has.** PayMongo refuses a payment for a method that is not
  switched on in your account, and the customer sees its reason.
- **Nothing under ₱20.** PayMongo takes no smaller payment, so it is not offered for one.
- **No subscriptions.** An e-wallet cannot be charged again by itself, so PayMongo is not offered for a plan
  that renews. Use Stripe or PayPal for those.
- **Refunds** work from the payment's page, in full or in part, and a refund made in PayMongo's dashboard is
  picked up by itself.
- In **All payments**, the method reads *PayMongo · gcash*, and the payment's page shows what was actually
  paid with.

### Other countries: Xendit, Mollie, Razorpay, Paystack, Mercado Pago

Each of these is offered **only for prices in its own currencies**, takes **one-off payments** (not
subscriptions), and refunds in full or in part from the payment's page.

<img src="/img/extensions/payments/settings-xendit.png" alt="The Xendit section of the settings: mode, the secret keys and webhook verification tokens, the name at checkout, and one Offer it / Do not offer it choice for every method" width="982" />

| Provider | Currencies | At checkout |
| --- | --- | --- |
| **Xendit** | PHP, IDR, MYR, THB, VND | One choice that opens Xendit's page with every method your account has. You can also offer methods **by name** (GCash, Maya, QR Ph, QRIS, OVO, DANA, PromptPay, Touch 'n Go, cash at a counter…): switch on the ones your Xendit account has. |
| **Mollie** | The ones your Mollie account takes (EUR and others) | The methods switched on in your Mollie account, each by name. Your site asks Mollie for the list and keeps it for an hour. Or one choice, with the method picked on Mollie's page. |
| **Razorpay** | INR | One choice; UPI, card, netbanking or wallet is picked on Razorpay's page. |
| **Paystack** | NGN, GHS, ZAR, KES, XOF, USD | One choice that opens Paystack's page, and by name if you switch them on: Card, Bank transfer, USSD, Mobile money, EFT, QR code. Paystack needs the customer's email. |
| **Mercado Pago** | ARS, BRL, CLP, COP, MXN, PEN, UYU | One choice; the method is picked on Mercado Pago's page. A cash voucher (boleto, OXXO) is paid later: the payment waits until the money arrives. |

Setting one up:

1. Set the site's **Currency** to one the provider takes.
2. Open **Set up …**, tick **Offer … at checkout** and choose the **Mode**.
3. Paste the keys from the provider's dashboard. Each field says where to find its key.
4. Give the provider the webhook address shown in its settings, with the events listed there. **Mollie** needs
   no webhook set up: each payment tells Mollie your site's address.
5. Make a test payment in test mode before going live.

Good to know:

- **Offer by name only what your account has.** A provider refuses a payment for a method that is not
  activated in your account, and the customer sees its reason. The one choice that opens the provider's own
  page is always safe: it shows exactly what your account has.
- **A refund made in the provider's dashboard** is picked up and counted once, as with the other providers.
  Some methods cannot be refunded online at all (cash at a counter): the provider says so, and you record the
  refund by hand.
- **A site on your own computer** cannot be reached by a provider, so its notifications do not arrive there.
  The customer's return to the site still confirms the payment.
- In **All payments**, the method reads *Xendit · gcash* or *Mollie · ideal*.

### Who takes payments through it

The top of **Payments → Settings** lists the extensions that take payments, and which system each uses.

<img src="/img/extensions/payments/settings-who.png" alt="The panel at the top of the settings: Membership and Forms and Bookings, each with a badge saying whether it uses this system or its own settings, and a sentence of advice" width="982" />

| Extension | New purchases |
| --- | --- |
| **Membership** | A new site starts on this system. A site that already takes membership payments its own way stays there until you switch ([how](/membership/selling/payments#one-payment-system-for-the-whole-site-optional)). |
| **Forms**, and **Bookings** through it | **Automatic**: this system once it is switched on, unless Forms has payment keys or payments of its own. Change it in Forms Settings → Payments → **Payment system**. |
| **Shop** (planned) | Always this system. |

- **Nothing sold before is ever moved.** A subscription that renews through an extension's own Stripe or
  PayPal keys keeps renewing there, so nobody is billed twice. The panel counts those subscriptions and tells
  you to keep those keys and that webhook address until they end.
- When it says **"Its own provider keys are no longer needed"**, everything for that extension comes through
  this system.
- You can switch an extension back at any time. New purchases then use its own settings again.
- On this system, a form can also offer the other providers' methods (GCash, iDEAL…): tick **Local payment
  methods** in the form's **Payment Method** field.

### Webhooks

A webhook is how a provider tells your site that a payment went through, even if the customer closed the tab.
Each provider's settings show the address to give it, in this form:

```
https://your-site.com/wp-json/fw-payments/v1/webhooks/stripe
https://your-site.com/wp-json/fw-payments/v1/webhooks/paypal
https://your-site.com/wp-json/fw-payments/v1/webhooks/paymongo
https://your-site.com/wp-json/fw-payments/v1/webhooks/xendit
```

The settings list the exact events to select for each provider. Every notification is checked before it is
believed. Stripe's, PayMongo's, Razorpay's and Paystack's are checked by their signature, and Xendit's by its
verification token. PayPal, Mollie and Mercado Pago are asked directly: their notification only names a
payment, and your site reads that payment back from the provider with your own key.

## Limits of this version

- **Not yet tried with real money.** Every provider is tested against a stand-in for its service. Make a test
  payment with your own test keys first, above all with the regional providers: their method names and
  notification formats are the parts most likely to need a correction.
- **Subscriptions: Stripe and PayPal only.** The regional providers take one-off payments.
- **PayPal cannot change the price of a running subscription** or restart a cancelled one. Stripe can do both.
- **Membership's checkout offers Stripe, PayPal and bank transfer.** The other providers are offered in forms,
  and in the shop when it arrives.
- **Tax is a flat rate per country.** Membership keeps its own tax settings and its own invoices.
- **What a coupon applies to is typed** (`plan:5`). A picker comes with the shop.
- More providers (Flutterwave, Square, Dragonpay) are added when a shop asks for them: each is one file.

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

### Coupons

The seller checks the code and does the sum; Payments counts the use.

```php
$ctx = array(
    'source'   => 'shop',
    'currency' => 'PHP',
    'amount'   => 1500,                                   // the order, before the discount
    'items'    => array( array( 'type' => 'product', 'id' => 12, 'terms' => array( 3 ), 'amount' => 900 ) ),
    'customer' => array( 'user_id' => 7, 'email' => 'ana@example.com' ),
);
$coupon = FW_Payments_Coupons::check( 'SPRING', $ctx );  // the coupon, or WP_Error with a message for the payer
if ( ! is_wp_error( $coupon ) ) {
    $off = FW_Payments_Coupons::discount( $coupon, $ctx );
    FW_Payments::charge( array( /* … */ 'amount' => 1500 - $off, 'coupon' => $coupon['code'], 'discount' => $off ) );
}
// A subscription:
// FW_Payments_Subscriptions::start( array( …, 'coupon' => $coupon['code'],
//     'discount' => FW_Payments_Coupons::for_subscription( $coupon ) ) );
```

`charge()` checks the code once more (still active, not used up), so two people cannot take the last use. A
code that is not in the shared list is ignored: it is your own. `FW_Payments_Coupons::save()`, `find()`,
`query()`, `uses()` and `label()` do the rest; the filter `unysonplus_payments_coupon_check` can refuse a code.

### Tax

```php
$t = FW_Payments_Tax::calculate( 1500, 'PH', 'PHP' );
// { rate: 12, label: 'VAT', country: 'PH', inclusive: false, net: 1500, tax: 180, gross: 1680 }
FW_Payments::charge( array( /* … */ 'amount' => $t['gross'], 'tax' => $t['tax'] ) );

// A subscription: null when no tax applies.
$tax = FW_Payments_Tax::for_subscription( 'PH' );

// The report, by country and currency.
$rows = FW_Payments_Tax::report( '2026-11-01', '2026-11-30' );
```

Payments never adds tax by itself: the seller decides what is taxed.

### Invoices

```php
$docs = FW_Payments_Invoices::for_charge( $charge_id );  // invoices and credit notes, newest first
$url  = FW_Payments_Invoices::link( $charge_id );        // the invoice's page for the payer, or ''

add_action( 'unysonplus_payments_invoice_issued', function ( $doc, $charge ) {
    // $doc: { id, type: invoice|credit, number, charge_id, amount, tax, currency, issued_at, data }
}, 10, 2 );

// A source that makes its own invoices:
add_filter( 'unysonplus_payments_invoice_for', function ( $yes, $charge ) {
    return 'my_source' === $charge['source'] ? false : $yes;
}, 10, 2 );
```

A buyer's tax ID and address are printed when the charge's `meta` has `tax_id` and `address`.

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
rest. A refund the provider reports in a notification goes through
`FW_Payments_Gateway::refund_reported( $charge, $refund_id, $amount )`, which counts each refund once whether
it started on the site or in the provider's dashboard. The five regional providers in `gateways/` are each one
file and are the models to copy.

| Filter | Use |
| --- | --- |
| `unysonplus_payments_gateways` | Register providers |
| `unysonplus_payments_methods` | Reorder, hide or rename the methods offered for an order |
| `unysonplus_payments_stripe_session` | Change the Stripe Checkout session before it is created |
| `unysonplus_payments_stripe_subscription_session` | The same, for a subscription |
| `unysonplus_payments_paymongo_session` | Change the PayMongo Checkout Session before it is created |
| `unysonplus_payments_paymongo_api_version` | `v1` (default) or `v2` for PayMongo Checkout Sessions |
| `unysonplus_payments_xendit_channels` | The Xendit methods offered by name and their channel codes |
| `unysonplus_payments_xendit_invoice`, `_mollie_payment`, `_razorpay_link`, `_paystack_transaction`, `_mercadopago_preference` | Change what is sent to that provider before the payment page is made |
| `unysonplus_payments_razorpay_currencies` | The currencies Razorpay is offered for (default INR) |
| `unysonplus_payments_coupon_check` | Refuse a coupon for an order (return a `WP_Error`) |
| `unysonplus_payments_tax_rate` | Change the tax rate for a country (a reduced rate, an exemption) |
| `unysonplus_payments_invoice_for` | Whether Payments makes the invoice for a charge |
| `unysonplus_payments_users` | The extensions listed under "What takes payments through this system" |
| `unysonplus_payments_sources` | Name your own source in the admin list |
| `unysonplus_payments_capability` | Who may see and refund payments (default `manage_options`) |
