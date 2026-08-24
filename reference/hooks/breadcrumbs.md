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
| [`fw_ext_breadcrumbs_args`](#h-fw-ext-breadcrumbs-args) | filter | Filters the merged breadcrumb arguments before the trail is built, allowing overrides of defaults and settings. |
| [`fw_ext_breadcrumbs_build`](#h-fw-ext-breadcrumbs-build) | filter | Filters the final breadcrumb items array built for a custom current page. |
| [`fw_ext_breadcrumbs_current_page`](#h-fw-ext-breadcrumbs-current-page) | filter | Filters a custom current-page crumb, letting listeners inject their own final breadcrumb item. |
| [`fw_ext_breadcrumbs_date_day_format`](#h-fw-ext-breadcrumbs-date-day-format) | filter | Filters the PHP date format used for a daily archive breadcrumb label (default 'd F Y'). |
| [`fw_ext_breadcrumbs_date_month_format`](#h-fw-ext-breadcrumbs-date-month-format) | filter | Filters the PHP date format used for a monthly archive breadcrumb label (default 'F Y'). |
| [`fw_ext_breadcrumbs_date_year_format`](#h-fw-ext-breadcrumbs-date-year-format) | filter | Filters the PHP date format used for a yearly archive breadcrumb label (default 'Y'). |
| [`fw_ext_breadcrumbs_items`](#h-fw-ext-breadcrumbs-items) | filter | Filters the final breadcrumb items array before rendering, receiving the resolved trail and build args. |
| [`fw_ext_breadcrumbs_primary_term_meta_keys`](#h-fw-ext-breadcrumbs-primary-term-meta-keys) | filter | Filters the meta-key patterns used to detect an SEO primary term (Yoast, Rank Math) for the breadcrumb. |
| [`fw_ext_breadcrumbs_search_query`](#h-fw-ext-breadcrumbs-search-query) | filter | Filters the search query string appended to the search results breadcrumb URL. |
| [`fw_ext_breadcrumbs_settings_options_default_values`](#h-fw-ext-breadcrumbs-settings-options-default-values) | filter | Filters the default breadcrumb settings values (homepage/blog/404 titles, separator, prefix). |
| [`fw:ext:breadcrumbs:settings-options:after`](#h-fw-ext-breadcrumbs-settings-options-after) | filter | Filters options appended after the breadcrumbs settings so extensions can add trailing settings fields. |
| [`fw:ext:breadcrumbs:settings-options:before`](#h-fw-ext-breadcrumbs-settings-options-before) | filter | Filters options inserted before the breadcrumbs settings so extensions can prepend settings fields. |

---

### `fw_ext_breadcrumbs_args` {#h-fw-ext-breadcrumbs-args}
*🧪 filter*

Filters the merged breadcrumb arguments before the trail is built, allowing overrides of defaults and settings.

```php
add_filter( 'fw_ext_breadcrumbs_args', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/class-fw-extension-breadcrumbs.php:102`</small>

### `fw_ext_breadcrumbs_build` {#h-fw-ext-breadcrumbs-build}
*🧪 filter · 2 call sites*

Filters the final breadcrumb items array built for a custom current page.

```php
add_filter( 'fw_ext_breadcrumbs_build', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:314`</small>

### `fw_ext_breadcrumbs_current_page` {#h-fw-ext-breadcrumbs-current-page}
*🧪 filter*

Filters a custom current-page crumb, letting listeners inject their own final breadcrumb item.

```php
add_filter( 'fw_ext_breadcrumbs_current_page', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:309`</small>

### `fw_ext_breadcrumbs_date_day_format` {#h-fw-ext-breadcrumbs-date-day-format}
*🧪 filter*

Filters the PHP date format used for a daily archive breadcrumb label (default 'd F Y').

```php
add_filter( 'fw_ext_breadcrumbs_date_day_format', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:454`</small>

### `fw_ext_breadcrumbs_date_month_format` {#h-fw-ext-breadcrumbs-date-month-format}
*🧪 filter*

Filters the PHP date format used for a monthly archive breadcrumb label (default 'F Y').

```php
add_filter( 'fw_ext_breadcrumbs_date_month_format', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:463`</small>

### `fw_ext_breadcrumbs_date_year_format` {#h-fw-ext-breadcrumbs-date-year-format}
*🧪 filter*

Filters the PHP date format used for a yearly archive breadcrumb label (default 'Y').

```php
add_filter( 'fw_ext_breadcrumbs_date_year_format', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:471`</small>

### `fw_ext_breadcrumbs_items` {#h-fw-ext-breadcrumbs-items}
*🧪 filter*

Filters the final breadcrumb items array before rendering, receiving the resolved trail and build args.

```php
add_filter( 'fw_ext_breadcrumbs_items', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/class-fw-extension-breadcrumbs.php:119`</small>

### `fw_ext_breadcrumbs_primary_term_meta_keys` {#h-fw-ext-breadcrumbs-primary-term-meta-keys}
*🧪 filter*

Filters the meta-key patterns used to detect an SEO primary term (Yoast, Rank Math) for the breadcrumb.

```php
add_filter( 'fw_ext_breadcrumbs_primary_term_meta_keys', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:180`</small>

### `fw_ext_breadcrumbs_search_query` {#h-fw-ext-breadcrumbs-search-query}
*🧪 filter*

Filters the search query string appended to the search results breadcrumb URL.

```php
add_filter( 'fw_ext_breadcrumbs_search_query', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php:333`</small>

### `fw_ext_breadcrumbs_settings_options_default_values` {#h-fw-ext-breadcrumbs-settings-options-default-values}
*🧪 filter*

Filters the default breadcrumb settings values (homepage/blog/404 titles, separator, prefix).

```php
add_filter( 'fw_ext_breadcrumbs_settings_options_default_values', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/settings-options.php:6`</small>

### `fw:ext:breadcrumbs:settings-options:after` {#h-fw-ext-breadcrumbs-settings-options-after}
*🧪 filter*

Filters options appended after the breadcrumbs settings so extensions can add trailing settings fields.

```php
add_filter( 'fw:ext:breadcrumbs:settings-options:after', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/settings-options.php:149`</small>

### `fw:ext:breadcrumbs:settings-options:before` {#h-fw-ext-breadcrumbs-settings-options-before}
*🧪 filter*

Filters options inserted before the breadcrumbs settings so extensions can prepend settings fields.

```php
add_filter( 'fw:ext:breadcrumbs:settings-options:before', $callback );
```
<small>Fired in: `framework/extensions/breadcrumbs/settings-options.php:16`</small>

← Back to [Hooks overview](./index.md)
