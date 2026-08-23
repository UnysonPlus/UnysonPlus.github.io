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

Gap Scale holds the values every column-gap dropdown offers — the per-section Gap field and the site-wide Default Gap. The converter keeps the default scale and appends the source’s column / grid gutters, keeping off-scale ones **exact**.

Full reference: **[Gaps](/theme/components/spacing)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-spacing.php (Gaps group)` |
| **Converter method** | `FW_Site_Converter_Stitch::build_gap_scale()` |
| **Storage key** | `gap_scale · default_gap` |
| **Produces** | the gap values offered in every column-gap dropdown (Section Gap + Default Gap) |

The converter starts from the extended default gap scale (0–6 plus `[32px]` / `[40px]`) and appends any off-scale gutter the source uses — Tailwind arbitrary gap classes (`gap-[20px]`, `gap-x-[18px]`, `space-x-[Npx]`) and measured gutters — as exact `[NNpx]` entries (**no snap-to-nearest**), deduped. The site-wide **Default Gap** selects are left at the theme default.

## Coverage

**2/5 fields derived from the source** (40%) — 🟡 0 via CSS · ⚪ 3 default/manual · ⚙️ 0 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Gap (`gap_scale` box)** | | | |
| `name` | `text` | ✅ Native | Base slugs plus off-scale gutters as exact `[NNpx]` |
| `size` | `text` | ✅ Native | The default gap scale plus the source’s column / grid gutters, off-scale kept exact |
| **Default Gap (`group_gaps`)** | | | |
| `default_gap` | `short-select` | ⚪ Unmapped | Site-wide row gap — left at the theme default |
| `default_gap_x` | `short-select` | ⚪ Unmapped | Left default |
| `default_gap_y` | `short-select` | ⚪ Unmapped | Left default |

:::note[Off-scale gutters stay exact]
A source `gap-[20px]` lands as a `[20px]` entry — not snapped to the nearest scale step — so the converted layout matches the source’s spacing precisely. The named steps (0–6) still cover the common gutters.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
