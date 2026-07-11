---
title: The Theme
slug: /
sidebar_position: 1
---

# The Theme

The **Unyson+ Theme** is the Bootstrap-5 **parent theme** built for the framework. It's where the
plugin's page-builder output actually becomes a rendered site: the theme provides the header and
footer chrome, the blog/archive templates, the base typography and grid, and the **Theme Settings**
panel that controls the whole global design layer.

You rarely ship the parent theme directly — you ship a **child theme** of it (the way `payforituk`
is a child of `unysonplus-theme`). The parent gives you everything; the child overrides only the
brand and the few templates a specific site needs.

<img src="/img/theme/theme-settings-general.png" alt="Theme Settings — General tab (site width, background, content density, container gutter, border roundness)" width="1238" />

## What the theme provides

| Layer | What it does |
| --- | --- |
| **Templates** | `header.php` / `footer.php`, the page templates (`page-full-width.php`, `page-sidebar-left.php`, `page-no-header.php`, …), and the blog/archive/search/single templates. |
| **Theme Settings** | A global design panel (Appearance → Theme Settings): colors, typography, header, footer, layout, custom CSS. |
| **Design → CSS pipeline** | Compiles those settings into **one** generated stylesheet — no inline `<style>` soup on the front end. See [How settings become CSS](./settings-to-css.md). |
| **Identity sync** | Two-way sync of the logo and site icon with WordPress core (Customize → Site Identity). |
| **Design export/import** | Move a whole design (colors/fonts/header/footer/CSS) between sites as a `.json` file. |

## Parent / child relationship

```
unysonplus-theme  (PARENT — the framework theme)
   ├── style.css            Version: 2.2.22 · Theme id: "unysonplus"
   ├── header.php / footer.php / page-*.php …      ← all templates live here
   ├── inc/includes/*.php    settings → CSS, identity sync, blog loop, migrations
   └── framework-customizations/theme/options/*.php   ← the Theme Settings schema
        │
        ▼  is_child_theme()
your-child-theme  (CHILD — what you ship)
   ├── style.css            Template: unysonplus-theme
   ├── functions.php        enqueue parent style; brand tweaks
   └── (override only the templates / option files you need)
```

A child theme inherits **everything** from the parent and overrides only what it declares. That
includes the ability to override **extension** files and add Theme Settings — through the same
`framework-customizations/` mechanism the parent uses (see
[The extension system](/docs/architecture/extension-system#three-locations)). How to build and
distribute one is covered in [Child themes](./child-themes.md).

## The theme's manifest

The theme carries a small framework manifest at
`framework-customizations/theme/manifest.php`:

```php
$manifest['id'] = 'unysonplus';   // namespaces the Theme Settings wp_option
$manifest['supported_extensions'] = array(
    'page-builder' => array(),
    'shortcodes'   => array(),
    'portfolio'    => array(),
    'sidebars'     => array(),
    // …
);
```

The **`id`** is important: Theme Settings are stored under
`fw_theme_settings_options:{id}`, so the id namespaces a theme's settings (and a child theme
forces the parent's version/author headers — see
[the manifest model](/docs/architecture/manifests-and-versioning#the-manifest-model)).

## In this section

- **[Theme Settings](./theme-settings.md)** — the global design panel: its tabs, the
  `multi` / `box` → `group` layout convention, and the storage + read/write API.
- **[How settings become CSS](./settings-to-css.md)** — the single generated stylesheet, the
  design-token pipeline, and where bespoke CSS goes.
- **[Child themes](./child-themes.md)** — building, overriding and distributing a child theme,
  and moving a design between sites.
