---
title: Builder (base) — functions
sidebar_label: Builder (base)
slug: /functions/builder-base
description: Public PHP helper functions in the UnysonPlus Builder (base) subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Builder (base) — functions

**3 public functions.** 0 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_ext_builder_get_item_width`](#fw_ext_builder_get_item_width) | — |
| [`fw_ext_builder_get_item_widths_for_js`](#fw_ext_builder_get_item_widths_for_js) | Get builder item widths for using in js (wp_localize_script() or json_encode()) |
| [`fw_ext_builder_string_to_icon_html`](#fw_ext_builder_string_to_icon_html) | — |

---

### `fw_ext_builder_get_item_width` {#fw_ext_builder_get_item_width}

```php
fw_ext_builder_get_item_width($builder_type, $width_id = null, $default_value = null)
```

<small>Source: `framework/extensions/builder/helpers.php:16`</small>

### `fw_ext_builder_get_item_widths_for_js` {#fw_ext_builder_get_item_widths_for_js}

```php
fw_ext_builder_get_item_widths_for_js($builder_type)
```

Get builder item widths for using in js (wp_localize_script() or json_encode())

| Parameter | Type | Description |
| --- | --- | --- |
| `$builder_type` | `string` | Builder option type (some builders can have different item widths) |

**Returns** `array`

<small>Source: `framework/extensions/builder/helpers.php:46`</small>

### `fw_ext_builder_string_to_icon_html` {#fw_ext_builder_string_to_icon_html}

```php
fw_ext_builder_string_to_icon_html($icon)
```

| Parameter | Type | Description |
| --- | --- | --- |
| `$icon` | `string` | A string that is meant to be an icon (an image, a font icon class, or something else) |

**Returns** `string`

<small>Source: `framework/extensions/builder/helpers.php:62`</small>

← Back to [Functions overview](./index.md)
