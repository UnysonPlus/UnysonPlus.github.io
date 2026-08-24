---
title: Sidebars — hooks
sidebar_label: Sidebars
slug: /hooks/sidebars
description: Actions and filters exposed by the UnysonPlus Sidebars subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Sidebars — hooks

**4 hooks** — 0 actions · 4 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_sidebars_conditional_tags`](#h-fw-ext-sidebars-conditional-tags) | filter | Filters the list of conditional tags available for assigning dynamic sidebar replacement rules. |
| [`fw_ext_sidebars_post_types`](#h-fw-ext-sidebars-post-types) | filter | Filters the public post types offered as targets when configuring sidebar replacement conditions. |
| [`fw_ext_sidebars_settings_options`](#h-fw-ext-sidebars-settings-options) | filter | Filters the options array building the Sidebars extension settings form, starting empty for others to populate. |
| [`fw_ext_sidebars_taxonomies`](#h-fw-ext-sidebars-taxonomies) | filter | Filters the public taxonomies offered as targets when configuring sidebar replacement conditions. |

---

### `fw_ext_sidebars_conditional_tags` {#h-fw-ext-sidebars-conditional-tags}
*🧪 filter*

Filters the list of conditional tags available for assigning dynamic sidebar replacement rules.

```php
add_filter( 'fw_ext_sidebars_conditional_tags', $callback );
```
<small>Fired in: `framework/extensions/sidebars/includes/class-fw-extension-sidebars-config.php:125`</small>

### `fw_ext_sidebars_post_types` {#h-fw-ext-sidebars-post-types}
*🧪 filter*

Filters the public post types offered as targets when configuring sidebar replacement conditions.

```php
add_filter( 'fw_ext_sidebars_post_types', $callback );
```
<small>Fired in: `framework/extensions/sidebars/includes/class-fw-extension-sidebars-config.php:239`</small>

### `fw_ext_sidebars_settings_options` {#h-fw-ext-sidebars-settings-options}
*🧪 filter*

Filters the options array building the Sidebars extension settings form, starting empty for others to populate.

```php
add_filter( 'fw_ext_sidebars_settings_options', $callback );
```
<small>Fired in: `framework/extensions/sidebars/settings-options.php:6`</small>

### `fw_ext_sidebars_taxonomies` {#h-fw-ext-sidebars-taxonomies}
*🧪 filter*

Filters the public taxonomies offered as targets when configuring sidebar replacement conditions.

```php
add_filter( 'fw_ext_sidebars_taxonomies', $callback );
```
<small>Fired in: `framework/extensions/sidebars/includes/class-fw-extension-sidebars-config.php:230`</small>

← Back to [Hooks overview](./index.md)
