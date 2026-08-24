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
| [`fw_ext_post_types_archive_query`](#h-fw-ext-post-types-archive-query) | filter | Filters the query vars applied to a user-created post type's archive, given the post type, definition, and query. |
| [`fw_ext_post_types_args`](#h-fw-ext-post-types-args) | filter | Filters the final register_post_type() args for a user-created post type before it is registered, passing the slug and saved definition row. |
| [`fw_ext_post_types_blueprints`](#h-fw-ext-post-types-blueprints) | filter | Filters the available Post Types blueprints (slug to definition map) offered when creating a new post type or taxonomy. |
| [`fw_ext_post_types_saved`](#h-fw-ext-post-types-saved) | action | Fires after post type and taxonomy definitions change, passing new and previous definitions so listeners can invalidate registration-dependent caches. |
| [`fw_ext_post_types_taxonomy_args`](#h-fw-ext-post-types-taxonomy-args) | filter | Filters the final register_taxonomy() args for a user-created taxonomy before registration, passing the slug, bound object types, and definition row. |
| [`fw_unysonplus_admin_submenu_order`](#h-fw-unysonplus-admin-submenu-order) | filter | Filters the ordering of Unyson+ admin submenu items by page slug, letting code reorder the submenu. |

---

### `fw_ext_post_types_archive_query` {#h-fw-ext-post-types-archive-query}
*🧪 filter*

Filters the query vars applied to a user-created post type's archive, given the post type, definition, and query.

```php
add_filter( 'fw_ext_post_types_archive_query', $callback );
```
<small>Fired in: `framework/extensions/post-types/includes/class-fw-post-types-registrar.php:463`</small>

### `fw_ext_post_types_args` {#h-fw-ext-post-types-args}
*🧪 filter*

Filters the final register_post_type() args for a user-created post type before it is registered, passing the slug and saved definition row.

```php
add_filter( 'fw_ext_post_types_args', $callback );
```
<small>Fired in: `framework/extensions/post-types/includes/class-fw-post-types-registrar.php:139`</small>

### `fw_ext_post_types_blueprints` {#h-fw-ext-post-types-blueprints}
*🧪 filter*

Filters the available Post Types blueprints (slug to definition map) offered when creating a new post type or taxonomy.

```php
add_filter( 'fw_ext_post_types_blueprints', $callback );
```
<small>Fired in: `framework/extensions/post-types/includes/class-fw-post-types-blueprints.php:329`</small>

### `fw_ext_post_types_saved` {#h-fw-ext-post-types-saved}
*🎬 action*

Fires after post type and taxonomy definitions change, passing new and previous definitions so listeners can invalidate registration-dependent caches.

```php
add_action( 'fw_ext_post_types_saved', $callback );
```
<small>Fired in: `framework/extensions/post-types/class-fw-extension-post-types.php:182`</small>

### `fw_ext_post_types_taxonomy_args` {#h-fw-ext-post-types-taxonomy-args}
*🧪 filter*

Filters the final register_taxonomy() args for a user-created taxonomy before registration, passing the slug, bound object types, and definition row.

```php
add_filter( 'fw_ext_post_types_taxonomy_args', $callback );
```
<small>Fired in: `framework/extensions/post-types/includes/class-fw-post-types-registrar.php:267`</small>

### `fw_unysonplus_admin_submenu_order` {#h-fw-unysonplus-admin-submenu-order}
*🧪 filter*

Filters the ordering of Unyson+ admin submenu items by page slug, letting code reorder the submenu.

```php
add_filter( 'fw_unysonplus_admin_submenu_order', $callback );
```
<small>Fired in: `framework/extensions/post-types/class-fw-extension-post-types.php:281`</small>

← Back to [Hooks overview](./index.md)
