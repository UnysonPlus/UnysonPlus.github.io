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
| [`fw_ext_snippets_feature_supports`](#h-fw-ext-snippets-feature-supports) | filter | — |
| [`fw_ext_snippets_post_type_name`](#h-fw-ext-snippets-post-type-name) | filter | — |
| [`fw_ext_snippets_strip_auto_sections`](#h-fw-ext-snippets-strip-auto-sections) | filter | — |

---

### `fw_ext_snippets_feature_supports` {#h-fw-ext-snippets-feature-supports}
*🧪 filter*

```php
add_filter( 'fw_ext_snippets_feature_supports', $callback );
```
<small>Fired in: `framework/extensions/snippets/class-fw-extension-snippets.php:504`</small>

### `fw_ext_snippets_post_type_name` {#h-fw-ext-snippets-post-type-name}
*🧪 filter*

```php
add_filter( 'fw_ext_snippets_post_type_name', $callback );
```
<small>Fired in: `framework/extensions/snippets/class-fw-extension-snippets.php:496`</small>

### `fw_ext_snippets_strip_auto_sections` {#h-fw-ext-snippets-strip-auto-sections}
*🧪 filter*

```php
add_filter( 'fw_ext_snippets_strip_auto_sections', $callback );
```
<small>Fired in: `framework/extensions/snippets/helpers.php:51`</small>

← Back to [Hooks overview](./index.md)
