---
sidebar_position: 3
title: "Traffic Reports in Visitor Insights"
sidebar_label: "Traffic reports"
description: "Choose any period with the date picker, read the Overview, compare periods, see how each channel performs, add notes to the chart, and dig into one page."
---

# Traffic reports

## Choose the period

The button at the top right of every report names the period you are looking at. Click it for the date
picker.

<img src="/img/extensions/visitor-insights/date-picker.png" alt="The date picker: two months of calendar on the left, the quick picks and Apply on the right" width="801" />

**Quick picks** (on the right) apply at once:

| Pick | Shows |
| --- | --- |
| **Today** | Today so far. New visits show within about a minute. |
| **Yesterday** | The whole of yesterday. |
| **Last 7 days**, **Last 30 days**, **Last 90 days** | That many days up to today. 30 days is where every report starts. |
| **Last 12 months** | The year up to today. |

**Any other range**, on the calendar:

1. Click the first day, then the last day. Click one day and **Apply** to see that day alone.
2. **Apply**.

Days that had visits are underlined, so you can see at a glance where there is anything to read. Days after
today, and days older than your site keeps (**Settings → Keep reports for**, 13 months by default), cannot be
picked. The arrows move between months. **Esc** or **Cancel** closes it without changing anything.

### The period follows you

The period you pick applies to **every report**, and stays when you move between them, open a page's
details, filter by channel or download a CSV. The CSV file is named after its dates.

It also sets the comparison. Every *"+12%"* compares the period with the same number of days just before it:
Today with yesterday, a picked week with the week before it.

### Good to know

- Days follow your site's time zone, and a day is the smallest unit.
- A range can be up to two years long.
- **Keywords from Search Console** run two to three days late. The fixed periods end where Search Console's
  numbers end. Today, Yesterday or a recent picked range asks for exactly those days, so the newest days may
  have no Search Console rows yet. Keywords recorded on visits are there at once.
- **Visitor paths** are kept for 7 to 90 days (**Settings → Keep visit paths**), so a longer range shows only
  the visits still in the log.
- **Heatmaps** add one more quick pick, **Since the page was last edited**. See
  [Heatmaps](./heatmaps.md#choose-a-period).

## Overview

The Overview is the summary of the period you chose: page views, unique visitors, average time on page,
pages viewed and goal completions, each with its change against the period before.

<img src="/img/extensions/visitor-insights/overview.png" alt="The Overview: five totals, a daily chart with a note marked on it, and how each channel performs" width="1672" />

Below the chart are the top pages, referrers, campaigns, devices, browsers and countries.

### What the numbers mean

| Figure | Meaning |
| --- | --- |
| **Page views** | Pages loaded by people. Bots are left out and [counted separately](./site-health.md#bots). |
| **Unique visitors** | Different visitors on each day, added up across the period. Someone who comes back on three days counts three times, because a visitor is recognised only within a day. |
| **Avg time on page** | Time the page was visible while the tab was in front, not time left open in the background. |
| **Goal completions** | Everything counted under [Goals](./goals-and-funnels.md#goals). |

### Channels

Every visit is put in one channel, from the referring site and any campaign tags on the link: **Direct,
Search, Social, AI assistants, Email, Paid, Campaign** or **Referral**.

*How each channel performs* shows, per channel, the views, time on page, how many read half the page,
goal completions and the conversion rate. **Pages** on a row opens the Pages view filtered to that
channel, so you can see which pages its visitors land on.

### Notes on the chart

Add a note for a redesign, a campaign or a price change, and it appears as a marker on that day. It is
the easiest way to answer *"what changed after we did that?"*. A site keeps up to 300 notes of up to 140
characters. You can also [edit them in a spreadsheet](./import-export.md#chart-notes).

## Pages

Every tracked page with its views, visitors, time on page and how many read at least half of it, with
each page's change against the period before. Filter by channel to re-rank the list by that channel's
views.

Below the list are **entry and exit pages**: which pages visits start and end on, with the bounce rate
of each entry page.

### Everything about one page

Click a page's title for a report on that page alone:

- its trend, and how it compares with the period before;
- **How visitors found this page**: channels, keywords and referring pages;
- **How visitors move through it**: the pages they came from and went to next;
- **What they did**: goals completed there, exit links, downloads and forms;
- **Who visited**: devices and places.

Links at the top open its heatmap, its recordings and its editor.

## Live

Page views in the last five minutes, by page. Use it to check a campaign the moment it goes out.

## On your dashboard

A **Visitor Insights** widget on the WordPress dashboard shows the week against the one before, the last
14 days at a glance, the top pages and how many page views are happening right now.

## Report downloads

**Download CSV** on the Overview and Pages views gives you **Pages**, **Sources**, **Goals** or **Daily
totals** for the chosen period, ready for a spreadsheet or a client report.

These are totals for a period, so they are for reading only. To edit data or move it to another site,
use [Import / Export](./import-export.md).
