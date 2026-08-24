---
title: Custom Fields — functions
sidebar_label: Custom Fields
slug: /functions/custom-fields
description: Public PHP helper functions in the UnysonPlus Custom Fields subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Custom Fields — functions

**1 public function.** 1 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_get_field`](#fw_get_field) | Read a custom field value saved by the Custom Fields extension. |

---

### `fw_get_field` {#fw_get_field}
*🔌 pluggable*

```php
fw_get_field( $name, $post_id = null, $default = null )
```

Read a custom field value saved by the Custom Fields extension.

Thin wrapper over fw_get_db_post_option(): the field's "name" is the post
meta / option id, so this resolves to whatever the field stored (string,
array, upload array, etc.).

| Parameter | Type | Description |
| --- | --- | --- |
| `$name` | `string` | The field name (its key). |
| `$post_id` | `int\|null` | Post id; defaults to the current post in the loop. |
| `$default` | `mixed` | Returned when nothing is stored. |

**Returns** `mixed`

<small>Source: `framework/extensions/custom-fields/helpers.php:19`</small>

← Back to [Functions overview](./index.md)
