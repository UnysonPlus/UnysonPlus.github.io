---
title: Installation & activation
sidebar_position: 2
slug: /troubleshooting/installation-and-activation
description: Getting Unyson+ installed and active — requirements, the editor (no Classic Editor plugin needed), downloading the correct zip, and adding extensions.
---

# Installation & activation

Issues that show up when first installing Unyson+ or turning it on.

## "Framework requirements not met" on activation

The framework declares a minimum **PHP**, **WordPress**, and (for extensions) framework version. If the
server is below one of them, activation is blocked and a notice names what's needed.

- **Fix:** update PHP to **8.0+** and WordPress to a current version, then activate again.
- Extensions have their own requirements too, see
  ["Framework requirements not met" / an extension won't activate](./options-and-settings.md#framework-requirements-not-met--an-extension-wont-activate).

## Do I need the Classic Editor plugin?

**No.** Unyson+ ships a bundled **Page Editor** that rides with the Page Builder and automatically
serves WordPress's **built-in classic editor** (it flips the core `use_block_editor_for_post_type`
switch — the exact thing the Classic Editor plugin does, in about fifteen lines). So the builder gets
its full-width home with **no extra plugin to install**, and you won't see two editors stacked.

- **Just install the Unyson+ plugin and the parent theme** — that's the whole setup.
- Why this works, and how to opt a post type back to Gutenberg:
  [Is the classic editor in WordPress core?](/page-builder/classic-editor-and-gutenberg)

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

A blank screen or PHP error on activation is almost always a **version mismatch** (PHP below 8.0) or a
conflicting plugin. Check the requirements notice above first; if the screen is fully blank, enable
`WP_DEBUG` to surface the underlying error, then resolve the named conflict.
