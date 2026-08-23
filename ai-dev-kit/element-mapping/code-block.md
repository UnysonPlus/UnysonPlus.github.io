---
title: Code Block — converter mapping
sidebar_label: Code Block
slug: /element-mapping/code-block
description: How the UnysonPlus Site Converter maps a source code (universal fallback) into the Code Block (`code_block`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Code Block — converter mapping

Source `code (universal fallback)` → [`code_block`](/docs/shortcodes/content-elements/code-block). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 99 |
| **Recognizer** | `code (universal fallback)` |
| **Matches when** | Anything the converter can’t map to a more specific element — the genuinely bespoke markup. This is the **universal fallback**, so nothing is ever lost. |
| **Becomes** | [`code_block`](/docs/shortcodes/content-elements/code-block) |
| **Recognizer block shape** | `{ html }` |
| **Fallback** | — (this is the fallback). |

Holds the source markup verbatim in the `code` field (rendered as HTML, not shown as source). Everything a hand-fix would touch lands here; a systematic fallback is a signal to teach the converter a new recognizer so it becomes a native element next time.

## Option coverage

**1/12 options mapped natively** (8%) — 🟡 0 via CSS · ⚪ 11 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `code` | Content | `textarea` | ✅ Native | The verbatim source markup |
| `render_as_code` | Content | `switch` | ⚪ Unmapped | Default off — rendered as HTML |
| `code_language` | Content | `select` | ⚪ Unmapped | Default |
| `beautify` | Content | `switch` | ⚪ Unmapped | Default |
| `bg_color` | Styling | `color` | ⚪ Unmapped | Default |
| `text_color` | Styling | `color` | ⚪ Unmapped | Default |
| `font_size_preset` | Styling | `font-size` | ⚪ Unmapped | Default |
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
