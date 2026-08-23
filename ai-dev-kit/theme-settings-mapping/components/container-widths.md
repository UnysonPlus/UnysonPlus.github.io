---
title: Container Widths — converter mapping
sidebar_label: Container Widths
slug: /theme-settings-mapping/components/container-widths
description: How the UnysonPlus Site Converter derives the Container Widths preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Container Widths — converter mapping

**Theme Settings → Components → Container Widths** · ✅ Populated

Named content-band widths gathered from the source (`build_container_width_presets`) — Narrow / Medium / Wide plus any distinct widths the site uses, so converted sections reference **shared named widths** instead of one-off numbers.

## Coverage

**2/2 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 0 auto.

| Aspect | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `Narrow / Medium / Wide` | `unit` | ✅ Native | The recurring content widths, named |
| `distinct source widths` | `unit` | ✅ Native | Any extra widths the source uses, added as named presets |

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
