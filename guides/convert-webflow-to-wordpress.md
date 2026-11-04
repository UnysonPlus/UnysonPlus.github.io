---
title: "How to convert your Webflow site to WordPress"
sidebar_label: "Webflow → WordPress"
description: "Move a Webflow site to WordPress as native, editable pages — free, no coding. Convert it straight from its published URL with the Unyson+ Site Converter, and leave the monthly fees and lock-in behind."
keywords:
  - webflow to wordpress
  - convert webflow to wordpress
  - migrate webflow to wordpress
  - webflow export wordpress
  - webflow alternative wordpress
image: /img/page-builder.png
---

# How to convert your Webflow site to WordPress

**Webflow** is a polished visual design tool, but the site it produces is a **hosted, subscription
platform** — your pages, CMS and hosting all live inside Webflow, and its code export is a bundle of
static HTML with no CMS and no plugins. Moving to **WordPress** gives you a self-hosted site you
fully own: a real CMS, thousands of plugins, your own SEO and forms, and no monthly platform fee.

The free **[Site Converter](/extensions/site-converter)** rebuilds your Webflow design into a
**native, fully editable WordPress site** — real page-builder pages, a matching theme, menus and
Media Library — so you keep the look and get all of WordPress underneath.

The reliable path is to **convert from your published URL**: the converter opens the live page in
real Chrome and reads the **computed** styles, so what you see is what you get.

## Step 1 — Publish your Webflow site (get a URL)

In Webflow, **Publish** your project so it's live on your `*.webflow.io` staging address or your
custom domain. Make sure the page you want to convert is publicly reachable.

## Step 2 — Install Unyson+ and Site Converter

1. Install and activate **[Unyson+](/installation)** (free).
2. **Unyson+ → Extensions** → activate **Site Converter**.
3. Start the **[capture service](/extensions/site-converter/capture-service)** — for a URL
   conversion this is what renders the page in Chrome and captures the real colors, fonts and
   layout. (One-time local setup.)

## Step 3 — Convert from the URL

<img src="/img/guides/site-converter-convert.png" alt="The Unyson+ Convert screen — choose From a URL and paste your published Webflow link, then convert" width="1758" />

1. **Unyson+ → Convert** → **Convert** tab → **From a URL**.
2. Paste your **published Webflow URL**.
3. Set options — **Create child theme**, **Capture header/footer**, **Import images**, optional
   **[AI assist](/extensions/site-converter/ai-assist)** (an optional Claude pass that only refines
   the section *mapping*; the design is always reproduced deterministically).
4. Click **Convert to WordPress**, or **Review mapping first**, then **Build the site**.

Full walkthrough: **[Convert from a URL](/extensions/site-converter/convert-from-url)**.

## Step 4 — Edit in the builder

Every page comes across **fully editable** in the [page builder](/page-builder) — tweak sections,
swap content, then add the things Webflow charged extra for or couldn't do: posts, forms,
WooCommerce, SEO plugins. It's a normal WordPress site now, on hosting you choose.

:::tip[Multi-page Webflow sites]
Convert each page from its own published URL. Menus and the footer are rebuilt as real WordPress
menus and widget areas, so your navigation carries over.
:::

## FAQ

**Does Webflow export to WordPress?** Not natively — Webflow's own export is static HTML with no
CMS. Converting from the live URL rebuilds the design as **native, editable** WordPress pages
instead.

**Is it free?** Yes — Unyson+ and the Site Converter are free, with no pro tier.

**Do I lose the CMS?** You gain one. Webflow CMS collections become ordinary WordPress content you
manage with posts, pages and custom fields.

**Is it a static copy?** No — it rebuilds the design as editable Unyson+ pages, not a screenshot or
an iframe.

## See also

- [Convert your Wix site to WordPress](/guides/convert-wix-to-wordpress) · [Squarespace →](/guides/convert-squarespace-to-wordpress) · [Framer →](/guides/convert-framer-to-wordpress)
- [Convert an existing website to WordPress](/guides/convert-website-to-wordpress) — the general flow.
- [Convert from a URL](/extensions/site-converter/convert-from-url) · [Site Converter](/extensions/site-converter) · [Capture service](/extensions/site-converter/capture-service)
