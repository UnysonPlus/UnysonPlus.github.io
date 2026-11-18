---
sidebar_position: 3
title: "Shop Stock: Counting, Low-Stock Alerts and Stock History"
sidebar_label: "Stock"
description: "How stock works in the Unyson+ Shop: count stock per product or per variant, get one email when something runs low, allow backorders, restock and correct counts from one screen, and see a history of every change and why it happened."
keywords: [wordpress stock management, low stock alert, stock history, inventory wordpress, backorders, out of stock, restock]
---

# Stock

A product either **counts its stock** or does not. A service or something made to order does not: it is
always available. A product on a shelf does.

## Count a product's stock

Open the product, then **Product details → Stock**.

<img src="/img/extensions/shop/editor-stock.png" alt="The Stock tab of a product: a tick to count the stock, the running low level, and what happens when it runs out" width="1372" />

1. Tick **Count the stock of this product**.
2. In the **Prices and variants** tab, type how many you have next to each variant.
3. Save.

| Setting | What it does |
| --- | --- |
| **"Running low" at** | The product is *running low* when this many or fewer are left. Empty uses the shop's own level (Shop → Settings → Stock). `0` means it is never "low". |
| **When it runs out** | *It cannot be ordered* (the page says **Out of stock**), *It can still be ordered, and the customer is told* (**Available on backorder**), or *It can still be ordered, without saying so*. |

What visitors see on the product page:

| Stock | The line under the options |
| --- | --- |
| Plenty | **In stock** |
| At or under the low level | **Only 2 left** |
| None, no backorders | **Out of stock**, and that choice is faded and crossed out |
| None, backorders told | **Available on backorder** |

## The Stock screen

**Shop → Stock** lists every variant of every product that counts its stock, with what needs attention first:
out of stock, then running low, then the rest. **Low or out** shows only those.

<img src="/img/extensions/shop/stock.png" alt="The Stock screen filtered to low or out: each row has the product and variant, its SKU, a status tag, how many are in stock, how many are held for customers paying, a box to type a change, and a History link" width="1672" />

To change stock:

1. In the **Change** box of each row you want to change, type one of these:

   | You type | What happens |
   | --- | --- |
   | `+5` | Five are added |
   | `-2` | Two are taken away |
   | `40` | The count becomes forty |

2. Under the table choose **Why**: *New stock arrived*, *Corrected by hand*, *Damaged or lost* or
   *Returned by a customer*. Add a note if you like.
3. Click **Save stock**. Rows left empty are not touched.

**Held for customers paying** is stock set aside for someone who is at the checkout. It will be used once the
shop sells; until then it is always empty.

## The history

**History**, at the end of a row, shows every change to that variant.

<img src="/img/extensions/shop/stock-history.png" alt="The stock history of one variant: for each change, when it happened, how many were added or taken, the stock afterwards, why, a note, and who did it" width="1672" />

Each line says when, how many, the stock afterwards, why, the note, and who. A sale also names its order.
Nothing can be removed from the history.

## Low-stock email

In **Shop → Settings → Stock**, type an address under **Tell me by email**.

- You get **one** email when a variant reaches its low level, and another kind when it reaches zero.
- You are not emailed again while it stays low. After you restock above the level, the next time it falls you
  are told again.
- Leave the address empty for no email. The Stock screen and the Products list still show **Low** and **Out**.

## Good to know

- **Stock typed in the product editor is applied as a difference.** If the editor showed 10 and you type 7,
  three are taken away. So a change made elsewhere while the editor was open is not undone.
- **Stock changed by an import** is written to the history as *Import*.
- **A product that stops counting its stock** keeps its numbers; they are simply not used.
