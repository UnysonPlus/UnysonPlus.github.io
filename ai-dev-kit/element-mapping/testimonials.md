---
title: Testimonials — converter mapping
sidebar_label: Testimonials
slug: /element-mapping/testimonials
description: How the UnysonPlus Site Converter maps a source testimonials into the Testimonials (`testimonials`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Testimonials — converter mapping

Source `testimonials` → [`testimonials`](/shortcodes/components/testimonials). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 35 |
| **Recognizer** | `testimonials` |
| **Matches when** | A review / quote block — a customer quote with a name, role, avatar, and often a star rating; one or several as a set. |
| **Becomes** | [`testimonials`](/shortcodes/components/testimonials) |
| **Recognizer block shape** | `{ rows:[{ quote, name, position, image, siteName, siteUrl, rating }] }` |
| **Fallback** | Degrades to `code_block`. |

Each review becomes an item — quote, author name, role, avatar, site name/URL and star rating all map. The author/role text colour, when the source sets it, rides a scoped `custom_css`. Layout (grid / marquee / spotlight) and skin are left at defaults.

## Option coverage

**3/23 options mapped natively** (13%) — 🟡 0 via CSS · ⚠️ 0 gaps (derivable, not yet) · ⚪ 20 default · ⚙️ 1 auto.


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `testimonials` | Content | `addable-popup` | ✅ Native | derived-from captured rows: quote, author_name, author_job, avatar url, rating, site_name/url, and repeatable extra stat rows |
| `design_settings` | Design | `multi-picker` | ✅ Native | derived-from detect_testimonial_design (marquee/carousel/masonry/bento/split/stacked/classic grid + layout_choice/grid_columns/sub-columns) |
| `card_preview` | Card | `html-full` | ⚪ Unmapped | not set by mapper |
| `card_rows` | Card | `addable-popup` | ✅ Native | derived-from presence of per-testimonial extra stat rows; mapper pins the rating/quote/avatar-author/extra card_rows layout only when a footer stat exists |
| `box_style` | Card | `border-style-picker` | ⚪ Unmapped | not set by mapper |
| `rating_symbol` | Card | `image-picker` | ⚪ Unmapped | not set by mapper |
| `rating_fill_color` | Card | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set by mapper |
| `rating_empty_color` | Card | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set by mapper |
| `rating_size` | Card | `select` | ⚪ Unmapped | not set by mapper |
| `container_type` | Style | `select` | ⚪ Unmapped | hardcoded 'container' |
| `text_align` | Style | `image-picker` | ⚪ Unmapped | hardcoded 'text-center' |
| `avatar_shape` | Style | `select` | ⚪ Unmapped | hardcoded 'rounded-circle' |
| `avatar_size` | Style | `select` | ⚪ Unmapped | hardcoded 'avatar-lg' |
| `reviews_schema` | Style | `switch` | ⚪ Unmapped | not set (only show_rating is set); reviews_schema left at option default |
| `text_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | empty_color() |
| `bg_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | empty_color() |
| `font_size_preset` | Style | `select` | ⚪ Unmapped | hardcoded '' |
| `quote_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | empty_color() |
| `author_name_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | empty_color(); source uppercase/letter-spacing kicker rides as scoped custom_css, not this color option |
| `author_job_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | empty_color() |
| `site_link_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | empty_color() |
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
