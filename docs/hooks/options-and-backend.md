---
title: "Options & backend hooks"
sidebar_position: 3
---

# Options & backend hooks

Hooks around the **options framework** and the WordPress backend: registering Theme Settings / Customizer / post / taxonomy option arrays, the option-type and container-type rendering pipeline, option storage, and the admin enqueue points.

Registering a new Theme Settings tab is the canonical example:

```php
add_filter( 'fw_settings_options', function ( $options ) {
    $options['my_tab'] = array(
        'type'    => 'tab',
        'title'   => __( 'My Tab', 'my-domain' ),
        'options' => array(
            'my_field' => array( 'type' => 'text', 'label' => 'My field' ),
        ),
    );
    return $options;
} );
```

The same pattern applies to `fw_customizer_options`, `fw_post_options` (passed `$post_type`), and `fw_taxonomy_options` (passed `$taxonomy`). Read saved values back with `fw_get_db_settings_option()` — see [Option types](/docs/options/option-types).

### Actions (12)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_admin_enqueue_scripts:customizer` | — | _unysonplus/framework/core/components/backend.php_ |
| `fw_admin_enqueue_scripts:post` | `get_post()` | _unysonplus/framework/core/components/backend.php_ |
| `fw_admin_enqueue_scripts:settings` | — | _unysonplus/framework/core/components/backend/class-fw-settings-form-theme.php_ |
| `fw_admin_enqueue_scripts:term` | `get_current_screen()->taxonomy` | _unysonplus/framework/core/components/backend.php_ |
| `fw_backend_add_custom_settings_menu` | `$data` | Use this action if you what to add the settings page in a custom place in menu Usage example http://pastebin.com/gvAjGRm1 |
| `fw_backend_options_render:taxonomy:after` | — | _unysonplus/framework/core/components/backend.php_ |
| `fw_backend_options_render:taxonomy:before` | — | _unysonplus/framework/core/components/backend.php_ |
| `fw_container_types_init` | — | _unysonplus/framework/core/components/backend.php_ |
| `fw_option_types_init` | — | _unysonplus/framework/core/components/backend.php_ |
| `fw_save_post_options` | `$post_id, $post, $old_values` | @deprecated Use the 'fw_post_options_update' action |
| `fw_save_term_options` | `$term_id, $taxonomy->name, []` | _unysonplus/framework/core/components/backend.php_ |
| `fw:option-type:wp-editor:enqueue-scripts` | — | _unysonplus/framework/includes/option-types/wp-editor/class-fw-option-type-wp-editor.php_ |

### Filters (17)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_backend_undefined_option_type_warn_user` | `true, $type` | _unysonplus/framework/core/components/backend.php_ |
| `fw_customizer_option_change_timeout` | `333` | _unysonplus/framework/core/components/backend.php_ |
| `fw_get_settings_page_slug` | `'fw-settings'` | _unysonplus/framework/core/components/backend.php_ |
| `fw_js_l10n` | `$l10n` | fixes https://github.com/ThemeFuse/Unyson/issues/2381 (@since 2.6.14) |
| `fw_loader_image` | `fw_get_framework_directory_uri() . '/static/img/logo.svg'` | _unysonplus/framework/core/components/backend.php_ |
| `fw_option_type_background_pro_color_palette` | `$palette` | _unysonplus/framework/includes/option-types/background-pro/class-fw-option-type-background-pro.php_ |
| `fw_option_type_icon_sets` | `$this->get_default_sets()` | _unysonplus/framework/includes/option-types/icon/class-fw-option-type-icon.php_ |
| `fw_option_type_spacing_scale` | `$this->default_scale()` | _unysonplus/framework/includes/option-types/spacing/class-fw-option-type-spacing.php_ |
| `fw_option_type_typography_standard_fonts` | _see source_ | _unysonplus/framework/includes/option-types/typography/class-fw-option-type-typography.php_ |
| `fw_option_type_typography_v2_standard_fonts` | _see source_ | _unysonplus/framework/includes/option-types/typography-v2/class-fw-option-type-typography-v2.php_ |
| `fw_theme_settings_menu_register` | `$should_register` | _unysonplus/framework/core/components/backend/class-fw-settings-form-theme.php_ |
| `fw:backend:enqueue-options-on-frontend` | `false` | _unysonplus/framework/core/components/backend.php_ |
| `fw:backend:option-render:data` | `$data` | _unysonplus/framework/core/components/backend.php_ |
| `fw:option-modal:default:reset-btn-disabled` | `false` | (@since 2.6.13) |
| `fw:option-type:addable-popup:value-from-input` | `$values, $option` | For e.g. option type 'unique' needs to execute _get_value_from_input() for each option to prevent duplicate values |
| `fw:option-type:multi-picker:fw-storage:process-inner-options` | `false` | _unysonplus/framework/includes/option-types/multi-picker/class-fw-option-type-multi-picker.php_ |
| `fw:option-type:multi-select:query_posts` | `$set` | _unysonplus/framework/includes/option-types/multi-select/class-fw-option-type-multi-select.php_ |

