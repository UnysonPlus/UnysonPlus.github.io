---
title: Image Styles — converter mapping
sidebar_label: Image Styles
slug: /theme-settings-mapping/components/image-styles
description: How the UnysonPlus Site Converter derives the Image Styles preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Image Styles — converter mapping

**Theme Settings → Components → Image Styles** · ✅ Populated

An Image Style is a reusable image treatment applied as a scoped `.imgs-{slug}` class — crop / aspect, corner radius or circle, shape masks, a CSS filter (incl. a duotone tint), and a legibility scrim. The converter reads the source’s images, clusters them by shape + crop + filter, and derives named styles.

Full reference: **[Image Styles](/theme/components/image-styles)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-image-styles.php` |
| **Converter method** | `FW_Site_Converter_Stitch::build_image_styles()` |
| **Storage key** | `image_styles` |
| **Produces** | a `.imgs-{slug}` class per style — pick it on any element with an image (Styling → Image Style) |

The converter clusters the source images by **(radius-or-circle · aspect · filter)**, names each cluster by its dominant trait (Circle / Monochrome / Square / Wide / Portrait / Rounded), and fills the crop + radius/circle + filter. Decorative **masks** (hexagon / blob / arch…), the **duotone tint**, the **scrim** and one-off CSS are left for you to add — they’re rarely reproducible from a photo alone.

## Coverage

**5/9 fields derived from the source** (56%) — 🟡 0 via CSS · ⚪ 4 default/manual · ⚙️ 0 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Style (`image_styles` box)** | | | |
| `style_name` | `text` | ✅ Native | Auto-named by the dominant trait — Circle / Monochrome / Square / Wide / Portrait / Rounded |
| `aspect` | `select` | ✅ Native | The source crop ratio (object-fit: cover); Auto keeps native |
| `radius` | `text` | ✅ Native | Corner radius (blank when the image is a circle) |
| `mask` | `multi-picker` | ✅ Native | `circle` when the source image is round, else `none`; decorative masks (hexagon / blob / arch…) aren’t auto-detected |
| `filter` | `select` | ✅ Native | grayscale / sepia / contrast / saturate / blur, from the source |
| `duo_color` | `compact color` | ⚪ Unmapped | Only used by the Duotone filter — set by hand |
| `scrim` | `select` | ⚪ Unmapped | Legibility scrim — set by hand (default none) |
| `scrim_color` | `compact color` | ⚪ Unmapped | Set by hand |
| `custom_css` | `code-editor ({{SELECTOR}})` | ⚪ Unmapped | Not derived — one-off image CSS by hand |

:::note[What’s detected vs. left manual]
The converter reproduces the treatments it can read off the rendered image — the **crop ratio**, a **circle / rounded** corner, and a **CSS filter** (grayscale, sepia, etc.). It does **not** guess decorative **shape masks**, a **duotone** tint colour, or a caption **scrim**, since those aren’t reliably inferable — pick them on the preset if the source uses them.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
