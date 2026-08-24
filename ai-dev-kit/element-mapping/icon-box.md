---
title: Icon Box — converter mapping
sidebar_label: Icon Box
slug: /element-mapping/icon-box
description: How the UnysonPlus Site Converter maps a source floating_card into the Icon Box (`icon_box`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Icon Box — converter mapping

Source `floating_card` → [`icon_box`](/docs/shortcodes/components/icon-box). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 55 |
| **Recognizer** | `floating_card` |
| **Matches when** | A floating badge/card overlaid on a hero image (an icon + title + subtitle chip), or an icon + title + text card. |
| **Becomes** | [`icon_box`](/docs/shortcodes/components/icon-box) |
| **Recognizer block shape** | `{ card:{ title, titleTag, text, imgIcon, link }, posCss }` |
| **Fallback** | Degrades to `code_block`. |

Title, heading tag, text (and any link) map to native options; a source SVG / image icon becomes the icon with its size. For a floating card over an image, its absolute position + skin ride a scoped `custom_css` (`posCss`). Colour / layout options stay at defaults.

## Option coverage

**13/24 options mapped natively** (54%) — 🟡 0 via CSS · ⚠️ 3 gaps (derivable, not yet) · ⚪ 8 default · ⚙️ 1 auto.

:::tip[3 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `icon` | Content | `icon` | ✅ Native | set from card icon/lucide/imgIcon(svg inline)/font icon |
| `custom_icon` | Content | `hidden` | ✅ Native | set from card customIcon |
| `title` | Content | `text` | ✅ Native | set from card title |
| `title_tag` | Content | `select` | ✅ Native | set from card titleTag (h3-h6/span/p) |
| `content` | Content | `wp-editor` | ✅ Native | set from card text + read-more link paragraph |
| `style` | Layout | `image-picker` | ✅ Native | set from card iconLayout (geometric icon position) |
| `icon_align` | Layout | `image-picker` | ✅ Native | set from card center flag (left/center) |
| `title_align` | Layout | `image-picker` | ✅ Native | set from card center flag |
| `content_align` | Layout | `image-picker` | ✅ Native | set from card center flag |
| `mobile_stack` | Layout | `switch` | ⚪ Unmapped | not set by mapper; UnysonPlus responsive default |
| `full_height` | Layout | `switch` | ✅ Native | set unconditionally to true (grid equal-height) |
| `box_link` | Link & SEO | `text` | ⚠️ Gap | whole-card <a> wrapper href detectable in DOM; mapper only maps link into content read-more, not box_link |
| `link_target` | Link & SEO | `switch` | ⚪ Unmapped | box_link unused; not set |
| `link_rel` | Link & SEO | `select` | ⚪ Unmapped | box_link unused; not set |
| `box_style` | Styling | `border-style-picker` | ⚪ Unmapped | not set; card box skin reproduced via column inner-wrapper class + hifi base CSS, not this preset |
| `bg_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; card fill reproduced via hifi base CSS, not preset color |
| `font_size_preset` | Styling | `select` | ⚪ Unmapped | not set by mapper |
| `title_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | title computed color detectable; mapper routes color to hifi base scoped CSS, not this option |
| `content_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | body computed color detectable; not set as this option |
| `icon_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | set from captured iconColor computed style / Tailwind token |
| `icon_size` | Styling | `unit-input` | ✅ Native | set from imgIcon container height for inline-SVG illustrations |
| `icon_badge_preset` | Styling | `border-style-picker` | ✅ Native | registered + set from captured icon-chip skin (shape/size/fill/border/shadow) |
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
