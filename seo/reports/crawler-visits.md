---
sidebar_position: 1.8
title: "Crawler visits: what Google and AI crawlers actually fetch, from your access log"
sidebar_label: "Crawler visits"
description: "Upload your server's access log to Unyson+ SEO and see which pages Googlebot, Bingbot and AI crawlers visit, how often, where their visits are wasted, which visited pages now fail, and which published pages Google never reached. Fake Googlebots are filtered out."
keywords: [log file analysis seo, googlebot crawl log, crawl budget analysis wordpress, access log seo, ai crawler visits]
---

# Crawler visits

Every other report says what crawlers *should* see. Your server's **access log** is the only record of what they
actually did: which pages Googlebot opens and how often, which it never reaches, where its visits are wasted, and
which AI crawlers come by. SEO people call this *log file analysis*.

Find it under **SEO → Crawler visits**.

<img src="/img/seo/seo-crawler-visits.png" alt="The Crawler visits report: the Import / Export row, a summary of a week of log (1,211 crawler visits in 1,680 lines), a note that 28 requests falsely claimed to be Googlebot, a Who visits table for Googlebot, Bingbot and three AI crawlers with their answers, the share of Googlebot's visits that went to filter and sort addresses, and the pages Google visited most" width="1644" />

*The screenshot uses an example log on a test site.*

## Getting the log

The site cannot read its own access log on most hosts, so you download it from the hosting panel (often under
"Logs", "Raw access" or "Access log") and upload it here.

- **Format:** the standard access log of Apache or Nginx (the "combined" format most hosts use), plain text or
  compressed `.gz`. Error logs and analytics exports do not work.
- **How much:** a week or more gives a fair picture; Google visits small sites only a few times a day.
- **Size:** up to your server's upload limit (shown on the screen). Upload a large log compressed.

Choose the file and press **Import**. The log is read line by line and thrown away; only the totals are kept.
Tick **Add to the current analysis** to add a second log (another week, or another server) to the first.

## What it shows

- **The period and the totals**: the dates the log covers, and how many lines were crawler visits.
- **Fake crawlers**: anyone can write "Googlebot" into a request. Visits claiming to be Googlebot or Bingbot are
  checked against the addresses Google and Bing publish, and those from elsewhere are counted apart, not as visits.
- **Who visits**: each crawler (Googlebot, Bingbot, Applebot, YandexBot, DuckDuckBot, Baiduspider, and AI
  crawlers such as GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, CCBot, Bytespider, Amazonbot),
  with visits, visits per day, and how many were answered OK, redirected, not found or with a server error.
- **Where Google's visits go**: the share of Googlebot's visits spent on filter and sort addresses (with a link to
  [keep crawlers out of them](../filtered-pages.md)), and how many visited addresses now answer with an error.
- **Most visited by Google**: the top addresses, with visits from Google, Bing and AI crawlers, the last visit and
  the last answer.
- **Visited, but answering with an error**: redirect the missing ones to the nearest page with
  [redirects](../redirects.md); a server error needs fixing on the site.
- **Pages Google did not visit in this log**: published pages (not set to noindex) with no Googlebot visit.
  New pages and pages nothing links to are the usual reason: link to them from related pages, and keep them in the
  sitemap.

## Import / Export

| Button | Gives you |
|---|---|
| **Export CSV** | One row per address: visits in total, from Google, Bing, other search engines and AI crawlers, visits to filter addresses, the last visit and its answer. For a spreadsheet. |
| **Export JSON** | The whole analysis. Import it on this screen (on this site or another) and it comes back unchanged; tick *Add to the current analysis* to combine. |
| **Remove** | Deletes the stored analysis. |

## Limits

- **Only crawlers are counted.** Visits from people, and requests other than `GET` and `HEAD`, are skipped.
- The 5,000 most-visited addresses are kept; a larger site's long tail is trimmed.
- If Google's or Bing's address list cannot be fetched at the time, claims to be that crawler are counted as
  genuine, and the report says so.
- "Pages Google did not visit" reads up to 2,000 published pages, most recently changed first.
- A log covers one server. Behind a CDN, the host's log may show the CDN instead of the crawlers; use the CDN's own
  logs if it offers them in the same format.
