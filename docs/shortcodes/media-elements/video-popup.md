---
title: Video Popup
sidebar_position: 53
---

# Video Popup

A poster image with a play button that opens a YouTube, Vimeo or self-hosted video in a lightbox. Its options are organized across the **Content**, **Design**, **Styling**, **Animations** and **Advanced** tabs.

<img src="/img/shortcodes/video-popup-backend.png" alt="Video Popup on the Page Builder canvas" width="936" />

:::tip[💡 Web dev tip: never autoplay video with sound]
A video that starts playing with audio the moment a page loads is one of the most disruptive things a website can do to a visitor — it's why every major browser now blocks autoplaying sound outright. A poster image with an explicit play button, like this element uses, keeps the visitor in control of when audio starts, and loading the video itself only on click also keeps the page's initial load light. [MDN: Autoplay guide for media and Web Audio APIs](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
:::

## Content

<img src="/img/shortcodes/video-popup-content.png" alt="Video Popup options panel — Content tab" width="1200" />

- **Poster Image** — the image shown before the video plays.
- **Video URL** — a YouTube or Vimeo page URL, or a direct `.mp4` / `.webm` file (e.g. `https://youtu.be/XXXX`, `https://vimeo.com/123456`, `https://site.com/clip.mp4`).
- **Play Label** — optional text shown beside the play button (e.g. "Watch the film").
- **Caption / Accessible Label** — used as the button's screen-reader label. Defaults to "Play video".

## Design

<img src="/img/shortcodes/video-popup-design.png" alt="Video Popup options panel — Design tab" width="1200" />

- **Play Button Style** — an image-picker of play-button presets; defaults to **Classic**.
- **Poster Ratio** — crop ratio for the poster: Original (uncropped), Widescreen 16:9 (default), Landscape 4:3, Square 1:1, or Cinematic 21:9.
- **Play Button Size** — Small, Medium (default), or Large.
- **Corner Radius** — Square, Rounded (default), or Large.
- **Darken Poster** — overlays a dark tint on the poster. Defaults to Yes.
- **Zoom Poster on Hover** — scales the poster up on hover. Defaults to Yes.

## Styling

<img src="/img/shortcodes/video-popup-styling.png" alt="Video Popup options panel — Styling tab" width="1200" />

- **Play Button Color** — background color of the play button.
- **Play Icon Color** — color of the play icon.
- **Overlay Color** — color of the darkening overlay.
- **Label Color** — color of the play label text.
- **Font Size** — text size preset for the label.
- **Margin & Padding** — spacing around the element.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
