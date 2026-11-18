---
sidebar_position: 6
title: "Manage Orders in WordPress: Paid, Packed, Shipped, Tracking and Refunds"
sidebar_label: "Orders"
description: "Run the orders of the Unyson+ Shop: the To do list, an order's screen with what to do next, marking a bank transfer as paid, packing, sending with a tracking number, cancelling, refunds through Payments, and the history of every change."
keywords: [wordpress order management, mark order as shipped wordpress, tracking number email wordpress, bank transfer order paid, wordpress refunds, order status wordpress, unyson shop orders]
---

# Orders

**Shop → Orders** lists the orders. It opens on **To do**: orders that are paid and need packing or sending,
and orders still waiting for a bank transfer. The red number next to Shop and Orders counts the paid orders
to send.

<img src="/img/extensions/shop/orders.png" alt="The Orders list: tabs To do, All, Waiting for payment, Paid to pack, Packed, Shipped, Completed and Cancelled with counts, a search box, and eight orders with their number, customer, status, total, way of paying, delivery and date" width="1672" />

- Search by order number, name, email or phone.
- A checkout that was started but never paid is not an order yet and is not listed; it is cancelled by
  itself after the hold time, and its items are offered again.

## Statuses

| Status | Means | Next |
| --- | --- | --- |
| **Waiting for payment** | Placed with bank transfer or a counter payment; the items are set aside | Mark as paid when the money arrives |
| **Paid, to pack** | Paid; the receipt was sent | Mark as packed, or as sent |
| **Packed** | Ready to leave | Mark as sent |
| **Shipped** | On its way; the buyer was emailed | Mark as completed |
| **Completed** | Done. An order with nothing to ship (downloads, services) becomes completed as soon as it is paid. | |
| **Cancelled** | Its items went back into stock and its downloads stopped | |
| **Refunded** | All the money was returned | |

## One order

<img src="/img/extensions/shop/order.png" alt="An order's screen: What to do next with Mark as sent, Mark as packed and Cancel the order and a tracking box, then the items and sums; on the right the customer, the delivery address and way, and the payment with a link to it" width="1240" />

**What to do next** says what the order needs and offers only the buttons that make sense now.

- **The money arrived: mark as paid** (bank transfer): records the payment in Payments too, sends the receipt
  and takes the order on.
- **Mark as sent**: type the tracking number (or link) first; it goes in the email to the buyer.
- **Cancel the order**: puts the items back in stock. For an order that was already paid, cancelling does
  **not** return the money: refund it in Payments (the screen links to the payment).
- **Refunds**: open the payment (**Open the payment**) and refund all or part of it. The order shows what was
  refunded; a full refund marks it **Refunded** and stops its downloads. A refund alone does not put stock back,
  because the item may not come back; adjust stock in **Shop → Stock** when it does.

The right-hand side shows the customer (with how many orders came from the same email, and their account if
they have one), the delivery address and way, the buyer's note, and how it was paid.

### History

<img src="/img/extensions/shop/order-history.png" alt="The history of a completed order, newest first: Completed, Email sent On its way, Shipped with the tracking number, Packed, Email sent Receipt, Paid Transfer received, Order placed, and a box to add a note" width="826" />

Every change, every email sent and every note, with when and who. **Add note** writes a note only you see.

## What an order keeps

An order keeps a copy of what was bought: each product's name, its options, SKU and price at the time. Renaming
a product, changing its price or deleting it never changes an order already placed.

Orders are kept when the shop goes back to catalog mode or the extension is switched off.

## Limits of this version

- No packing slips or printed invoices from the order screen yet (invoices from Payments are linked when on).
- No editing of an order's lines after it is placed.
- No bulk actions on the list yet.

See the [roadmap](/extensions/shop/roadmap) for what comes next.
