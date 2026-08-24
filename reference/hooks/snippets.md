---
title: Snippets — hooks
sidebar_label: Snippets
slug: /hooks/snippets
description: Actions and filters exposed by the UnysonPlus Snippets subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Snippets — hooks

**3 hooks** — 0 actions · 3 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_snippets_feature_supports`](#h-fw-ext-snippets-feature-supports) | filter | Filters the supports array (title, editor, revisions) used when registering the snippets post type. |
| [`fw_ext_snippets_post_type_name`](#h-fw-ext-snippets-post-type-name) | filter | Filters the singular and plural labels used when registering the snippets post type. |
| [`fw_ext_snippets_strip_auto_sections`](#h-fw-ext-snippets-strip-auto-sections) | filter | Filters whether a rendered snippet's auto-wrapped page-builder sections are unwrapped, passing the snippet id; defaults to true. |

---

### `fw_ext_snippets_feature_supports` {#h-fw-ext-snippets-feature-supports}
*🧪 filter*

Filters the supports array (title, editor, revisions) used when registering the snippets post type.

```php
add_filter( 'fw_ext_snippets_feature_supports', $callback );
```
<small>Fired in: `framework/extensions/snippets/class-fw-extension-snippets.php:506`</small>

### `fw_ext_snippets_post_type_name` {#h-fw-ext-snippets-post-type-name}
*🧪 filter*

Filters the singular and plural labels used when registering the snippets post type.

```php
add_filter( 'fw_ext_snippets_post_type_name', $callback );
```
<small>Fired in: `framework/extensions/snippets/class-fw-extension-snippets.php:497`</small>

### `fw_ext_snippets_strip_auto_sections` {#h-fw-ext-snippets-strip-auto-sections}
*🧪 filter*

Filters whether a rendered snippet's auto-wrapped page-builder sections are unwrapped, passing the snippet id; defaults to true.

```php
add_filter( 'fw_ext_snippets_strip_auto_sections', $callback );
```
<small>Fired in: `framework/extensions/snippets/helpers.php:52`</small>

← Back to [Hooks overview](./index.md)
