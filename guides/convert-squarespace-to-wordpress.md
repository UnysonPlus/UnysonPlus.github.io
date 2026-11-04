---
title: "How to convert your Squarespace site to WordPress"
sidebar_label: "Squarespace → WordPress"
description: "Move from Squarespace to WordPress as native, editable pages — free, no coding. Squarespace's export is partial; the Unyson+ Site Converter rebuilds your actual design straight from its live URL."
keywords:
  - squarespace to wordpress
  - convert squarespace to wordpress
  - migrate squarespace to wordpress
  - squarespace export wordpress
  - move from squarespace to wordpress
image: /img/page-builder.png
---

# How to convert your Squarespace site to WordPress

**Squarespace** makes beautiful templated sites, but it's a **closed, subscription platform**: your
design, hosting and most of your content stay locked inside it. Its built-in export only hands over a
**partial XML** of some pages and blog posts — not your layout, styling or templates. **WordPress**
gives you a fully owned, self-hosted site with a real CMS, plugins, and no monthly platform fee.

To bring the **actual design** across, the free **[Site Converter](/extensions/site-converter)**
reads your live Squarespace page in real Chrome and rebuilds it as a **native, fully editable
WordPress site** — real page-builder pages, a matching theme, menus and Media Library.

:::tip[Not close enough? Let an AI agent finish the job]
An automatic conversion is a **close, editable starting point — not always pixel-perfect.** To get it
the rest of the way, hand it to an AI agent like **Claude**: it runs the conversion, compares the result
to your original section by section, and refines it until it matches. See
**[Convert a site to WordPress with an AI agent](/guides/convert-site-to-wordpress-with-ai)**.
:::

## Step 1 — Get your live Squarespace URL

Make sure the page is **published** and publicly reachable — on your `*.squarespace.com` address or
your connected custom domain. That rendered page is what the converter captures.

## Step 2 — Install Unyson+ and Site Converter

1. Install and activate **[Unyson+](/installation)** (free).
2. **Unyson+ → Extensions** → activate **Site Converter**.
3. Start the **[capture service](/extensions/site-converter/capture-service)** — for a URL
   conversion this is what renders the page in Chrome and captures the real colors, fonts and
   layout. (One-time local setup.)

## Step 3 — Convert from the URL

<img src="/img/guides/site-converter-convert.png" alt="The Unyson+ Convert screen — choose From a URL and paste your live Squarespace link, then convert" width="1758" />

1. **Unyson+ → Convert** → **Convert** tab → **From a URL**.
2. Paste your **live Squarespace URL**.
3. Set options — **Create child theme**, **Capture header/footer**, **Import images**, optional
   **[AI assist](/extensions/site-converter/ai-assist)** (an optional Claude pass that only refines
   the section *mapping*; the design is always reproduced deterministically).
4. Click **Convert to WordPress**, or **Review mapping first**, then **Build the site**.

Full walkthrough: **[Convert from a URL](/extensions/site-converter/convert-from-url)**.

## Step 4 — Edit in the builder

Every page comes across **fully editable** in the [page builder](/page-builder) — adjust sections,
swap content, and add what Squarespace kept behind its plans: unlimited forms, real SEO plugins,
WooCommerce, custom post types, and any theme or plugin you want.

:::tip[Keep your blog posts too]
Use Squarespace's native export for the **blog/post XML**, import it with WordPress's built-in
Importer, and convert the **page designs** from their live URLs with the Site Converter — together
you move both the content and the look.
:::

## FAQ

**Does Squarespace export to WordPress?** Only partially — its export is a limited XML of some
content, not your design. The Site Converter rebuilds the actual look from the live page as
**editable** WordPress pages.

**Is it free?** Yes — Unyson+ and the Site Converter are free, with no pro tier.

**Is it a static copy?** No — it rebuilds the design as **native, editable** Unyson+ pages, not a
screenshot.

## See also

- [Convert your Webflow site to WordPress](/guides/convert-webflow-to-wordpress) · [Wix →](/guides/convert-wix-to-wordpress) · [Framer →](/guides/convert-framer-to-wordpress)
- [Convert an existing website to WordPress](/guides/convert-website-to-wordpress) — the general flow.
- [Convert from a URL](/extensions/site-converter/convert-from-url) · [Site Converter](/extensions/site-converter) · [Capture service](/extensions/site-converter/capture-service)
