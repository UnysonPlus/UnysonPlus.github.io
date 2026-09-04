---
title: "How to convert your Lovable site to WordPress"
sidebar_label: "Lovable → WordPress"
description: "Move a Lovable-built site into WordPress as native, editable pages — free, no coding. Publish your Lovable app, then convert it from its URL with the Unyson+ Site Converter."
keywords:
  - lovable to wordpress
  - convert lovable to wordpress
  - lovable site to wordpress
  - lovable export wordpress
  - ai website to wordpress
image: /img/page-builder.png
---

# How to convert your Lovable site to WordPress

**Lovable** builds a polished front end from a prompt, but the result is a hosted app — not a
WordPress site you can hand to a client, blog from, or run SEO and forms on. The free
**[Site Converter](/extensions/site-converter)** rebuilds your Lovable design into a **native, fully
editable WordPress site**: real page-builder pages, a matching theme, menus and Media Library.

Because Lovable renders in the browser, the reliable path is to **convert from its published URL** —
the converter opens the live page in real Chrome and reads the **computed** styles, so what you see
is what you get.

## Step 1 — Publish your Lovable site (get a URL)

In Lovable, **Publish** your project to get a live preview/published **URL**. (If you've exported the
code to GitHub and deployed it, that deployed URL works too.) Make sure the page you want is publicly
reachable.

## Step 2 — Install Unyson+ and Site Converter

1. Install and activate **[Unyson+](/installation)** (free).
2. **Unyson+ → Extensions** → activate **Site Converter**.
3. Start the **[capture service](/extensions/site-converter/capture-service)** — for a URL
   conversion this is what renders the page in Chrome and captures the real colors, fonts and
   layout. (One-time local setup.)

## Step 3 — Convert from the URL

1. **Unyson+ → Convert** → **Convert** tab → **From a URL**.
2. Paste your **published Lovable URL**.
3. Set options — **Create child theme**, **Capture header/footer**, **Import images**, optional
   **[AI assist](/extensions/site-converter/ai-assist)** (an optional Claude pass that only refines
   the section *mapping*; the design is always reproduced deterministically).
4. Click **Convert to WordPress**, or **Review mapping first**, then **Build the site**.

Full walkthrough: **[Convert from a URL](/extensions/site-converter/convert-from-url)**.

## Step 4 — Edit in the builder

Every page comes across **fully editable** in the [page-builder](/page-builder) — tweak sections,
swap content, then add the things a static app can't give you: posts, forms, WooCommerce, SEO
plugins. It's a normal WordPress site now.

:::tip[Multi-page Lovable sites]
Convert each page from its own URL, or paste a URL list where the tool supports it. Menus and the
footer are rebuilt as real WordPress menus and widget areas.
:::

## FAQ

**Is it free?** Yes — Unyson+ and the Site Converter are free, no pro tier.

**Do I need to export the code?** No — publishing to a URL is enough; the converter reads the live
page.

**Is it a static copy?** No — it rebuilds the design as **native, editable** Unyson+ pages, not an
iframe or screenshot.

## See also

- [Convert an AI-generated static HTML site to WordPress](/guides/convert-ai-generated-html-to-wordpress)
  — the general guide for any AI export (v0, Bolt, Stitch, Claude…).
- [Convert from a URL](/extensions/site-converter/convert-from-url) — the URL path in detail.
- [Site Converter](/extensions/site-converter) · [Capture service](/extensions/site-converter/capture-service)
