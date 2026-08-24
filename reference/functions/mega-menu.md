---
title: Mega Menu — functions
sidebar_label: Mega Menu
slug: /functions/mega-menu
description: Public PHP helper functions in the UnysonPlus Mega Menu subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Mega Menu — functions

**21 public functions.** 1 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_ext_mega_menu_color_to_css`](#fw_ext_mega_menu_color_to_css) | Resolve a color value to a CSS color string. Prefers the shortcodes extension's sc_color_to_css() (compact preset picker → var(--color-&#123;slug&#125;) or custom hex); falls back to a self-contained resolver when that extension is inactive (values are then plain color-picker strings). Tolerates the legacy plain-hex shape either way, so no data migration is needed. |
| [`fw_ext_mega_menu_column_style`](#fw_ext_mega_menu_column_style) | Build the inline style for a MegaMenu column &lt;li&gt; (background color + image). Per-part escaped, concatenated raw (matches the row helper's usage). |
| [`fw_ext_mega_menu_get_db_item_option`](#fw_ext_mega_menu_get_db_item_option) | Get item option value from the database |
| [`fw_ext_mega_menu_get_item_option`](#fw_ext_mega_menu_get_item_option) | Read a single per-item option value (defined in options/&#123;row,column,item,default&#125;.php) saved through the "Settings" modal (FW_Db_Options_Model_MegaMenu). |
| [`fw_ext_mega_menu_get_meta`](#fw_ext_mega_menu_get_meta) | Returns a mega menu meta value for a post, falling back to the given default. |
| [`fw_ext_mega_menu_group`](#fw_ext_mega_menu_group) | Wrap a set of options in a border-less group container (house style), keyed by a distinct group id. Container-only — leaf ids and saved values are unchanged. |
| [`fw_ext_mega_menu_icon_is_set`](#fw_ext_mega_menu_icon_is_set) | Is an icon value (icon-v2 array, or a legacy class string) actually set? |
| [`fw_ext_mega_menu_icon_options`](#fw_ext_mega_menu_icon_options) | The shared Icon + Icon Position options, added to every per-item options set (row / column / item / default) so the icon is edited inside the "Settings" modal instead of the old standalone control. |
| [`fw_ext_mega_menu_is_mm_item`](#fw_ext_mega_menu_is_mm_item) | Check if menu item is a MegaMenu item or is inside a MegaMenu item |
| [`fw_ext_mega_menu_item_icon`](#fw_ext_mega_menu_item_icon) | The icon VALUE for a menu item — the modern per-item option (icon-v2) when set, otherwise the legacy `mega-menu[id][icon]` class string saved by the old standalone "Edit Icon" control. Returns null when there is no icon. |
| [`fw_ext_mega_menu_item_type`](#fw_ext_mega_menu_item_type) | The per-item options type for a menu item, by its MegaMenu level: 1 = row (top trigger), 2 = column, 3+ = item, 0 = default (non-mega item). |
| [`fw_ext_mega_menu_link_target_attr`](#fw_ext_mega_menu_link_target_attr) | New-tab attributes for a URL that points off-site (mirrors the tag_list shortcode convention). Returns ' target="_blank" rel="noopener noreferrer"' for external links, '' for internal/relative ones. |
| [`fw_ext_mega_menu_render_column_content`](#fw_ext_mega_menu_render_column_content) | Render a MegaMenu column's custom content (Column Content = image / content / widget / raw), for the walker_nav_menu_start_el filter. Returns '' for the default "links" type (or empty payload) so the sub-menu renders normally. |
| [`fw_ext_mega_menu_render_icon`](#fw_ext_mega_menu_render_icon) | Render a menu item's icon to HTML. Prefers the shortcodes extension's sc_icon_render() (font / emoji / svg / image, FA4→FA6 normalized); falls back to a plain font &lt;i&gt; for a class string when that extension is inactive. |
| [`fw_ext_mega_menu_row_container_style`](#fw_ext_mega_menu_row_container_style) | Build the inline style string for a MegaMenu row (dropdown panel) container. |
| [`fw_ext_mega_menu_set_db_item_option`](#fw_ext_mega_menu_set_db_item_option) | Set item option value in database |
| [`fw_ext_mega_menu_update_meta`](#fw_ext_mega_menu_update_meta) | Updates mega menu meta for a post from the given key-value array. |
| [`fw_mega_menu_get_meta`](#fw_mega_menu_get_meta) | Deprecated alias for fw_ext_mega_menu_get_meta(); reads a mega-menu meta value with a fallback default. |
| [`fw_mega_menu_name_meta`](#fw_mega_menu_name_meta) | Deprecated alias building the admin input name attribute for a mega-menu meta key. |
| [`fw_mega_menu_request_meta`](#fw_mega_menu_request_meta) | Deprecated alias returning the submitted POST values for a mega-menu item. |
| [`fw_mega_menu_update_meta`](#fw_mega_menu_update_meta) | Deprecated alias for fw_ext_mega_menu_update_meta(); writes mega-menu meta from the given array. |

---

### `fw_ext_mega_menu_color_to_css` {#fw_ext_mega_menu_color_to_css}

```php
fw_ext_mega_menu_color_to_css($value, $fallback = '')
```

Resolve a color value to a CSS color string. Prefers the shortcodes extension's sc_color_to_css() (compact preset picker → var(--color-&#123;slug&#125;) or custom hex); falls back to a self-contained resolver when that extension is inactive (values are then plain color-picker strings). Tolerates the legacy plain-hex shape either way, so no data migration is needed.

| Parameter | Type | Description |
| --- | --- | --- |
| `$value` | `mixed` | string\|array from a color-picker / compact preset field |
| `$fallback` | `string` | returned when nothing usable is set |

**Returns** `string`

<small>Source: `framework/extensions/megamenu/helpers.php:255`</small>

### `fw_ext_mega_menu_column_style` {#fw_ext_mega_menu_column_style}

```php
fw_ext_mega_menu_column_style($column_id)
```

Build the inline style for a MegaMenu column &lt;li&gt; (background color + image). Per-part escaped, concatenated raw (matches the row helper's usage).

| Parameter | Type | Description |
| --- | --- | --- |
| `$column_id` | `int` | — |

**Returns** `string` '' when nothing to apply

<small>Source: `framework/extensions/megamenu/helpers.php:280`</small>

### `fw_ext_mega_menu_get_db_item_option` {#fw_ext_mega_menu_get_db_item_option}
*🔌 pluggable*

```php
fw_ext_mega_menu_get_db_item_option($item, $option_id = null, $default_value = null)
```

Get item option value from the database

| Parameter | Type | Description |
| --- | --- | --- |
| `$item` | `int` | — |
| `$option_id` | `string\|null` | 'type/option_id' (accepts multikey). null - all options |
| `$default_value` | `null\|mixed` | If no option found in the database, this value will be returned |

**Returns** `mixed\|null`

<small>Source: `framework/extensions/megamenu/helpers.php:525`</small>

### `fw_ext_mega_menu_get_item_option` {#fw_ext_mega_menu_get_item_option}

```php
fw_ext_mega_menu_get_item_option($item, $type, $option_id = null, $default = null)
```

Read a single per-item option value (defined in options/&#123;row,column,item,default&#125;.php) saved through the "Settings" modal (FW_Db_Options_Model_MegaMenu).

| Parameter | Type | Description |
| --- | --- | --- |
| `$item` | `int\|WP_Post` | — |
| `$type` | `string` | One of 'row' \| 'column' \| 'item' \| 'default' |
| `$option_id` | `string\|null` | Leaf option id, or null for the whole type group |
| `$default` | `mixed` | — |

**Returns** `mixed`

<small>Source: `framework/extensions/megamenu/helpers.php:31`</small>

### `fw_ext_mega_menu_get_meta` {#fw_ext_mega_menu_get_meta}

```php
fw_ext_mega_menu_get_meta($post, $key, $default = null)
```

Returns a mega menu meta value for a post, falling back to the given default.

<small>Source: `framework/extensions/megamenu/helpers.php:12`</small>

### `fw_ext_mega_menu_group` {#fw_ext_mega_menu_group}

```php
fw_ext_mega_menu_group($group_id, array $options)
```

Wrap a set of options in a border-less group container (house style), keyed by a distinct group id. Container-only — leaf ids and saved values are unchanged.

| Parameter | Type | Description |
| --- | --- | --- |
| `$group_id` | `string` | — |
| `$options` | `array` | — |

**Returns** `array` single-entry array: &#123; &lt;group_id&gt;: &#123; type:group, options &#125; &#125;

<small>Source: `framework/extensions/megamenu/helpers.php:240`</small>

### `fw_ext_mega_menu_icon_is_set` {#fw_ext_mega_menu_icon_is_set}

```php
fw_ext_mega_menu_icon_is_set($val)
```

Is an icon value (icon-v2 array, or a legacy class string) actually set?

| Parameter | Type | Description |
| --- | --- | --- |
| `$val` | `mixed` | — |

**Returns** `bool`

<small>Source: `framework/extensions/megamenu/helpers.php:96`</small>

### `fw_ext_mega_menu_icon_options` {#fw_ext_mega_menu_icon_options}

```php
fw_ext_mega_menu_icon_options()
```

The shared Icon + Icon Position options, added to every per-item options set (row / column / item / default) so the icon is edited inside the "Settings" modal instead of the old standalone control.

**Returns** `array`

<small>Source: `framework/extensions/megamenu/helpers.php:172`</small>

### `fw_ext_mega_menu_is_mm_item` {#fw_ext_mega_menu_is_mm_item}

```php
fw_ext_mega_menu_is_mm_item($item)
```

Check if menu item is a MegaMenu item or is inside a MegaMenu item

| Parameter | Type | Description |
| --- | --- | --- |
| `$item` | `WP_Post` | — |

**Returns** `bool`

<small>Source: `framework/extensions/megamenu/helpers.php:385`</small>

### `fw_ext_mega_menu_item_icon` {#fw_ext_mega_menu_item_icon}

```php
fw_ext_mega_menu_item_icon($item)
```

The icon VALUE for a menu item — the modern per-item option (icon-v2) when set, otherwise the legacy `mega-menu[id][icon]` class string saved by the old standalone "Edit Icon" control. Returns null when there is no icon.

The returned value is fed straight to sc_icon_render() (which accepts both the
icon-v2 array and a legacy string), so no per-type branching is needed here.

| Parameter | Type | Description |
| --- | --- | --- |
| `$item` | `int\|WP_Post` | — |

**Returns** `array\|string\|null`

<small>Source: `framework/extensions/megamenu/helpers.php:124`</small>

### `fw_ext_mega_menu_item_type` {#fw_ext_mega_menu_item_type}

```php
fw_ext_mega_menu_item_type($item)
```

The per-item options type for a menu item, by its MegaMenu level: 1 = row (top trigger), 2 = column, 3+ = item, 0 = default (non-mega item).

| Parameter | Type | Description |
| --- | --- | --- |
| `$item` | `int\|WP_Post` | — |

**Returns** `string` one of 'row' \| 'column' \| 'item' \| 'default'

<small>Source: `framework/extensions/megamenu/helpers.php:82`</small>

### `fw_ext_mega_menu_link_target_attr` {#fw_ext_mega_menu_link_target_attr}

```php
fw_ext_mega_menu_link_target_attr($url)
```

New-tab attributes for a URL that points off-site (mirrors the tag_list shortcode convention). Returns ' target="_blank" rel="noopener noreferrer"' for external links, '' for internal/relative ones.

| Parameter | Type | Description |
| --- | --- | --- |
| `$url` | `string` | — |

**Returns** `string`

<small>Source: `framework/extensions/megamenu/helpers.php:308`</small>

### `fw_ext_mega_menu_render_column_content` {#fw_ext_mega_menu_render_column_content}

```php
fw_ext_mega_menu_render_column_content($item, $type)
```

Render a MegaMenu column's custom content (Column Content = image / content / widget / raw), for the walker_nav_menu_start_el filter. Returns '' for the default "links" type (or empty payload) so the sub-menu renders normally.

| Parameter | Type | Description |
| --- | --- | --- |
| `$item` | `int\|WP_Post` | Column menu item |
| `$type` | `string` | One of 'image' \| 'content' \| 'widget' \| 'raw' |

**Returns** `string`

<small>Source: `framework/extensions/megamenu/helpers.php:329`</small>

### `fw_ext_mega_menu_render_icon` {#fw_ext_mega_menu_render_icon}

```php
fw_ext_mega_menu_render_icon($item, $extra_class = '')
```

Render a menu item's icon to HTML. Prefers the shortcodes extension's sc_icon_render() (font / emoji / svg / image, FA4→FA6 normalized); falls back to a plain font &lt;i&gt; for a class string when that extension is inactive.

| Parameter | Type | Description |
| --- | --- | --- |
| `$item` | `int\|WP_Post` | — |
| `$extra_class` | `string` | extra class on the rendered icon |

**Returns** `string`

<small>Source: `framework/extensions/megamenu/helpers.php:142`</small>

### `fw_ext_mega_menu_row_container_style` {#fw_ext_mega_menu_row_container_style}

```php
fw_ext_mega_menu_row_container_style($row_id)
```

Build the inline style string for a MegaMenu row (dropdown panel) container.

| Parameter | Type | Description |
| --- | --- | --- |
| `$row_id` | `int` | Top-level MegaMenu item id |

**Returns** `string` Escaped CSS, or '' when nothing to apply

<small>Source: `framework/extensions/megamenu/helpers.php:49`</small>

### `fw_ext_mega_menu_set_db_item_option` {#fw_ext_mega_menu_set_db_item_option}

```php
fw_ext_mega_menu_set_db_item_option( $item, $option_id, $value )
```

Set item option value in database

| Parameter | Type | Description |
| --- | --- | --- |
| `$item` | `int` | — |
| `$option_id` | `string\|null` | 'type/option_id' (accepts multikey). null - all options |
| `$value` | — | — |

<small>Source: `framework/extensions/megamenu/helpers.php:556`</small>

### `fw_ext_mega_menu_update_meta` {#fw_ext_mega_menu_update_meta}

```php
fw_ext_mega_menu_update_meta($post, array $array)
```

Updates mega menu meta for a post from the given key-value array.

<small>Source: `framework/extensions/megamenu/helpers.php:17`</small>

### `fw_mega_menu_get_meta` {#fw_mega_menu_get_meta}

```php
fw_mega_menu_get_meta($post, $key, $default = null)
```

Deprecated alias for fw_ext_mega_menu_get_meta(); reads a mega-menu meta value with a fallback default.

<small>Source: `framework/extensions/megamenu/includes/deprecated-functions.php:13`</small>

### `fw_mega_menu_name_meta` {#fw_mega_menu_name_meta}
*⚠️ deprecated*

```php
fw_mega_menu_name_meta($post, $key)
```

Deprecated alias building the admin input name attribute for a mega-menu meta key.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post` | — | — |
| `$key` | — | — |

**Returns** `string`

<small>Source: `framework/extensions/megamenu/includes/deprecated-functions.php:37`</small>

### `fw_mega_menu_request_meta` {#fw_mega_menu_request_meta}
*⚠️ deprecated*

```php
fw_mega_menu_request_meta($post)
```

Deprecated alias returning the submitted POST values for a mega-menu item.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post` | — | — |

**Returns** `array`

<small>Source: `framework/extensions/megamenu/includes/deprecated-functions.php:48`</small>

### `fw_mega_menu_update_meta` {#fw_mega_menu_update_meta}
*⚠️ deprecated*

```php
fw_mega_menu_update_meta($post, array $array)
```

Deprecated alias for fw_ext_mega_menu_update_meta(); writes mega-menu meta from the given array.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post` | — | — |
| `$array` | `array` | — |

**Returns** `mixed`

<small>Source: `framework/extensions/megamenu/includes/deprecated-functions.php:25`</small>

← Back to [Functions overview](./index.md)
