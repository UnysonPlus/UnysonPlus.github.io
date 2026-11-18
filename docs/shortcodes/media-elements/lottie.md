---
title: Lottie Animation
sidebar_position: 56
---

# Lottie Animation

Play an animated Lottie vector (a `.json` from After Effects / LottieFiles) with autoplay, hover, on-scroll or click triggers, loop, speed and direction. Its options are organized across the **Content**, **Design**, **Styling**, **Animations** and **Advanced** tabs.

<img src="/img/shortcodes/lottie-backend.png" alt="Lottie Animation on the Page Builder canvas" width="936" />

:::tip[💡 Web dev tip: a Lottie file is still a download]
A vector animation avoids the file weight of a video, but a large or complex `.json` can still slow the page and drain battery while it plays continuously — so keep the source lean and prefer a trigger like "play when scrolled into view" over autoplay when the animation sits low on the page. Good sites also cut non-essential motion for visitors who've asked for less of it, something to keep in mind alongside Lottie's own Trigger and Speed controls. [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
:::

## Live demo

**▶ [See the Lottie Animation live on the demos site](https://demos.unysonplus.com/shortcodes/lottie/)** — an interactive example you can click through.

## Content

<img src="/img/shortcodes/lottie-content.png" alt="Lottie Animation options panel — Content tab" width="840" />

- **Source** — where the animation comes from: URL (.json) (default) or Upload / Media Library.
- **Lottie JSON URL** — a direct link to a `.json` animation (e.g. the "Lottie JSON" export from LottieFiles). Must be a `.json` Lottie/Bodymovin file, not a `.lottie` or GIF.
- **Lottie JSON File** — upload or pick a `.json` animation from the media library.

## Design

<img src="/img/shortcodes/lottie-design.png" alt="Lottie Animation options panel — Design tab" width="840" />

- **Trigger** — when the animation plays: Autoplay on load (default), Play when scrolled into view, Play on hover, Play / pause on click, or **Controlled by Interactions**: it waits on its first frame, and an [Interactions](/animation-engine/interactions#set-lottie-and-rive-steps) step on any element plays it, plays it backwards, pauses it, or plays part of it (a button that plays a check mark, a card whose icon plays on hover and rewinds on hover-out).
- **Loop** — repeat the animation. Defaults to Yes.
- **Rewind on hover-out** — for the Hover trigger, play forward on enter and rewind on leave. Defaults to No.
- **Speed** — slider from 0.25 to 2.5 (step 0.25); defaults to 1.
- **Direction** — Forward (default) or Reverse.
- **Max Width (px)** — caps the animation width; leave empty for full container width. Defaults to `240`.
- **Alignment** — Left, Center (default), or Right.

## Styling

<img src="/img/shortcodes/lottie-styling.png" alt="Lottie Animation options panel — Styling tab" width="840" />

- **Margin & Padding** — spacing around the element.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.

## Control it from JavaScript

Each Lottie element gets a small control handle once it starts loading, the same idea as the Rive element's
`el.fwRive`. Interactions steps use it, and so can your own scripts:

```js
const lottie = document.querySelector('.my-lottie [data-lottie]').fwLottie;
lottie.play();            // from the start if it has finished
lottie.reverse();         // play backwards
lottie.pause(); lottie.stop();
lottie.goTo(30);          // show frame 30 and stop; goTo(30, true) plays from there
lottie.segment(10, 40);   // play frames 10 → 40
lottie.frame(); lottie.last();   // the current and last frame numbers
lottie.anim;              // the lottie-web animation itself
```

The element fires a bubbling **`fwLottieReady`** event (`detail.api`, `detail.element`) once the file has loaded.
