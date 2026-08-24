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

**1/19 options mapped natively** (5%) — 🟡 0 via CSS · ⚠️ 11 gaps (derivable, not yet) · ⚪ 7 default · ⚙️ 3 auto.

:::tip[11 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `tabs` | Content | `addable-popup` | ✅ Native | One panel per source toggle — title + content |
| `is_open` | Content | `switch` | ⚠️ Gap | Derivable — aria-expanded="true" / .show / .active on the open panel |
| `style` | Design | `multi-picker` | ⚪ Unmapped | Default |
| `accordion_style` | Design | `select` | ⚪ Unmapped | Default |
| `icon_style` | Design | `select` | ⚠️ Gap | Derivable — chevron vs plus/minus glyph from the marker |
| `icon_position` | Design | `select` | ⚠️ Gap | Derivable — the marker/chevron side from the toggle CSS |
| `numbering` | Design | `select` | ⚪ Unmapped | Default |
| `title_tag` | Content | `select` | ⚠️ Gap | Derivable — the header element (h2–h4 vs button) |
| `title_alignment` | Design | `alignment` | ⚠️ Gap | Derivable — computed text-align of the header |
| `multiple_open` | Behavior | `switch` | ⚠️ Gap | Derivable — Bootstrap data-bs-parent (single-open) vs independent toggles |
| `collapsible` | Behavior | `switch` | ⚠️ Gap | Derivable — data-bs-parent / whether panels can all close |
| `faq_schema` | SEO | `switch` | ⚠️ Gap | Derivable — a schema.org FAQPage JSON-LD block on the page |
| `font_size_preset` | Styling | `font-size` | ⚪ Unmapped | Default |
| `title_bg_color` | Styling | `color` | ⚠️ Gap | Derivable — computed background of the header row |
| `content_bg_color` | Styling | `color` | ⚠️ Gap | Derivable — computed background of the panel |
| `spacing` | Styling | `spacing` | ⚠️ Gap | Derivable — the margin/gap between items |
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
