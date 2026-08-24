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
| [`fw_rate_limit`](#h-fw-rate-limit) | filter | Filters a rate limit before it is applied for an action; return 0 or less to disable limiting for that action. |
| [`fw_rate_limit_client_ip`](#h-fw-rate-limit-client-ip) | filter | Filters the raw client IP used for rate limiting, for use behind a validated proxy or CDN. |
| [`fw_update_guard_message`](#h-fw-update-guard-message) | filter | Filters the title of the update-confirmation dialog shown before updating the Unyson+ Framework. |
| [`fw_update_guard_title`](#h-fw-update-guard-title) | filter | Filters the title of the update-confirmation dialog shown before updating the Unyson+ Framework. |
| [`fw_upw_internal_post_types`](#h-fw-upw-internal-post-types) | filter | Filters the list of internal WordPress post type keys treated as plumbing (attachment, revision, etc.) and excluded from user content. |
| [`fw:dynamic-content:permalink_choices_limit`](#h-fw-dynamic-content-permalink-choices-limit) | filter | Filters the maximum number of permalink choices listed per post type in the dynamic-content link picker (default 200). |
| [`fw:dynamic-content:tags`](#h-fw-dynamic-content-tags) | filter | Filters the registry of Dynamic Content tags, letting extensions register pickable tags with labels, params, and resolvers. |
| [`unysonplus_border_presets`](#h-unysonplus-border-presets) | filter | Filters the effective column border presets (saved Theme Settings values or defaults) returned to consumers. |
| [`unysonplus_button_color_presets`](#h-unysonplus-button-color-presets) | filter | Filters the effective button color presets (saved Theme Settings values or defaults) returned to consumers. |
| [`unysonplus_button_size_presets`](#h-unysonplus-button-size-presets) | filter | Filters the effective button size presets (saved Theme Settings values or defaults) returned to consumers. |
| [`unysonplus_color_presets`](#h-unysonplus-color-presets) | filter | Filters the effective named color presets (saved Theme Settings values or defaults) returned to consumers. |
| [`unysonplus_container_width_presets`](#h-unysonplus-container-width-presets) | filter | Filters the effective container width presets (saved store values or built-in defaults) returned to consumers. |
| [`unysonplus_custom_hover_animations`](#h-unysonplus-custom-hover-animations) | filter | Filters the effective custom button hover animations (saved Theme Settings values or seeded samples). |
| [`unysonplus_default_border_presets`](#h-unysonplus-default-border-presets) | filter | Filters the built-in default column border presets (Card, Outline, Soft Shadow, Hover Lift) before user overrides apply. |
| [`unysonplus_default_button_color_presets`](#h-unysonplus-default-button-color-presets) | filter | Filters the built-in default button color presets (solid, outline, gradient, link) before user overrides apply. |
| [`unysonplus_default_button_size_presets`](#h-unysonplus-default-button-size-presets) | filter | Filters the built-in default button size presets (xs through xl) before user overrides apply. |
| [`unysonplus_default_color_presets`](#h-unysonplus-default-color-presets) | filter | Filters the built-in default named color palette (Primary, Secondary, and the Material-style hues) before user overrides. |
| [`unysonplus_default_custom_hover_animations`](#h-unysonplus-default-custom-hover-animations) | filter | Filters the seeded sample custom button hover animations (Pulse Ring, Swing, etc.) shown before user overrides. |
| [`unysonplus_default_font_size_presets`](#h-unysonplus-default-font-size-presets) | filter | Filters the built-in default font-size presets (Display 1-5, Lead) before user overrides apply. |
| [`unysonplus_default_gap_scale`](#h-unysonplus-default-gap-scale) | filter | Filters the built-in default gap scale (Bootstrap-derived gutter steps) before user overrides apply. |
| [`unysonplus_default_icon_badge_presets`](#h-unysonplus-default-icon-badge-presets) | filter | Filters the built-in default icon badge presets (Circle, Soft Tile, Outline Ring, Hexagon) before user overrides apply. |
| [`unysonplus_default_section_style_presets`](#h-unysonplus-default-section-style-presets) | filter | Filters the built-in default section style presets (Alt, Light band skins) before user overrides apply. |
| [`unysonplus_default_spacing_scale`](#h-unysonplus-default-spacing-scale) | filter | Filters the built-in default spacing scale (Bootstrap-derived spacer steps plus mid-range steps) before user overrides. |
| [`unysonplus_default_table_presets`](#h-unysonplus-default-table-presets) | filter | Filters the built-in default table style presets (Clean Lines, etc.) before user overrides apply. |
| [`unysonplus_fluid_type_viewport`](#h-unysonplus-fluid-type-viewport) | filter | Filters the viewport min/max px range over which fluid typography interpolates between the mobile floor and authored size. |
| [`unysonplus_font_size_presets`](#h-unysonplus-font-size-presets) | filter | Filters the effective font-size presets (saved Theme Settings values or defaults) returned to consumers. |
| [`unysonplus_gap_scale`](#h-unysonplus-gap-scale) | filter | Filters the effective gap scale (saved Theme Settings values or defaults) returned to consumers. |
| [`unysonplus_global_css`](#h-unysonplus-global-css) | filter | Filters the global custom CSS string folded into the cacheable presets stylesheet. |
| [`unysonplus_icon_badge_presets`](#h-unysonplus-icon-badge-presets) | filter | Filters the effective icon badge presets (saved Theme Settings values or defaults) returned to consumers. |
| [`unysonplus_mobile_font_scale`](#h-unysonplus-mobile-font-scale) | filter | Filters the mobile shrink ratio applied to a desktop font size before it goes fluid, given the size in px and its context. |
| [`unysonplus_page_css`](#h-unysonplus-page-css) | filter | Filters theme-contributed page-level CSS (page background, custom CSS) appended to a post's dynamic stylesheet. |
| [`unysonplus_preset_store_extension`](#h-unysonplus-preset-store-extension) | filter | Filters the extension slug (default shortcodes) whose legacy settings store presets are read from before theme migration. |
| [`unysonplus_section_style_presets`](#h-unysonplus-section-style-presets) | filter | Filters the section style presets, whether loaded from saved settings or the plugin defaults. |
| [`unysonplus_spacing_scale`](#h-unysonplus-spacing-scale) | filter | Filters the spacing-scale preset entries returned from saved settings. |
| [`unysonplus_table_presets`](#h-unysonplus-table-presets) | filter | Filters the table presets, whether loaded from saved settings or the plugin defaults. |
| [`unysonplus_type_scale_config`](#h-unysonplus-type-scale-config) | filter | Filters the default modular type-scale config (base size, desktop and mobile ratios, step counts, floor). |

---

### `fw_rate_limit` {#h-fw-rate-limit}
*🧪 filter*

Filters a rate limit before it is applied for an action; return 0 or less to disable limiting for that action.

```php
add_filter( 'fw_rate_limit', $callback );
```
<small>Fired in: `framework/includes/rate-limit.php:112`</small>

### `fw_rate_limit_client_ip` {#h-fw-rate-limit-client-ip}
*🧪 filter*

Filters the raw client IP used for rate limiting, for use behind a validated proxy or CDN.

```php
add_filter( 'fw_rate_limit_client_ip', $callback );
```
<small>Fired in: `framework/includes/rate-limit.php:66`</small>

### `fw_update_guard_message` {#h-fw-update-guard-message}
*🧪 filter*

Filters the title of the update-confirmation dialog shown before updating the Unyson+ Framework.

```php
add_filter( 'fw_update_guard_message', $callback );
```
<small>Fired in: `framework/includes/update-guard/update-guard.php:55`</small>

### `fw_update_guard_title` {#h-fw-update-guard-title}
*🧪 filter*

Filters the title of the update-confirmation dialog shown before updating the Unyson+ Framework.

```php
add_filter( 'fw_update_guard_title', $callback );
```
<small>Fired in: `framework/includes/update-guard/update-guard.php:54`</small>

### `fw_upw_internal_post_types` {#h-fw-upw-internal-post-types}
*🧪 filter*

Filters the list of internal WordPress post type keys treated as plumbing (attachment, revision, etc.) and excluded from user content.

```php
add_filter( 'fw_upw_internal_post_types', $callback );
```
<small>Fired in: `framework/includes/post-type-choices.php:24`</small>

### `fw:dynamic-content:permalink_choices_limit` {#h-fw-dynamic-content-permalink-choices-limit}
*🧪 filter*

Filters the maximum number of permalink choices listed per post type in the dynamic-content link picker (default 200).

```php
add_filter( 'fw:dynamic-content:permalink_choices_limit', $callback );
```
<small>Fired in: `framework/includes/dynamic-content/tags/links.php:25`</small>

### `fw:dynamic-content:tags` {#h-fw-dynamic-content-tags}
*🧪 filter*

Filters the registry of Dynamic Content tags, letting extensions register pickable tags with labels, params, and resolvers.

```php
add_filter( 'fw:dynamic-content:tags', $callback );
```
<small>Fired in: `framework/includes/dynamic-content/class-fw-dynamic-content.php:107`</small>

### `unysonplus_border_presets` {#h-unysonplus-border-presets}
*🧪 filter · 2 call sites*

Filters the effective column border presets (saved Theme Settings values or defaults) returned to consumers.

```php
add_filter( 'unysonplus_border_presets', $callback );
```
<small>Fired in: `framework/includes/presets/border-presets.php:138`</small>

### `unysonplus_button_color_presets` {#h-unysonplus-button-color-presets}
*🧪 filter · 2 call sites*

Filters the effective button color presets (saved Theme Settings values or defaults) returned to consumers.

```php
add_filter( 'unysonplus_button_color_presets', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:193`</small>

### `unysonplus_button_size_presets` {#h-unysonplus-button-size-presets}
*🧪 filter · 2 call sites*

Filters the effective button size presets (saved Theme Settings values or defaults) returned to consumers.

```php
add_filter( 'unysonplus_button_size_presets', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:238`</small>

### `unysonplus_color_presets` {#h-unysonplus-color-presets}
*🧪 filter · 2 call sites*

Filters the effective named color presets (saved Theme Settings values or defaults) returned to consumers.

```php
add_filter( 'unysonplus_color_presets', $callback );
```
<small>Fired in: `framework/includes/presets/color-presets.php:53`</small>

### `unysonplus_container_width_presets` {#h-unysonplus-container-width-presets}
*🧪 filter · 2 call sites*

Filters the effective container width presets (saved store values or built-in defaults) returned to consumers.

```php
add_filter( 'unysonplus_container_width_presets', $callback );
```
<small>Fired in: `framework/includes/presets/container-width-presets.php:72`</small>

### `unysonplus_custom_hover_animations` {#h-unysonplus-custom-hover-animations}
*🧪 filter · 2 call sites*

Filters the effective custom button hover animations (saved Theme Settings values or seeded samples).

```php
add_filter( 'unysonplus_custom_hover_animations', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:323`</small>

### `unysonplus_default_border_presets` {#h-unysonplus-default-border-presets}
*🧪 filter*

Filters the built-in default column border presets (Card, Outline, Soft Shadow, Hover Lift) before user overrides apply.

```php
add_filter( 'unysonplus_default_border_presets', $callback );
```
<small>Fired in: `framework/includes/presets/border-presets.php:65`</small>

### `unysonplus_default_button_color_presets` {#h-unysonplus-default-button-color-presets}
*🧪 filter*

Filters the built-in default button color presets (solid, outline, gradient, link) before user overrides apply.

```php
add_filter( 'unysonplus_default_button_color_presets', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:137`</small>

### `unysonplus_default_button_size_presets` {#h-unysonplus-default-button-size-presets}
*🧪 filter*

Filters the built-in default button size presets (xs through xl) before user overrides apply.

```php
add_filter( 'unysonplus_default_button_size_presets', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:216`</small>

### `unysonplus_default_color_presets` {#h-unysonplus-default-color-presets}
*🧪 filter*

Filters the built-in default named color palette (Primary, Secondary, and the Material-style hues) before user overrides.

```php
add_filter( 'unysonplus_default_color_presets', $callback );
```
<small>Fired in: `framework/includes/presets/color-presets.php:9`</small>

### `unysonplus_default_custom_hover_animations` {#h-unysonplus-default-custom-hover-animations}
*🧪 filter*

Filters the seeded sample custom button hover animations (Pulse Ring, Swing, etc.) shown before user overrides.

```php
add_filter( 'unysonplus_default_custom_hover_animations', $callback );
```
<small>Fired in: `framework/includes/presets/button-presets.php:257`</small>

### `unysonplus_default_font_size_presets` {#h-unysonplus-default-font-size-presets}
*🧪 filter*

Filters the built-in default font-size presets (Display 1-5, Lead) before user overrides apply.

```php
add_filter( 'unysonplus_default_font_size_presets', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:9`</small>

### `unysonplus_default_gap_scale` {#h-unysonplus-default-gap-scale}
*🧪 filter*

Filters the built-in default gap scale (Bootstrap-derived gutter steps) before user overrides apply.

```php
add_filter( 'unysonplus_default_gap_scale', $callback );
```
<small>Fired in: `framework/includes/presets/spacing-presets.php:98`</small>

### `unysonplus_default_icon_badge_presets` {#h-unysonplus-default-icon-badge-presets}
*🧪 filter*

Filters the built-in default icon badge presets (Circle, Soft Tile, Outline Ring, Hexagon) before user overrides apply.

```php
add_filter( 'unysonplus_default_icon_badge_presets', $callback );
```
<small>Fired in: `framework/includes/presets/icon-badge-presets.php:59`</small>

### `unysonplus_default_section_style_presets` {#h-unysonplus-default-section-style-presets}
*🧪 filter*

Filters the built-in default section style presets (Alt, Light band skins) before user overrides apply.

```php
add_filter( 'unysonplus_default_section_style_presets', $callback );
```
<small>Fired in: `framework/includes/presets/section-style-presets.php:93`</small>

### `unysonplus_default_spacing_scale` {#h-unysonplus-default-spacing-scale}
*🧪 filter*

Filters the built-in default spacing scale (Bootstrap-derived spacer steps plus mid-range steps) before user overrides.

```php
add_filter( 'unysonplus_default_spacing_scale', $callback );
```
<small>Fired in: `framework/includes/presets/spacing-presets.php:13`</small>

### `unysonplus_default_table_presets` {#h-unysonplus-default-table-presets}
*🧪 filter*

Filters the built-in default table style presets (Clean Lines, etc.) before user overrides apply.

```php
add_filter( 'unysonplus_default_table_presets', $callback );
```
<small>Fired in: `framework/includes/presets/table-presets.php:66`</small>

### `unysonplus_fluid_type_viewport` {#h-unysonplus-fluid-type-viewport}
*🧪 filter*

Filters the viewport min/max px range over which fluid typography interpolates between the mobile floor and authored size.

```php
add_filter( 'unysonplus_fluid_type_viewport', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:67`</small>

### `unysonplus_font_size_presets` {#h-unysonplus-font-size-presets}
*🧪 filter · 2 call sites*

Filters the effective font-size presets (saved Theme Settings values or defaults) returned to consumers.

```php
add_filter( 'unysonplus_font_size_presets', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:27`</small>

### `unysonplus_gap_scale` {#h-unysonplus-gap-scale}
*🧪 filter · 2 call sites*

Filters the effective gap scale (saved Theme Settings values or defaults) returned to consumers.

```php
add_filter( 'unysonplus_gap_scale', $callback );
```
<small>Fired in: `framework/includes/presets/spacing-presets.php:134`</small>

### `unysonplus_global_css` {#h-unysonplus-global-css}
*🧪 filter · 2 call sites*

Filters the global custom CSS string folded into the cacheable presets stylesheet.

```php
add_filter( 'unysonplus_global_css', $callback );
```
<small>Fired in: `framework/includes/css-tokens.php:1486`</small>

### `unysonplus_icon_badge_presets` {#h-unysonplus-icon-badge-presets}
*🧪 filter · 2 call sites*

Filters the effective icon badge presets (saved Theme Settings values or defaults) returned to consumers.

```php
add_filter( 'unysonplus_icon_badge_presets', $callback );
```
<small>Fired in: `framework/includes/presets/icon-badge-presets.php:138`</small>

### `unysonplus_mobile_font_scale` {#h-unysonplus-mobile-font-scale}
*🧪 filter*

Filters the mobile shrink ratio applied to a desktop font size before it goes fluid, given the size in px and its context.

```php
add_filter( 'unysonplus_mobile_font_scale', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:54`</small>

### `unysonplus_page_css` {#h-unysonplus-page-css}
*🧪 filter*

Filters theme-contributed page-level CSS (page background, custom CSS) appended to a post's dynamic stylesheet.

```php
add_filter( 'unysonplus_page_css', $callback );
```
<small>Fired in: `framework/includes/dynamic-css.php:138`</small>

### `unysonplus_preset_store_extension` {#h-unysonplus-preset-store-extension}
*🧪 filter · 2 call sites*

Filters the extension slug (default shortcodes) whose legacy settings store presets are read from before theme migration.

```php
add_filter( 'unysonplus_preset_store_extension', $callback );
```
<small>Fired in: `framework/includes/presets/store.php:50`</small>

### `unysonplus_section_style_presets` {#h-unysonplus-section-style-presets}
*🧪 filter · 2 call sites*

Filters the section style presets, whether loaded from saved settings or the plugin defaults.

```php
add_filter( 'unysonplus_section_style_presets', $callback );
```
<small>Fired in: `framework/includes/presets/section-style-presets.php:144`</small>

### `unysonplus_spacing_scale` {#h-unysonplus-spacing-scale}
*🧪 filter · 3 call sites*

Filters the spacing-scale preset entries returned from saved settings.

```php
add_filter( 'unysonplus_spacing_scale', $callback );
```
<small>Fired in: `framework/includes/presets/spacing-presets.php:60`</small>

### `unysonplus_table_presets` {#h-unysonplus-table-presets}
*🧪 filter · 2 call sites*

Filters the table presets, whether loaded from saved settings or the plugin defaults.

```php
add_filter( 'unysonplus_table_presets', $callback );
```
<small>Fired in: `framework/includes/presets/table-presets.php:221`</small>

### `unysonplus_type_scale_config` {#h-unysonplus-type-scale-config}
*🧪 filter*

Filters the default modular type-scale config (base size, desktop and mobile ratios, step counts, floor).

```php
add_filter( 'unysonplus_type_scale_config', $callback );
```
<small>Fired in: `framework/includes/presets/font-size-presets.php:151`</small>

← Back to [Hooks overview](./index.md)
