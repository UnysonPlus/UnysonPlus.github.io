---
title: Section Styles — converter mapping
sidebar_label: Section Styles
slug: /theme-settings-mapping/components/section-styles
description: How the UnysonPlus Site Converter derives the Section Styles preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Section Styles — converter mapping

**Theme Settings → Components → Section Styles** · ✅ Populated

A Section Style is a reusable band **skin** — background, on-band text / heading / link colours, border and corner radius — that produces a `.section--{slug}` class you pick on a Section (Layout → Section Variant). The converter clusters the source’s distinctive bands into presets, filling the fill + colours + border + radius.

Full reference: **[Section Styles](/theme/components/section-styles)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-section-styles.php` |
| **Converter method** | `FW_Site_Converter_Stitch::build_section_style_presets()` |
| **Storage key** | `section_style_presets` |
| **Produces** | a `.section--{slug}` class per preset — pick it on a Section (Layout → Section Variant) |

Only a band that **deviates** from the page base (its own fill, border, radius, or on-dark text) becomes a preset; near-identical bands cluster into one. A text or heading colour is carried **only** when the band is dark or the colour differs from the page base — so a light band that just matches the page stays clean. Per-section **padding** stays a native Section option, so presets leave it empty.

## Coverage

**6/8 fields derived from the source** (75%) — 🟡 0 via CSS · ⚪ 2 default/manual · ⚙️ 2 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Skin (`section_style_presets` box)** | | | |
| `style_name` | `text` | ✅ Native | Name → `.section--{slug}`, shown in the Section Variant dropdown |
| `background` | `background-pro` | ✅ Native | The band fill (colour / gradient / image) |
| `text_color` | `compact color` | ✅ Native | Carried when the band is dark, or its text differs from the page base |
| `heading_color` | `compact color` | ✅ Native | Carried when the band is dark, or its headings differ from base |
| `link_color` | `compact color` | ⚪ Unmapped | Left default |
| `border` | `multi-inline (width / style / color)` | ✅ Native | Carried when the band has a border edge |
| `border_sides` | `image-picker (multi)` | ⚙️ Auto | Always all four edges |
| `border_extent` | `multi-picker` | ⚙️ Auto | Always Full width |
| `border_radius` | `unit-input` | ✅ Native | Carried when the band has a corner radius |
| `padding` | `spacing (per-side)` | ⚪ Unmapped | Left empty — a Section’s own Top/Bottom Spacing controls it (see note) |

:::note[Presets are the skin; padding stays on the Section]
A Section Style carries the reusable *look* (fill, colours, border, radius). The band’s **vertical spacing** is deliberately a per-Section control (Layout → Top/Bottom Spacing) — it varies section to section even within one skin — so the converter leaves the preset’s Padding empty and sets spacing on each Section instead.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
