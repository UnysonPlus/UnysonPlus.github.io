---
title: "How to convert your Wegic site to WordPress"
sidebar_label: "Wegic → WordPress"
description: "Move a Wegic-built site into WordPress as native, editable pages — free, no coding. Publish your Wegic site, then convert it from its URL with the Unyson+ Site Converter."
keywords:
  - wegic to wordpress
  - convert wegic to wordpress
  - wegic site to wordpress
  - wegic export wordpress
  - ai website to wordpress
image: /img/page-builder.png
---

# How to convert your Wegic site to WordPress

**Wegic** builds a complete, good-looking site from a chat prompt — but what you end up with is a
page hosted on Wegic's platform. You can't hand it to a client to edit in a CMS they already know,
you can't add a blog or a shop to it, and you don't own it: it lives where it was made, for as long
as you keep paying for it. The free **[Site Converter](/extensions/site-converter)** rebuilds that
design as a **native, fully editable WordPress site** — real page-builder pages, a matching theme,
menus and Media Library.

<div class="yt-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/_wWbRhbVsbE" title="Wegic to WordPress — full conversion walkthrough" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

*A complete conversion end to end, using a barbershop landing page as the source — the kind of local
business site AI builders get used for most. The written steps below cover the same ground.*

Wegic renders its pages in the browser, so the reliable path is to **convert from the published
URL** — the converter opens the live page in real Chrome and reads the **computed** styles, so what
you see is what you get.

## Step 1 — Publish your Wegic site (get a URL)

In Wegic, **publish** the site so it has a live, publicly reachable address. That's either the
address Wegic gives you on its own domain or, if you've connected one, your custom domain. Either
works — the converter only needs to be able to load the page.

Check it in a private browser window first. If the page needs a login or is still a private draft,
the converter can't reach it either.

## Step 2 — Install Unyson+ and Site Converter

1. Install and activate **[Unyson+](/installation)** (free).
2. **Unyson+ → Extensions** → activate **Site Converter**.
3. Start the **[capture service](/extensions/site-converter/capture-service)** — for a URL
   conversion this is what renders the page in Chrome and captures the real colors, fonts and
   layout. (One-time local setup.)

## Step 3 — Convert from the URL

1. **Unyson+ → Convert** → **Convert** tab → **From a URL**.
2. Paste your **published Wegic URL**.
3. Set options — **Create child theme**, **Capture header/footer**, **Import images**, optional
   **[AI assist](/extensions/site-converter/ai-assist)** (an optional Claude pass that only refines
   the section *mapping*; the design is always reproduced deterministically).
4. Click **Convert to WordPress**, or **Review mapping first**, then **Build the site**.

Full walkthrough: **[Convert from a URL](/extensions/site-converter/convert-from-url)**.

## Step 4 — Edit in the builder

Every page comes across **fully editable** in the [page-builder](/page-builder). Change the headline,
swap a photo, reorder sections — then add the things a hosted AI builder can't give you: posts,
booking and contact forms, WooCommerce, an SEO plugin. It's a normal WordPress site now, on your own
hosting.

:::tip[Service-business sites]
Wegic is often used for local businesses — salons, clinics, gyms, trades. Those sites usually need
one thing the AI builder doesn't do well: a **booking or quote form that actually sends email**.
Convert first, then wire the form up with a WordPress forms plugin; the converted section keeps its
design and gains a working back end.
:::

## FAQ

**Is it free?** &nbsp;Yes — Unyson+ and the Site Converter are free, with no pro tier.

**Do I need to export any code?** &nbsp;No — publishing to a URL is enough; the converter reads the
live page.

**Is it a static copy?** &nbsp;No — it rebuilds the design as **native, editable** Unyson+ pages, not
an iframe or a screenshot.

**What about a multi-page site?** &nbsp;Convert each page from its own URL. Menus and the footer are
rebuilt as real WordPress menus and widget areas.

**Will the animations survive?** &nbsp;Standard entrance and scroll effects are mapped to the
[Animation Engine](/animation-engine). Anything unusual is worth checking after conversion and
re-adding from the builder.

## See also

- [Convert your Lovable site to WordPress](/guides/convert-lovable-to-wordpress) — the same flow for
  another hosted AI builder.
- [Convert an AI-generated static HTML site to WordPress](/guides/convert-ai-generated-html-to-wordpress)
  — the general guide for any AI export.
- [Convert from a URL](/extensions/site-converter/convert-from-url) — the URL path in detail.
- [Site Converter](/extensions/site-converter) · [Capture service](/extensions/site-converter/capture-service)
