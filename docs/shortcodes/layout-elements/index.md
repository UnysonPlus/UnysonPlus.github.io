---
sidebar_position: 3
title: Layout Elements
---

# Layout Elements

The structural elements that hold your content.

:::note[These are the Classic containers]
Section, Container, Bleed Section and Masonry Section are the **Classic** (Bootstrap-grid) layout
containers — still fully supported, now grouped under the palette's **Classic** tab. For new
layouts, the modern **[Div](/page-builder/the-div-element)** (Flex · Grid · Block) leads the palette
and outputs cleaner, semantic HTML. These pages document the Classic elements.
:::

In the classic model, sections wrap rows, rows hold columns, and columns hold content elements.
Specialized section types add backgrounds and effects.

- **[Section](/shortcodes/layout-elements/section)** — a full-width-capable band; the
  top-level container for a row of content, with background color/image/video, bleed layout,
  spacing and gap controls.
- **[Bleed Section](/shortcodes/layout-elements/bleed-section)** — a split section with
  content on one side and a full-bleed image on the other; stacks on mobile.
- **[Masonry Section](/shortcodes/layout-elements/masonry-section)** — packs its columns
  into a masonry grid, with per-breakpoint column counts.
- **[Container](/shortcodes/layout-elements/container)** — a second content container you
  can add inside a section: **Boxed** (site width) or **Full-width** (edge-to-edge).
- **[Column](/shortcodes/layout-elements/column)** — a responsive column with
  fine-grained per-breakpoint width, offset and alignment.

**Hero Section** is a parallax-background preset of Section, ideal for page headers. **Row** is
the horizontal container that holds columns inside a section — it is added automatically as you
build.

> Most elements also expose **Background Color** and **Margin & Padding**.
