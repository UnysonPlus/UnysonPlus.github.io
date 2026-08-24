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

**1/12 options mapped natively** (8%) — 🟡 0 via CSS · ⚠️ 6 gaps (derivable, not yet) · ⚪ 5 default · ⚙️ 3 auto.

:::tip[6 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `code` | Content | `textarea` | ✅ Native | The verbatim source markup |
| `render_as_code` | Content | `switch` | ⚠️ Gap | presence of a <pre>/<code> wrapper in the source |
| `code_language` | Content | `select` | ⚠️ Gap | language-* / lang-* class on the <code> element |
| `beautify` | Content | `switch` | ⚪ Unmapped | Default |
| `bg_color` | Styling | `color` | ⚠️ Gap | computed background-color of the <pre>/<code> |
| `text_color` | Styling | `color` | ⚠️ Gap | computed color of the <pre>/<code> |
| `font_size_preset` | Styling | `font-size` | ⚠️ Gap | computed font-size of the code text |
| `spacing` | Styling | `spacing` | ⚠️ Gap | computed margin/padding of the code block |
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
- ⚠️ **Gap** — A source signal exists, but the converter does not derive this yet — a mapping worth adding (a real TODO, not a limitation).
- ⚪ **Unmapped** — Left at default — no reliable source signal, or an intentional/UnysonPlus-specific choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
