---
title: Carousel
sidebar_position: 21
sidebar_custom_props: { icon: '/img/shortcode-icons/carousel.svg' }
---

# Carousel

A flexible, touch-friendly carousel/slider. Each slide can carry an image, heading, text and
button. Supports multiple slides per view, autoplay, loop, arrows and dots (built on Splide).
Tabs: **Slides**, **Layout**, **Behavior**, **Style**, **Animations**, **Advanced**.

:::tip[💡 Web dev tip: use carousels sparingly]
Studies repeatedly find most visitors only ever see the first slide, so don't bury anything important on slide three. If it auto-plays, give people a visible pause control and don't advance too fast — and make sure the arrows and dots work with a keyboard. [W3C: carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
:::

## Live demo

**▶ [See the Carousel / Slider live on the demos site](https://demos.unysonplus.com/shortcodes/carousel/)** — an interactive example you can click through.

## Slides

<img src="/img/shortcodes/carousel-slides.png" alt="Carousel / Slider options panel — Slides tab" width="1200" />

- **Slides** — a repeatable list; each slide has an **Image**, **Heading**, **Text** and a
  **Button** (label + link).

## Layout

<img src="/img/shortcodes/carousel-layout.png" alt="Carousel / Slider options panel — Layout tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Per Page (Desktop)** | 1–6 slides per view |
| **Per Page (Tablet)** | 1–6 slides per view (≤992px) |
| **Per Page (Mobile)** | 1–6 slides per view (≤576px) |
| **Gap Between Slides** | CSS length (e.g. `1rem`) |
| **Use as Section Background** | On/Off — fill the parent Section behind its content (see below) |
| **Slide Height** | Fixed height (e.g. `600px`, `80vh`) or empty to fit content |
| **Arrows** | On/Off |
| **Dots** | On/Off |

## Behavior

<img src="/img/shortcodes/carousel-behavior.png" alt="Carousel / Slider options panel — Behavior tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Autoplay** | On/Off |
| **Autoplay Interval (ms)** | Default `5000` |
| **Transition Speed (ms)** | Default `600` |
| **Pause on Hover** | On/Off |
| **Loop** | On/Off |
| **Drag / Swipe** | On/Off |
| **Transition** | Slide, Fade (with Fade, Loop goes back to the first slide) |
| **Slow Zoom** | On/Off — background images drift slowly closer while their slide shows |

## Use as a section background

Turn on **Layout → Use as Section Background** and the carousel fills the whole Section it sits in,
**behind** that Section's own heading, text and buttons, which are lifted on top automatically. It
is the way to make a hero with a calm, changing photo backdrop:

1. Add a **Section** and give it a **min-height** (for example 90vh), so it has room to fill.
2. Put your heading, text and buttons in it as usual.
3. Add a **Carousel** to the same Section with your photos as slides. Leave each slide's own
   heading, text and button empty (the Section's content is what shows on top).
4. Turn on **Use as Section Background**, set **Transition** to **Fade**, turn on **Autoplay**
   and **Loop**, and, for a gentle drift, **Slow Zoom**. Use the **Dark Overlay** if the photos
   make the text hard to read.

In background mode the slides cover the Section one at a time and play on their own: Slides per
View, Gap, Slide Height, Arrows, Dots, Drag and Pause on Hover are ignored. The first photo loads
right away with high priority (it is usually the largest image on the page); each of the others
loads just before it is shown, and every photo comes in the size the screen needs (a phone gets a
small version, not the original upload). Pick photos from the Media Library so those sizes exist,
and don't also set the same photo as the Section's background image: it would load twice.

:::tip[Lighter than a background video]
A background "video" that only fades between a few photos costs several megabytes. The same photos
as a background carousel weigh a fraction of that, look sharper, and you can swap them in the
editor at any time. Keep a real video for real motion.
:::

**Limits:** the background takes no clicks or swipes (the Section's content stays clickable). The
slow zoom is switched off for visitors whose system asks for reduced motion.

## Style

<img src="/img/shortcodes/carousel-style.png" alt="Carousel / Slider options panel — Style tab" width="1200" />

**Dark Overlay** (On/Off) and **Overlay Strength** (0–90%) for legibility over images, plus
**Heading Color** and **Text Color**.
