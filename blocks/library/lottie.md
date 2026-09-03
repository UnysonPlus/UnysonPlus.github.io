---
title: Lottie
description: The Unyson+ Lottie block — a lightweight, scalable Lottie/Bodymovin animation with scroll and hover triggers, authored in the block editor and rendered by the lottie element.
---

# Lottie

A **Lottie animation** — the small, razor-sharp vector animations exported from After Effects (Bodymovin) — that plays on load, on scroll into view or on hover. Far lighter and crisper than an animated GIF, and it scales to any size without blurring. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Lottie element](/shortcodes/media-elements/lottie) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/lottie/front.png" alt="The Lottie block — a scalable vector animation" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Source (`source`, `lottie_url`, `lottie_file`) | Load the animation from a **URL** or an uploaded **`.json`/`.lottie` file**. |
| Playback (`autoplay`, `loop`, `speed`, `direction`) | Auto-play, loop, playback speed and forward/reverse. |
| Trigger (`trigger`, `hover`, `viewport`) | What starts it — on load, on scroll into view, or on hover. |
| Layout (`alignment`, `max_width`) | Position and size within the column. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above points at a hosted `.json`:

```html
<!-- wp:unysonplus/lottie {"upOptions":{"source":"url","lottie_url":"https://…/animation.json","loop":"yes","autoplay":"yes"}} /-->
```

## The lottie element

The block and the page builder's [Lottie element](/shortcodes/media-elements/lottie) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
