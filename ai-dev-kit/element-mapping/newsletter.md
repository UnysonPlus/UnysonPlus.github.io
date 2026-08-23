---
title: Newsletter — converter mapping
sidebar_label: Newsletter
slug: /element-mapping/newsletter
description: How the UnysonPlus Site Converter maps a source newsletter into the Newsletter (`newsletter`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Newsletter — converter mapping

Source `newsletter` → [`newsletter`](/docs/shortcodes/interactive-elements/newsletter). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 55 |
| **Recognizer** | `newsletter` |
| **Matches when** | An email sign-up form — an email field + a subscribe button (often with a name field, on a call-to-action band). |
| **Becomes** | [`newsletter`](/docs/shortcodes/interactive-elements/newsletter) |
| **Recognizer block shape** | `{ placeholder, button_label, name_placeholder, align, rounded, button_bg }` |
| **Fallback** | Degrades to `code_block`. |

The visible copy maps — the email (and name) placeholder, the button label, alignment, corner rounding, and the button colour. The list binding and the surrounding colours/messages are left for you to set.

## Option coverage

**7/20 options mapped natively** (35%) — 🟡 0 via CSS · ⚪ 13 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `email_placeholder` | Content | `text` | ✅ Native | Source email field placeholder |
| `button_label` | Content | `text` | ✅ Native | Subscribe button label |
| `name_placeholder` | Content | `text` | ✅ Native | Name field placeholder (when present) |
| `show_name` | Content | `switch` | ✅ Native | On when the source form has a name field |
| `align` | Layout | `select` | ✅ Native | Source alignment |
| `rounded` | Design | `select` | ✅ Native | Corner rounding from the source |
| `accent_color` | Styling | `color` | ✅ Native | Button colour from the source |
| `list_id` | Content | `text` | ⚪ Unmapped | You bind the list |
| `title` | Content | `text` | ⚪ Unmapped | Default |
| `consent_text` | Content | `text` | ⚪ Unmapped | Default |
| `success_message` | Content | `text` | ⚪ Unmapped | Default |
| `error_message` | Content | `text` | ⚪ Unmapped | Default |
| `bg_color` | Styling | `color` | ⚪ Unmapped | Default |
| `text_color` | Styling | `color` | ⚪ Unmapped | Default |
| `field_bg` | Styling | `color` | ⚪ Unmapped | Default |
| `font_size_preset` | Styling | `font-size` | ⚪ Unmapped | Default |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `animation` | Animations | `group` | ⚪ Unmapped | Default off |
| `css_class` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `css_id` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `unique_id` | Advanced | `hidden` | ⚙️ Auto | Generated |
| `responsive_hide` | Advanced | `group` | ⚙️ Auto | Not set |
| `custom_attrs` | Advanced | `group` | ⚙️ Auto | Not set |

### Status legend

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚪ **Unmapped** — Left at default — no source signal, or a decorative choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
