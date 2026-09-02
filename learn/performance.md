---
sidebar_position: 5
title: Performance
description: Why site speed matters and how to get it — Core Web Vitals (LCP, CLS, INP), right-sized images, fewer requests, lazy loading and caching.
keywords: [web performance, core web vitals, page speed, lcp, cls, inp, image optimization, lazy loading]
---

# Performance

**A fast site keeps visitors and ranks higher.** People abandon slow pages, and Google uses
real-world speed as a ranking signal. The good news: a handful of habits fix most problems.

## Core Web Vitals

Google grades the real experience with three numbers — worth knowing by name:

- **LCP** (Largest Contentful Paint) — how quickly the main content appears.
- **CLS** (Cumulative Layout Shift) — how much the page jumps around as it loads.
- **INP** (Interaction to Next Paint) — how fast the page responds when you tap or click.

## The usual fixes

- **Right-size images.** Don't ship a 4000px photo into a 600px slot, and give every image a
  width and height so the layout doesn't jump as it loads (that's your CLS).
- **Load less, later.** Lazy-load off-screen images and heavy embeds so they don't block the
  first view.
- **Fewer, smaller files.** Combine and minify CSS/JS, and lean on browser caching.
- **Measure, don't guess.** Test with a real tool (Lighthouse, PageSpeed Insights) before and
  after changes — intuition about speed is often wrong.

## In UnysonPlus

Images are lazy-loaded and dimensioned for you, and the **[Asset Optimizer](/extensions/asset-optimizer)**
extension combines and minifies assets. Start there, then measure. See also the site's
[Performance](/performance) notes.

**Learn more:** [web.dev: Core Web Vitals](https://web.dev/articles/vitals) · [web.dev: Learn Performance](https://web.dev/learn/performance)
