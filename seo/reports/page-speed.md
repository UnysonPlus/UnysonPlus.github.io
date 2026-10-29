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
