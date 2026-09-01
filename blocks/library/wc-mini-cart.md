---
title: Mini Cart
---

# Mini Cart

A cart drawer or dropdown with its contents and a checkout button.

The block renders through the `wc_mini_cart` element — the same PHP that runs in the page builder, so the front
end is identical either way.

:::caution[Needs the WooCommerce extension *and* the WooCommerce plugin]
This element ships with the **WooCommerce** extension, which is inactive by default, and it needs the
**WooCommerce plugin** installed and active.

With either missing the block does not register at all — so it appears in the inserter exactly when it
can actually work, rather than as an entry that renders nothing.
:::

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `icon` | The trigger icon |
| `panel_style` | Drawer or dropdown |
| `drawer_backdrop` | Dim the page behind it |
| `drawer_backdrop_blur` | Blur it too |
| `trigger` | What opens the panel |
| `show_count` | Show the item count |
| `panel_title` | Heading inside the panel |
| `subtotal_label` | Label for the subtotal |
| `checkout_text` | Checkout button text |
| `footnote` | Small print under the button |
| `empty_icon` | Icon for the empty state |
| `empty_heading` | Its heading |
| `empty_text` | Its message |
| `empty_button_label` | Its button |
| `empty_button_url` | Where that button goes |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[Five options describe the EMPTY state]
Which is the state most visitors see first, and the one least often designed. They are grouped here so
it is obvious it *can* be designed — an empty cart that says "Nothing here yet — browse the shop" with
a button is worth more than one that says nothing.
:::

:::note[The panel does not open in the canvas]
And its contents are the editing user's cart, not a sample.
:::
