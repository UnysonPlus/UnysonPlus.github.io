---
sidebar_position: 8
title: "WooCommerce CRM: customers, orders and abandoned carts in your WordPress CRM"
sidebar_label: "WooCommerce"
description: "Connect WooCommerce to the Unyson+ WordPress CRM: customers become contacts, orders and refunds reach the timeline, each contact's orders and total spent power segments and automations, and abandoned carts can start a follow-up."
keywords: [woocommerce crm, woocommerce customers crm, woocommerce abandoned cart email, woocommerce customer segments, woocommerce automation, wordpress crm woocommerce]
---

# WooCommerce

Switch on **WooCommerce** in **CRM → Modules** (it shows once the WooCommerce plugin is active).

## Customers become contacts

When an order is placed, the customer is found by their billing email or added as a new contact, with their
name, phone and address filled in where the contact's fields are empty (nothing your team typed is overwritten).
A customer is **not** subscribed to your newsletter by buying; they are in the CRM with the status *not
subscribed*. A paid order moves a subscriber, lead or opportunity to **customer** (you can switch that off).

## On the contact

- The **timeline** shows each order placed (with its items and total), completed, refunded or cancelled.
- The **Purchases** panel shows their number of orders, total spent and last order. Refunds and cancellations
  are taken off, so the total is what they really paid.
- Their **lifetime value** is their total spent.

## Segments and automations

- Segment rules: **Number of orders**, **Total spent**, **Last order** (*in the last 90 days*, *more than 180
  days ago*), **Bought product** (by product ID).
- Automation triggers: **Made a purchase** (optionally a product or a minimum total), **Order refunded** and
  **Abandoned a cart** (optionally a minimum cart total). Conditions can test orders and total spent.
- Lead scoring rules can give points for purchases.

## Abandoned carts

For visitors the CRM knows (logged in, or recognised by [site activity](../email-marketing/lead-scoring.md)), a
cart left without an order for the chosen number of hours (2 by default) goes on their timeline and fires
**Abandoned a cart** once. A follow-up automation might wait an hour and send a reminder, then stop as soon as
they buy (a goal on *Made a purchase*).

## Past orders

**CRM → Settings → WooCommerce → Import past orders** brings in existing orders, 200 per click, oldest first,
so customers from before the CRM have their history and totals too.

## Home

A **Latest orders from contacts** card can be added to the CRM's Home.
