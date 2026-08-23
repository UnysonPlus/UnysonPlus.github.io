---
title: Avatar — converter mapping
sidebar_label: Avatar
slug: /element-mapping/avatar
description: How the UnysonPlus Site Converter maps a source avatar into the Avatar (`avatar`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Avatar — converter mapping

Source `avatar` → [`avatar`](/docs/shortcodes/components/avatar). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 65 |
| **Recognizer** | `avatar` |
| **Matches when** | An overlapping avatar stack — a row of small round profile images with a "+N" counter (a "trusted by" / "join N customers" cluster). |
| **Becomes** | [`avatar`](/docs/shortcodes/components/avatar) |
| **Recognizer block shape** | `{ urls:[…], extra_count }` |
| **Fallback** | Degrades to `code_block`. |

Built in group mode: each source image becomes a person in the stack, and a "+N" more count is carried. Names are placeholders (the source rarely names each face), and shape / size / colours use defaults.

## Option coverage

**4/17 options mapped natively** (24%) — 🟡 0 via CSS · ⚪ 13 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `mode` | Content | `multi-picker` | ✅ Native | Set to `group` (the overlapping stack) |
| `people` | Content | `addable-popup` | ✅ Native | One entry per source avatar image |
| `extra_count` | Content | `text` | ✅ Native | The "+N" overflow count |
| `max_visible` | Content | `number` | ✅ Native | How many show before the "+N" |
| `overlap` | Design | `number` | ⚪ Unmapped | Default 35% |
| `stack_order` | Design | `select` | ⚪ Unmapped | Default |
| `shape` | Design | `select` | ⚪ Unmapped | Default |
| `size` | Design | `select` | ⚪ Unmapped | Default |
| `design` | Design | `image-picker` | ⚪ Unmapped | Default |
| `ring_color` | Styling | `color` | ⚪ Unmapped | Default |
| `show_status` | Content | `switch` | ⚪ Unmapped | Default off |
| `show_label` | Content | `switch` | ⚪ Unmapped | Default off |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `animation` | Animations | `group` | ⚪ Unmapped | Default off |
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
