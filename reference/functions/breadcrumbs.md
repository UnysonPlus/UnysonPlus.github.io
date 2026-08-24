---
title: Breadcrumbs — functions
sidebar_label: Breadcrumbs
slug: /functions/breadcrumbs
description: Public PHP helper functions in the UnysonPlus Breadcrumbs subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Breadcrumbs — functions

**2 public functions.** 0 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_ext_breadcrumbs`](#fw_ext_breadcrumbs) | Displays the breadcrumbs HTML. |
| [`fw_ext_get_breadcrumbs`](#fw_ext_get_breadcrumbs) | Returns the breadcrumbs HTML. |

---

### `fw_ext_breadcrumbs` {#fw_ext_breadcrumbs}

```php
fw_ext_breadcrumbs( $args = [] )
```

Displays the breadcrumbs HTML.

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `string\|array` | See fw_ext_get_breadcrumbs(). |

<small>Source: `framework/extensions/breadcrumbs/helpers.php:31`</small>

### `fw_ext_get_breadcrumbs` {#fw_ext_get_breadcrumbs}

```php
fw_ext_get_breadcrumbs( $args = [] )
```

Returns the breadcrumbs HTML.

arguments accepted by FW_Extension_Breadcrumbs::render()
                          (separator, prefix, home_icon, link_last, show_home,
                          show_on_front, truncate, post_taxonomy,
                          show_post_type_archive, schema, container_class).

| Parameter | Type | Description |
| --- | --- | --- |
| `$args` | `string\|array` | Separator string (back-compat) or an array of |

**Returns** `string`

<small>Source: `framework/extensions/breadcrumbs/helpers.php:16`</small>

← Back to [Functions overview](./index.md)
