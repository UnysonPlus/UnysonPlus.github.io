---
sidebar_position: 3
title: Layout Elements
---

# Layout Elements

The structural elements that hold your content.

## The modern layout primitive

The Page Builder now leads with **one** layout element — the **Div** — so most new layouts use this
rather than the Classic containers below:

- **[The Div (Flex · Grid · Block)](/page-builder/the-div-element)** — one container you set to
  **Flex**, **Grid** or **Block** that outputs a semantic HTML tag. It appears in the palette's
  **Layout Elements** tab as three tiles — **Section** (a full-width `<section>` band),
  **Flexbox (div)** (a row or stack), and **Grid (div)** (a CSS-grid column layout) — with a
  responsive **[Width](/page-builder/the-div-element#width)** control and clean, semantic output.

## Classic containers

The original **Bootstrap-grid** containers. They're **still fully supported** — every existing page
keeps working — but they're now grouped under the palette's **Classic** tab (which sorts last), and
new pages are better built on the Div above. In the classic model, sections wrap rows, rows hold
columns, and columns hold content elements.

- **[Section](/shortcodes/layout-elements/section)** — a full-width-capable band; the
  top-level container for a row of content, with background color/image/video, bleed layout,
  spacing and gap controls.
- **[Bleed Section](/shortcodes/layout-elements/bleed-section)** — a split section with
  content on one side and a full-bleed image on the other; stacks on mobile.
- **[Masonry Section](/shortcodes/layout-elements/masonry-section)** — packs its columns
  into a masonry grid, with per-breakpoint column counts. (No Div equivalent yet — this stays the
  way to build masonry.)
- **[Container](/shortcodes/layout-elements/container)** — a second content container you
  can add inside a section: **Boxed** (site width) or **Full-width** (edge-to-edge).
- **[Column](/shortcodes/layout-elements/column)** — a responsive column with
  fine-grained per-breakpoint width, offset and alignment.

**Hero Section** is a parallax-background preset of Section, ideal for page headers. **Row** is
the horizontal container that holds columns inside a section — it is added automatically as you
build.

> Most elements also expose **Background Color** and **Margin & Padding**.
