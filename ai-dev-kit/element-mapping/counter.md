---
title: Counter — converter mapping
sidebar_label: Counter
slug: /element-mapping/counter
description: How the UnysonPlus Site Converter maps a source counter into the Counter (`counter`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Counter — converter mapping

Source `counter` → [`counter`](/shortcodes/interactive-elements/counter). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 50 |
| **Recognizer** | `counter` |
| **Matches when** | A big animated stat — a number (often with a prefix/suffix like $ or %) shown as a "count-up" figure with a small label. |
| **Becomes** | [`counter`](/shortcodes/interactive-elements/counter) |
| **Recognizer block shape** | `{ number, start, prefix, suffix, decimals, align, numberWeight, numberSize, numberColor, prefixSize, suffixSize, … }` |
| **Fallback** | Degrades to `code_block`. |

One of the best-mapped elements: the number, start, prefix, suffix, decimals and alignment map natively, and the number/prefix/suffix typography (weight + size) and colours are carried from the source too. Only the animation timing (duration, easing, separator) is left at defaults.

## Option coverage

**12/17 options mapped natively** (71%) — 🟡 0 via CSS · ⚠️ 1 gap (derivable, not yet) · ⚪ 4 default · ⚙️ 1 auto.

:::tip[1 derivable gap]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `number` | Content | `text` | ✅ Native | set from c.number |
| `start` | Content | `text` | ✅ Native | set from c.start |
| `prefix` | Content | `text` | ✅ Native | set from c.prefix |
| `suffix` | Content | `text` | ✅ Native | set from c.suffix |
| `decimals` | Content | `select` | ✅ Native | set from c.decimals |
| `separator` | Content | `select` | ⚠️ Gap | thousands separator present in source number text detectable; mapper hardcodes 'yes' |
| `duration` | Content | `text` | ⚪ Unmapped | animation timing; hardcoded '2000', no source signal |
| `easing` | Content | `select` | ⚪ Unmapped | hardcoded 'ease-out' |
| `alignment` | Style | `image-picker` | ✅ Native | set from c.align (center/right) |
| `number_font` | Style | `typography` | ✅ Native | set from captured numberWeight/numberSize |
| `number_color` | Style | `predefined-colors-color-picker-compact` | ✅ Native | set from captured numberColor |
| `prefix_font` | Style | `typography` | ✅ Native | set from captured numberWeight/prefixSize |
| `prefix_color` | Style | `predefined-colors-color-picker-compact` | ✅ Native | set from captured prefixColor |
| `suffix_font` | Style | `typography` | ✅ Native | set from captured suffixWeight/suffixSize |
| `suffix_color` | Style | `predefined-colors-color-picker-compact` | ✅ Native | set from captured suffixColor |
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
