---
title: Media Image — converter mapping
sidebar_label: Media Image
slug: /element-mapping/media-image
description: How the UnysonPlus Site Converter maps a source image into the Media Image (`media_image`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Media Image — converter mapping

Source `image` → [`media_image`](/shortcodes/media-elements/media-image). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 60 |
| **Recognizer** | `image` |
| **Matches when** | A content `<img>` (not a background image, an icon, or part of a decomposed composite). |
| **Becomes** | [`media_image`](/shortcodes/media-elements/media-image) |
| **Recognizer block shape** | `{ html, skinCss }` |
| **Fallback** | Degrades to `code_block`. |

The image itself maps natively. When the source image has an organic radius / white border / shadow (or a blob backdrop), those ride a scoped `custom_css` (`skinCss`) so the look is reproduced without a matched Image Style preset.

## Option coverage

**1/10 options mapped natively** (10%) — 🟡 0 via CSS · ⚠️ 0 gaps (derivable, not yet) · ⚪ 9 default · ⚙️ 1 auto.


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `image` | Content | `upload` | ✅ Native | derived-from <img> src/alt; upload_val sideloads to attachment_id/url |
| `width` | Content | `unit-input` | ⚪ Unmapped | mapper always emits empty {value:'',unit:'px'} |
| `height` | Content | `unit-input` | ⚪ Unmapped | mapper always emits empty {value:'',unit:'px'} |
| `fetchpriority` | Content | `select` | ⚪ Unmapped | hardcoded 'auto' |
| `link` | Content | `text` | ⚪ Unmapped | hardcoded '' (a wrapping <a> is not carried into link) |
| `target` | Content | `switch` | ⚪ Unmapped | hardcoded '_self' |
| `image_style` | Styling | `image-style-picker` | ⚪ Unmapped | no image_style att emitted; a skinned <img> (border/shadow/rounded/blob) is instead routed to a verbatim code_block or carried via custom_css, never mapped to this preset picker |
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
