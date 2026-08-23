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

Container Widths is a library of reusable **named content-band widths** you pick on a Section (Layout → Container Width) to constrain its content narrower than the global width. The converter gathers the source’s distinct content max-widths and adds them here, so a whole converted site shares **named** widths instead of repeating a raw number.

Full reference: **[Container Widths](/theme/components/section-styles)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-section-styles.php (below Section Styles)` |
| **Converter method** | `FW_Site_Converter_Stitch::build_container_width_presets()` |
| **Storage key** | `container_width_presets` |
| **Produces** | a named content-band width per preset — pick it on a Section (Layout → Container Width) |

The converter collects every distinct content max-width the source uses, snaps each to the nearest **standard** step within ±10px — Small 640 / Prose 672 / Narrow 768 / Medium 896 / Wide 1024 / Wide L 1152 / Wide XL 1280 / Wide XXL 1440 — and names it accordingly; a width that isn’t standard becomes a `Content NNN` preset. Sections then reference the shared named width, so changing it once updates every section that uses it.

## Coverage

**2/2 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 0 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Width (`container_width_presets` box)** | | | |
| `width_name` | `text` | ✅ Native | Named from the source width — the standard map (Small / Prose / Narrow / Medium / Wide / …) or `Content NNN` for a non-standard width |
| `width` | `unit-input` | ✅ Native | The source’s distinct content max-width |

:::info[Why named widths matter]
Reusing **named** widths (rather than a one-off px value per section) means a converted site behaves like a hand-built one: adjust “Medium” once in Theme Settings and every Medium section re-flows. The three defaults (Narrow / Medium / Wide) match the built-ins, so sections that resolve to those render unchanged.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
