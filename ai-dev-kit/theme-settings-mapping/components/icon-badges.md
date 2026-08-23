---
title: Icon Badges — converter mapping
sidebar_label: Icon Badges
slug: /theme-settings-mapping/components/icon-badges
description: How the UnysonPlus Site Converter derives the Icon Badges preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Icon Badges — converter mapping

**Theme Settings → Components → Icon Badges** · ✅ Populated

The source’s icon-in-a-tile pattern (`build_icon_badge_presets`) → editable badge presets (the coloured square/circle behind a feature icon).

Full reference: **[Icon Badges](/theme/components/icon-badges)** (how it’s coded + examples).

## Coverage

**4/4 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 0 auto.

| Aspect | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `tile background` | `colour` | ✅ Native | The badge fill |
| `size` | `unit` | ✅ Native | Tile size |
| `radius` | `unit` | ✅ Native | Square / rounded / circle |
| `icon colour` | `colour` | ✅ Native | The glyph colour |

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
