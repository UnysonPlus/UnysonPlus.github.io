---
title: Posts — converter mapping
sidebar_label: Posts
slug: /element-mapping/posts
description: How the UnysonPlus Site Converter maps a source posts into the Posts (`posts`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Posts — converter mapping

Source `posts` → [`posts`](/docs/shortcodes/components/posts). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 66 |
| **Recognizer** | `posts` |
| **Matches when** | A blog/post grid — repeating cards each with an image, title, and meta (a "latest articles" section). |
| **Becomes** | [`posts`](/docs/shortcodes/components/posts) |
| **Recognizer block shape** | `{ count, design:{ layout_mode, card_style, columns }, meta:{ date, author } }` |
| **Fallback** | Degrades to `code_block`. |

A placeholder post grid, configured to *match the source layout* — post count, layout mode, card style, column count, and which meta (date / author) shows. The cards then pull live posts; the per-card styling, filters and colours use defaults.

## Option coverage

**5/20 options mapped natively** (25%) — 🟡 0 via CSS · ⚠️ 6 gaps (derivable, not yet) · ⚪ 9 default · ⚙️ 3 auto.

:::tip[6 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `posts_per_page` | Content | `number` | ✅ Native | Post count (from the source grid) |
| `layout_mode` | Layout | `select` | ✅ Native | grid / list / masonry, from the source |
| `card_style` | Design | `select` | ✅ Native | Matched card style |
| `columns_desktop` | Layout | `select` | ✅ Native | Column count |
| `meta_items` | Content | `checkboxes` | ✅ Native | Which meta shows (date / author) |
| `post_type` | Content | `select` | ⚪ Unmapped | Default (post) |
| `taxonomy_filter` | Content | `multi-select` | ⚪ Unmapped | Default |
| `image_style` | Design | `image-style-picker` | ⚪ Unmapped | Default |
| `image_ratio` | Design | `select` | ⚠️ Gap | Aspect ratio of post-card thumbnail <img> from its computed/intrinsic width:height |
| `excerpt_length` | Content | `number` | ⚪ Unmapped | Default |
| `readmore` | Content | `switch` | ⚠️ Gap | Presence of a 'Read more'/continue-reading anchor within each post card |
| `live_filters` | Behavior | `switch` | ⚪ Unmapped | Default off |
| `pagination` | Behavior | `select` | ⚠️ Gap | Presence and kind of pager markup (numbered .page-numbers links, prev/next, or infinite-scroll hooks) |
| `title_color` | Styling | `color` | ⚠️ Gap | Computed color of the post title link/heading |
| `meta_color` | Styling | `color` | ⚠️ Gap | Computed color of the post meta text (date/author/category) |
| `bg_color` | Styling | `color` | ⚠️ Gap | Computed background-color of the post card container |
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
- ⚠️ **Gap** — A source signal exists, but the converter does not derive this yet — a mapping worth adding (a real TODO, not a limitation).
- ⚪ **Unmapped** — Left at default — no reliable source signal, or an intentional/UnysonPlus-specific choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
