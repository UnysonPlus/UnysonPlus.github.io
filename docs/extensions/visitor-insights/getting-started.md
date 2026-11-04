---
sidebar_position: 2
title: "Getting Started with Visitor Insights"
sidebar_label: "Getting started"
description: "Switch on Visitor Insights, see your first page view, find your way around the reports and decide who is counted."
---

# Getting started

## Switch it on

1. Go to **Unyson+ → Extensions** and activate **Visitor Insights**.
2. Collection starts at once. There is nothing to paste into your theme and no account to create.
3. Open **Unyson+ → Visitor Insights** to see the reports.

Someone who may see the reports but not the rest of Unyson+ gets a **Visitor Insights** menu of their
own.

## See your first page view

Your own visits do not count while you are logged in as an editor, so the reports stay empty if you
only browse the site yourself. To check that it works:

1. Open your site in a private window.
2. Visit a page or two.
3. Wait about a minute and reload **Overview**.

If nothing arrives, look at **Settings → Status**. It says which collector is in use and whether a
consent plugin is holding tracking back.

## Find your way around

Every screen shares one sidebar, grouped by the question each view answers. The period switch (7, 30
or 90 days, or 12 months) sits at the top right.

<img src="/img/extensions/visitor-insights/sidebar.png" alt="The Visitor Insights sidebar, with views grouped by the question each one answers" width="220" />

| Group | Views |
| --- | --- |
| *(top)* | [Overview](./traffic.md#overview), [Live](./traffic.md#live), [Visitor map](./how-visitors-found-you.md#visitor-map) |
| **How they found you** | [Keywords](./how-visitors-found-you.md#keywords), [Referring pages](./how-visitors-found-you.md#referring-pages), [Visitor paths](./how-visitors-found-you.md#visitor-paths) |
| **Behaviour** | [Pages](./traffic.md#pages), [Heatmaps](./heatmaps.md), [Recordings](./recordings.md), [Forms](./behaviour.md#forms), [Site search](./behaviour.md#site-search), [Exit links & downloads](./behaviour.md#exit-links-and-downloads) |
| **Conversions** | [Goals](./goals-and-funnels.md#goals), [Funnels](./goals-and-funnels.md#funnels), [A/B tests](./ab-tests.md) |
| **Site health** | [Frustration](./site-health.md#frustration), [Performance](./site-health.md#performance), [Bots](./site-health.md#bots) |
| **Setup** | [Import / Export](./import-export.md), [Settings](./settings.md) |

**Hide the WordPress menu** at the bottom of the sidebar gives the reports the whole screen.

## Decide who is counted

**Settings → Logged-in users** sets this:

| Choice | Who is counted |
| --- | --- |
| Track them, except people who can edit content *(default)* | Customers and members, but not you or your editors |
| Track nobody who is logged in | Only logged-out visitors |
| Track everyone, editors included | Everyone |

Some pages are never tracked: cart, checkout and account pages, previews, and the Live Editor. Add your
own under **Settings → Pages not to track**, one path per line, with `*` as a wildcard
(`/members/*`). Visits from an address you list under **Excluded IPs** are never counted either.

## Decide about consent

Visitor Insights uses no cookies and keeps no IP addresses, but whether you may track without asking
depends on where your visitors are. Read [Privacy and consent](./privacy.md) before going live, and
put `[visitor_insights_optout]` on your privacy page.

## Page caches and security plugins

Tracking works on cached pages, because it needs nothing per visitor in the HTML. A cached page keeps
reporting for 45 days.

If your host blocks the fast collector, Visitor Insights notices and switches to the WordPress REST API
by itself. Visits are still complete, just slower to record. **Settings → Status** shows which one is
in use, and **Check the collector again** retests it.

After you change a setting or an A/B test, common page caches are cleared for you. If yours is not one
of them, clear it by hand.

## What to do first

1. Add your first [goal](./goals-and-funnels.md#goals), such as your thank-you page.
2. Connect [Search Console](./how-visitors-found-you.md#keywords) to see search words.
3. Download the free [city database](./how-visitors-found-you.md#regions-and-cities) for regions and
   cities.
4. Switch on the [weekly email](./email-alerts-ai.md#weekly-email).
