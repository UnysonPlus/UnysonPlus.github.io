---
sidebar_position: 4
title: Page-builder elements
---

# Page-builder elements

While WooCommerce is active, a **WooCommerce Elements** tab appears in the Unyson+ page builder.
These let a shop live anywhere — a product grid on the homepage, a cart icon in a header, a filtered
category section halfway down a landing page — rather than only on WooCommerce's own archive
templates.

This page is the *map*: what each element is for, and when to reach for it. For the full option
reference of every element, see **[WooCommerce Elements](/shortcodes/woocommerce-elements)**.

:::note[Two families of element]
The **commerce-page** elements (Cart, Checkout, My Account, Order Tracking, Product Page) are
friendly wrappers around WooCommerce's matching classic shortcode — they exist so those pages can be
built in the builder alongside everything else. The **catalog / storefront** elements are custom
UnysonPlus markup with their own option panels, styling systems and rendering.
:::

## Catalog

### Products

The workhorse. A grid **or carousel** of products from any source: recent, featured, on sale,
best-selling, top-rated, by category, by tag, by attribute, specific IDs, recently viewed, or
cross-sells.

Card layout is built on the shared **Card Rows** engine, so you decide which slots appear (image,
title, price, rating, badges, add-to-cart, quick view) and how they stack. It also supports:

- **Badges** — percentage sale badges, plus optional Featured / New / Out-of-stock badges
- **Low-stock notices** ("Only 2 left")
- **Quick View** — a modal with the image, price, rating, short description and add-to-cart
- **Load More** — AJAX pagination that appends the next page in place

Use it for a "New arrivals" strip on the homepage, a category feature block, or a full replacement
shop page built in the builder.

:::tip[Catalog Mode reaches this element]
With [Catalog Mode](./catalog-mode.md) on, Products grids drop their price and cart slots — and pick
up the enquiry button if you have configured one. You do not need to reconfigure your grids when you
switch the store to a lookbook.
:::

### Product Categories

The same card model applied to product categories — a tidy way to open a shop page with the
categories rather than the products.

### Single Product / Product Page

**Single Product** renders one chosen product as a card. **Product Page** renders the full
WooCommerce single-product template (gallery, summary, tabs, related) for a chosen product, so you
can build a bespoke landing page around a hero product.

### Add to Cart Button

A themed add-to-cart for one specific product, wearing the shared **Button Style** presets (Style,
Size, Shape, Width, Alignment) and optionally showing the price before or after the label. Keeps
WooCommerce's AJAX behavior for simple products; variable and external products link through to the
product page.

Use it in a landing-page hero, or beside a long-form product description.

## Cart and account

### Cart Icon

A cart icon with an optional count badge and total, linking to the cart. The count and total carry
fragment-target classes, so they refresh live when something is added via AJAX — no page reload.

### Mini Cart

The cart icon plus a **live flyout panel** of the cart contents: a dropdown, or a right slide-out
drawer with an optional dimmed / frosted backdrop. Fully rebrandable — Panel Title, Subtotal Label,
Checkout Button Text and a Footnote — with the relabelling scoped to just that panel so it never
leaks into the rest of the site.

The same renderer backs both this element and the **Mini Cart** header/footer element, so the cart
behaves identically whether it lives in page content or in your site chrome.

### Account · Cart · Checkout · Order Tracking

The classic commerce pages as builder elements, so those pages can carry your normal header, footer
and section styling.

:::note[These go quiet when purchasing is disabled]
Cart Icon, Mini Cart, Add to Cart Button, Cart and Checkout all render nothing on the front end when
the store is in [Catalog Mode with Disable Purchasing](./catalog-mode.md). In the builder they show
a short note explaining why.
:::

## Utility

### Product Search

A product-scoped search form, styled with the shared **Button Style** system so its submit button
matches the rest of the site.

### Product Filters

A filter **panel**: an ordered, drag-sortable stack of filter blocks — Price, Rating, Active
Filters, and one block per product attribute (Color, Size, …) — each with its own optional heading,
wrapped in a styled panel with a Card Box Style skin, optional dividers and optional collapsible
blocks.

:::caution[Filters need a shop context]
WooCommerce's filter widgets only *do* anything on shop / product-category pages, where there is a
product listing to filter. On an ordinary page the panel renders but filters nothing.
:::

### Free Shipping Bar

A progress bar toward the free-shipping threshold ("£18 away from free shipping"), for a cart page
or a mini-cart panel.

## Where the elements get their defaults

Elements carry their own options and use those — they are not overridden by the
[settings page](./settings.md), which governs WooCommerce's *own* archive and product templates. The
deliberate exception is [Catalog Mode](./catalog-mode.md), which is store-wide by design.
