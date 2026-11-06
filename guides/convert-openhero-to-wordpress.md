---
title: "How to build a free WordPress site from OpenHero"
sidebar_label: "OpenHero → WordPress"
description: "Turn an OpenHero-generated site into a real, editable WordPress site — free, no coding. Publish it, then convert from its URL with the Unyson+ Site Converter."
keywords:
  - openhero to wordpress
  - convert openhero to wordpress
  - openhero wordpress
  - openhero export wordpress
  - openhero to wordpress free
image: /img/page-builder.png
---

# How to build a free WordPress site from OpenHero

**OpenHero** generates a site design from a prompt, but it lives on its own hosted platform. Bringing
it into **WordPress** gives you a site you fully own and can edit — a real CMS, plugins, your own SEO
and forms, and hosting you choose. The free **[Site Converter](/extensions/site-converter)** rebuilds
your design into native, editable page-builder pages.

Because the site renders in the browser, the route is to **convert from its published URL**: the
converter opens the live page in real Chrome and reads the computed design.

## Step 1 — Publish your OpenHero site (get a URL)

**Publish** your OpenHero project so it's live on a public URL, and make sure the page you want is
reachable.

## Step 2 — Install Unyson+ and Site Converter

1. Install and activate **[Unyson+](/installation)** (free).
2. **Unyson+ → Extensions** → activate **Site Converter**.
3. Start the **[capture service](/extensions/site-converter/capture-service)** — for a URL conversion
   this renders the page in Chrome and captures the real colors, fonts and layout. (One-time local
   setup.)

## Step 3 — Convert from the URL

1. **Unyson+ → Convert** → **Convert** tab → **From a URL**.
2. Paste your **published OpenHero URL**.
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

**Is it a static copy?** No — it rebuilds the design as **native, editable** Unyson+ pages.

## See also

- [Build a free WordPress site fast](/guides/build-a-free-wordpress-site-fast) — the overview.
- [Base44 →](/guides/convert-base44-to-wordpress) · [Durable →](/guides/convert-durable-to-wordpress) · [Bolt →](/guides/convert-bolt-to-wordpress) · [v0 →](/guides/convert-v0-to-wordpress)
- [Site Converter](/extensions/site-converter) · [Capture service](/extensions/site-converter/capture-service)
