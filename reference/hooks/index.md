---
title: Hooks (Actions & Filters)
sidebar_label: Overview
slug: /hooks
description: Every action and filter the UnysonPlus framework exposes for extension and theme authors — 356 hooks, grouped by subsystem.
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Hooks — Actions & Filters

Every **action** (🎬) and **filter** (🧪) the framework exposes for extension and theme authors —
the real extensibility surface. **356 hooks** in total, grouped by subsystem.

- 🎬 **action** — `add_action( 'name', $cb )`; fires at a point in the flow (do something).
- 🧪 **filter** — `add_filter( 'name', $cb )`; passes a value through for you to modify (return it).

> Generated from the framework's `do_action` / `apply_filters` calls (framework-owned hooks only —
> WordPress-core hooks are excluded). See also the [Functions reference](../functions/index.md).

## Hooks by subsystem

| Subsystem | Hooks | Actions | Filters |
| --- | --- | --- | --- |
| [Shortcodes](./shortcodes.md) | 62 | 9 | 53 |
| [Core](./core.md) | 56 | 27 | 29 |
| [Other Extensions](./other-extensions.md) | 48 | 19 | 29 |
| [Core Includes](./core-includes.md) | 36 | 0 | 36 |
| [Core Helpers](./core-helpers.md) | 27 | 13 | 14 |
| [Page Builder](./page-builder.md) | 20 | 1 | 19 |
| [Option Types](./option-types.md) | 20 | 1 | 19 |
| [Breadcrumbs](./breadcrumbs.md) | 12 | 0 | 12 |
| [Portfolio](./portfolio.md) | 11 | 2 | 9 |
| [Builder (base)](./builder-base.md) | 11 | 6 | 5 |
| [Forms](./forms.md) | 8 | 3 | 5 |
| [Mega Menu](./mega-menu.md) | 8 | 0 | 8 |
| [Post Types](./post-types.md) | 6 | 1 | 5 |
| [Asset Optimizer](./asset-optimizer.md) | 5 | 0 | 5 |
| [Update](./update.md) | 5 | 0 | 5 |
| [Framework](./framework.md) | 4 | 2 | 2 |
| [Sidebars](./sidebars.md) | 4 | 0 | 4 |
| [Animation Engine](./animation-engine.md) | 4 | 0 | 4 |
| [Snippets](./snippets.md) | 3 | 0 | 3 |
| [Theme Settings (Components)](./theme-settings-components.md) | 3 | 1 | 2 |
| [Mailer](./mailer.md) | 2 | 0 | 2 |
| [Site Converter](./site-converter.md) | 1 | 0 | 1 |
