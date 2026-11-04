---
title: "How to convert your Framer site to WordPress"
sidebar_label: "Framer → WordPress"
description: "Move a Framer site to WordPress as native, editable pages — free, no coding. Publish your Framer site, then convert it from its URL with the Unyson+ Site Converter."
keywords:
  - framer to wordpress
  - convert framer to wordpress
  - migrate framer to wordpress
  - framer export wordpress
  - framer alternative wordpress
image: /img/page-builder.png
---

# How to convert your Framer site to WordPress

**Framer** builds slick, animated sites from a design canvas — but the result is a **hosted site on
Framer's platform**, with its own plans and no WordPress CMS behind it. Moving to **WordPress** gives
you a self-hosted site you own outright: a real CMS, thousands of plugins, your own SEO and forms,
and hosting you choose.

The free **[Site Converter](/extensions/site-converter)** rebuilds your Framer design into a
**native, fully editable WordPress site** — real page-builder pages, a matching theme, menus and
Media Library. Because Framer renders in the browser, the reliable path is to **convert from its
published URL**: the converter opens the live page in real Chrome and reads the **computed** styles,
so it reproduces the real design rather than guessing at it.

:::tip[Not close enough? Let an AI agent finish the job]
An automatic conversion is a **close, editable starting point — not always pixel-perfect.** To get it
the rest of the way, hand it to an AI agent like **Claude**: it runs the conversion, compares the result
to your original section by section, and refines it until it matches. See
**[Convert a site to WordPress with an AI agent](/guides/convert-site-to-wordpress-with-ai)**.
:::

## Step 1 — Publish your Framer site (get a URL)

In Framer, **Publish** your project so it's live on your `*.framer.website` / `*.framer.app` address
or your custom domain. Make sure the page you want is publicly reachable.

## Step 2 — Install Unyson+ and Site Converter

1. Install and activate **[Unyson+](/installation)** (free).
2. **Unyson+ → Extensions** → activate **Site Converter**.
3. Start the **[capture service](/extensions/site-converter/capture-service)** — for a URL
   conversion this is what renders the page in Chrome and captures the real colors, fonts and
   layout. (One-time local setup.)

## Step 3 — Convert from the URL

<img src="/img/guides/site-converter-convert.png" alt="The Unyson+ Convert screen — choose From a URL and paste your published Framer link, then convert" width="1758" />

1. **Unyson+ → Convert** → **Convert** tab → **From a URL**.
2. Paste your **published Framer URL**.
3. Set options — **Create child theme**, **Capture header/footer**, **Import images**, optional
   **[AI assist](/extensions/site-converter/ai-assist)** (an optional Claude pass that only refines
   the section *mapping*; the design is always reproduced deterministically).
4. Click **Convert to WordPress**, or **Review mapping first**, then **Build the site**.

Full walkthrough: **[Convert from a URL](/extensions/site-converter/convert-from-url)**.

## Step 4 — Edit in the builder

Every page comes across **fully editable** in the [page builder](/page-builder) — tweak sections,
swap content, then add the things a hosted Framer site can't give you: posts, forms, WooCommerce, SEO
plugins. It's a normal WordPress site now.

:::tip[Multi-page Framer sites]
Convert each page from its own published URL. Menus and the footer are rebuilt as real WordPress
menus and widget areas.
:::

## FAQ

**Does Framer export to WordPress?** Not natively — a Framer site stays on Framer's platform.
Converting from the published URL rebuilds the design as **native, editable** WordPress pages
instead.

**Is it free?** Yes — Unyson+ and the Site Converter are free, with no pro tier.

**What about my animations?** The layout, styling and content are rebuilt as editable pages; re-add
motion with the free **[Animation Engine](/animation-engine)**, which does scroll, parallax and text
effects natively in WordPress.

**Is it a static copy?** No — it rebuilds the design as editable Unyson+ pages, not an iframe or a
screenshot.

## See also

- [Convert your Webflow site to WordPress](/guides/convert-webflow-to-wordpress) · [Wix →](/guides/convert-wix-to-wordpress) · [Squarespace →](/guides/convert-squarespace-to-wordpress)
- [Convert an existing website to WordPress](/guides/convert-website-to-wordpress) — the general flow.
- [Convert from a URL](/extensions/site-converter/convert-from-url) · [Site Converter](/extensions/site-converter) · [Capture service](/extensions/site-converter/capture-service)
