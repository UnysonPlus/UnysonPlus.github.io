---
title: Carousel
description: The Unyson+ Carousel block — a full-width image slider with headings, text and buttons per slide, authored in the block editor and rendered by the carousel element.
---

# Carousel

A **slideshow** — full-width image slides, each with an optional heading, line of text and button, with autoplay and transition effects. A hero slider or a rotating feature banner. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Carousel element](/shortcodes/interactive-elements/carousel) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/carousel/front.png" alt="The Carousel block — an image slide with a heading and text" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Slides (`slides`) | The list of slides. Each has an **image**, a **heading**, **text**, and an optional **button** (`button_label`, `button_link`). |
| Height (`height`) + Image mode (`image_mode`) | The slider height, and whether the image fills as a background or sits inline. |
| Effect (`effect`, `speed`) | The transition style and its speed. |
| Autoplay (`interval`) | Advance slides automatically at this interval. |
| Overlay (`overlay_opacity`) | A scrim over the image so text stays readable. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/carousel {"upOptions":{"slides":[
  {"image":{...},"heading":"Fast","text":"Build in minutes."},
  {"image":{...},"heading":"Free","text":"No pro tier — ever."}
]}} /-->
```

Each slide's `image` is a media reference (`{"attachment_id":123,"url":"…"}`), so add slides with the block's picker rather than typing them by hand.

## The carousel element

The block and the page builder's [Carousel element](/shortcodes/interactive-elements/carousel) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
