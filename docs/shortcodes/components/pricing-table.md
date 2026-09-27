---
title: Pricing Table
sidebar_position: 32
sidebar_custom_props: { icon: '/img/shortcode-icons/pricing-table.svg' }
---

# Pricing Table

Prices with a feature list, a "featured" highlight and a call-to-action — as comparable plan
**cards**, or as a full-width price **list** (a service menu: name and description left, price right).
Tabs: **Content**, **Design**, **Styling**, **Animations**, **Advanced**.

:::tip[💡 Web dev tip: don't make colour the only signal for the featured plan]
Roughly 1 in 12 men has some form of colour vision deficiency, so a "Most Popular" plan that stands out purely through a different background or border colour is invisible to a chunk of your visitors — pair the highlight with a visible **Badge** label so the meaning survives even if the colour doesn't register. That's why this element's highlight styling always ships alongside a text badge field rather than colour alone. [W3C WAI: use of color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)
:::

## Live demo

**▶ [See the Pricing Table live on the demos site](https://demos.unysonplus.com/shortcodes/pricing-table/)** — an interactive example you can click through.

## Content

<img src="/img/shortcodes/pricing-table-content.png" alt="Pricing Table options panel — Content tab" width="1200" />

- **Heading** — optional section heading.
- **Plans** — a repeatable list; each plan has:

| Per-plan option | Notes |
| --- | --- |
| **Plan Name** | Default `Starter` |
| **Icon** | Optional |
| **Subtitle** | Optional |
| **Currency Symbol** / **Price** / **Period** | e.g. `$` · `29` · `/mo` |
| **Features** | One per line; prefix `-` to mark a feature unavailable |
| **Featured** | Highlight this plan |
| **Ribbon / Badge** | Optional corner badge |
| **Button Label / URL** | Default `Choose Plan`; **Open in New Tab** toggle |

## Design

<img src="/img/shortcodes/pricing-table-design.png" alt="Pricing Table options panel — Design tab" width="1200" />

**Layout and Design answer two different questions.** *Layout* is how the plans are **arranged**;
*Design* is what they **look like**. Changing the layout rearranges the plans; changing the design
repaints them.

| Option | Choices |
| --- | --- |
| **Design** | Classic · Modern · Minimal · Gradient · Dark · Outline — the card **skin**: paint, not structure |
| **Layout** | **Grid** · **List** — the plans' **structure** (see below) |
| **Columns (Desktop)** | 1 · 2 · 3 · 4 · 5 — plans per row (Grid layout). `1` gives a single centred plan |
| **Gap** | Spacing between plans, from your Spacing → Gap Scale presets |
| **Featured Plan Emphasis** | Any combination of Raise / lift up · Highlight border · Glow shadow · Top badge / banner · Accent button. Leave empty for no emphasis |
| **Button Preset** | Apply a themed Button Preset (Theme Settings → General → Buttons) to every plan button. When set, it owns the button look, so "Accent button" emphasis no longer applies |
| **Text Alignment** | Left · Center · Right |

### Layouts

**Grid** — plan cards side by side. The default, and what every pricing table rendered before layouts
existed, so an existing table is unaffected by this option.

**List** — one full-width row per plan: name and subtitle on the left, price on the right, a hairline
rule between rows. This is how a salon, a restaurant or a trade writes its prices, and it is a
different *structure* rather than a different skin — which is why it is a layout and not a design. It
adds one option of its own:

| List option | Notes |
| --- | --- |
| **Divider between rows** | The hairline rule between rows. On by default |

For a price list, leave **Features** empty and drop the **Button Label** on each plan: a service menu
is a name, a description and a price, and the row reads better without an empty feature list under it.

## Styling

<img src="/img/shortcodes/pricing-table-styling.png" alt="Pricing Table options panel — Styling tab" width="1200" />

**Accent Color** (featured highlight, price, button), **Section / Card Background**, **Plan
Name / Price / Features** colors, a **Font Size Preset**, and **Margin & Padding**.
