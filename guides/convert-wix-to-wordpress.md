---
title: "How to convert your Wix site to WordPress"
sidebar_label: "Wix → WordPress"
description: "Leave Wix for WordPress — rebuild your Wix site as native, editable pages, free and no coding. Wix has no real export, but the Unyson+ Site Converter rebuilds it straight from your live URL."
keywords:
  - wix to wordpress
  - convert wix to wordpress
  - migrate wix to wordpress
  - wix export wordpress
  - move from wix to wordpress
image: /img/page-builder.png
---

# How to convert your Wix site to WordPress

**Wix** is easy to start on but hard to leave: there's **no real way to export a Wix site**, and
your pages, content and hosting are all tied to the Wix platform and its monthly plans. **WordPress**
is the opposite — self-hosted, open, and yours: a full CMS, thousands of plugins, your own SEO, and
hosting you choose.

Because Wix won't hand you your files, the practical route off it is to **rebuild the design from
your live page**. The free **[Site Converter](/extensions/site-converter)** opens your published Wix
URL in real Chrome, reads the **computed** design, and rebuilds it as a **native, fully editable
WordPress site** — real page-builder pages, a matching theme, menus and Media Library.

## Step 1 — Get your live Wix URL

Make sure your Wix site is **published** and publicly reachable — on your `*.wixsite.com` address or
your connected custom domain. That live page is what the converter reads.

## Step 2 — Install Unyson+ and Site Converter

1. Install and activate **[Unyson+](/installation)** (free).
2. **Unyson+ → Extensions** → activate **Site Converter**.
3. Start the **[capture service](/extensions/site-converter/capture-service)** — for a URL
   conversion this is what renders the page in Chrome and captures the real colors, fonts and
   layout. (One-time local setup.)

## Step 3 — Convert from the URL

<img src="/img/guides/site-converter-convert.png" alt="The Unyson+ Convert screen — choose From a URL and paste your live Wix link, then convert" width="1758" />

1. **Unyson+ → Convert** → **Convert** tab → **From a URL**.
2. Paste your **live Wix URL**.
3. Set options — **Create child theme**, **Capture header/footer**, **Import images**, optional
   **[AI assist](/extensions/site-converter/ai-assist)** (an optional Claude pass that only refines
   the section *mapping*; the design is always reproduced deterministically).
4. Click **Convert to WordPress**, or **Review mapping first**, then **Build the site**.

Full walkthrough: **[Convert from a URL](/extensions/site-converter/convert-from-url)**.

## Step 4 — Edit in the builder, then add what Wix locked away

Every page comes across **fully editable** in the [page builder](/page-builder). Once you're on
WordPress you can add the things Wix gated behind higher plans or didn't allow: real SEO plugins,
unlimited forms, WooCommerce, custom post types, and any theme or plugin you like.

:::tip[Multi-page Wix sites]
Convert each page from its own live URL. Dynamic pieces — a store, bookings, members — are rebuilt
with native WordPress plugins (WooCommerce and friends) rather than copied, so you own those too.
:::

:::tip[Not close enough? Let an AI agent finish the job]
An automatic conversion is a **close, editable starting point — not always pixel-perfect.** To get it
the rest of the way, hand it to an AI agent like **Claude**: it runs the conversion, compares the result
to your original section by section, and refines it until it matches. See
**[Convert a site to WordPress with an AI agent](/guides/convert-site-to-wordpress-with-ai)**.
:::

## FAQ

**Can you export a Wix site to WordPress?** Wix has no genuine export, so there's no file to import.
Converting from the **live URL** is the way out — it rebuilds your design as editable WordPress
pages.

**Is it free?** Yes — Unyson+ and the Site Converter are free, with no pro tier.

**Will my content come over?** The page design and content are rebuilt from the live page. Dynamic
features (store, blog feeds, forms) are re-added with WordPress plugins, which is where they belong.

**Is it a static copy?** No — it rebuilds the design as **native, editable** Unyson+ pages.

## See also

- [Convert your Webflow site to WordPress](/guides/convert-webflow-to-wordpress) · [Squarespace →](/guides/convert-squarespace-to-wordpress) · [Framer →](/guides/convert-framer-to-wordpress)
- [Convert an existing website to WordPress](/guides/convert-website-to-wordpress) — the general flow.
- [Convert from a URL](/extensions/site-converter/convert-from-url) · [Site Converter](/extensions/site-converter) · [Capture service](/extensions/site-converter/capture-service)
