---
sidebar_position: 8
title: "Import and Export Shop Products (CSV and JSON)"
sidebar_label: "Import / Export"
description: "Import and export products in the Unyson+ Shop: a spreadsheet (CSV) with one row per variant for editing prices and stock in bulk, and a full Shop file (JSON) with settings, categories, options, pictures and extra fields for moving a shop between sites."
keywords: [wordpress import products csv, export products csv, bulk edit prices, bulk update stock, move shop between sites, product spreadsheet import]
---

# Import / Export

**Shop → Import / Export** takes your products out of the shop and brings them back in, on one screen.

<img src="/img/extensions/shop/import-export.png" alt="The Import / Export screen: an Export panel with a spreadsheet button and a Shop file button, and an Import panel with a file field, a tick to only check the file, and an Import button" width="1672" />

| File | For |
| --- | --- |
| **The spreadsheet (CSV)** | People. One row per variant. Change prices and stock in a spreadsheet program and import it back, or add many products at once. |
| **The Shop file (JSON)** | Moving a shop to another site. It holds everything: the settings, categories, every product with its options and their colours, variants, pictures and extra fields. |

What you export imports back in unchanged.

## Export

Click **Download the spreadsheet (CSV)** or **Download the Shop file (JSON)**. Drafts are included.

## Import

1. Choose a `.csv` or a `.json` file.
2. Leave **Only check the file and tell me what it would do** ticked the first time. Nothing is changed; you
   get a report: how many products are new, how many would change, and any problem it found.
3. Untick it and import again to do it for real.

**A product is recognised by its `product` column**, which is the last part of its address (`blue-mug`). So:

- A row whose `product` already exists **changes** that product.
- A row whose `product` is new **adds** one. It needs a `title`.
- Importing the same file twice changes nothing the second time.

## The spreadsheet's columns

A product with three variants is three rows with the same `product`. The product's own columns are filled on
its **first** row and left empty on the others.

| Column | What it holds |
| --- | --- |
| `product` | The product's address name. It ties a product's rows together. |
| `title`, `description`, `short_description` | The name and the two descriptions |
| `status` | `publish`, `draft`, `private` or `pending` |
| `type` | `physical`, `digital` or `service` |
| `categories`, `tags` | Several are separated by <code>&#124;</code> : <code>Kitchen &#124; Gifts</code>. A category that does not exist is added. |
| `image`, `gallery` | Addresses of pictures. Several gallery pictures are separated by <code>&#124;</code>. |
| `featured`, `manage_stock`, `price_hidden` | `yes` or `no` |
| `backorders` | `no`, `notify` or `yes` |
| `low_stock`, `weight`, `length`, `width`, `height` | Numbers |
| `sale_from`, `sale_to` | Dates as `2026-12-01` |
| `option1_name`, `option1_value` … `option3_name`, `option3_value` | This row's combination: `Size` and `M`, `Colour` and `Red` |
| `sku`, `price`, `sale_price`, `stock` | The variant's own values |
| `variant_image` | The address of this variant's picture |
| `enabled` | `yes` or `no`: whether this variant is offered |

Good to know:

- **Columns can be in any order**, and you can delete the ones you do not need. A column that is missing is
  left as it is on existing products.
- **Pictures are given as addresses.** One that is already in your Media Library is reused; any other is
  copied in, once.
- **Options are worked out from the rows.** A product whose rows say `Size` = `S`, `M` and `L` gets a Size
  option with those three values. How an option is shown (buttons, swatches and their colours) is not in the
  spreadsheet: an existing product keeps what it had, and the Shop file carries it.
- **Variants that are not in the file are removed** from a product that is. To change only prices, keep every
  row and edit the `price` column.
- **Stock that changes** is written to the [stock history](./stock) as *Import*.
- A cell that starts with `=`, `+`, `-` or `@` is exported with a `'` in front, so a spreadsheet program does
  not run it as a formula. It is taken off again on import.

## Not carried

- **Files uploaded for digital products.** They are protected and stay on the site they were uploaded to. A
  file given as an address is carried.
- **The stock history** and **enquiries**.
- Whether the shop sells: that is switched on by hand on each site.
