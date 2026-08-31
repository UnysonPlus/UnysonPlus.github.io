---
title: Feature List — converter mapping
sidebar_label: Feature List
slug: /element-mapping/feature-list
description: How the UnysonPlus Site Converter maps a source list into the Feature List (`feature_list`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Feature List — converter mapping

Source `list` → [`feature_list`](/shortcodes/components/feature-list). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 45 |
| **Recognizer** | `list` |
| **Matches when** | A `<ul>` or `<ol>` list — bulleted, numbered, or an icon list. |
| **Becomes** | [`feature_list`](/shortcodes/components/feature-list) |
| **Recognizer block shape** | `{ ordered, items:[{ text, icon_svg, icon_cls, icon_cs }] }` |
| **Fallback** | Degrades to `code_block` (an empty list). |

Each `<li>`’s text becomes an item row; an inline `<svg>` on the item becomes its icon, and the icon’s source colour is carried as the item’s marker colour. List-level styling (columns, dividers, zebra, box style) is left at defaults.

## Option coverage

**9/18 options mapped natively** (50%) — 🟡 0 via CSS · ⚠️ 0 gaps (derivable, not yet) · ⚪ 9 default · ⚙️ 1 auto.


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `items` | Content | `addable-popup` | ✅ Native | built from source rows (text + per-item svg icon + marker_color) |
| `design` | Design | `image-picker` | ✅ Native | 'numbered' when ordered list else 'check' |
| `orientation` | Design | `image-picker` | ✅ Native | 'horizontal' when source flex-wrap strip detected |
| `icon_position` | Design | `select` | ⚪ Unmapped | left/top not derived by the mapper |
| `icon_style` | Design | `select` | ⚪ Unmapped | plain/tint/circle/... marker style not derived |
| `columns` | Design | `select` | ✅ Native | from grid-cols-N on list_cls |
| `dividers` | Design | `switch` | ⚪ Unmapped | row dividers not derived |
| `zebra` | Design | `switch` | ⚪ Unmapped | zebra striping not derived |
| `spacing_size` | Design | `select` | ✅ Native | sm/md/lg from list gap px |
| `box_style` | Styling | `border-style-picker` | ⚪ Unmapped | item box preset not derived |
| `icon_badge_preset` | Styling | `border-style-picker` | ⚪ Unmapped | not registered in n_feature_list |
| `marker_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | dominant per-item icon color across rows |
| `marker_size` | Styling | `unit-input` | ✅ Native | from icon width (e.g. w-5=20px) |
| `text_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | from label span computed/class color |
| `sub_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | subtext always empty, so sub color unset |
| `font_size_preset` | Styling | `select` | ✅ Native | text_preset_for(label font-size) else scoped CSS |
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
