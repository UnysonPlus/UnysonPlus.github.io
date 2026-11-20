---
sidebar_position: 5
title: "Heatmaps and Section Analytics"
sidebar_label: "Heatmaps and sections"
description: "See clicks, scroll reach and attention on the live page at any device width, for today, yesterday, any period or since the last edit, and how many visitors reach each page-builder section."
---

# Heatmaps and sections

The **Heatmaps** view shows your live page at desktop, tablet or mobile width with a map on top, and a
table of every section below it.

## Map modes

| Mode | Shows |
| --- | --- |
| **Clicks** | Where visitors click |
| **Scroll reach** | How far down the page visitors get |
| **Attention** | Which parts stay in view longest |
| **Elements** | The 25 most-clicked builder elements, with their share of clicks |
| **Mouse movement** | Where the pointer lingers on desktop. Off by default; switch it on under **Settings → Mouse-movement maps**. |

Clicks on a builder element are stored against that element, so the map stays accurate at every width
and after you change the layout around it.

## Choose a period

The Heatmaps view uses the same [date picker](./traffic.md#choose-the-period) as every report, so you can
also pick any range on its calendar. It has one extra quick pick, **Since the page was last edited**.

| Period | Use it to |
| --- | --- |
| **Today** | Check a change you just made, or that tracking works on a new site. New clicks show within about a minute. |
| **Yesterday** | Read one full day, such as the day a campaign or a post went out. |
| **Last 7 days**, **30 days**, **90 days**, **12 months** | See the usual pattern. 30 days is where the map starts. |
| **Since the page was last edited** | See only clicks on the layout the page has now. It starts on the day the page was last saved, so older clicks on a different layout do not blur the map. |
| **A range on the calendar** | Compare before and after a change, or read a campaign's own days. |

Every map names its period and its number of page views above the page, for example *"Last 30 days · 2,140
page views"*.

**Under 100 page views, the map says so**: *"too few for a reliable map, so read it with care"*. With
few visits, one person clicking five times looks like a hot spot. Choose a longer period, or wait for more
visits.

Good to know:

- Days follow your site's time zone, and a day is the smallest unit. So **Since the page was last edited**
  also includes the clicks from earlier on the day you saved it.
- A page with no post behind it (an archive or a search page) has no edit date, so that choice shows the last
  30 days.
- The full-screen toolbar and the Live Editor have the quick picks in a menu of their own, without the
  calendar.

## Sections

For a page built with the page builder, the table lists every section with how many visitors reached it
and how long it stayed in view. Read it from the top: the first big fall in reach is where the page
starts to lose people.

## Filter by channel

Choose a channel to see what those visitors alone did: what people from search click, how far people
from social scroll. Channel maps exist from version 1.0.6 on, so older days are not included.

## Where else you can see heat

- **Admin bar:** **Heatmap** on any page of your site opens it full screen with the map on top.
- **Live Editor:** a **Heatmap** button in the [Live Editor](../live-editor.md) canvas.
- **Page builder:** a badge on each item shows its share of clicks, and for sections how many visitors
  reached it, over the last 30 days.

The full-screen view hides the admin bar. Your visitors never saw it, so showing it would push the page
down under the dots. The page appears exactly as visitors saw it, with the heatmap's toolbar at the
bottom (mode, device, dates, channel, saving an image) and **×** to close it.

## Save an image

**Download image** saves the page with the current map on top, captioned with the page, device, period
and channel, ready for a report or a client email. Very long pages are cut at 12,000 pixels.

## Watch the visits behind the map

From a page's heatmap, and from the Pages list, you can open the [recordings](./recordings.md) of visits
that included that page.

## Keep your own clicks out

Your visits are not counted while you are logged in as someone who can edit content (the default under
**Settings → Logged-in users**). Opening a heatmap or the Live Editor never counts either.

You are counted as a visitor when you are **not** logged in: on your phone, in another browser, in a private
window, or after logging out. To leave those out too:

- **Settings → Excluded IPs**: add your home or office internet address. It covers every device on that
  connection, logged in or not.
- **The opt-out**: put `[visitor_insights_optout]` on a page and click it once in each browser you use. The
  browser remembers it, even when you are logged out.

If your page cache serves cached pages to logged-in users as well, it can hand you a page with the tracker
in it. Most caches skip logged-in users; if yours does not, add your address under **Excluded IPs**.

## Limits

- Only pages visitors have seen have a map, and it needs a fair number of visits to mean much.
- A click outside any builder element is stored by its position on the page, so on pages not built with
  the builder the map is less exact across screen widths.
- If you change a page heavily, older clicks stay on the elements that still exist.
