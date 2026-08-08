---
title: What It Can Build
sidebar_label: What It Can Build
sidebar_position: 4
slug: /what-it-can-build
description: Use the AI Dev Kit to convert or clone a site from a URL or mockup, build demo sites, or create a site from scratch — always as a real, editable UnysonPlus WordPress site.
---

# What It Can Build

Everything the kit produces is a **real, editable UnysonPlus site** — pages in the page builder,
styling in Theme Settings, content in WordPress. Three common jobs:

## Convert or clone an existing site

Give the agent a **URL** (or a downloaded mockup / HTML+CSS bundle) and it reproduces the design as
native UnysonPlus pages — the header, footer, sections, colors, typography, and spacing translated into
the page builder and Theme Settings. This is the kit's headline use case, and the reason the
**capture-first** method exists (see [How It Works](./how-it-works.md)).

Best input, when you can: the **live URL**, so the capture step can also read computed styles. Otherwise
a small **source bundle** works too:

| File | Why |
|---|---|
| `devtools.html` | The rendered DOM (has JS-built content + inline SVGs) — the primary source |
| `view-source.html` | The served markup — catches `<head>`, fonts, meta, embedded data |
| `video.mp4`, images | The real media, side-loaded and used (not hot-linked) |
| `screenshot.png` | The reference image — ground truth for "does it match" |

That same folder, zipped, is a valid upload for the **Site Converter** (*Unyson+ → Convert*).

## Build demo & starter sites

Spin up demo or starter sites on UnysonPlus quickly — a storefront, a landing page, a portfolio — using
the same outside-in process, so the result is consistent and easy to hand off.

## Build from a brief (from scratch)

No source to reproduce? Describe the site and the agent builds it from scratch, still following the
outside-in order (tokens → chrome → sections → motion) and verifying as it goes. This is the one path
that skips the capture step — here the agent legitimately chooses values, then measures the render to
confirm them.

## What it produces

- A **child theme** carrying the site's scoped styling.
- **Theme Settings** design tokens (colors, type, buttons, boxes, spacing).
- **Page-builder pages** made of native shortcodes — editable like any UnysonPlus page.
- A **header and footer** locked to the design.

Ready to try it? Head to **[Quick Start](./quick-start.md)**, or **[Get the Kit](./get-the-kit.md)**.
