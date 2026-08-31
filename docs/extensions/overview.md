---
sidebar_position: 1
title: Overview
slug: /extensions/overview
hide_table_of_contents: true
---

# Extensions

Extensions are modular features you manage from **Unyson+ → Extensions**. Install only
what a project needs.

## Available extensions

The **In manager?** column shows whether an extension appears on the *Unyson+ → Extensions*
page (where you activate and deactivate it yourself):

- **Yes** — listed on the Extensions page; toggle it on/off there. A few ship *off by
  default* (noted below) so lean sites don't load a runtime they don't use.
- **Auto** — *not* listed; it's foundational and is activated automatically (always on).
- **Dependency** — *not* listed; it's switched on automatically when an extension that
  relies on it is activated.

| Extension | What it does | In manager? |
| --- | --- | --- |
| **Page Builder** | Visual drag &amp; drop page building with shortcodes. → [docs](/page-builder) | Yes |
| **WordPress Shortcodes** | Insert Unyson+ shortcodes in any editor. → [docs](./wp-shortcodes/index.md) | Yes |
| **Live Page Editor** | Edit builder pages on the live front end. → [docs](./live-editor.md) | Yes |
| **Site Converter** | Import an AI-generated / captured website into WordPress. → [docs](./site-converter/index.md) | Yes |
| **Site Migration** | Move a whole site (DB, uploads, themes, plugins) to another install in resumable background slices. | Yes |
| **Template Library** | A browsable catalog of premade section / page templates, downloaded on demand into uploads. | Yes |
| **Custom Fields** | ACF-style custom fields builder. → [docs](/data-modeling/custom-fields) | Yes |
| **Post Types &amp; Taxonomies** | Register CPTs and taxonomies from the admin. → [docs](/data-modeling/post-types) | Yes |
| **Portfolio** | A fully-featured portfolio module. → [docs](./portfolio/index.md) | Yes |
| **Sidebars** | Add multiple/dynamic sidebars per page. → [docs](./sidebars/index.md) | Yes |
| **Breadcrumbs** | Drop-in breadcrumb navigation. → [docs](./breadcrumbs/index.md) | Yes |
| **SEO** | Dynamic titles &amp; descriptions, canonical URLs, indexing control and XML sitemaps. → [docs](./seo/index.md) | Yes |
| **Forms** | Drag &amp; drop contact form builder. → [docs](./forms/index.md) | Yes |
| **Newsletter / Subscriber CRM** | Stores and manages people who sign up through the `[newsletter]` element — subscribers, lists, tags, segments, CSV import/export. | Yes |
| **Mega Menu** | Multi-column dropdown mega menus. → [docs](./megamenu/index.md) | Yes |
| **Mailer** *(hidden)* | Global email settings + send service used by Forms / Newsletter. → [docs](./mailer.md) | Dependency |
| **Asset Optimizer** | Combine enqueued assets to cut HTTP requests. → [docs](./asset-optimizer.md) | Yes |
| **Snippets** | Save and embed reusable builder content. → [docs](./snippets.md) | Yes |
| **WooCommerce** | Storefront elements + theme integration. → [docs](/shortcodes/woocommerce-elements) | Yes |
| **POS Sync** *(in design)* | Keeps the store in step with sales rung up on a physical till — any POS, any cart. → [docs](./pos-sync/index.md) | Not yet released |
| **Animation Engine** | WebGL objects, scroll/hover/cursor/text motion and page-transition modules. → [docs](/animation-engine/) | Yes — off by default |
| **Animated Icons** | Adds an "Animated" tab to the icon picker (Lottie, Rive, animated SVG, GIF/APNG/WebP). | Yes — off by default |
| **Chat** | A floating multi-channel contact button (WhatsApp, Messenger, Telegram, SMS, Email…). | Yes — off by default |
| **Gutenberg Blocks** | Exposes Unyson+ elements as native, server-rendered Gutenberg blocks. | Yes |
| **Shortcodes** *(hidden)* | The shortcodes framework that powers the page builder. → [docs](./shortcodes/index.md) | Auto |
| **Blog** *(hidden)* | Relabels Posts as "Blog" across the admin and front end. → [docs](./blog.md) | Auto |
| **Update** *(hidden)* | GitHub-based auto-updates for the plugin, theme and extensions. → [docs](./updates.md) | Auto |
| **Builder** *(hidden)* | The base builder option type to build custom builders on. → [docs](./builder/index.md) | Dependency |

:::note Theme Builder
Divi-style global headers, bodies and footers (with conditional assignment) aren't a
separate toggle — they're part of the **Page Builder** + **Snippets** extensions.
→ [Theme Builder docs](./theme-builder/index.md)
:::

## Installing &amp; updating

Each extension lives in its own GitHub repository under the
[Unyson+ org](https://github.com/UnysonPlus) and updates straight from its default branch —
no releases required. When a new version is pushed, the **Updates** page in WordPress offers
it automatically.

## Developer note

Extensions live in `framework/extensions/`. See
[Creating Extensions](/category/creating-extensions) for how to build your own,
[Option types](/options/option-types) for how options and shortcodes are
built, and the per-area `AGENTS.md` files in the plugin source for recipes.
