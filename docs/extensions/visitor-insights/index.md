---
sidebar_position: 1
title: "Visitor Insights — Self-Hosted Heatmaps and Analytics for WordPress"
sidebar_label: "Visitor Insights"
description: "Visitor Insights (in development) — privacy-first, self-hosted visitor analytics for WordPress: traffic, click / scroll / attention heatmaps, and reach and attention for every page-builder section. Your data never leaves your site."
---

# Visitor Insights

:::info In development
**Phase 1 is built** — traffic, heatmaps and section analytics — and ships in an upcoming release.
The [roadmap](./roadmap.mdx) shows what is done and what is next; it is checked automatically against
the extension's source code, so it is always current.
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
- Suggested privacy-policy text is included. The statistics keep nothing that can be linked to a
  person, so there is nothing to export or erase; session recording will add WordPress's
  personal-data export and erase tools.

## Using it

Switch it on under **Unyson+ → Extensions → Visitor Insights**. Collection starts at once; reports
live under **Unyson+ → Visitor Insights**.

| Tab | What you see |
| --- | --- |
| **Overview** | Page views, unique visitors, average time on page, a daily chart, top pages, referrers, campaigns, devices, browsers and countries, for 7, 30 or 90 days or 12 months. |
| **Pages** | Every tracked page with its views, visitors, time on page and how many read at least half of it. |
| **Heatmaps** | The live page at desktop, tablet or mobile width with a **clicks**, **scroll reach**, **attention** or **elements** map on top, and a table of every section: how many visitors reached it and how long it stayed in view. |
| **Live** | Page views in the last five minutes, by page. |
| **Settings** | Sampling, pages to skip, consent, data retention, excluded addresses. |

Heat also appears where you edit: a **Heatmap** button in the [Live Editor](../live-editor.md)
canvas, a badge on each item in the page builder (its share of clicks, and for sections how many
visitors reached it), and **Heatmap** in the admin bar on any page of your site.

Your own visits do not count while you are logged in as an editor — open the site in a private
window to see the first page view arrive (within about a minute).

### Consent

- **With a consent plugin** that supports the WordPress Consent API, tracking waits for
  *anonymous statistics* consent and starts or stops the moment the visitor changes their choice.
- **Without one**, choose in Settings: track anonymously with an opt-out, or wait for consent
  everywhere. If you show your own banner, call `UnysonPlusVI.grant()` when the visitor accepts.
- Put `[visitor_insights_optout]` on your privacy page so visitors can opt out in one click, and
  use the suggested text Visitor Insights adds to **Settings → Privacy → Policy Guide**.

### Page caches and security plugins

Tracking works on cached pages — it needs nothing per visitor in the HTML. If your host blocks the
fast collector, Visitor Insights notices and switches to the WordPress REST API by itself
(**Settings → Status** shows which one is in use). Clear your page cache after changing settings.
