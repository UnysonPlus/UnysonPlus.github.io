---
title: Unyson+ vs Redux Framework
sidebar_position: 2
description: A field-by-field comparison of the Unyson+ options framework and Redux Framework — option types, architecture, cost, and when each is the better choice.
---

# Unyson+ vs Redux Framework

[Redux Framework](https://redux.io/) is a long-established WordPress **options framework**: you hand
it a PHP config array and it renders an admin panel. It's the closest thing to a direct comparison
for the Unyson+ options system, because that's the one thing both tools do.

The short version: **they aren't the same class of tool.** Redux is an options framework and does
that one job well. Unyson+ is a site-building framework in which options are one subsystem among
several. On option types specifically, Unyson+ is ahead in count and in design-system tooling;
Redux is ahead in ecosystem familiarity and documentation.

:::note
Written against **Unyson+ 2.15** and **Redux Framework 4.x**. Redux has been maintained by
Extendify since 2021; check its current release state before making a long-term bet either way.
:::

## Option types, side by side

Unyson+ ships **72 option types in core** — 53 as their own folders under
`framework/includes/option-types/`, plus 19 simple types — and **6 more contributed by extensions**
(including the page builder and form builder). Redux ships roughly 40 field types, several of them
delivered by its bundled extensions, all of which ship free with Redux Core.

| Category | Unyson+ | Redux |
| --- | --- | --- |
| **Primitives** | `text`, `short-text`, `medium-text`, `textarea`, `number`, `password`, `hidden`, `checkbox`, `checkboxes`, `radio`, `radio-text`, `select`, `short-select`, `medium-select`, `multi-select`, `switch`, `unique`, `html`, `html-fixed`, `html-full` | `text`, `textarea`, `spinner`, `password`, `checkbox`, `radio`, `select`, `button_set`, `switch`, `raw`, `info`, `divide`, `section` |
| **Color** | `color-picker`, `rgba-color-picker`, `gradient`, `gradient-v2`, `predefined-colors`, `predefined-colors-color-picker`, `predefined-colors-color-picker-compact` | `color`, `color_rgba`, `color_gradient`, `link_color`, `palette` |
| **Typography** | `typography`, `typography-v2` | `typography` (custom fonts via a bundled extension) |
| **Layout & box model** | `spacing`, `position-box`, `box-shadow`, `border-style-picker`, `border-presets`, `column-split`, `responsive`, `unit-input` | `spacing`, `dimensions`, `border`, `box_shadow` |
| **Media** | `upload`, `multi-upload`, `image-picker`, `background-image`, `background-pro`, `icon`, `icon-badge-presets`, `oembed`, `svg-code` | `media`, `gallery`, `image_select`, `background`, `slides` |
| **Repeatable & composite** | `addable-box`, `addable-option`, `addable-popup`, `multi`, `multi-inline`, `fw-multi-inline`, `multi-picker`, `popup`, `popover` | `repeater`, `sortable`, `sorter`, `multi_text` |
| **Date & time** | `date-picker`, `time-picker`, `datetime-picker`, `datetime-range` | `date` |
| **Editors** | `wp-editor`, `code-editor`, `gsap-code-preview` | `editor`, `ace_editor` |
| **Ranges** | `slider`, `range-slider`, `split-slider` | `slider` |
| **Style presets** | `button-presets`, `button-style-picker`, `button-hover-animation`, `table-presets`, `table-style-picker`, `image-style-picker`, `easing-picker` | — |
| **Embedded builders** | `builder` (the full page builder), `form-builder`, `gallery-3d-preview` | — |
| **Other** | `map`, `gmap-key` | Google Maps (bundled extension), `import_export`, Customizer integration |

Two rows deserve attention because they have no Redux counterpart at all:

**Style presets.** Types like `button-presets` and `image-style-picker` don't return a raw value —
they return a *named design decision* that the theme's generated stylesheet resolves. Combined with
`predefined-colors-color-picker` (a picker bound to the theme's palette rather than free hex),
this gives you a design-system layer. Redux hands you values and leaves the system to you.

**Builders as option types.** In Unyson+ an option can *be* a drag-and-drop page builder or a form
builder. That composability — an option containing an entire nested layout — has no equivalent in
Redux, where `repeater` is the deepest nesting available.

## Architectural differences

| | Unyson+ | Redux |
| --- | --- | --- |
| **What it is** | Site-building framework (options + extensions + page builder + shortcodes + forms + post types) | Options framework |
| **Config** | PHP arrays in `framework-customizations/` | PHP config array |
| **Storage** | Per-context: settings, post, term, customizer — see [Storage](/options/storage) | One serialized option array (plus extensions) |
| **Meta boxes** | Core | Bundled extension |
| **Repeatable fields** | Core (`addable-box`, `addable-popup`) | Bundled extension |
| **Customizer** | Supported — see [Customizer](/options/customizer) | Supported, a long-standing strength |
| **Import / export** | Via the Preset Library and template JSON | Built-in `import_export` field |
| **Custom field types** | Documented API — see [Create an option type](/options/create-option-type) | Custom field API |
| **Cost** | Free, GitHub-hosted | Free — core and all 17 bundled extensions |

## Where Redux is the better choice

- **You only need a settings panel.** Redux is one focused dependency. Unyson+ is a framework with
  an extension manager, a builder, and a shortcode library — considerable machinery if all you want
  is a theme options page.
- **Ecosystem familiarity.** Redux has been used in thousands of themes. Most WordPress developers
  recognize its config array on sight, and there are years of public answers to draw on. Unyson+'s
  documentation is essentially this manual.
- **Customizer-first projects.** Redux's Customizer bridge is mature and well-trodden.
- **Built-in import/export.** Redux has a first-class `import_export` field; the Unyson+ analogue is
  the Preset Library, which solves a related but different problem.

## Where Unyson+ is the better choice

- **Composability.** `multi-picker`, `addable-popup`, and builders-as-option-types let one option
  hold an entire nested structure.
- **Design-system tooling.** The preset and style-picker families, palette-bound color pickers,
  `responsive`, and `unit-input` are a category Redux doesn't cover.
- **It's not just options.** The [extension system](/architecture/extension-system),
  [page builder](../page-builder/index.md), shortcodes, [Theme Builder](/extensions/theme-builder),
  and [Dynamic Content](/dynamic-content) are part of the same framework.
- **Everything is free — but so is Redux.** Redux bundles all 17 extensions free, so cost is *not* a
  differentiator here. It is against ACF, where repeaters, options pages and gallery fields are Pro.
  For reference, the Unyson+ equivalents of those — repeaters, meta boxes, taxonomy options and
  maps — are core. (User-profile options are the one context Unyson+ does not cover; Redux has a
  User Metaboxes extension for it.)

## The honest trade-off

Redux's API is **easier to learn**: flat arrays, thorough public documentation, a large body of
existing examples. Unyson+'s is **more capable but more idiosyncratic** — `fw()->backend`, the
`fw_get_db_*` family, and a distinct value shape per option type. That learning curve is real, and
it's internal to this ecosystem; the [AI Dev Kit](/ai-dev-kit) exists largely to flatten it.

Worth naming too: much of the WordPress world has drifted toward Gutenberg-native settings and ACF,
so "works like Redux" is a diminishing draw. If you're weighing Unyson+ against something for its
option system, [ACF is the more relevant comparison](./index.md#versus-acf).
