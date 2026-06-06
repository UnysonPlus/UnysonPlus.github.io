---
sidebar_position: 2
title: Installation
---

# Installation

Unyson+ ships as a normal WordPress plugin plus an optional parent theme.

## 1. Install the plugin

1. Download the latest **Unyson+** plugin from the
   [plugin repository](https://github.com/UnysonPlus/UnysonPlus).
2. In WordPress, go to **Plugins → Add New → Upload Plugin** and upload the ZIP, or
   copy the `unysonplus` folder into `wp-content/plugins/`.
3. Activate **Unyson+** from the **Plugins** menu.

:::tip Keep the folder name
Install the plugin into a folder named `unysonplus`. The GitHub auto-updater and the
theme both reference that folder name.
:::

## 2. Install the theme (optional but recommended)

1. Download **Unyson+ Theme** from the
   [theme repository](https://github.com/UnysonPlus/UnysonPlus-Theme).
2. Go to **Appearance → Themes → Add New → Upload Theme** and upload the ZIP.
3. Activate it. The child theme,
   [Unyson+ Theme Child](https://github.com/UnysonPlus/UnysonPlus-Theme-Child), is a good
   starting point for customizations.

## 3. Activate extensions

Open **Unyson+ → Extensions**. Active extensions appear at the top; available ones can be
downloaded with one click. See [Extensions](./extensions/overview.md) for the full list.

## Automatic updates

Once installed, Unyson+ checks GitHub for new versions and offers updates from the
WordPress dashboard — no manual re-uploads needed for routine updates.

:::info Bootstrapping a very old install
A site running a much older build may not yet have the updater pointing at the current
repository. In that case, upload the current plugin once manually; after that, updates are
automatic.
:::
