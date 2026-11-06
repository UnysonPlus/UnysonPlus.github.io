---
title: "How to turn a v0 design into a free WordPress site"
sidebar_label: "v0 → WordPress"
description: "Turn a v0-generated UI into a real, editable WordPress site — free, no coding. Deploy it and convert from the URL, or export the code and convert the HTML, with the Unyson+ Site Converter."
keywords:
  - v0 to wordpress
  - v0.dev to wordpress
  - convert v0 to wordpress
  - vercel v0 wordpress
  - v0 to wordpress free
image: /img/page-builder.png
---

# How to turn a v0 design into a free WordPress site

**v0** generates polished UI and whole pages from a prompt. To run one as a site you own — with a real
CMS, plugins and SEO, on hosting you choose — bring it into **WordPress** for free with the Unyson+
**[Site Converter](/extensions/site-converter)**, which rebuilds the design into native, editable
page-builder pages.

Two ways in, depending on how you have your v0 project:

- **Deploy it** to a public URL, then convert **from the URL** (below).
- **Export the code** and convert the built **HTML/CSS** instead — see
  [Convert an AI-generated HTML site](/guides/convert-ai-generated-html-to-wordpress).

## Step 1 — Deploy your v0 page (get a URL)

**Deploy** your v0 generation so it's live on a public URL, and make sure the page you want is
reachable.

## Step 2 — Install Unyson+ and Site Converter

1. Install and activate **[Unyson+](/installation)** (free).
2. **Unyson+ → Extensions** → activate **Site Converter**.
3. Start the **[capture service](/extensions/site-converter/capture-service)** — for a URL conversion
   this renders the page in Chrome and captures the real colors, fonts and layout. (One-time local
   setup.)

## Step 3 — Convert from the URL

1. **Unyson+ → Convert** → **Convert** tab → **From a URL**.
2. Paste your **deployed v0 URL**.
3. Set options — **Create child theme**, **Capture header/footer**, **Import images**.
4. Click **Convert to WordPress**, or **Review mapping first**, then **Build the site**.

Full walkthrough: **[Convert from a URL](/extensions/site-converter/convert-from-url)**.

## Step 4 — Edit in the builder

Every page comes across **fully editable** in the [page builder](/page-builder) — tweak sections, then
add posts, forms, WooCommerce and SEO. It's a real WordPress site now.

:::tip[Not close enough? Let an AI agent finish the job]
An automatic conversion is a **close, editable starting point — not always pixel-perfect.** To get it
the rest of the way, hand it to an AI agent like **Claude**: it runs the conversion, compares the result
to your original section by section, and refines it until it matches. See
**[Convert a site to WordPress with an AI agent](/guides/convert-site-to-wordpress-with-ai)**.
:::

## FAQ

**Is it free?** Yes — Unyson+ and the Site Converter are free, with no pro tier.

**Deploy or export?** Either works — deploy and convert from the URL, or export the code and convert
the HTML.

## See also

- [Build a free WordPress site fast](/guides/build-a-free-wordpress-site-fast) — the overview.
- [Bolt →](/guides/convert-bolt-to-wordpress) · [Base44 →](/guides/convert-base44-to-wordpress) · [Convert an AI-generated HTML site](/guides/convert-ai-generated-html-to-wordpress)
- [Site Converter](/extensions/site-converter) · [Capture service](/extensions/site-converter/capture-service)
