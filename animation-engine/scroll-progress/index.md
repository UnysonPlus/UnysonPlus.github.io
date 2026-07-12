---
sidebar_position: 8.7
title: Scroll Progress
slug: /scroll-progress
---

# Scroll Progress

:::tip Try it live
Preview all 16 styles in the **[Scroll Progress playground](./playground.mdx)** — drag the scroll
position (or auto-scroll) and watch the bar / ring / gauge / battery / counter / dots respond, then
copy the generated sample.
:::

A site-wide **reading-progress indicator** that fills as the visitor scrolls — with **16 styles**, from a simple bar to a corner ring, a battery, a reading-time chip, or section scroll-spy dots.

## Where to find it

It's **site-wide**: **Theme Settings → Site-wide UX → Scroll Progress**. Turn on **Enable scroll progress** (off by default), then pick a **Style** from the popover of animated tiles and configure it. Front end only.

## The 16 styles

| Group | Styles |
| --- | --- |
| **Bars** (top or bottom) | **Bar** · **Gradient bar** (two colors) · **Glow edge** (a glowing leading dot) · **Segments** (notched, N segments) · **Pill** (inset, rounded) · **% label bar** (a percentage rides the edge) · **Under-nav bar** (offset below a fixed header) · **Liquid bar** (flowing sheen) |
| **Edge** | **Side edge** — a vertical bar up the left or right of the viewport |
| **Corner ring / gauge** | **Ring** (+ scroll-to-top) · **Ring + %** (percentage in the center) · **Gauge** (semicircle) · **Battery** (a filling capsule) |
| **Text chips** | **% Counter** (a "45%" chip) · **Time left** (estimated reading time remaining, from a words-per-minute guess) |
| **Navigation** | **Section dots** — a scroll-spy: one dot per Section that highlights the current one and doubles as jump-to-section nav |

## Options

Each style reveals only its relevant controls:

- **Color** (all) — and a second color for the **Gradient** bar.
- **Thickness** (bars/edge), **Segments** count, **Top offset** (under-nav bar).
- **Size** and **Position** (bottom-right / left) for the ring / gauge / battery; the four corners for the chips.
- **Click to scroll to top** for the ring styles.
- **Words per minute** for *Time left*.
- **Hide at the top** (most styles) — fades the indicator in only once the visitor starts scrolling.

:::note Section dots
The dots use the page's `<section>` / `.fw-section` blocks (needs 2+). They highlight the section
nearest the top of the viewport and jump to a section on click — so they act as a mini side-nav.
:::

## Performance & accessibility

- Tiny self-contained CSS/JS, enqueued **site-wide only when enabled** — one style at a time.
- One passive scroll listener, RAF-throttled; respects reduced motion.
