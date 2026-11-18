---
sidebar_position: 4
title: "Sell Online in WordPress: Cart, Checkout and Payments in the Unyson+ Shop"
sidebar_label: "Selling: cart and checkout"
description: "Switch the Unyson+ Shop from catalog mode to selling: a cart that keeps its prices current, a one-page checkout with delivery, discount codes and tax, payment by card, bank transfer and regional providers through the shared Payments system, and an order page for the buyer."
keywords: [wordpress cart and checkout, sell online wordpress, wordpress checkout page, one page checkout wordpress, wordpress bank transfer checkout, guest checkout wordpress, woocommerce alternative, unyson shop]
---

# Selling: cart and checkout

When the shop sells, every product ends in **Add to cart**, visitors fill a cart, and a one-page checkout takes
their address, a delivery choice and their payment. The money goes through the shared [Payments](/extensions/payments)
system, so every provider you set up there (card, PayPal, bank transfer, GCash and the other regional
providers) works in the shop with nothing more to set up.

## Start selling

<img src="/img/extensions/shop/settings-start-selling.png" alt="Shop settings, the panel What the shop does: Catalog mode, with the button Start selling online and the note Makes a Cart page and a Checkout page, and switches Payments on" width="982" />

1. Go to **Shop → Settings** and click **Start selling online**.
2. The shop makes two pages, **Cart** and **Checkout**, and switches **Payments** on.
3. Set up at least one way to pay in **Payments → Settings** (bank transfer needs no account anywhere).
4. Optional: set your delivery prices in **Shop → Delivery**. Until you do, delivery is free everywhere.

<img src="/img/extensions/shop/settings-selling.png" alt="The panel What the shop does now reads Selling online, with a checklist: Ways to pay ready, Delivery 3 zones, Tax and invoices, and a button Go back to catalog mode" width="982" />

The panel then says what is ready and what is not. **Go back to catalog mode** stops the cart and the checkout;
your orders, pages and products are kept, and you can start selling again at any time.

A product marked **Price on request** keeps its enquiry button even while the shop sells, so you can sell most
things online and quote for the rest. [Catalog mode →](/extensions/shop/catalog-mode)

## What the buyer sees

### Add to cart

<img src="/img/extensions/shop/product-add-to-cart.png" alt="A product page with Size L and the red Colour chosen, a quantity of 2, the Add to cart button, and under it Added to your cart. View cart" width="878" />

- The buyer picks the options and a quantity. A combination that is out of stock disables the button.
- Adding asks for more than is left? The shop says how many are left and adds nothing.
- The page does not reload. To show the number of items anywhere (a header, a menu), use the shortcode
  `[shop_cart_link]`; it prints **Cart** with the count and links to the cart.

### The cart

<img src="/img/extensions/shop/cart.png" alt="The cart: a T-shirt and a mug with their pictures, prices, quantity boxes and totals, a remove button on each line, the discount code WELCOME10 applied, and the subtotal, the discount, the subtotal after discount and a Checkout button" width="1210" />

- Changing a quantity or removing a line updates the sums at once.
- **Discount code**: the codes from **Payments → Coupons**, the same list Membership and Forms use. A code made
  for something else ("membership only") is refused with the reason.
- **Prices are always today's.** The cart keeps only what was chosen and how many, never a price, so a price
  you change reaches carts already filled. If a product sells out or is unpublished while it sits in a cart,
  the cart corrects itself and tells the buyer.
- A guest's cart is kept by a cookie; once they log in it becomes their account's cart, on any device.

### The checkout

<img src="/img/extensions/shop/checkout.png" alt="The checkout: on the left Your details, Delivery address, Delivery with Standard and Express, Payment with Card and Bank transfer, and a note; on the right Your order with the lines, the subtotal, the discount, the delivery, the total and a Place order button" width="1210" />

One page, top to bottom:

| Part | What is asked |
| --- | --- |
| **Your details** | Email (the receipt goes there), full name, phone (optional) |
| **Delivery address** | Country, address, town, postcode, state. For an order with nothing to ship (downloads, services) only the country is asked, for tax. |
| **Delivery** | The ways to deliver to that address, with their prices. Appears once the country is chosen. |
| **Payment** | The ways to pay that are on in Payments and that suit the currency, the country and the amount |
| **Anything else?** | A note for you, "make me an account", and "I agree to the terms" when you set a terms page |

<img src="/img/extensions/shop/checkout-delivery-payment.png" alt="The delivery and payment choices: Standard delivery $6.00 and Express (next day) $18.00, and Card and Bank transfer with their descriptions" width="663" />

The summary on the right follows every choice: the delivery price, the discount and the tax are worked out by
the server each time, never in the browser. **Place order** checks everything again on the server before
anything is charged, so a changed price, a code that has run out or the last item going to someone else is
caught and explained, not charged.

- **Card, PayPal and other hosted pages**: the buyer goes to the provider's page and comes back to their order.
  If they come back without paying, nothing is charged and their cart is as they left it.
- **Bank transfer and payment at a counter**: the order is placed at once and waits for the money. The buyer
  sees how to pay (your instructions, with the amount and the order number filled in) on the screen and in
  an email.
- **A free order** (a free download, or a code that covers everything) needs no payment step.

### The order page

<img src="/img/extensions/shop/order-page.png" alt="The order page: Order S-1008, Thank you. Your order is waiting for your payment, a How to pay box with the bank details and the order number to quote, the items and sums, the buyer's details and the delivery address" width="1210" />

After ordering the buyer lands on their order. It says where the order stands (waiting for payment, paid,
on its way…), how to pay when that is still to do, the tracking number once it is sent, the download links once
it is paid, and the invoice when invoices are on. The link carries a secret key, so only the buyer can open it;
it is also in every email.

## Settings for selling

<img src="/img/extensions/shop/settings-checkout.png" alt="The Checkout settings: Cart page, Checkout page, Who can buy, Terms page, Tell me about new orders at, Order numbers start with, and Keep items for a buyer who is paying 30 minutes" width="982" />

| Setting | What it does |
| --- | --- |
| **Cart page / Checkout page** | The pages that hold the Cart and Checkout elements. Made for you; pick others if you build your own. |
| **Who can buy** | Anyone (an account is offered, not required), or only people who are logged in |
| **Terms page** | When filled in, the buyer must tick "I agree to the terms" |
| **Tell me about new orders at** | Who gets the new-order email. Empty: the site's admin email. |
| **Order numbers start with** | `S-` gives S-1001, S-1002… |
| **Keep items for a buyer who is paying** | While someone is on a payment page nobody else can buy their items; after this many minutes they are offered again |

The currency, the ways to pay, coupons, tax and invoices are set in **Payments**, once for the whole site.
[Payments →](/extensions/payments)

## Elements

Both pages are page-builder pages, so you can add anything around the two elements (a heading, trust badges,
a FAQ).

| Element | Shortcode | What it shows |
| --- | --- | --- |
| **Cart** | `[shop_cart]` | The cart, the discount code box and the Checkout button |
| **Checkout** | `[shop_checkout]` | The checkout, and afterwards the buyer's order |

Neither has settings of its own: what they show comes from the shop's settings. Each has the usual Animations
and Advanced tabs. Use each once, on the page chosen in the settings.

## Emails

The shop sends these through WordPress's mail, so the [Mailer](/extensions/mailer) extension (or any SMTP plugin)
delivers them:

| Email | To | When |
| --- | --- | --- |
| **How to pay** | the buyer | An order waits for a bank transfer or a payment at a counter |
| **Receipt** | the buyer | The order is paid (with the download links) |
| **On its way** | the buyer | You mark it as sent (with the tracking number) |
| **Cancelled** | the buyer | An order they had been told about is cancelled |
| **Refund** | the buyer | Money is returned, in full or in part |
| **New order** | you | Once per order, when it is paid or waiting for its payment |

Each email lists what was bought and the sums, and links to the buyer's order page. Every email sent is
noted in the order's history.

## Limits of this version

- **One currency per site**, the one set in Payments.
- **No customer account page with past orders yet**; the buyer reaches each order from its email. It comes
  with the member area on the [roadmap](/extensions/shop/roadmap).
- **No abandoned-cart emails, gift cards or subscriptions of physical products yet** (roadmap Phase 6).
- **Delivery prices are your own table.** Live carrier rates can be added by a developer through a filter.

Next: [running the orders →](/extensions/shop/orders) · [delivery prices →](/extensions/shop/delivery)
