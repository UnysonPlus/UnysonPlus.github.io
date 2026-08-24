---
title: Option Types — hooks
sidebar_label: Option Types
slug: /hooks/option-types
description: Actions and filters exposed by the UnysonPlus Option Types subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Option Types — hooks

**18 hooks** — 1 actions · 17 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_icon_lottie_enabled`](#h-fw-icon-lottie-enabled) | filter | Filters whether Lottie icon technology is enabled (panel, player runtime, .json upload); default off, flipped on by the Animated Icons extension. |
| [`fw_icon_pack_catalog_url`](#h-fw-icon-pack-catalog-url) | filter | Filters the URL of the installable icon-pack catalog.json, so a host can point at a mirror or CDN. |
| [`fw_icon_raster_enabled`](#h-fw-icon-raster-enabled) | filter | Filters whether animated raster icons (GIF/APNG/WebP) are surfaced as a supported technology hint; default off. |
| [`fw_icon_rive_enabled`](#h-fw-icon-rive-enabled) | filter | Filters whether Rive icon technology is enabled (panel, canvas runtime, .riv upload); default off, flipped on by the Animated Icons extension. |
| [`fw_icon_svg_animation_enabled`](#h-fw-icon-svg-animation-enabled) | filter | Filters whether SVG icons keep their SMIL animation tags instead of being stripped by the sanitizer; default off. |
| [`fw_icon_svg_pack_install_dir`](#h-fw-icon-svg-pack-install-dir) | filter | Filters the absolute install root path where on-demand icon packs are written under wp-content/uploads. |
| [`fw_icon_svg_packs`](#h-fw-icon-svg-packs) | filter | Filters the registry of built-in SVG icon packs (id =&gt; title, slug, svg_open), allowing more packs to be registered. |
| [`fw_option_type_background_pro_color_palette`](#h-fw-option-type-background-pro-color-palette) | filter | Filters the preset color palette offered by the Background Pro option type's color picker. |
| [`fw_option_type_spacing_scale`](#h-fw-option-type-spacing-scale) | filter | Filters the spacing option type's scale array so a theme or extension can supply its own spacing steps. |
| [`fw_option_type_typography_v2_google_fonts`](#h-fw-option-type-typography-v2-google-fonts) | filter | Filters the Google fonts list used by the typography option type before it is cached. |
| [`fw_option_type_typography_v2_standard_fonts`](#h-fw-option-type-typography-v2-standard-fonts) | filter | Filters the list of standard/web-safe fonts offered by the typography option type. |
| [`fw:option_type:icon-v3:filter_packs`](#h-fw-option-type-icon-v3-filter-packs) | filter | Filters the list of icon pack names the icon-v3 option type makes available. |
| [`fw:option_type:icon-v3:packs`](#h-fw-option-type-icon-v3-packs) | filter | Filters the registered icon packs for the icon-v3 option type. |
| [`fw:option-type:addable-box:limit-container-types`](#h-fw-option-type-addable-box-limit-container-types) | filter | Filters which container types are allowed inside an addable-box option (default: groups only). |
| [`fw:option-type:addable-popup:value-from-input`](#h-fw-option-type-addable-popup-value-from-input) | filter | For e.g. option type 'unique' needs to execute _get_value_from_input() for each option to prevent duplicate values |
| [`fw:option-type:multi-picker:fw-storage:process-inner-options`](#h-fw-option-type-multi-picker-fw-storage-process-inner-options) | filter | Filters whether the multi-picker runs storage_load on its inner choice options. |
| [`fw:option-type:multi-select:query_posts`](#h-fw-option-type-multi-select-query-posts) | filter | Filters the WP_Query args used by the multi-select option's post autocomplete lookup. |
| [`fw:option-type:wp-editor:enqueue-scripts`](#h-fw-option-type-wp-editor-enqueue-scripts) | action | Fires after the wp-editor option type enqueues its styles, letting code enqueue related scripts. |

---

### `fw_icon_lottie_enabled` {#h-fw-icon-lottie-enabled}
*🧪 filter*

Filters whether Lottie icon technology is enabled (panel, player runtime, .json upload); default off, flipped on by the Animated Icons extension.

```php
add_filter( 'fw_icon_lottie_enabled', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:891`</small>

### `fw_icon_pack_catalog_url` {#h-fw-icon-pack-catalog-url}
*🧪 filter*

Filters the URL of the installable icon-pack catalog.json, so a host can point at a mirror or CDN.

```php
add_filter( 'fw_icon_pack_catalog_url', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:34`</small>

### `fw_icon_raster_enabled` {#h-fw-icon-raster-enabled}
*🧪 filter*

Filters whether animated raster icons (GIF/APNG/WebP) are surfaced as a supported technology hint; default off.

```php
add_filter( 'fw_icon_raster_enabled', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:948`</small>

### `fw_icon_rive_enabled` {#h-fw-icon-rive-enabled}
*🧪 filter*

Filters whether Rive icon technology is enabled (panel, canvas runtime, .riv upload); default off, flipped on by the Animated Icons extension.

```php
add_filter( 'fw_icon_rive_enabled', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:903`</small>

### `fw_icon_svg_animation_enabled` {#h-fw-icon-svg-animation-enabled}
*🧪 filter*

Filters whether SVG icons keep their SMIL animation tags instead of being stripped by the sanitizer; default off.

```php
add_filter( 'fw_icon_svg_animation_enabled', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/pack-installer.php:933`</small>

### `fw_icon_svg_pack_install_dir` {#h-fw-icon-svg-pack-install-dir}
*🧪 filter*

Filters the absolute install root path where on-demand icon packs are written under wp-content/uploads.

```php
add_filter( 'fw_icon_svg_pack_install_dir', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/svg-packs.php:52`</small>

### `fw_icon_svg_packs` {#h-fw-icon-svg-packs}
*🧪 filter*

Filters the registry of built-in SVG icon packs (id =&gt; title, slug, svg_open), allowing more packs to be registered.

```php
add_filter( 'fw_icon_svg_packs', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/svg-packs.php:27`</small>

### `fw_option_type_background_pro_color_palette` {#h-fw-option-type-background-pro-color-palette}
*🧪 filter*

Filters the preset color palette offered by the Background Pro option type's color picker.

```php
add_filter( 'fw_option_type_background_pro_color_palette', $callback );
```
<small>Fired in: `framework/includes/option-types/background-pro/class-fw-option-type-background-pro.php:267`</small>

### `fw_option_type_spacing_scale` {#h-fw-option-type-spacing-scale}
*🧪 filter*

Filters the spacing option type's scale array so a theme or extension can supply its own spacing steps.

```php
add_filter( 'fw_option_type_spacing_scale', $callback );
```
<small>Fired in: `framework/includes/option-types/spacing/class-fw-option-type-spacing.php:108`</small>

### `fw_option_type_typography_v2_google_fonts` {#h-fw-option-type-typography-v2-google-fonts}
*🧪 filter*

Filters the Google fonts list used by the typography option type before it is cached.

```php
add_filter( 'fw_option_type_typography_v2_google_fonts', $callback );
```
<small>Fired in: `framework/includes/option-types/typography/class-fw-option-type-typography.php:110`</small>

### `fw_option_type_typography_v2_standard_fonts` {#h-fw-option-type-typography-v2-standard-fonts}
*🧪 filter*

Filters the list of standard/web-safe fonts offered by the typography option type.

```php
add_filter( 'fw_option_type_typography_v2_standard_fonts', $callback );
```
<small>Fired in: `framework/includes/option-types/typography/class-fw-option-type-typography.php:91`</small>

### `fw:option_type:icon-v3:filter_packs` {#h-fw-option-type-icon-v3-filter-packs}
*🧪 filter*

Filters the list of icon pack names the icon-v3 option type makes available.

```php
add_filter( 'fw:option_type:icon-v3:filter_packs', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/class-fw-icon-packs-loader.php:359`</small>

### `fw:option_type:icon-v3:packs` {#h-fw-option-type-icon-v3-packs}
*🧪 filter*

Filters the registered icon packs for the icon-v3 option type.

```php
add_filter( 'fw:option_type:icon-v3:packs', $callback );
```
<small>Fired in: `framework/includes/option-types/icon/includes/class-fw-icon-packs-loader.php:94`</small>

### `fw:option-type:addable-box:limit-container-types` {#h-fw-option-type-addable-box-limit-container-types}
*🧪 filter*

Filters which container types are allowed inside an addable-box option (default: groups only).

```php
add_filter( 'fw:option-type:addable-box:limit-container-types', $callback );
```
<small>Fired in: `framework/includes/option-types/addable-box/class-fw-option-type-addable-box.php:121`</small>

### `fw:option-type:addable-popup:value-from-input` {#h-fw-option-type-addable-popup-value-from-input}
*🧪 filter*

For e.g. option type 'unique' needs to execute _get_value_from_input() for each option to prevent duplicate values

```php
add_filter( 'fw:option-type:addable-popup:value-from-input', $callback );
```
<small>Fired in: `framework/includes/option-types/addable-popup/class-fw-option-type-addable-popup.php:166`</small>

### `fw:option-type:multi-picker:fw-storage:process-inner-options` {#h-fw-option-type-multi-picker-fw-storage-process-inner-options}
*🧪 filter · 2 call sites*

Filters whether the multi-picker runs storage_load on its inner choice options.

```php
add_filter( 'fw:option-type:multi-picker:fw-storage:process-inner-options', $callback );
```
<small>Fired in: `framework/includes/option-types/multi-picker/class-fw-option-type-multi-picker.php:581`</small>

### `fw:option-type:multi-select:query_posts` {#h-fw-option-type-multi-select-query-posts}
*🧪 filter*

Filters the WP_Query args used by the multi-select option's post autocomplete lookup.

```php
add_filter( 'fw:option-type:multi-select:query_posts', $callback );
```
<small>Fired in: `framework/includes/option-types/multi-select/class-fw-option-type-multi-select.php:535`</small>

### `fw:option-type:wp-editor:enqueue-scripts` {#h-fw-option-type-wp-editor-enqueue-scripts}
*🎬 action*

Fires after the wp-editor option type enqueues its styles, letting code enqueue related scripts.

```php
add_action( 'fw:option-type:wp-editor:enqueue-scripts', $callback );
```
<small>Fired in: `framework/includes/option-types/wp-editor/class-fw-option-type-wp-editor.php:158`</small>

← Back to [Hooks overview](./index.md)
