---
title: Breadcrumbs — hooks
sidebar_label: Breadcrumbs
slug: /hooks/breadcrumbs
description: Actions and filters exposed by the UnysonPlus Breadcrumbs subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Breadcrumbs — hooks

**12 hooks** — 0 actions · 12 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_breadcrumbs_args`](#h-fw-ext-breadcrumbs-args) | filter | — |
| [`fw_ext_breadcrumbs_build`](#h-fw-ext-breadcrumbs-build) | filter | — |
| [`fw_ext_breadcrumbs_current_page`](#h-fw-ext-breadcrumbs-current-page) | filter | — |
| [`fw_ext_breadcrumbs_date_day_format`](#h-fw-ext-breadcrumbs-date-day-format) | filter | — |
| [`fw_ext_breadcrumbs_date_month_format`](#h-fw-ext-breadcrumbs-date-month-format) | filter | — |
| [`fw_ext_breadcrumbs_date_year_format`](#h-fw-ext-breadcrumbs-date-year-format) | filter | — |
| [`fw_ext_breadcrumbs_items`](#h-fw-ext-breadcrumbs-items) | filter | — |
| [`fw_ext_breadcrumbs_primary_term_meta_keys`](#h-fw-ext-breadcrumbs-primary-term-meta-keys) | filter | — |
| [`fw_ext_breadcrumbs_search_query`](#h-fw-ext-breadcrumbs-search-query) | filter | — |
| [`fw_ext_breadcrumbs_settings_options_default_values`](#h-fw-ext-breadcrumbs-settings-options-default-values) | filter | — |
| [`fw:ext:breadcrumbs:settings-options:after`](#h-fw-ext-breadcrumbs-settings-options-after) | filter | — |
| [`fw:ext:breadcrumbs:settings-options:before`](#h-fw-ext-breadcrumbs-settings-options-before) | filter | — |

---

### `fw_ext_breadcrumbs_args` {#h-fw-ext-breadcrumbs-args}
*🧪 filter*

```php
add_filter( 'fw_ext_breadcrumbs_args', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/class-fw-extension-breadcrumbs.php:101`</small>

### `fw_ext_breadcrumbs_build` {#h-fw-ext-breadcrumbs-build}
*🧪 filter · 2 call sites*

```php
add_filter( 'fw_ext_breadcrumbs_build', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:311`</small>

### `fw_ext_breadcrumbs_current_page` {#h-fw-ext-breadcrumbs-current-page}
*🧪 filter*

```php
add_filter( 'fw_ext_breadcrumbs_current_page', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:307`</small>

### `fw_ext_breadcrumbs_date_day_format` {#h-fw-ext-breadcrumbs-date-day-format}
*🧪 filter*

```php
add_filter( 'fw_ext_breadcrumbs_date_day_format', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:449`</small>

### `fw_ext_breadcrumbs_date_month_format` {#h-fw-ext-breadcrumbs-date-month-format}
*🧪 filter*

```php
add_filter( 'fw_ext_breadcrumbs_date_month_format', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:457`</small>

### `fw_ext_breadcrumbs_date_year_format` {#h-fw-ext-breadcrumbs-date-year-format}
*🧪 filter*

```php
add_filter( 'fw_ext_breadcrumbs_date_year_format', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:464`</small>

### `fw_ext_breadcrumbs_items` {#h-fw-ext-breadcrumbs-items}
*🧪 filter*

```php
add_filter( 'fw_ext_breadcrumbs_items', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/class-fw-extension-breadcrumbs.php:117`</small>

### `fw_ext_breadcrumbs_primary_term_meta_keys` {#h-fw-ext-breadcrumbs-primary-term-meta-keys}
*🧪 filter*

```php
add_filter( 'fw_ext_breadcrumbs_primary_term_meta_keys', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:179`</small>

### `fw_ext_breadcrumbs_search_query` {#h-fw-ext-breadcrumbs-search-query}
*🧪 filter*

```php
add_filter( 'fw_ext_breadcrumbs_search_query', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:329`</small>

### `fw_ext_breadcrumbs_settings_options_default_values` {#h-fw-ext-breadcrumbs-settings-options-default-values}
*🧪 filter*

```php
add_filter( 'fw_ext_breadcrumbs_settings_options_default_values', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/settings-options.php:5`</small>

### `fw:ext:breadcrumbs:settings-options:after` {#h-fw-ext-breadcrumbs-settings-options-after}
*🧪 filter*

```php
add_filter( 'fw:ext:breadcrumbs:settings-options:after', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/settings-options.php:146`</small>

### `fw:ext:breadcrumbs:settings-options:before` {#h-fw-ext-breadcrumbs-settings-options-before}
*🧪 filter*

```php
add_filter( 'fw:ext:breadcrumbs:settings-options:before', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/settings-options.php:14`</small>

← Back to [Hooks overview](./index.md)
