---
title: Button — converter mapping
sidebar_label: Button
slug: /element-mapping/button
description: How the UnysonPlus Site Converter maps a source button into the Button (`button`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Button — converter mapping

Source `button` → [`button`](/docs/shortcodes/components/button). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 40 |
| **Recognizer** | `button` |
| **Matches when** | A `<button>`, or an `<a>` styled as a button (a `btn` / `button` / `cta` class, or button-like padding + fill). |
| **Becomes** | [`button`](/docs/shortcodes/components/button) |
| **Recognizer block shape** | `{ t:'button', label|text, href, cls, icon, iconPos, cs, groupCls, groupCs, align }` |
| **Fallback** | Degrades to `code_block`. |

Text, link, alignment and any inline icon map to native options. The button’s **look** (fill / text / border / radius / shadow / typography) is reproduced via a scoped hi-fi `custom_css` base rather than by matching one of your Button presets — so the native `style` preset stays empty (a candidate to promote).

## Option coverage

**6/16 options mapped natively** (38%) — 🟡 1 via CSS · ⚪ 9 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `label` | Content | `text` | ✅ Native | Source button text |
| `link` | Content | `text` | ✅ Native | The href |
| `target` | Content | `select` | ⚪ Unmapped | Default `_self` |
| `icon` | Icons | `icon` | ✅ Native | An inline `<svg>` / icon in the source button |
| `icon_position` | Icons | `select` | ✅ Native | Before / after the label, from the source |
| `style` | Styling | `button-style-picker` | 🟡 Via CSS | Look reproduced via the hi-fi `custom_css` base, not a matched Button preset |
| `size` | Styling | `select` | ⚪ Unmapped | Default — not inferred |
| `width` | Styling | `multi-picker` | ⚪ Unmapped | Default (auto) |
| `alignment` | Styling | `alignment` | ✅ Native | Source alignment |
| `state` | Styling | `select` | ⚪ Unmapped | Editor state selector — no stored value |
| `hover_animation` | Styling | `select` | ⚪ Unmapped | No source signal |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default spacing |
| `animation` | Animations | `group` | ⚪ Unmapped | Entrance animations default off |
| `custom_css` | Advanced | `textarea` | ✅ Native | Carries the hi-fi appearance base that reproduces the button’s look |
| `css_class` | Advanced | `text` | ⚪ Unmapped | Left empty |
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
