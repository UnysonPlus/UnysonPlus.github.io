---
title: Badge — converter mapping
sidebar_label: Badge
slug: /element-mapping/badge
description: How the UnysonPlus Site Converter maps a source badge into the Badge (`badge`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Badge — converter mapping

Source `badge` → [`badge`](/docs/shortcodes/content-elements/badge). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 30 |
| **Recognizer** | `badge` |
| **Matches when** | A small pill / chip / label — a short rounded element with sub-tag text, a leading/trailing icon, and an optional link (an eyebrow, a status badge, a "what’s new" chip). |
| **Becomes** | [`badge`](/docs/shortcodes/content-elements/badge) |
| **Recognizer block shape** | `{ t:'badge', tag_text, message, link, icon, align, cs }` |
| **Fallback** | Degrades to `code_block`. |

The text, message, link, a trailing inline icon, and alignment map to native options. The badge then renders in a neutral default look (soft / pill / md) — the source colours are **not** reproduced (no hi-fi base for badges), so the colour options stay empty.

## Option coverage

**5/32 options mapped natively** (16%) — 🟡 0 via CSS · ⚠️ 0 gaps (derivable, not yet) · ⚪ 27 default · ⚙️ 3 auto.


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `tag_text` | Content | `text` | ✅ Native | Source sub-tag text |
| `message` | Content | `text` | ✅ Native | The main label text |
| `link` | Content | `text` | ✅ Native | Optional href |
| `trailing_icon` | Icons | `icon` | ✅ Native | A trailing inline `<svg>` in the source chip |
| `leading_icon` | Icons | `icon` | ⚪ Unmapped | Default none |
| `leading` | Icons | `select` | ⚪ Unmapped | Default none |
| `align` | Layout | `select` | ✅ Native | Source alignment |
| `style` | Design | `select` | ⚪ Unmapped | Default `soft` |
| `shape` | Design | `select` | ⚪ Unmapped | Default `pill` |
| `size` | Design | `select` | ⚪ Unmapped | Default `md` |
| `tag_style` | Design | `select` | ⚪ Unmapped | Default `filled` |
| `hover` | Design | `select` | ⚪ Unmapped | Default `lift` |
| `pill_color` | Styling | `color` | ⚪ Unmapped | Left neutral — source fill not reproduced |
| `text_color` | Styling | `color` | ⚪ Unmapped | Left neutral |
| `tag_color` | Styling | `color` | ⚪ Unmapped | Left neutral |
| `gradient_from` | Styling | `color` | ⚪ Unmapped | Default |
| `gradient_to` | Styling | `color` | ⚪ Unmapped | Default |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `link_target` | Link | `select` | ⚪ Unmapped | Default `auto` |
| `rel_nofollow` | Link | `switch` | ⚪ Unmapped | Default off |
| `rel_sponsored` | Link | `switch` | ⚪ Unmapped | Default off |
| `rel_ugc` | Link | `switch` | ⚪ Unmapped | Default off |
| `aria_label` | SEO | `text` | ⚪ Unmapped | Default |
| `title_attr` | SEO | `text` | ⚪ Unmapped | Default |
| `dismissible` | Design | `switch` | ⚪ Unmapped | Default off |
| `dismiss_id` | Design | `text` | ⚪ Unmapped | Default |
| `schema_enable` | SEO | `switch` | ⚪ Unmapped | Default off |
| `schema_name` | SEO | `text` | ⚪ Unmapped | Default |
| `schema_date` | SEO | `text` | ⚪ Unmapped | Default |
| `animation` | Animations | `group` | ⚪ Unmapped | Default off |
| `css_class` | Advanced | `text` | ⚪ Unmapped | Default empty |
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
