---
sidebar_position: 3
title: "How fast pages really are"
sidebar_label: "Page speed"
description: "Core Web Vitals from real visits over the last 28 days, from the Chrome UX Report — field data rather than a lab score."
---
# How fast pages really are

Core Web Vitals — Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift —
from Google's Chrome UX Report. These are **field data**: real visits over the last 28 days, not a
lab score from one simulated connection. They answer whether the site is fast for the people
actually using it.

<img src="/img/seo/seo-report-page-speed.png" alt="The Page speed report, showing Core Web Vitals from real visits" width="1644" />

The number shown is the **75th percentile**, because that is what Google judges a site on. An
average is flattered by a handful of fast visits; the 75th percentile is not.

It needs a free API key: enable the **Chrome UX Report API** in Google Cloud, create an API key, and
paste it in. Only your own site is ever queried, and the data costs nothing.

:::note
**"Not enough traffic" is the ordinary answer**, not a fault. Chrome only reports on sites with
enough real visits, so a new or small site will have no field data at all — and that is said plainly
rather than shown as a zero, because a zero reads as a result. A rejected key is reported
separately, since the two mean completely different things.
:::

Readings are cached for twelve hours and fetched only when you ask, so this never slows the settings
page down on its own.

This pairs with the [Asset Optimizer](/extensions/asset-optimizer), which already optimises for these
metrics — preloading the likely LCP image, and reordering blocks to avoid layout shift. Until now it
had no way to tell you whether any of that worked.

---

## What to fix

The figures above answer **whether** speed is worth an afternoon. Below them, **What to fix** says
where the afternoon should go: a lab test of one page, run by Google, that names the files and
elements slowing it down.

<img src="/img/seo/seo-speed-diagnostics.png" alt="The What to fix panel: a page address, Mobile or Desktop, a Run diagnostics button, a score of 54, and a list of fixes such as Properly size images with the image files named and how much each could save" width="1630" />

Choose a page on this site and **Mobile** or **Desktop**, then press **Run diagnostics**. A run takes
up to half a minute on Google's side, which is why it only ever starts from the button and never
while a screen is loading.

What comes back:

- **A score out of 100** for that one page and device — green from 90, amber from 50, red below.
- **Up to five fixes**, the biggest time saving first, each naming up to three of the actual files
  responsible. Anything already passing, or saving less than a tenth of a second, is left off: a
  long list of trivia hides the two things worth doing.
- **Also worth knowing** — the element Google treats as the main content, what moves the layout,
  an oversized page, third-party scripts — when they are a problem.

The result is kept for twelve hours, so you can come back to it while you work through the list.

:::warning You need an API key for this in practice
Google allows keyless requests, but **every keyless caller on the internet shares one daily
allowance**, and it is usually used up — the test then stops with *"Google is limiting requests
without a key"*. Use the same key as the field data above: in the Google Cloud project that owns it,
enable the **PageSpeed Insights API** as well as the Chrome UX Report API. Both are free.
:::

**Only pages on this site** can be tested from here. The button is not a way to run Google's test
against other people's sites.

### Lab and field disagree — which is right?

Both, about different things. The **field** numbers are what real visitors experienced over four
weeks, across every phone and connection they had. The **lab** score is one simulated visit on a
deliberately slow phone. A page can pass in the field and score 54 in the lab — the field result is
the one Google uses for ranking; the lab result is the one that tells you what to change.
