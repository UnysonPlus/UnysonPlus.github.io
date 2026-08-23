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

The source’s brand palette (`build_color_presets`, from the extracted tokens + the DOM) → editable Components colours the whole site references by name.

Full reference: **[Color Presets](/theme/components/color-presets)** (how it’s coded + examples).

## Coverage

**1/1 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 1 auto.

| Aspect | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `brand swatches` | `colour` | ✅ Native | The distinct brand colours found in the source |
| `preset names` | `label` | ⚙️ Auto | Named automatically (Primary, Accent…) |

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
