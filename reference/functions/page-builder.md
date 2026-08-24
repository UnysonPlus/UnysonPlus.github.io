---
title: Page Builder — functions
sidebar_label: Page Builder
slug: /functions/page-builder
description: Public PHP helper functions in the UnysonPlus Page Builder subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Page Builder — functions

**3 public functions.** 0 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_ext_page_builder_get_post_content`](#fw_ext_page_builder_get_post_content) | Returns the shortcodes generated from a post's page-builder JSON builder value. |
| [`fw_ext_page_builder_get_supported_post_types`](#fw_ext_page_builder_get_supported_post_types) | Returns all post types that can be integrated with the page builder |
| [`fw_ext_page_builder_is_builder_post`](#fw_ext_page_builder_is_builder_post) | Returns whether the given post was built with the page builder. |

---

### `fw_ext_page_builder_get_post_content` {#fw_ext_page_builder_get_post_content}
*since 1.5.1*

```php
fw_ext_page_builder_get_post_content($post)
```

Returns the shortcodes generated from a post's page-builder JSON builder value.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post` | `int\|WP_Post` | — |

**Returns** `string` Shortcodes generated from post meta json builder value

<small>Source: `framework/extensions/shortcodes/extensions/page-builder/helpers.php:47`</small>

### `fw_ext_page_builder_get_supported_post_types` {#fw_ext_page_builder_get_supported_post_types}

```php
fw_ext_page_builder_get_supported_post_types()
```

Returns all post types that can be integrated with the page builder

<small>Source: `framework/extensions/shortcodes/extensions/page-builder/helpers.php:16`</small>

### `fw_ext_page_builder_is_builder_post` {#fw_ext_page_builder_is_builder_post}

```php
fw_ext_page_builder_is_builder_post($post_id = '')
```

Returns whether the given post was built with the page builder.

<small>Source: `framework/extensions/shortcodes/extensions/page-builder/helpers.php:9`</small>

← Back to [Functions overview](./index.md)
