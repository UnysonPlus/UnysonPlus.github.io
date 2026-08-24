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

**1/6 options mapped natively** (17%) — 🟡 0 via CSS · ⚠️ 1 gap (derivable, not yet) · ⚪ 4 default · ⚙️ 1 auto.

:::tip[1 derivable gap]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `source_type` | Content | `multi-picker` | ✅ Native | derived-from captured video/iframe block: mode (self_hosted/embed), src/webm/embedUrl/poster and playback flags autoplay/muted/loop/controls/playsinline |
| `width` | Content | `unit-input` | ⚪ Unmapped | hardcoded {value:600,unit:'px'} |
| `ratio` | Content | `select` | ⚠️ Gap | signal: source <video> intrinsic width/height or iframe aspect-ratio is detectable, but converter hardcodes '16x9' |
| `bg_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | empty_color() |
| `animation · gsap_motion · interaction · text_effect · scroll_* · flip_card · motion_path · confetti · …` | Animations | `multi-picker` | ⚪ Unmapped | Default — Animation Engine effects (no source mapping) |
| `spacing · css_id · css_class · custom_css · element_position · element_overflow · dc_*` | Advanced | `text / code-editor` | ⚪ Unmapped | Default — outer spacing + per-instance advanced fields, set by hand |
| `unique_id · custom_attrs · responsive_hide` | Advanced | `group` | ⚙️ Auto | Plumbing — generated / not set |

### Status legend

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚠️ **Gap** — A source signal exists, but the converter does not derive this yet — a mapping worth adding (a real TODO, not a limitation).
- ⚪ **Unmapped** — Left at default — no reliable source signal, or an intentional/UnysonPlus-specific choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
