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
| [`fw_ext_mega_menu_container`](#h-fw-ext-mega-menu-container) | filter | Filters the mega menu row container tag and attributes before the dropdown wrapper is rendered. |
| [`fw_ext_mega_menu_start_lvl_classes`](#h-fw-ext-mega-menu-start-lvl-classes) | filter | Filters the CSS classes applied to a mega menu sub-menu wrapper at start_lvl, given element and depth context. |
| [`fw:ext:megamenu:enqueue-frontend-css`](#h-fw-ext-megamenu-enqueue-frontend-css) | filter | Filters whether the mega menu's baseline front-end CSS/JS and behavior config are enqueued (opt-out point). |
| [`fw:ext:megamenu:enqueue-icon-css`](#h-fw-ext-megamenu-enqueue-icon-css) | filter | Filters whether the mega menu enqueues its icon-font CSS on the front end. |
| [`fw:ext:megamenu:frontend-config`](#h-fw-ext-megamenu-frontend-config) | filter | Filters the mega menu front-end behavior config localized to script, e.g. whether submenus open on hover or click. |
| [`fw:ext:megamenu:icon-option`](#h-fw-ext-megamenu-icon-option) | filter | Filters the option-type descriptor used for the mega menu's icon picker, shared by admin and front-end. |
| [`fw:ext:megamenu:label:item-options-btn`](#h-fw-ext-megamenu-label-item-options-btn) | filter | Filters the label of the mega-menu item settings button shown in the admin menu editor. |
| [`fw:ext:megamenu:start_el_item_content:disable`](#h-fw-ext-megamenu-start-el-item-content-disable) | filter | Filters whether to skip the mega-menu walker's custom start-element rendering for a given menu item. |

---

### `fw_ext_mega_menu_container` {#h-fw-ext-mega-menu-container}
*🧪 filter*

Filters the mega menu row container tag and attributes before the dropdown wrapper is rendered.

```php
add_filter( 'fw_ext_mega_menu_container', $callback );
```
<small>Fired in: `framework/extensions/megamenu/includes/class-fw-ext-mega-menu-walker.php:173`</small>

### `fw_ext_mega_menu_start_lvl_classes` {#h-fw-ext-mega-menu-start-lvl-classes}
*🧪 filter*

Filters the CSS classes applied to a mega menu sub-menu wrapper at start_lvl, given element and depth context.

```php
add_filter( 'fw_ext_mega_menu_start_lvl_classes', $callback );
```
<small>Fired in: `framework/extensions/megamenu/includes/class-fw-ext-mega-menu-walker.php:202`</small>

### `fw:ext:megamenu:enqueue-frontend-css` {#h-fw-ext-megamenu-enqueue-frontend-css}
*🧪 filter*

Filters whether the mega menu's baseline front-end CSS/JS and behavior config are enqueued (opt-out point).

```php
add_filter( 'fw:ext:megamenu:enqueue-frontend-css', $callback );
```
<small>Fired in: `framework/extensions/megamenu/static.php:42`</small>

### `fw:ext:megamenu:enqueue-icon-css` {#h-fw-ext-megamenu-enqueue-icon-css}
*🧪 filter*

Filters whether the mega menu enqueues its icon-font CSS on the front end.

```php
add_filter( 'fw:ext:megamenu:enqueue-icon-css', $callback );
```
<small>Fired in: `framework/extensions/megamenu/static.php:15`</small>

### `fw:ext:megamenu:frontend-config` {#h-fw-ext-megamenu-frontend-config}
*🧪 filter*

Filters the mega menu front-end behavior config localized to script, e.g. whether submenus open on hover or click.

```php
add_filter( 'fw:ext:megamenu:frontend-config', $callback );
```
<small>Fired in: `framework/extensions/megamenu/static.php:64`</small>

### `fw:ext:megamenu:icon-option` {#h-fw-ext-megamenu-icon-option}
*🧪 filter*

Filters the option-type descriptor used for the mega menu's icon picker, shared by admin and front-end.

```php
add_filter( 'fw:ext:megamenu:icon-option', $callback );
```
<small>Fired in: `framework/extensions/megamenu/class-fw-extension-megamenu.php:39`</small>

### `fw:ext:megamenu:label:item-options-btn` {#h-fw-ext-megamenu-label-item-options-btn}
*🧪 filter*

Filters the label of the mega-menu item settings button shown in the admin menu editor.

```php
add_filter( 'fw:ext:megamenu:label:item-options-btn', $callback );
```
<small>Fired in: `framework/extensions/megamenu/class-fw-extension-megamenu.php:104`</small>

### `fw:ext:megamenu:start_el_item_content:disable` {#h-fw-ext-megamenu-start-el-item-content-disable}
*🧪 filter*

Filters whether to skip the mega-menu walker's custom start-element rendering for a given menu item.

```php
add_filter( 'fw:ext:megamenu:start_el_item_content:disable', $callback );
```
<small>Fired in: `framework/extensions/megamenu/hooks.php:134`</small>

← Back to [Hooks overview](./index.md)
