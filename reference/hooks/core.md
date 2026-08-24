---
title: Core — hooks
sidebar_label: Core
slug: /hooks/core
description: Actions and filters exposed by the UnysonPlus Core subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Core — hooks

**56 hooks** — 27 actions · 29 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_admin_enqueue_scripts:customizer`](#h-fw-admin-enqueue-scripts-customizer) | action | — |
| [`fw_admin_enqueue_scripts:post`](#h-fw-admin-enqueue-scripts-post) | action | — |
| [`fw_admin_enqueue_scripts:settings`](#h-fw-admin-enqueue-scripts-settings) | action | — |
| [`fw_admin_enqueue_scripts:term`](#h-fw-admin-enqueue-scripts-term) | action | — |
| [`fw_after_plugin_activate:before_potential_redirect`](#h-fw-after-plugin-activate-before-potential-redirect) | action | — |
| [`fw_after_supported_extensions_install_success`](#h-fw-after-supported-extensions-install-success) | action | Fixes https://github.com/ThemeFuse/Unyson/issues/2330 |
| [`fw_after_switch_theme_activate_exts`](#h-fw-after-switch-theme-activate-exts) | filter | — |
| [`fw_backend_add_custom_extensions_menu`](#h-fw-backend-add-custom-extensions-menu) | action | Use this action if you what to add the extensions page in a custom place in menu Usage example http://pastebin.com/2iWVRPAU |
| [`fw_backend_add_custom_settings_menu`](#h-fw-backend-add-custom-settings-menu) | action | Use this action if you what to add the settings page in a custom place in menu Usage example http://pastebin.com/gvAjGRm1 |
| [`fw_backend_enable_custom_extensions_menu`](#h-fw-backend-enable-custom-extensions-menu) | filter | — |
| [`fw_backend_options_ajax_capability`](#h-fw-backend-options-ajax-capability) | filter | — |
| [`fw_backend_options_render:taxonomy:after`](#h-fw-backend-options-render-taxonomy-after) | action | — |
| [`fw_backend_options_render:taxonomy:before`](#h-fw-backend-options-render-taxonomy-before) | action | — |
| [`fw_backend_undefined_option_type_warn_user`](#h-fw-backend-undefined-option-type-warn-user) | filter | — |
| [`fw_container_types_init`](#h-fw-container-types-init) | action | — |
| [`fw_customizer_option_change_timeout`](#h-fw-customizer-option-change-timeout) | filter | — |
| [`fw_customizer_options`](#h-fw-customizer-options) | filter | — |
| [`fw_ext_manager_settings_url`](#h-fw-ext-manager-settings-url) | filter | — |
| [`fw_ext_mngr_github_branch`](#h-fw-ext-mngr-github-branch) | filter | Resolve the branch to download. Defaults to the repository's GitHub default branch; override via the filter if needed. |
| [`fw_extension_settings_form_render:`](#h-fw-extension-settings-form-render) | action | — |
| [`fw_extension_settings_form_saved:`](#h-fw-extension-settings-form-saved) | action | — |
| [`fw_extensions_activation_failed`](#h-fw-extensions-activation-failed) | action | — |
| [`fw_extensions_after_activation`](#h-fw-extensions-after-activation) | action | — |
| [`fw_extensions_after_deactivation`](#h-fw-extensions-after-deactivation) | action | — |
| [`fw_extensions_before_activation`](#h-fw-extensions-before-activation) | action | — |
| [`fw_extensions_before_deactivation`](#h-fw-extensions-before-deactivation) | action | — |
| [`fw_extensions_before_init`](#h-fw-extensions-before-init) | action | Extensions are about to activate. You can add subclasses to FW_Extension at this point. |
| [`fw_extensions_deactivation_failed`](#h-fw-extensions-deactivation-failed) | action | — |
| [`fw_extensions_init`](#h-fw-extensions-init) | action | Extensions are activated Now $this-&gt;get_children() inside extensions is available |
| [`fw_extensions_install`](#h-fw-extensions-install) | action | — |
| [`fw_extensions_locations`](#h-fw-extensions-locations) | filter | &#123; '/hello/world/extensions' =&gt; 'https://hello.com/world/extensions' &#125; |
| [`fw_extensions_locations_after`](#h-fw-extensions-locations-after) | filter | — |
| [`fw_extensions_page_show_other_extensions`](#h-fw-extensions-page-show-other-extensions) | filter | — |
| [`fw_extensions_uninstall`](#h-fw-extensions-uninstall) | action | — |
| [`fw_framework_manifest_path`](#h-fw-framework-manifest-path) | filter | — |
| [`fw_get_settings_page_slug`](#h-fw-get-settings-page-slug) | filter | — |
| [`fw_github_api_url`](#h-fw-github-api-url) | filter | — |
| [`fw_js_l10n`](#h-fw-js-l10n) | filter | fixes https://github.com/ThemeFuse/Unyson/issues/2381 |
| [`fw_loader_image`](#h-fw-loader-image) | filter | — |
| [`fw_notify_about_missing_extensions`](#h-fw-notify-about-missing-extensions) | filter | — |
| [`fw_option_types_init`](#h-fw-option-types-init) | action | — |
| [`fw_post_options`](#h-fw-post-options) | filter | — |
| [`fw_register_ext_download_sources`](#h-fw-register-ext-download-sources) | action | — |
| [`fw_save_post_options`](#h-fw-save-post-options) | action | Use the 'fw_post_options_update' action |
| [`fw_save_term_options`](#h-fw-save-term-options) | action | — |
| [`fw_settings_options`](#h-fw-settings-options) | filter | — |
| [`fw_taxonomy_options`](#h-fw-taxonomy-options) | filter | — |
| [`fw_theme_available_extensions_file_path`](#h-fw-theme-available-extensions-file-path) | filter | — |
| [`fw_theme_config`](#h-fw-theme-config) | filter | — |
| [`fw_theme_settings_menu_register`](#h-fw-theme-settings-menu-register) | filter | — |
| [`fw_tmp_dir`](#h-fw-tmp-dir) | filter | — |
| [`fw:ajax_options_render:values`](#h-fw-ajax-options-render-values) | filter | — |
| [`fw:backend:enqueue-options-on-frontend`](#h-fw-backend-enqueue-options-on-frontend) | filter | — |
| [`fw:backend:option-render:data`](#h-fw-backend-option-render-data) | filter | — |
| [`fw:option-modal:default:reset-btn-disabled`](#h-fw-option-modal-default-reset-btn-disabled) | filter | — |
| [`fw:render_options:option_value`](#h-fw-render-options-option-value) | filter | — |

---

### `fw_admin_enqueue_scripts:customizer` {#h-fw-admin-enqueue-scripts-customizer}
*🎬 action*

```php
add_action( 'fw_admin_enqueue_scripts:customizer', $callback );
```
<small>Fired in: `framework/core/components/backend.php:2026`</small>

### `fw_admin_enqueue_scripts:post` {#h-fw-admin-enqueue-scripts-post}
*🎬 action*

```php
add_action( 'fw_admin_enqueue_scripts:post', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1224`</small>

### `fw_admin_enqueue_scripts:settings` {#h-fw-admin-enqueue-scripts-settings}
*🎬 action*

```php
add_action( 'fw_admin_enqueue_scripts:settings', $callback );
```
<small>Fired in: `framework/core/components/backend/class-fw-settings-form-theme.php:277`</small>

### `fw_admin_enqueue_scripts:term` {#h-fw-admin-enqueue-scripts-term}
*🎬 action*

```php
add_action( 'fw_admin_enqueue_scripts:term', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1240`</small>

### `fw_after_plugin_activate:before_potential_redirect` {#h-fw-after-plugin-activate-before-potential-redirect}
*🎬 action*

```php
add_action( 'fw_after_plugin_activate:before_potential_redirect', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:500`</small>

### `fw_after_supported_extensions_install_success` {#h-fw-after-supported-extensions-install-success}
*🎬 action*

Fixes https://github.com/ThemeFuse/Unyson/issues/2330

```php
add_action( 'fw_after_supported_extensions_install_success', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:1554`</small>

### `fw_after_switch_theme_activate_exts` {#h-fw-after-switch-theme-activate-exts}
*🧪 filter*

```php
add_filter( 'fw_after_switch_theme_activate_exts', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:3638`</small>

### `fw_backend_add_custom_extensions_menu` {#h-fw-backend-add-custom-extensions-menu}
*🎬 action*

Use this action if you what to add the extensions page in a custom place in menu Usage example http://pastebin.com/2iWVRPAU

```php
add_action( 'fw_backend_add_custom_extensions_menu', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:898`</small>

### `fw_backend_add_custom_settings_menu` {#h-fw-backend-add-custom-settings-menu}
*🎬 action*

Use this action if you what to add the settings page in a custom place in menu Usage example http://pastebin.com/gvAjGRm1

```php
add_action( 'fw_backend_add_custom_settings_menu', $callback );
```
<small>Fired in: `framework/core/components/backend/class-fw-settings-form-theme.php:198`</small>

### `fw_backend_enable_custom_extensions_menu` {#h-fw-backend-enable-custom-extensions-menu}
*🧪 filter*

```php
add_filter( 'fw_backend_enable_custom_extensions_menu', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:890`</small>

### `fw_backend_options_ajax_capability` {#h-fw-backend-options-ajax-capability}
*🧪 filter · 4 call sites*

```php
add_filter( 'fw_backend_options_ajax_capability', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1264`</small>

### `fw_backend_options_render:taxonomy:after` {#h-fw-backend-options-render-taxonomy-after}
*🎬 action · 2 call sites*

```php
add_action( 'fw_backend_options_render:taxonomy:after', $callback );
```
<small>Fired in: `framework/core/components/backend.php:826`</small>

### `fw_backend_options_render:taxonomy:before` {#h-fw-backend-options-render-taxonomy-before}
*🎬 action · 2 call sites*

```php
add_action( 'fw_backend_options_render:taxonomy:before', $callback );
```
<small>Fired in: `framework/core/components/backend.php:824`</small>

### `fw_backend_undefined_option_type_warn_user` {#h-fw-backend-undefined-option-type-warn-user}
*🧪 filter*

```php
add_filter( 'fw_backend_undefined_option_type_warn_user', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1898`</small>

### `fw_container_types_init` {#h-fw-container-types-init}
*🎬 action*

```php
add_action( 'fw_container_types_init', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1944`</small>

### `fw_customizer_option_change_timeout` {#h-fw-customizer-option-change-timeout}
*🧪 filter*

```php
add_filter( 'fw_customizer_option_change_timeout', $callback );
```
<small>Fired in: `framework/core/components/backend.php:2022`</small>

### `fw_customizer_options` {#h-fw-customizer-options}
*🧪 filter*

```php
add_filter( 'fw_customizer_options', $callback );
```
<small>Fired in: `framework/core/components/theme.php:109`</small>

### `fw_ext_manager_settings_url` {#h-fw-ext-manager-settings-url}
*🧪 filter*

```php
add_filter( 'fw_ext_manager_settings_url', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/views/extension.php:57`</small>

### `fw_ext_mngr_github_branch` {#h-fw-ext-mngr-github-branch}
*🧪 filter*

Resolve the branch to download. Defaults to the repository's GitHub default branch; override via the filter if needed.

```php
add_filter( 'fw_ext_mngr_github_branch', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/includes/download-source/types/class-fw-download-source-github.php:59`</small>

### `fw_extension_settings_form_render:` {#h-fw-extension-settings-form-render}
*🎬 action*

```php
add_action( 'fw_extension_settings_form_render:', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:2864`</small>

### `fw_extension_settings_form_saved:` {#h-fw-extension-settings-form-saved}
*🎬 action*

```php
add_action( 'fw_extension_settings_form_saved:', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:2953`</small>

### `fw_extensions_activation_failed` {#h-fw-extensions-activation-failed}
*🎬 action*

```php
add_action( 'fw_extensions_activation_failed', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:747`</small>

### `fw_extensions_after_activation` {#h-fw-extensions-after-activation}
*🎬 action*

```php
add_action( 'fw_extensions_after_activation', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:744`</small>

### `fw_extensions_after_deactivation` {#h-fw-extensions-after-deactivation}
*🎬 action*

```php
add_action( 'fw_extensions_after_deactivation', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:766`</small>

### `fw_extensions_before_activation` {#h-fw-extensions-before-activation}
*🎬 action*

```php
add_action( 'fw_extensions_before_activation', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:2597`</small>

### `fw_extensions_before_deactivation` {#h-fw-extensions-before-deactivation}
*🎬 action*

```php
add_action( 'fw_extensions_before_deactivation', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:2843`</small>

### `fw_extensions_before_init` {#h-fw-extensions-before-init}
*🎬 action*

Extensions are about to activate. You can add subclasses to FW_Extension at this point.

```php
add_action( 'fw_extensions_before_init', $callback );
```
<small>Fired in: `framework/core/components/extensions.php:580`</small>

### `fw_extensions_deactivation_failed` {#h-fw-extensions-deactivation-failed}
*🎬 action*

```php
add_action( 'fw_extensions_deactivation_failed', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:769`</small>

### `fw_extensions_init` {#h-fw-extensions-init}
*🎬 action*

Extensions are activated Now $this-&gt;get_children() inside extensions is available

```php
add_action( 'fw_extensions_init', $callback );
```
<small>Fired in: `framework/core/components/extensions.php:597`</small>

### `fw_extensions_install` {#h-fw-extensions-install}
*🎬 action*

```php
add_action( 'fw_extensions_install', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:1930`</small>

### `fw_extensions_locations` {#h-fw-extensions-locations}
*🧪 filter*

&#123; '/hello/world/extensions' =&gt; 'https://hello.com/world/extensions' &#125;

```php
add_filter( 'fw_extensions_locations', $callback );
```
<small>Fired in: `framework/core/components/extensions.php:309`</small>

### `fw_extensions_locations_after` {#h-fw-extensions-locations-after}
*🧪 filter*

```php
add_filter( 'fw_extensions_locations_after', $callback );
```
<small>Fired in: `framework/core/components/extensions.php:379`</small>

### `fw_extensions_page_show_other_extensions` {#h-fw-extensions-page-show-other-extensions}
*🧪 filter*

```php
add_filter( 'fw_extensions_page_show_other_extensions', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/views/extensions-page.php:228`</small>

### `fw_extensions_uninstall` {#h-fw-extensions-uninstall}
*🎬 action*

```php
add_action( 'fw_extensions_uninstall', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:2214`</small>

### `fw_framework_manifest_path` {#h-fw-framework-manifest-path}
*🧪 filter*

```php
add_filter( 'fw_framework_manifest_path', $callback );
```
<small>Fired in: `framework/core/components/theme.php:20`</small>

### `fw_get_settings_page_slug` {#h-fw-get-settings-page-slug}
*🧪 filter*

```php
add_filter( 'fw_get_settings_page_slug', $callback );
```
<small>Fired in: `framework/core/components/backend.php:71`</small>

### `fw_github_api_url` {#h-fw-github-api-url}
*🧪 filter*

```php
add_filter( 'fw_github_api_url', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/includes/download-source/types/class-fw-download-source-github.php:63`</small>

### `fw_js_l10n` {#h-fw-js-l10n}
*🧪 filter*

fixes https://github.com/ThemeFuse/Unyson/issues/2381

```php
add_filter( 'fw_js_l10n', $callback );
```
<small>Fired in: `framework/core/components/backend.php:516`</small>

### `fw_loader_image` {#h-fw-loader-image}
*🧪 filter*

```php
add_filter( 'fw_loader_image', $callback );
```
<small>Fired in: `framework/core/components/backend.php:501`</small>

### `fw_notify_about_missing_extensions` {#h-fw-notify-about-missing-extensions}
*🧪 filter*

```php
add_filter( 'fw_notify_about_missing_extensions', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:3796`</small>

### `fw_option_types_init` {#h-fw-option-types-init}
*🎬 action*

```php
add_action( 'fw_option_types_init', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1887`</small>

### `fw_post_options` {#h-fw-post-options}
*🧪 filter*

```php
add_filter( 'fw_post_options', $callback );
```
<small>Fired in: `framework/core/components/theme.php:123`</small>

### `fw_register_ext_download_sources` {#h-fw-register-ext-download-sources}
*🎬 action*

```php
add_action( 'fw_register_ext_download_sources', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:3097`</small>

### `fw_save_post_options` {#h-fw-save-post-options}
*🎬 action*

Use the 'fw_post_options_update' action

```php
add_action( 'fw_save_post_options', $callback );
```
<small>Fired in: `framework/core/components/backend.php:949`</small>

### `fw_save_term_options` {#h-fw-save-term-options}
*🎬 action · 2 call sites*

```php
add_action( 'fw_save_term_options', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1149`</small>

### `fw_settings_options` {#h-fw-settings-options}
*🧪 filter*

```php
add_filter( 'fw_settings_options', $callback );
```
<small>Fired in: `framework/core/components/theme.php:95`</small>

### `fw_taxonomy_options` {#h-fw-taxonomy-options}
*🧪 filter*

```php
add_filter( 'fw_taxonomy_options', $callback );
```
<small>Fired in: `framework/core/components/theme.php:141`</small>

### `fw_theme_available_extensions_file_path` {#h-fw-theme-available-extensions-file-path}
*🧪 filter*

```php
add_filter( 'fw_theme_available_extensions_file_path', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:231`</small>

### `fw_theme_config` {#h-fw-theme-config}
*🧪 filter*

```php
add_filter( 'fw_theme_config', $callback );
```
<small>Fired in: `framework/core/components/theme.php:207`</small>

### `fw_theme_settings_menu_register` {#h-fw-theme-settings-menu-register}
*🧪 filter*

```php
add_filter( 'fw_theme_settings_menu_register', $callback );
```
<small>Fired in: `framework/core/components/backend/class-fw-settings-form-theme.php:171`</small>

### `fw_tmp_dir` {#h-fw-tmp-dir}
*🧪 filter · 2 call sites*

```php
add_filter( 'fw_tmp_dir', $callback );
```
<small>Fired in: `framework/core/components/extensions/manager/class--fw-extensions-manager.php:706`</small>

### `fw:ajax_options_render:values` {#h-fw-ajax-options-render-values}
*🧪 filter*

```php
add_filter( 'fw:ajax_options_render:values', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1301`</small>

### `fw:backend:enqueue-options-on-frontend` {#h-fw-backend-enqueue-options-on-frontend}
*🧪 filter · 4 call sites*

```php
add_filter( 'fw:backend:enqueue-options-on-frontend', $callback );
```
<small>Fired in: `framework/core/components/backend.php:280`</small>

### `fw:backend:option-render:data` {#h-fw-backend-option-render-data}
*🧪 filter*

```php
add_filter( 'fw:backend:option-render:data', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1713`</small>

### `fw:option-modal:default:reset-btn-disabled` {#h-fw-option-modal-default-reset-btn-disabled}
*🧪 filter*

```php
add_filter( 'fw:option-modal:default:reset-btn-disabled', $callback );
```
<small>Fired in: `framework/core/components/backend.php:520`</small>

### `fw:render_options:option_value` {#h-fw-render-options-option-value}
*🧪 filter*

```php
add_filter( 'fw:render_options:option_value', $callback );
```
<small>Fired in: `framework/core/components/backend.php:1573`</small>

← Back to [Hooks overview](./index.md)
