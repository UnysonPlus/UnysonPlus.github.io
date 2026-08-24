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
| [`fw:ext:asset-optimizer:css_exclude_handles`](#h-fw-ext-asset-optimizer-css-exclude-handles) | filter | — |
| [`fw:ext:asset-optimizer:js_exclude_handles`](#h-fw-ext-asset-optimizer-js-exclude-handles) | filter | — |
| [`fw:ext:asset-optimizer:preset_css_handles`](#h-fw-ext-asset-optimizer-preset-css-handles) | filter | — |
| [`fw:ext:asset-optimizer:settings-options:after`](#h-fw-ext-asset-optimizer-settings-options-after) | filter | — |
| [`fw:ext:asset-optimizer:settings-options:before`](#h-fw-ext-asset-optimizer-settings-options-before) | filter | — |

---

### `fw:ext:asset-optimizer:css_exclude_handles` {#h-fw-ext-asset-optimizer-css-exclude-handles}
*🧪 filter*

```php
add_filter( 'fw:ext:asset-optimizer:css_exclude_handles', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/class-fw-extension-asset-optimizer.php:1320`</small>

### `fw:ext:asset-optimizer:js_exclude_handles` {#h-fw-ext-asset-optimizer-js-exclude-handles}
*🧪 filter*

```php
add_filter( 'fw:ext:asset-optimizer:js_exclude_handles', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/class-fw-extension-asset-optimizer.php:1563`</small>

### `fw:ext:asset-optimizer:preset_css_handles` {#h-fw-ext-asset-optimizer-preset-css-handles}
*🧪 filter*

```php
add_filter( 'fw:ext:asset-optimizer:preset_css_handles', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/class-fw-extension-asset-optimizer.php:1090`</small>

### `fw:ext:asset-optimizer:settings-options:after` {#h-fw-ext-asset-optimizer-settings-options-after}
*🧪 filter*

```php
add_filter( 'fw:ext:asset-optimizer:settings-options:after', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/settings-options.php:231`</small>

### `fw:ext:asset-optimizer:settings-options:before` {#h-fw-ext-asset-optimizer-settings-options-before}
*🧪 filter*

```php
add_filter( 'fw:ext:asset-optimizer:settings-options:before', $callback );
```
<small>Fired in: `framework/extensions/asset-optimizer/settings-options.php:96`</small>

← Back to [Hooks overview](./index.md)
