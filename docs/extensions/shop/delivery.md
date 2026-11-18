---
sidebar_position: 5
title: "WordPress Shipping Zones: Delivery Prices by Country, Postcode and Weight"
sidebar_label: "Delivery"
description: "Set delivery prices in the Unyson+ Shop: zones by country and postcode, a flat price, a price by weight, free delivery from an order value, and collect in person. What the checkout offers, and in what order."
keywords: [wordpress shipping zones, wordpress delivery prices, free shipping over amount wordpress, shipping by weight wordpress, local pickup wordpress, postcode shipping wordpress, unyson shop delivery]
---

# Delivery

**Shop → Delivery** sets what delivery costs. It appears once the shop sells.

<img src="/img/extensions/shop/delivery-zone.png" alt="A delivery zone named United States for the country US, with three ways to deliver: Standard delivery (3-5 days) one price 6.00, Express (next day) one price 18.00, and Free delivery free from an order of 100.00, and an empty row to add another" width="982" />

## Zones

A **zone** is a group of countries, and optionally postcodes, with its own ways to deliver. The checkout uses
the **first zone that fits** the buyer's address, so put the most specific zones first.

| Field | What to put in |
| --- | --- |
| **Name** | For you only: "Metro Manila", "Europe" |
| **Countries** | Two-letter codes with commas: `PH`, `US, CA`. A `*` means every other country. |
| **Only these postcodes** | Optional. One per line: a range `1000-1999`, a start `SW*`, or a whole postcode `90210` |

- **No zones at all**: delivery is free everywhere.
- **With zones**: an address that fits none cannot order, and the checkout's country list shows only the
  countries your zones name (unless one zone is `*`).
- To deliver to a few postcodes at one price and the rest of the country at another, make two zones for the
  same country: the postcode zone first.

## Ways to deliver

Each zone lists the ways to deliver there. The buyer sees them cheapest first.

| How it is priced | What the buyer pays |
| --- | --- |
| **One price** | The price, whatever is in the order |
| **By weight** | The price plus "Plus, per kg" times the order's weight (the unit is the shop's weight unit) |
| **Free from an order value** | Nothing, offered only from that order value (the subtotal before delivery) |
| **Collect in person** | The price, usually 0 |

- An empty name removes that way to deliver; **Save delivery** adds a fresh empty row.
- **Remove this zone** deletes the whole zone.
- Only physical products count: an order of downloads or services has no delivery step at all.
- A product's weight is set on the product (Shipping tab), per variant if they differ.

## Example

| Zone | Countries | Ways to deliver |
| --- | --- | --- |
| Metro Manila | `PH`, postcodes `1000-1999` | Courier ₱150, Collect from the studio ₱0 |
| Philippines | `PH` | By weight: ₱120 + ₱40 per kg, Free from ₱3,000 |
| Everywhere else | `*` | International ₱1,800 |

A buyer in Makati (1226) is offered the courier and pick-up; a buyer in Cebu (6000) the weight price, and
free delivery once their order reaches ₱3,000.

## For developers

Live carrier rates are added with the filter `unysonplus_shop_shipping_methods`
([developers →](/extensions/shop/developers#selling)). The zones themselves are read and saved with
`FW_Shop_Shipping::zones()` / `save()`.
