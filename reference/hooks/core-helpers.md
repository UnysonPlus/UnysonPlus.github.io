---
title: Core Helpers — hooks
sidebar_label: Core Helpers
slug: /hooks/core-helpers
description: Actions and filters exposed by the UnysonPlus Core Helpers subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Core Helpers — hooks

**25 hooks** — 12 actions · 13 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_customizer_options_update`](#h-fw-customizer-options-update) | action | Fires after a customizer option value is saved, passing details of the changed option. |
| [`fw_form_display_errors_frontend`](#h-fw-form-display-errors-frontend) | action | Use this action to customize errors display in your theme |
| [`fw_form_display:after`](#h-fw-form-display-after) | action | Fires just before the closing form tag when an FW_Form renders, passing the form instance so listeners can inject markup inside the form. |
| [`fw_form_display:after_form`](#h-fw-form-display-after-form) | action | Fires after the closing form tag when an FW_Form renders, passing the form instance. |
| [`fw_form_display:before`](#h-fw-form-display-before) | action | Fires just after the opening form tag when an FW_Form renders, passing the form instance so listeners can inject markup inside the form. |
| [`fw_form_display:before_form`](#h-fw-form-display-before-form) | action | Fires before the opening form tag when an FW_Form renders, passing the form instance. |
| [`fw_framework_customizations_dir_rel_path`](#h-fw-framework-customizations-dir-rel-path) | filter | Filters the relative path to the framework-customizations directory (default /framework-customizations) before it is cached. |
| [`fw_framework_directory`](#h-fw-framework-directory) | filter | Filters the absolute path to the framework directory before it is cached. |
| [`fw_framework_directory_uri`](#h-fw-framework-directory-uri) | filter | Filters the resolved URI of the framework directory before it is cached, letting a host override where framework assets load from. |
| [`fw_get_db_post_option:fw-storage-enabled`](#h-fw-get-db-post-option-fw-storage-enabled) | filter | Filters whether post-option DB storage/altering is enabled for a given post type, used to avoid recursive option-lookup loops. |
| [`fw_google_fonts`](#h-fw-google-fonts) | filter | Filters the assembled Google Fonts list (family, variants, position) before it is cached and returned. |
| [`fw_googleapis_webfonts_url`](#h-fw-googleapis-webfonts-url) | filter | Filters the remote URL fetched for the Google web-fonts catalog when the local cache is stale. |
| [`fw_option_value_error`](#h-fw-option-value-error) | filter | Filters the validation error for a single option value during save; return a non-empty string to mark the field invalid. |
| [`fw_post_options_update`](#h-fw-post-options-update) | action | Fires after a post's options are saved, passing the post id and option id so listeners can react to the update. |
| [`fw_settings_form_render`](#h-fw-settings-form-render) | action | Fires while rendering a Theme Settings form, passing ajax-submit and side-tabs flags so listeners can hook the form markup. |
| [`fw_settings_form_reset`](#h-fw-settings-form-reset) | action | Fires after a Theme Settings form is reset, passing the old and new values so listeners can react to the reset. |
| [`fw_settings_form_reset:values`](#h-fw-settings-form-reset-values) | filter | Filters the values retained when Theme Settings are reset, letting code persist selected options (e.g. API credentials) through a reset. |
| [`fw_settings_form_texts`](#h-fw-settings-form-texts) | filter | Filters the Theme Settings form button labels (Save Changes, Reset Options) so they can be customized. |
| [`fw_settings_options_update`](#h-fw-settings-options-update) | action | Fires after a settings option value is set, passing the option id and change details so listeners can react to setting updates. |
| [`fw_term_options_update`](#h-fw-term-options-update) | action | Fires after a term option value is set, passing term id, taxonomy, and option id so listeners can react to the change. |
| [`fw_use_sessions`](#h-fw-use-sessions) | filter | Filters whether PHP sessions may be started (default true), letting a site disable session_start() usage. |
| [`fw:form:nonce-name-data`](#h-fw-form-nonce-name-data) | filter | Filters extra data appended to a FW_Form nonce name so sub-forms sharing one instance stay distinct. |
| [`fw:get_options_values_from_input:before`](#h-fw-get-options-values-from-input-before) | filter | Filters an early override for option values extracted from input; returning a non-null value short-circuits the default extraction. |
| [`fw:option-storage-types:register`](#h-fw-option-storage-types-register) | action | Fires to let code register additional option storage types on the storage-type register. |
| [`fw:options-default-values:skip-types`](#h-fw-options-default-values-skip-types) | filter | Filters the map of option types to skip when filling missing DB values with defaults. |

---

### `fw_customizer_options_update` {#h-fw-customizer-options-update}
*🎬 action*

Fires after a customizer option value is saved, passing details of the changed option.

```php
add_action( 'fw_customizer_options_update', $callback );
```
<small>Fired in: `framework/helpers/database.php:563`</small>

### `fw_form_display_errors_frontend` {#h-fw-form-display-errors-frontend}
*🎬 action*

Use this action to customize errors display in your theme

```php
add_action( 'fw_form_display_errors_frontend', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:229`</small>

### `fw_form_display:after` {#h-fw-form-display-after}
*🎬 action*

Fires just before the closing form tag when an FW_Form renders, passing the form instance so listeners can inject markup inside the form.

```php
add_action( 'fw_form_display:after', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:352`</small>

### `fw_form_display:after_form` {#h-fw-form-display-after-form}
*🎬 action*

Fires after the closing form tag when an FW_Form renders, passing the form instance.

```php
add_action( 'fw_form_display:after_form', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:357`</small>

### `fw_form_display:before` {#h-fw-form-display-before}
*🎬 action*

Fires just after the opening form tag when an FW_Form renders, passing the form instance so listeners can inject markup inside the form.

```php
add_action( 'fw_form_display:before', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:308`</small>

### `fw_form_display:before_form` {#h-fw-form-display-before-form}
*🎬 action*

Fires before the opening form tag when an FW_Form renders, passing the form instance.

```php
add_action( 'fw_form_display:before_form', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:302`</small>

### `fw_framework_customizations_dir_rel_path` {#h-fw-framework-customizations-dir-rel-path}
*🧪 filter*

Filters the relative path to the framework-customizations directory (default /framework-customizations) before it is cached.

```php
add_filter( 'fw_framework_customizations_dir_rel_path', $callback );
```
<small>Fired in: `framework/helpers/general.php:42`</small>

### `fw_framework_directory` {#h-fw-framework-directory}
*🧪 filter*

Filters the absolute path to the framework directory before it is cached.

```php
add_filter( 'fw_framework_directory', $callback );
```
<small>Fired in: `framework/helpers/general.php:143`</small>

### `fw_framework_directory_uri` {#h-fw-framework-directory-uri}
*🧪 filter*

Filters the resolved URI of the framework directory before it is cached, letting a host override where framework assets load from.

```php
add_filter( 'fw_framework_directory_uri', $callback );
```
<small>Fired in: `framework/helpers/general.php:167`</small>

### `fw_get_db_post_option:fw-storage-enabled` {#h-fw-get-db-post-option-fw-storage-enabled}
*🧪 filter*

Filters whether post-option DB storage/altering is enabled for a given post type, used to avoid recursive option-lookup loops.

```php
add_filter( 'fw_get_db_post_option:fw-storage-enabled', $callback );
```
<small>Fired in: `framework/helpers/database.php:151`</small>

### `fw_google_fonts` {#h-fw-google-fonts}
*🧪 filter*

Filters the assembled Google Fonts list (family, variants, position) before it is cached and returned.

```php
add_filter( 'fw_google_fonts', $callback );
```
<small>Fired in: `framework/helpers/general.php:1535`</small>

### `fw_googleapis_webfonts_url` {#h-fw-googleapis-webfonts-url}
*🧪 filter*

Filters the remote URL fetched for the Google web-fonts catalog when the local cache is stale.

```php
add_filter( 'fw_googleapis_webfonts_url', $callback );
```
<small>Fired in: `framework/helpers/general.php:1573`</small>

### `fw_option_value_error` {#h-fw-option-value-error}
*🧪 filter*

Filters the validation error for a single option value during save; return a non-empty string to mark the field invalid.

```php
add_filter( 'fw_option_value_error', $callback );
```
<small>Fired in: `framework/helpers/general.php:1368`</small>

### `fw_post_options_update` {#h-fw-post-options-update}
*🎬 action*

Fires after a post's options are saved, passing the post id and option id so listeners can react to the update.

```php
add_action( 'fw_post_options_update', $callback );
```
<small>Fired in: `framework/helpers/database.php:200`</small>

### `fw_settings_form_render` {#h-fw-settings-form-render}
*🎬 action*

Fires while rendering a Theme Settings form, passing ajax-submit and side-tabs flags so listeners can hook the form markup.

```php
add_action( 'fw_settings_form_render', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:219`</small>

### `fw_settings_form_reset` {#h-fw-settings-form-reset}
*🎬 action · 2 call sites*

Fires after a Theme Settings form is reset, passing the old and new values so listeners can react to the reset.

```php
add_action( 'fw_settings_form_reset', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:355`</small>

### `fw_settings_form_reset:values` {#h-fw-settings-form-reset-values}
*🧪 filter*

Filters the values retained when Theme Settings are reset, letting code persist selected options (e.g. API credentials) through a reset.

```php
add_filter( 'fw_settings_form_reset:values', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:375`</small>

### `fw_settings_form_texts` {#h-fw-settings-form-texts}
*🧪 filter*

Filters the Theme Settings form button labels (Save Changes, Reset Options) so they can be customized.

```php
add_filter( 'fw_settings_form_texts', $callback );
```
<small>Fired in: `framework/helpers/class-fw-settings-form.php:226`</small>

### `fw_settings_options_update` {#h-fw-settings-options-update}
*🎬 action*

Fires after a settings option value is set, passing the option id and change details so listeners can react to setting updates.

```php
add_action( 'fw_settings_options_update', $callback );
```
<small>Fired in: `framework/helpers/database.php:37`</small>

### `fw_term_options_update` {#h-fw-term-options-update}
*🎬 action*

Fires after a term option value is set, passing term id, taxonomy, and option id so listeners can react to the change.

```php
add_action( 'fw_term_options_update', $callback );
```
<small>Fired in: `framework/helpers/database.php:398`</small>

### `fw_use_sessions` {#h-fw-use-sessions}
*🧪 filter · 4 call sites*

Filters whether PHP sessions may be started (default true), letting a site disable session_start() usage.

```php
add_filter( 'fw_use_sessions', $callback );
```
<small>Fired in: `framework/helpers/class-fw-session.php:15`</small>

### `fw:form:nonce-name-data` {#h-fw-form-nonce-name-data}
*🧪 filter*

Filters extra data appended to a FW_Form nonce name so sub-forms sharing one instance stay distinct.

```php
add_filter( 'fw:form:nonce-name-data', $callback );
```
<small>Fired in: `framework/helpers/class-fw-form.php:560`</small>

### `fw:get_options_values_from_input:before` {#h-fw-get-options-values-from-input-before}
*🧪 filter*

Filters an early override for option values extracted from input; returning a non-null value short-circuits the default extraction.

```php
add_filter( 'fw:get_options_values_from_input:before', $callback );
```
<small>Fired in: `framework/helpers/general.php:1295`</small>

### `fw:option-storage-types:register` {#h-fw-option-storage-types-register}
*🎬 action*

Fires to let code register additional option storage types on the storage-type register.

```php
add_action( 'fw:option-storage-types:register', $callback );
```
<small>Fired in: `framework/helpers/fw-storage.php:115`</small>

### `fw:options-default-values:skip-types` {#h-fw-options-default-values-skip-types}
*🧪 filter*

Filters the map of option types to skip when filling missing DB values with defaults.

```php
add_filter( 'fw:options-default-values:skip-types', $callback );
```
<small>Fired in: `framework/helpers/class-fw-db-options-model.php:204`</small>

← Back to [Hooks overview](./index.md)
