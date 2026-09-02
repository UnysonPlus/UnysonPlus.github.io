---
title: Pricing Table
description: The Unyson+ Pricing Table block — side-by-side plan cards with prices, feature lists, a featured plan and a monthly/yearly toggle, authored in the block editor and rendered by the pricing-table element.
---

# Pricing Table

Side-by-side **plan cards** — each with a price, a feature list, an optional "most popular" highlight and a call-to-action button, plus an optional monthly/yearly billing toggle. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Pricing Table element](/shortcodes/components/pricing-table) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/pricing-table/front.png" alt="The Pricing Table block — two plan cards, one highlighted" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Plans (`plans`) | The list of plan columns. Each has a **name**, **subtitle**, **price** (monthly + yearly), a **features** list (one per line; prefix a line with `-` to show it crossed out), a **featured** flag with an optional **ribbon**, and a **button**. |
| Billing toggle (`billing_toggle`, `billing_monthly_label`, `billing_yearly_label`) | Show a monthly/yearly switch that swaps each plan's two prices. |
| Layout (`columns`, `gap`, `design`, `box_style`) | Number of columns, spacing, and the card style. |
| Featured style (`featured_style`, `icon_badge_preset`) | How the highlighted plan stands out. |
| Colours (`accent_color`, `price_color`, `card_bg`, `text_color`) + Font size (`font_size_preset`) | The card palette and type scale. |
| Product schema (`product_schema`) | Emit structured data so search engines can read your prices. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/pricing-table {"upOptions":{"plans":[
  {"plan_title":"UnysonPlus","subtitle":"Everything, free","price":{"monthly":"0"},"features":"Drag-and-drop builder\n100+ content elements\nAll extensions included","featured":"yes","ribbon":"Best value","button_label":"Get UnysonPlus"},
  {"plan_title":"Typical premium","price":{"monthly":"59"},"features":"Limited elements\n- Locked add-ons","button_label":"Pay yearly"}
]}} /-->
```

## The pricing-table element

The block and the page builder's [Pricing Table element](/shortcodes/components/pricing-table) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
