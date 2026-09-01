---
title: Pricing Table
---

# Pricing Table

Pricing plans side by side, with a monthly / yearly toggle, a featured column and per-plan feature lists.

The block renders through the [`pricing_table`](/shortcodes/components/pricing-table) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `plans` | The plans — name, price, features and button |
| `billing_toggle` | Offer a monthly / yearly switch |
| `billing_default` | Which period is shown first |
| `billing_monthly_label` | Label for the monthly option |
| `billing_yearly_label` | Label for the yearly option |
| `billing_note` | Small print under the toggle |
| `design` | Table design preset |
| `columns` | How many plans per row |
| `gap` | Space between plans |
| `featured_style` | How the featured plan is emphasised |
| `button_preset` | Button style for every plan |
| `align` | Text alignment |
| `product_schema` | Emit product structured data |
| `box_style` | Card box / border preset |
| `icon_badge_preset` | Badge behind feature icons |
| `accent_color` | Accent colour |
| `bg_color` | Section background |
| `card_bg` | Plan background |
| `title_color` | Plan name colour |
| `price_color` | Price colour |
| `text_color` | Feature text colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`plans` is a repeater]
It is an [`addable-popup`](/options/option-types/addable-popup): each plan expands in place in
the sidebar, with its own name, prices, feature list and button.
:::

:::caution[`billing_default` decides what people see first]
A yearly default advertises the lower monthly-equivalent figure. Whether that is the honest framing or
the misleading one depends on what the plans actually charge — and it is the setting most likely to be
left at whatever it happened to be.

Use `billing_note` to say plainly what a yearly price bills as.
:::

:::note[The toggle does not switch in the canvas]
It is a real control on the front end. Here it would change which prices are displayed, so the preview
would be showing one set of numbers while the sidebar edited the other.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
