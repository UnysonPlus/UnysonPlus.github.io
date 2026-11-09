---
title: "SEO Check: audit any website's SEO with the AI Dev Kit"
sidebar_label: SEO Check
sidebar_position: 3.9
slug: /seo-check
description: Check any website the way a search engine sees it, from the AI Dev Kit dashboard or your AI agent, and get one ranked plan with the fix and a way to check each one. Free, runs on your computer.
keywords: [seo check, seo audit, website seo checker, wordpress seo audit, free seo audit, ai seo audit]
---

# SEO Check

SEO Check looks at any website the way a search engine does and hands back **one plan**, most important
problem first. Each item says what is wrong, on which pages, why it matters, how to fix it and how to tell
the fix worked. It runs on your computer, it is free, and it only **reads** public pages: nothing on the
site is changed.

It has two ways in, and both use the same engine, so they always agree:

- the **SEO check** view in the [AI Dev Kit](./index.md) dashboard, for people;
- the kit's **`seo-check` skill**, for your AI agent, which can also fix what it finds on a Unyson+ site.

<img src="/img/ai-dev-kit/seo-check-view.png" alt="The SEO Check view: on the left the address box, Quick and Full modes, the AI and Lighthouse options, the sites checked before and the PageSpeed key; on the right a report with a score of 93, the findings counted by severity, what changed since the last check, the AI's summary of the content, and the first findings of the plan" width="1912" />

## What it checks

**The site as a whole**

- **robots.txt:** whether it exists, whether it blocks Google or Bing, whether it names the sitemap, and
  which AI crawlers it shuts out. Blocking AI *training* crawlers is your choice and is only noted; blocking
  the crawlers AI *search* uses keeps you out of AI answers and is flagged.
- **The XML sitemap** and **`llms.txt`** (a short index of the site for AI assistants).
- **Redirects:** whether `http://` goes to `https://`, and whether the `www` and bare addresses both show
  the site instead of one redirecting to the other.
- **Error pages:** whether an address that does not exist answers 404, as it should, or 200 (a "soft 404").
- **Broken internal links**, and **titles or descriptions shared by several pages**.

**Every page, twice.** Once as the server sends it (what a crawler sees before any JavaScript runs) and once
rendered in Chrome:

- the status and any chain of redirects, including WordPress's alternate cron bouncing visitors to
  `?doing_wp_cron=…`;
- `noindex` in the page or in the server's headers;
- the title and meta description (missing, too long, too short);
- the canonical link (missing, several, pointing at another page);
- the H1 and the order of headings, images without alt text, the page language, the mobile viewport;
- social sharing tags, structured data that does not parse (and none on the home page);
- thin pages, text that only appears after JavaScript runs, `http://` files on an `https://` page,
  language links that leave out the page itself, and a slow server.

**Optional extras**

- **Lighthouse**, through Google's PageSpeed Insights: the mobile scores for performance, accessibility,
  best practices and SEO, the SEO audits it failed, and Core Web Vitals measured on real Chrome visitors.
  Public sites only; see [the key](#the-pagespeed-insights-key) below.
- **A read of the content by the kit's AI**, up to six main pages. It looks for what a rule cannot judge:
  vague or padded pages, missing proof of experience and trust (who is behind the site, real details,
  examples), whether an AI search answer would quote the page, and titles that do not match their page.
  It also suggests better titles and descriptions.

## Using the dashboard

1. Start the kit and open **SEO check** (or **Open the checker** on the Home page).
2. Type the website. Choose **Quick** (that page plus the site-wide checks, about a minute) or **Full** (the
   pages in the sitemap, up to the number you set, a few minutes).
3. Press **Check** and watch it work. Only one check runs at a time.

<img src="/img/ai-dev-kit/seo-check-card.png" alt="The SEO Check card on the AI Dev Kit's Home page, showing it is ready, the last site checked with its score, and an Open the checker button" width="304" />

### The report

- **The score**, out of 100. Each problem takes points off once, however many pages it is on: 15 for
  critical, 7 for high, 3 for medium, 1 for low. The AI's content findings are listed but **not scored**,
  because they are judgement and vary between runs.
- **Since the last check:** every check is kept, so the second one shows what was fixed and what is new.
  Pick an earlier check from the list beside the buttons to open it.
- **The plan**, most important first. Open an item for the why, the fix, how to check it worked and the
  pages it is on. On a site built with Unyson+, items the WordPress AI Assistant can fix with its SEO tools
  say so.
- **For your information:** things worth knowing that are not errors.
- **Suggested titles and descriptions** from the AI, and the **pages checked**, with status and word count.

### Saving and sharing

| Button | Gives you |
|---|---|
| **Markdown** | the whole report as a `.md` file |
| **PDF** | a clean, light copy of the report: choose *Save as PDF* in the print window |
| **JSON** | every finding and page, for tools and spreadsheets |
| **Copy fix request** | the plan as a request to paste into the AI Assistant in WordPress, or into your own agent |

## Fixing what it finds

SEO Check never changes a site. On a site built with Unyson+, the fixes are a paste away:

1. Press **Copy fix request**.
2. Paste it into the **AI Assistant** in that site's WordPress (or your own agent, connected to it).
3. It fixes titles, descriptions, canonicals, `noindex`, social tags, redirects for broken links, missing
   alt text and the SEO settings with the [SEO extension](/seo)'s tools, shows you each change first, and
   every change can be undone.
4. Run the check again: the report lists what is now fixed.

Some findings are not SEO settings: text that only appears after JavaScript, `http://` files on a secure
page, a slow server, redirects set on the server. The report explains them; they are theme, hosting or
server work.

On any other site, the report is the deliverable: hand it to whoever runs the site.

## Using it from your AI agent

In an agent working in the kit's folder, ask for it in plain words ("check the SEO of example.com", "audit
my site before launch"). The agent follows the kit's `seo-check` skill:

1. runs the same engine, quick or full;
2. on a Unyson+ site it is connected to, also reads the site's own [SEO Audit](/seo/reports/audit) and
   points out where the two disagree (usually another plugin or the theme overriding the SEO settings);
3. hands back the plan;
4. asks once before fixing anything, then fixes with the SEO tools, without inventing facts: proof,
   prices, names and answers come from you;
5. runs the check again and reports what is fixed.

The engine also runs on its own, from the kit's capture-service folder:

```
node seo-check.mjs https://example.com --full --limit 25 --md report.md
```

## The PageSpeed Insights key

Lighthouse scores come from Google's PageSpeed Insights. Without a key, every user shares one daily quota,
which is often used up, and the report then says Lighthouse could not run. A key is free: create one on
[Google's PageSpeed Insights page](https://developers.google.com/speed/docs/insights/v5/get-started) and
paste it under **PageSpeed Insights key** in the SEO check view. It is saved on your computer only, never
shown again, and never sent anywhere but Google. (Agents can use the `PSI_API_KEY` environment variable.)

## Limits

- **It reads pages, not rankings.** For searches, backlinks and search volumes, use the SEO extension's
  [reports](/seo) inside WordPress.
- **A full check follows the sitemap**, up to 100 pages. Without a sitemap it checks only the address you
  typed, and says so.
- **Lighthouse needs a public site.** A site that only runs on your computer is skipped.
- **Pages behind a login**, and text that only appears after a click, are not seen.
- **Some findings come and go:** a slow answer or a cron redirect is what this check saw; run it again to
  confirm.
- **The AI read is judgement.** Treat it as an editor's notes, not a measurement.
- **Search engines take time.** A fix shows in the next check at once, but in search results only after
  the next crawl, usually days to weeks.

## What's next

SEO Check shipped as an Alpha in the AI Dev Kit (capture service 1.13.7). These are planned or being
considered; none of them is in the kit yet.

| Idea | Status | What it adds |
|---|---|---|
| Ask about a report in **Chat** | Planned | The Kit Assistant reads a saved report and answers questions about it ("what should I fix first on the shop pages?"). Read-only. |
| **Send to WordPress** instead of copy and paste | Planned | Hand the fix request straight to the AI Assistant of a site connected in Settings, so it opens there ready to confirm. |
| **Re-check on a schedule** | Exploring | Re-run a saved site weekly and flag what got worse, without anyone pressing Check. |
| **Free backlinks from Common Crawl** | Exploring | A first look at who links to a site, with no account or key. |
| **Lighthouse's AI-agent score** | Exploring | Google's new Lighthouse category for how well AI agents can use a site, once PageSpeed Insights serves it. |

