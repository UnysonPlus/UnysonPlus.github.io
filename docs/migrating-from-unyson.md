---
title: Migrating from Unyson
sidebar_position: 18
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
  [Option types](/options/option-types).
- **`framework-customizations/`.** Theme settings, customizer, post, and taxonomy options still live
  in `framework-customizations/theme/options/*.php`.
- **The read/write API.** `fw_get_db_settings_option()`, `fw_get_db_post_option()`,
  `fw_get_db_customizer_option()`, and friends are unchanged.
- **Extensions.** Still a folder with a `manifest.php` extending `FW_Extension`, discovered and
  activated the same way. See [The extension system](/architecture/extension-system).
- **Hooks.** The `fw_*` actions and filters you used (`fw_init`, `fw_settings_options`,
  `fw_post_options`, …) are still here. See [Hooks & Filters](/hooks).
- **The page builder model.** Section → row → column → element, stored as builder JSON.

## What's new and improved

- **Modern PHP & WordPress.** Requires **PHP 8.0+** and current WordPress; the codebase was
  modernized throughout.
- **GitHub auto-updates.** The plugin, theme, and every extension update **straight from GitHub**
  (the [UnysonPlus org](https://github.com/UnysonPlus)), no marketplace or license server. See
  [Updates & auto-updates](/extensions/updates).
- **A Bootstrap 5 theme** with a clean, flexbox grid and a single generated stylesheet, the front
  end ships **no inline-style soup**. See [Performance](/performance).
- **Dynamic Content** — Elementor-style `{{token}}` dynamic tags. See
  [Dynamic Content](/dynamic-content).
- **Theme Builder** — Divi-style global headers, bodies, and footers with conditional assignment.
  See [Theme Builder](/extensions/theme-builder).
- **Live Page Editor**, **Snippets / Global Templates**, **Asset Optimizer**, **Site Converter**,
  **Custom Fields**, **Post Types**, **Mega Menu**, all bundled or one-click installable.
- **Modernized option types** — `background-pro`, `spacing` (with per-device overrides),
  `typography-v2`, `gradient-v2`, `icon`, `unit-input`, `box-shadow`, `multi-picker`, and more.

## What to watch when migrating

### Bootstrap 3 → Bootstrap 5

The theme and grid moved to **Bootstrap 5** (flexbox). Most content just works, but if a page relied
on the old Bootstrap-3 column-wrapping behavior, enable **Bootstrap 3 Legacy Mode** in the **Page
Builder settings**, it restores the legacy auto-split wrapping and loads the legacy grid CSS. See
[Column widths & the grid](/page-builder/column-widths).

### Updates come from GitHub

Updates are delivered from the GitHub repos under the UnysonPlus org, not the original Unyson update
channel. They're **version-driven** (an update appears when the repo version is higher), so just keep
the plugin/theme current from the dashboard.

### Almost every original extension is still available

The extensions from the original Unyson are available in **Unyson+ → Extensions**: Page Builder, WordPress
Shortcodes, Backups & Demo Content, Sliders, Styling, Breadcrumbs, Events, Feedback, Mega Menu, Portfolio,
Sidebars, Forms, Mailer, SEO, Social, Analytics and Media, plus many new ones (see the
[Extensions overview](/extensions/overview)). The one exception is **Learning**: courses and lessons are planned as
the Courses module of the [Membership](/membership) extension, built from scratch on its access rules.

When your theme was built on Unyson, Unyson+ reads which extensions it uses and shows **Install theme compatible
extensions** at the top of the Extensions screen: one click installs them all.

### Header/footer presets are now the Theme Builder

The old per-page header/footer preset idea is generalized into the
[Theme Builder](/extensions/theme-builder), build header/footer/body parts and assign them with
conditional rules. Your Theme Settings slot-based header/footer remains the always-present fallback.

## Switching a live Unyson site

1. **Back up the site** (files and database), as before any big update.
2. In **Plugins**, deactivate **Unyson**. Keep it installed until you have checked the site, so you can switch back.
3. Install **Unyson+**: download `unysonplus.zip` from the
   [latest release](https://github.com/UnysonPlus/UnysonPlus/releases/latest), upload it in **Plugins → Add New**,
   and activate it. Never run both plugins at once.
4. Open **Unyson+ → Extensions** and click **Install theme compatible extensions**.
5. Check your main pages. Theme Settings values and page-builder pages carry over as they are (Unyson+ reads them
   where the original stored them). When everything looks right, delete the old Unyson plugin.

We tested this on a site built with Unyson 2.7.31 and its official starter theme, on WordPress 7.1 and PHP 8.2:
every Theme Settings value and every page's content came across unchanged.

## Starting a new project

1. Install the **Unyson+ plugin** and the **Unyson+ Theme** (parent) from the
   [UnysonPlus org on GitHub](https://github.com/UnysonPlus). See [Installation](/installation).
2. Activate the extensions you need from **Unyson+ → Extensions**.
3. Ship your work as a [child theme](/theme/child-themes).

New to the terminology Unyson+ uses? The [Concepts & glossary](/concepts) is a quick orientation.
