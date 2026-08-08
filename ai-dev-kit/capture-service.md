---
title: The Capture Service
sidebar_label: Capture Service
sidebar_position: 5
slug: /capture-service
description: The UnysonPlus Capture Service grabs a source page's rendered DOM, media, and computed styles so the Site Converter can rebuild it as native UnysonPlus pages.
---

# The Capture Service

The **Capture Service** is the companion tool that feeds the conversion pipeline. When you point the
agent at a URL, the capture step visits the page in a real browser and records everything the converter
needs to rebuild it faithfully:

- the **rendered DOM** (including JS-built content and inline SVGs a plain *view-source* misses),
- the page's **media** (images, video) so assets are side-loaded and used, not hot-linked, and
- the **computed styles** — the actual values behind the design, so the converter translates rather
  than guesses.

## Why it matters

This is what powers the **capture-first** rule ([How It Works](./how-it-works.md)): because the real
rendered page and its computed styles are captured up front, the converter can map each block to the
right shortcode with native options and compile the styling into design tokens — instead of the agent
hand-measuring the source.

## Running it

The service lives in the kit under the assembled capture pipeline and is a small Node tool. In the
`tools/design-capture` folder, install once (`npm install`), then capture a page:

```bash
node capture.mjs "https://example.com" capture-out/
```

It also runs as a local service exposing `/health`, `/capture`, and `/ai-convert` endpoints that the
WordPress **Site Converter** extension talks to, so you can capture and convert straight from the
*Unyson+ → Convert* screen.

## The two ways to feed a source

| Input | How |
|---|---|
| **A live URL** (best) | The agent runs the capture service — it reads the DOM **and** computed styles. |
| **A downloaded bundle** | A zip of `devtools.html` + `view-source.html` + media + a screenshot, uploaded to the Site Converter. |

## Get it

The Capture Service is bundled with the kit (assembled on setup) and is also its own repository:
[github.com/UnysonPlus/UnysonPlus-Capture-Service](https://github.com/UnysonPlus/UnysonPlus-Capture-Service).

Next: **[Get the Kit](./get-the-kit.md)**.
