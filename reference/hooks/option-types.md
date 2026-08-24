---
title: Option Types — hooks
sidebar_label: Option Types
slug: /hooks/option-types
description: Actions and filters exposed by the UnysonPlus Option Types subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Option Types — hooks

**20 hooks** — 1 actions · 19 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_icon_lottie_enabled`](#h-fw-icon-lottie-enabled) | filter | — |
| [`fw_icon_pack_catalog_url`](#h-fw-icon-pack-catalog-url) | filter | — |
| [`fw_icon_raster_enabled`](#h-fw-icon-raster-enabled) | filter | — |
| [`fw_icon_rive_enabled`](#h-fw-icon-rive-enabled) | filter | — |
| [`fw_icon_svg_animation_enabled`](#h-fw-icon-svg-animation-enabled) | filter | — |
| [`fw_icon_svg_pack_install_dir`](#h-fw-icon-svg-pack-install-dir) | filter | — |
| [`fw_icon_svg_packs`](#h-fw-icon-svg-packs) | filter | — |
| [`fw_option_type_background_pro_color_palette`](#h-fw-option-type-background-pro-color-palette) | filter | — |
| [`fw_option_type_multi_picker_choices:`](#h-fw-option-type-multi-picker-choices) | filter | — |
| [`fw_option_type_spacing_scale`](#h-fw-option-type-spacing-scale) | filter | — |
| [`fw_option_type_typography_v2_google_fonts`](#h-fw-option-type-typography-v2-google-fonts) | filter | — |
| [`fw_option_type_typography_v2_standard_fonts`](#h-fw-option-type-typography-v2-standard-fonts) | filter | — |
| [`fw:option_type:icon-v3:filter_packs`](#h-fw-option-type-icon-v3-filter-packs) | filter | — |
| [`fw:option_type:icon-v3:packs`](#h-fw-option-type-icon-v3-packs) | filter | — |
| [`fw:option-type:addable-box:limit-container-types`](#h-fw-option-type-addable-box-limit-container-types) | filter | — |
| [`fw:option-type:addable-popup:value-from-input`](#h-fw-option-type-addable-popup-value-from-input) | filter | For e.g. option type 'unique' needs to execute _get_value_from_input() for each option to prevent duplicate values |
| [`fw:option-type:multi-picker:fw-storage:process-inner-options`](#h-fw-option-type-multi-picker-fw-storage-process-inner-options) | filter | — |
| [`fw:option-type:multi-picker:string-value:`](#h-fw-option-type-multi-picker-string-value) | filter | — |
| [`fw:option-type:multi-select:query_posts`](#h-fw-option-type-multi-select-query-posts) | filter | — |
| [`fw:option-type:wp-editor:enqueue-scripts`](#h-fw-option-type-wp-editor-enqueue-scripts) | action | — |

---

### `fw_icon_lottie_enabled` {#h-fw-icon-lottie-enabled}
*🧪 filter*

```php
add_filter( 'fw_icon_lottie_enabled', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:886`</small>

### `fw_icon_pack_catalog_url` {#h-fw-icon-pack-catalog-url}
*🧪 filter*

```php
add_filter( 'fw_icon_pack_catalog_url', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:33`</small>

### `fw_icon_raster_enabled` {#h-fw-icon-raster-enabled}
*🧪 filter*

```php
add_filter( 'fw_icon_raster_enabled', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:940`</small>

### `fw_icon_rive_enabled` {#h-fw-icon-rive-enabled}
*🧪 filter*

```php
add_filter( 'fw_icon_rive_enabled', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:897`</small>

### `fw_icon_svg_animation_enabled` {#h-fw-icon-svg-animation-enabled}
*🧪 filter*

```php
add_filter( 'fw_icon_svg_animation_enabled', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:926`</small>

### `fw_icon_svg_pack_install_dir` {#h-fw-icon-svg-pack-install-dir}
*🧪 filter*

```php
add_filter( 'fw_icon_svg_pack_install_dir', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/svg-packs.php:50`</small>

### `fw_icon_svg_packs` {#h-fw-icon-svg-packs}
*🧪 filter*

```php
add_filter( 'fw_icon_svg_packs', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/svg-packs.php:26`</small>

### `fw_option_type_background_pro_color_palette` {#h-fw-option-type-background-pro-color-palette}
*🧪 filter*

```php
add_filter( 'fw_option_type_background_pro_color_palette', $callback );
```
<small>Fired in: `framework/includes/option-types/background-pro/class-fw-option-type-background-pro.php:266`</small>

### `fw_option_type_multi_picker_choices:` {#h-fw-option-type-multi-picker-choices}
*🧪 filter*

```php
add_filter( 'fw_option_type_multi_picker_choices:', $callback );
```
<small>Fired in: `framework/includes/option-types/multi-picker/class-fw-option-type-multi-picker.php:352`</small>

### `fw_option_type_spacing_scale` {#h-fw-option-type-spacing-scale}
*🧪 filter*

```php
add_filter( 'fw_option_type_spacing_scale', $callback );
```
<small>Fired in: `framework/includes/option-types/spacing/class-fw-option-type-spacing.php:107`</small>

### `fw_option_type_typography_v2_google_fonts` {#h-fw-option-type-typography-v2-google-fonts}
*🧪 filter*

```php
add_filter( 'fw_option_type_typography_v2_google_fonts', $callback );
```
<small>Fired in: `framework/includes/option-types/typography/class-fw-option-type-typography.php:108`</small>

### `fw_option_type_typography_v2_standard_fonts` {#h-fw-option-type-typography-v2-standard-fonts}
*🧪 filter*

```php
add_filter( 'fw_option_type_typography_v2_standard_fonts', $callback );
```
<small>Fired in: `framework/includes/option-types/typography/class-fw-option-type-typography.php:90`</small>

### `fw:option_type:icon-v3:filter_packs` {#h-fw-option-type-icon-v3-filter-packs}
*🧪 filter*

```php
add_filter( 'fw:option_type:icon-v3:filter_packs', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/class-fw-icon-packs-loader.php:356`</small>

### `fw:option_type:icon-v3:packs` {#h-fw-option-type-icon-v3-packs}
*🧪 filter*

```php
add_filter( 'fw:option_type:icon-v3:packs', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/class-fw-icon-packs-loader.php:92`</small>

### `fw:option-type:addable-box:limit-container-types` {#h-fw-option-type-addable-box-limit-container-types}
*🧪 filter*

```php
add_filter( 'fw:option-type:addable-box:limit-container-types', $callback );
```
<small>Fired in: `framework/includes/option-types/addable-box/class-fw-option-type-addable-box.php:120`</small>

### `fw:option-type:addable-popup:value-from-input` {#h-fw-option-type-addable-popup-value-from-input}
*🧪 filter*

For e.g. option type 'unique' needs to execute _get_value_from_input() for each option to prevent duplicate values

```php
add_filter( 'fw:option-type:addable-popup:value-from-input', $callback );
```
<small>Fired in: `framework/includes/option-types/addable-popup/class-fw-option-type-addable-popup.php:166`</small>

### `fw:option-type:multi-picker:fw-storage:process-inner-options` {#h-fw-option-type-multi-picker-fw-storage-process-inner-options}
*🧪 filter · 2 call sites*

```php
add_filter( 'fw:option-type:multi-picker:fw-storage:process-inner-options', $callback );
```
<small>Fired in: `framework/includes/option-types/multi-picker/class-fw-option-type-multi-picker.php:580`</small>

### `fw:option-type:multi-picker:string-value:` {#h-fw-option-type-multi-picker-string-value}
*🧪 filter*

```php
add_filter( 'fw:option-type:multi-picker:string-value:', $callback );
```
<small>Fired in: `framework/includes/option-types/multi-picker/class-fw-option-type-multi-picker.php:159`</small>

### `fw:option-type:multi-select:query_posts` {#h-fw-option-type-multi-select-query-posts}
*🧪 filter*

```php
add_filter( 'fw:option-type:multi-select:query_posts', $callback );
```
<small>Fired in: `framework/includes/option-types/multi-select/class-fw-option-type-multi-select.php:534`</small>

### `fw:option-type:wp-editor:enqueue-scripts` {#h-fw-option-type-wp-editor-enqueue-scripts}
*🎬 action*

```php
add_action( 'fw:option-type:wp-editor:enqueue-scripts', $callback );
```
<small>Fired in: `framework/includes/option-types/wp-editor/class-fw-option-type-wp-editor.php:157`</small>

← Back to [Hooks overview](./index.md)
