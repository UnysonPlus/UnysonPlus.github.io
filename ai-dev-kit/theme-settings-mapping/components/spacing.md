---
title: Spacing — converter mapping
sidebar_label: Spacing
slug: /theme-settings-mapping/components/spacing
description: How the UnysonPlus Site Converter derives the Spacing preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Spacing — converter mapping

**Theme Settings → Components → Spacing** · ✅ Populated

Spacing Scale holds the values behind the Bootstrap-style margin / padding utilities. The converter keeps the default scale and appends the source’s own meaningful off-scale spacing, so a converted site carries a real spacing rhythm instead of the theme default.

Full reference: **[Spacing](/theme/components/spacing)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-spacing.php` |
| **Converter method** | `FW_Site_Converter_Stitch::build_spacing_scale()` |
| **Storage key** | `spacing_scale` |
| **Produces** | a full set of utilities per entry — `.m-{name}`, `.p-{name}`, `.mt-{name}`, `.mx-{name}`, etc. |

The converter starts from the Bootstrap-aligned default scale (kept in sync here so it’s self-contained in the capture / bundle path) and harvests the source’s arbitrary spacing tokens — the `p-*` / `m-*` families and the measured fold — appending only **meaningful** off-scale values (≥ 2.5rem / 40px, to avoid a flood of 1px odds) as exact `[NNpx]` entries, deduped and sorted. Small gutters are excluded here — they feed the dedicated **[Gaps](./gaps.md)** scale instead.

## Coverage

**2/2 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 0 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Spacer (`spacing_scale` box)** | | | |
| `name` | `text` | ✅ Native | Base scale slugs (`0`–`6`…) plus off-scale source values as `[NNpx]` |
| `size` | `text` | ✅ Native | The default scale, plus meaningful off-scale spacing (≥ 2.5rem / 40px) harvested from the markup + measured fold (exact `[NNpx]`) |

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
