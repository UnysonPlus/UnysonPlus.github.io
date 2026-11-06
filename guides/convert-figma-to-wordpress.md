---
title: "How to turn a Figma design into a free WordPress site"
sidebar_label: "Figma → WordPress"
description: "Turn a Figma design into a real, editable WordPress site — free, no coding. Export your frame to HTML/CSS, then convert it with the Unyson+ Site Converter."
keywords:
  - figma to wordpress
  - convert figma to wordpress
  - figma design to wordpress
  - export figma to wordpress
  - figma to wordpress free
image: /img/page-builder.png
---

# How to turn a Figma design into a free WordPress site

**Figma** is where a lot of sites are designed — but a Figma file isn't a website. Instead of handing
it to a developer or rebuilding it by hand, you can turn the design into a **real, editable WordPress
site for free** with the Unyson+ **[Site Converter](/extensions/site-converter)**: you own it, host it
anywhere, and edit every section in the visual builder.

Because a Figma design isn't a live page, the route is **export it to HTML/CSS first**, then convert
that.

## Step 1 — Export your Figma frame to HTML/CSS

In Figma, use a **design-to-code** export (a Figma plugin that outputs HTML + CSS, or Figma's own
code export) to save your frame as an **`index.html`** with its CSS and images alongside it. A single
page is the cleanest starting point.

## Step 2 — Install Unyson+ and Site Converter

1. Install and activate **[Unyson+](/installation)** (free).
2. **Unyson+ → Extensions** → activate **Site Converter**.

(No capture service is needed for an HTML upload — that's only for converting a live URL.)

## Step 3 — Convert the HTML

**Unyson+ → Convert** → upload your exported HTML (or a `.zip` of the export). The converter reads the
markup and styling and rebuilds them as native page-builder sections. The full upload walkthrough —
single file, `.zip`, or pasting a page's code — is in
**[Convert an AI-generated HTML site](/guides/convert-ai-generated-html-to-wordpress)**.

## Step 4 — Edit in the builder

Your design lands as editable [page-builder](/page-builder) content — adjust sections, wire up the
real navigation, and add what a static design can't: posts, forms, WooCommerce, SEO. Then publish.

:::tip[Not close enough? Let an AI agent finish the job]
An automatic conversion is a **close, editable starting point — not always pixel-perfect.** To get it
the rest of the way, hand it to an AI agent like **Claude**: it runs the conversion, compares the result
to your design section by section, and refines it until it matches. See
**[Convert a site to WordPress with an AI agent](/guides/convert-site-to-wordpress-with-ai)**.
:::

## FAQ

**Does Figma export to WordPress?** Not directly — Figma exports a design, not a site. Export it to
**HTML/CSS** and the Site Converter rebuilds that as **editable** WordPress pages.

**Is it free?** Yes — Unyson+ and the Site Converter are free, with no pro tier.

**Can I convert a published Figma prototype URL instead?** If your design is published to a public
URL, you can convert it [from the URL](/extensions/site-converter/convert-from-url) with the capture
service — but an HTML export usually gives a cleaner result for a static design.

## See also

- [Build a free WordPress site fast](/guides/build-a-free-wordpress-site-fast) — the overview.
- [Adobe XD → WordPress](/guides/convert-xd-to-wordpress) · [Convert an AI-generated HTML site](/guides/convert-ai-generated-html-to-wordpress)
- [Site Converter](/extensions/site-converter)
