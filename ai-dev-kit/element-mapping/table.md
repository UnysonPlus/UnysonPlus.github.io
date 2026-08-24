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

**2/23 options mapped natively** (9%) — 🟡 0 via CSS · ⚠️ 8 gaps (derivable, not yet) · ⚪ 13 default · ⚙️ 3 auto.

:::tip[8 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `content` | Content | `table` | ✅ Native | The captured `<table>` cells, row by row |
| `header_options` | Content | `group` | ✅ Native | Leading all-`<th>` rows detected as the header |
| `caption` | Content | `text` | ⚠️ Gap | text of the <caption> element |
| `caption_position` | Content | `select` | ⚠️ Gap | computed caption-side (top/bottom) of the caption |
| `frame_preset` | Style | `table-style-picker` | ⚪ Unmapped | Default — not matched to a Table preset |
| `style_striped` | Style | `switch` | ⚠️ Gap | alternating row background-color across tbody rows |
| `style_bordered` | Style | `switch` | ⚠️ Gap | presence of border on cells (computed border-width > 0) |
| `style_hover` | Style | `switch` | ⚪ Unmapped | Default |
| `style_condensed` | Style | `switch` | ⚪ Unmapped | Default |
| `sticky_header` | Style | `switch` | ⚠️ Gap | computed position:sticky on the header row/cells |
| `bg_color` | Style | `color` | ⚠️ Gap | computed background-color of the table/cells |
| `text_color` | Style | `color` | ⚠️ Gap | computed color of the cell text |
| `font_size_preset` | Style | `font-size` | ⚠️ Gap | computed font-size of cell text |
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
- ⚠️ **Gap** — A source signal exists, but the converter does not derive this yet — a mapping worth adding (a real TODO, not a limitation).
- ⚪ **Unmapped** — Left at default — no reliable source signal, or an intentional/UnysonPlus-specific choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
