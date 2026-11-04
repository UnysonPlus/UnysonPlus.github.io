---
sidebar_position: 13
title: "Visitor Insights Settings"
sidebar_label: "Settings"
description: "Every Visitor Insights option: tracking, modules, session recording, email, privacy, data retention, exclusions, the city database and removing data."
---

# Settings

Everything is under **Unyson+ → Visitor Insights → Settings**. Administrators only.

## Status

The top of the screen shows how things stand: which collector is in use, whether a consent plugin is
active, and whether session recording is waiting for consent. Its buttons are:

- **Check the collector again**
- **Send me a test of the weekly email**
- **Check yesterday for alerts now**

## Tracking

| Option | What it does | Default |
| --- | --- | --- |
| **Collect visitor data** | Off pauses collection without deleting anything. | On |
| **Sample** | Share of page views tracked: all, 1 in 2, 1 in 4 or 1 in 10. Lower it on very busy sites to save database writes. Reports then show the sampled numbers. | Every page view |
| **Logged-in users** | Whose visits count while logged in. See [Getting started](./getting-started.md#decide-who-is-counted). | All but editors |
| **Pages not to track** | One path per line, `*` as a wildcard. Cart, checkout and account pages are never tracked. | Empty |

## Modules

A module you leave off adds nothing to your pages.

| Option | What it does | Default |
| --- | --- | --- |
| **Frustration clicks** | Rage, dead and error clicks | On |
| **Script errors** | JavaScript errors, grouped by message | On |
| **Missing pages (404)** | Addresses that returned "not found" | On |
| **Form analytics** | Forms started, finished and abandoned | On |
| **Site search** | What visitors search for on your site | On |
| **Mouse-movement maps** | Where the pointer lingers on desktop. Off by default: it is the most detailed thing the statistics record. | Off |
| **Exit links and downloads** | Clicks on links that leave the site and on files | On |
| **Returning visitors** | New against returning, only for visitors who gave statistics consent | On |
| **Regions and cities** | Region and city next to the country | On |
| **Bot report** | Counts the automated visitors that are filtered out | On |
| **Keep visit paths** | How long the visit log is kept: 7, 14, 30 or 90 days | 30 days |
| **Real-visitor performance** | Core Web Vitals | On |

## Session recording

See [Session recording](./recordings.md#options).

## Weekly email & alerts

See [Email, alerts and AI](./email-alerts-ai.md).

## Privacy and consent

| Option | What it does | Default |
| --- | --- | --- |
| **Consent** | Follow the consent plugin and, with none, track anonymously with an opt-out; or wait for consent everywhere. See [Privacy and consent](./privacy.md#consent). | Follow the plugin |
| **Honour Global Privacy Control** | Do not track browsers that send the signal. | On |

## Data

| Option | What it does | Default |
| --- | --- | --- |
| **Keep reports for** | 90 days, 6 months, 13 months or 2 years. Older days are deleted nightly. | 13 months |
| **Daily limit per page** | Page views counted per page per day; anything above is ignored. Stops a flood of fake traffic filling the database. `0` means no limit. | 5,000 |

## Exclusions and proxies

| Option | What it does |
| --- | --- |
| **Excluded IPs** | Visits from these are never counted. One per line: an address (`203.0.113.7`) or a range (`203.0.113.0/24`, `2001:db8::/32`). |
| **Trusted proxies** | Only if your site sits behind a CDN or load balancer: list its addresses so the visitor's address is read from the headers it adds. Leave it empty otherwise. |

## City database

Downloads the free DB-IP city database, or shows the one in use. See
[Regions and cities](./how-visitors-found-you.md#regions-and-cities).

## Remove all data

Deletes every report, heatmap and section statistic. Type `DELETE` to confirm. **This cannot be undone**,
so [export](./import-export.md) first if you might want it back.

Deactivating the extension never deletes anything.
