---
title: Post Types — hooks
sidebar_label: Post Types
slug: /hooks/post-types
description: Actions and filters exposed by the UnysonPlus Post Types subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Post Types — hooks

**6 hooks** — 1 actions · 5 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_post_types_archive_query`](#h-fw-ext-post-types-archive-query) | filter | — |
| [`fw_ext_post_types_args`](#h-fw-ext-post-types-args) | filter | — |
| [`fw_ext_post_types_blueprints`](#h-fw-ext-post-types-blueprints) | filter | — |
| [`fw_ext_post_types_saved`](#h-fw-ext-post-types-saved) | action | — |
| [`fw_ext_post_types_taxonomy_args`](#h-fw-ext-post-types-taxonomy-args) | filter | — |
| [`fw_unysonplus_admin_submenu_order`](#h-fw-unysonplus-admin-submenu-order) | filter | — |

---

### `fw_ext_post_types_archive_query` {#h-fw-ext-post-types-archive-query}
*🧪 filter*

```php
add_filter( 'fw_ext_post_types_archive_query', $callback );
```
<small>Fired in: `framework/extensions/post-types/includes/class-fw-post-types-registrar.php:457`</small>

### `fw_ext_post_types_args` {#h-fw-ext-post-types-args}
*🧪 filter*

```php
add_filter( 'fw_ext_post_types_args', $callback );
```
<small>Fired in: `framework/extensions/post-types/includes/class-fw-post-types-registrar.php:137`</small>

### `fw_ext_post_types_blueprints` {#h-fw-ext-post-types-blueprints}
*🧪 filter*

```php
add_filter( 'fw_ext_post_types_blueprints', $callback );
```
<small>Fired in: `framework/extensions/post-types/includes/class-fw-post-types-blueprints.php:327`</small>

### `fw_ext_post_types_saved` {#h-fw-ext-post-types-saved}
*🎬 action*

```php
add_action( 'fw_ext_post_types_saved', $callback );
```
<small>Fired in: `framework/extensions/post-types/class-fw-extension-post-types.php:180`</small>

### `fw_ext_post_types_taxonomy_args` {#h-fw-ext-post-types-taxonomy-args}
*🧪 filter*

```php
add_filter( 'fw_ext_post_types_taxonomy_args', $callback );
```
<small>Fired in: `framework/extensions/post-types/includes/class-fw-post-types-registrar.php:263`</small>

### `fw_unysonplus_admin_submenu_order` {#h-fw-unysonplus-admin-submenu-order}
*🧪 filter*

```php
add_filter( 'fw_unysonplus_admin_submenu_order', $callback );
```
<small>Fired in: `framework/extensions/post-types/class-fw-extension-post-types.php:277`</small>

← Back to [Hooks overview](./index.md)
