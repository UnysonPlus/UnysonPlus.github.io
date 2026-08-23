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

**2/23 options mapped natively** (9%) — 🟡 0 via CSS · ⚪ 21 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `content` | Content | `table` | ✅ Native | The captured `<table>` cells, row by row |
| `header_options` | Content | `group` | ✅ Native | Leading all-`<th>` rows detected as the header |
| `caption` | Content | `text` | ⚪ Unmapped | Default |
| `caption_position` | Content | `select` | ⚪ Unmapped | Default |
| `frame_preset` | Style | `table-style-picker` | ⚪ Unmapped | Default — not matched to a Table preset |
| `style_striped` | Style | `switch` | ⚪ Unmapped | Default |
| `style_bordered` | Style | `switch` | ⚪ Unmapped | Default |
| `style_hover` | Style | `switch` | ⚪ Unmapped | Default |
| `style_condensed` | Style | `switch` | ⚪ Unmapped | Default |
| `sticky_header` | Style | `switch` | ⚪ Unmapped | Default |
| `bg_color` | Style | `color` | ⚪ Unmapped | Default |
| `text_color` | Style | `color` | ⚪ Unmapped | Default |
| `font_size_preset` | Style | `font-size` | ⚪ Unmapped | Default |
| `enable_search` | Features | `switch` | ⚪ Unmapped | Default off |
| `enable_sort` | Features | `switch` | ⚪ Unmapped | Default off |
| `enable_pagination` | Features | `switch` | ⚪ Unmapped | Default off |
| `pagination_length` | Features | `number` | ⚪ Unmapped | Default |
| `enable_length_change` | Features | `switch` | ⚪ Unmapped | Default off |
| `enable_info` | Features | `switch` | ⚪ Unmapped | Default off |
| `spacing` | Style | `spacing` | ⚪ Unmapped | Default |
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
