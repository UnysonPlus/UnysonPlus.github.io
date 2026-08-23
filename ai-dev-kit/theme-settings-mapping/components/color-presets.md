---
title: Color Presets — converter mapping
sidebar_label: Color Presets
slug: /theme-settings-mapping/components/color-presets
description: How the UnysonPlus Site Converter derives the Color Presets preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Color Presets — converter mapping

**Theme Settings → Components → Color Presets** · ✅ Populated

Color Presets is the site **palette** — the swatches every Text Color / Background Color dropdown offers, and the colours the Button / Box / Table presets reference. The converter extracts the source’s **brand palette** and names each role (Primary / Secondary / Accent, plus Ink / Dark / Light), then merges in any non-colliding default swatches.

Full reference: **[Color Presets](/theme/components/color-presets)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-color.php` |
| **Converter method** | `FW_Site_Converter_Stitch::build_color_presets()` |
| **Storage key** | `theme_colors` |
| **Produces** | `.text-{slug}` / `.bg-{slug}` classes and a `--color-{slug}` CSS variable per swatch |

The converter reads the brand colours from the extracted design **tokens** and the **DOM** — including a distinct **Accent** lifted from hero gradients (e.g. the yellow half of a green→yellow gradient) so the Accent role isn’t defaulted to a stock colour the source never used. It assigns the role names, then prepends the default palette **minus** any default whose slug collides with a brand role — so there is exactly one Primary, one Secondary, and so on.

## Coverage

**1/1 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 1 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Swatch (`theme_colors` box)** | | | |
| `name` | `text` | ⚙️ Auto | Role-named automatically — Primary / Secondary / Accent (from brand tokens + hero gradients) plus Ink / Dark / Light |
| `color` | `color-picker` | ✅ Native | The brand hex extracted from the source (design tokens + DOM) |

:::note[Why the swatch value is “native” but the name is “auto”]
The **colour** of each swatch is a real signal — the brand hex pulled from the source. The **name** is assigned by the converter (Primary / Secondary / Accent / Ink …) rather than read from the source, so it’s marked *auto*. The slug that names the output class + CSS variable is derived from that name the same way `css-tokens.php` does, so `.text-primary` / `--color-primary` line up across the whole site.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
