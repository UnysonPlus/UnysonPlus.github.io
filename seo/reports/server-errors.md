---
sidebar_position: 0.6
title: "Server errors: being told when pages start failing"
sidebar_label: "Server errors"
description: "Unyson+ SEO checks your home page and menu pages every hour and alerts you, on the Dashboard and by email, when they start answering with server errors or stop answering, and again when they recover."
keywords: [wordpress 5xx alert, wordpress site down email, 500 error monitoring wordpress, uptime check wordpress]
---

# Server errors

A plugin update, a PHP error or a database problem can break pages without anyone noticing for days, while search
engines keep visiting and getting errors. Unyson+ SEO checks once an hour and tells you.

Find it under **SEO → Alerts → Server errors**.

<img src="/img/seo/seo-server-errors.png" alt="The Server errors box: switches for the hourly check and the email, then the result of the last check: the page watched is working, last checked one second ago, a Check the pages now button, and a table of the watched page with its last answer (200) and status (Working)" width="1644" />

## What it checks

Every hour the site opens its **home page** and the internal pages linked from its **menus** (up to 10 in all),
the way a visitor would.

| Answer | Meaning |
|---|---|
| A normal page, a redirect or a 404 | Working. (Missing pages are the [404s](../not-found.md) screen's job, not an outage.) |
| A server error (5xx) | A failure. |
| No answer within 20 seconds | A failure: the page hangs. |
| The site cannot reach itself at all | Could not check. Some hosts block a site from calling itself; that is not an outage. |

A page has to fail **twice in a row**, an hour apart, before it counts as failing. One slow moment is not worth an
email.

## What you get

When a page starts failing:

- it goes to the **top of the [Alerts](./alerts.md)** list and the Dashboard alerts, with how long it has been failing;
- **one email** goes out (to the address set under Weekly email, or the site's administration email).

When it works again, one more email says so. Nothing repeats every hour.

The box shows each watched page with its last answer, a **history** of when pages failed and recovered, and a
**Check the pages now** button that runs the check twice straight away.

## Settings

| Setting | Default | |
|---|---|---|
| Check every hour | On | Switch off to stop the check entirely. |
| Email me when pages fail and recover | On | Switch off to see failures only on the Dashboard and in Alerts. |

Developers can change the list of watched addresses with the `fw_seo_uptime_urls` filter.

## Limits

- **A server that is completely down cannot report itself.** The check runs on the site, so when the whole server
  is off, nothing runs. This catches pages that break while the server is up; for full outages, use an outside
  uptime monitor as well.
- WordPress runs its scheduled tasks when the site has visitors (or a server cron job), so on a very quiet site the
  hourly check can run late.
- It watches the home page and menu pages, not every page. The [broken link checker](./broken-links.md) covers the
  rest, more slowly.
