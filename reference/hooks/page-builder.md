---
title: Page Builder — hooks
sidebar_label: Page Builder
slug: /hooks/page-builder
description: Actions and filters exposed by the UnysonPlus Page Builder subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Page Builder — hooks

**18 hooks** — 1 actions · 17 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_page_builder_content_wrapper_class`](#h-fw-ext-page-builder-content-wrapper-class) | filter | Filters the CSS class of the wrapper div placed around page-builder content (default 'fw-page-builder-content'). |
| [`fw_ext_page_builder_output_content_wrapper`](#h-fw-ext-page-builder-output-content-wrapper) | filter | Filters whether to wrap page-builder content in a protective div (return false to skip wrapping). |
| [`fw_ext_page_builder_settings_options`](#h-fw-ext-page-builder-settings-options) | filter | Filters extra page-builder settings options merged into the settings form. |
| [`fw_ext_page_builder_settings_options_post_types_default_value`](#h-fw-ext-page-builder-settings-options-post-types-default-value) | filter | Filters the default post types the page builder is activated for (default page). |
| [`fw_ext_page_builder_supported_post_types`](#h-fw-ext-page-builder-supported-post-types) | filter | Filters the list of editor-supporting post types the page builder can be enabled for. |
| [`fw_ext_page_builder_templates`](#h-fw-ext-page-builder-templates) | filter | Filters the list of PHP page templates the page builder recognizes as builder templates. |
| [`fw_ext_page-builder_items_correction_complete`](#h-fw-ext-page-builder-items-correction-complete) | filter | Filters the page-builder items after structural correction, passing the corrector and the original items. |
| [`fw_page_builder_set_as_default`](#h-fw-page-builder-set-as-default) | filter | Filters whether the page builder starts active by default when a value has no stored builder_active flag. |
| [`fw_page_builder_thumbs_before_display`](#h-fw-page-builder-thumbs-before-display) | filter | Filters the collection of page-builder item thumbnails before they are rendered in the builder. |
| [`fw_section_like_types`](#h-fw-section-like-types) | filter | Filters the list of page-builder item types treated as section-like, letting extensions register additional section container types. |
| [`fw:ext:page-builder:builder-data:before-shortcode-generate`](#h-fw-ext-page-builder-builder-data-before-shortcode-generate) | filter | Filters the stored builder data before it is converted to shortcodes for output. |
| [`fw:ext:page-builder:generate-post-content-html`](#h-fw-ext-page-builder-generate-post-content-html) | filter | Filters whether to regenerate the post's HTML content from the builder JSON (for revisions, SEO, and search). |
| [`fw:ext:page-builder:item-corrector:column-width`](#h-fw-ext-page-builder-item-corrector-column-width) | filter | Filters a column's width as the items corrector packs it into a row, given the column item. |
| [`fw:ext:page-builder:item-type:simple:enqueue_static`](#h-fw-ext-page-builder-item-type-simple-enqueue-static) | action | Fires when the simple builder item type enqueues its static assets, so extensions can enqueue alongside it. |
| [`fw:ext:page-builder:json-structure-correction`](#h-fw-ext-page-builder-json-structure-correction) | filter | Filters the corrected builder items structure right after the grid corrector runs. |
| [`fw:ext:page-builder:json-structure-correction:complete`](#h-fw-ext-page-builder-json-structure-correction-complete) | filter | Filters the corrected builder items structure as a final pass after all correction is done. |
| [`fw:ext:page-builder:json-structure-needs-correction`](#h-fw-ext-page-builder-json-structure-needs-correction) | filter | Filters whether the builder JSON needs grid auto-correction before being converted to shortcodes. |
| [`fw:ext:page-builder:modal-save-all`](#h-fw-ext-page-builder-modal-save-all) | filter | Filters whether the builder's modal save-all script is enqueued (defaults on for version 2.6.14 and later). |

---

### `fw_ext_page_builder_content_wrapper_class` {#h-fw-ext-page-builder-content-wrapper-class}
*🧪 filter*

Filters the CSS class of the wrapper div placed around page-builder content (default 'fw-page-builder-content').

```php
add_filter( 'fw_ext_page_builder_content_wrapper_class', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/class-fw-extension-page-builder.php:307`</small>

### `fw_ext_page_builder_output_content_wrapper` {#h-fw-ext-page-builder-output-content-wrapper}
*🧪 filter*

Filters whether to wrap page-builder content in a protective div (return false to skip wrapping).

```php
add_filter( 'fw_ext_page_builder_output_content_wrapper', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/class-fw-extension-page-builder.php:300`</small>

### `fw_ext_page_builder_settings_options` {#h-fw-ext-page-builder-settings-options}
*🧪 filter*

Filters extra page-builder settings options merged into the settings form.

```php
add_filter( 'fw_ext_page_builder_settings_options', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/settings-options.php:36`</small>

### `fw_ext_page_builder_settings_options_post_types_default_value` {#h-fw-ext-page-builder-settings-options-post-types-default-value}
*🧪 filter*

Filters the default post types the page builder is activated for (default page).

```php
add_filter( 'fw_ext_page_builder_settings_options_post_types_default_value', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/settings-options.php:15`</small>

### `fw_ext_page_builder_supported_post_types` {#h-fw-ext-page-builder-supported-post-types}
*🧪 filter*

Filters the list of editor-supporting post types the page builder can be enabled for.

```php
add_filter( 'fw_ext_page_builder_supported_post_types', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/helpers.php:32`</small>

### `fw_ext_page_builder_templates` {#h-fw-ext-page-builder-templates}
*🧪 filter*

Filters the list of PHP page templates the page builder recognizes as builder templates.

```php
add_filter( 'fw_ext_page_builder_templates', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:139`</small>

### `fw_ext_page-builder_items_correction_complete` {#h-fw-ext-page-builder-items-correction-complete}
*🧪 filter*

Filters the page-builder items after structural correction, passing the corrector and the original items.

```php
add_filter( 'fw_ext_page-builder_items_correction_complete', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/items-corrector/class-page-builder-items-corrector.php:94`</small>

### `fw_page_builder_set_as_default` {#h-fw-page-builder-set-as-default}
*🧪 filter*

Filters whether the page builder starts active by default when a value has no stored builder_active flag.

```php
add_filter( 'fw_page_builder_set_as_default', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:340`</small>

### `fw_page_builder_thumbs_before_display` {#h-fw-page-builder-thumbs-before-display}
*🧪 filter*

Filters the collection of page-builder item thumbnails before they are rendered in the builder.

```php
add_filter( 'fw_page_builder_thumbs_before_display', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/item-types/class-page-builder-item.php:86`</small>

### `fw_section_like_types` {#h-fw-section-like-types}
*🧪 filter · 4 call sites*

Filters the list of page-builder item types treated as section-like, letting extensions register additional section container types.

```php
add_filter( 'fw_section_like_types', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/item-types/class-fw-section-like-registry.php:33`</small>

### `fw:ext:page-builder:builder-data:before-shortcode-generate` {#h-fw-ext-page-builder-builder-data-before-shortcode-generate}
*🧪 filter*

Filters the stored builder data before it is converted to shortcodes for output.

```php
add_filter( 'fw:ext:page-builder:builder-data:before-shortcode-generate', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/class-fw-extension-page-builder.php:404`</small>

### `fw:ext:page-builder:generate-post-content-html` {#h-fw-ext-page-builder-generate-post-content-html}
*🧪 filter*

Filters whether to regenerate the post's HTML content from the builder JSON (for revisions, SEO, and search).

```php
add_filter( 'fw:ext:page-builder:generate-post-content-html', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/class-fw-extension-page-builder.php:242`</small>

### `fw:ext:page-builder:item-corrector:column-width` {#h-fw-ext-page-builder-item-corrector-column-width}
*🧪 filter*

Filters a column's width as the items corrector packs it into a row, given the column item.

```php
add_filter( 'fw:ext:page-builder:item-corrector:column-width', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/items-corrector/class-page-builder-items-corrector.php:200`</small>

### `fw:ext:page-builder:item-type:simple:enqueue_static` {#h-fw-ext-page-builder-item-type-simple-enqueue-static}
*🎬 action*

Fires when the simple builder item type enqueues its static assets, so extensions can enqueue alongside it.

```php
add_action( 'fw:ext:page-builder:item-type:simple:enqueue_static', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/item-types/simple/class-page-builder-simple-item.php:114`</small>

### `fw:ext:page-builder:json-structure-correction` {#h-fw-ext-page-builder-json-structure-correction}
*🧪 filter*

Filters the corrected builder items structure right after the grid corrector runs.

```php
add_filter( 'fw:ext:page-builder:json-structure-correction', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:602`</small>

### `fw:ext:page-builder:json-structure-correction:complete` {#h-fw-ext-page-builder-json-structure-correction-complete}
*🧪 filter*

Filters the corrected builder items structure as a final pass after all correction is done.

```php
add_filter( 'fw:ext:page-builder:json-structure-correction:complete', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:613`</small>

### `fw:ext:page-builder:json-structure-needs-correction` {#h-fw-ext-page-builder-json-structure-needs-correction}
*🧪 filter*

Filters whether the builder JSON needs grid auto-correction before being converted to shortcodes.

```php
add_filter( 'fw:ext:page-builder:json-structure-needs-correction', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:588`</small>

### `fw:ext:page-builder:modal-save-all` {#h-fw-ext-page-builder-modal-save-all}
*🧪 filter*

Filters whether the builder's modal save-all script is enqueued (defaults on for version 2.6.14 and later).

```php
add_filter( 'fw:ext:page-builder:modal-save-all', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php:311`</small>

← Back to [Hooks overview](./index.md)
