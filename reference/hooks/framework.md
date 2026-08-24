---
title: Framework — hooks
sidebar_label: Framework
slug: /hooks/framework
description: Actions and filters exposed by the UnysonPlus Framework subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Framework — hooks

**4 hooks** — 2 actions · 2 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_before_init`](#h-fw-before-init) | action | Fires at the start of framework bootstrap, before autoload and core initialization. |
| [`fw_init`](#h-fw-init) | action | The framework is loaded |
| [`fw:backend-option-view:design-default:desc-under-label`](#h-fw-backend-option-view-design-default-desc-under-label) | filter | Fixes https://github.com/ThemeFuse/Unyson/issues/2143 |
| [`fw:backend-option-view:design-default:responsive-classes`](#h-fw-backend-option-view-design-default-responsive-classes) | filter | Filters the responsive grid classes for the label and input columns of the default option-row layout. |

---

### `fw_before_init` {#h-fw-before-init}
*🎬 action*

Fires at the start of framework bootstrap, before autoload and core initialization.

```php
add_action( 'fw_before_init', $callback );
```
<small>Fired in: `framework/bootstrap.php:44`</small>

### `fw_init` {#h-fw-init}
*🎬 action*

The framework is loaded

```php
add_action( 'fw_init', $callback );
```
<small>Fired in: `framework/bootstrap.php:208`</small>

### `fw:backend-option-view:design-default:desc-under-label` {#h-fw-backend-option-view-design-default-desc-under-label}
*🧪 filter*

Fixes https://github.com/ThemeFuse/Unyson/issues/2143

```php
add_filter( 'fw:backend-option-view:design-default:desc-under-label', $callback );
```
<small>Fired in: `framework/views/backend-option-design-default.php:136`</small>

### `fw:backend-option-view:design-default:responsive-classes` {#h-fw-backend-option-view-design-default-responsive-classes}
*🧪 filter*

Filters the responsive grid classes for the label and input columns of the default option-row layout.

```php
add_filter( 'fw:backend-option-view:design-default:responsive-classes', $callback );
```
<small>Fired in: `framework/views/backend-option-design-default.php:57`</small>

← Back to [Hooks overview](./index.md)
