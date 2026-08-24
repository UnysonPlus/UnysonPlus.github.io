---
title: Feature List — converter mapping
sidebar_label: Feature List
slug: /element-mapping/feature-list
description: How the UnysonPlus Site Converter maps a source list into the Feature List (`feature_list`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Feature List — converter mapping

Source `list` → [`feature_list`](/docs/shortcodes/components/feature-list). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 45 |
| **Recognizer** | `list` |
| **Matches when** | A `<ul>` or `<ol>` list — bulleted, numbered, or an icon list. |
| **Becomes** | [`feature_list`](/docs/shortcodes/components/feature-list) |
| **Recognizer block shape** | `{ ordered, items:[{ text, icon_svg, icon_cls, icon_cs }] }` |
| **Fallback** | Degrades to `code_block` (an empty list). |

Each `<li>`’s text becomes an item row; an inline `<svg>` on the item becomes its icon, and the icon’s source colour is carried as the item’s marker colour. List-level styling (columns, dividers, zebra, box style) is left at defaults.

## Option coverage

**2/16 options mapped natively** (13%) — 🟡 1 via CSS · ⚠️ 0 gaps (derivable, not yet) · ⚪ 13 default · ⚙️ 3 auto.


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `items` | Content | `addable-popup` | ✅ Native | One row per source `<li>` — text + inline-SVG icon + marker colour |
| `icon` | Content | `icon` | ✅ Native | Per item: an inline `<svg>` on the list item |
| `marker_color` | Design | `color` | 🟡 Via CSS | Per item: carried from the source icon’s colour |
| `icon_style` | Design | `select` | ⚪ Unmapped | Default |
| `icon_position` | Design | `select` | ⚪ Unmapped | Default |
| `columns` | Layout | `select` | ⚪ Unmapped | Default (1) |
| `dividers` | Layout | `switch` | ⚪ Unmapped | Default off |
| `zebra` | Layout | `switch` | ⚪ Unmapped | Default off |
| `box_style` | Design | `select` | ⚪ Unmapped | Default |
| `font_size_preset` | Styling | `font-size` | ⚪ Unmapped | Default |
| `text_color` | Styling | `color` | ⚪ Unmapped | Default |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `animation` | Animations | `group` | ⚪ Unmapped | Default off |
| `css_class` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `custom_css` | Advanced | `textarea` | ⚪ Unmapped | Not populated |
| `css_id` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `unique_id` | Advanced | `hidden` | ⚙️ Auto | Generated |
| `responsive_hide` | Advanced | `group` | ⚙️ Auto | Not set |
| `custom_attrs` | Advanced | `group` | ⚙️ Auto | Not set |

### Status legend

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚠️ **Gap** — A source signal exists, but the converter does not derive this yet — a mapping worth adding (a real TODO, not a limitation).
- ⚪ **Unmapped** — Left at default — no reliable source signal, or an intentional/UnysonPlus-specific choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
