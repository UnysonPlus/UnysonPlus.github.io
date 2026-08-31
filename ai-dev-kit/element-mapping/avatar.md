---
title: Avatar — converter mapping
sidebar_label: Avatar
slug: /element-mapping/avatar
description: How the UnysonPlus Site Converter maps a source avatar into the Avatar (`avatar`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Avatar — converter mapping

Source `avatar` → [`avatar`](/shortcodes/components/avatar). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 65 |
| **Recognizer** | `avatar` |
| **Matches when** | An overlapping avatar stack — a row of small round profile images with a "+N" counter (a "trusted by" / "join N customers" cluster). |
| **Becomes** | [`avatar`](/shortcodes/components/avatar) |
| **Recognizer block shape** | `{ urls:[…], extra_count }` |
| **Fallback** | Degrades to `code_block`. |

Built in group mode: each source image becomes a person in the stack, and a "+N" more count is carried. Names are placeholders (the source rarely names each face), and shape / size / colours use defaults.

## Option coverage

**1/16 options mapped natively** (6%) — 🟡 0 via CSS · ⚠️ 0 gaps (derivable, not yet) · ⚪ 15 default · ⚙️ 1 auto.


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `mode_settings` | Content | `multi-picker` | ✅ Native | derived-from captured avatar image URLs → group.people[] (image/url), max_visible + extra_count |
| `design` | Design | `image-picker` | ⚪ Unmapped | hardcoded 'bordered'; not derived from source |
| `shape` | Design | `select` | ⚪ Unmapped | hardcoded 'circle'; not derived |
| `size` | Design | `slider` | ⚪ Unmapped | hardcoded 40px; not derived |
| `show_status` | Design | `switch` | ⚪ Unmapped | no source signal; UnysonPlus-specific status dot |
| `show_label` | Design | `switch` | ⚪ Unmapped | hardcoded 'no'; not derived |
| `initials_color_mode` | Design | `select` | ⚪ Unmapped | not set; UnysonPlus-specific |
| `ring_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set |
| `initials_bg` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set |
| `initials_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set |
| `label_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set |
| `counter_bg` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set |
| `counter_color` | Style | `predefined-colors-color-picker-compact` | ⚪ Unmapped | not set |
| `font_size_preset` | Style | `select` | ⚪ Unmapped | not set |
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
