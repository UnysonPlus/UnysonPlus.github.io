---
sidebar_position: 1
title: "Sales pipeline and deals board for WordPress"
sidebar_label: "Pipelines and deals"
description: "Run your sales pipeline inside WordPress: a drag-and-drop deals board with stages, values and win probabilities, deal pages and several pipelines."
keywords: [sales pipeline wordpress, wordpress deals board, kanban crm wordpress, deal tracking wordpress, wordpress crm pipeline, sales funnel crm, weighted pipeline]
---

# Pipelines and deals

A deal is something you hope to sell: a quote, a booking, a contract, a project. A pipeline is the series of
stages a deal moves through until it is won or lost. The Unyson+ CRM shows your pipeline as a board you drag
deals across, right inside WordPress.

Switch on the **Sales pipeline** module under [CRM → Modules](../workspace/settings-and-modules.md) to use it.

## The deals board

Open **CRM → Deals**.

<img src="/img/crm/deals-board.png" alt="The WordPress CRM deals board: columns per stage with deal cards, totals and drop zones for won and lost" width="1920" />

- **Columns** are the open stages. Each shows how many deals it holds and their total value.
- **Cards** show the deal's name, company, value, expected close date and owner. A card flagged as
  **stalled** has sat in its stage longer than the stage allows.
- **Drag a card** to another column to move it. Drop it on **Won** or **Lost** to close it; Lost asks for the
  reason. Everything saves at once.
- The line above the board sums it up: open deals and their value, the value weighted by each stage's
  probability, and what was won and lost in the last 30 days.
- **Only my deals**, search, and a pipeline picker (when you have more than one) filter the board.

On a phone, or without a mouse, open a deal and use its stage path instead of dragging.

## Add a deal

Click **New deal** on the board, **New → Deal** in the top bar, or **New deal** on a contact's or company's
page (which fills them in). A deal has:

- a **name** and a **value** (or let [products](./products-and-line-items.md) add the value up),
- a **currency** (the pipeline's if it has one, otherwise WooCommerce's store currency, otherwise US dollars),
- the **pipeline and stage**, an **owner**, a main **contact** and a **company**,
- an **expected close date** and, if you want to override the stage's, a **probability**.

## The deal page

<img src="/img/crm/deal-page.png" alt="A deal page in the WordPress CRM with the stage path, products, timeline, people, tasks and files" width="1920" />

- **Stage path**: click a stage to move the deal there; **Won** and **Lost** close it. Moving a closed deal
  back to an open stage reopens it.
- **About**: value, weighted value, probability, created date and how long it has been in this stage.
  **Edit** changes the details.
- **Products**, **Timeline**, **People**, **Tasks** and **Files**. Add more contacts to the deal under People. With
  the Lead scoring module on, a **Lead score** panel shows the highest score among the deal's contacts.
- **Move to bin**, at the bottom, puts the deal in the [bin](../workspace/bin-and-audit-log.md), where it can be
  restored.
- **Email** writes to one of the deal's contacts and logs it on the deal. See
  [One-to-one email](./email-and-replies.md).

Every change is on the deal's timeline, and the important ones (created, won, lost) also appear on the
contact's and company's timelines.

## Pipelines and stages

Open **Deals → Edit pipelines** (CRM managers). A new CRM starts with one **Sales** pipeline: New lead, Contacted,
Proposal sent and Negotiating, then Won and Lost.

<img src="/img/crm/pipeline-editor.png" alt="The pipeline editor: stages with their win probability and the days before a deal counts as stalled" width="1920" />

- **Stages**: add, rename, reorder and remove them. Each has a **probability** (the chance a deal at this stage
  is won, used for the weighted value) and an optional **stalled after** number of days.
- **Won** and **Lost** are always the last two stages; you can rename them (for example "Hired" and
  "Rejected" in a recruitment pipeline).
- Removing a stage moves its open deals to the first stage.
- **Several pipelines**: add one per process, such as sales and renewals. One is the default the board opens.
  A pipeline can be deleted once it has no deals, as long as it is not the only one.
- **Currency**: each pipeline can have its own. Leave it empty to use the CRM default.

## Won and lost

Closing a deal records when it closed. **Lost** asks for a reason (price, timing, chose a competitor, no
budget, no response or other); the reasons feed [sales reports](./sales-reports.md).

## Deals from other places

- **Forms**: a contact or quote form can create a deal for each submission. See
  [Forms and signups](../contacts/forms-and-signups.md).
- **Automations**: the actions **Create a deal** and **Move the deal**, and the triggers **Deal created**,
  **Deal moved to a stage**, **Deal won** and **Deal lost**. See [Automations](../email-marketing/automations.md).
- **Bookings**: with the [Bookings extension](/extensions/bookings) active, each booking is a deal worth its price
  in a **Bookings** pipeline (Requested, then Confirmed or Declined or cancelled). Confirming the booking wins the
  deal; declining or cancelling it loses it.

## Frequently asked questions

**Can I have more than one pipeline?**
Yes. Add as many as you need under **Edit pipelines** and switch between them on the board.

**What is the weighted value?**
A deal's value multiplied by its probability. A USD 1,000 deal at a 25% stage counts as USD 250, which gives
a realistic forecast of what will close.

**Can sales reps see each other's deals?**
No. A sales rep sees the deals they own; managers see everything. See [Team roles](../workspace/team-roles.md).

**Is there an API?**
Yes. See the [REST API](../developers/rest-api.md).
