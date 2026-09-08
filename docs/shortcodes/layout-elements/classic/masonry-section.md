---
slug: /shortcodes/layout-elements/masonry-section
title: Masonry Section
sidebar_position: 61
---

# Masonry Section

A section that packs its columns into a masonry grid — drop in columns at any width and they stack vertically like tetris blocks to fill the gaps, with no fixed column count. Its options live across the **Layout**, **Styling**, **Animations**, and **Advanced** tabs.

:::note[The Classic masonry option]
Masonry Section lives in the **Classic** palette tab, but it's still the way to build a staggered masonry grid — the modern **[Div](/page-builder/the-div-element)** doesn't do masonry packing. The **[Insert Section](/page-builder/insert-section)** picker's **Masonry** tab inserts this element (the one tab that still builds a Classic container).
:::

:::tip[💡 Web dev tip: a masonry grid is a common source of layout shift]
Tiles packing themselves into gaps only works once the browser knows each item's real size, so images without their own width and height tend to jump around and re-pack as they finish loading — a visible, disorienting shift for anyone reading the page as it settles. Giving every column's image a known ratio (or explicit dimensions) up front is what keeps a masonry grid stable, which is worth checking on the images you drop into these columns. [web.dev: Cumulative Layout Shift](https://web.dev/articles/cls)
:::

## Layout

- **How it packs** — an informational note: columns keep their own width (1/2, 1/3, 2/3, 1/4 …) and stack to fill the gaps automatically.
- **Gap** — space between items: *Use Default Gap* (matches the site/standard-section gutter), *Extra Small* (0.5rem), *Small* (1rem), *Medium* (1.5rem), *Large* (2rem), or *Extra Large* (3rem).
- **Full Width** — switch. On, the grid spans the full container-fluid width; off, it's constrained to the site container width.

## Styling

- **Background** — a `background-pro` control with stacking color, gradient, image and video layers (image over gradient over color).
- **Padding Top** — top padding for the section, e.g. `40px` or `3rem`.
- **Padding Bottom** — bottom padding for the section, e.g. `40px` or `3rem`.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
