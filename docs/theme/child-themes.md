---
title: Child themes
sidebar_position: 4
---

# Child themes

You almost never ship the parent theme directly — you ship a **child** of it. The child inherits
every template, setting, and design-token from `unysonplus-theme` and overrides only the brand and
the handful of files a specific site needs. `payforituk` is the reference child theme.

## A minimal child theme

A child theme is two files:

```
your-child-theme/
├── style.css
└── functions.php
```

**`style.css`** — the `Template:` header is what makes it a child of the Unyson+ Theme:

```css
/*
Theme Name:  Acme Site
Template:    unysonplus-theme
Version:     1.0.0
*/
```

**`functions.php`** — enqueue the parent stylesheet, then add brand tweaks:

```php
<?php
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
} );
```

That's a working child theme. Activate it and you get the full parent theme; everything below is
*optional* override.

:::note Version is inherited from the parent
For a child theme, the framework forces the **version**, **author**, and **URI** from the *parent*
theme's headers (`FW_Theme_Manifest`). So the child's own `Version:` header isn't what the
framework reports — the parent's is.
:::

## What you can override

A child can override three different layers, each by mirroring a path:

| To override… | Put a file at… |
| --- | --- |
| A **template** | `your-child-theme/<template>.php` (e.g. `header.php`, `page-full-width.php`) — standard WordPress child-theme override. |
| A **Theme Settings** schema / add settings | `your-child-theme/framework-customizations/theme/options/<file>.php` |
| An **extension** file | `your-child-theme/framework-customizations/extensions/<ext>/<path>` |

The last two use the framework's three-location merge (framework → parent → child), so a child
file supplements or replaces the parent's without editing the parent. See
[The extension system → three locations](/docs/architecture/extension-system#three-locations).

:::tip Document only the deltas
A child theme does **not** copy the parent's docs/`AGENTS.md`. If it adds or changes settings,
templates, or CSS-token maps, give it its own *thin* `framework-customizations/theme/options/
AGENTS.md` documenting **only those deltas**, linking back to the parent. Knowledge lives where the
code lives.
:::

## Distributing a child theme

There are two distinct things you might distribute, and they travel differently:

### 1. The theme itself

Zip the child theme directory and install it like any WordPress theme (or push it to a GitHub repo
and let the bundled **GitHub auto-updater** keep it current — the parent theme and every extension
update the same way). The child needs the Unyson+ **plugin** + the **parent theme** present.

### 2. The design (settings) {#moving-a-design-between-sites}

The *design layer* — colors, fonts, header/footer, layout, custom CSS — is not baked into the
theme files; it lives in Theme Settings. To move it between sites, use the built-in **design
export/import** (Appearance → Theme Settings → Miscellaneous → Export / Import):

```json
{
  "_fw_settings_export": {
    "format_version": 1,
    "scope": "design",
    "theme_id": "unysonplus",
    "theme_version": "2.2.22",
    "media_stripped": true
  },
  "values": { "general_layout": { /* … */ }, "typography": { /* … */ } }
}
```

Two rules are baked into the format:

- **Design-only scope.** Operational keys (`misc_analytics`, `misc_performance`,
  `misc_maintenance`, `misc_404`, `misc_custom_scripts`) are excluded on export **and ignored on
  import** — a design file can't overwrite a site's tracking/ops or inject `<script>`.
- **Media stripped.** Any value carrying an `attachment_id` (logos, background images, favicon) is
  blanked on export, because source-site ids don't exist on the target. Colors / fonts / layout /
  CSS transfer; the user re-adds images.

Import is an **overlay**: imported top-level keys replace their counterparts; keys the file doesn't
carry are preserved.

:::tip A full "design package" = settings + templates
Pair a design settings `.json` with page-builder **section / full / column templates** (exported
from the builder) and you've captured a complete site design — chrome *and* content — as portable
files. See [the builder template format](/docs/page-builder/builder-json-format#distributable-template-envelope).
:::
