---
title: Media Video — converter mapping
sidebar_label: Media Video
slug: /element-mapping/media-video
description: How the UnysonPlus Site Converter maps a source video into the Media Video (`media_video`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Media Video — converter mapping

Source `video` → [`media_video`](/docs/shortcodes/media-elements/media-video). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 62 |
| **Recognizer** | `video` |
| **Matches when** | A `<video>` or a video embed (YouTube / Vimeo) that isn’t a full-screen section background. |
| **Becomes** | [`media_video`](/docs/shortcodes/media-elements/media-video) |
| **Recognizer block shape** | `{ mode:embed|self_hosted, url, poster, sources }` |
| **Fallback** | Degrades to `code_block`. |

The video source is mapped — an embed URL (YouTube/Vimeo) or the self-hosted file(s) — plus the poster image. Playback options (autoplay, loop, controls, ratio) are left at defaults.

## Option coverage

**5/21 options mapped natively** (24%) — 🟡 0 via CSS · ⚪ 16 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `source` | Content | `multi-picker` | ✅ Native | Detected mode: embed vs self-hosted |
| `url` | Content | `text` | ✅ Native | Embed URL (YouTube / Vimeo) |
| `video_file` | Content | `upload` | ✅ Native | Self-hosted MP4 (when not an embed) |
| `video_webm` | Content | `upload` | ✅ Native | Self-hosted WebM (when present) |
| `poster` | Content | `upload` | ✅ Native | Poster / thumbnail image |
| `ratio` | Styling | `select` | ⚪ Unmapped | Default |
| `object_fit` | Styling | `select` | ⚪ Unmapped | Default |
| `controls` | Behavior | `switch` | ⚪ Unmapped | Default |
| `autoplay` | Behavior | `switch` | ⚪ Unmapped | Default off |
| `loop` | Behavior | `switch` | ⚪ Unmapped | Default off |
| `muted` | Behavior | `switch` | ⚪ Unmapped | Default |
| `playsinline` | Behavior | `switch` | ⚪ Unmapped | Default |
| `preload` | Behavior | `select` | ⚪ Unmapped | Default |
| `youtube_nocookie` | Behavior | `switch` | ⚪ Unmapped | Default off |
| `lazy_facade` | Behavior | `switch` | ⚪ Unmapped | Default off |
| `bg_color` | Styling | `color` | ⚪ Unmapped | Default |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `animation` | Animations | `group` | ⚪ Unmapped | Default off |
| `css_class` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `css_id` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `custom_css` | Advanced | `textarea` | ⚪ Unmapped | Not populated |
| `unique_id` | Advanced | `hidden` | ⚙️ Auto | Generated |
| `responsive_hide` | Advanced | `group` | ⚙️ Auto | Not set |
| `custom_attrs` | Advanced | `group` | ⚙️ Auto | Not set |

### Status legend

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚪ **Unmapped** — Left at default — no source signal, or a decorative choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
