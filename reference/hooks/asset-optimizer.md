---
title: Asset Optimizer — hooks
sidebar_label: Asset Optimizer
slug: /hooks/asset-optimizer
description: Actions and filters exposed by the UnysonPlus Asset Optimizer subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Asset Optimizer — hooks

**5 hooks** — 0 actions · 5 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw:ext:asset-optimizer:css_exclude_handles`](#h-fw-ext-asset-optimizer-css-exclude-handles) | filter | Filters the list of CSS handles force-excluded from combining, a developer escape hatch given the known handle map. |
| [`fw:ext:asset-optimizer:js_exclude_handles`](#h-fw-ext-asset-optimizer-js-exclude-handles) | filter | Filters the list of JS handles that must never be folded into the combined bundle. |
| [`fw:ext:asset-optimizer:preset_css_handles`](#h-fw-ext-asset-optimizer-preset-css-handles) | filter | Filters the handles treated as UnysonPlus design-preset stylesheets in the cascade (default the presets handle). |
| [`fw:ext:asset-optimizer:settings-options:after`](#h-fw-ext-asset-optimizer-settings-options-after) | filter | Filters options appended after the asset-optimizer settings tabs so extensions can add their own settings fields. |
| [`fw:ext:asset-optimizer:settings-options:before`](#h-fw-ext-asset-optimizer-settings-options-before) | filter | Filters options inserted before the asset-optimizer settings tabs so extensions can prepend their own settings fields. |

---

### `fw:ext:asset-optimizer:css_exclude_handles` {#h-fw-ext-asset-optimizer-css-exclude-handles}
*🧪 filter*

Filters the list of CSS handles force-excluded from combining, a developer escape hatch given the known handle map.

```php
add_filter( 'fw:ext:asset-optimizer:css_exclude_handles', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/class-fw-extension-asset-optimizer.php:1323`</small>

### `fw:ext:asset-optimizer:js_exclude_handles` {#h-fw-ext-asset-optimizer-js-exclude-handles}
*🧪 filter*

Filters the list of JS handles that must never be folded into the combined bundle.

```php
add_filter( 'fw:ext:asset-optimizer:js_exclude_handles', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/class-fw-extension-asset-optimizer.php:1568`</small>

### `fw:ext:asset-optimizer:preset_css_handles` {#h-fw-ext-asset-optimizer-preset-css-handles}
*🧪 filter*

Filters the handles treated as UnysonPlus design-preset stylesheets in the cascade (default the presets handle).

```php
add_filter( 'fw:ext:asset-optimizer:preset_css_handles', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/class-fw-extension-asset-optimizer.php:1091`</small>

### `fw:ext:asset-optimizer:settings-options:after` {#h-fw-ext-asset-optimizer-settings-options-after}
*🧪 filter*

Filters options appended after the asset-optimizer settings tabs so extensions can add their own settings fields.

```php
add_filter( 'fw:ext:asset-optimizer:settings-options:after', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/settings-options.php:233`</small>

### `fw:ext:asset-optimizer:settings-options:before` {#h-fw-ext-asset-optimizer-settings-options-before}
*🧪 filter*

Filters options inserted before the asset-optimizer settings tabs so extensions can prepend their own settings fields.

```php
add_filter( 'fw:ext:asset-optimizer:settings-options:before', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/settings-options.php:97`</small>

← Back to [Hooks overview](./index.md)
