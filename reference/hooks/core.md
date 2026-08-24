---
title: Core — hooks
sidebar_label: Core
slug: /hooks/core
description: Actions and filters exposed by the UnysonPlus Core subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Core — hooks

**54 hooks** — 25 actions · 29 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_admin_enqueue_scripts:customizer`](#h-fw-admin-enqueue-scripts-customizer) | action | Fires after customizer backend option scripts are enqueued. |
| [`fw_admin_enqueue_scripts:post`](#h-fw-admin-enqueue-scripts-post) | action | Fires after a post-edit screen's option static assets are enqueued, passing the current post. |
| [`fw_admin_enqueue_scripts:settings`](#h-fw-admin-enqueue-scripts-settings) | action | Fires after the settings page's option static assets are enqueued. |
| [`fw_admin_enqueue_scripts:term`](#h-fw-admin-enqueue-scripts-term) | action | Fires after a term/taxonomy screen's option static assets are enqueued, passing the taxonomy. |
| [`fw_after_plugin_activate:before_potential_redirect`](#h-fw-after-plugin-activate-before-potential-redirect) | action | Fires after plugin activation activates theme-supported extensions, before any redirect to the extensions install page. |
| [`fw_after_supported_extensions_install_success`](#h-fw-after-supported-extensions-install-success) | action | Fixes https://github.com/ThemeFuse/Unyson/issues/2330 |
| [`fw_after_switch_theme_activate_exts`](#h-fw-after-switch-theme-activate-exts) | filter | Filters whether theme extensions are auto-activated on theme switch; returning false skips activation. |
| [`fw_backend_add_custom_extensions_menu`](#h-fw-backend-add-custom-extensions-menu) | action | Use this action if you what to add the extensions page in a custom place in menu Usage example http://pastebin.com/2iWVRPAU |
| [`fw_backend_add_custom_settings_menu`](#h-fw-backend-add-custom-settings-menu) | action | Use this action if you what to add the settings page in a custom place in menu Usage example http://pastebin.com/gvAjGRm1 |
| [`fw_backend_enable_custom_extensions_menu`](#h-fw-backend-enable-custom-extensions-menu) | filter | Filters whether the custom Extensions admin menu item is registered; returning false suppresses it. |
| [`fw_backend_options_ajax_capability`](#h-fw-backend-options-ajax-capability) | filter | Filters the capability required to use the backend option-render/value-processing AJAX endpoints (default edit_posts). |
| [`fw_backend_options_render:taxonomy:after`](#h-fw-backend-options-render-taxonomy-after) | action | Fires after taxonomy term options are rendered on the term-edit screen. |
| [`fw_backend_options_render:taxonomy:before`](#h-fw-backend-options-render-taxonomy-before) | action | Fires before taxonomy term options are rendered on the term-edit screen. |
| [`fw_backend_undefined_option_type_warn_user`](#h-fw-backend-undefined-option-type-warn-user) | filter | Filters whether an admin flash warning is shown for an undefined option type; passes the type. |
| [`fw_container_types_init`](#h-fw-container-types-init) | action | Fires once on first container-type access to let code register custom container types. |
| [`fw_customizer_option_change_timeout`](#h-fw-customizer-option-change-timeout) | filter | Filters the debounce timeout (ms) before a customizer option change is applied (default 333). |
| [`fw_customizer_options`](#h-fw-customizer-options) | filter | Filters the framework's customizer options array before it is cached. |
| [`fw_ext_manager_settings_url`](#h-fw-ext-manager-settings-url) | filter | Filters an extension card's custom Settings link URL; return a URL to show it or '' to hide it. |
| [`fw_ext_mngr_github_branch`](#h-fw-ext-mngr-github-branch) | filter | Resolve the branch to download. Defaults to the repository's GitHub default branch; override via the filter if needed. |
| [`fw_extensions_activation_failed`](#h-fw-extensions-activation-failed) | action | Fires when extensions fail to activate after a deferred activation attempt, passing the map of failed extension names. |
| [`fw_extensions_after_activation`](#h-fw-extensions-after-activation) | action | Fires after extensions are successfully activated via the deferred activation flow, passing the map of activated extension names. |
| [`fw_extensions_after_deactivation`](#h-fw-extensions-after-deactivation) | action | Fires after extensions are successfully deactivated via the deferred flow, passing the map of deactivated extension names. |
| [`fw_extensions_before_activation`](#h-fw-extensions-before-activation) | action | Fires just before extensions are activated, passing the array of extensions queued for activation. |
| [`fw_extensions_before_deactivation`](#h-fw-extensions-before-deactivation) | action | Fires just before extensions are deactivated, passing the array of extensions queued for deactivation. |
| [`fw_extensions_before_init`](#h-fw-extensions-before-init) | action | Extensions are about to activate. You can add subclasses to FW_Extension at this point. |
| [`fw_extensions_deactivation_failed`](#h-fw-extensions-deactivation-failed) | action | Fires when extensions fail to deactivate after a deferred attempt, passing the map of failed extension names. |
| [`fw_extensions_init`](#h-fw-extensions-init) | action | Extensions are activated Now $this-&gt;get_children() inside extensions is available |
| [`fw_extensions_install`](#h-fw-extensions-install) | action | Fires after the extensions install process completes, passing the per-extension result array (WP_Error entries on failure). |
| [`fw_extensions_locations`](#h-fw-extensions-locations) | filter | &#123; '/hello/world/extensions' =&gt; 'https://hello.com/world/extensions' &#125; |
| [`fw_extensions_locations_after`](#h-fw-extensions-locations-after) | filter | Filters the registered extension locations map after all locations are collected and before it is cached. |
| [`fw_extensions_page_show_other_extensions`](#h-fw-extensions-page-show-other-extensions) | filter | Filters whether the Extensions page shows the toggle for incompatible or other available extensions; defaults to true. |
| [`fw_extensions_uninstall`](#h-fw-extensions-uninstall) | action | Fires after the extensions uninstall process completes, passing the per-extension result array. |
| [`fw_framework_manifest_path`](#h-fw-framework-manifest-path) | filter | Filters the path to the theme's manifest.php file loaded when building the theme manifest. |
| [`fw_get_settings_page_slug`](#h-fw-get-settings-page-slug) | filter | Filters the admin slug used for the framework's Settings page (default 'fw-settings'). |
| [`fw_github_api_url`](#h-fw-github-api-url) | filter | Filters the GitHub API base URL used when the extensions manager resolves a repository's default branch (default https://api.github.com). |
| [`fw_js_l10n`](#h-fw-js-l10n) | filter | fixes https://github.com/ThemeFuse/Unyson/issues/2381 |
| [`fw_loader_image`](#h-fw-loader-image) | filter | Filters the URL of the loader/spinner image passed to framework JavaScript (default the framework logo SVG). |
| [`fw_notify_about_missing_extensions`](#h-fw-notify-about-missing-extensions) | filter | Filters whether the admin notice about missing required extensions is shown; default true. |
| [`fw_option_types_init`](#h-fw-option-types-init) | action | Fires once, the first time an option type is requested, so extensions can register their option types. |
| [`fw_post_options`](#h-fw-post-options) | filter | Filters the resolved options for a post type (after the type-specific filter) before they are cached. |
| [`fw_register_ext_download_sources`](#h-fw-register-ext-download-sources) | action | Fires so extensions can register additional download sources with the extensions manager's registrar. |
| [`fw_save_post_options`](#h-fw-save-post-options) | action | Use the 'fw_post_options_update' action |
| [`fw_save_term_options`](#h-fw-save-term-options) | action | Fires after a taxonomy term's options are saved, passing the term id and taxonomy name. |
| [`fw_settings_options`](#h-fw-settings-options) | filter | Filters the resolved Theme Settings options array (cached), letting plugins inject or modify settings options. |
| [`fw_taxonomy_options`](#h-fw-taxonomy-options) | filter | Filters the resolved term/taxonomy options array for a taxonomy (cached), letting code inject or modify term options. |
| [`fw_theme_available_extensions_file_path`](#h-fw-theme-available-extensions-file-path) | filter | Filters the theme-relative path of the available-extensions.php file the Extensions manager looks for, letting a theme relocate it. |
| [`fw_theme_config`](#h-fw-theme-config) | filter | Filters the resolved theme config array after config.php and child overrides are merged (cached once per request), for framework-level defaults. |
| [`fw_theme_settings_menu_register`](#h-fw-theme-settings-menu-register) | filter | Filters whether the Theme Settings admin menu should register, letting plugins force it on themes lacking a settings.php. |
| [`fw_tmp_dir`](#h-fw-tmp-dir) | filter | Filters the temporary directory path used by the Extensions manager (default wp-content/tmp), letting code relocate it. |
| [`fw:ajax_options_render:values`](#h-fw-ajax-options-render-values) | filter | Filters the option values used when rendering options over AJAX; returning non-null overrides the default extracted values. |
| [`fw:backend:enqueue-options-on-frontend`](#h-fw-backend-enqueue-options-on-frontend) | filter | Filters whether the options-UI static assets may register on the front end, for front-end editors like the Live Page Editor. |
| [`fw:backend:option-render:data`](#h-fw-backend-option-render-data) | filter | Filters the data array passed to an option's render view just before the option markup is generated. |
| [`fw:option-modal:default:reset-btn-disabled`](#h-fw-option-modal-default-reset-btn-disabled) | filter | Filters whether the options modal's default Reset button is disabled. |
| [`fw:render_options:option_value`](#h-fw-render-options-option-value) | filter | Filters an early override for an option's value during backend rendering; a non-null return replaces the computed value. |

---

### `fw_admin_enqueue_scripts:customizer` {#h-fw-admin-enqueue-scripts-customizer}
*🎬 action*

Fires after customizer backend option scripts are enqueued.

```php
add_action( 'fw_admin_enqueue_scripts:customizer', $callback );
```
<small>Fired in: `framework/core/components/backend.php:2048`</small>

### `fw_admin_enqueue_scripts:post` {#h-fw-admin-enqueue-scripts-post}
*🎬 action*

Fires after a post-edit screen's option static assets are enqueued, passing the current post.

```php
add_action( 'fw_admin_enqueue_scripts:post', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1235`</small>

### `fw_admin_enqueue_scripts:settings` {#h-fw-admin-enqueue-scripts-settings}
*🎬 action*

Fires after the settings page's option static assets are enqueued.

```php
add_action( 'fw_admin_enqueue_scripts:settings', $callback );
```
<small>Fired in: `framework/core/components/backend/class-fw-settings-form-theme.php:279`</small>

### `fw_admin_enqueue_scripts:term` {#h-fw-admin-enqueue-scripts-term}
*🎬 action*

Fires after a term/taxonomy screen's option static assets are enqueued, passing the taxonomy.

```php
add_action( 'fw_admin_enqueue_scripts:term', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1252`</small>

### `fw_after_plugin_activate:before_potential_redirect` {#h-fw-after-plugin-activate-before-potential-redirect}
*🎬 action*

Fires after plugin activation activates theme-supported extensions, before any redirect to the extensions install page.

```php
add_action( 'fw_after_plugin_activate:before_potential_redirect', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:502`</small>

### `fw_after_supported_extensions_install_success` {#h-fw-after-supported-extensions-install-success}
*🎬 action*

Fixes https://github.com/ThemeFuse/Unyson/issues/2330

```php
add_action( 'fw_after_supported_extensions_install_success', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:1562`</small>

### `fw_after_switch_theme_activate_exts` {#h-fw-after-switch-theme-activate-exts}
*🧪 filter*

Filters whether theme extensions are auto-activated on theme switch; returning false skips activation.

```php
add_filter( 'fw_after_switch_theme_activate_exts', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:3655`</small>

### `fw_backend_add_custom_extensions_menu` {#h-fw-backend-add-custom-extensions-menu}
*🎬 action*

Use this action if you what to add the extensions page in a custom place in menu Usage example http://pastebin.com/2iWVRPAU

```php
add_action( 'fw_backend_add_custom_extensions_menu', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:906`</small>

### `fw_backend_add_custom_settings_menu` {#h-fw-backend-add-custom-settings-menu}
*🎬 action*

Use this action if you what to add the settings page in a custom place in menu Usage example http://pastebin.com/gvAjGRm1

```php
add_action( 'fw_backend_add_custom_settings_menu', $callback );
```
<small>Fired in: `framework/core/components/backend/class-fw-settings-form-theme.php:199`</small>

### `fw_backend_enable_custom_extensions_menu` {#h-fw-backend-enable-custom-extensions-menu}
*🧪 filter*

Filters whether the custom Extensions admin menu item is registered; returning false suppresses it.

```php
add_filter( 'fw_backend_enable_custom_extensions_menu', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:898`</small>

### `fw_backend_options_ajax_capability` {#h-fw-backend-options-ajax-capability}
*🧪 filter · 4 call sites*

Filters the capability required to use the backend option-render/value-processing AJAX endpoints (default edit_posts).

```php
add_filter( 'fw_backend_options_ajax_capability', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1278`</small>

### `fw_backend_options_render:taxonomy:after` {#h-fw-backend-options-render-taxonomy-after}
*🎬 action · 2 call sites*

Fires after taxonomy term options are rendered on the term-edit screen.

```php
add_action( 'fw_backend_options_render:taxonomy:after', $callback );
```
<small>Fired in: `framework/core/components/backend.php:835`</small>

### `fw_backend_options_render:taxonomy:before` {#h-fw-backend-options-render-taxonomy-before}
*🎬 action · 2 call sites*

Fires before taxonomy term options are rendered on the term-edit screen.

```php
add_action( 'fw_backend_options_render:taxonomy:before', $callback );
```
<small>Fired in: `framework/core/components/backend.php:832`</small>

### `fw_backend_undefined_option_type_warn_user` {#h-fw-backend-undefined-option-type-warn-user}
*🧪 filter*

Filters whether an admin flash warning is shown for an undefined option type; passes the type.

```php
add_filter( 'fw_backend_undefined_option_type_warn_user', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1917`</small>

### `fw_container_types_init` {#h-fw-container-types-init}
*🎬 action*

Fires once on first container-type access to let code register custom container types.

```php
add_action( 'fw_container_types_init', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1964`</small>

### `fw_customizer_option_change_timeout` {#h-fw-customizer-option-change-timeout}
*🧪 filter*

Filters the debounce timeout (ms) before a customizer option change is applied (default 333).

```php
add_filter( 'fw_customizer_option_change_timeout', $callback );
```
<small>Fired in: `framework/core/components/backend.php:2043`</small>

### `fw_customizer_options` {#h-fw-customizer-options}
*🧪 filter*

Filters the framework's customizer options array before it is cached.

```php
add_filter( 'fw_customizer_options', $callback );
```
<small>Fired in: `framework/core/components/theme.php:112`</small>

### `fw_ext_manager_settings_url` {#h-fw-ext-manager-settings-url}
*🧪 filter*

Filters an extension card's custom Settings link URL; return a URL to show it or '' to hide it.

```php
add_filter( 'fw_ext_manager_settings_url', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/views/extension.php:59`</small>

### `fw_ext_mngr_github_branch` {#h-fw-ext-mngr-github-branch}
*🧪 filter*

Resolve the branch to download. Defaults to the repository's GitHub default branch; override via the filter if needed.

```php
add_filter( 'fw_ext_mngr_github_branch', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/includes/download-source/types/class-fw-download-source-github.php:59`</small>

### `fw_extensions_activation_failed` {#h-fw-extensions-activation-failed}
*🎬 action*

Fires when extensions fail to activate after a deferred activation attempt, passing the map of failed extension names.

```php
add_action( 'fw_extensions_activation_failed', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:752`</small>

### `fw_extensions_after_activation` {#h-fw-extensions-after-activation}
*🎬 action*

Fires after extensions are successfully activated via the deferred activation flow, passing the map of activated extension names.

```php
add_action( 'fw_extensions_after_activation', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:748`</small>

### `fw_extensions_after_deactivation` {#h-fw-extensions-after-deactivation}
*🎬 action*

Fires after extensions are successfully deactivated via the deferred flow, passing the map of deactivated extension names.

```php
add_action( 'fw_extensions_after_deactivation', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:772`</small>

### `fw_extensions_before_activation` {#h-fw-extensions-before-activation}
*🎬 action*

Fires just before extensions are activated, passing the array of extensions queued for activation.

```php
add_action( 'fw_extensions_before_activation', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:2608`</small>

### `fw_extensions_before_deactivation` {#h-fw-extensions-before-deactivation}
*🎬 action*

Fires just before extensions are deactivated, passing the array of extensions queued for deactivation.

```php
add_action( 'fw_extensions_before_deactivation', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:2855`</small>

### `fw_extensions_before_init` {#h-fw-extensions-before-init}
*🎬 action*

Extensions are about to activate. You can add subclasses to FW_Extension at this point.

```php
add_action( 'fw_extensions_before_init', $callback );
```
<small>Fired in: `framework/core/components/extensions.php:582`</small>

### `fw_extensions_deactivation_failed` {#h-fw-extensions-deactivation-failed}
*🎬 action*

Fires when extensions fail to deactivate after a deferred attempt, passing the map of failed extension names.

```php
add_action( 'fw_extensions_deactivation_failed', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:776`</small>

### `fw_extensions_init` {#h-fw-extensions-init}
*🎬 action*

Extensions are activated Now $this-&gt;get_children() inside extensions is available

```php
add_action( 'fw_extensions_init', $callback );
```
<small>Fired in: `framework/core/components/extensions.php:599`</small>

### `fw_extensions_install` {#h-fw-extensions-install}
*🎬 action*

Fires after the extensions install process completes, passing the per-extension result array (WP_Error entries on failure).

```php
add_action( 'fw_extensions_install', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:1939`</small>

### `fw_extensions_locations` {#h-fw-extensions-locations}
*🧪 filter*

&#123; '/hello/world/extensions' =&gt; 'https://hello.com/world/extensions' &#125;

```php
add_filter( 'fw_extensions_locations', $callback );
```
<small>Fired in: `framework/core/components/extensions.php:309`</small>

### `fw_extensions_locations_after` {#h-fw-extensions-locations-after}
*🧪 filter*

Filters the registered extension locations map after all locations are collected and before it is cached.

```php
add_filter( 'fw_extensions_locations_after', $callback );
```
<small>Fired in: `framework/core/components/extensions.php:381`</small>

### `fw_extensions_page_show_other_extensions` {#h-fw-extensions-page-show-other-extensions}
*🧪 filter*

Filters whether the Extensions page shows the toggle for incompatible or other available extensions; defaults to true.

```php
add_filter( 'fw_extensions_page_show_other_extensions', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/views/extensions-page.php:229`</small>

### `fw_extensions_uninstall` {#h-fw-extensions-uninstall}
*🎬 action*

Fires after the extensions uninstall process completes, passing the per-extension result array.

```php
add_action( 'fw_extensions_uninstall', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:2224`</small>

### `fw_framework_manifest_path` {#h-fw-framework-manifest-path}
*🧪 filter*

Filters the path to the theme's manifest.php file loaded when building the theme manifest.

```php
add_filter( 'fw_framework_manifest_path', $callback );
```
<small>Fired in: `framework/core/components/theme.php:21`</small>

### `fw_get_settings_page_slug` {#h-fw-get-settings-page-slug}
*🧪 filter*

Filters the admin slug used for the framework's Settings page (default 'fw-settings').

```php
add_filter( 'fw_get_settings_page_slug', $callback );
```
<small>Fired in: `framework/core/components/backend.php:72`</small>

### `fw_github_api_url` {#h-fw-github-api-url}
*🧪 filter*

Filters the GitHub API base URL used when the extensions manager resolves a repository's default branch (default https://api.github.com).

```php
add_filter( 'fw_github_api_url', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/includes/download-source/types/class-fw-download-source-github.php:64`</small>

### `fw_js_l10n` {#h-fw-js-l10n}
*🧪 filter*

fixes https://github.com/ThemeFuse/Unyson/issues/2381

```php
add_filter( 'fw_js_l10n', $callback );
```
<small>Fired in: `framework/core/components/backend.php:519`</small>

### `fw_loader_image` {#h-fw-loader-image}
*🧪 filter*

Filters the URL of the loader/spinner image passed to framework JavaScript (default the framework logo SVG).

```php
add_filter( 'fw_loader_image', $callback );
```
<small>Fired in: `framework/core/components/backend.php:504`</small>

### `fw_notify_about_missing_extensions` {#h-fw-notify-about-missing-extensions}
*🧪 filter*

Filters whether the admin notice about missing required extensions is shown; default true.

```php
add_filter( 'fw_notify_about_missing_extensions', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:3814`</small>

### `fw_option_types_init` {#h-fw-option-types-init}
*🎬 action*

Fires once, the first time an option type is requested, so extensions can register their option types.

```php
add_action( 'fw_option_types_init', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1905`</small>

### `fw_post_options` {#h-fw-post-options}
*🧪 filter*

Filters the resolved options for a post type (after the type-specific filter) before they are cached.

```php
add_filter( 'fw_post_options', $callback );
```
<small>Fired in: `framework/core/components/theme.php:127`</small>

### `fw_register_ext_download_sources` {#h-fw-register-ext-download-sources}
*🎬 action*

Fires so extensions can register additional download sources with the extensions manager's registrar.

```php
add_action( 'fw_register_ext_download_sources', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:3113`</small>

### `fw_save_post_options` {#h-fw-save-post-options}
*🎬 action*

Use the 'fw_post_options_update' action

```php
add_action( 'fw_save_post_options', $callback );
```
<small>Fired in: `framework/core/components/backend.php:958`</small>

### `fw_save_term_options` {#h-fw-save-term-options}
*🎬 action · 2 call sites*

Fires after a taxonomy term's options are saved, passing the term id and taxonomy name.

```php
add_action( 'fw_save_term_options', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1159`</small>

### `fw_settings_options` {#h-fw-settings-options}
*🧪 filter*

Filters the resolved Theme Settings options array (cached), letting plugins inject or modify settings options.

```php
add_filter( 'fw_settings_options', $callback );
```
<small>Fired in: `framework/core/components/theme.php:97`</small>

### `fw_taxonomy_options` {#h-fw-taxonomy-options}
*🧪 filter*

Filters the resolved term/taxonomy options array for a taxonomy (cached), letting code inject or modify term options.

```php
add_filter( 'fw_taxonomy_options', $callback );
```
<small>Fired in: `framework/core/components/theme.php:146`</small>

### `fw_theme_available_extensions_file_path` {#h-fw-theme-available-extensions-file-path}
*🧪 filter*

Filters the theme-relative path of the available-extensions.php file the Extensions manager looks for, letting a theme relocate it.

```php
add_filter( 'fw_theme_available_extensions_file_path', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:232`</small>

### `fw_theme_config` {#h-fw-theme-config}
*🧪 filter*

Filters the resolved theme config array after config.php and child overrides are merged (cached once per request), for framework-level defaults.

```php
add_filter( 'fw_theme_config', $callback );
```
<small>Fired in: `framework/core/components/theme.php:214`</small>

### `fw_theme_settings_menu_register` {#h-fw-theme-settings-menu-register}
*🧪 filter*

Filters whether the Theme Settings admin menu should register, letting plugins force it on themes lacking a settings.php.

```php
add_filter( 'fw_theme_settings_menu_register', $callback );
```
<small>Fired in: `framework/core/components/backend/class-fw-settings-form-theme.php:172`</small>

### `fw_tmp_dir` {#h-fw-tmp-dir}
*🧪 filter · 2 call sites*

Filters the temporary directory path used by the Extensions manager (default wp-content/tmp), letting code relocate it.

```php
add_filter( 'fw_tmp_dir', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:709`</small>

### `fw:ajax_options_render:values` {#h-fw-ajax-options-render-values}
*🧪 filter*

Filters the option values used when rendering options over AJAX; returning non-null overrides the default extracted values.

```php
add_filter( 'fw:ajax_options_render:values', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1316`</small>

### `fw:backend:enqueue-options-on-frontend` {#h-fw-backend-enqueue-options-on-frontend}
*🧪 filter · 4 call sites*

Filters whether the options-UI static assets may register on the front end, for front-end editors like the Live Page Editor.

```php
add_filter( 'fw:backend:enqueue-options-on-frontend', $callback );
```
<small>Fired in: `framework/core/components/backend.php:282`</small>

### `fw:backend:option-render:data` {#h-fw-backend-option-render-data}
*🧪 filter*

Filters the data array passed to an option's render view just before the option markup is generated.

```php
add_filter( 'fw:backend:option-render:data', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1730`</small>

### `fw:option-modal:default:reset-btn-disabled` {#h-fw-option-modal-default-reset-btn-disabled}
*🧪 filter*

Filters whether the options modal's default Reset button is disabled.

```php
add_filter( 'fw:option-modal:default:reset-btn-disabled', $callback );
```
<small>Fired in: `framework/core/components/backend.php:527`</small>

### `fw:render_options:option_value` {#h-fw-render-options-option-value}
*🧪 filter*

Filters an early override for an option's value during backend rendering; a non-null return replaces the computed value.

```php
add_filter( 'fw:render_options:option_value', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1589`</small>

← Back to [Hooks overview](./index.md)
