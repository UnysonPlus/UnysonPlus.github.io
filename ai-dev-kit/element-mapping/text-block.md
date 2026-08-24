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

**5/16 options mapped natively** (31%) — 🟡 0 via CSS · ⚠️ 4 gaps (derivable, not yet) · ⚪ 7 default · ⚙️ 1 auto.

:::tip[4 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `text` | Content | `wp-editor` | ✅ Native | html body via map_accent_classes |
| `text_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | computed color from $cs when non-default ink |
| `bg_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; paragraph bg rare, section owns background |
| `link_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | anchor computed color is detectable in captured DOM but the mapper doesn't inspect links |
| `font_size_preset` | Styling | `select` | ✅ Native | text_preset_for(computed font-size from $cs) |
| `text_align` | Styling | `image-picker` | ✅ Native | center/right from $align (native option path) |
| `max_width` | Styling | `multi-picker` | ✅ Native | from source max-width (class/inline/stylesheet) via max_width_att |
| `columns` | Styling | `select` | ⚠️ Gap | computed column-count is detectable but the mapper doesn't map multi-column text |
| `balance` | Styling | `switch` | ⚪ Unmapped | text-wrap:balance niche and not read |
| `line_height` | Styling | `select` | ⚠️ Gap | computed line-height is a strong reliable signal but not mapped to this select |
| `para_spacing` | Styling | `select` | ⚠️ Gap | inter-paragraph <p> margins detectable but not mapped (only block margin → spacing) |
| `lead` | Styling | `switch` | ⚪ Unmapped | lead handled via font_size_preset='lead'; the lead switch itself unset |
| `link_underline` | Styling | `select` | ⚪ Unmapped | anchor text-decoration not inspected; UnysonPlus preset choice |
| `dropcap` | Styling | `multi-picker` | ⚪ Unmapped | ::first-letter drop-cap detection unreliable; not read |
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
