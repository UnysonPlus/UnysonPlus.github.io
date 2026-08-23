---
title: Buttons — converter mapping
sidebar_label: Buttons
slug: /theme-settings-mapping/components/buttons
description: How the UnysonPlus Site Converter derives the Buttons preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Buttons — converter mapping

**Theme Settings → Components → Buttons** · ✅ Populated

The Buttons library holds three axes: **Button Presets** (the *skin* — colour, gradient, border, shadow, font, per state), **Sizes** (the *dimensions* — font-size, padding, radius, height), and **Hover Animations** (CSS effects). The converter reads the source’s real buttons and rebuilds the skin + size axes; each preset renders a live preview and produces a `.btn-{slug}` class the Button shortcode points at.

Full reference: **[Buttons](/theme/components/buttons)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-buttons.php (schema in framework/includes/option-types/button-presets/)` |
| **Converter method** | `FW_Site_Converter_Stitch::build_button_presets()` |
| **Storage key** | `button_colors · button_sizes · button_animations` |
| **Produces** | a `.btn-{slug}` class per preset (e.g. `.btn-primary`) + a `.btn-{size}` per size |

The skin axis carries **colour-family properties only** (bg / text / border / shadow / transform); dimensional properties (font-size, padding, radius, height) deliberately live on the **Sizes** axis, so a colour and a size compose independently. The converter clusters the source’s button variants into named presets (Primary / Secondary / Accent…) and its distinct sizes into S / M / L.

## Coverage

**18/25 fields derived from the source** (72%) — 🟡 0 via CSS · ⚪ 7 default/manual · ⚙️ 3 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Preset · Identity (`shared_top`)** | | | |
| `color_name` | `text` | ✅ Native | The preset name — clustered from the source’s button variants (Primary / Secondary / Accent…) |
| `slug` | `unique` | ⚙️ Auto | Auto from the name (`sanitize_title_with_dashes`) → the `.btn-{slug}` class suffix |
| `font` | `typography` | ✅ Native | The button font — **identity only** (family / variation / script / letter-spacing). Carried when it **deviates** from the body base; otherwise left to inherit |
| **Preset · State: Default** | | | |
| `bg_color` | `compact color` | ✅ Native | The button’s computed background fill |
| `text_color` | `compact color` | ✅ Native | The button’s computed text colour |
| `gradient` | `gradient-v2` | ⚪ Unmapped | Gradients are flattened into `bg_color`; this field is left blank |
| `text_transform` | `short-select` | ✅ Native | e.g. `uppercase` — carried so Theme Settings shows the real casing (not baked into CSS) |
| `border_style` | `select` | ✅ Native | Carried when the source button has a border |
| `border_color` | `compact color` | ✅ Native | Carried when the source button has a border |
| `border_width` | `unit-input` | ✅ Native | Carried when the source button has a border |
| `box_shadow` | `box-shadow (X/Y/blur/spread/color/inset)` | ✅ Native | Carried when the source button has a drop shadow |
| **Preset · State: Hover** | | | |
| `bg_color` | `compact color` | ✅ Native | The hover background (a gradient hover is flattened to an `rgba()` fill) |
| `text_color` | `compact color` | ✅ Native | The hover text colour, when it changes |
| `border_color` | `compact color` | ✅ Native | The hover border colour, when present |
| `gradient · text_transform · border_* · box_shadow` | `—` | ⚪ Unmapped | Left at the Default/theme value on hover |
| **Preset · States: Active / Focus / Disabled** | | | |
| `(all fields)` | `—` | ⚪ Unmapped | Left empty → inherit Default. Set by hand only if the source distinguishes these states |
| **Preset · Shared (`shared_bottom`)** | | | |
| `transition` | `short-text (ms)` | ⚪ Unmapped | Theme default — a transform ease is injected into Custom CSS instead when the source button animates |
| `custom_css` | `code-editor` | ⚙️ Auto | The converter injects a hover-transform rule here when the source button animates on hover |
| **Sizes (`button_sizes`)** | | | |
| `size_name` | `text` | ✅ Native | Named from the clustered sizes (S / M / L, or the distinct sizes found) |
| `slug` | `text` | ⚙️ Auto | The `.btn-{slug}` size-class suffix |
| `font_size` | `unit-input` | ✅ Native | Per-size text size |
| `line_height` | `short-text` | ⚪ Unmapped | Left default |
| `padding_y` | `unit-input` | ✅ Native | Top / bottom padding |
| `padding_x` | `unit-input` | ✅ Native | Left / right padding |
| `border_radius` | `unit-input` | ✅ Native | Corner radius (`9999px` = pill) |
| `min_height` | `unit-input` | ✅ Native | A **fixed** source height (e.g. `h-11` = 44px) → Min Height; content centres to it via inline-flex |
| `min_width · max_width` | `unit-input` | ⚪ Unmapped | Left default |
| **Hover Animations (`button_animations`)** | | | |
| `name · css` | `addable-box + code-editor` | ⚪ Unmapped | Not derived — the theme ships default hover animations (`{{BTN}}` / `{{ANIM}}`); add source-specific ones by hand |

:::note[How the states work]
Each preset has **five state tabs** — **Default / Hover / Active / Focus / Disabled** — sharing one `transition` and one `{{SELECTOR}}`-aware Custom CSS block. The converter fills **Default** fully and **Hover** partially (bg / text / border); **Active / Focus / Disabled** are left empty so they inherit Default, and you set them by hand only if the source distinguishes them. A source button that **animates on hover** (e.g. a transform) gets a matching `transition: transform …` rule injected into **Custom CSS** rather than the `transition` field.
:::

:::info[Gradients]
A source button background that’s a **gradient** is flattened into the `bg_color` fill (for hover, to an `rgba()`), so the native `gradient` field is left blank — the button still looks right, and you can promote it back to a real gradient by hand.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
