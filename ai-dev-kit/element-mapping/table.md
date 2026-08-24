---
title: Table — converter mapping
sidebar_label: Table
slug: /element-mapping/table
description: How the UnysonPlus Site Converter maps a source table into the Table (`table`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Table — converter mapping

Source `table` → [`table`](/docs/shortcodes/content-elements/table). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 20 |
| **Recognizer** | `table` |
| **Matches when** | A `<table>` with at least one row and column. |
| **Becomes** | [`table`](/docs/shortcodes/content-elements/table) |
| **Recognizer block shape** | `{ rows:[[{ html, header }, …], …] }` |
| **Fallback** | Degrades to `code_block`. |

The full cell grid is rebuilt natively — columns are counted, leading all-`<th>` rows are detected as the header, and each cell’s HTML is preserved. Table styling (stripes, borders, frame preset, colours) and the interactive features (search, sort, pagination) are left at defaults.

## Option coverage

**3/21 options mapped natively** (14%) — 🟡 0 via CSS · ⚠️ 5 gaps (derivable, not yet) · ⚪ 13 default · ⚙️ 1 auto.

:::tip[5 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `table` | Content | `table` | ✅ Native | built from captured rows/cols/content + thead header_rows |
| `table_preset` | Table Options | `table-style-picker` | ✅ Native | derived via table_preset_for from captured header fill / striped styling |
| `frame_preset` | Table Options | `border-style-picker` | ⚪ Unmapped | not set by mapper |
| `style_striped` | Table Options | `switch` | ⚠️ Gap | alternating row background detectable (captured in style.striped) but the switch option itself not set |
| `style_hover` | Table Options | `switch` | ⚪ Unmapped | row hover state not captured from static DOM |
| `style_bordered` | Table Options | `switch` | ⚠️ Gap | cell border computed style detectable; option not set |
| `style_condensed` | Table Options | `switch` | ⚪ Unmapped | cell padding varies; not reliably mapped, not set |
| `sticky_header` | Table Options | `switch` | ⚪ Unmapped | scroll behavior; not derived |
| `caption` | Table Options | `text` | ✅ Native | set from captured b.caption text |
| `caption_position` | Table Options | `select` | ⚠️ Gap | caption-side / DOM order of <caption> detectable; not set |
| `enable_sort` | Table Options | `switch` | ⚪ Unmapped | interactive behavior not present in static DOM |
| `enable_search` | Table Options | `switch` | ⚪ Unmapped | interactive behavior; not derived |
| `enable_pagination` | Table Options | `switch` | ⚪ Unmapped | interactive behavior; not derived |
| `pagination_length` | Table Options | `text` | ⚪ Unmapped | not derived |
| `enable_length_change` | Table Options | `switch` | ⚪ Unmapped | not derived |
| `enable_info` | Table Options | `switch` | ⚪ Unmapped | not derived |
| `text_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | cell text computed color detectable; option not set (styling goes to table_preset) |
| `bg_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | table background computed color detectable; option not set |
| `font_size_preset` | Styling | `select` | ⚪ Unmapped | not set by mapper |
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
