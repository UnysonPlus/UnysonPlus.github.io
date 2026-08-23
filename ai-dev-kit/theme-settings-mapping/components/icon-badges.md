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

An Icon Badge is a reusable **shaped tile for an icon** — a circle / rounded / square / hexagon at a set size, with a tile fill, a centred glyph (its own colour + size), border and box-shadow. The converter detects the source’s icon-in-a-tile pattern, clusters the distinct tiles, and rebuilds the Default-state skin plus the geometry.

Full reference: **[Icon Badges](/theme/components/icon-badges)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-icon-badges.php (schema in framework/includes/option-types/icon-badge-presets/)` |
| **Converter method** | `FW_Site_Converter_Stitch::build_icon_badge_presets()` |
| **Storage key** | `icon_badge_presets` |
| **Produces** | a `.iconb-{slug}` class per preset — pick it on an Icon Box (Styling → Icon Badge Preset) |

The converter finds the source’s icon-in-a-tile pattern and fills the **Default** state (tile fill, glyph colour, border) plus the geometry — **shape**, **tile size**, **icon size** (derived as ≈ 50% of the tile), and a **corner radius** for the Rounded shape (Circle is always 50%). The **Hover** state, box-shadow and hover effects are left at the theme default.

## Coverage

**10/14 fields derived from the source** (71%) — 🟡 0 via CSS · ⚪ 4 default/manual · ⚙️ 2 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Preset · Identity (`shared_top`)** | | | |
| `preset_name` | `text` | ✅ Native | The badge name — from the clustered tile → the `.iconb-{slug}` class |
| `slug` | `unique` | ⚙️ Auto | Auto from the name → the `.iconb-{slug}` class suffix |
| **Preset · State: Default** | | | |
| `background` | `background-pro` | ✅ Native | The tile fill |
| `icon_color` | `compact color` | ✅ Native | The centred glyph colour |
| `border_style` | `short-select` | ✅ Native | `solid` when the source tile has a border |
| `border_width` | `unit-input` | ✅ Native | Carried when the source tile has a border |
| `border_color` | `compact color` | ✅ Native | Carried when the source tile has a border |
| `box_shadow` | `box-shadow` | ⚪ Unmapped | Left at the theme default |
| **Preset · State: Hover** | | | |
| `(all fields)` | `—` | ⚪ Unmapped | Left empty → inherit Default |
| **Preset · Shared (`shared_bottom`)** | | | |
| `badge_shape` | `short-select` | ✅ Native | circle / rounded / square / hexagon — from the source tile |
| `badge_size` | `unit-input` | ✅ Native | The tile’s width & height |
| `icon_size` | `unit-input` | ✅ Native | Derived as ≈ 50% of the tile size |
| `border_radius` | `unit-input` | ✅ Native | For the Rounded shape (Circle is always 50%) |
| `transition` | `short-text (ms)` | ⚙️ Auto | Fixed at `200` ms |
| `hover_fx` | `multi-select` | ⚪ Unmapped | Not derived |
| `custom_css` | `code-editor ({{SELECTOR}})` | ⚪ Unmapped | Not derived |

:::note[Icon size follows the tile]
The converter sets the glyph **Icon Size** to about **half** the tile’s **Badge Size** (a common, safe ratio) rather than measuring the source glyph separately — so a 48px tile gets a 24px icon. Adjust it on the preset if the source uses a different ratio.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
