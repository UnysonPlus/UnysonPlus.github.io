---
title: Theme Settings
sidebar_position: 2
---

# Theme Settings

**Theme Settings** (Appearance → Theme Settings) is the global design layer: colors, typography,
the header and footer, layout, and custom CSS. Page *content* lives in the page builder; this panel
is the **site chrome and design tokens**. Together, a theme-settings file + a set of builder
templates make up a complete "design package" for a site.

The schema lives in `framework-customizations/theme/options/`, where `settings.php` aggregates the
tabs.

## The tabs

<img src="/img/theme/theme-settings-header.png" alt="Theme Settings — Header tab, Identity sub-tab (site title, logo uploads, favicon, tagline)" width="1238" />

| Tab | What it controls |
| --- | --- |
| **General** | Sub-tabs: Layout (site width/background/spacing scale/border roundness), Typography (h1–h6 + body + custom fonts), Colors (pointer to the plugin's preset libraries), Sidebar, Preloader, Scrolling, Image Sizes. |
| **Header** | Sub-tabs: Identity (logo + favicon), Layout (header mode: top / vertical / off-canvas / overlay), Menu, Top Bar, Main Header, Bottom Bar. |
| **Social** | The `social_profiles` list (name, URL, icon, new-tab) — consumed by the Social Icons element and the footer. |
| **Footer** | Background/overlay, text & link colors, padding, and the Pre / Main / Post footer rows + copyright. |
| **Blog** | Index, Single Post, and Archives/Search layouts (list/grid/masonry, columns, meta, author box, related posts). |
| **WooCommerce** | A pointer tab (only when WooCommerce is active) — the real shop settings are owned by the WooCommerce *extension*. |
| **Misc** | Scroll-to-top, dark mode, global Custom CSS, custom scripts, analytics, performance, 404, maintenance, and the design Export/Import control. |

:::note Each tab is a `multi` container
A tab or box is a `multi` container, so its top-level option id (`general_layout`, `header_logo`,
`misc_custom_css`, …) stores a **nested array** of that group's fields. Reads use the same key path
whether or not the option was later split across sub-tabs.
:::

## The box → group layout convention

This is the canonical look of Unyson settings pages, and the convention to follow for **any**
settings page built from option arrays. Each section is a **`box`** container — which Unyson
renders as a WordPress **postbox** (a bordered card with a title bar) inside a
`.fw-backend-postboxes.metabox-holder` wrapper. Inside each box, the fields are wrapped in a nested
**`group`** container, which renders a border-less `<div>` so the fields read as one cohesive group
(no inner borders between rows):

```php
'general_layout_box' => [
    'title'   => __( 'Layout', 'unysonplus' ),
    'type'    => 'box',
    'options' => [
        'group_layout' => [
            'type'    => 'group',          // border-less wrapper — visual only
            'options' => [
                // the real fields live here; their ids (and saved values) are unchanged
                'site_width'  => [ 'label' => 'Site Width', 'type' => 'multi-picker', /* … */ ],
                'container_gutter' => [ 'label' => 'Container Gutter', 'type' => 'unit-input' ],
            ],
        ],
    ],
],
```

:::tip The `group` wrapper is an id-only container
`group_layout` is **not stored** — it's a layout container, so the leaf field ids (and therefore
saved values) are unchanged. Adding or removing the wrapper never loses data. Use a unique group
key per box (`group_layout`, `group_identity`, …) and apply it to **every** box for consistency.
:::

This box → group pattern is the standard for settings/admin option pages. The one exception is a
**bespoke management dashboard** with its own HTML/CSS/JS (the Shortcodes extension's card-grid
settings page is the canonical example) — those are *not* wrapped in postboxes.

## Storage & the read/write API

Everything on this panel persists to **one** wp_option, `fw_theme_settings_options:{theme-id}`
(the theme id comes from the manifest). Read and write it with the framework helpers:

```php
// Read — null returns the full values array; multi-key paths drill in:
$layout = fw_get_db_settings_option();                          // everything
$bg     = fw_get_db_settings_option( 'general_layout/site_bg_color' );
$css    = fw_get_db_settings_option( 'misc_custom_css' );

// Write:
fw_set_db_settings_option( 'misc_custom_css', $value );

// Validate posted input against the schema (e.g. in a custom save path):
$values = fw_get_options_values_from_input( fw()->theme->get_settings_options(), $input );
```

## Schema migrations

When you change the **shape** of stored settings (split an option, rename a key, drop a field),
don't rely on read-time fallbacks forever — add a migration. The theme runs them through one
**versioned runner** in `inc/includes/migrations.php`:

- `UNYSONPLUS_SCHEMA_VERSION` is the current target version.
- `unysonplus_schema_migrations()` maps `version => callback`.
- `unysonplus_run_schema_migrations()` (on `admin_init`) runs every callback newer than the stored
  `unysonplus_schema_version`, in order, then advances it.

Each callback lives next to the code it migrates and **must be idempotent** — the version gate is
the fast path, the per-migration guards are the correctness backstop, so a re-run or a fresh
install is a no-op. To add one: write the idempotent callback, register `<n> => 'callback'`, bump
the constant to `<n>`.

:::caution Don't read settings during framework boot
Reading Theme Settings inside an extension's `_init()` can force the option types to initialize
before the page-builder extension registers its `page-builder` option type, producing *"Undefined
option type: page-builder"*. Defer settings reads to `init` or later — see
[the boot guide](/docs/architecture/framework-boot).
:::
