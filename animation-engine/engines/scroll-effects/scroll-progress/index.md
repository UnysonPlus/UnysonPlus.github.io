---
sidebar_position: 8.7
title: Scroll Progress
slug: /scroll-progress
---

# Scroll Progress

:::tip[Try it live]
Preview the 16 built-in styles in the **[Scroll Progress playground](./playground.mdx)** — drag the vertical
scroll and watch the bar / ring / gauge / battery / counter / dots respond, then copy the generated
sample.
:::

A site-wide **reading-progress indicator** that fills as the visitor scrolls — with **16 built-in styles**, from a simple bar to a corner ring, a battery, a reading-time chip, or section scroll-spy dots, plus **Custom (code)** for your own design.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/scroll-progress/)** — an interactive showcase you can explore.

## Where to find it

It's **site-wide**: **Theme Settings → Site-wide UX → Scroll Progress**. Turn on **Enable scroll progress** (off by default), then pick a **Style** from the popover of animated tiles and configure it. Front end only.

## The styles

**16 built-in styles**, plus **Custom (code)**:

| Group | Styles |
| --- | --- |
| **Bars** (top or bottom) | **Bar** · **Gradient bar** (two colors) · **Glow edge** (a glowing leading dot) · **Segments** (notched, N segments) · **Pill** (inset, rounded) · **% label bar** (a percentage rides the edge) · **Under-nav bar** (offset below a fixed header) · **Liquid bar** (flowing sheen) |
| **Edge** | **Side edge** — a vertical bar up the left or right of the viewport |
| **Corner ring / gauge** | **Ring** (+ scroll-to-top) · **Ring + %** (percentage in the center) · **Gauge** (semicircle) · **Battery** (a filling capsule) |
| **Text chips** | **% Counter** (a "45%" chip) · **Time left** (estimated reading time remaining, from a words-per-minute guess) |
| **Navigation** | **Section dots** — a scroll-spy: one dot per Section that highlights the current one and doubles as jump-to-section nav |
| **Your own** | **Custom (code)** — write the indicator yourself (see below) |

## Options

Each style reveals only its relevant controls:

- **Color** (all) — and a second color for the **Gradient** bar.
- **Position** — top or bottom of the page for the bars; the left or right edge for *Side edge*.
- **Thickness** (bars/edge): 2–14 px, default 4. **Segments** count: 4–30, default 12. **Top offset**
  (under-nav bar): 0–200 px, default 60.
- **Size** (32–96 px, default 56) and **Position** (bottom-right / bottom-left) for the ring / gauge /
  battery; the four corners for the chips.
- **Click to scroll to top** for the ring styles (on by default).
- **Words per minute** for *Time left*: 120–400, default 220.
- **Hide at the top** (most styles, on by default) — fades the indicator in only once the visitor starts scrolling.

### Custom (code)

The **Custom (code)** style gives you three code editors, so you can build any indicator (a vertical
rail with chapter markers, say):

- **Custom HTML** — markup placed inside the fixed `.upw-sp.upw-sp--custom` container. It is output
  verbatim, so only administrators can use it.
- **Custom CSS** — injected in a `<style>` tag on the front end. Target `.upw-sp--custom` and drive the
  motion from the `--sp-progress` CSS variable (0–1), e.g. `transform: scaleY(var(--sp-progress))`.
- **Custom JS** — runs after the markup. Read `window.upwScrollProgress` (0–1), or listen for the
  `upw:scroll` event: `window.addEventListener('upw:scroll', e => e.detail)`.

:::note[Section dots]
The dots use the page's `<section>` / `.fw-section` blocks (needs 2+). They highlight the section
nearest the top of the viewport and jump to a section on click — so they act as a mini side-nav.
:::

## Performance & accessibility

- Tiny self-contained CSS/JS, enqueued **site-wide only when enabled** — one style at a time.
- One passive scroll listener, RAF-throttled; respects reduced motion.
