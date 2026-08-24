---
title: Text Block — converter mapping
sidebar_label: Text Block
slug: /element-mapping/text-block
description: How the UnysonPlus Site Converter maps a source text into the Text Block (`text_block`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Text Block — converter mapping

Source `text` → [`text_block`](/docs/shortcodes/content-elements/text-block). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 50 |
| **Recognizer** | `text` |
| **Matches when** | A paragraph / body-copy block (typically `<p>` or a text container) that isn't a heading, button, or other recognized primitive. Short ALL-CAPS or eyebrow-classed text is refined to an **overline** instead. |
| **Becomes** | [`text_block`](/docs/shortcodes/content-elements/text-block) |
| **Recognizer block shape** | `{ t:'text', html|text, maxWidth, align, cs }` |
| **Fallback** | Degrades to `code_block`. |

A centered paragraph that also carries a source max-width keeps a proven inline `mx-auto` wrapper; a pure centered/right paragraph uses the native `text_align` option instead. Font / colour / line-height re-assert via the styler.

## Option coverage

**4/19 options mapped natively** (21%) — 🟡 4 via CSS · ⚠️ 0 gaps (derivable, not yet) · ⚪ 11 default · ⚙️ 3 auto.


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `text` | Content | `wp-editor` | ✅ Native | The source paragraph's rich HTML |
| `text_color` | Styling | `color` | 🟡 Via CSS | Body text colour reproduced via the section / preset styler; native option empty |
| `bg_color` | Styling | `color` | ⚪ Unmapped | Block background rarely set (section handles it) |
| `link_color` | Styling | `color` | 🟡 Via CSS | Link colour via the styler; native option empty |
| `font_size_preset` | Styling | `font-size` | ✅ Native | Source computed font-size → nearest body Text Style preset |
| `spacing` | Styling | `spacing` | 🟡 Via CSS | Vertical margins ride the unified styler; native margin option left empty |
| `text_align` | Styling | `alignment` | ✅ Native | Explicit source center / right alignment (a `text-*` class) |
| `max_width` | Styling | `multi-picker` | ✅ Native | Source max-width (class, inline style, or stylesheet rule) |
| `columns` | Styling | `select` | ⚪ Unmapped | Newspaper columns — no source signal |
| `balance` | Styling | `switch` | ⚪ Unmapped | Decorative — no source signal |
| `line_height` | Styling | `select` | 🟡 Via CSS | Reproduced via the styler; native option empty |
| `para_spacing` | Styling | `select` | ⚪ Unmapped | — |
| `lead` | Styling | `switch` | ⚪ Unmapped | Decorative lead-in — no source signal |
| `link_underline` | Styling | `select` | ⚪ Unmapped | — |
| `dropcap` | Styling | `multi-picker` | ⚪ Unmapped | Decorative drop-cap (+ style/font/lines/chars/gap/colour) — no source signal |
| `animation` | Animations | `group` | ⚪ Unmapped | Entrance animations default off |
| `css_class` | Advanced | `text` | ⚪ Unmapped | Left empty — the block carries no source classes here |
| `custom_css` | Advanced | `textarea` | ⚪ Unmapped | Not populated for text_block |
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
