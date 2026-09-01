---
sidebar_position: 3
title: Catalog Mode
---

# Catalog Mode — from lookbook to closed shop

Not every WooCommerce site is meant to take money. A showroom, a trade catalog, a portfolio of
made-to-order pieces, a shop between seasons — all of them want the product data, the categories and
the search, but not the checkout.

The extension covers that with **two layered switches** plus two options that make the result
presentable. All of them live under **Unyson+ → WooCommerce → Shop Behavior**.

| Switch | What it is |
| --- | --- |
| **Catalog Mode** | Presentational. Hides prices and add-to-cart buttons. |
| **Disable Purchasing** | Functional. Makes the store genuinely un-buyable. |
| **Enquiry Button** | Puts a link where the add-to-cart button used to be. |
| **Closed-Shop Message** | Replaces the Cart / Checkout page with a message instead of a redirect. |

:::tip[Which do I want?]
If you want a **lookbook that looks right**, Catalog Mode alone is enough. If it matters that nobody
*can* order — a price list for trade customers, a shop that is genuinely closed — turn on **Disable
Purchasing** too. Catalog Mode on its own is a visual change, and a determined visitor can work
around it.
:::

## Catalog Mode

Turning it on hides the commerce affordances everywhere:

![The shop archive in Catalog Mode](/img/extensions/woocommerce/catalog-mode.png)

Specifically, it unhooks the four WooCommerce templates that print prices and cart buttons:

| Removed | Hook |
| --- | --- |
| Loop add-to-cart button | `woocommerce_after_shop_loop_item` |
| Loop price | `woocommerce_after_shop_loop_item_title` |
| Single-product price | `woocommerce_single_product_summary` (10) |
| Single-product add-to-cart | `woocommerce_single_product_summary` (30) |

It also reaches the extension's **own** elements — a
[Products](/shortcodes/woocommerce-elements#products) grid placed on a page drops its price and cart
slots too. That matters: those cards call the WooCommerce loop template directly rather than going
through the archive hooks, so without this a "lookbook" would still be selling from every
page-builder grid on the site.

:::caution[Catalog Mode alone does not stop orders]
It hides the buttons; it does not close the store. A crafted `?add-to-cart=123` URL, a cached AJAX
button in someone's browser, or a bookmarked `/cart/` all still work, because the products are still
*purchasable* as far as WooCommerce is concerned. If that matters, read on.
:::

## Disable Purchasing

The strict variant. With Catalog Mode **and** Disable Purchasing on, the store is properly out of
commission:

- Every product reports itself **non-purchasable** (`woocommerce_is_purchasable` and the variation
  equivalent return false), so WooCommerce itself refuses to sell it.
- **Add-to-cart validation refuses every route** — the form post, the AJAX button, and the Store API
  all funnel through `woocommerce_add_to_cart_validation`.
- WooCommerce's own `?add-to-cart=` request handler is **unhooked before it runs** and the request
  parameter scrubbed, so the URL trick does nothing at all.
- **Price HTML resolves to an empty string store-wide** (`woocommerce_get_price_html`), so
  third-party widgets, related-product blocks and anything else that prints a price go quiet too —
  not just the templates Catalog Mode unhooks.
- The **Cart and Checkout pages** redirect to the shop (or show a message — see below).

Shop-only page-builder elements — **Cart icon, Mini Cart, Add to Cart button, Cart** and
**Checkout** — render nothing on the front end in this state. In the builder they show a short note
explaining why, so an element that has gone blank does not look broken.

:::note[Existing orders keep working]
The **order-received** and **order-pay** endpoints are deliberately left reachable. Someone who
placed an order before you closed the shop can still see their confirmation and pay an outstanding
order — closing the shop stops *new* orders, it does not strand old ones.
:::

## Enquiry Button

A lookbook still wants to hear from people. Turn on **Enquiry Button**, give it a **Link** (a contact
page, or a `mailto:` address) and optionally change the **Text**, and a button appears in the exact
slot the hidden add-to-cart vacated — on shop archives, on single products, and in the extension's
own product cards.

![A product card with an enquiry button in place of add-to-cart](/img/extensions/woocommerce/enquiry-button.png)

The product comes along with the click, so the form on the other end knows what the enquiry is
about:

```
https://example.com/contact/?product_id=42
                           &product=Harbor%20Canvas%20Tote
                           &product_url=https%3A%2F%2Fexample.com%2Fproduct%2Fharbor-canvas-tote%2F
```

A `mailto:` link gets the product as a **subject line** instead (`Enquiry: Harbor Canvas Tote`),
since query args mean nothing to a mail client.

:::tip[Prefilling a contact form]
Most form plugins can read a query arg into a field's default value. With the
**[Forms](/extensions/forms)** extension, add a hidden or text field and set its default from
the `product` query arg — the enquiry then arrives already saying which product it is about, and the
visitor never has to type a product name.
:::

The button carries the classes `button upwc-enquiry-btn` and a `data-product` attribute with the
product id, so it picks up your theme's button styling by default and is easy to target:

```css
.upwc-enquiry-btn {
    /* your own treatment, if the theme's .button is not right */
}
```

**Enquiry Link is required.** Without it no button renders — a button that goes nowhere is worse
than no button.

## Closed-Shop Message

By default, Disable Purchasing bounces the Cart and Checkout pages to the shop. That is tidy but
mute: someone who followed a link to the cart lands on the shop wondering whether they misclicked.

Put text in **Closed-Shop Message** and they get told instead, with a way back:

![The closed-shop message on the cart page](/img/extensions/woocommerce/closed-shop-message.png)

The message replaces the Cart / Checkout page content (at `the_content` priority 0, so it pre-empts
the cart shortcode or block that would otherwise render), followed by a **Continue browsing** link
back to the shop. Leave the field empty to keep the plain redirect.

## Recipes

### A trade catalog with no prices and an enquiry form

| Setting | Value |
| --- | --- |
| Catalog Mode | **On** |
| Disable Purchasing | **On** |
| Enquiry Button | **On** |
| Enquiry Link | your contact page |
| Closed-Shop Message | *(empty — nothing should link to the cart anyway)* |

### A shop that is temporarily closed

| Setting | Value |
| --- | --- |
| Catalog Mode | **On** |
| Disable Purchasing | **On** |
| Closed-Shop Message | "We are closed until 5 March — browse the collection and come back then." |
| Enquiry Button | Off |

Prices stay hidden while you are closed, which avoids advertising a price you might change before
reopening. If you would rather keep prices visible, leave Catalog Mode off — but note that Disable
Purchasing applies only alongside it, so a "prices visible, ordering off" state is not a combination
the switches offer today.

### A lookbook that still shows prices

Not offered as a switch — Catalog Mode hides prices and cart buttons together. To show prices but no
cart button, leave Catalog Mode off and remove the button in your theme:

```php
add_action( 'wp', function () {
    remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
} );
```

## Checking it from the outside

Worth verifying on a real store rather than trusting the switches:

1. Open a product page — no price, no add-to-cart.
2. Visit `/?add-to-cart=<product id>` — the cart stays empty.
3. Visit `/cart/` — redirected to the shop, or shown your message.
4. If you have an enquiry button, click one and confirm the product arrives in the URL.
