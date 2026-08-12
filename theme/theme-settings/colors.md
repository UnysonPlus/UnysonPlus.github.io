---
title: Colors
sidebar_position: 1
slug: /theme-settings/colors
description: The Unyson+ theme palette — the theme_colors preset list that drives .text-* / .bg-* utilities and --color-* CSS variables across the site.
---

# Colors

The Colors tab is the site **palette** — a `theme_colors` list of `{ name, color }` rows (an
addable-box). It's defined by the plugin and surfaced at **Theme Settings → General → Colors**.

Each row's **name** becomes a slug, and that slug drives three things:

- a `.text-{slug}` utility (e.g. `.text-primary`),
- a `.bg-{slug}` utility (e.g. `.bg-primary`), and
- a `--color-{slug}` CSS variable.

So renaming or recoloring a row updates every element, preset, and shortcode that references it.
**`Primary` is special** — it drives `btn-primary` and `--color-primary`, so it's effectively the
brand color.

## Default rows

The palette ships with a full set of named colors — **Primary, Secondary, Accent, Muted, Black,
White, Gray, Red, Green, Orange**, plus Light Gray, Pink, Purple, Deep Purple, Indigo, Blue, Light
Blue, Cyan, Teal, Light Green, Lime, Yellow, Amber, Deep Orange, Brown, and Blue Gray.

## Re-brand a site

Change a row's color (most often **Primary**) and everything that references that slug follows. In
code, read the defaults, change the row, and write the whole array back:

```php
$presets = unysonplus_default_color_presets();
foreach ( $presets as &$p ) {
    if ( $p['name'] === 'Primary' ) { $p['color'] = '#f97316'; }
}
fw_set_db_settings_option( 'theme_colors', $presets ); // --color-primary + btn-primary go orange
```

:::tip
Anywhere a shortcode or element offers a color, it can pick a palette **preset** (which stays in sync
if you re-brand) instead of a raw hex — prefer the preset so a palette change flows through.
:::
