---
title: Frequently asked questions
sidebar_label: FAQ
sidebar_position: 1
slug: /troubleshooting/faq
description: Common questions about Unyson+ — pricing and licensing, theme compatibility, PHP requirements, using individual pieces, updates, and its relationship to Unyson.
---

# Frequently asked questions

General questions about what Unyson+ is and how it fits into a WordPress project. For a specific
error, use the [troubleshooting sections](./index.md).

## Is Unyson+ free? Do I need a license key?

Yes, it's free, and there are no license keys. Unyson+ is GPL-licensed and open source, the plugin,
the parent theme, and every extension. Download it, use it on as many sites as you like, and modify it.

## Do I have to use the page builder?

No. Unyson+ is a **framework**, so you can take one piece or the whole thing. Use just the options
framework for a theme's settings, just custom fields and post types to model content, or just the page
builder for layout, and leave the rest turned off. The [Extensions](/extensions/overview) screen
is where you turn capabilities on and off.

## Does it work with any theme?

The plugin works with any theme: the page builder, options framework, custom fields, post types, and
most extensions don't require a specific theme. Some features are designed to pair with the
**unysonplus-theme** parent theme, the Theme Builder outputs header / footer / template designs you
ship in a child theme, and the theme exposes Theme Settings built on the options framework. You can
adopt those pieces when you want them.

## Which PHP and WordPress versions does it need?

Unyson+ targets **PHP 8.0+** and current WordPress. It's built on the proven Unyson foundation and
modernized for today's PHP and WordPress. If an install is below the minimum, the framework reports it
on activation (see [Installation & activation](./installation-and-activation.md)).

## Do I need the block editor (Gutenberg) or the Classic Editor plugin?

**Neither — you don't install anything.** The page builder lives in a meta box below the content
editor, so it wants the **classic** editor screen, and Unyson+ serves that itself: a bundled **Page
Editor** extension flips WordPress's own core switch (`use_block_editor_for_post_type`) so the builder
gets a full-width home with **no Classic Editor plugin**. You stay inside WordPress, keeping the normal
dashboard and every other plugin's meta boxes (Yoast, etc.). You can send specific post types (say,
blog Posts) back to Gutenberg from the Page Builder settings. Everything else (options, custom fields,
extensions) is unaffected by which editor you use. See
[Is the classic editor in WordPress core?](/page-builder/classic-editor-and-gutenberg).

## How do updates work?

Updates come straight from GitHub and are **version-driven**: the plugin, theme, and each extension
show an update only when the version in the repo is higher than the one installed. Push a new,
higher-versioned release and your sites pick it up through the normal WordPress Updates screen. See
[Updates & auto-updates](/extensions/updates) and the
[updates troubleshooting](./updates-and-versions.md).

## How do I get the other extensions?

The public plugin ships a lean base (the core framework plus the `blog` and `update` extensions). Every
other extension is downloaded on demand from the framework's **Extensions manager**, so you install
only what a site needs and the base stays small. Downloaded extensions live under
`framework-customizations/` and survive plugin updates.

## Is Unyson+ production-ready? Can I use it on client sites?

Yes, for custom WordPress theme work — that's its intended use. It's built on the proven Unyson
foundation, modernized for **PHP 8.0+** and current WordPress, and shipped through versioned,
tagged releases with a clean rollback path, and your content stays in standard WordPress (no
lock-in). For the full evidence — release process, compatibility, testing, and portability — see
[Is Unyson+ production-ready?](/project-maturity).

## Is this the same as Unyson? Can I migrate?

Unyson+ builds on the original **Unyson** framework and modernizes it. If you're coming from Unyson,
see [Migrating from Unyson](/migrating-from-unyson) for what changed and how to move across.

## Where does it store the files it generates?

Everything Unyson+ writes to the WordPress uploads folder lives under a single parent,
`wp-content/uploads/unysonplus/`, with a subfolder per feature (generated CSS, icon packs, templates,
and so on). Most are regenerable caches or re-downloadable assets.
