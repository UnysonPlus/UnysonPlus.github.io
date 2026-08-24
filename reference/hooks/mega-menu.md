---
title: Mega Menu — hooks
sidebar_label: Mega Menu
slug: /hooks/mega-menu
description: Actions and filters exposed by the UnysonPlus Mega Menu subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Mega Menu — hooks

**8 hooks** — 0 actions · 8 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_mega_menu_container`](#h-fw-ext-mega-menu-container) | filter | — |
| [`fw_ext_mega_menu_start_lvl_classes`](#h-fw-ext-mega-menu-start-lvl-classes) | filter | — |
| [`fw:ext:megamenu:enqueue-frontend-css`](#h-fw-ext-megamenu-enqueue-frontend-css) | filter | — |
| [`fw:ext:megamenu:enqueue-icon-css`](#h-fw-ext-megamenu-enqueue-icon-css) | filter | — |
| [`fw:ext:megamenu:frontend-config`](#h-fw-ext-megamenu-frontend-config) | filter | — |
| [`fw:ext:megamenu:icon-option`](#h-fw-ext-megamenu-icon-option) | filter | — |
| [`fw:ext:megamenu:label:item-options-btn`](#h-fw-ext-megamenu-label-item-options-btn) | filter | — |
| [`fw:ext:megamenu:start_el_item_content:disable`](#h-fw-ext-megamenu-start-el-item-content-disable) | filter | — |

---

### `fw_ext_mega_menu_container` {#h-fw-ext-mega-menu-container}
*🧪 filter*

```php
add_filter( 'fw_ext_mega_menu_container', $callback );
```
<small>Fired in: `framework/extensions/megamenu/includes/class-fw-ext-mega-menu-walker.php:172`</small>

### `fw_ext_mega_menu_start_lvl_classes` {#h-fw-ext-mega-menu-start-lvl-classes}
*🧪 filter*

```php
add_filter( 'fw_ext_mega_menu_start_lvl_classes', $callback );
```
<small>Fired in: `framework/extensions/megamenu/includes/class-fw-ext-mega-menu-walker.php:200`</small>

### `fw:ext:megamenu:enqueue-frontend-css` {#h-fw-ext-megamenu-enqueue-frontend-css}
*🧪 filter*

```php
add_filter( 'fw:ext:megamenu:enqueue-frontend-css', $callback );
```
<small>Fired in: `framework/extensions/megamenu/static.php:40`</small>

### `fw:ext:megamenu:enqueue-icon-css` {#h-fw-ext-megamenu-enqueue-icon-css}
*🧪 filter*

```php
add_filter( 'fw:ext:megamenu:enqueue-icon-css', $callback );
```
<small>Fired in: `framework/extensions/megamenu/static.php:14`</small>

### `fw:ext:megamenu:frontend-config` {#h-fw-ext-megamenu-frontend-config}
*🧪 filter*

```php
add_filter( 'fw:ext:megamenu:frontend-config', $callback );
```
<small>Fired in: `framework/extensions/megamenu/static.php:61`</small>

### `fw:ext:megamenu:icon-option` {#h-fw-ext-megamenu-icon-option}
*🧪 filter*

```php
add_filter( 'fw:ext:megamenu:icon-option', $callback );
```
<small>Fired in: `framework/extensions/megamenu/class-fw-extension-megamenu.php:38`</small>

### `fw:ext:megamenu:label:item-options-btn` {#h-fw-ext-megamenu-label-item-options-btn}
*🧪 filter*

```php
add_filter( 'fw:ext:megamenu:label:item-options-btn', $callback );
```
<small>Fired in: `framework/extensions/megamenu/class-fw-extension-megamenu.php:102`</small>

### `fw:ext:megamenu:start_el_item_content:disable` {#h-fw-ext-megamenu-start-el-item-content-disable}
*🧪 filter*

```php
add_filter( 'fw:ext:megamenu:start_el_item_content:disable', $callback );
```
<small>Fired in: `framework/extensions/megamenu/hooks.php:130`</small>

← Back to [Hooks overview](./index.md)
