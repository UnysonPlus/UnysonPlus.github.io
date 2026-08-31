---
title: Image Box — converter mapping
sidebar_label: Image Box
slug: /element-mapping/image-box
description: How the UnysonPlus Site Converter maps a source image_box into the Image Box (`image_box`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Image Box — converter mapping

Source `image_box` → [`image_box`](/shortcodes/media-elements/image-box). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 58 |
| **Recognizer** | `image_box` |
| **Matches when** | An image paired with a title + text (a media card / feature block — image beside or above a heading and copy). |
| **Becomes** | [`image_box`](/shortcodes/media-elements/image-box) |
| **Recognizer block shape** | `{ img:{ src, alt, cls }, card:{ title, titleTag, text, link } }` |
| **Fallback** | Degrades to `code_block`. |

The image (with its alt), the title + heading tag, and the body text map natively. Skin (frame, overlay, hover, colours, image side/ratio) is left at defaults.

## Option coverage

**11/32 options mapped natively** (34%) — 🟡 0 via CSS · ⚠️ 5 gaps (derivable, not yet) · ⚪ 16 default · ⚙️ 1 auto.

:::tip[5 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `image` | Content | `upload` | ✅ Native | derived-from source card image src (sideloaded upload value) |
| `image_alt` | Content | `text` | ✅ Native | derived-from source img alt attribute |
| `subtitle` | Content | `text` | ⚪ Unmapped | not set; no subtitle captured |
| `title` | Content | `text` | ✅ Native | derived-from card title (stripped tags) |
| `title_tag` | Content | `select` | ✅ Native | derived-from card titleTag (validated h2-h6) |
| `text` | Content | `wp-editor` | ✅ Native | derived-from card text/body HTML |
| `icon` | Content | `icon` | ⚪ Unmapped | not set; image_box path has no icon |
| `custom_icon` | Content | `hidden` | ⚪ Unmapped | not set |
| `button_style` | Content | `select` | ✅ Native | derived-from detected CTA (arrow glyph → 'arrow', else 'link') |
| `button_label` | Content | `text` | ✅ Native | derived-from CTA/link label |
| `sc_design_panel` | Presets | `html-full` | ⚪ Unmapped | display-only html panel; not a stored value |
| `design_settings` | Design | `multi-picker` | ⚪ Unmapped | hardcoded family 'stacked' (img-title-text); overlay/side not auto-detected |
| `image_ratio` | Design | `select` | ✅ Native | derived-from source frame aspect (aspect-square/video/[x/y]/img aspect) → ratio slug |
| `content_align` | Design | `image-picker` | ⚪ Unmapped | not set |
| `image_size` | Design | `short-select` | ⚪ Unmapped | not set |
| `hover_effect` | Effects & Link | `select` | ⚪ Unmapped | not set; UnysonPlus-specific |
| `transition_speed` | Effects & Link | `select` | ⚪ Unmapped | not set |
| `link_behavior` | Effects & Link | `select` | ✅ Native | derived-from card/CTA href → 'url' when a real link exists |
| `link_url` | Effects & Link | `text` | ✅ Native | derived-from CTA/card href |
| `link_target` | Effects & Link | `switch` | ✅ Native | set '_self' when a link is present (source target not read → effectively default target) |
| `box_style` | Styling | `border-style-picker` | ⚠️ Gap | signal: computed border / box-shadow on card wrapper maps to boxp-outline/soft-shadow |
| `image_style` | Styling | `image-style-picker` | ⚠️ Gap | signal: computed border-radius (rounded/circle) and grayscale filter (monochrome) on image |
| `bg_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | signal: computed background-color of card |
| `font_size_preset` | Styling | `select` | ⚪ Unmapped | not set |
| `title_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | signal: computed color of title element |
| `subtitle_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | no subtitle captured |
| `content_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | signal: computed color of body text |
| `icon_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | no icon in image_box path |
| `icon_badge_preset` | Styling | `border-style-picker` | ⚪ Unmapped | not set; no icon |
| `accent_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set |
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
