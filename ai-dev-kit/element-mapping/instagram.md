---
title: Instagram — converter mapping
sidebar_label: Instagram
slug: /element-mapping/instagram
description: How the UnysonPlus Site Converter maps a source instagram into the Instagram (`instagram`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Instagram — converter mapping

Source `instagram` → `instagram`. This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 70 |
| **Recognizer** | `instagram` |
| **Matches when** | An Instagram feed embed — a grid of Instagram posts tied to a @username. |
| **Becomes** | `instagram` |
| **Recognizer block shape** | `{ username, count, columns }` |
| **Fallback** | Degrades to `code_block`. |

The @handle, the number of posts, and the column count are carried from the source embed. The access token is left blank — you add your own so the live feed can load.

## Option coverage

**3/9 options mapped natively** (33%) — 🟡 0 via CSS · ⚪ 6 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `username` | Content | `text` | ✅ Native | The @handle (stripped of the @) |
| `count` | Content | `number` | ✅ Native | Number of posts (clamped 1–18) |
| `columns` | Layout | `number` | ✅ Native | Columns (clamped 1–6) |
| `access_token` | Content | `text` | ⚪ Unmapped | Left blank — you add your token |
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
