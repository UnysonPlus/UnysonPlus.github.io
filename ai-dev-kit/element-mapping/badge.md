---
title: Badge — converter mapping
sidebar_label: Badge
slug: /element-mapping/badge
description: How the UnysonPlus Site Converter maps a source badge into the Badge (`badge`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Badge — converter mapping

Source `badge` → [`badge`](/docs/shortcodes/content-elements/badge). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 30 |
| **Recognizer** | `badge` |
| **Matches when** | A small pill / chip / label — a short rounded element with sub-tag text, a leading/trailing icon, and an optional link (an eyebrow, a status badge, a "what’s new" chip). |
| **Becomes** | [`badge`](/docs/shortcodes/content-elements/badge) |
| **Recognizer block shape** | `{ t:'badge', tag_text, message, link, icon, align, cs }` |
| **Fallback** | Degrades to `code_block`. |

The text, message, link, a trailing inline icon, and alignment map to native options. The badge then renders in a neutral default look (soft / pill / md) — the source colours are **not** reproduced (no hi-fi base for badges), so the colour options stay empty.

## Option coverage

**5/32 options mapped natively** (16%) — 🟡 0 via CSS · ⚠️ 17 gaps (derivable, not yet) · ⚪ 10 default · ⚙️ 3 auto.

:::tip[17 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `tag_text` | Content | `text` | ✅ Native | Source sub-tag text |
| `message` | Content | `text` | ✅ Native | The main label text |
| `link` | Content | `text` | ✅ Native | Optional href |
| `trailing_icon` | Icons | `icon` | ✅ Native | A trailing inline `<svg>` in the source chip |
| `leading_icon` | Icons | `icon` | ⚠️ Gap | presence + glyph of a leading <svg>/<i> icon inside the badge |
| `leading` | Icons | `select` | ⚠️ Gap | DOM order of icon vs text (icon before or after the label) |
| `align` | Layout | `select` | ✅ Native | Source alignment |
| `style` | Design | `select` | ⚪ Unmapped | Default `soft` |
| `shape` | Design | `select` | ⚠️ Gap | computed border-radius (pill vs rounded vs square) |
| `size` | Design | `select` | ⚪ Unmapped | Default `md` |
| `tag_style` | Design | `select` | ⚪ Unmapped | Default `filled` |
| `hover` | Design | `select` | ⚪ Unmapped | Default `lift` |
| `pill_color` | Styling | `color` | ⚠️ Gap | computed background-color of the badge |
| `text_color` | Styling | `color` | ⚠️ Gap | computed color of the badge label |
| `tag_color` | Styling | `color` | ⚠️ Gap | computed border/accent color when rendered as a tag |
| `gradient_from` | Styling | `color` | ⚠️ Gap | first color stop of a computed background linear-gradient |
| `gradient_to` | Styling | `color` | ⚠️ Gap | last color stop of a computed background linear-gradient |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `link_target` | Link | `select` | ⚠️ Gap | target attribute of the badge anchor |
| `rel_nofollow` | Link | `switch` | ⚠️ Gap | rel attribute of the anchor contains 'nofollow' |
| `rel_sponsored` | Link | `switch` | ⚠️ Gap | rel attribute of the anchor contains 'sponsored' |
| `rel_ugc` | Link | `switch` | ⚠️ Gap | rel attribute of the anchor contains 'ugc' |
| `aria_label` | SEO | `text` | ⚠️ Gap | aria-label attribute on the badge element |
| `title_attr` | SEO | `text` | ⚠️ Gap | title attribute on the badge element |
| `dismissible` | Design | `switch` | ⚪ Unmapped | Default off |
| `dismiss_id` | Design | `text` | ⚪ Unmapped | Default |
| `schema_enable` | SEO | `switch` | ⚠️ Gap | presence of schema.org itemtype/itemprop microdata in the markup |
| `schema_name` | SEO | `text` | ⚠️ Gap | schema.org name itemprop value |
| `schema_date` | SEO | `text` | ⚠️ Gap | schema.org date itemprop value |
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
