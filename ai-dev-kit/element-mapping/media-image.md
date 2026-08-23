---
title: Media Image — converter mapping
sidebar_label: Media Image
slug: /element-mapping/media-image
description: How the UnysonPlus Site Converter maps a source image into the Media Image (`media_image`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Media Image — converter mapping

Source `image` → [`media_image`](/docs/shortcodes/media-elements/media-image). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 60 |
| **Recognizer** | `image` |
| **Matches when** | A content `<img>` (not a background image, an icon, or part of a decomposed composite). |
| **Becomes** | [`media_image`](/docs/shortcodes/media-elements/media-image) |
| **Recognizer block shape** | `{ html, skinCss }` |
| **Fallback** | Degrades to `code_block`. |

The image itself maps natively. When the source image has an organic radius / white border / shadow (or a blob backdrop), those ride a scoped `custom_css` (`skinCss`) so the look is reproduced without a matched Image Style preset.

## Option coverage

**1/15 options mapped natively** (7%) — 🟡 1 via CSS · ⚪ 13 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `image` | Content | `upload` | ✅ Native | The source image (side-loaded to the Media Library) |
| `link` | Content | `text` | ⚪ Unmapped | Default — a wrapping link is not carried here |
| `target` | Content | `select` | ⚪ Unmapped | Default |
| `image_style` | Styling | `image-style-picker` | ⚪ Unmapped | Not matched to an Image Style preset |
| `width` | Styling | `unit-input` | ⚪ Unmapped | Default |
| `height` | Styling | `unit-input` | ⚪ Unmapped | Default |
| `size` | Styling | `select` | ⚪ Unmapped | Default |
| `bg_color` | Styling | `color` | ⚪ Unmapped | Default |
| `loading` | Advanced | `select` | ⚪ Unmapped | Default |
| `fetchpriority` | Advanced | `select` | ⚪ Unmapped | Default |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `custom_css` | Advanced | `textarea` | 🟡 Via CSS | Carries the image skin (`skinCss`) — organic radius / border / shadow / blob backdrop |
| `animation` | Animations | `group` | ⚪ Unmapped | Default off |
| `css_class` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `css_id` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `unique_id` | Advanced | `hidden` | ⚙️ Auto | Generated |
| `responsive_hide` | Advanced | `group` | ⚙️ Auto | Not set |
| `custom_attrs` | Advanced | `group` | ⚙️ Auto | Not set |

### Status legend

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚪ **Unmapped** — Left at default — no source signal, or a decorative choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
