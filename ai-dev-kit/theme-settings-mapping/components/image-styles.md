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

Radius / circle / aspect / filter from the source’s images (`build_image_styles`) → reusable image treatments.

Full reference: **[Image Styles](/theme/components/image-styles)** (how it’s coded + examples).

## Coverage

**4/4 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 0 auto.

| Aspect | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `radius` | `unit` | ✅ Native | Corner radius |
| `circle` | `toggle` | ✅ Native | Fully-round crop when the source uses it |
| `aspect ratio` | `ratio` | ✅ Native | Fixed aspect when detected |
| `filter` | `css-filter` | ✅ Native | Grayscale / brightness etc. when present |

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
