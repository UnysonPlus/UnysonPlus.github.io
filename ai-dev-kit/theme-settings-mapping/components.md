---
title: Components — Theme Settings mapping
sidebar_label: Components
slug: /theme-settings-mapping/components
description: How the UnysonPlus Site Converter fills the Theme Settings Components tab (`button_presets · box_presets · text_styles · theme_colors · image_styles · section_style_presets · …`) from a source design — option by option, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Components — Theme Settings mapping

**Theme Settings → Components** · storage key `button_presets · box_presets · text_styles · theme_colors · image_styles · section_style_presets · …`

Components is where the converter reproduces the source’s **design system** most heavily. Almost every preset library is **derived** from the captured DOM + computed styles and written as a fully-editable **addable-box** (not baked CSS), so the converted site carries real, reusable presets instead of the theme defaults.

## Coverage

**11/14 mapped from the source** (79%) — 🟡 0 via CSS · ⚪ 3 default/manual · ⚙️ 0 auto.

| Option | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `button_presets` | `addable-box` | ✅ Native | Button skin — fill, radius, padding, size — from the source’s real buttons (`build_button_presets`); a Large size preset also repoints the header CTA → [Buttons](/components/buttons) |
| `box_presets` | `addable-box` | ✅ Native | Card / box skins clustered from the source (`build_box_presets`) → [Box Presets](/components/box-presets) |
| `text_styles · font_sizes` | `addable-box` | ✅ Native | Display scale + eyebrow distilled from the source headings (`build_text_styles`) → [Text Styles](/components/text-styles) |
| `theme_colors` | `addable-box` | ✅ Native | The source’s brand palette → editable [Color Presets](/components/color-presets) |
| `icon_badge_presets` | `addable-box` | ✅ Native | The source’s icon-in-a-tile pattern → [Icon Badges](/components/icon-badges) |
| `image_styles` | `addable-box` | ✅ Native | Radius / circle / aspect / filter from the source’s images → [Image Styles](/components/image-styles) |
| `section_style_presets` | `addable-box` | ✅ Native | Reusable band skins clustered from the source’s sections → [Section Styles](/components/section-styles) |
| `container_width_presets` | `addable-box` | ✅ Native | Named content-band widths (Narrow / Medium / Wide + any distinct widths the source uses) so sections share named widths |
| `background_patterns` | `addable-box` | ✅ Native | Captured SVG / gradient decorative tiles (`build_background_patterns`) → [Background Patterns](/components/background-patterns) |
| `spacing_scale` | `scale` | ✅ Native | The source’s spacing steps → an editable scale (`build_spacing_scale`) → [Spacing](/components/spacing) |
| `gap_scale` | `scale` | ✅ Native | The source’s column / grid gutters → editable gap scale, off-scale gutters kept exact → [Spacing → Gaps](/components/spacing) |
| `table_presets` | `addable-box` | ⚪ Unmapped | Default — set by hand → [Table Presets](/components/table-presets) |
| `shape_dividers` | `addable-box` | ⚪ Unmapped | Decorative — set by hand → [Shape Dividers](/components/shape-dividers) |
| `element_designs` | `addable-box` | ⚪ Unmapped | Saved element skins — created in the builder → [Element Designs](/components/element-designs) |

Each library links to its full reference under **[The Theme → Components](/components)**. These presets are what the converted **elements** then consume — a button on a page points at a derived Button preset, a card at a derived Box preset, a heading at a derived Text Style — so editing the preset restyles every element that uses it, site-wide.

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Theme Settings Mapping](./index.md)
