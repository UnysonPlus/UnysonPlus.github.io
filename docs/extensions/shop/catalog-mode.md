---
sidebar_position: 4
title: "WordPress Catalog Mode: Show Products and Take Enquiries Without a Cart"
sidebar_label: "Catalog mode"
description: "Catalog mode in the Unyson+ Shop shows your products without selling them: show prices to everyone, hide them, or show them only to logged-in customers, and replace Add to cart with an enquiry or request-a-quote form that is kept in the admin, emailed to you and added to the CRM."
keywords: [wordpress catalog mode, hide prices wordpress, request a quote wordpress, product enquiry form, show prices to logged in users, catalogue without checkout, wholesale price hidden]
---

# Catalog mode

In catalog mode the shop shows your products without selling them. There is no cart and no checkout. Each
product ends in a button of your choice, and you decide who sees the prices.

It suits a business that quotes each job, sells through a showroom or by phone, shows trade prices only to
approved customers, or wants its range online before it sells online.

Catalog mode is **on** in this version of Shop, because selling has not arrived yet.

<img src="/img/extensions/shop/settings-catalog.png" alt="The Catalog mode settings: who sees prices, what the button on a product does, the button text, a link address, where enquiries are sent, and the message shown after sending" width="982" />

## Prices

**Shop → Settings → Catalog mode → Prices**

| Choice | What visitors see |
| --- | --- |
| **Show prices to everyone** | The price |
| **Show prices only to people who are logged in** | *Log in to see the price*; the price once they log in |
| **Hide all prices** | *Price on request* |

One product can hide its own price whatever the setting: tick **Price on request** in its **General** tab.

A hidden price is hidden everywhere: on cards, on the product page and in what the page sends to the browser.

## The button on a product

**Shop → Settings → Catalog mode → The button on a product**

| Choice | What it does |
| --- | --- |
| **An enquiry form** | Opens a short form on the product page |
| **A link to an address of yours** | Goes to your contact page, a WhatsApp address, or a phone number written as `tel:+63…` |
| **No button** | Nothing |

**Button text** changes its wording. Left empty it reads *Ask about this product*, or *Request a quote* where
the price is hidden.

## The enquiry form

<img src="/img/extensions/shop/enquiry-form.png" alt="The enquiry form open over a product page: the product and the variant chosen, then name, email, phone, how many, a question, and Send and Close buttons" width="560" />

The form already knows the product and the variant the visitor chose. It asks for a name, an email, a phone
number (optional), how many, and a question (optional).

When it is sent:

1. The enquiry is kept in **Shop → Enquiries**.
2. You get an email. Replying to it answers the customer directly. Set the address in **Send enquiries to**;
   several addresses are separated by commas.
3. If the [CRM](/crm) is active, the person becomes a contact (or is found by their email), and the enquiry
   is added to their timeline.
4. The visitor sees your **Message after sending**, or *Thank you. We will be in touch soon.*

The form is protected from bulk sending: a hidden field that only a robot fills in, a refusal of anything sent
within two seconds, and a limit of five enquiries per visitor in ten minutes.

## Shop → Enquiries

<img src="/img/extensions/shop/enquiries.png" alt="The Enquiries screen: for each enquiry, who it is from, the product and quantity, the message, the date, its status, and Reply, Mark answered, Close and Delete buttons" width="1672" />

- **Reply** opens your email program with the customer's address and a subject filled in.
- **Mark answered** and **Close** change its status, so **New** shows what still needs an answer. The number
  of new enquiries shows as a badge on the Shop menu.
- **Search** looks in the name, email, product and message.

## Good to know

- **Turning selling on later keeps every product as it is.** Catalog mode is a setting, not a different kind
  of product.
- **Enquiries are not orders.** Nothing is reserved and stock does not change.
- **Without the CRM**, enquiries are still kept and emailed.
