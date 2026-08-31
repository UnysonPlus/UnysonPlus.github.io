---
title: Posts — converter mapping
sidebar_label: Posts
slug: /element-mapping/posts
description: How the UnysonPlus Site Converter maps a source posts into the Posts (`posts`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Posts — converter mapping

Source `posts` → [`posts`](/shortcodes/components/posts). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 66 |
| **Recognizer** | `posts` |
| **Matches when** | A blog/post grid — repeating cards each with an image, title, and meta (a "latest articles" section). |
| **Becomes** | [`posts`](/shortcodes/components/posts) |
| **Recognizer block shape** | `{ count, design:{ layout_mode, card_style, columns }, meta:{ date, author } }` |
| **Fallback** | Degrades to `code_block`. |

A placeholder post grid, configured to *match the source layout* — post count, layout mode, card style, column count, and which meta (date / author) shows. The cards then pull live posts; the per-card styling, filters and colours use defaults.

## Option coverage

**7/56 options mapped natively** (13%) — 🟡 0 via CSS · ⚠️ 2 gaps (derivable, not yet) · ⚪ 47 default · ⚙️ 1 auto.

:::tip[2 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `use_current_query` | Query | `switch` | ⚪ Unmapped | converter always builds an explicit post_type=post query; no signal |
| `post_type` | Query | `select` | ✅ Native | derived-from: hardcoded to 'post' by n_posts |
| `taxonomy_filter` | Query | `text` | ⚪ Unmapped | not set; taxonomy filtering not derived from source |
| `taxonomy_relation` | Query | `radio` | ⚪ Unmapped | not set |
| `include_ids` | Query | `text` | ⚪ Unmapped | not set; dynamic feed, no specific IDs |
| `exclude_ids` | Query | `text` | ⚪ Unmapped | not set |
| `author_ids` | Query | `text` | ⚪ Unmapped | not set |
| `date_range` | Query | `select` | ⚪ Unmapped | not set |
| `posts_per_page` | Query | `short-text` | ✅ Native | derived-from: count of card headings in source listing (max 3) |
| `offset` | Query | `short-text` | ⚪ Unmapped | not set |
| `orderby` | Query | `select` | ✅ Native | derived-from: hardcoded 'date' by n_posts |
| `meta_key` | Query | `text` | ⚪ Unmapped | not set |
| `order` | Query | `radio` | ✅ Native | derived-from: hardcoded 'DESC' by n_posts |
| `exclude_current` | Query | `switch` | ⚪ Unmapped | not set |
| `sticky_handling` | Query | `select` | ⚪ Unmapped | not set |
| `design` | Design | `multi-picker` | ✅ Native | derived-from: detect_posts_design layout_mode (grid/masonry/list/slider) from source container classes + slider/marquee markers |
| `card` | Design | `multi-picker` | ✅ Native | derived-from: detect_posts_design card_style from first card image placement (standard/side-left/overlay/minimal) |
| `box_style` | Design | `border-style-picker` | ⚪ Unmapped | not set; card box treatment not derived |
| `image_style` | Design | `image-style-picker` | ⚪ Unmapped | not set; feed images come from WP, source card image styling not carried |
| `image_size` | Design | `select` | ⚪ Unmapped | not set |
| `image_ratio` | Design | `select` | ⚠️ Gap | signal: computed aspect-ratio of source card featured images |
| `fallback_image_url` | Design | `text` | ⚪ Unmapped | not set |
| `card_padding` | Design | `select` | ⚪ Unmapped | not set |
| `text_align` | Design | `image-picker` | ⚪ Unmapped | not set |
| `mobile_layout_override` | Design | `select` | ⚪ Unmapped | not set |
| `card_preview` | Elements | `html-full` | ⚪ Unmapped | not set; UnysonPlus-specific card designer |
| `card_rows` | Elements | `addable-popup` | ⚪ Unmapped | not set; UnysonPlus-specific card row composer |
| `title_tag` | Elements | `select` | ⚠️ Gap | signal: heading tag level (h2-h5) used on source cards |
| `cat_position` | Elements | `select` | ⚪ Unmapped | not set |
| `cat_taxonomy` | Elements | `text` | ⚪ Unmapped | not set |
| `cat_max` | Elements | `short-text` | ⚪ Unmapped | not set |
| `meta_items` | Elements | `checkboxes` | ✅ Native | derived-from: date + author signals detected in source (has_date_signal, 'by <Name>' pattern); comments/reading_time not detected |
| `meta_layout` | Elements | `select` | ⚪ Unmapped | not set |
| `date_format` | Elements | `select` | ⚪ Unmapped | not set |
| `excerpt_source` | Elements | `select` | ⚪ Unmapped | not set; content comes from live WP query |
| `excerpt_length` | Elements | `short-text` | ⚪ Unmapped | not set |
| `excerpt_suffix` | Elements | `short-text` | ⚪ Unmapped | not set |
| `readmore` | Elements | `multi-picker` | ⚪ Unmapped | not set |
| `readmore_text` | Elements | `text` | ⚪ Unmapped | not set |
| `pagination` | Navigation & Cache | `multi-picker` | ⚪ Unmapped | converter forces pagination off (pagination_type=none); not detected from source |
| `live_filters` | Navigation & Cache | `switch` | ⚪ Unmapped | not set; UnysonPlus feature |
| `filters_position` | Navigation & Cache | `select` | ⚪ Unmapped | not set |
| `cache_output` | Navigation & Cache | `switch` | ⚪ Unmapped | not set; UnysonPlus feature |
| `cache_hours` | Navigation & Cache | `select` | ⚪ Unmapped | not set |
| `no_results_text` | Navigation & Cache | `text` | ⚪ Unmapped | not set |
| `text_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; UnysonPlus predefined palette |
| `bg_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; UnysonPlus predefined palette |
| `title_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; UnysonPlus predefined palette |
| `excerpt_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; UnysonPlus predefined palette |
| `meta_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; UnysonPlus predefined palette |
| `chip_bg` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; UnysonPlus predefined palette |
| `chip_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; UnysonPlus predefined palette |
| `accent_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set; UnysonPlus predefined palette |
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
