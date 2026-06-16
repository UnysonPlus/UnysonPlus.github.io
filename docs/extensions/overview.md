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
| **Page Builder** | Visual drag &amp; drop page building with shortcodes. |
| **WordPress Shortcodes** | Insert Unyson+ shortcodes in any editor. |
| **Header &amp; Footer Builder** | Build headers/footers with the page builder. → [docs](./header-footer-builder.md) |
| **Live Page Editor** | Edit builder pages on the live front end. → [docs](./live-editor.md) |
| **Site Converter** | Import an AI-generated website into WordPress. → [docs](./site-converter.md) |
| **Custom Fields** | ACF-style custom fields builder. → [docs](./custom-fields.md) |
| **Post Types &amp; Taxonomies** | Register CPTs and taxonomies from the admin. → [docs](./post-types.md) |
| **Portfolio** | A fully-featured portfolio module. |
| **Sidebars** | Add multiple/dynamic sidebars per page. |
| **Breadcrumbs** | Drop-in breadcrumb navigation. |
| **SEO** | Meta titles, keywords and descriptions. |
| **Forms** | Drag &amp; drop contact form builder. |
| **Mailer** | Global email settings used by other extensions. |
| **Sliders** | Built-in jQuery sliders. |
| **Styling** | Control fonts and colors site-wide. |
| **Events / Feedback / Learning** | Calendar, reviews, and courses modules. |
| **Asset Optimizer** | Combine enqueued assets to cut HTTP requests. → [docs](./asset-optimizer.md) |
| **Snippets** | Save and embed reusable builder content. → [docs](./snippets.md) |
| **Backup &amp; Demo Content** | Scheduled backups and demo import/export. |

## Installing &amp; updating

Each extension lives in its own GitHub repository under the
[Unyson+ org](https://github.com/UnysonPlus) and updates straight from its default branch —
no releases required. When a new version is pushed, the **Updates** page in WordPress offers
it automatically.

## Developer note

Extensions live in `framework/extensions/`. See
[Option types](/docs/options/option-types) for how options and shortcodes are
built, and the per-area `AGENTS.md` files in the plugin source for recipes.
