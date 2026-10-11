---
sidebar_position: 1
title: "Visitor Insights — Self-Hosted Heatmaps and Analytics for WordPress"
sidebar_label: "Visitor Insights"
description: "Visitor Insights (in development) — privacy-first, self-hosted visitor analytics for WordPress: traffic, click / scroll / attention heatmaps, and reach and attention for every page-builder section. Your data never leaves your site."
---

# Visitor Insights

:::info In development
Visitor Insights is being built now and is not released yet. The [roadmap](./roadmap.mdx) shows
what is done, what is in progress and what is planned — it is checked automatically against the
extension's source code, so it is always current.
:::

Visitor Insights shows how people actually use your site: where they click, how far they scroll,
which sections they read and which they skip. It is self-hosted and privacy-first — **the data
stays in your own WordPress database and is never sent to us or to anyone else.**

## What makes it different

Hosted heatmap tools have to guess what was clicked from the page's HTML, and their maps break
when a layout changes width. Unyson+ already knows every section, column and element on a
builder page by a stable ID, so Visitor Insights can:

- tie every click to a named builder element — *"the second button in the Pricing section"* —
  and keep the map accurate on every screen size;
- show how many visitors **reach each section** and how long they spend there, so you can see
  exactly where a page loses people (*"62% of mobile visitors never reach Pricing"*);
- show that heat **inside the Live Editor and the page builder**, where you make the changes.

## What it will include

| Module | What it gives you | Phase |
| --- | --- | --- |
| Traffic dashboard | Page views, unique visitors, top pages, referrers and campaigns, devices, countries, live view — no cookies | 1 |
| Heatmaps | Click, scroll and attention maps per device | 1 |
| Section analytics | Reach, attention and drop-off for every builder section | 1 |
| Goals & conversions | Any element as a goal; forms, newsletter sign-ups, WooCommerce orders and short-link clicks counted automatically | 2 |
| Funnels | Step-by-step drop-off between pages and goals | 2 |
| Frustration & errors | Rage clicks, dead clicks, script errors and 404s | 2 |
| Real-visitor performance | Core Web Vitals (LCP, INP, CLS) from real visitors | 2 |
| Form analytics | The field where visitors give up — without recording what they type | 3 |
| Site search insights | What visitors search for, and what they cannot find | 3 |
| Section A/B testing | Two versions of a section, winner decided by your goals | 3 |
| AI summaries & digest | A weekly email, and questions answered by the AI Assistant | 3 |
| Session recording | Optional replay of individual visits — consent-only, masked by default | 4 |

Every module has its own switch, and a module you leave off adds nothing to your pages.

## Privacy by design

- **Self-hosted only.** Nothing is sent off your site.
- **No cookies and no stored IP addresses** for the statistics modules. Unique visitors are
  counted with a salted hash that is rotated and destroyed every day.
- **Consent-aware.** Works with any consent plugin that supports the WordPress Consent API,
  honours Global Privacy Control, and can be set to wait for consent everywhere.
- **Session recording is opt-in only**, masks every form field in the visitor's browser before
  anything is sent, and never records checkout, account or login pages.
- Privacy-policy text and WordPress personal-data export / erase tools are included.

Visitor Insights will ship inactive. When it is released you will switch it on under
**Unyson+ → Extensions**.
