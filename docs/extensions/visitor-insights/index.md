---
sidebar_position: 1
title: "Visitor Insights — Self-Hosted Analytics and Heatmaps for WordPress"
sidebar_label: "Visitor Insights"
description: "Privacy-first, self-hosted visitor analytics for WordPress: traffic, keywords, visitor paths, a visitor map, heatmaps, section analytics, goals, funnels, A/B tests and more. Your data never leaves your site."
---

# Visitor Insights

Visitor Insights shows how people find your site and what they do on it: where they came from, what
they searched for, which pages they read, where they click, how far they scroll, and where they give
up. It is self-hosted and privacy-first: **the data stays in your own WordPress database and is never
sent to us or to anyone else.**

## What makes it different

Hosted heatmap tools have to guess what was clicked from the page's HTML, and their maps break when a
layout changes width. Unyson+ already knows every section, column and element on a builder page by a
stable ID, so Visitor Insights can:

- tie every click to a named builder element, such as *"the second button in the Pricing section"*,
  and keep the map accurate on every screen size;
- show how many visitors **reach each section** and how long they spend there, so you can see where a
  page loses people (*"62% of mobile visitors never reach Pricing"*);
- show that heat **inside the Live Editor and the page builder**, where you make the changes.

## Where to go next

| You want to… | Read |
| --- | --- |
| Switch it on and see your first numbers | [Getting started](./getting-started.md) |
| Read traffic, compare periods, see each channel | [Traffic reports](./traffic.md) |
| Know what people searched and which link they clicked | [How visitors found you](./how-visitors-found-you.md) |
| See clicks, scrolling and section reach on the page | [Heatmaps and sections](./heatmaps.md) |
| Watch individual visits, with consent | [Session recording](./recordings.md) |
| See forms, site searches, exit links and downloads | [Forms, search and exits](./behaviour.md) |
| Count sign-ups and sales, and find where people drop out | [Goals and funnels](./goals-and-funnels.md) |
| Test two versions of a section | [A/B tests](./ab-tests.md) |
| Find broken things, slow pages and bot traffic | [Site health](./site-health.md) |
| Get a weekly email, alerts and AI answers | [Email, alerts and AI](./email-alerts-ai.md) |
| Move a setup, edit lists in a spreadsheet, bring in history | [Import / Export](./import-export.md) |
| Look up an option | [Settings](./settings.md) |
| Check what is stored and how consent works | [Privacy and consent](./privacy.md) |
| Connect your own code | [For developers](./developers.md) |

What is planned next is on the [roadmap](./roadmap.mdx).

## Privacy in short

- **Self-hosted only.** Nothing is sent off your site.
- **No cookies and no stored IP addresses** for the statistics. Unique visitors are counted with a
  salted hash that is destroyed every day.
- **Consent-aware.** It works with any consent plugin that supports the WordPress Consent API,
  honours Global Privacy Control, and can wait for consent everywhere.
- **Session recording is opt-in only** and is off until you switch it on.

The full picture is on [Privacy and consent](./privacy.md).

## Limits worth knowing first

- Some things cannot be measured by any tool. The big search engines no longer pass search words to
  websites, so keywords come from [Search Console](./how-visitors-found-you.md#keywords) and from the
  engines that still pass them.
- A visitor is recognised only within one day, because nothing is kept on their device. Funnels and
  A/B tests work within a day for that reason.
- Reports are kept for 13 months by default. You can change that under
  [Settings](./settings.md#data).
