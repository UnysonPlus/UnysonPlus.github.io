---
title: Builder (base) — hooks
sidebar_label: Builder (base)
slug: /hooks/builder-base
description: Actions and filters exposed by the UnysonPlus Builder (base) subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Builder (base) — hooks

**11 hooks** — 6 actions · 5 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_builder_fullscreen_add_backdrop`](#h-fw-builder-fullscreen-add-backdrop) | action | — |
| [`fw_builder_fullscreen_add_classes`](#h-fw-builder-fullscreen-add-classes) | filter | — |
| [`fw_builder_has_template_saving_feature`](#h-fw-builder-has-template-saving-feature) | filter | — |
| [`fw_builder_item_widths:`](#h-fw-builder-item-widths) | filter | — |
| [`fw_builder:`](#h-fw-builder) | action | — |
| [`fw_ext_builder:option_type:`](#h-fw-ext-builder-option-type) | filter | — |
| [`fw_ext_builder:option_type:builder:before_enqueue`](#h-fw-ext-builder-option-type-builder-before-enqueue) | action | — |
| [`fw_ext_builder:option_type:builder:enqueue`](#h-fw-ext-builder-option-type-builder-enqueue) | action | — |
| [`fw_ext_builder:predefined_templates:`](#h-fw-ext-builder-predefined-templates) | filter | — |
| [`fw_ext_builder:template_components_register`](#h-fw-ext-builder-template-components-register) | action | — |
| [`fw_option_type_builder:`](#h-fw-option-type-builder) | action | — |

---

### `fw_builder_fullscreen_add_backdrop` {#h-fw-builder-fullscreen-add-backdrop}
*🎬 action*

```php
add_action( 'fw_builder_fullscreen_add_backdrop', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/view.php:66`</small>

### `fw_builder_fullscreen_add_classes` {#h-fw-builder-fullscreen-add-classes}
*🧪 filter*

```php
add_filter( 'fw_builder_fullscreen_add_classes', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php:653`</small>

### `fw_builder_has_template_saving_feature` {#h-fw-builder-has-template-saving-feature}
*🧪 filter*

```php
add_filter( 'fw_builder_has_template_saving_feature', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/includes/templates/class-fw-ext-builder-templates.php:96`</small>

### `fw_builder_item_widths:` {#h-fw-builder-item-widths}
*🧪 filter*

```php
add_filter( 'fw_builder_item_widths:', $callback );
```
<small>Fired in: `framework/extensions/builder/helpers.php:28`</small>

### `fw_builder:` {#h-fw-builder}
*🎬 action*

```php
add_action( 'fw_builder:', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/view.php:60`</small>

### `fw_ext_builder:option_type:` {#h-fw-ext-builder-option-type}
*🧪 filter*

```php
add_filter( 'fw_ext_builder:option_type:', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php:58`</small>

### `fw_ext_builder:option_type:builder:before_enqueue` {#h-fw-ext-builder-option-type-builder-before-enqueue}
*🎬 action*

```php
add_action( 'fw_ext_builder:option_type:builder:before_enqueue', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php:389`</small>

### `fw_ext_builder:option_type:builder:enqueue` {#h-fw-ext-builder-option-type-builder-enqueue}
*🎬 action*

```php
add_action( 'fw_ext_builder:option_type:builder:enqueue', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php:542`</small>

### `fw_ext_builder:predefined_templates:` {#h-fw-ext-builder-predefined-templates}
*🧪 filter*

```php
add_filter( 'fw_ext_builder:predefined_templates:', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/includes/templates/class-fw-ext-builder-templates-component.php:69`</small>

### `fw_ext_builder:template_components_register` {#h-fw-ext-builder-template-components-register}
*🎬 action*

```php
add_action( 'fw_ext_builder:template_components_register', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/includes/templates/class-fw-ext-builder-templates.php:160`</small>

### `fw_option_type_builder:` {#h-fw-option-type-builder}
*🎬 action*

```php
add_action( 'fw_option_type_builder:', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php:117`</small>

← Back to [Hooks overview](./index.md)
