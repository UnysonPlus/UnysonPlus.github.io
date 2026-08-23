---
title: Box Presets — converter mapping
sidebar_label: Box Presets
slug: /theme-settings-mapping/components/box-presets
description: How the UnysonPlus Site Converter derives the Box Presets preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Box Presets — converter mapping

**Theme Settings → Components → Box Presets** · ✅ Populated

A Box Preset is a reusable **card skin** — background fill, border, corner radius, padding, box-shadow, and a hover treatment — that any Column, Table frame or Countdown can point at. The converter clusters the source’s repeated “card” looks into named presets and fills the fill + border + radius + shadow, plus the hover skin and hover effects.

Full reference: **[Box Presets](/theme/components/box-presets)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-box.php (schema in framework/includes/option-types/border-presets/)` |
| **Converter method** | `FW_Site_Converter_Stitch::build_box_presets()` |
| **Storage key** | `border_presets` |
| **Produces** | a `.boxp-{slug}` class per preset — pick it on a Column (Styling → Box Preset), a Table (Table Options → Frame), or a Countdown |

Each preset carries a **Default** and a **Hover** state (the fill + border skin), shared geometry (corner radius, sides, padding), a transition, and a hover-effects list. The converter only makes a preset for a card that **deviates** from the page base; near-identical cards cluster into one, so you get a handful of named card styles instead of dozens of one-offs.

## Coverage

**11/13 fields derived from the source** (85%) — 🟡 0 via CSS · ⚪ 2 default/manual · ⚙️ 4 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Preset · Identity (`shared_top`)** | | | |
| `preset_name` | `text` | ✅ Native | The card name — clustered from the source’s repeated card looks (or `Box <hash>`) → the `.boxp-{slug}` class |
| `slug` | `unique` | ⚙️ Auto | Auto from the name → the `.boxp-{slug}` class suffix |
| **Preset · State: Default** | | | |
| `background` | `background-pro (color / gradient / image)` | ✅ Native | The card’s background fill |
| `border_style` | `short-select` | ✅ Native | `solid` when the source card has a border |
| `border_width` | `unit-input` | ✅ Native | Carried when the source card has a border |
| `border_color` | `compact color` | ✅ Native | Carried when the source card has a border |
| `box_shadow` | `box-shadow (X/Y/blur/spread/color/inset)` | ✅ Native | Carried when the source card has a drop shadow |
| **Preset · State: Hover** | | | |
| `background` | `background-pro` | ✅ Native | The hover fill, when the card changes on hover |
| `border_color` | `compact color` | ✅ Native | The hover border colour, when present |
| `box_shadow` | `box-shadow` | ✅ Native | The hover shadow, when present |
| `border_style · border_width` | `—` | ⚪ Unmapped | Left at the Default value on hover |
| **Preset · Shared (`shared_bottom`)** | | | |
| `border_radius` | `unit-input` | ✅ Native | Corner radius from the source card |
| `border_sides` | `short-select` | ⚙️ Auto | Always `all` — the converter doesn’t infer per-side borders |
| `padding` | `spacing (per-side)` | ⚪ Unmapped | Left empty — the Column’s own Margin & Padding controls it (see note) |
| `transition` | `short-text (ms)` | ⚙️ Auto | Fixed at `200` ms |
| `hover_fx` | `multi-select` | ✅ Native | Derived: `lift` (translate-Y) and/or `glow` (shadow) from the source’s hover |
| `custom_css` | `code-editor ({{SELECTOR}})` | ⚙️ Auto | Tier-3 effects the native fields can’t express — a frosted `backdrop-filter`, a hover `scale` — are injected here |

:::note[Padding is intentionally left to the Column]
The converter leaves the preset’s **Padding** empty. A card’s inner padding is usually set by the Column it’s on (Styling → Margin & Padding), which overrides the preset — so filling it here would fight the column. The preset stays a pure *skin*.
:::

:::info[Tier-3 effects go to Custom CSS]
A native `hover_fx` covers the common hovers — **`lift`** (a translate-Y) and **`glow`** (a shadow). Effects the native fields can’t express — a frosted `backdrop-filter`, or a hover **`scale`** — are injected into the preset’s **Custom CSS** instead, so the look is reproduced without a bespoke field.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
