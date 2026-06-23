---
title: "Framework core hooks"
sidebar_position: 2
---

# Framework core hooks

Lifecycle, boot, and cross-cutting hooks fired by the framework core (the `fw()` runtime, the bootstrap, the dynamic-content and CSS pipelines). These are the hooks you reach for when you need to run code at a specific point in the framework's load, or to alter framework-wide behavior.

The single most useful one is **`fw_init`** — it fires once the framework is fully loaded and every component (`fw()->extensions`, `fw()->theme`, `fw()->backend`) is safe to touch:

```php
add_action( 'fw_init', function () {
    // Safe to call any fw() API here.
    $value = fw_get_db_settings_option( 'some_option' );
} );
```

The boot order is `fw_before_init` → `fw_extensions_before_init` → `fw_extensions_init` → `fw_init`; see [How the framework boots](/docs/architecture/framework-boot) for the full sequence.

### Actions (21)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_after_plugin_activate` | — | _unysonplus/unysonplus.php_ |
| `fw_automatic_update_complete` | `$plugin->result` | _unysonplus/unysonplus.php_ |
| `fw_before_init` | — | _unysonplus/framework/bootstrap.php_ |
| `fw_customizer_options_update` | _see source_ | (@since 2.6.0) |
| `fw_form_display_errors_frontend` | `$form` | Use this action to customize errors display in your theme |
| `fw_form_display:after` | `$this` | _unysonplus/framework/helpers/class-fw-form.php_ |
| `fw_form_display:after_form` | `$this` | _unysonplus/framework/helpers/class-fw-form.php_ |
| `fw_form_display:before` | `$this` | _unysonplus/framework/helpers/class-fw-form.php_ |
| `fw_form_display:before_form` | `$this` | _unysonplus/framework/helpers/class-fw-form.php_ |
| `fw_init` | — | The framework is loaded |
| `fw_plugin_activate` | — | _unysonplus/unysonplus.php_ |
| `fw_plugin_post_update` | — | After plugin successfully updated |
| `fw_plugin_pre_update` | — | Before plugin update The plugin was already downloaded and extracted to a temp directory and it's right before being replaced with the new downloaded version |
| `fw_post_options_update` | _see source_ | (@since 2.2.8) |
| `fw_settings_form_render` | _see source_ | _unysonplus/framework/helpers/class-fw-settings-form.php_ |
| `fw_settings_form_reset` | `$old_values, $new_values` | _unysonplus/framework/helpers/class-fw-settings-form.php_ |
| `fw_settings_form_saved` | `$old_values, $new_values` | Let the framework / theme react (cache flush, regenerated assets, etc.). |
| `fw_settings_options_update` | _see source_ | (@since 2.6.0) |
| `fw_term_options_update` | _see source_ | (@since 2.6.0) |
| `fw:option-storage-types:register` | `$register` | _unysonplus/framework/helpers/fw-storage.php_ |
| `fw:settings-form:` | `$old_values, $new_values` | _unysonplus/framework/helpers/class-fw-settings-form.php_ |

### Filters (42)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_customizer_options` | `$this->get_options( 'customizer' )` | _unysonplus/framework/core/components/theme.php_ |
| `fw_framework_customizations_dir_rel_path` | `'/framework-customizations'` | _unysonplus/framework/helpers/general.php_ |
| `fw_framework_manifest_path` | `fw_get_template_customizations_directory( '/theme/manifest.php' )` | _unysonplus/framework/core/components/theme.php_ |
| `fw_get_db_post_option:fw-storage-enabled` | _see source_ | _unysonplus/framework/helpers/database.php_ |
| `fw_google_fonts` | `$fonts` | _unysonplus/framework/helpers/general.php_ |
| `fw_option_value_error` | `$error, $id, $input_value, $option` | Authoritative server-side custom validation: uniqueness, existence, external API checks, cross-field rules, … Registered in PHP (NOT in the option array) so it can't be tampered with via the modal save payload. Return a non-empty string to mark the field invalid, or the unchan... |
| `fw_plugin_action_list` | `$actions` | _unysonplus/unysonplus.php_ |
| `fw_post_options:$post_type` | `$this->get_options( 'posts/' . $post_type )` | _unysonplus/framework/core/components/theme.php_ |
| `fw_settings_form_reset:values` | `array(), $old_values` | _unysonplus/framework/helpers/class-fw-settings-form.php_ |
| `fw_settings_form_texts` | _see source_ | _unysonplus/framework/helpers/class-fw-settings-form.php_ |
| `fw_settings_options` | `$this->get_options( 'settings' )` | _unysonplus/framework/core/components/theme.php_ |
| `fw_taxonomy_options:$taxonomy` | `$this->get_options( 'taxonomies/' . $taxonomy )` | _unysonplus/framework/core/components/theme.php_ |
| `fw_theme_config` | `$config` | Filter the resolved theme config after the theme's own config.php (and child-theme override) have been merged in. Lets plugins set framework-level defaults like `settings_form_side_tabs` on generic themes that don't ship their own theme/config.php. Filter runs once per request... |
| `fw_use_sessions` | `true` | _unysonplus/framework/helpers/class-fw-session.php_ |
| `fw:backend-option-view:design-default:desc-under-label` | `false` | Fixes https://github.com/ThemeFuse/Unyson/issues/2143 (@since 2.6.9) |
| `fw:backend-option-view:design-default:responsive-classes` | _see source_ | _unysonplus/framework/views/backend-option-design-default.php_ |
| `fw:dynamic-content:permalink_choices_limit` | `200` | Max items listed per post type (keeps a huge type from making a giant dropdown). Filterable for sites that want more / fewer. |
| `fw:dynamic-content:tags` | `array()` | Register Dynamic Content tags. @param array $tags  Keyed by tag id. Each value is an array: 'label'   =&gt; (string)   label shown in the picker 'group'   =&gt; (string)   picker group heading 'params'  =&gt; (array)    optional param descriptors, each: array('id'=&gt;'key','label'=&gt;'Fiel... |
| `fw:form:nonce-name-data` | `'', $this, $render_data` | _unysonplus/framework/helpers/class-fw-form.php_ |
| `fw:options-default-values:skip-types` | _see source_ | _unysonplus/framework/helpers/class-fw-db-options-model.php_ |
| `unysonplus_border_presets` | `$saved` | _unysonplus/framework/includes/presets/border-presets.php_ |
| `unysonplus_button_color_presets` | `$saved` | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_button_size_presets` | `$saved` | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_color_presets` | `$saved` | _unysonplus/framework/includes/presets/color-presets.php_ |
| `unysonplus_custom_hover_animations` | `$saved` | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_default_border_presets` | _see source_ | _unysonplus/framework/includes/presets/border-presets.php_ |
| `unysonplus_default_button_color_presets` | _see source_ | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_default_button_size_presets` | _see source_ | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_default_color_presets` | _see source_ | _unysonplus/framework/includes/presets/color-presets.php_ |
| `unysonplus_default_custom_hover_animations` | _see source_ | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_default_font_size_presets` | _see source_ | _unysonplus/framework/includes/presets/font-size-presets.php_ |
| `unysonplus_default_gap_scale` | _see source_ | _unysonplus/framework/includes/presets/spacing-presets.php_ |
| `unysonplus_default_spacing_scale` | _see source_ | _unysonplus/framework/includes/presets/spacing-presets.php_ |
| `unysonplus_default_table_presets` | _see source_ | _unysonplus/framework/includes/presets/table-presets.php_ |
| `unysonplus_font_size_presets` | `$saved` | _unysonplus/framework/includes/presets/font-size-presets.php_ |
| `unysonplus_gap_scale` | `$saved` | _unysonplus/framework/includes/presets/spacing-presets.php_ |
| `unysonplus_global_css` | `''` | Site-wide Custom CSS (the theme contributes its Theme Settings → Misc → Custom CSS through this filter). Folded into the presets file so it rides the same combiner-absorbed, cacheable handle and is no longer emitted as its own inline &lt;style&gt; block in wp_head. |
| `unysonplus_mobile_font_scale` | `$scale, $desktop_px, $context` | _unysonplus/framework/includes/presets/font-size-presets.php_ |
| `unysonplus_page_css` | `'', $post_id` | 2. Page-level CSS contributed by the theme (page bg + page_custom_css). |
| `unysonplus_preset_store_extension` | `'shortcodes'` | _unysonplus/framework/includes/presets/store.php_ |
| `unysonplus_spacing_scale` | `$migrated` | Phase 2.5 entry-array shape — return as-is |
| `unysonplus_table_presets` | `$saved` | _unysonplus/framework/includes/presets/table-presets.php_ |

