---
title: Installation & activation
sidebar_position: 2
slug: /troubleshooting/installation-and-activation
description: Getting Unyson+ installed and active — requirements, the Classic Editor step, downloading the correct zip, and adding extensions.
---

# Installation & activation

Issues that show up when first installing Unyson+ or turning it on.

## "Framework requirements not met" on activation

The framework declares a minimum **PHP**, **WordPress**, and (for extensions) framework version. If the
server is below one of them, activation is blocked and a notice names what's needed.

- **Fix:** update PHP to **7.4+** and WordPress to a current version, then activate again.
- Extensions have their own requirements too, see
  ["Framework requirements not met" / an extension won't activate](./options-and-settings.md#framework-requirements-not-met--an-extension-wont-activate).

## The page builder shows two editors stacked on the post screen

The builder sits **below** the content editor, so with the block editor (Gutenberg) active you see
both. Install and activate the **Classic Editor** plugin first, before you start building.

- **Do it in this order:** Classic Editor → the Unyson+ plugin → the parent theme.
- Full detail: [I see two editors stacked on the post screen](./editor-and-page-builder.md#i-see-two-editors-stacked-on-the-post-screen).

## I downloaded the repo and half the features are missing

The public `UnysonPlus` GitHub repo is **core-only**. Downloading it with "Code → Download ZIP" (or the
source zip) gives you the framework without the bundled page-builder elements.

- **Fix:** install the **release asset** instead — the `unysonplus.zip` attached to the
  [latest release](https://github.com/UnysonPlus/UnysonPlus/releases/latest), which is the full plugin.
  Upload it under *Plugins → Add New → Upload*.

## An extension I expected isn't in the list

The base install is deliberately lean, only the core framework plus `blog` and `update` ship in the
zip. Everything else is **downloaded on demand**.

- **Fix:** open the framework's **Extensions** screen and install the extension you need. It downloads
  into `framework-customizations/` and stays there across plugin updates.

## The admin looks broken right after activating

A blank screen or PHP error on activation is almost always a **version mismatch** (PHP below 7.4) or a
conflicting plugin. Check the requirements notice above first; if the screen is fully blank, enable
`WP_DEBUG` to surface the underlying error, then resolve the named conflict.
