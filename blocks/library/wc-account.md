---
title: Account
description: The Unyson+ Account WooCommerce block — a compact account widget that logs customers in or links to their dashboard, authored in the block editor and rendered by the WooCommerce integration.
---

# Account

A compact **account widget** for a header or menu — an account icon that opens a login / register panel when logged out, and links to the customer's dashboard when logged in. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-account/front.png" alt="The Account block — a compact account widget" width="147" />

## Options

| Option | What it does |
| --- | --- |
| Trigger | An account glyph that opens a panel (or links straight to the account area). |
| Logged out | The panel holds the login and registration forms. |
| Logged in | Links to the account dashboard — orders, addresses, downloads and details. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above uses the block's defaults:

```html
<!-- wp:unysonplus/wc-account {"upOptions":{}} /-->
```

The full-page account area (login form, dashboard, orders) is the separate **[My Account](/blocks/library/wc-my-account)** block; this one is the compact header widget.

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
