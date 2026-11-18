---
slug: shop-every-product-has-a-variant
title: "Where do a product's price and stock live when some products have sizes and colours and most do not?"
authors: [jon]
tags: [ecommerce, extensions, architecture]
date: 2026-11-18
description: In the Unyson+ Shop every product has at least one variant. A product without options has exactly one, with no attributes. Price, SKU, stock and picture are always on a variant, so no code asks whether a product is "simple" or "variable", and every stock change names the thing that was actually bought.
---

**The question:** A mug has one price. A T-shirt has nine, one per size and colour, each with its own stock.
Where should price, SKU and stock be stored so that the cart, the stock screen, imports and reports do not each
need two code paths?

<!-- truncate -->

## Context

The Shop's first phase is the catalogue: products, options and variants, and stock. Everything built after it
(the cart, orders, refunds, the POS connection, reports) reads prices and moves stock. Whatever shape is chosen
now is the shape all of that code is written against.

Most small shops sell mostly products with one price, and a few with options.

## Options considered

**1. Two kinds of product.** A "simple" product keeps its price and stock on the product; a "variable" product
keeps them on child records.
- The simple case is simple to store.
- Every reader and writer branches: `if simple … else …`. A cart line points at a product *or* a variation. A
  stock change targets a product *or* a variation. Turning a simple product into a variable one is a
  conversion, with rules about what happens to its old stock.

**2. Price and stock on the product, with per-option adjustments** ("Large: +2").
- Compact.
- Stock cannot be counted per combination, which is the reason shops use variants at all.

**3. Every product has at least one variant.** A product without options has exactly one, with no attributes.
- One path everywhere. A cart line, a stock change and an order line always name a variant.
- A table row for every product, even a mug. Adding the first option to a product is not a conversion: its one
  variant simply gains attributes or is replaced by the combinations.

## Decision

Option 3.

- Variants live in their own table. Options (their names, values, and how they are shown) are part of the
  product.
- A variant is found by a normalised key of its attributes, so `Size: M, Colour: Red` and
  `colour: red, size: m` are the same variant.
- Saving a product's variants makes them exactly the list given. Writing code may use `price`, `sku` and
  `stock` as a shortcut for the one variant of a product without options.
- A few values are mirrored onto the product for lists (the lowest price today, on sale, in stock, featured),
  written in one place, so sorting and filtering never read the variants table.
- Stock changes go through one class that takes a variant id and a reason, and logs every change.

## Why

The cost is one extra row per plain product. What it buys is that nothing written later has to ask what kind
of product it is holding. That matters most where mistakes are expensive: stock is decremented by one
statement against one row type, holds for customers who are paying reference the same thing, and the import
spreadsheet is simply "one row per variant" with no special rows.

It also makes the owner's screen honest. The price table in the editor shows one row called *This product* for
a mug and nine rows for a T-shirt. It is the same table.

**Status:** Accepted.
