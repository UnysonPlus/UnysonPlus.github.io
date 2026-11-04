---
sidebar_position: 8
title: "Goals and Funnels"
sidebar_label: "Goals and funnels"
description: "Count what a visit can achieve, without code: clicks on any element, reaching a page, form submissions and orders. Then see where visitors drop out."
---

# Goals and funnels

## Goals

A goal is anything a visit can achieve. The Goals view lists each one with its completions, its rate per
page view and its value, and the pages where goals are completed.

<img src="/img/extensions/visitor-insights/goals.png" alt="Goals with their completions, where they are completed, and the form for adding one" width="1672" />

### Four ways to count one

| Way | How | Example |
| --- | --- | --- |
| **Clicks on an element** | Open any element in the builder and fill in **Track as goal** in its **Advanced** tab. Elements given the same name share one goal. | A "Book now" button |
| **Reaching a page** | On the Goals view, add a goal with **A visitor reaches a page**. `*` is a wildcard. | `/thank-you/` or `/order-received/*` |
| **Automatically** | Form submissions, newsletter sign-ups, WooCommerce orders (with their value) and short-link clicks are counted as soon as those features are in use. **Switch off** stops one. | `woo_order` |
| **From your own script** | Add a *custom event* goal, then call `UnysonPlusVI.goal('signup')`. See [For developers](./developers.md#javascript). | A calculator finishing |

### Good to know

- Completions count each time, not each visitor. Someone who sends two forms counts twice.
- The rate is completions per page view.
- Only goals that exist are counted, so nobody can invent one by sending fake data.
- Removing a goal keeps its past completions in the reports.
- You can [edit page and event goals in a spreadsheet](./import-export.md#goals) and copy them to
  another site.

## Funnels

A funnel is a set of steps, such as *pricing page → contact page → demo requested*, with how many
visitors continue at each one.

<img src="/img/extensions/visitor-insights/funnels.png" alt="A funnel with its three steps and the share who continued, above the form for adding one" width="1672" />

### Build one

1. Open **Funnels** and give it a name.
2. For each step, choose **Reaches page** and an address, or a goal.
3. Add at least two steps, then **Add funnel**.

It counts visits from then on, not visits from before.

### How a step is counted

A visitor counts at a step once they have done every step before it, on the same day. Other pages may
come in between.

### Limits

- Up to 10 funnels, with 2 to 6 steps each.
- A funnel is completed within one day (site time), because a visitor is recognised only within a day.
- Visitors who share an address and browser count as one.
- With **Wait for consent everywhere** on, goals counted on the server (such as orders) still count,
  but they cannot advance a funnel.
