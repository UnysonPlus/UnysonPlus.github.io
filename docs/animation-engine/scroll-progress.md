---
sidebar_position: 8.7
title: Scroll Progress
---

# Scroll Progress

A site-wide **reading-progress indicator** — a thin bar at the top or bottom of the page, or a circular ring in a corner — that fills as the visitor scrolls.

## Where to find it

It's **site-wide**: **Theme Settings → Animations → Scroll Progress**. Turn on **Enable scroll progress** (off by default), pick a **Style**, and configure it. Front end only.

## Styles & options

| Style | Options |
| --- | --- |
| **Bar — top of page** | Color · Thickness · Hide at the top |
| **Bar — bottom of page** | Color · Thickness · Hide at the top |
| **Circle — corner** | Color · Size · Position (bottom-right / left) · **Click to scroll to top** · Hide at the top |

- **Hide at the top** fades the indicator in only once the visitor starts scrolling.
- The **Circle** doubles as a **scroll-to-top** button when *Click to scroll to top* is on.

## Performance & accessibility

- Tiny self-contained CSS/JS, enqueued **site-wide only when enabled**.
- One passive scroll listener, RAF-throttled.
