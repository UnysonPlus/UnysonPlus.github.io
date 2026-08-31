---
title: Badge — converter mapping
sidebar_label: Badge
slug: /element-mapping/badge
description: How the UnysonPlus Site Converter maps a source badge into the Badge (`badge`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Badge — converter mapping

Source `badge` → [`badge`](/shortcodes/content-elements/badge). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 30 |
| **Recognizer** | `badge` |
| **Matches when** | A small pill / chip / label — a short rounded element with sub-tag text, a leading/trailing icon, and an optional link (an eyebrow, a status badge, a "what’s new" chip). |
| **Becomes** | [`badge`](/shortcodes/content-elements/badge) |
| **Recognizer block shape** | `{ t:'badge', tag_text, message, link, icon, align, cs }` |
| **Fallback** | Degrades to `code_block`. |

The text, message, link, a trailing inline icon, and alignment map to native options. The badge then renders in a neutral default look (soft / pill / md) — the source colours are **not** reproduced (no hi-fi base for badges), so the colour options stay empty.

## Option coverage

**11/30 options mapped natively** (37%) — 🟡 0 via CSS · ⚠️ 5 gaps (derivable, not yet) · ⚪ 14 default · ⚙️ 1 auto.

:::tip[5 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `tag_text` | Content | `text` | ✅ Native | set from b.tag_text |
| `message` | Content | `text` | ✅ Native | set from b.message |
| `link` | Content | `text` | ✅ Native | set from b.link href |
| `leading` | Content | `select` | ✅ Native | set to 'icon' when a leading inline SVG captured, else 'none' |
| `leading_icon` | Content | `icon` | ✅ Native | set from captured leading inline SVG markup |
| `trailing_icon` | Content | `icon` | ✅ Native | set from b.icon via icon_value |
| `style` | Design | `image-picker` | ✅ Native | derived: outline when pill border present, subtle when fill present, else soft default |
| `shape` | Design | `select` | ⚪ Unmapped | hardcoded 'pill'; source border-radius not mapped to shape buckets |
| `size` | Design | `select` | ⚪ Unmapped | hardcoded 'md' |
| `align` | Design | `select` | ✅ Native | set from b.align (start/center/end) |
| `tag_style` | Design | `select` | ⚪ Unmapped | hardcoded 'filled' |
| `hover` | Design | `select` | ⚪ Unmapped | hardcoded 'lift' |
| `pill_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | set from resolved pill border/fill (Tailwind + computed style) |
| `text_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | set from resolved message text color (msgCls) |
| `tag_color` | Styling | `predefined-colors-color-picker-compact` | ✅ Native | set from resolved tag fill (tagCls), when a real non-black color |
| `gradient_from` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | always none_color; gradient style never selected by mapper |
| `gradient_to` | Styling | `predefined-colors-color-picker-compact` | ⚪ Unmapped | always none_color |
| `link_target` | Link & SEO | `select` | ⚪ Unmapped | hardcoded 'auto' |
| `rel_nofollow` | Link & SEO | `switch` | ⚠️ Gap | source anchor rel attribute detectable; mapper hardcodes 'no' |
| `rel_sponsored` | Link & SEO | `switch` | ⚠️ Gap | source anchor rel attribute detectable; hardcoded 'no' |
| `rel_ugc` | Link & SEO | `switch` | ⚠️ Gap | source anchor rel attribute detectable; hardcoded 'no' |
| `aria_label` | Link & SEO | `text` | ⚠️ Gap | source element aria-label attribute detectable; mapper leaves blank |
| `title_attr` | Link & SEO | `text` | ⚠️ Gap | source element title attribute detectable; mapper leaves blank |
| `dismissible` | Link & SEO | `switch` | ⚪ Unmapped | UnysonPlus behavior; no reliable static-DOM signal |
| `dismiss_id` | Link & SEO | `text` | ⚪ Unmapped | UnysonPlus-specific; not derived |
| `schema_enable` | Link & SEO | `switch` | ⚪ Unmapped | not derived; hardcoded 'no' |
| `schema_name` | Link & SEO | `text` | ⚪ Unmapped | not derived |
| `schema_date` | Link & SEO | `text` | ⚪ Unmapped | not derived |
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
