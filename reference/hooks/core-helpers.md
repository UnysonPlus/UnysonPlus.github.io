---
title: Core Helpers — hooks
sidebar_label: Core Helpers
slug: /hooks/core-helpers
description: Actions and filters exposed by the UnysonPlus Core Helpers subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Core Helpers — hooks

**27 hooks** — 13 actions · 14 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_customizer_options_update`](#h-fw-customizer-options-update) | action | — |
| [`fw_form_display_errors_frontend`](#h-fw-form-display-errors-frontend) | action | Use this action to customize errors display in your theme |
| [`fw_form_display:after`](#h-fw-form-display-after) | action | — |
| [`fw_form_display:after_form`](#h-fw-form-display-after-form) | action | — |
| [`fw_form_display:before`](#h-fw-form-display-before) | action | — |
| [`fw_form_display:before_form`](#h-fw-form-display-before-form) | action | — |
| [`fw_framework_customizations_dir_rel_path`](#h-fw-framework-customizations-dir-rel-path) | filter | — |
| [`fw_framework_directory`](#h-fw-framework-directory) | filter | — |
| [`fw_framework_directory_uri`](#h-fw-framework-directory-uri) | filter | — |
| [`fw_get_db_post_option:fw-storage-enabled`](#h-fw-get-db-post-option-fw-storage-enabled) | filter | — |
| [`fw_google_fonts`](#h-fw-google-fonts) | filter | — |
| [`fw_googleapis_webfonts_url`](#h-fw-googleapis-webfonts-url) | filter | — |
| [`fw_option_value_error`](#h-fw-option-value-error) | filter | — |
| [`fw_post_options_update`](#h-fw-post-options-update) | action | — |
| [`fw_settings_form_render`](#h-fw-settings-form-render) | action | — |
| [`fw_settings_form_reset`](#h-fw-settings-form-reset) | action | — |
| [`fw_settings_form_reset:values`](#h-fw-settings-form-reset-values) | filter | — |
| [`fw_settings_form_texts`](#h-fw-settings-form-texts) | filter | — |
| [`fw_settings_options_update`](#h-fw-settings-options-update) | action | — |
| [`fw_term_options_update`](#h-fw-term-options-update) | action | — |
| [`fw_use_sessions`](#h-fw-use-sessions) | filter | — |
| [`fw:form:nonce-name-data`](#h-fw-form-nonce-name-data) | filter | — |
| [`fw:get_options_values_from_input:before`](#h-fw-get-options-values-from-input-before) | filter | — |
| [`fw:option-storage-types:register`](#h-fw-option-storage-types-register) | action | — |
| [`fw:options-default-values:skip-types`](#h-fw-options-default-values-skip-types) | filter | — |
| [`fw:settings-form:`](#h-fw-settings-form) | action | — |
| [`fw:settings-form:`](#h-fw-settings-form) | filter | — |

---

### `fw_customizer_options_update` {#h-fw-customizer-options-update}
*🎬 action*

```php
add_action( 'fw_customizer_options_update', $callback );
```
<small>Fired in: `framework/helpers/database.php:554`</small>

### `fw_form_display_errors_frontend` {#h-fw-form-display-errors-frontend}
*🎬 action*

Use this action to customize errors display in your theme

```php
add_action( 'fw_form_display_errors_frontend', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:229`</small>

### `fw_form_display:after` {#h-fw-form-display-after}
*🎬 action*

```php
add_action( 'fw_form_display:after', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:349`</small>

### `fw_form_display:after_form` {#h-fw-form-display-after-form}
*🎬 action*

```php
add_action( 'fw_form_display:after_form', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:353`</small>

### `fw_form_display:before` {#h-fw-form-display-before}
*🎬 action*

```php
add_action( 'fw_form_display:before', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:306`</small>

### `fw_form_display:before_form` {#h-fw-form-display-before-form}
*🎬 action*

```php
add_action( 'fw_form_display:before_form', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:301`</small>

### `fw_framework_customizations_dir_rel_path` {#h-fw-framework-customizations-dir-rel-path}
*🧪 filter*

```php
add_filter( 'fw_framework_customizations_dir_rel_path', $callback );
```
<small>Fired in: `framework/helpers/general.php:41`</small>

### `fw_framework_directory` {#h-fw-framework-directory}
*🧪 filter*

```php
add_filter( 'fw_framework_directory', $callback );
```
<small>Fired in: `framework/helpers/general.php:141`</small>

### `fw_framework_directory_uri` {#h-fw-framework-directory-uri}
*🧪 filter*

```php
add_filter( 'fw_framework_directory_uri', $callback );
```
<small>Fired in: `framework/helpers/general.php:164`</small>

### `fw_get_db_post_option:fw-storage-enabled` {#h-fw-get-db-post-option-fw-storage-enabled}
*🧪 filter*

```php
add_filter( 'fw_get_db_post_option:fw-storage-enabled', $callback );
```
<small>Fired in: `framework/helpers/database.php:148`</small>

### `fw_google_fonts` {#h-fw-google-fonts}
*🧪 filter*

```php
add_filter( 'fw_google_fonts', $callback );
```
<small>Fired in: `framework/helpers/general.php:1528`</small>

### `fw_googleapis_webfonts_url` {#h-fw-googleapis-webfonts-url}
*🧪 filter*

```php
add_filter( 'fw_googleapis_webfonts_url', $callback );
```
<small>Fired in: `framework/helpers/general.php:1565`</small>

### `fw_option_value_error` {#h-fw-option-value-error}
*🧪 filter*

```php
add_filter( 'fw_option_value_error', $callback );
```
<small>Fired in: `framework/helpers/general.php:1362`</small>

### `fw_post_options_update` {#h-fw-post-options-update}
*🎬 action*

```php
add_action( 'fw_post_options_update', $callback );
```
<small>Fired in: `framework/helpers/database.php:195`</small>

### `fw_settings_form_render` {#h-fw-settings-form-render}
*🎬 action*

```php
add_action( 'fw_settings_form_render', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:218`</small>

### `fw_settings_form_reset` {#h-fw-settings-form-reset}
*🎬 action · 2 call sites*

```php
add_action( 'fw_settings_form_reset', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:352`</small>

### `fw_settings_form_reset:values` {#h-fw-settings-form-reset-values}
*🧪 filter*

```php
add_filter( 'fw_settings_form_reset:values', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:371`</small>

### `fw_settings_form_texts` {#h-fw-settings-form-texts}
*🧪 filter*

```php
add_filter( 'fw_settings_form_texts', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:224`</small>

### `fw_settings_options_update` {#h-fw-settings-options-update}
*🎬 action*

```php
add_action( 'fw_settings_options_update', $callback );
```
<small>Fired in: `framework/helpers/database.php:35`</small>

### `fw_term_options_update` {#h-fw-term-options-update}
*🎬 action*

```php
add_action( 'fw_term_options_update', $callback );
```
<small>Fired in: `framework/helpers/database.php:391`</small>

### `fw_use_sessions` {#h-fw-use-sessions}
*🧪 filter · 4 call sites*

```php
add_filter( 'fw_use_sessions', $callback );
```
<small>Fired in: `framework/helpers/class-fw-session.php:14`</small>

### `fw:form:nonce-name-data` {#h-fw-form-nonce-name-data}
*🧪 filter*

```php
add_filter( 'fw:form:nonce-name-data', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:555`</small>

### `fw:get_options_values_from_input:before` {#h-fw-get-options-values-from-input-before}
*🧪 filter*

```php
add_filter( 'fw:get_options_values_from_input:before', $callback );
```
<small>Fired in: `framework/helpers/general.php:1291`</small>

### `fw:option-storage-types:register` {#h-fw-option-storage-types-register}
*🎬 action*

```php
add_action( 'fw:option-storage-types:register', $callback );
```
<small>Fired in: `framework/helpers/fw-storage.php:114`</small>

### `fw:options-default-values:skip-types` {#h-fw-options-default-values-skip-types}
*🧪 filter*

```php
add_filter( 'fw:options-default-values:skip-types', $callback );
```
<small>Fired in: `framework/helpers/class-fw-db-options-model.php:203`</small>

### `fw:settings-form:` {#h-fw-settings-form}
*🎬 action · 3 call sites*

```php
add_action( 'fw:settings-form:', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:354`</small>

### `fw:settings-form:` {#h-fw-settings-form}
*🧪 filter*

```php
add_filter( 'fw:settings-form:', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:372`</small>

← Back to [Hooks overview](./index.md)
