---
sidebar_position: 3
title: How it works
---

# How it works — the short version

Site Converter renders your source (a URL, or an uploaded HTML/Stitch export), reads its **live DOM +
computed CSS**, and rebuilds it as a **native UnysonPlus site** — a child theme plus page‑builder
pages, real menus, footer widget areas, and a populated Media Library. Nothing is hand‑coded; every
page stays editable in the builder.

:::tip[💡 Web dev tip: a faithful clone can still inherit the original's problems]
Reproducing a source's DOM and computed CSS gets you a pixel-accurate copy — including any missing
alt text, skipped heading levels, or low-contrast text the original already had. A conversion is a
great starting point, not a finished, accessible page; give the result a quick pass afterward rather
than assuming fidelity to the source means it's already correct. [W3C WAI: Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
:::

## Two engines, plus optional AI

| Engine | When it runs | Trade‑off |
|---|---|---|
| **Deterministic (offline)** | A **file upload** with the capture service **off** — pure PHP, no browser, no AI | Fast and fully **repeatable** (same input → same output), zero setup. Lower fidelity on JavaScript‑rendered pages. |
| **Capture service** | **From a URL**, or a **file upload** while the service is **running** — real Google Chrome reads the computed CSS + DOM | Highest fidelity, even for JS‑heavy pages. Needs the one‑time [service install](./capture-service.md). Still deterministic — no AI unless you turn it on. |
| **AI assist** *(optional)* | "Use AI" checked — **Claude** corrects the **mapping only** | Smarter element identification without touching the faithful CSS/chrome output. See [AI assist](./ai-assist.md). |

Everything runs **entirely on your machine** — nothing is sent to a third party.

> **Which do I use?** Need an identical result every time (a template you re‑import)? Use the
> deterministic/offline path. Need maximum fidelity from a live or JS‑heavy page? Use the capture
> service. Reach for AI only to clean up element roles after the fact.

## The full architecture & algorithm

The complete pipeline — capture → extract → apply → review → build, section detection, chrome‑vs‑content,
the role→shortcode map, the navigation and footer‑widget mappers, design‑token extraction, the
two kept‑in‑sync implementations, and exactly where AI fits — is documented once, canonically, in the
AI Dev Kit:

**→ [Conversion Architecture — pipeline & algorithm](https://docs.unysonplus.com/ai-dev-kit/conversion-architecture)**

That same engine powers both this plugin and the AI Dev Kit's agent‑driven builds, so the deep
reference lives in one place. This page and the other Site Converter pages
([Convert from a URL](./convert-from-url.md), [Convert from a file](./convert-from-file.md),
[the capture service](./capture-service.md), [AI assist](./ai-assist.md),
[Manual tools](./manual-tools.md)) are the **task guides** for using the extension in `wp-admin`.
