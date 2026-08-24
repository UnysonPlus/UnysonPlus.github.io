---
title: Button — converter mapping
sidebar_label: Button
slug: /element-mapping/button
description: How the UnysonPlus Site Converter maps a source button into the Button (`button`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Button — converter mapping

Source `button` → [`button`](/docs/shortcodes/components/button). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 40 |
| **Recognizer** | `button` |
| **Matches when** | A `<button>`, or an `<a>` styled as a button (a `btn` / `button` / `cta` class, or button-like padding + fill). |
| **Becomes** | [`button`](/docs/shortcodes/components/button) |
| **Recognizer block shape** | `{ t:'button', label|text, href, cls, icon, iconPos, cs, groupCls, groupCs, align }` |
| **Fallback** | Degrades to `code_block`. |

Text, link, alignment and any inline icon map to native options. The button’s **look** (fill / text / border / radius / shadow / typography) is reproduced via a scoped hi-fi `custom_css` base rather than by matching one of your Button presets — so the native `style` preset stays empty (a candidate to promote).

## Option coverage

**9/14 options mapped natively** (64%) — 🟡 0 via CSS · ⚠️ 2 gaps (derivable, not yet) · ⚪ 3 default · ⚙️ 1 auto.

:::tip[2 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `label` | Content | `text` | ✅ Native | set from $label |
| `link` | Content | `text` | ✅ Native | set from $link (href) |
| `target` | Content | `switch` | ⚠️ Gap | hardcoded '_self'; source anchor target=_blank is trivially detectable but not read |
| `icon` | Content | `icon` | ✅ Native | inline svg icon_svg or icon-font class via icon_value |
| `icon_position` | Content | `select` | ✅ Native | before/after from $icon_pos |
| `style` | Styling | `button-style-picker` | ✅ Native | button_preset_for (color preset) or btn-link for text links |
| `size` | Styling | `button-style-picker` | ✅ Native | button_preset_for size slug |
| `shape` | Styling | `image-picker` | ⚠️ Gap | border-radius is captured/reproduced via CSS but not mapped to this shape option |
| `width` | Styling | `multi-picker` | ✅ Native | w-100 full-width when w-full/block width:100% detected |
| `alignment` | Styling | `select` | ✅ Native | from climbed $align or group wrapper resolve_style_options |
| `state` | Styling | `select` | ⚪ Unmapped | always ''; active/disabled state not derived |
| `hover_animation` | Styling | `button-hover-animation` | ✅ Native | classify_hover_animation → .btnfx-* preset from captured hover |
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
