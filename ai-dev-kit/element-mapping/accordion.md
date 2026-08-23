---
title: Accordion — converter mapping
sidebar_label: Accordion
slug: /element-mapping/accordion
description: How the UnysonPlus Site Converter maps a source accordion into the Accordion (`accordion`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Accordion — converter mapping

Source `accordion` → [`accordion`](/docs/shortcodes/interactive-elements/accordion). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 25 |
| **Recognizer** | `accordion` |
| **Matches when** | A toggle / disclosure group — a set of clickable headers each revealing a panel of content (an FAQ, a details list). |
| **Becomes** | [`accordion`](/docs/shortcodes/interactive-elements/accordion) |
| **Recognizer block shape** | `{ items:[{ title, content }] }` |
| **Fallback** | Degrades to `code_block`. |

Each source toggle becomes an accordion panel (its header → the tab title, its body → the tab content, closed by default). The accordion’s look (style, icons, numbering, colours) is left at the theme defaults.

## Option coverage

**1/19 options mapped natively** (5%) — 🟡 0 via CSS · ⚪ 18 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `tabs` | Content | `addable-popup` | ✅ Native | One panel per source toggle — title + content |
| `is_open` | Content | `switch` | ⚪ Unmapped | Panels closed by default |
| `style` | Design | `multi-picker` | ⚪ Unmapped | Default |
| `accordion_style` | Design | `select` | ⚪ Unmapped | Default |
| `icon_style` | Design | `select` | ⚪ Unmapped | Default |
| `icon_position` | Design | `select` | ⚪ Unmapped | Default |
| `numbering` | Design | `select` | ⚪ Unmapped | Default |
| `title_tag` | Content | `select` | ⚪ Unmapped | Default |
| `title_alignment` | Design | `alignment` | ⚪ Unmapped | Default |
| `multiple_open` | Behavior | `switch` | ⚪ Unmapped | Default |
| `collapsible` | Behavior | `switch` | ⚪ Unmapped | Default |
| `faq_schema` | SEO | `switch` | ⚪ Unmapped | Default off |
| `font_size_preset` | Styling | `font-size` | ⚪ Unmapped | Default |
| `title_bg_color` | Styling | `color` | ⚪ Unmapped | Default |
| `content_bg_color` | Styling | `color` | ⚪ Unmapped | Default |
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
