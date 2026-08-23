---
title: Testimonials — converter mapping
sidebar_label: Testimonials
slug: /element-mapping/testimonials
description: How the UnysonPlus Site Converter maps a source testimonials into the Testimonials (`testimonials`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Testimonials — converter mapping

Source `testimonials` → [`testimonials`](/docs/shortcodes/components/testimonials). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 35 |
| **Recognizer** | `testimonials` |
| **Matches when** | A review / quote block — a customer quote with a name, role, avatar, and often a star rating; one or several as a set. |
| **Becomes** | [`testimonials`](/docs/shortcodes/components/testimonials) |
| **Recognizer block shape** | `{ rows:[{ quote, name, position, image, siteName, siteUrl, rating }] }` |
| **Fallback** | Degrades to `code_block`. |

Each review becomes an item — quote, author name, role, avatar, site name/URL and star rating all map. The author/role text colour, when the source sets it, rides a scoped `custom_css`. Layout (grid / marquee / spotlight) and skin are left at defaults.

## Option coverage

**2/20 options mapped natively** (10%) — 🟡 3 via CSS · ⚪ 15 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `testimonials` | Content | `addable-popup` | ✅ Native | One item per review — quote, author, role, avatar, rating |
| `rating` | Content | `number` | ✅ Native | Per item: star rating (defaults to 5) |
| `author_name_color` | Styling | `color` | 🟡 Via CSS | Carried via a scoped custom_css when the source sets it |
| `author_job_color` | Styling | `color` | 🟡 Via CSS | Same as author name |
| `design` | Design | `image-picker` | ⚪ Unmapped | Default |
| `layout_type` | Layout | `multi-picker` | ⚪ Unmapped | Default |
| `grid_columns` | Layout | `select` | ⚪ Unmapped | Default |
| `avatar_shape` | Design | `select` | ⚪ Unmapped | Default |
| `avatar_size` | Design | `unit-input` | ⚪ Unmapped | Default |
| `quote_color` | Styling | `color` | ⚪ Unmapped | Default |
| `bg_color` | Styling | `color` | ⚪ Unmapped | Default |
| `text_color` | Styling | `color` | ⚪ Unmapped | Default |
| `box_style` | Styling | `select` | ⚪ Unmapped | Default |
| `font_size_preset` | Styling | `font-size` | ⚪ Unmapped | Default |
| `reviews_schema` | SEO | `switch` | ⚪ Unmapped | Default off |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `custom_css` | Advanced | `textarea` | 🟡 Via CSS | Author/role colour when set on the source |
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
