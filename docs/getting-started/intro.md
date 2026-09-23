---
sidebar_position: 1
slug: /intro
title: Introduction
description: Unyson+ is a free, modular, page-builder-first WordPress framework — an options framework, custom fields, post types, a Flexbox/Div page builder, a theme builder, a no-library Animation Engine, and a Site Converter that turns AI-generated designs into WordPress. A modern, GPL-licensed continuation of Unyson.
keywords: [Unyson+, UnysonPlus, Unyson framework, Unyson alternative, Unyson continuation, WordPress framework, WordPress page builder, theme builder, options framework, custom fields, post types, animation engine, site converter, AI to WordPress]
---

# Introduction

**Unyson+** is a free, modular **framework for building WordPress themes and sites** — a
**page-builder-first** toolkit and a modern continuation of the discontinued
[Unyson](https://wordpress.org/plugins/unyson/) framework. It gives you the parts a real project
needs — a settings/options framework, custom fields, custom post types, a visual page builder, a
theme builder, and modular extensions — built on one consistent foundation. Take one piece or the
whole thing.

What sets it apart from the original Unyson (and from a plain page builder) is the modern layer on
top: a **Flexbox/Div-first layout model** that ships clean semantic HTML, a no-library
**[Animation Engine](/animation-engine/)** (scroll motion, parallax, text effects, Rive and
3D elements), a **[Site Converter](/extensions/site-converter)** that turns an AI-generated design
into a working WordPress site, reusable **Component Presets**, and **Dynamic Content** tags — all
free, GPL-licensed, with no license keys and automatic updates from GitHub.

:::tip[💡 Web dev tip: plan structure before you touch design]
Before you drag a single element, sketch what the page actually needs — one `h1`, a logical
heading order below it, and the sections a visitor reads top to bottom. Content structure is what
search engines and screen readers rely on, and it's far easier to get right first than to retrofit
later. A framework like Unyson+ can hand you clean semantic markup, but it can't decide your
outline for you. [MDN: HTML basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
:::

It is a modernized continuation of the Unyson framework, updated for **PHP 8.0+** and current
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
- **Page Builder** — a visual drag &amp; drop builder led by a **Flexbox/Div layout model** (Section,
  Block, Flexbox, Grid) that ships clean, semantic HTML with no row/column wrapper soup.
- **Theme Builder** — design headers, footers, and templates with the same builder and ship them in a
  child theme.
- **[Animation Engine](/animation-engine/)** — a no-library motion system: scroll reveal,
  parallax, pinning, text effects, and interactive elements like Rive and a 3D Model Viewer.
- **[Site Converter](/extensions/site-converter)** — turn an AI-generated design, or a captured live
  page, into a self-sufficient WordPress theme reproducing its layout, fonts, and colors.
- **Component Presets & Dynamic Content** — reusable, theme-independent style presets (colors,
  typography, spacing, buttons, borders) and Elementor-Pro-style dynamic tags resolved at render time.
- **Extensions** — modular features (Portfolio, Sidebars, Breadcrumbs, SEO, Forms, WooCommerce, and
  more) you install only when you need them.
- **GitHub auto-updates** — the plugin, theme, and every extension update directly from GitHub.

## How is Unyson+ different from the original Unyson?

Unyson+ is a community-maintained fork that continues Unyson after ThemeFuse discontinued it, then
takes it further:

- **Modern PHP & WordPress** — a PHP 8.0+ baseline (dropped 5.6–7.4) and ongoing security hardening,
  where the original stopped at legacy PHP.
- **Brizy and Bootstrap removed** — the old Brizy dependency is gone, and the bundled Bootstrap
  stylesheet was dropped for a lean, self-sufficient CSS layer and a cleaner frontend DOM.
- **Page-builder-first** — a Flexbox/Div layout model, 60+ elements, Component Presets, Dynamic
  Content, and per-device responsive editing that the original never had.
- **New capabilities** — a no-library **Animation Engine**, a **Site Converter** (AI-design →
  WordPress), a **Theme Builder**, and ACF-style **Custom Fields** / **Post Types** builders.
- **GitHub delivery** — the plugin, theme, and each extension update automatically from GitHub
  releases; no WordPress.org listing or license keys.

See [Migrating from Unyson](/migrating-from-unyson) if you're moving an existing site.

## How the pieces fit together

| Piece | What it is |
| --- | --- |
| **Unyson+ plugin** | The core framework, plus the page builder and everything built on the options framework. Install it like any WordPress plugin. |
| **Unyson+ Theme** | The parent theme built for the framework, with Theme Settings powered by the options framework (no Bootstrap dependency). |
| **Extensions** | Optional modules you activate from **Unyson+ → Extensions**, downloaded on demand. |

You don't need every piece. Use the options framework for a theme's settings, custom fields to model
content, or the page builder for layout, and leave the rest turned off.

## Minimum requirements

- WordPress 5.8 or greater
- PHP 8.0 or greater
- MySQL 5.6+ / MariaDB 10.1+

## Next steps

- [Install Unyson+](./installation.md)
- [Understand the core concepts](/concepts)
- [Explore the options framework](/options/introduction)
- [Browse the extensions](../extensions/overview.md)
- [Build your first page](./build-your-first-page.md)
