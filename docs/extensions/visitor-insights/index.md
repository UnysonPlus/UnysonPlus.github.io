---
sidebar_position: 1
title: "Visitor Insights — Self-Hosted Heatmaps and Analytics for WordPress"
sidebar_label: "Visitor Insights"
description: "Visitor Insights (in development) — privacy-first, self-hosted visitor analytics for WordPress: traffic, click / scroll / attention heatmaps, and reach and attention for every page-builder section. Your data never leaves your site."
---

# Visitor Insights

:::info In development
**All four phases are built** — traffic, heatmaps, section analytics, goals, funnels, frustration
& errors, real-visitor performance, form analytics, site search, section A/B tests, a weekly email, AI
Assistant answers and consent-only session recording. Phases 1 and 2 are released (Visitor Insights
1.0.1); the rest ships in an upcoming release.
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
live under **Unyson+ → Visitor Insights**, in the same sidebar layout as SEO, the CRM and
Membership: the views are grouped into **Behaviour**, **Conversions**, **Site health** and **Setup**,
and the period switch sits at the top right. Someone allowed to see the reports but not the rest of
Unyson+ gets a **Visitor Insights** menu of their own.

| View | What you see |
| --- | --- |
| **Overview** | Page views, unique visitors, average time on page, a daily chart, top pages, referrers, campaigns, devices, browsers and countries, for 7, 30 or 90 days or 12 months. |
| **Pages** | Every tracked page with its views, visitors, time on page and how many read at least half of it. |
| **Heatmaps** | The live page at desktop, tablet or mobile width with a **clicks**, **scroll reach**, **attention** or **elements** map on top, and a table of every section: how many visitors reached it and how long it stayed in view. |
| **Goals** | Every goal with its completions, rate per page view and value (order totals), and the pages where goals are completed. |
| **Funnels** | Step-by-step journeys — for example *pricing page → booking form sent* — with how many visitors continue at each step. |
| **A/B tests** | Two versions of a section on the same page, half the visitors each, with the winner decided by a goal and a confidence figure. |
| **Forms** | Every form: how many visitors start it, send it or give up — and the field where they gave up. |
| **Search** | What visitors search for on your site, and the searches that find nothing. |
| **Frustration** | Rage clicks, dead clicks and clicks followed by an error, per page; script errors grouped by message; missing pages (404) and where visitors came from. |
| **Performance** | Core Web Vitals from real visitors — loading (LCP), responsiveness (INP), visual stability (CLS) and server response — per device, page and content type. |
| **Recordings** | Replays of individual visits — only of visitors who agreed to it — with the visits that had problems marked. |
| **Live** | Page views in the last five minutes, by page. |
| **Settings** | Sampling, which modules run, pages to skip, consent, data retention, excluded addresses. |

Script errors are masked before they leave the visitor's browser — email addresses, long numbers
and query strings are removed — so an error message cannot carry personal data.

Heat also appears where you edit: a **Heatmap** button in the [Live Editor](../live-editor.md)
canvas, a badge on each item in the page builder (its share of clicks, and for sections how many
visitors reached it), and **Heatmap** in the admin bar on any page of your site.

Your own visits do not count while you are logged in as an editor — open the site in a private
window to see the first page view arrive (within about a minute). **Settings → Logged-in users**
decides who else is left out: by default logged-in visitors who cannot edit content (customers,
members) are counted; you can leave out everyone who is logged in, or count editors too.

### Goals

A goal is anything a visit can achieve. There are four ways to count one, and none needs code:

- **Clicks on an element.** Open any element in the builder — a button, a card, an image — and
  fill in **Track as goal** in its **Advanced** tab. Elements given the same name share one goal.
- **Reaching a page**, such as `/thank-you/` or `/order-received/*` — add it on the Goals tab.
- **Automatically:** form submissions, newsletter sign-ups, WooCommerce orders (with their value)
  and short-link clicks are counted as soon as those features are in use. Each can be switched off.
- **From your own script:** `UnysonPlusVI.goal('signup')`, after adding a *custom event* goal.

Funnels are built from pages and goals. A visitor counts at a step once they have done every step
before it on the same day — Visitor Insights recognises a returning visitor only within a day,
because it keeps no identifier on their device.

### A/B testing a section

Build both versions of a section on the page — one under the other — then pick them on the
**A/B tests** tab with the goal that decides. Half of the page views see A, half see B; the choice is
made in the visitor's browser before the page appears, so there is no flicker and it works with page
caches. The tab shows visitors and goal completions per version and calls a winner once it is 95%
confident. Stopping the test keeps the winner showing; delete the other section in the builder when
you are ready.

### Weekly email and the AI Assistant

Switch on **Settings → Weekly email** for a Monday summary: the week compared with the one before, top
pages, and anything worth fixing — broken internal links, frustrated clicks, script errors, slow pages.
With the AI Assistant active you can ask it about the numbers in plain words, for example *"Which
section of the home page loses mobile visitors?"*; it reads the same reports, with every section and
element named as it is in the builder.

### Session recording

Off until you switch it on, and then **only ever with the visitor's opt-in consent** — no law exempts
recording individual visits, so Visitor Insights does not try. The consent comes from a consent plugin
that supports the WordPress Consent API (the visitor accepts *statistics*), or from your own banner
calling `UnysonPlusVI.grantRecording()`. Without one of these, nothing is recorded.

- Everything typed into a form is replaced with `*` in the visitor's browser before it is sent; you
  can also hide all text, or single elements with the class `up-vi-mask` (or leave them out with
  `up-vi-block`). Cart, checkout, account and login pages are never recorded.
- Only a share of consenting visits is recorded (one in five by default), optionally only the visits
  that ran into a problem, and recordings are deleted after 30 days (7–90).
- Withdrawing consent stops the recording and deletes it. Put `[visitor_insights_recording]` on your
  privacy page so visitors can delete their own recording at any time.
- Recordings stay on your server. Watching one needs administrator rights, and every playback is
  logged.

### Everyday extras

- **Where visits come from** — the Overview groups every visit into a channel: Direct, Search,
  Social, AI assistants, Email, Paid, Campaign or Referral, from the referring site and any campaign
  tags on the link.
- **On your dashboard** — a Visitor Insights widget shows the week against the one before, the last
  14 days at a glance, the top pages and how many page views are happening right now.
- **Export** — download pages, sources, goals or daily totals as CSV for any period.
- **Import / Export** (Setup) — download the whole setup (settings, goals, funnels, A/B tests and
  notes), with or without its history, as one file, and load it into this or another site. Import
  either **adds to** what is there (goals and days the site already has are kept) or **replaces**
  it. Pages are matched by their address, so history follows a site that moved to a new domain or
  folder. Session recordings, the daily visitor keys and the collector's secrets are never included.
- **Page caches** — after you change a setting or an A/B test, common page caches are cleared for you.
- **Mouse-movement maps** — an optional heatmap mode showing where the pointer lingers on desktop,
  off by default.

### Reading the numbers

- **Compared with what?** Every figure on the Overview, and every page in the Pages list, shows its
  change against the period before.
- **Which channel works?** *How each channel performs* shows, per channel, the views, time on page,
  how many read half the page, goal completions and the conversion rate. Filter the Pages tab by a
  channel to see which pages its visitors land on.
- **What changed after we did that?** Add a note to the chart — a redesign, a campaign, a price
  change — and it appears as a marker on that day.
- **For whom?** Filter any heatmap to one traffic channel — what visitors from search click, how
  far visitors from social scroll.
- **Take it with you.** *Download image* saves the page with the current map on top, captioned with
  the page, device, period and channel — ready for a report or a client email.
- **Show me.** From a page's heatmap (and the Pages list) open the recordings of visits that
  included that page.
- **Tell me when it breaks.** Switch on alerts for an email the morning after script errors, broken
  internal links or traffic move far from the usual. Nothing is sent on a normal day.

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
