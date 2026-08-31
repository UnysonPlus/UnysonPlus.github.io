---
title: Newsletter — converter mapping
sidebar_label: Newsletter
slug: /element-mapping/newsletter
description: How the UnysonPlus Site Converter maps a source newsletter into the Newsletter (`newsletter`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Newsletter — converter mapping

Source `newsletter` → [`newsletter`](/shortcodes/interactive-elements/newsletter). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 55 |
| **Recognizer** | `newsletter` |
| **Matches when** | An email sign-up form — an email field + a subscribe button (often with a name field, on a call-to-action band). |
| **Becomes** | [`newsletter`](/shortcodes/interactive-elements/newsletter) |
| **Recognizer block shape** | `{ placeholder, button_label, name_placeholder, align, rounded, button_bg }` |
| **Fallback** | Degrades to `code_block`. |

The visible copy maps — the email (and name) placeholder, the button label, alignment, corner rounding, and the button colour. The list binding and the surrounding colours/messages are left for you to set.

## Option coverage

**8/20 options mapped natively** (40%) — 🟡 0 via CSS · ⚠️ 2 gaps (derivable, not yet) · ⚪ 10 default · ⚙️ 1 auto.

:::tip[2 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `title` | Content | `text` | ⚪ Unmapped | explicitly cleared to '' by mapper |
| `description` | Content | `textarea` | ⚪ Unmapped | explicitly cleared to '' by mapper |
| `show_name` | Content | `switch` | ✅ Native | derived-from captured show_name flag |
| `name_placeholder` | Content | `text` | ✅ Native | derived-from source name field placeholder (when show_name) |
| `email_placeholder` | Content | `text` | ✅ Native | derived-from source email input placeholder |
| `button_label` | Content | `text` | ✅ Native | derived-from source submit button label |
| `consent_text` | Content | `textarea` | ⚪ Unmapped | not set |
| `success_message` | Content | `text` | ⚪ Unmapped | not set |
| `error_message` | Content | `text` | ⚪ Unmapped | not set |
| `list_id` | Content | `text` | ⚪ Unmapped | not set; UnysonPlus/integration-specific |
| `design` | Design | `image-picker` | ⚪ Unmapped | hardcoded 'inline'; not derived |
| `align` | Design | `image-picker` | ✅ Native | derived-from source align (left/center/right) |
| `rounded` | Design | `select` | ✅ Native | derived-from source rounded (rounded-0/rounded/pill) |
| `accent_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | derived-from computed submit button background (custom color) |
| `field_bg` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | derived-from computed input field background (custom color) |
| `bg_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | signal: computed background-color of newsletter block |
| `text_color` | Styling | `predefined-colors-color-picker-compact` | ⚠️ Gap | signal: computed text color (button fg is captured for custom_css but bg_color/text_color not mapped) |
| `font_size_preset` | Styling | `select` | ⚪ Unmapped | not set |
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
