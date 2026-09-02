---
title: My Account
description: The Unyson+ My Account WooCommerce block — The customer account area — a login / register form when logged out, and the account dashboard when logged in, authored in the block editor and rendered by the WooCommerce integration.
---

# My Account

The customer account area — a login / register form when logged out, and the account dashboard when logged in. It's part of the **[WooCommerce integration](/extensions/woocommerce)** — like every block in the library it's a second *authoring* surface, rendered server-side by the same code as the page builder, so the store output is identical either way.

:::note Requires WooCommerce
This block renders live store data, so it only appears (and only works) when the **WooCommerce** plugin is active.
:::

<img src="/img/blocks/wc-my-account/front.png" alt="The My Account block — the WooCommerce login / register form" width="1210" />

## Options

| Option | What it does |
| --- | --- |
| Logged out | The login and registration forms. |
| Logged in | The account dashboard — orders, addresses, downloads and details. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

The demo above uses the block's defaults on a store with sample products:

```html
<!-- wp:unysonplus/wc-my-account {"upOptions":{}} /-->
```

## WooCommerce elements

These blocks mirror the page builder's WooCommerce elements. Their full option and behaviour reference lives on the [WooCommerce elements](/shortcodes/woocommerce-elements) page.
