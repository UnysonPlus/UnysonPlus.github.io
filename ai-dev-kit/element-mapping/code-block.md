---
title: Code Block — converter mapping
sidebar_label: Code Block
slug: /element-mapping/code-block
description: How the UnysonPlus Site Converter maps a source code (universal fallback) into the Code Block (`code_block`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Code Block — converter mapping

Source `code (universal fallback)` → [`code_block`](/shortcodes/content-elements/code-block). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 99 |
| **Recognizer** | `code (universal fallback)` |
| **Matches when** | Anything the converter can’t map to a more specific element — the genuinely bespoke markup. This is the **universal fallback**, so nothing is ever lost. |
| **Becomes** | [`code_block`](/shortcodes/content-elements/code-block) |
| **Recognizer block shape** | `{ html }` |
| **Fallback** | — (this is the fallback). |

Holds the source markup verbatim in the `code` field (rendered as HTML, not shown as source). Everything a hand-fix would touch lands here; a systematic fallback is a signal to teach the converter a new recognizer so it becomes a native element next time.

## Option coverage

**1/9 options mapped natively** (11%) — 🟡 0 via CSS · ⚠️ 0 gaps (derivable, not yet) · ⚪ 8 default · ⚙️ 1 auto.


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `code` | Content | `code-editor` | ✅ Native | derived-from verbatim source HTML (SVG-inlined, RWD-shimmed, table-preset-wrapped) |
| `render_as_code` | Content | `switch` | ⚪ Unmapped | not set by mapper (verbatim-HTML block, not a code snippet) |
| `beautify` | Content | `switch` | ⚪ Unmapped | not set by mapper |
| `code_language` | Content | `select` | ⚪ Unmapped | not set; this node is used for verbatim HTML rendering, not syntax-highlighted code, so a source language-* class is not consulted |
| `text_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set by mapper |
| `bg_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set by mapper |
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
