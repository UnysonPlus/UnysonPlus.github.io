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

**2/15 options mapped natively** (13%) — 🟡 0 via CSS · ⚠️ 5 gaps (derivable, not yet) · ⚪ 8 default · ⚙️ 1 auto.

:::tip[5 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `source` | Content | `multi-picker` | ✅ Native | derived-from captured images → source.kind=media, source.media.images[] |
| `design_settings` | Design | `multi-picker` | ✅ Native | derived-from detect_gallery_design (marquee/carousel/masonry/metro columns/grid col-ratio) |
| `container_type` | Style | `select` | ⚪ Unmapped | not set |
| `click` | Style | `multi-picker` | ⚪ Unmapped | click_action hardcoded 'lightbox'; not derived |
| `captions` | Style | `select` | ⚠️ Gap | signal: presence of figcaption/caption elements in source gallery |
| `caption_source` | Style | `select` | ⚪ Unmapped | not set; UnysonPlus-specific source selector |
| `hover_zoom` | Style | `switch` | ⚪ Unmapped | hardcoded 'yes'; not derived |
| `box_style` | Style | `border-style-picker` | ⚠️ Gap | signal: computed border / box-shadow on tiles |
| `image_style` | Style | `image-style-picker` | ⚠️ Gap | signal: computed border-radius / filter on images (converter only forces flat 'rounded') |
| `text_color` | Style | `predefined-colors-color-picker-compact` | ⚠️ Gap | signal: computed text color |
| `bg_color` | Style | `predefined-colors-color-picker-compact` | ⚠️ Gap | signal: computed background-color of gallery container |
| `font_size_preset` | Style | `select` | ⚪ Unmapped | not set |
| `caption_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | no caption text reliably captured |
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
