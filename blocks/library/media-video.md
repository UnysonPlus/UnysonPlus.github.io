---
title: Media Video
description: The Unyson+ Media Video block — a YouTube/Vimeo or self-hosted video with a lazy-loaded poster facade, authored in the block editor and rendered by the media-video element.
---

# Media Video

A **video player** — embed a YouTube or Vimeo URL, or a self-hosted MP4/WebM — with a lightweight **poster facade** that loads the heavy player only when the visitor clicks. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Media Video element](/shortcodes/media-elements/media-video) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/media-video/front.png" alt="The Media Video block — a poster image with a play button over an embedded video" width="640" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Source (`source_type`) | **Embed** a YouTube/Vimeo URL, or use a **self-hosted** MP4/WebM file. |
| Poster (`poster`) | The still image shown before play — describe its subject for accessibility. |
| Ratio (`ratio`) + Object fit (`object_fit`) | The aspect ratio and how the video fills its frame. |
| Playback (`autoplay`, `loop`, `muted`, `controls`, `playsinline`) | Standard playback behaviour. |
| Performance (`lazy_facade`, `preload`, `youtube_nocookie`) | Load the player only on click, and use YouTube's privacy-friendly domain. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::tip[💡 Web dev tip: don't autoplay video with sound]
Autoplaying audio surprises people, drains data and hurts accessibility — most browsers block it anyway. If you must autoplay, keep it **muted** and give a visible control to unmute. A lazy-loaded poster (like this block's facade) also keeps a heavy embed from slowing your page's initial load. [web.dev: autoplay policy](https://developer.chrome.com/blog/autoplay/) · [Web Dev Basics: Performance](/learn/performance)
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above embeds a YouTube video with a poster:

```html
<!-- wp:unysonplus/media-video {"upOptions":{"source_type":{"source":"embed","embed":{"url":"https://www.youtube.com/watch?v=…"}},"poster":{...},"ratio":"16-9"}} /-->
```

## The media-video element

The block and the page builder's [Media Video element](/shortcodes/media-elements/media-video) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
