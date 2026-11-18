---
sidebar_position: 2
title: "Shop Products: Prices, Options, Variants and Digital Files"
sidebar_label: "Products"
description: "How to add a product in the Unyson+ Shop: its name, description and pictures, physical, digital or service, a price and a sale price with dates, options such as size and colour, a variant for every combination, and protected files for digital products."
keywords: [wordpress add product, product variants, product options size colour, sale price dates, digital product downloads, product gallery, colour swatches wordpress]
---

# Products

**Shop → Products** lists your products with their picture, price and stock.

<img src="/img/extensions/shop/products-list.png" alt="The Products list: each row has a small picture, the name, the price or price range with a Sale tag, the stock count with a Low or Out tag, and the categories" width="1672" />

## Add a product

Click **Add product**. The screen is WordPress's own editor with one extra box, **Product details**.

| On the product | Where you type it |
| --- | --- |
| **Name** | The title at the top |
| **Long description** | The big text box |
| **Short description** | The **Excerpt** box (if you cannot see it: Screen Options, top right) |
| **Main picture** | The **Main picture** box at the side |
| **Category and tags** | The boxes at the side |
| **Order on the shop page** | **Order**, in the Page Attributes box. Lower numbers come first. |

Everything else is in **Product details**, in six tabs.

### General

<img src="/img/extensions/shop/editor-general.png" alt="The General tab: what the product is, a featured tick, a price on request tick, and the two dates a sale runs between" width="1372" />

- **What it is**: *Physical* (you ship it or hand it over), *Digital* (files the customer downloads) or
  *Service* (work you do, nothing to ship).
- **A featured product**: a **Products** element can show only these.
- **Price on request**: hides this product's price from visitors. Its button then reads *Request a quote*.
- **Sale runs**: the first and last day the sale prices apply. Leave both empty and a sale price applies as
  soon as you fill it in.

### Prices and variants

<img src="/img/extensions/shop/editor-variants.png" alt="The Prices and variants tab: two options, Size and Colour, each with its values and how it is shown; below, one row per variant with a price, a sale price, a SKU, a stock count, a picture and a tick to offer it" width="1372" />

**A product with one price** has one row, called *This product*. Type its price and you are done.

**A product that comes in sizes, colours or another choice:**

1. Click **Add an option** and name it (*Size*).
2. Type its values, separated by commas (*S, M, L*).
3. Choose how it is shown: **Buttons**, **Colour swatches** or **A drop-down list**. For swatches, pick a
   colour for each value.
4. Add a second or third option if you need one.

Every combination becomes a **variant**, one row each:

| Column | What it is |
| --- | --- |
| **Price** | What this variant costs |
| **Sale price** | A lower price. The old one is shown crossed out. |
| **SKU** | Your own code for it |
| **Stock** | How many you have. Only used when the product counts its stock. |
| **Picture** | Shown when a customer chooses this variant |
| **Offer it** | Untick a combination you do not make |

- **Give every variant this price** fills the whole column at once.
- Removing a value removes its variants. The others keep their prices and stock.
- A new variant starts from the first one's price.
- A sale price that is not lower than the price is ignored.

### Stock

Whether this product counts its stock, when it is "running low", and what happens when it runs out. This is
explained on the [Stock](./stock) page.

### Pictures

More pictures of the product, shown under the main one. Click **Add pictures**, and drag them into the order
you want. Each variant's own picture is added to the gallery by itself.

### Shipping

The product's **weight** and **size**. They are shown on the product page under *Shipping details*, and will
be used for delivery prices once the shop sells. The units are in **Shop → Settings**.

### Downloads

For a digital product: the files the customer gets.

<img src="/img/extensions/shop/editor-files.png" alt="The Downloads tab: a list of files, an Upload a file button, an Add a file by its address button, and the two limits: downloads allowed and how many days the link works" width="1372" />

- **Upload a file** keeps the file on your site in a protected folder. Nobody can reach it by its address;
  a customer downloads it through a link of their own.
- **Add a file by its address** is for a large file that stays on a file host. The customer is sent there
  after the same check.
- **Downloads allowed** and **Link works for … days** limit each purchase. Empty means no limit.

:::note
Download links are sent with an order, once the shop sells. Until then you can prepare the files and limits.
:::

On an nginx server, which ignores the folder's protection file, the files are still under long random names
that cannot be guessed, but ask your host to block the folder `wp-content/uploads/unysonplus/shop-files/` as
well.

## Good to know

- **A draft product is not shown** on the shop.
- **Deleting a product** deletes its variants. Its stock history is kept.
- **Prices are in one currency**, set in Shop → Settings.
- **Sales start and end by themselves** on the days you set. Prices on the pages change that day. The
  *on sale only* choice of a Products element, and ordering by price, catch up once a day.
