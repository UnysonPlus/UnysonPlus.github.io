---
sidebar_position: 5
title: "Index coverage"
sidebar_label: "Index coverage"
description: "Whether Google is actually indexing your pages, which canonical it chose, and when it last crawled each one — checked in the background through the Search Console connection you already have."
---

# Index coverage

A page Google never kept cannot bring anyone to the site. Nothing else in WordPress tells the
difference between *nobody searches for this* and *it was never in the index* — and those lead to
completely different afternoons.

<img src="/img/seo/seo-index-coverage.png" alt="The Index coverage report: counts for indexed, not indexed and canonical conflicts, then a table of pages with what Google says about each" width="1644" />

It runs on the [Search Console](./search-console.md) connection you already set up. Same OAuth
client, same read-only permission — there is no second credential and nothing further to connect.

---

## What the states mean

| State | What happened | What to do |
| --- | --- | --- |
| **Indexed** | Google kept the page. | Nothing. |
| **Not indexed** | Google saw it and did not keep it — "crawled, currently not indexed" or "discovered, currently not indexed". | The one worth your attention. Usually the page is thin, near-duplicate, or has nothing linking to it. |
| **Excluded on purpose** | A `noindex`, a `robots.txt` block, or a canonical pointing elsewhere. | Check it was deliberate. Often it was. |
| **Not known yet** | Google has not answered for this page. | Wait for the background check to reach it. |

The row also carries **what Google itself says** — "Duplicate without user-selected canonical",
"Blocked by robots.txt" — because the specific phrase is the actionable part. A count of problems
tells you nothing; a named cause tells you where to go.

### When Google chose a different canonical

The most useful single line on the screen. If Google decided another URL is the original, this page
is not competing on its own — whatever it earns is credited elsewhere. The report names the URL it
chose, so you can decide whether that was right.

---

## Where else it shows

The report is the overview. The same answer also appears where you work on a page, because
nobody opens a report about a page while they are editing that page.

**On the posts list**, an **Index** column carries each page's state. Hover the badge for
Google's own phrase.

<img src="/img/seo/seo-posts-list-index.png" alt="The posts list with an Index column showing Indexed, Not indexed and Excluded on purpose badges" width="1672" />

**In the editor**, a line above the SEO panel spells it out — the state, Google's reason, and the
URL Google chose instead if it picked a different canonical.

<img src="/img/seo/seo-editor-index-line.png" alt="The line above the SEO panel reading: In Google — Excluded on purpose, Excluded by noindex tag" width="1358" />

Both stay out of the way until they have something to say: the column only appears once Search
Console is connected, and a page shows nothing until it has been checked, rather than every row of
a new site reading "not known yet".

---

## Why it takes a while

Google allows a fixed number of these checks per property per day. A site with several hundred
pages cannot be swept on a page load, so:

- a background job works through a **few pages an hour**, oldest first, and pages never checked go
  to the front of the queue;
- the screen shows what has been gathered **so far**, with a count of how many pages remain;
- the extension **spends against a daily budget it can see**, held deliberately below Google's own
  limit so a sweep cannot eat the quota that on-demand checks need;
- a result is re-checked after about a month, because index state changes slowly.

:::note Why not a "check everything now" button
There is no honest version of that button. It would either exhaust a day's quota on one click, or
queue work and pretend it had finished. **Re-check** on a single row is immediate, because one
check is a thing the budget can always afford.
:::

The background job schedules itself once Search Console is connected, and removes itself if the
connection is taken away.

---

## What it cannot tell you

- **Nothing about a page Google has never seen.** If a URL was never discovered, there is no
  inspection result — which is itself worth knowing, and shows as *Not known yet* until a check
  runs.
- **Nothing about a competitor's page.** The API only answers for properties your connected Google
  account can see.
- **Not a live reading.** The answer reflects Google's last crawl, which is shown on each row, not
  the page as it stands this second.
