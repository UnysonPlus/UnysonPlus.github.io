---
title: Gallery — converter mapping
sidebar_label: Gallery
slug: /element-mapping/gallery
description: How the UnysonPlus Site Converter maps a source gallery into the Gallery (`gallery`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Gallery — converter mapping

Source `gallery` → [`gallery`](/docs/shortcodes/media-elements/gallery). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 64 |
| **Recognizer** | `gallery` |
| **Matches when** | An image gallery / grid — three or more images in a repeating grid or collage (fewer than three falls back to code). |
| **Becomes** | [`gallery`](/docs/shortcodes/media-elements/gallery) |
| **Recognizer block shape** | `{ images:[{ url, span }] }` |
| **Fallback** | Degrades to `code_block` (fewer than 3 images). |

The images are mapped as the gallery’s media source (side-loaded), and each image’s column span becomes a width ratio so an uneven collage keeps its proportions. The gallery design (masonry / carousel / justified …), captions and colours use defaults.

## Option coverage

**1/15 options mapped natively** (7%) — 🟡 0 via CSS · ⚪ 14 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `source` | Content | `multi-picker` | ✅ Native | Set to Media, holding the side-loaded images + per-image width ratio |
| `design` | Design | `image-picker` | ⚪ Unmapped | Default layout (masonry / grid / carousel…) |
| `grid` | Layout | `group` | ⚪ Unmapped | Default |
| `captions` | Content | `switch` | ⚪ Unmapped | Default off |
| `caption_source` | Content | `select` | ⚪ Unmapped | Default |
| `hover_zoom` | Design | `switch` | ⚪ Unmapped | Default |
| `ken_burns` | Design | `switch` | ⚪ Unmapped | Default |
| `bg_color` | Styling | `color` | ⚪ Unmapped | Default |
| `caption_color` | Styling | `color` | ⚪ Unmapped | Default |
| `font_size_preset` | Styling | `font-size` | ⚪ Unmapped | Default |
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
