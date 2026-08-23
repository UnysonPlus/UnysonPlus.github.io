---
title: Components — Theme Settings mapping
sidebar_label: Overview
slug: /theme-settings-mapping/components
description: How the UnysonPlus Site Converter fills the Theme Settings Components tab — a page per preset library (Buttons, Box Presets, Text Styles, Colours…) with per-library coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Components — Theme Settings mapping

**Theme Settings → Components** · storage key `button_presets · box_presets · text_styles · theme_colors · image_styles · section_style_presets · …`

Components is where the converter reproduces the source’s **design system** most heavily. It’s a single Theme Settings tab, but it holds many **preset libraries** — buttons, boxes, text styles, colours, badges, image styles, section skins, spacing — and the converter **derives almost all of them** from the captured DOM + computed styles, writing each as a fully-editable **addable-box** (not baked CSS).

## Coverage

**46/54 derived from the source** (85%) across 11 preset libraries — 🟡 0 via CSS · ⚪ 8 default/manual · ⚙️ 5 auto.

| Preset library | Coverage | Derived | Full reference |
| --- | --- | --- | --- |
| [Buttons](./buttons.md) | ✅ Populated | ✅ 18 native · 72% | [reference](/theme/components/buttons) |
| [Box Presets](./box-presets.md) | ✅ Populated | ✅ 5 native · 100% | [reference](/theme/components/box-presets) |
| [Text Styles](./text-styles.md) | ✅ Populated | ✅ 5 native · 83% | [reference](/theme/components/text-styles) |
| [Color Presets](./color-presets.md) | ✅ Populated | ✅ 1 native · 100% | [reference](/theme/components/color-presets) |
| [Icon Badges](./icon-badges.md) | ✅ Populated | ✅ 4 native · 100% | [reference](/theme/components/icon-badges) |
| [Image Styles](./image-styles.md) | ✅ Populated | ✅ 4 native · 100% | [reference](/theme/components/image-styles) |
| [Section Styles](./section-styles.md) | ✅ Populated | ✅ 3 native · 100% | [reference](/theme/components/section-styles) |
| [Container Widths](./container-widths.md) | ✅ Populated | ✅ 2 native · 100% | — |
| [Background Patterns](./background-patterns.md) | ✅ Populated | ✅ 1 native · 100% | [reference](/theme/components/background-patterns) |
| [Spacing](./spacing.md) | ✅ Populated | ✅ 1 native · 100% | [reference](/theme/components/spacing) |
| [Gaps](./gaps.md) | ✅ Populated | ✅ 2 native · 100% | [reference](/theme/components/spacing) |

These presets are what the converted **elements** then consume — a button points at a derived Button preset, a card at a derived Box preset, a heading at a derived Text Style — so editing one preset restyles every element that uses it, site-wide. Each library below has its own page here (what the converter fills) and a full reference under **[The Theme → Components](/theme/components)** (how it’s coded + examples).

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Theme Settings Mapping](../index.md)
