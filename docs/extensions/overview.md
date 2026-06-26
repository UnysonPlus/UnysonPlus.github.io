---
sidebar_position: 1
title: Overview
slug: /extensions/overview
---

# Extensions

Extensions are modular features you activate from **Unyson+ → Extensions**. Install only
what a project needs.

## Available extensions

| Extension | What it does |
| --- | --- |
| **Page Builder** | Visual drag &amp; drop page building with shortcodes. → [docs](/docs/page-builder) |
| **Shortcodes** | The shortcodes framework that powers the page builder. → [docs](./shortcodes/index.md) |
| **WordPress Shortcodes** | Insert Unyson+ shortcodes in any editor. → [docs](./wp-shortcodes/index.md) |
| **Theme Builder** | Divi-style global headers, bodies and footers with conditional assignment (includes header/footer building). → [docs](./theme-builder/index.md) |
| **Live Page Editor** | Edit builder pages on the live front end. → [docs](./live-editor.md) |
| **Site Converter** | Import an AI-generated website into WordPress. → [docs](./site-converter/index.md) |
| **Custom Fields** | ACF-style custom fields builder. → [docs](./custom-fields.md) |
| **Post Types &amp; Taxonomies** | Register CPTs and taxonomies from the admin. → [docs](./post-types.md) |
| **Portfolio** | A fully-featured portfolio module. → [docs](./portfolio/index.md) |
| **Sidebars** | Add multiple/dynamic sidebars per page. → [docs](./sidebars/index.md) |
| **Breadcrumbs** | Drop-in breadcrumb navigation. → [docs](./breadcrumbs/index.md) |
| **Forms** | Drag &amp; drop contact form builder. → [docs](./forms/index.md) |
| **Mega Menu** | Multi-column dropdown mega menus. → [docs](./megamenu/index.md) |
| **Builder** | The base builder option type to build custom builders on. → [docs](./builder/index.md) |
| **Asset Optimizer** | Combine enqueued assets to cut HTTP requests. → [docs](./asset-optimizer.md) |
| **Snippets** | Save and embed reusable builder content. → [docs](./snippets.md) |
| **WooCommerce** | Storefront elements + theme integration. → [docs](/docs/shortcodes/woocommerce-elements) |
| **Blog** | Relabels Posts as "Blog" across the admin and front end. → [docs](./blog.md) |
| **Mailer** | Global email settings + send service used by other extensions. → [docs](./mailer.md) |
| **Update** | GitHub-based auto-updates for the plugin, theme and extensions. → [docs](./updates.md) |

## Installing &amp; updating

Each extension lives in its own GitHub repository under the
[Unyson+ org](https://github.com/UnysonPlus) and updates straight from its default branch —
no releases required. When a new version is pushed, the **Updates** page in WordPress offers
it automatically.

## Developer note

Extensions live in `framework/extensions/`. See
[Creating Extensions](/docs/category/creating-extensions) for how to build your own,
[Option types](/docs/options/option-types) for how options and shortcodes are
built, and the per-area `AGENTS.md` files in the plugin source for recipes.
