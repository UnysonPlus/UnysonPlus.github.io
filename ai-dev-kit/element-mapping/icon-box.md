---
title: Icon Box — converter mapping
sidebar_label: Icon Box
slug: /element-mapping/icon-box
description: How the UnysonPlus Site Converter maps a source floating_card into the Icon Box (`icon_box`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Icon Box — converter mapping

Source `floating_card` → [`icon_box`](/docs/shortcodes/components/icon-box). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 55 |
| **Recognizer** | `floating_card` |
| **Matches when** | A floating badge/card overlaid on a hero image (an icon + title + subtitle chip), or an icon + title + text card. |
| **Becomes** | [`icon_box`](/docs/shortcodes/components/icon-box) |
| **Recognizer block shape** | `{ card:{ title, titleTag, text, imgIcon, link }, posCss }` |
| **Fallback** | Degrades to `code_block`. |

Title, heading tag, text (and any link) map to native options; a source SVG / image icon becomes the icon with its size. For a floating card over an image, its absolute position + skin ride a scoped `custom_css` (`posCss`). Colour / layout options stay at defaults.

## Option coverage

**5/24 options mapped natively** (21%) — 🟡 1 via CSS · ⚠️ 11 gaps (derivable, not yet) · ⚪ 7 default · ⚙️ 3 auto.

:::tip[11 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `icon` | Content | `icon` | ✅ Native | Source SVG / image icon |
| `icon_size` | Layout | `unit-input` | ✅ Native | From the source icon’s rendered size (image icons) |
| `title` | Content | `text` | ✅ Native | Card title |
| `title_tag` | Content | `select` | ✅ Native | Source heading tag (h3–h6 / span / p) |
| `content` | Content | `wp-editor` | ✅ Native | Card text (+ an optional link) |
| `icon_badge_preset` | Content | `icon-badge` | ⚪ Unmapped | Default |
| `icon_color` | Styling | `color` | ⚠️ Gap | computed color of the icon element (svg fill / <i> color) |
| `title_color` | Styling | `color` | ⚠️ Gap | computed color of the title/heading element |
| `content_color` | Styling | `color` | ⚠️ Gap | computed color of the body text element |
| `bg_color` | Styling | `color` | ⚠️ Gap | computed background-color of the card container |
| `font_size_preset` | Styling | `font-size` | ⚠️ Gap | computed font-size of the title/body text |
| `icon_align` | Layout | `alignment` | ⚠️ Gap | text-align / flex justify of the icon container |
| `title_align` | Layout | `alignment` | ⚠️ Gap | text-align of the title element |
| `content_align` | Layout | `alignment` | ⚠️ Gap | text-align of the content element |
| `box_style` | Styling | `select` | ⚪ Unmapped | Default |
| `box_link` | Link | `text` | ⚠️ Gap | href of the wrapping/CTA anchor |
| `link_target` | Link | `select` | ⚠️ Gap | target attribute of the anchor (_blank vs _self) |
| `link_rel` | Link | `text` | ⚠️ Gap | rel attribute of the anchor |
| `mobile_stack` | Layout | `switch` | ⚪ Unmapped | Default |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `custom_css` | Advanced | `textarea` | 🟡 Via CSS | Floating card: the absolute position + skin (`posCss`) |
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
