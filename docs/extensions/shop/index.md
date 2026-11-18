---
sidebar_position: 1
title: "Shop — A Product Catalogue Built Into Unyson+"
sidebar_label: "Shop"
description: "Shop is the store built into Unyson+. This version is the catalogue: physical, digital and service products, options and variants with their own price, stock and picture, stock history, extra fields, Import / Export, and a catalog mode that shows products and takes enquiries without selling."
keywords: [wordpress product catalogue, wordpress catalog mode, wordpress product variants, request a quote wordpress, product enquiry form, wordpress stock management, wordpress shop without checkout, unyson shop]
---

# Shop

Shop is the store built into Unyson+. You add your products once, and they appear on a shop page, on category
pages, on a page of their own, and anywhere you place the **Products** element.

:::note Where this stands
This version is **the catalogue**. It shows your products and takes enquiries about them. **It does not sell
yet:** there is no cart and no checkout. Selling online comes next on the [roadmap](/extensions/shop/roadmap), and every
product you add now stays exactly as it is when it arrives.
:::

<img src="/img/extensions/shop/shop-page.png" alt="The shop page: category links across the top, then a grid of product cards, each with a picture, a name and a price; two carry a Sale flag" width="878" />

## What it does

- **Products of three kinds**: physical things you ship, digital files people download, and services.
- **Options and variants**: sizes, colours or any other choice, each combination with its own price, stock,
  SKU and picture. [Products →](/extensions/shop/products)
- **Stock** you can count, with a "running low" warning and a history of every change. [Stock →](/extensions/shop/stock)
- **Catalog mode**: show prices to everyone, to nobody or only to people who are logged in, and end each
  product in an enquiry button. [Catalog mode →](/extensions/shop/catalog-mode)
- **Import / Export**: a spreadsheet of products, and a full file to move a shop to another site.
  [Import / Export →](/extensions/shop/import-export)
- **Extra fields** from the [Custom Fields](/data-modeling/custom-fields) extension, shown as specifications.

## Switch it on

1. Go to **Unyson+ → Extensions**, find **Shop** and click **Download**, then **Activate**.
2. A **Shop** item appears in the admin menu, with Products, Categories, Tags, Stock, Enquiries,
   Import / Export and Settings.
3. Open **Shop → Products → Add product**. [How to fill a product in →](/extensions/shop/products)

Your shop page is at `your-site.com/shop/`. Add it to your menu like any other link.

## What visitors see

### The shop page and category pages

The shop page lists every published product, newest first unless you set an **Order** on a product. Each
category has a page of its own, linked across the top.

- **Products in a row** and **Products on a page** are in **Shop → Settings → The shop page**.
- A product on sale shows its old price crossed out and a **Sale** flag. A product that ran out shows
  **Out of stock**.

### The product page

<img src="/img/extensions/shop/product-page-chosen.png" alt="A product page: the picture and its gallery on the left; on the right the category, the name, the price, the short description, a Size choice and a Colour choice as swatches, the stock line, the Ask about this product button, and the SKU and tags" width="878" />

- Choosing an option changes the **price**, the **stock line**, the **SKU** and the **picture** to that
  variant's.
- A choice that is out of stock, or that you do not offer, is shown faded and crossed out.
- Under it come the **Description**, the **specifications**, and **You may also like** (other products from
  the same categories).

A product you design in the page builder is shown as you designed it, instead of this layout.

### The Products element

To show products on any page, add the **Products** element in the page builder (Components tab).

| Setting | What it does |
| --- | --- |
| **Show** | All products, the featured ones only, or the ones on sale only |
| **Categories** | Limit the grid to some categories |
| **Hide what is out of stock** | Leave out products that ran out |
| **Number of products** | How many to show |
| **Order by** | Your own order, newest, name, price or random |
| **Pages** | Numbered pages under the grid |
| **Products in a row** | 1 to 6 on a wide screen. Tablets show two, phones one. |
| **Heading tag of a product name** | Pick by its place in the page's outline |
| **Show the price / category / short description** | What each card carries |

## Extra fields (specifications)

Ingredients, materials, dimensions, care instructions: anything a product needs that Shop has no field for.

1. Switch on the [Custom Fields](/data-modeling/custom-fields) extension.
2. Add a field group and set **Show on post types** to **Products**.
3. The fields appear on every product's editing screen. Fill them in.

On the product page each group becomes a table under the description, with the group's title as its heading.
Empty fields are left out. Text, numbers, choices, switches, links, pictures and files are shown as they are;
a field that needs a design of its own (a gallery, a map, a repeater) is left for the page builder.

A physical product's **weight** and **size** are shown the same way, under **Shipping details**.

## Settings

**Shop → Settings** has four parts.

| Part | What is in it |
| --- | --- |
| **Catalog mode** | Whether prices show, and what the button on a product does. [Catalog mode →](/extensions/shop/catalog-mode) |
| **Money and measures** | The currency your prices are in, and the units for weight and size |
| **Stock** | The "running low" level, and the address that is told about it. [Stock →](/extensions/shop/stock) |
| **The shop page** | Products in a row, products on a page, and the three addresses |

- **Currency**: once the shared [Payments](/extensions/payments) system is switched on, the shop uses its currency, so
  prices and payments always agree.
- **Addresses**: the shop page (`shop`), a product (`product`) and a category (`product-category`). The three
  must differ. Changing one changes every product's address, so set them before you share links. On a site
  that also runs WooCommerce they start as `catalog`, `catalog-item` and `catalog-category`, because
  WooCommerce uses the usual ones.

## Limits of this version

- **Nothing is sold.** No cart, checkout, delivery prices or order emails yet. See the [roadmap](/extensions/shop/roadmap).
- **Digital files are not delivered yet.** You can add them and set their limits; download links are sent
  with an order, once the shop sells.
- **Up to three options, and 200 variants, per product.**
- **No product search or filters** on the shop page yet.
- **Products do not appear in search engines' shopping listings** yet. Product structured data comes with the
  SEO connection later on the roadmap.

For developers: [the Shop API](/extensions/shop/developers).
