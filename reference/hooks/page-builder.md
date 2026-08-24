---
title: Page Builder — hooks
sidebar_label: Page Builder
slug: /hooks/page-builder
description: Actions and filters exposed by the UnysonPlus Page Builder subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Page Builder — hooks

**20 hooks** — 1 actions · 19 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_page_builder_content_wrapper_class`](#h-fw-ext-page-builder-content-wrapper-class) | filter | — |
| [`fw_ext_page_builder_output_content_wrapper`](#h-fw-ext-page-builder-output-content-wrapper) | filter | — |
| [`fw_ext_page_builder_settings_options`](#h-fw-ext-page-builder-settings-options) | filter | — |
| [`fw_ext_page_builder_settings_options_post_types_default_value`](#h-fw-ext-page-builder-settings-options-post-types-default-value) | filter | — |
| [`fw_ext_page_builder_supported_post_types`](#h-fw-ext-page-builder-supported-post-types) | filter | — |
| [`fw_ext_page_builder_templates`](#h-fw-ext-page-builder-templates) | filter | — |
| [`fw_ext_page-builder_items_correction_complete`](#h-fw-ext-page-builder-items-correction-complete) | filter | — |
| [`fw_page_builder_set_as_default`](#h-fw-page-builder-set-as-default) | filter | — |
| [`fw_page_builder_thumbs_before_display`](#h-fw-page-builder-thumbs-before-display) | filter | — |
| [`fw_section_like_types`](#h-fw-section-like-types) | filter | — |
| [`fw-ext:page-builder:disable-builder-item-correction:`](#h-fw-ext-page-builder-disable-builder-item-correction) | filter | — |
| [`fw-ext:page-builder:manual-builder-item-correction:`](#h-fw-ext-page-builder-manual-builder-item-correction) | filter | — |
| [`fw:ext:page-builder:builder-data:before-shortcode-generate`](#h-fw-ext-page-builder-builder-data-before-shortcode-generate) | filter | — |
| [`fw:ext:page-builder:generate-post-content-html`](#h-fw-ext-page-builder-generate-post-content-html) | filter | — |
| [`fw:ext:page-builder:item-corrector:column-width`](#h-fw-ext-page-builder-item-corrector-column-width) | filter | — |
| [`fw:ext:page-builder:item-type:simple:enqueue_static`](#h-fw-ext-page-builder-item-type-simple-enqueue-static) | action | — |
| [`fw:ext:page-builder:json-structure-correction`](#h-fw-ext-page-builder-json-structure-correction) | filter | — |
| [`fw:ext:page-builder:json-structure-correction:complete`](#h-fw-ext-page-builder-json-structure-correction-complete) | filter | — |
| [`fw:ext:page-builder:json-structure-needs-correction`](#h-fw-ext-page-builder-json-structure-needs-correction) | filter | — |
| [`fw:ext:page-builder:modal-save-all`](#h-fw-ext-page-builder-modal-save-all) | filter | — |

---

### `fw_ext_page_builder_content_wrapper_class` {#h-fw-ext-page-builder-content-wrapper-class}
*🧪 filter*

```php
add_filter( 'fw_ext_page_builder_content_wrapper_class', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/class-fw-extension-page-builder.php:303`</small>

### `fw_ext_page_builder_output_content_wrapper` {#h-fw-ext-page-builder-output-content-wrapper}
*🧪 filter*

```php
add_filter( 'fw_ext_page_builder_output_content_wrapper', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/class-fw-extension-page-builder.php:297`</small>

### `fw_ext_page_builder_settings_options` {#h-fw-ext-page-builder-settings-options}
*🧪 filter*

```php
add_filter( 'fw_ext_page_builder_settings_options', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/settings-options.php:34`</small>

### `fw_ext_page_builder_settings_options_post_types_default_value` {#h-fw-ext-page-builder-settings-options-post-types-default-value}
*🧪 filter*

```php
add_filter( 'fw_ext_page_builder_settings_options_post_types_default_value', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/settings-options.php:14`</small>

### `fw_ext_page_builder_supported_post_types` {#h-fw-ext-page-builder-supported-post-types}
*🧪 filter*

```php
add_filter( 'fw_ext_page_builder_supported_post_types', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/helpers.php:31`</small>

### `fw_ext_page_builder_templates` {#h-fw-ext-page-builder-templates}
*🧪 filter*

```php
add_filter( 'fw_ext_page_builder_templates', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:138`</small>

### `fw_ext_page-builder_items_correction_complete` {#h-fw-ext-page-builder-items-correction-complete}
*🧪 filter*

```php
add_filter( 'fw_ext_page-builder_items_correction_complete', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/items-corrector/class-page-builder-items-corrector.php:93`</small>

### `fw_page_builder_set_as_default` {#h-fw-page-builder-set-as-default}
*🧪 filter*

```php
add_filter( 'fw_page_builder_set_as_default', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:337`</small>

### `fw_page_builder_thumbs_before_display` {#h-fw-page-builder-thumbs-before-display}
*🧪 filter*

```php
add_filter( 'fw_page_builder_thumbs_before_display', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/item-types/class-page-builder-item.php:84`</small>

### `fw_section_like_types` {#h-fw-section-like-types}
*🧪 filter · 4 call sites*

```php
add_filter( 'fw_section_like_types', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/item-types/class-fw-section-like-registry.php:32`</small>

### `fw-ext:page-builder:disable-builder-item-correction:` {#h-fw-ext-page-builder-disable-builder-item-correction}
*🧪 filter*

```php
add_filter( 'fw-ext:page-builder:disable-builder-item-correction:', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/items-corrector/class-page-builder-items-corrector.php:451`</small>

### `fw-ext:page-builder:manual-builder-item-correction:` {#h-fw-ext-page-builder-manual-builder-item-correction}
*🧪 filter*

```php
add_filter( 'fw-ext:page-builder:manual-builder-item-correction:', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/items-corrector/class-page-builder-items-corrector.php:459`</small>

### `fw:ext:page-builder:builder-data:before-shortcode-generate` {#h-fw-ext-page-builder-builder-data-before-shortcode-generate}
*🧪 filter*

```php
add_filter( 'fw:ext:page-builder:builder-data:before-shortcode-generate', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/class-fw-extension-page-builder.php:399`</small>

### `fw:ext:page-builder:generate-post-content-html` {#h-fw-ext-page-builder-generate-post-content-html}
*🧪 filter*

```php
add_filter( 'fw:ext:page-builder:generate-post-content-html', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/class-fw-extension-page-builder.php:240`</small>

### `fw:ext:page-builder:item-corrector:column-width` {#h-fw-ext-page-builder-item-corrector-column-width}
*🧪 filter*

```php
add_filter( 'fw:ext:page-builder:item-corrector:column-width', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/items-corrector/class-page-builder-items-corrector.php:198`</small>

### `fw:ext:page-builder:item-type:simple:enqueue_static` {#h-fw-ext-page-builder-item-type-simple-enqueue-static}
*🎬 action*

```php
add_action( 'fw:ext:page-builder:item-type:simple:enqueue_static', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/item-types/simple/class-page-builder-simple-item.php:113`</small>

### `fw:ext:page-builder:json-structure-correction` {#h-fw-ext-page-builder-json-structure-correction}
*🧪 filter*

```php
add_filter( 'fw:ext:page-builder:json-structure-correction', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:595`</small>

### `fw:ext:page-builder:json-structure-correction:complete` {#h-fw-ext-page-builder-json-structure-correction-complete}
*🧪 filter*

```php
add_filter( 'fw:ext:page-builder:json-structure-correction:complete', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:604`</small>

### `fw:ext:page-builder:json-structure-needs-correction` {#h-fw-ext-page-builder-json-structure-needs-correction}
*🧪 filter*

```php
add_filter( 'fw:ext:page-builder:json-structure-needs-correction', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:583`</small>

### `fw:ext:page-builder:modal-save-all` {#h-fw-ext-page-builder-modal-save-all}
*🧪 filter*

```php
add_filter( 'fw:ext:page-builder:modal-save-all', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:309`</small>

← Back to [Hooks overview](./index.md)
