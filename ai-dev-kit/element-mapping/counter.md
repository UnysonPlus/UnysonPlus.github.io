---
title: Counter — converter mapping
sidebar_label: Counter
slug: /element-mapping/counter
description: How the UnysonPlus Site Converter maps a source counter into the Counter (`counter`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Counter — converter mapping

Source `counter` → [`counter`](/docs/shortcodes/interactive-elements/counter). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 50 |
| **Recognizer** | `counter` |
| **Matches when** | A big animated stat — a number (often with a prefix/suffix like $ or %) shown as a "count-up" figure with a small label. |
| **Becomes** | [`counter`](/docs/shortcodes/interactive-elements/counter) |
| **Recognizer block shape** | `{ number, start, prefix, suffix, decimals, align, numberWeight, numberSize, numberColor, prefixSize, suffixSize, … }` |
| **Fallback** | Degrades to `code_block`. |

One of the best-mapped elements: the number, start, prefix, suffix, decimals and alignment map natively, and the number/prefix/suffix typography (weight + size) and colours are carried from the source too. Only the animation timing (duration, easing, separator) is left at defaults.

## Option coverage

**12/19 options mapped natively** (63%) — 🟡 0 via CSS · ⚪ 7 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `number` | Content | `text` | ✅ Native | The target figure |
| `start` | Content | `text` | ✅ Native | Count-up start value |
| `prefix` | Content | `text` | ✅ Native | Leading text (e.g. $) |
| `suffix` | Content | `text` | ✅ Native | Trailing text (e.g. %, +) |
| `decimals` | Content | `number` | ✅ Native | Decimal places |
| `alignment` | Styling | `alignment` | ✅ Native | Source alignment |
| `number_font` | Styling | `typography` | ✅ Native | Number weight + size, from the source |
| `number_color` | Styling | `color` | ✅ Native | Number colour, from the source |
| `prefix_font` | Styling | `typography` | ✅ Native | Prefix weight + size |
| `prefix_color` | Styling | `color` | ✅ Native | Prefix colour |
| `suffix_font` | Styling | `typography` | ✅ Native | Suffix weight + size |
| `suffix_color` | Styling | `color` | ✅ Native | Suffix colour |
| `separator` | Content | `switch` | ⚪ Unmapped | Default (thousands separator on) |
| `duration` | Behavior | `number` | ⚪ Unmapped | Default 2000ms |
| `easing` | Behavior | `select` | ⚪ Unmapped | Default ease-out |
| `animation` | Animations | `group` | ⚪ Unmapped | Entrance animations default off |
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
