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

**17/28 options mapped natively** (61%) — 🟡 0 via CSS · ⚠️ 1 gap (derivable, not yet) · ⚪ 10 default · ⚙️ 3 auto.

:::tip[1 derivable gap]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `tabs` | Content | `addable-popup` | ✅ Native | One panel per source toggle — title + content (with FAQ JSON-LD answer recovery) |
| `accordion_style` | Design | `image-picker` | ✅ Native | Family (bordered / separated / flush / filled / ghost) from item background / border / gap |
| `icon_style` | Design | `select` | ✅ Native | chevron / arrow / plus-minus / plus-x / none, from the marker glyph |
| `icon_position` | Design | `select` | ✅ Native | left / right from justify-content / the icon placement in the bar |
| `title_alignment` | Design | `select` | ✅ Native | Computed text-align of the header |
| `item_spacing` | Design | `short-select` | ✅ Native | Gap between items (space-y / gap / margin), snapped to the nearest mb-N |
| `corner_radius` | Design | `select` | ✅ Native | Item border-radius → none / sm / md / lg |
| `elevation` | Design | `select` | ✅ Native | Item box-shadow presence → subtle / raised |
| `title_bg_color` | Styling | `compact color` | ✅ Native | Computed header background fill |
| `faq_schema` | SEO | `switch` | ✅ Native | Enabled when a schema.org FAQPage covers the questions — re-emits the FAQ structured data |
| `initially_open` | Content | `select` | ✅ Native | Initial open state — details[open] / aria-expanded="true" on the open panel (per-tab is_open + initially_open) |
| `title_tag` | Content | `select` | ✅ Native | The header heading level (h2–h6) when the toggle is wrapped in a real heading |
| `content_bg_color` | Styling | `compact color` | ✅ Native | Computed panel (content) background fill |
| `multiple_open` | Behavior | `switch` | ✅ Native | <details> group opens independently (yes) vs Bootstrap data-bs-parent single-open (no) |
| `collapsible` | Behavior | `switch` | ⚠️ Gap | No reliable static signal (Bootstrap panels are collapsible by default) — left as a gap |
| `tab_title_color` | Styling | `compact color` | ✅ Native | Computed header text colour (when not the default near-black) |
| `tab_content_color` | Styling | `compact color` | ✅ Native | Computed panel text colour (when not the default near-black) |
| `icon_closed_color` | Styling | `compact color` | ✅ Native | Computed marker/icon colour |
| `numbering` | Design | `multi-picker` | ⚪ Unmapped | Default — UnysonPlus item numbering, not a source signal |
| `hash_linking` | Behavior | `switch` | ⚪ Unmapped | Default |
| `show_expand_collapse_all` | Behavior | `switch` | ⚪ Unmapped | Default |
| `active_accent` | Styling | `compact color` | ⚪ Unmapped | Default — UnysonPlus accent colour |
| `title_hover` | Styling | `switch` | ⚪ Unmapped | Default |
| `font_size_preset` | Styling | `select` | ⚪ Unmapped | Default — maps to a Text Style; overlaps the design system |
| `icon_closed_image · icon_open_image · icon_*_text` | Design | `upload / short-text` | ⚪ Unmapped | Default — custom marker images / text |
| `spacing` | Advanced | `spacing` | ⚪ Unmapped | Default — the element’s outer margin/padding |
| `animation · gsap_motion · interaction · text_effect · scroll_* · …` | Animations | `multi-picker` | ⚪ Unmapped | Default — Animation Engine effects (no source mapping) |
| `css_id · css_class · custom_css` | Advanced | `text / code-editor` | ⚪ Unmapped | Default — per-instance, set by hand |
| `unique_id` | Advanced | `unique` | ⚙️ Auto | Generated |
| `responsive_hide · dc_* · element_position · element_overflow` | Advanced | `group` | ⚙️ Auto | Not set |
| `custom_attrs` | Advanced | `addable-box` | ⚙️ Auto | Not set |

### Status legend

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚠️ **Gap** — A source signal exists, but the converter does not derive this yet — a mapping worth adding (a real TODO, not a limitation).
- ⚪ **Unmapped** — Left at default — no reliable source signal, or an intentional/UnysonPlus-specific choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
