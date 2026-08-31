---
sidebar_position: 1
slug: /intro
title: Introduction
description: Unyson+ is a free, modular WordPress development framework — an options framework, custom fields, post types, a page builder, a theme builder, and extensions. Take one piece or the whole thing.
---

# Introduction

**Unyson+** is a free, modular **framework for building WordPress themes and sites**. It gives you the
parts a real project needs — a settings/options framework, custom fields, custom post types, a visual
page builder, a theme builder, and modular extensions — built on one consistent foundation. Take one
piece or the whole thing.

It is a modernized continuation of the Unyson framework, updated for **PHP 7.4+** and current
WordPress, GPL-licensed with no license keys, and maintained by
[Unyson+](https://github.com/UnysonPlus).

:::note
This manual assumes a working knowledge of WordPress. If you're new to WordPress, start
with the [WordPress documentation](https://wordpress.org/documentation/).
:::

## A framework, not just a page builder

Unyson+ is built around a single **options framework**: dozens of option types (color, typography,
media, spacing, gradients, repeaters, and more) that render, validate, and save themselves. That same
engine powers everything above it, so Theme Settings, page-builder element options, custom fields, and
meta boxes all speak the same language. The page builder is one layer on top of the framework, not the
whole product.

## What you get

- **Options Framework** — the core: define a settings panel or a meta box as a plain array and the
  framework builds the UI for you.
- **Custom Fields & Post Types** — model your content with ACF-style field groups and register post
  types and taxonomies from the WordPress admin.
- **Page Builder** — a visual drag &amp; drop builder with ready-made elements that ships clean,
  semantic HTML.
- **Theme Builder** — design headers, footers, and templates with the same builder and ship them in a
  child theme.
- **Extensions** — modular features (Portfolio, Sidebars, Breadcrumbs, SEO, Forms, WooCommerce, and
  more) you install only when you need them.
- **GitHub auto-updates** — the plugin, theme, and every extension update directly from GitHub.

## How the pieces fit together

| Piece | What it is |
| --- | --- |
| **Unyson+ plugin** | The core framework, plus the page builder and everything built on the options framework. Install it like any WordPress plugin. |
| **Unyson+ Theme** | A Bootstrap 5 parent theme built for the framework, with Theme Settings powered by the options framework. |
| **Extensions** | Optional modules you activate from **Unyson+ → Extensions**, downloaded on demand. |

You don't need every piece. Use the options framework for a theme's settings, custom fields to model
content, or the page builder for layout, and leave the rest turned off.

## Minimum requirements

- WordPress 6.0 or greater
- PHP 7.4 or greater
- MySQL 5.6+ / MariaDB 10.1+

## Next steps

- [Install Unyson+](./installation.md)
- [Understand the core concepts](/concepts)
- [Explore the options framework](/options/introduction)
- [Browse the extensions](../extensions/overview.md)
- [Build your first page](./build-your-first-page.md)
