---
title: Special Heading — converter mapping
sidebar_label: Special Heading
slug: /element-mapping/special-heading
description: How the UnysonPlus Site Converter maps a source heading into the Special Heading (`special_heading`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Special Heading — converter mapping

Source `heading` → [`special_heading`](/shortcodes/content-elements/special-heading). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 80 |
| **Recognizer** | `heading` |
| **Matches when** | A semantic heading tag (`<h1>`–`<h6>`), or a text node the heuristics score as a heading. Level ≤ 2 becomes a page **Title** (larger Display type); level ≥ 3 a section heading. |
| **Becomes** | [`special_heading`](/shortcodes/content-elements/special-heading) |
| **Recognizer block shape** | `{ t:'heading', html|text, level, align, cls, wrapCls, cs, overline, subtitle, wrapMaxW }` |
| **Fallback** | Degrades to `text_block`, then `code_block`. |

A chip/badge sitting directly above the heading is pulled in as its overline (with the chip's inline SVG → `overline_icon`, rendered as a filled pill). Typography/size/color are re-asserted at specificity 0 (the hi-fi base) so it looks identical while staying editable.

## Option coverage

**18/32 options mapped natively** (56%) — 🟡 0 via CSS · ⚠️ 3 gaps (derivable, not yet) · ⚪ 11 default · ⚙️ 1 auto.

:::tip[3 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `overline` | Content | `text` | ✅ Native | set from $h['overline'] (kicker text, svg stripped out) |
| `title` | Content | `text` | ✅ Native | set from $h['title'] via map_accent_classes |
| `subtitle` | Content | `wp-editor` | ✅ Native | set from $h['subtitle'] via map_accent_classes |
| `heading` | Content | `select` | ✅ Native | 'h'.$lvl from captured $h['level'] (1-6, default h2) |
| `overline_icon` | Icons | `icon` | ✅ Native | inline <svg> extracted from overline / overline_svg chip |
| `overline_icon_position` | Icons | `select` | ✅ Native | before/after computed from svg position in overline markup |
| `icon` | Icons | `icon` | ⚪ Unmapped | title icon never set by n_heading; only overline icons are extracted |
| `title_icon_position` | Icons | `select` | ⚪ Unmapped | no title icon handled, so position never set |
| `icon_badge_preset` | Icons | `border-style-picker` | ⚪ Unmapped | not set in n_heading (overline chip uses overline_container pill instead) |
| `overline_uppercase` | Layout | `switch` | ✅ Native | yes/no from overline_transform:uppercase or all-caps text |
| `overline_marker` | Layout | `select` | ⚪ Unmapped | rule/dot/lines/bar marker never derived by the mapper |
| `overline_marker_position` | Layout | `select` | ⚪ Unmapped | no marker derived, so position unset |
| `overline_container` | Layout | `select` | ✅ Native | 'pill' when $h['overline_pill'] (chip-before-heading badge) |
| `element_spacing` | Layout | `select` | ✅ Native | from space-y-* class or title mb px snapped tight/relaxed |
| `block_max_width` | Layout | `unit-input` | ✅ Native | from wrapper max-w-* / wrapMaxW measure (heading_layout) |
| `alignment` | Styling | `image-picker` | ✅ Native | from text-center/right class or captured $h['align'] |
| `overline_align` | Styling | `image-picker` | ⚪ Unmapped | per-part align not set; only block alignment derived |
| `title_align` | Styling | `image-picker` | ⚪ Unmapped | per-part align not set; only block alignment derived |
| `subtitle_align` | Styling | `image-picker` | ⚪ Unmapped | per-part align not set; only block alignment derived |
| `display_size` | Styling | `select` | ⚠️ Gap | title font-size is captured (title_fs / computed) but reproduced via custom CSS, not mapped to this size preset option |
| `title_max_width` | Styling | `unit-input` | ⚠️ Gap | title constrained measure captured but emitted as scoped CSS (heading_measures), not this option |
| `subtitle_size` | Styling | `select` | ✅ Native | text_preset_for($h['subtitle_fs']) → subtitle Text Style preset |
| `subtitle_max_width` | Styling | `unit-input` | ⚠️ Gap | subtitle constrained measure captured but emitted as scoped CSS, not this option |
| `bg_color` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | heading background not set; section owns background |
| `overline_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | from $h['overline_color'] captured computed color |
| `title_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | from title_color_src when a real non-default ink |
| `subtitle_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | from subtitle_color_src (e.g. muted text-foreground/70) |
| `overline_class` | Advanced | `text` | ✅ Native | source overline classes carried (strip_inert_utilities) |
| `title_class` | Advanced | `text` | ✅ Native | source title classes carried (strip_inert_utilities) |
| `subtitle_class` | Advanced | `text` | ✅ Native | source subtitle classes carried (strip_inert_utilities) |
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
