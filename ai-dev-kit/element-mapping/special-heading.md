---
title: Special Heading — converter mapping
sidebar_label: Special Heading
slug: /element-mapping/special-heading
description: How the UnysonPlus Site Converter maps a source heading into the Special Heading (`special_heading`) shortcode — the recognizer rule and a full option-by-option coverage table.
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Special Heading — converter mapping

Source `heading` → [`special_heading`](/docs/shortcodes/content-elements/special-heading). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 80 |
| **Recognizer** | `heading` |
| **Matches when** | A semantic heading tag (`<h1>`–`<h6>`), or a text node the heuristics score as a heading. Level ≤ 2 becomes a page **Title** (larger Display type); level ≥ 3 a section heading. |
| **Becomes** | [`special_heading`](/docs/shortcodes/content-elements/special-heading) |
| **Recognizer block shape** | `{ t:'heading', html|text, level, align, cls, wrapCls, cs, overline, subtitle, wrapMaxW }` |
| **Fallback** | Degrades to `text_block`, then `code_block`. |

A chip/badge sitting directly above the heading is pulled in as its overline (with the chip's inline SVG → `overline_icon`, rendered as a filled pill). Typography/size/color are re-asserted at specificity 0 (the hi-fi base) so it looks identical while staying editable.

## Option coverage

**19/35 options mapped natively** (54%) — 🟡 3 via CSS · ⚪ 13 unmapped · ⚙️ 3 auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `overline` | Content | `text` | ✅ Native | Source eyebrow / kicker text above the title |
| `title` | Content | `text` | ✅ Native | The heading text (inline HTML accents preserved) |
| `subtitle` | Content | `text` | ✅ Native | A supporting line captured right after the heading |
| `heading` | Content | `select` | ✅ Native | Source heading level (`<h1>`–`<h6>`) |
| `overline_icon` | Icons | `icon` | ✅ Native | Inline `<svg>` inside the source overline / preceding chip |
| `overline_icon_position` | Icons | `select` | ✅ Native | Where the SVG sat relative to the overline text |
| `icon` | Icons | `icon` | ⚪ Unmapped | Source title icons aren't extracted to this field |
| `title_icon_position` | Icons | `select` | ⚪ Unmapped | — |
| `icon_badge_preset` | Icons | `icon-badge` | ⚪ Unmapped | Decorative preset — no source signal |
| `overline_uppercase` | Layout | `switch` | ✅ Native | Source `text-transform:uppercase` or all-caps text |
| `overline_marker` | Layout | `select` | ⚪ Unmapped | Decorative marker — not inferred |
| `overline_marker_position` | Layout | `select` | ⚪ Unmapped | — |
| `overline_container` | Layout | `select` | ✅ Native | A chip-before-heading → `pill`; else none |
| `element_spacing` | Layout | `select` | ✅ Native | Wrapper spacing utility classes |
| `block_max_width` | Layout | `unit-input` | ✅ Native | Wrapper `max-w-* mx-auto` measure |
| `alignment` | Styling | `alignment` | ✅ Native | Wrapper `text-center` / `text-*` alignment |
| `overline_align` | Styling | `alignment` | ⚪ Unmapped | Only the master alignment is mapped |
| `title_align` | Styling | `alignment` | ⚪ Unmapped | — |
| `subtitle_align` | Styling | `alignment` | ⚪ Unmapped | — |
| `display_size` | Styling | `select` | 🟡 Via CSS | Title size reproduced via the hi-fi base + heading tag, not this option |
| `title_max_width` | Styling | `unit-input` | ⚪ Unmapped | `block_max_width` is mapped instead |
| `subtitle_size` | Styling | `font-size` | ✅ Native | Subtitle's computed font-size → nearest Text Style preset |
| `subtitle_max_width` | Styling | `unit-input` | ⚪ Unmapped | — |
| `bg_color` | Styling | `color` | ⚪ Unmapped | Section background handles band colour |
| `overline_color` | Styling | `color` | ✅ Native | Source overline text colour |
| `title_color` | Styling | `color` | 🟡 Via CSS | Reproduced at specificity 0 via the hi-fi base; native option left empty |
| `subtitle_color` | Styling | `color` | 🟡 Via CSS | Same as title colour |
| `spacing` | Styling | `spacing` | ✅ Native | Source vertical margins → native margin option |
| `animation` | Animations | `group` | ⚪ Unmapped | Entrance animations default off (no source signal) |
| `css_class` | Advanced | `text` | ✅ Native | Unmapped source utility classes preserved |
| `overline_class` | Advanced | `text` | ✅ Native | Source overline utility classes |
| `title_class` | Advanced | `text` | ✅ Native | Source title utility classes |
| `subtitle_class` | Advanced | `text` | ✅ Native | Source subtitle utility classes |
| `custom_css` | Advanced | `textarea` | ✅ Native | Carries the source font-weight + the hi-fi appearance base |
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
