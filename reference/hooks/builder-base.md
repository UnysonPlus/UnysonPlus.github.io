---
title: Builder (base) — hooks
sidebar_label: Builder (base)
slug: /hooks/builder-base
description: Actions and filters exposed by the UnysonPlus Builder (base) subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Builder (base) — hooks

**6 hooks** — 4 actions · 2 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_builder_fullscreen_add_backdrop`](#h-fw-builder-fullscreen-add-backdrop) | action | Fires once to add a single shared backdrop element for all fullscreen builders on the page. |
| [`fw_builder_fullscreen_add_classes`](#h-fw-builder-fullscreen-add-classes) | filter | Filters extra CSS classes added to a fullscreen builder option's wrapper. |
| [`fw_builder_has_template_saving_feature`](#h-fw-builder-has-template-saving-feature) | filter | Filters whether the builder option exposes the template-saving feature, based on its template_saving config. |
| [`fw_ext_builder:option_type:builder:before_enqueue`](#h-fw-ext-builder-option-type-builder-before-enqueue) | action | Fires before the builder option type enqueues its assets, passing the option and version for early asset setup. |
| [`fw_ext_builder:option_type:builder:enqueue`](#h-fw-ext-builder-option-type-builder-enqueue) | action | Fires when the builder option type enqueues its assets, passing the option, version, and base URI. |
| [`fw_ext_builder:template_components_register`](#h-fw-ext-builder-template-components-register) | action | Fires to let listeners register builder template components during component collection. |

---

### `fw_builder_fullscreen_add_backdrop` {#h-fw-builder-fullscreen-add-backdrop}
*🎬 action*

Fires once to add a single shared backdrop element for all fullscreen builders on the page.

```php
add_action( 'fw_builder_fullscreen_add_backdrop', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/view.php:67`</small>

### `fw_builder_fullscreen_add_classes` {#h-fw-builder-fullscreen-add-classes}
*🧪 filter*

Filters extra CSS classes added to a fullscreen builder option's wrapper.

```php
add_filter( 'fw_builder_fullscreen_add_classes', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php:656`</small>

### `fw_builder_has_template_saving_feature` {#h-fw-builder-has-template-saving-feature}
*🧪 filter*

Filters whether the builder option exposes the template-saving feature, based on its template_saving config.

```php
add_filter( 'fw_builder_has_template_saving_feature', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/includes/templates/class-fw-ext-builder-templates.php:97`</small>

### `fw_ext_builder:option_type:builder:before_enqueue` {#h-fw-ext-builder-option-type-builder-before-enqueue}
*🎬 action*

Fires before the builder option type enqueues its assets, passing the option and version for early asset setup.

```php
add_action( 'fw_ext_builder:option_type:builder:before_enqueue', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php:390`</small>

### `fw_ext_builder:option_type:builder:enqueue` {#h-fw-ext-builder-option-type-builder-enqueue}
*🎬 action*

Fires when the builder option type enqueues its assets, passing the option, version, and base URI.

```php
add_action( 'fw_ext_builder:option_type:builder:enqueue', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php:544`</small>

### `fw_ext_builder:template_components_register` {#h-fw-ext-builder-template-components-register}
*🎬 action*

Fires to let listeners register builder template components during component collection.

```php
add_action( 'fw_ext_builder:template_components_register', $callback );
```
<small>Fired in: `framework/extensions/builder/includes/option-types/builder/includes/templates/class-fw-ext-builder-templates.php:162`</small>

← Back to [Hooks overview](./index.md)
