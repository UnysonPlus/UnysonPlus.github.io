---
title: Sidebars — functions
sidebar_label: Sidebars
slug: /functions/sidebars
description: Public PHP helper functions in the UnysonPlus Sidebars subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Sidebars — functions

**3 public functions.** 0 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_ext_sidebars_get_current_position`](#fw_ext_sidebars_get_current_position) | Returns string (position-id) if DB has preset for current page else return false |
| [`fw_ext_sidebars_get_current_preset`](#fw_ext_sidebars_get_current_preset) | Returns array if DB has preset for current page else return null |
| [`fw_ext_sidebars_show`](#fw_ext_sidebars_show) | — |

---

### `fw_ext_sidebars_get_current_position` {#fw_ext_sidebars_get_current_position}

```php
fw_ext_sidebars_get_current_position()
```

Returns string (position-id) if DB has preset for current page else return false

<small>Source: `framework/extensions/sidebars/helpers.php:17`</small>

### `fw_ext_sidebars_get_current_preset` {#fw_ext_sidebars_get_current_preset}

```php
fw_ext_sidebars_get_current_preset()
```

Returns array if DB has preset for current page else return null

<small>Source: `framework/extensions/sidebars/helpers.php:25`</small>

### `fw_ext_sidebars_show` {#fw_ext_sidebars_show}

```php
fw_ext_sidebars_show($color)
```

<small>Source: `framework/extensions/sidebars/helpers.php:8`</small>

← Back to [Functions overview](./index.md)
