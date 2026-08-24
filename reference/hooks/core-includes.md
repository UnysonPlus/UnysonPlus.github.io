---
title: Core Includes — hooks
sidebar_label: Core Includes
slug: /hooks/core-includes
description: Actions and filters exposed by the UnysonPlus Core Includes subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Core Includes — hooks

**36 hooks** — 0 actions · 36 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_rate_limit`](#h-fw-rate-limit) | filter | — |
| [`fw_rate_limit_client_ip`](#h-fw-rate-limit-client-ip) | filter | — |
| [`fw_update_guard_message`](#h-fw-update-guard-message) | filter | — |
| [`fw_update_guard_title`](#h-fw-update-guard-title) | filter | — |
| [`fw_upw_internal_post_types`](#h-fw-upw-internal-post-types) | filter | — |
| [`fw:dynamic-content:permalink_choices_limit`](#h-fw-dynamic-content-permalink-choices-limit) | filter | — |
| [`fw:dynamic-content:tags`](#h-fw-dynamic-content-tags) | filter | — |
| [`unysonplus_border_presets`](#h-unysonplus-border-presets) | filter | — |
| [`unysonplus_button_color_presets`](#h-unysonplus-button-color-presets) | filter | — |
| [`unysonplus_button_size_presets`](#h-unysonplus-button-size-presets) | filter | — |
| [`unysonplus_color_presets`](#h-unysonplus-color-presets) | filter | — |
| [`unysonplus_container_width_presets`](#h-unysonplus-container-width-presets) | filter | — |
| [`unysonplus_custom_hover_animations`](#h-unysonplus-custom-hover-animations) | filter | — |
| [`unysonplus_default_border_presets`](#h-unysonplus-default-border-presets) | filter | — |
| [`unysonplus_default_button_color_presets`](#h-unysonplus-default-button-color-presets) | filter | — |
| [`unysonplus_default_button_size_presets`](#h-unysonplus-default-button-size-presets) | filter | — |
| [`unysonplus_default_color_presets`](#h-unysonplus-default-color-presets) | filter | — |
| [`unysonplus_default_custom_hover_animations`](#h-unysonplus-default-custom-hover-animations) | filter | — |
| [`unysonplus_default_font_size_presets`](#h-unysonplus-default-font-size-presets) | filter | — |
| [`unysonplus_default_gap_scale`](#h-unysonplus-default-gap-scale) | filter | — |
| [`unysonplus_default_icon_badge_presets`](#h-unysonplus-default-icon-badge-presets) | filter | — |
| [`unysonplus_default_section_style_presets`](#h-unysonplus-default-section-style-presets) | filter | — |
| [`unysonplus_default_spacing_scale`](#h-unysonplus-default-spacing-scale) | filter | — |
| [`unysonplus_default_table_presets`](#h-unysonplus-default-table-presets) | filter | — |
| [`unysonplus_fluid_type_viewport`](#h-unysonplus-fluid-type-viewport) | filter | — |
| [`unysonplus_font_size_presets`](#h-unysonplus-font-size-presets) | filter | — |
| [`unysonplus_gap_scale`](#h-unysonplus-gap-scale) | filter | — |
| [`unysonplus_global_css`](#h-unysonplus-global-css) | filter | — |
| [`unysonplus_icon_badge_presets`](#h-unysonplus-icon-badge-presets) | filter | — |
| [`unysonplus_mobile_font_scale`](#h-unysonplus-mobile-font-scale) | filter | — |
| [`unysonplus_page_css`](#h-unysonplus-page-css) | filter | — |
| [`unysonplus_preset_store_extension`](#h-unysonplus-preset-store-extension) | filter | — |
| [`unysonplus_section_style_presets`](#h-unysonplus-section-style-presets) | filter | — |
| [`unysonplus_spacing_scale`](#h-unysonplus-spacing-scale) | filter | — |
| [`unysonplus_table_presets`](#h-unysonplus-table-presets) | filter | — |
| [`unysonplus_type_scale_config`](#h-unysonplus-type-scale-config) | filter | — |

---

### `fw_rate_limit` {#h-fw-rate-limit}
*🧪 filter*

```php
add_filter( 'fw_rate_limit', $callback );
```
<small>Fired in: `framework/includes/rate-limit.php:108`</small>

### `fw_rate_limit_client_ip` {#h-fw-rate-limit-client-ip}
*🧪 filter*

```php
add_filter( 'fw_rate_limit_client_ip', $callback );
```
<small>Fired in: `framework/includes/rate-limit.php:64`</small>

### `fw_update_guard_message` {#h-fw-update-guard-message}
*🧪 filter*

```php
add_filter( 'fw_update_guard_message', $callback );
```
<small>Fired in: `framework/includes/update-guard/update-guard.php:54`</small>

### `fw_update_guard_title` {#h-fw-update-guard-title}
*🧪 filter*

```php
add_filter( 'fw_update_guard_title', $callback );
```
<small>Fired in: `framework/includes/update-guard/update-guard.php:53`</small>

### `fw_upw_internal_post_types` {#h-fw-upw-internal-post-types}
*🧪 filter*

```php
add_filter( 'fw_upw_internal_post_types', $callback );
```
<small>Fired in: `framework/includes/post-type-choices.php:23`</small>

### `fw:dynamic-content:permalink_choices_limit` {#h-fw-dynamic-content-permalink-choices-limit}
*🧪 filter*

```php
add_filter( 'fw:dynamic-content:permalink_choices_limit', $callback );
```
<small>Fired in: `framework/includes/dynamic-content/tags/links.php:24`</small>

### `fw:dynamic-content:tags` {#h-fw-dynamic-content-tags}
*🧪 filter*

```php
add_filter( 'fw:dynamic-content:tags', $callback );
```
<small>Fired in: `framework/includes/dynamic-content/class-fw-dynamic-content.php:105`</small>

### `unysonplus_border_presets` {#h-unysonplus-border-presets}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_border_presets', $callback );
```
<small>Fired in: `framework/includes/presets/border-presets.php:136`</small>

### `unysonplus_button_color_presets` {#h-unysonplus-button-color-presets}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_button_color_presets', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:191`</small>

### `unysonplus_button_size_presets` {#h-unysonplus-button-size-presets}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_button_size_presets', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:234`</small>

### `unysonplus_color_presets` {#h-unysonplus-color-presets}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_color_presets', $callback );
```
<small>Fired in: `framework/includes/presets/color-presets.php:51`</small>

### `unysonplus_container_width_presets` {#h-unysonplus-container-width-presets}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_container_width_presets', $callback );
```
<small>Fired in: `framework/includes/presets/container-width-presets.php:71`</small>

### `unysonplus_custom_hover_animations` {#h-unysonplus-custom-hover-animations}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_custom_hover_animations', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:317`</small>

### `unysonplus_default_border_presets` {#h-unysonplus-default-border-presets}
*🧪 filter*

```php
add_filter( 'unysonplus_default_border_presets', $callback );
```
<small>Fired in: `framework/includes/presets/border-presets.php:64`</small>

### `unysonplus_default_button_color_presets` {#h-unysonplus-default-button-color-presets}
*🧪 filter*

```php
add_filter( 'unysonplus_default_button_color_presets', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:136`</small>

### `unysonplus_default_button_size_presets` {#h-unysonplus-default-button-size-presets}
*🧪 filter*

```php
add_filter( 'unysonplus_default_button_size_presets', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:213`</small>

### `unysonplus_default_color_presets` {#h-unysonplus-default-color-presets}
*🧪 filter*

```php
add_filter( 'unysonplus_default_color_presets', $callback );
```
<small>Fired in: `framework/includes/presets/color-presets.php:8`</small>

### `unysonplus_default_custom_hover_animations` {#h-unysonplus-default-custom-hover-animations}
*🧪 filter*

```php
add_filter( 'unysonplus_default_custom_hover_animations', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:252`</small>

### `unysonplus_default_font_size_presets` {#h-unysonplus-default-font-size-presets}
*🧪 filter*

```php
add_filter( 'unysonplus_default_font_size_presets', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:8`</small>

### `unysonplus_default_gap_scale` {#h-unysonplus-default-gap-scale}
*🧪 filter*

```php
add_filter( 'unysonplus_default_gap_scale', $callback );
```
<small>Fired in: `framework/includes/presets/spacing-presets.php:95`</small>

### `unysonplus_default_icon_badge_presets` {#h-unysonplus-default-icon-badge-presets}
*🧪 filter*

```php
add_filter( 'unysonplus_default_icon_badge_presets', $callback );
```
<small>Fired in: `framework/includes/presets/icon-badge-presets.php:58`</small>

### `unysonplus_default_section_style_presets` {#h-unysonplus-default-section-style-presets}
*🧪 filter*

```php
add_filter( 'unysonplus_default_section_style_presets', $callback );
```
<small>Fired in: `framework/includes/presets/section-style-presets.php:92`</small>

### `unysonplus_default_spacing_scale` {#h-unysonplus-default-spacing-scale}
*🧪 filter*

```php
add_filter( 'unysonplus_default_spacing_scale', $callback );
```
<small>Fired in: `framework/includes/presets/spacing-presets.php:12`</small>

### `unysonplus_default_table_presets` {#h-unysonplus-default-table-presets}
*🧪 filter*

```php
add_filter( 'unysonplus_default_table_presets', $callback );
```
<small>Fired in: `framework/includes/presets/table-presets.php:65`</small>

### `unysonplus_fluid_type_viewport` {#h-unysonplus-fluid-type-viewport}
*🧪 filter*

```php
add_filter( 'unysonplus_fluid_type_viewport', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:63`</small>

### `unysonplus_font_size_presets` {#h-unysonplus-font-size-presets}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_font_size_presets', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:25`</small>

### `unysonplus_gap_scale` {#h-unysonplus-gap-scale}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_gap_scale', $callback );
```
<small>Fired in: `framework/includes/presets/spacing-presets.php:130`</small>

### `unysonplus_global_css` {#h-unysonplus-global-css}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_global_css', $callback );
```
<small>Fired in: `framework/includes/css-tokens.php:1468`</small>

### `unysonplus_icon_badge_presets` {#h-unysonplus-icon-badge-presets}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_icon_badge_presets', $callback );
```
<small>Fired in: `framework/includes/presets/icon-badge-presets.php:136`</small>

### `unysonplus_mobile_font_scale` {#h-unysonplus-mobile-font-scale}
*🧪 filter*

```php
add_filter( 'unysonplus_mobile_font_scale', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:51`</small>

### `unysonplus_page_css` {#h-unysonplus-page-css}
*🧪 filter*

```php
add_filter( 'unysonplus_page_css', $callback );
```
<small>Fired in: `framework/includes/dynamic-css.php:137`</small>

### `unysonplus_preset_store_extension` {#h-unysonplus-preset-store-extension}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_preset_store_extension', $callback );
```
<small>Fired in: `framework/includes/presets/store.php:49`</small>

### `unysonplus_section_style_presets` {#h-unysonplus-section-style-presets}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_section_style_presets', $callback );
```
<small>Fired in: `framework/includes/presets/section-style-presets.php:142`</small>

### `unysonplus_spacing_scale` {#h-unysonplus-spacing-scale}
*🧪 filter · 3 call sites*

```php
add_filter( 'unysonplus_spacing_scale', $callback );
```
<small>Fired in: `framework/includes/presets/spacing-presets.php:58`</small>

### `unysonplus_table_presets` {#h-unysonplus-table-presets}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_table_presets', $callback );
```
<small>Fired in: `framework/includes/presets/table-presets.php:219`</small>

### `unysonplus_type_scale_config` {#h-unysonplus-type-scale-config}
*🧪 filter*

```php
add_filter( 'unysonplus_type_scale_config', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:146`</small>

← Back to [Hooks overview](./index.md)
