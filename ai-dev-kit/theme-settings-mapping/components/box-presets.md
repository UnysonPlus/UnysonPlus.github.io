---
title: Box Presets — converter mapping
sidebar_label: Box Presets
slug: /theme-settings-mapping/components/box-presets
description: How the UnysonPlus Site Converter derives the Box Presets preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Box Presets — converter mapping

**Theme Settings → Components → Box Presets** · ✅ Populated

Reusable card / box skins clustered from the source (`build_box_presets`) — every repeated “card” look becomes one editable Box preset.

Full reference: **[Box Presets](/theme/components/box-presets)** (how it’s coded + examples).

## Coverage

**5/5 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 0 auto.

| Aspect | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `background` | `colour` | ✅ Native | Card background fill |
| `border` | `border` | ✅ Native | Width / style / colour |
| `radius` | `unit` | ✅ Native | Corner radius |
| `shadow` | `box-shadow` | ✅ Native | Drop shadow |
| `padding` | `box` | ✅ Native | Inner padding |

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
