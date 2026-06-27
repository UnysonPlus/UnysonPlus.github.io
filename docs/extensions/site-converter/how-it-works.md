---
sidebar_position: 2
title: How it works
---

# How it works — architecture & algorithm

This page explains the full pipeline: how a design is captured, how it's turned into page‑builder
shortcodes + a child theme, and why the converter is built the way it is.

## Why a local capture service?

AI website builders (Lovable, v0, Bolt, React/Vite apps) and Google Stitch ship a **mostly‑empty
HTML shell** and build the real page in the browser with JavaScript and utility CSS (Tailwind from a
CDN, etc.). WordPress runs **PHP on the server** — it can't run a browser — so on its own it would
only ever see that empty shell, with no resolved layout, colors, or fonts to convert.

The **capture service** is a tiny Node program that runs on **your** machine. It opens the page in
**real Google Chrome** (via Playwright), waits for it to finish rendering, then reads the **live DOM
+ computed CSS** and hands the result back to WordPress.

```
Your browser (wp-admin)  ──►  Capture service (localhost, Node + Chrome)  ──►  bundle.zip
        │                                   │
        └────────── applies the bundle ◄────┘   (everything stays on your machine)
```

It runs entirely on your computer; your admin browser talks to it directly at `localhost`, and
nothing about your site is sent to a third party. See **[The capture service](./capture-service.md)**
to install it.

## The conversion engines — what runs, and when

There are **two conversion engines**, plus an **optional AI layer** on top. Which one runs explains
the speed, the fidelity, and the consistency you get:

| Engine | When it runs | How it works | Trade‑off |
|---|---|---|---|
| **Deterministic (offline)** | A **file upload** with the capture service **off** | Pure PHP parses the static HTML, decomposes it into shortcodes, and reproduces the CSS — **no browser, no AI** | Fast and fully **repeatable** (same input → same output), works with zero setup. Lower fidelity on pages that build themselves with JavaScript after load. |
| **Capture service** | **From a URL**, or a **file upload** while the service is **running** | A small Node program renders the page in **real Google Chrome** (via Playwright) and reads the **computed** CSS + DOM, then runs the same mapping | Highest fidelity — real colors, fonts, and layout, even for JavaScript‑rendered pages. Needs the one‑time service install. Still **deterministic**: no AI unless you turn it on. |
| **AI assist** *(optional)* | "Use AI" checked, on either path above | After the capture, **Claude** corrects the **mapping only** (element roles, decorative blocks to skip, custom widgets to keep verbatim) — the deterministic engine still produces **all** CSS + chrome | Makes the engine's element identification smarter **without** touching the faithful output, and the correction also feeds back into the engine's **local** learned rules so the offline path improves. |

In short: the **deterministic** engine is the reliable baseline; the **capture service** is that same
algorithm driven by a real browser for higher fidelity; and **AI** is an optional refinement layered
on top of either. All three run **entirely on your machine** — nothing is sent to a third party.

> **Tip:** if you need an identical, reproducible result every time (e.g. for a template you re‑import),
> use the deterministic/offline path. If you need maximum visual fidelity from a live or JS‑heavy page,
> use the capture service. Reach for AI only to clean up element roles after the fact.

## The pipeline

```
 source ──► CAPTURE ──► EXTRACT ──► bundle.zip ──► APPLY ──────────► editable WP site
 (URL or          (headless        (sections,      (design phase:     (child theme +
  file)            Chrome)          chrome, media,   theme + presets    builder pages +
                                    presets, …)      + style guide)      menus + media)
                                                          │
                                                     REVIEW (you map
                                                     each element's role)
                                                          │
                                                     BUILD (pages +
                                                     section CSS)
```

1. **Capture** — render the source in headless Chrome.
2. **Extract** — the in‑browser extractor reads the rendered page and emits a **bundle**: a `.zip`
   of `bundle.json`, `mapping.json`, `theme-design.json`, `presets.json`, `media.json`,
   `pages.json`, `menus.json`, `styleguide.json`.
3. **Apply — design phase** — installs the child theme, imports media + presets + theme settings,
   builds a **Style Guide** page, and returns a **draft mapping** for review.
4. **Review** — you confirm each section's elements → roles (or omit/keep‑as‑code), give sections a
   CSS id, etc.
5. **Build** — the mapper turns the reviewed mapping into page‑builder trees, imports the pages, and
   merges the per‑section CSS into the child stylesheet.

## The conversion algorithm (deterministic, no‑AI)

The "no‑AI" converter is fully deterministic and runs offline. Its job is to decide **what's chrome
vs content**, **how each piece maps to a shortcode**, and **what the design tokens are**.

### Section detection

The extractor walks the rendered body and groups it into **sections** (the top‑level horizontal
bands of the page) — not by relying on `<section>` tags (modern/AI pages use `<div>`s), but by
structure: full‑width children of the main content root, each becoming one page‑builder *section*.

### Chrome vs content

:::note What "chrome" means here
**Chrome** is the site's *frame* — the **header, footer, and navigation** that wrap every page — **not
Google Chrome the browser**. The term comes from UI design ("chrome" = the interface surrounding the
content). The only browser involved is the one the *capture service* uses to render the page.
:::

The **header** and **footer** are *chrome*, handled by the generated child theme — **not**
page‑builder content. The extractor:

- **Header** — the `<header>`, or (for the many landing pages with no `<header>`) a top‑level
  sticky/fixed `<nav>`. The standalone brand link and the CTA are excluded from the nav menu.
- **Footer** — the `<footer>` and its columns.

These are excluded from the body sections so they don't get duplicated as content.

### Role mapping → shortcodes

Inside each kept section, every block is assigned a **role**, which maps to a shortcode:

| Role | Becomes | Notes |
|---|---|---|
| `overline` | eyebrow label on a Special Heading | |
| `title` | section heading (`h1`/`h2`) | |
| `subtitle` / `heading` | sub‑heading under a title | |
| `text` | paragraph (`text_block`) | |
| `button` | CTA (`button`) | |
| `image` | real `<img>` | de‑duped into the Media Library |
| `columns` | a row of cards → `icon_box`es | keeps the column count |
| `code` | a bespoke element kept as **raw HTML** | the fidelity escape hatch (audio players, custom widgets) |
| `skip` | dropped | decorative / chrome |

The mapper learns from your review corrections, so repeated conversions get better at the
auto‑detected roles.

### The navigation mapper

Rather than emit a framework‑specific menu, the converter extracts the source nav into a neutral
tree of `{label, href, children}` and builds a **real WordPress menu** (`wp_nav_menu`, assigned to
the theme's primary location). Internal links that match a created page become real page menu items;
everything else becomes a custom link. The menu is styled by generated `.sc-menu` CSS derived from
the source nav's computed styles — so it *looks* like the original but is a normal WP menu you edit
under *Appearance → Menus*. This works for Bootstrap, Tailwind, or any markup.

### The footer‑column → widget‑area mapper

The footer mapper counts the columns across the footer rows and maps each to a **widget area**
(`footer-1…N`; the parent theme registers 5, the child registers more if the footer has more),
seeding each with a **Custom HTML** widget containing that column's content. The copyright line gets
its own area. You then swap menus/social/text freely in *Appearance → Widgets*.

### Token / design extraction → the child theme

The extractor pulls **design tokens** from computed styles — page background, palette, fonts
(assuming the right Google Fonts), type scale, section padding rhythm, container max‑width, button
fill/radius/hover, borders, shadows. The **theme generator** writes these into the child theme's
`style.css`, and the **per‑section CSS** is merged between `SECTIONS` markers in that same
stylesheet, so the converted site loads **one clean child stylesheet**.

## Two implementations, kept in sync

The deterministic algorithm exists **twice** — once per input path — and the two are deliberately
kept consistent:

| Path | Lives in | Language |
|---|---|---|
| **URL capture** | the capture service | JS (`capture-extract.mjs`, `to-pages.mjs`, `to-design-config.mjs`) |
| **File upload (offline)** | the WP plugin | PHP (`class-fw-site-converter-stitch.php`, `…-mapper.php`, `…-theme-generator.php`) |

The capture service's extraction is the more complete reference (it has a live DOM + computed
styles). **When the capture service is running, file uploads are routed through it too** (see below),
so they get the same high‑fidelity result; the PHP parser is the offline fallback.

## File uploads use the URL engine

A Google Stitch export is just self‑contained HTML (it pulls Tailwind + fonts from a CDN). So when
the capture service is up, a **file upload is rendered in the same Chrome** and run through the same
extractor as a URL:

```
Stitch .zip ──► POST /capture-file ──► unzip → open code.html in Chrome ──► same extractor ──► bundle.zip
```

That yields the full‑fidelity result (real computed CSS, dynamic header/footer, real colors/fonts)
instead of the weaker static parse. When the service is **off**, the upload falls back to the
offline PHP parser — so "works offline" still holds, just at lower fidelity. Details in
**[Convert from a file](./convert-from-file.md)**.

## Where AI fits (optional)

AI assist is **off by default**, and its role is deliberately narrow: **make the deterministic engine
smarter, never compete with it**. When on, the draft mapping is sent to the capture service's
`/ai-convert`, where **Claude** returns **only a corrected mapping** — fixing mis‑detected element
roles, marking decorative blocks to skip, and flagging custom widgets to keep verbatim. It does **not**
author any CSS or chrome (the engine does that). An earlier design that had the AI write a whole
stylesheet made the two engines *conflict* — both producing CSS, the AI's overriding the faithful one —
so it was scoped back to **mapping‑only**.

Crucially, every AI correction also **teaches the offline engine**: the diff between the AI's mapping
and the deterministic draft is distilled into **local learned rules** (`distill_from_ai()`), so the
**no‑AI path gets better over time** — which is the whole point of adding AI. This learning is entirely
on your machine: there is **no central data collection** (we deliberately rejected harvesting user
pages — they can hold real, private content — over privacy and legal concerns). Improvements reach
everyone only through the maintainer's reviewed, committed releases. See **[AI assist](./ai-assist.md)**.
