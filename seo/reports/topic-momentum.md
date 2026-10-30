---
sidebar_position: 2.6
title: "Topic momentum: Google Trends, joined with your site"
sidebar_label: "Topic momentum"
description: "Import Google Trends exports into Unyson+ SEO and see each topic's direction next to your impressions, your page and your visitors' searches, with one thing to do for each."
---

# Topic momentum

Google Trends answers what on-page work can't: whether interest in a topic is **rising or draining
away**, when in the year it **peaks**, and which of two phrasings people actually type. It does not report
search volume: its numbers are relative to the peak of whatever you asked about.

**SEO → Topic momentum** imports what Trends exports and joins it with what your site already knows.

<img src="/img/seo/seo-momentum.png" alt="Topic momentum: the import instructions and list, then each topic with its direction, your impressions, your page, searches on your site and what to do" width="1644" />

## Importing from Trends

Trends has no API, but every chart downloads as a CSV.

1. In [Google Trends](https://trends.google.com/trends/explore), compare up to five topics you write about.
2. **Set "Past 12 months" (or "Past 5 years" to see the season) and one country.** Trends opens on a
   short worldwide window made for news desks, which reads as noise for anything else.
3. Use the download button on **Interest over time**, and on **Related queries** for each topic, and drop
   the files on the screen. Several at once is fine.

Each import is stored with **the terms, country and dates it was taken under**, read from the file
itself, because two exports made under different settings are not comparable. **Export all (JSON)**
downloads every import, and importing that file brings them back unchanged, onto another site too.
**Remove** deletes one.

## The table

Each topic, from *Interest over time* (and each **rising** search from *Related queries*), with:

| Column | |
| --- | --- |
| **Interest** | **Rising**, **falling** or **steady**: the last three months against the same months a year earlier when the export covers that far (which takes the season out), otherwise against the three months before. 20% either way counts. Also the month it **peaks**. |
| **Your impressions** | Impressions in the last four weeks for searches that contain the topic ([Search Console](./search-console.md)). |
| **Your page** | A published page whose title or [focus keyphrase](../content-analysis.md) is the topic. |
| **Searched on your site** | How often visitors typed it into your search box ([Site search](./site-search.md)). |
| **What to do** | The one thing worth doing, below. |

| What it sees | What to do |
| --- | --- |
| Rising, seen in Google, page exists | **Refresh the page before the peak.** The most valuable row on the screen, listed first. |
| Rising, seen in Google, no page | **Write the page you are already half-ranking for.** |
| Rising, not seen, no page | **An open gap**, a candidate for the calendar. |
| Rising, not seen, page exists | Strengthen the page: link to it from related pages, answer the search more directly. |
| Falling, page exists | **Nothing.** The market moved, not the page; don't spend a week "fixing" it. |

A topic that is rising **and** that your own visitors search for is flagged: about as strong a signal as
a small site gets.

With an [AI connection](../ai-assistant.md), the rows worth writing about have **Draft a title and
outline**: a proposed title and section headings for the page, which you can use or ignore. The
analysis itself never uses AI; every row is explained by the numbers in it.
