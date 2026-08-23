---
title: Background Patterns — converter mapping
sidebar_label: Background Patterns
slug: /theme-settings-mapping/components/background-patterns
description: How the UnysonPlus Site Converter derives the Background Patterns preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Background Patterns — converter mapping

**Theme Settings → Components → Background Patterns** · ✅ Populated

Captured SVG / gradient decorative tiles (`build_background_patterns`, the PHP parity of the JS `backgroundPatterns()`); the mapper injects the matching overlay onto its section.

Full reference: **[Background Patterns](/theme/components/background-patterns)** (how it’s coded + examples).

## Coverage

**1/1 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 1 auto.

| Aspect | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `captured tile` | `svg / gradient` | ✅ Native | The decorative pattern lifted from the source |
| `placement` | `overlay` | ⚙️ Auto | The mapper wires the pattern onto the section that used it |

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
