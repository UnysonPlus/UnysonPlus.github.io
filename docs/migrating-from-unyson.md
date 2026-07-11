---
title: Migrating from Unyson
sidebar_position: 3
---

# Migrating from Unyson

Unyson+ is a **modernized continuation of the original Unyson framework**. If you've built with
Unyson before, almost everything you know carries over, the framework API, the options system, and
the extension model are the same. This page covers what's identical, what's new, and the few things
to watch when moving a project across.

## What's the same

Your Unyson knowledge transfers directly:

- **The options system.** Options are still PHP arrays with a `type`; the same option types you know
  (`text`, `select`, `switch`, `color-picker`, `typography`, `upload`, …) work the same way. See
  [Option types](/docs/options/option-types).
- **`framework-customizations/`.** Theme settings, customizer, post, and taxonomy options still live
  in `framework-customizations/theme/options/*.php`.
- **The read/write API.** `fw_get_db_settings_option()`, `fw_get_db_post_option()`,
  `fw_get_db_customizer_option()`, and friends are unchanged.
- **Extensions.** Still a folder with a `manifest.php` extending `FW_Extension`, discovered and
  activated the same way. See [The extension system](/docs/architecture/extension-system).
- **Hooks.** The `fw_*` actions and filters you used (`fw_init`, `fw_settings_options`,
  `fw_post_options`, …) are still here. See [Hooks & Filters](/docs/hooks).
- **The page builder model.** Section → row → column → element, stored as builder JSON.

## What's new and improved

- **Modern PHP & WordPress.** Requires **PHP 7.4+** and current WordPress; the codebase was
  modernized throughout.
- **GitHub auto-updates.** The plugin, theme, and every extension update **straight from GitHub**
  (the [UnysonPlus org](https://github.com/UnysonPlus)), no marketplace or license server. See
  [Updates & auto-updates](/docs/extensions/updates).
- **A Bootstrap 5 theme** with a clean, flexbox grid and a single generated stylesheet, the front
  end ships **no inline-style soup**. See [Performance](/docs/performance).
- **Dynamic Content** — Elementor-style `{{token}}` dynamic tags. See
  [Dynamic Content](/docs/dynamic-content).
- **Theme Builder** — Divi-style global headers, bodies, and footers with conditional assignment.
  See [Theme Builder](/docs/extensions/theme-builder).
- **Live Page Editor**, **Snippets / Global Templates**, **Asset Optimizer**, **Site Converter**,
  **Custom Fields**, **Post Types**, **Mega Menu**, all bundled or one-click installable.
- **Modernized option types** — `background-pro`, `spacing` (with per-device overrides),
  `typography-v2`, `gradient-v2`, `icon-v2`, `unit-input`, `box-shadow`, `multi-picker`, and more.

## What to watch when migrating

### Bootstrap 3 → Bootstrap 5

The theme and grid moved to **Bootstrap 5** (flexbox). Most content just works, but if a page relied
on the old Bootstrap-3 column-wrapping behavior, enable **Bootstrap 3 Legacy Mode** in the **Page
Builder settings**, it restores the legacy auto-split wrapping and loads the legacy grid CSS. See
[Column widths & the grid](/docs/page-builder/column-widths).

### Updates come from GitHub

Updates are delivered from the GitHub repos under the UnysonPlus org, not the original Unyson update
channel. They're **version-driven** (an update appears when the repo version is higher), so just keep
the plugin/theme current from the dashboard.

### Not every original extension ships

Some extensions from the original Unyson (Backups, Events, Feedback, Learning, SEO, Sliders, Social,
Translation) are **not bundled** in Unyson+. Use a dedicated WordPress plugin for those needs
(e.g. a backup plugin, an SEO plugin). The extensions that *are* included are listed in the
[Extensions overview](/docs/extensions/overview).

### Header/footer presets are now the Theme Builder

The old per-page header/footer preset idea is generalized into the
[Theme Builder](/docs/extensions/theme-builder), build header/footer/body parts and assign them with
conditional rules. Your Theme Settings slot-based header/footer remains the always-present fallback.

## Getting started

1. Install the **Unyson+ plugin** and the **Unyson+ Theme** (parent) from the
   [UnysonPlus org on GitHub](https://github.com/UnysonPlus). See [Installation](/docs/installation).
2. Activate the extensions you need from **Unyson+ → Extensions**.
3. Ship your work as a [child theme](/theme/child-themes).

New to the terminology Unyson+ uses? The [Concepts & glossary](/docs/concepts) is a quick orientation.
