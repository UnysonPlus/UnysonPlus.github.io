---
sidebar_position: 14
title: "Visitor Insights Privacy and Consent"
sidebar_label: "Privacy and consent"
description: "What Visitor Insights stores, what it never stores, how consent works with or without a consent plugin, and how visitors opt out."
---

# Privacy and consent

:::note
This page describes how the software works. It is not legal advice. Whether you may track without asking
depends on your visitors' countries, so check what applies to your site.
:::

## What is stored

| Stored | Not stored |
| --- | --- |
| Daily totals per page, source, device and country | IP addresses |
| Clicks and scroll depth as counts | Cookies, or any identifier for the statistics |
| Which form field a visitor left at | What anyone typed |
| A log of visits as anonymous paths, for 7 to 90 days | Anything that says who a visitor is |

Everything stays in your own WordPress database. Nothing goes to us or to anyone else. The only outside
requests are ones you start: the Search Console connection and the city database download.

## How visitors are counted without cookies

Unique visitors are counted with a hash of the day's salt, the address and the browser. The salt is
destroyed every night, and the hash goes with it, so yesterday's visitor cannot be recognised today.

The address is used for that hash and any location lookup, then dropped with the request.

Two features do need more, so both wait for consent:

- **New and returning visitors** need a note on the device, so they are measured only for visitors who
  gave statistics consent.
- **[Session recording](./recordings.md)** always needs opt-in consent.

## Consent

Tracking is decided in the visitor's browser, so it works with page caches.

1. A visitor who opted out is never tracked.
2. A browser sending **Global Privacy Control** is not tracked, while that setting is on.
3. With a **consent plugin** that supports the WordPress Consent API, tracking waits for *anonymous
   statistics* consent and starts or stops the moment the visitor changes their choice.
4. **Without one**, the **Consent** setting decides: track anonymously with an opt-out, or wait for
   consent everywhere.

If you show your own banner, call `UnysonPlusVI.grant()` when the visitor accepts. See
[For developers](./developers.md#javascript).

## Let visitors opt out

Put these on your privacy page:

| Shortcode | What it gives the visitor |
| --- | --- |
| `[visitor_insights_optout]` | Opt out of tracking in one click |
| `[visitor_insights_recording]` | Delete their own session recording at any time |

The opt-out choice is kept in the visitor's browser, so it is per browser.

## Your privacy policy

Visitor Insights adds suggested text to **Settings → Privacy → Policy Guide** in WordPress. Copy what
applies to your site.

## Personal-data requests

The statistics keep nothing that can be linked to a person, so there is nothing to export or erase for
them. Recordings cannot be tied to a person either, so visitors delete theirs with
`[visitor_insights_recording]`.

## Keeping less

- Lower **Keep reports for** and **Keep visit paths**.
- Leave **Mouse-movement maps** off.
- Switch off any [module](./settings.md#modules) you do not use.
- Choose **Wait for consent everywhere**.
