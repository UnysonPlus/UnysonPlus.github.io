---
title: Video Popup
description: The Unyson+ Video Popup block — A poster image with a play button that opens a video in a lightbox, authored in the block editor and rendered by the video-popup element.
---

# Video Popup

A poster image with a play button that opens a video in a lightbox. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Video Popup element](/shortcodes/media-elements/video-popup) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/video-popup/front.png" alt="The Video Popup block — a poster image with a play button" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Poster (`poster`, `image`) | The still image shown before play, with an alt-describable subject. |
| Video URL (`video_url`) | A YouTube, Vimeo or self-hosted video URL to open in the lightbox. |
| Play button (`play_label`, `play_size`) | The accessible label and size of the play button. |
| Ratio (`ratio`) + Rounded (`rounded`) | The aspect ratio of the poster and its corner radius. |
| Overlay (`overlay`) + Hover zoom (`hover_zoom`) | A scrim over the poster, and a subtle zoom on hover. |
| Caption (`caption`) | An optional caption beneath the video. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/video-popup {"upOptions":{"image":{...},"video_url":"https://www.youtube.com/watch?v=…"}} /-->
```

The `image`/`poster` value is a media reference (`{"attachment_id":123,"url":"…"}`), so use the block's image picker rather than typing it by hand.

## The video popup element

The block and the page builder's [Video Popup element](/shortcodes/media-elements/video-popup) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
