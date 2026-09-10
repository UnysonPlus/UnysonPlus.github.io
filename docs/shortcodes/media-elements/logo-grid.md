---
title: Logo Grid
sidebar_position: 54
---

# Logo Grid

A grid, boxed grid, carousel or marquee of client / partner logos, with an optional grayscale-to-color hover. Its options are organized across the **Content**, **Design**, **Styling**, **Animations** and **Advanced** tabs.

:::tip[💡 Web dev tip: a logo's alt text is the brand's name, nothing more]
A logo image is meaningful, not decorative, so it still needs alt text — but the right value is just the company or product name ("Acme Inc"), not a visual description like "blue swirly circle icon". UnysonPlus asks for exactly that with its Name (alt text) field on every logo entry. [W3C WAI: An alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
:::

## Live demo

**▶ [See the Logo Grid live on the demos site](https://demos.unysonplus.com/shortcodes/logo-grid/)** — an interactive example you can click through.

## Content

<img src="/img/shortcodes/logo-grid-content.png" alt="Logo Grid options panel — Content tab" width="1200" />

- **Logos** — a repeatable list of logos. Each entry opens an "Add / Edit Logo" popup with:
  - **Logo Image** — the logo to display.
  - **Name (alt text)** — alt text for the image.
  - **Link URL** — optional URL the logo links to.
  - **Open in New Tab** — open the link in a new tab (`_blank`, default Yes) or the same tab (`_self`).

## Design

<img src="/img/shortcodes/logo-grid-design.png" alt="Logo Grid options panel — Design tab" width="1200" />

- **Layout** — an image-picker of layouts (grid, boxed grid, carousel, marquee); defaults to **Grid**.
- **Columns / Per View** — columns in a grid, or visible logos in a carousel/marquee: 2, 3, 4 (default), 5, or 6.
- **Gap** — spacing between logos; defaults to `4`.
- **Logo Height (px)** — slider from 24 to 120 px (step 2); defaults to 48.
- **Grayscale → Color on Hover** — show logos in grayscale, revealing color on hover. Defaults to Yes.
- **Carousel Autoplay** — auto-advance the carousel. Defaults to Yes.
- **Marquee / Autoplay Speed** — Slow, Normal (default), or Fast.
- **Marquee Direction** — Right → Left (default) or Left → Right.

## Styling

<img src="/img/shortcodes/logo-grid-styling.png" alt="Logo Grid options panel — Styling tab" width="1200" />

- **Box Background (Boxed)** — background color of each box in the boxed layout.
- **Font Size** — text size preset.
- **Margin & Padding** — spacing around the element.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
