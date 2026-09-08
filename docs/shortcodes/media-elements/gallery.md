---
title: Gallery
sidebar_position: 24
sidebar_custom_props: { icon: '/img/shortcode-icons/gallery.svg' }
---

# Gallery

A flexible image gallery with seven layout designs, a built-in lightbox and captions. Tabs:
**Content**, **Design**, **Style**, **Animations**, **Advanced**.

A *lightbox* is the overlay that opens an image at full size, dimming the page behind it, so visitors can look closely and step through photos without leaving the page.

:::tip[💡 Web dev tip: give images good alt text]
Write descriptive **alt text** for every image that carries meaning — it's what screen-reader users hear, and what shows if the image fails to load. Purely decorative images should use empty alt (`alt=""`) so assistive tech skips them. Also keep source files reasonably sized: the browser lazy-loads off-screen images and picks a fitting size from `srcset`, but it can't rescue a 4000px photo you never needed — a lighter page loads faster and ranks better. [MDN: image alt](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt) · [MDN: responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Responsive_images)
:::

## Content

<img src="/img/shortcodes/gallery-content.png" alt="Gallery options panel — Content tab" width="1200" />

- **Title** — optional heading above the gallery.
- **Images** — the gallery images (multi-upload).

## Design

<img src="/img/shortcodes/gallery-design.png" alt="Gallery options panel — Design tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Design** | Grid · Masonry · Justified · Metro · Carousel · Polaroid · Showcase |

Each design reveals its own options:

- **Grid / Masonry / Polaroid** — Columns (Desktop / Tablet / Mobile, 1–6), Gap (0–60px),
  Image Ratio (Square 1:1, Landscape 4:3, Photo 3:2, Wide 16:9, Portrait 3:4, Original).
- **Justified** — Target Row Height (120–420px), Gap.
- **Metro** — Columns (Desktop), Gap.
- **Carousel** — Slides per View, Image Ratio, Gap, Autoplay (+ Interval, Loop, Pause on
  Hover), Show Arrows, Show Dots.
- **Showcase** — Image Ratio, Thumbnail Position (Below · Left · Right), Gap.

## Style

<img src="/img/shortcodes/gallery-style.png" alt="Gallery options panel — Style tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Container** | None (full width) · Container · Fluid |
| **On Image Click** | Open Lightbox · Open Full Image · Go to Attachment Page · Do Nothing |
| **Captions** | None · Overlay on Hover · Below the Image |
| **Caption Source** | Image Caption · Image Title · Alt Text · Description |
| **Image Style** | Any Image Style preset — crop, corners, mask, filter, scrim (Theme Settings → Components → Image Styles) |
| **Zoom on Hover** | On/Off |

Plus **Text / Background / Title / Caption Color**, a **Font Size Preset**, and **Margin &
Padding**.
