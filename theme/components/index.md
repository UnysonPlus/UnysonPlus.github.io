---
title: Components (Preset Libraries)
sidebar_position: 1
slug: /components
description: The Unyson+ Theme Settings → Components preset libraries — reusable design tokens (colors, text styles, buttons, boxes, image styles, patterns and more) compiled into one cached stylesheet.
---

# Components — the preset libraries

**Theme Settings → Components** is the site's **design-token layer**. Each tab there is a *preset
library* — a reusable set of styles (a color, a text style, a button skin, a box skin, an image
treatment…) that you define once and then pick from a dropdown on any element. Change a preset and
every element using it updates.

This section documents each library in detail: what it is, **how it's coded**, **what CSS it emits**,
and **where that output lives**.

## The libraries

| Library | Emits | Detail |
| --- | --- | --- |
| **Color Presets** | `.text-{slug}` / `.bg-{slug}` + `--color-{slug}` | [Color Presets](./color-presets.md) |
| **Text Styles** | `.font-{slug}` + `--font-size-{slug}` | [Text Styles](./text-styles.md) |
| **Buttons** | `.btn-{slug}` / `.btn-outline-{slug}` + sizes | [Buttons](./buttons.md) |
| **Box Presets** | `.boxp-{slug}` | [Box Presets](./box-presets.md) |
| **Image Styles** | `.imgs-{slug}` token bundle | [Image Styles](./image-styles.md) |
| **Background Patterns** | `.pattern-{id}` | [Background Patterns](./background-patterns.md) |
| **Section Styles** | `.section--{slug}` | [Section Styles](./section-styles.md) |
| **Shape Dividers** | SVG edge shapes | [Shape Dividers](./shape-dividers.md) |
| **Icon Badges** | `.iconb-{slug}` | [Icon Badges](./icon-badges.md) |
| **Table Presets** | `.tbl-{slug}` | [Table Presets](./table-presets.md) |
| **Spacing** | `.m-*` / `.p-*` utilities | [Spacing](./spacing.md) |
| **Element Designs** | design packs (per-element) | [Element Designs](./element-designs.md) |

## How the whole system works (shared pipeline)

Every preset library follows the same three-stage pipeline, so once you understand one you understand
all of them.

### 1. Storage — an `addable-box` in Theme Settings

Each library is an [`addable-box`](/options/option-types/addable-box) option defined in
`framework/extensions/shortcodes/includes/theme-settings/components-*.php` (e.g.
`components-color.php`). The user adds / removes / reorders rows; each row is a small options group
(a name + the style fields). The whole array is saved to the Theme Settings store under one key
(`theme_colors`, `button_presets`, `box_presets`, …).

### 2. Compilation — one generated stylesheet

On the front end, **`framework/includes/css-tokens.php`** reads every preset library and compiles
them into a single CSS string with `unysonplus_build_presets_css_string()`. It emits:

- **`:root` custom properties** — `--color-{slug}`, `--font-size-{slug}`, … (the tokens), and
- **utility rules** — `.text-{slug}`, `.bg-{slug}`, `.font-{slug}`, `.btn-{id}`, `.boxp-{slug}`,
  `.imgs-{slug}`, `.tbl-{slug}`, `.iconb-{slug}`, `.pattern-{id}`, and so on.

A second `:root` block under `@media (max-width: 767.98px)` provides mobile auto-scaling.

### 3. Output — a cached, hashed file in uploads

The compiled CSS is written **once** to:

```
wp-content/uploads/unysonplus/css/presets-{hash}.css
```

The `{hash}` is derived from the presets' content (`unysonplus_preset_css_hash()`), so:

- the URL is **immutable** (no `?ver=` needed) and cacheable forever,
- editing any preset changes the hash → a new file is written, and
- stale `presets-*.css` files are auto-deleted (self-healing).

It's enqueued as the `unysonplus-presets` stylesheet via `unysonplus_enqueue_preset_css()` (hooked
`wp_enqueue_scripts` **and** `admin_enqueue_scripts` at priority 35, so the same tokens render in the
builder). If the uploads directory isn't writable, it **falls back** to an inline
`<style id="unysonplus-presets">` block in `wp_head` (priority 99).

:::note[Master switch]
The whole layer is gated by `unysonplus_styling_presets_enabled()` (default on). Off = "bare mode":
no preset stylesheet, no preset pickers.
:::

## Where each library is picked

Presets are consumed through the option-type pickers documented under
[Option Types → Presets & pickers](/options/option-types#presets--pickers) — for example the
compact color dropdowns, the [button-style-picker](/options/option-types/button-style-picker),
[image-style-picker](/options/option-types/image-style-picker), and the popover
[preset preview pickers](/options/option-types/popover/preset-preview-pickers).
