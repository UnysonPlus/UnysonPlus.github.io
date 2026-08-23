---
title: Gaps — converter mapping
sidebar_label: Gaps
slug: /theme-settings-mapping/components/gaps
description: How the UnysonPlus Site Converter derives the Gaps preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Gaps — converter mapping

**Theme Settings → Components → Gaps** · ✅ Populated

The source’s column / grid gutters → an editable gap scale (`build_gap_scale`) — mirrors the extended default and appends any off-scale gutter **exactly** (a `gap-[20px]` gets an exact entry, no snap).

Full reference: **[Gaps](/theme/components/spacing)** (how it’s coded + examples).

## Coverage

**2/2 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 0 auto.

| Aspect | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `gap steps` | `scale` | ✅ Native | The default scale plus the source’s gutters |
| `off-scale gutter` | `exact` | ✅ Native | Non-standard gutters kept exact (no snap-to-nearest) |

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
