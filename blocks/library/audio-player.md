---
title: Audio Player
description: The Unyson+ Audio Player block — a styled multi-track audio player with artwork, playlist and volume controls, authored in the block editor and rendered by the audio-player element.
---

# Audio Player

A **styled audio player** — one track or a whole playlist, each with a title, artist and optional cover art, plus volume and download controls. A tidy alternative to the bare browser `<audio>` element for podcasts, mixes or samples. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Audio Player element](/shortcodes/media-elements/audio-player) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/audio-player/front.png" alt="The Audio Player block — a player with a track list" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Tracks (`tracks`) | The playlist. Each track has an **audio file/URL**, a **title**, an **artist** and optional **cover art**. |
| Design (`design`, `rounded`, `height`) | The player layout and shape. |
| Controls (`show_volume`, `show_download`, `autoplay`, `loop`) | Which controls to show and how it plays. |
| Colours (`accent_color`, `bg_color`, `text_color`) + Font size (`font_size_preset`) | The player palette and type scale. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is a two-track playlist:

```html
<!-- wp:unysonplus/audio-player {"upOptions":{"tracks":[
  {"title":"Opening Theme","artist":"UnysonPlus","audio_url":"https://…/song-1.mp3"},
  {"title":"Second Track","artist":"UnysonPlus","audio_url":"https://…/song-2.mp3"}
]}} /-->
```

## The audio-player element

The block and the page builder's [Audio Player element](/shortcodes/media-elements/audio-player) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
