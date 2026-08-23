---
title: Layout — Theme Settings mapping
sidebar_label: Layout
slug: /theme-settings-mapping/layout
description: How the UnysonPlus Site Converter fills the Theme Settings Layout tab (`general_layout`) from a source design — option by option, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Layout — Theme Settings mapping

**Theme Settings → General → Layout** · storage key `general_layout`

The Layout tab controls the overall canvas — site width, container width, spacing density, roundness. The converter carries the **content container width** so body sections match the source; the rest is left for you to tune.

## Coverage

**1/7 mapped from the source** (14%) — 🟡 1 via CSS · ⚪ 5 default/manual · ⚙️ 0 auto.

| Option | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `layout_container_width` | `responsive → unit-input` | ✅ Native | Source content max-width → the desktop container width |
| `site_width_mode` | `multi-picker` | ⚪ Unmapped | Default (full) |
| `layout_container_gutter` | `unit-input` | ⚪ Unmapped | Default |
| `layout_section_spacing` | `radio` | ⚪ Unmapped | Default (cozy) |
| `layout_roundness` | `radio` | ⚪ Unmapped | Default (subtle) |
| `layout_prose_width` | `unit-input` | ⚪ Unmapped | Default |
| `site_background` | `background-pro` | 🟡 Via CSS | Written by the background detector — see the Backgrounds tab |

The source’s content max-width is written to `general_layout.layout_container_width` (the desktop value) so converted body sections finally line up with the source. Width mode, gutter, content density and roundness are left at the theme defaults.

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Theme Settings Mapping](./index.md)
