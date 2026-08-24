---
title: Shortcodes — hooks
sidebar_label: Shortcodes
slug: /hooks/shortcodes
description: Actions and filters exposed by the UnysonPlus Shortcodes subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Shortcodes — hooks

**62 hooks** — 9 actions · 53 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_design_lib_catalog_url`](#h-fw-design-lib-catalog-url) | filter | — |
| [`fw_design_lib_dir`](#h-fw-design-lib-dir) | filter | — |
| [`fw_design_lib_url`](#h-fw-design-lib-url) | filter | — |
| [`fw_ext_shortcodes_coders`](#h-fw-ext-shortcodes-coders) | filter | — |
| [`fw_ext_shortcodes_column_description`](#h-fw-ext-shortcodes-column-description) | filter | — |
| [`fw_ext_shortcodes_column_title`](#h-fw-ext-shortcodes-column-title) | filter | — |
| [`fw_ext_shortcodes_disable_shortcodes`](#h-fw-ext-shortcodes-disable-shortcodes) | filter | — |
| [`fw_ext_shortcodes_enqueue_static_before`](#h-fw-ext-shortcodes-enqueue-static-before) | action | — |
| [`fw_ext_shortcodes_enqueue_static:`](#h-fw-ext-shortcodes-enqueue-static) | action | — |
| [`fw_ext_shortcodes_enqueue_static:button`](#h-fw-ext-shortcodes-enqueue-static-button) | action | Must be exactly the same as https://github.com/ThemeFuse/Unyson-Shortcodes-Extension/blob/v1.3.19/class-fw-extension-shortcodes.php#L226-L237 |
| [`fw_ext_shortcodes_table_max_columns`](#h-fw-ext-shortcodes-table-max-columns) | filter | — |
| [`fw_ext_shortcodes:after_shortcode_enqueue_static`](#h-fw-ext-shortcodes-after-shortcode-enqueue-static) | action | — |
| [`fw_ext:shortcodes:collect_shortcodes_data`](#h-fw-ext-shortcodes-collect-shortcodes-data) | filter | — |
| [`fw_ext:shortcodes:config_shortcode`](#h-fw-ext-shortcodes-config-shortcode) | filter | — |
| [`fw_newsletter_handled`](#h-fw-newsletter-handled) | filter | — |
| [`fw_newsletter_recipient`](#h-fw-newsletter-recipient) | filter | — |
| [`fw_newsletter_subscribe`](#h-fw-newsletter-subscribe) | action | Integrations (Mailchimp, etc.) hook here. Return a WP_Error from the `fw_newsletter_subscribe_result` filter to surface a failure to the user. |
| [`fw_newsletter_subscribe_result`](#h-fw-newsletter-subscribe-result) | filter | — |
| [`fw_option_type_table_allowed_cell_html`](#h-fw-option-type-table-allowed-cell-html) | filter | — |
| [`fw_option_type_table_defaults`](#h-fw-option-type-table-defaults) | filter | — |
| [`fw_sc_design_pack_enabled`](#h-fw-sc-design-pack-enabled) | filter | — |
| [`fw_sc_designs`](#h-fw-sc-designs) | filter | — |
| [`fw_sc_display_conditions`](#h-fw-sc-display-conditions) | filter | — |
| [`fw_sc_svg_upload_allowed`](#h-fw-sc-svg-upload-allowed) | filter | — |
| [`fw_shortcode_atts`](#h-fw-shortcode-atts) | filter | — |
| [`fw_shortcode_column_thumbnails_data`](#h-fw-shortcode-column-thumbnails-data) | filter | — |
| [`fw_shortcode_get_options`](#h-fw-shortcode-get-options) | filter | — |
| [`fw_shortcode_lottie_library_src`](#h-fw-shortcode-lottie-library-src) | filter | — |
| [`fw_shortcode_map_provider`](#h-fw-shortcode-map-provider) | filter | — |
| [`fw_shortcode_render_view`](#h-fw-shortcode-render-view) | filter | — |
| [`fw_shortcode_render_view:atts`](#h-fw-shortcode-render-view-atts) | filter | — |
| [`fw:ext:shortcodes:column:value-from-attributes`](#h-fw-ext-shortcodes-column-value-from-attributes) | filter | — |
| [`fw:ext:shortcodes:enqueue_custom_content`](#h-fw-ext-shortcodes-enqueue-custom-content) | action | — |
| [`fw:ext:shortcodes:enqueue_shortcodes_static:after`](#h-fw-ext-shortcodes-enqueue-shortcodes-static-after) | action | — |
| [`fw:ext:shortcodes:enqueue_shortcodes_static:before`](#h-fw-ext-shortcodes-enqueue-shortcodes-static-before) | action | — |
| [`fw:ext:shortcodes:enqueue-shortcodes-admin-scripts`](#h-fw-ext-shortcodes-enqueue-shortcodes-admin-scripts) | action | — |
| [`fw:ext:shortcodes:table:button-shortcode-name`](#h-fw-ext-shortcodes-table-button-shortcode-name) | filter | If you disable default shortcode 'button' and create your own shortcode use this filter to specify its name. Fixes https://github.com/ThemeFuse/Unyson/issues/2056 |
| [`fw:ext:wp-shortcodes:default-shortcodes`](#h-fw-ext-wp-shortcodes-default-shortcodes) | filter | Filter default shortcodes list that will be displayed in default post editor and all of the wp-editors. |
| [`fw:ext:wp-shortcodes:sort`](#h-fw-ext-wp-shortcodes-sort) | filter | — |
| [`sc_anim_collection_items`](#h-sc-anim-collection-items) | filter | — |
| [`sc_anim_stagger_ms`](#h-sc-anim-stagger-ms) | filter | — |
| [`sc_animation_fields`](#h-sc-animation-fields) | filter | — |
| [`sc_build_wrapper_attr`](#h-sc-build-wrapper-attr) | filter | — |
| [`sc_hover_collection_items`](#h-sc-hover-collection-items) | filter | — |
| [`sc_icon_svg_library_fallback_ids`](#h-sc-icon-svg-library-fallback-ids) | filter | Let themes/extensions add their own recovery ids for an icon id. Return an array of '&lt;pack&gt;/&lt;name&gt;' candidates, tried in order. |
| [`sc_icon_svg_library_markup`](#h-sc-icon-svg-library-markup) | filter | — |
| [`sc_needs_wrapper`](#h-sc-needs-wrapper) | filter | — |
| [`sc_notification_default_icons`](#h-sc-notification-default-icons) | filter | — |
| [`sc_notification_default_labels`](#h-sc-notification-default-labels) | filter | — |
| [`sc_posts_query_args`](#h-sc-posts-query-args) | filter | — |
| [`sc_rating_star_paths`](#h-sc-rating-star-paths) | filter | — |
| [`sc_rating_star_svg`](#h-sc-rating-star-svg) | filter | — |
| [`sc_section_background_effects`](#h-sc-section-background-effects) | filter | — |
| [`sc_smooth_scroll_post_types`](#h-sc-smooth-scroll-post-types) | filter | — |
| [`sc_theme_provides_settings_ui`](#h-sc-theme-provides-settings-ui) | filter | — |
| [`sc_theme_settings_url`](#h-sc-theme-settings-url) | filter | — |
| [`unysonplus_components_settings_options`](#h-unysonplus-components-settings-options) | filter | — |
| [`unysonplus_design_enabled_shortcodes`](#h-unysonplus-design-enabled-shortcodes) | filter | — |
| [`unysonplus_editor_list_formats`](#h-unysonplus-editor-list-formats) | filter | — |
| [`unysonplus_force_list_styles_css`](#h-unysonplus-force-list-styles-css) | filter | — |
| [`upw_sc_lib_catalog_url`](#h-upw-sc-lib-catalog-url) | filter | — |
| [`upw_sc_lib_install_dir`](#h-upw-sc-lib-install-dir) | filter | — |

---

### `fw_design_lib_catalog_url` {#h-fw-design-lib-catalog-url}
*🧪 filter*

```php
add_filter( 'fw_design_lib_catalog_url', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/design-presets/design-library.php:330`</small>

### `fw_design_lib_dir` {#h-fw-design-lib-dir}
*🧪 filter*

```php
add_filter( 'fw_design_lib_dir', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/design-presets/design-library.php:44`</small>

### `fw_design_lib_url` {#h-fw-design-lib-url}
*🧪 filter*

```php
add_filter( 'fw_design_lib_url', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/design-presets/design-library.php:53`</small>

### `fw_ext_shortcodes_coders` {#h-fw-ext-shortcodes-coders}
*🧪 filter*

```php
add_filter( 'fw_ext_shortcodes_coders', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:705`</small>

### `fw_ext_shortcodes_column_description` {#h-fw-ext-shortcodes-column-description}
*🧪 filter*

```php
add_filter( 'fw_ext_shortcodes_column_description', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php:69`</small>

### `fw_ext_shortcodes_column_title` {#h-fw-ext-shortcodes-column-title}
*🧪 filter*

```php
add_filter( 'fw_ext_shortcodes_column_title', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php:68`</small>

### `fw_ext_shortcodes_disable_shortcodes` {#h-fw-ext-shortcodes-disable-shortcodes}
*🧪 filter*

```php
add_filter( 'fw_ext_shortcodes_disable_shortcodes', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:532`</small>

### `fw_ext_shortcodes_enqueue_static_before` {#h-fw-ext-shortcodes-enqueue-static-before}
*🎬 action*

```php
add_action( 'fw_ext_shortcodes_enqueue_static_before', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:642`</small>

### `fw_ext_shortcodes_enqueue_static:` {#h-fw-ext-shortcodes-enqueue-static}
*🎬 action*

```php
add_action( 'fw_ext_shortcodes_enqueue_static:', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:649`</small>

### `fw_ext_shortcodes_enqueue_static:button` {#h-fw-ext-shortcodes-enqueue-static-button}
*🎬 action*

Must be exactly the same as https://github.com/ThemeFuse/Unyson-Shortcodes-Extension/blob/v1.3.19/class-fw-extension-shortcodes.php#L226-L237

```php
add_action( 'fw_ext_shortcodes_enqueue_static:button', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/table/class-fw-shortcode-table.php:95`</small>

### `fw_ext_shortcodes_table_max_columns` {#h-fw-ext-shortcodes-table-max-columns}
*🧪 filter · 2 call sites*

```php
add_filter( 'fw_ext_shortcodes_table_max_columns', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/table/includes/fw-option-type-table/class-fw-option-type-table.php:96`</small>

### `fw_ext_shortcodes:after_shortcode_enqueue_static` {#h-fw-ext-shortcodes-after-shortcode-enqueue-static}
*🎬 action*

```php
add_action( 'fw_ext_shortcodes:after_shortcode_enqueue_static', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:667`</small>

### `fw_ext:shortcodes:collect_shortcodes_data` {#h-fw-ext-shortcodes-collect-shortcodes-data}
*🧪 filter*

```php
add_filter( 'fw_ext:shortcodes:collect_shortcodes_data', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:422`</small>

### `fw_ext:shortcodes:config_shortcode` {#h-fw-ext-shortcodes-config-shortcode}
*🧪 filter*

```php
add_filter( 'fw_ext:shortcodes:config_shortcode', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:799`</small>

### `fw_newsletter_handled` {#h-fw-newsletter-handled}
*🧪 filter*

```php
add_filter( 'fw_newsletter_handled', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php:64`</small>

### `fw_newsletter_recipient` {#h-fw-newsletter-recipient}
*🧪 filter*

```php
add_filter( 'fw_newsletter_recipient', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php:66`</small>

### `fw_newsletter_subscribe` {#h-fw-newsletter-subscribe}
*🎬 action*

Integrations (Mailchimp, etc.) hook here. Return a WP_Error from the `fw_newsletter_subscribe_result` filter to surface a failure to the user.

```php
add_action( 'fw_newsletter_subscribe', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php:56`</small>

### `fw_newsletter_subscribe_result` {#h-fw-newsletter-subscribe-result}
*🧪 filter*

```php
add_filter( 'fw_newsletter_subscribe_result', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php:57`</small>

### `fw_option_type_table_allowed_cell_html` {#h-fw-option-type-table-allowed-cell-html}
*🧪 filter*

```php
add_filter( 'fw_option_type_table_allowed_cell_html', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/table/includes/fw-option-type-table/class-fw-option-type-table.php:19`</small>

### `fw_option_type_table_defaults` {#h-fw-option-type-table-defaults}
*🧪 filter*

```php
add_filter( 'fw_option_type_table_defaults', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/table/includes/fw-option-type-table/class-fw-option-type-table.php:498`</small>

### `fw_sc_design_pack_enabled` {#h-fw-sc-design-pack-enabled}
*🧪 filter*

```php
add_filter( 'fw_sc_design_pack_enabled', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/pluggable-designs.php:174`</small>

### `fw_sc_designs` {#h-fw-sc-designs}
*🧪 filter*

```php
add_filter( 'fw_sc_designs', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/pluggable-designs.php:161`</small>

### `fw_sc_display_conditions` {#h-fw-sc-display-conditions}
*🧪 filter*

```php
add_filter( 'fw_sc_display_conditions', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-get-option-helpers.php:312`</small>

### `fw_sc_svg_upload_allowed` {#h-fw-sc-svg-upload-allowed}
*🧪 filter*

```php
add_filter( 'fw_sc_svg_upload_allowed', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3359`</small>

### `fw_shortcode_atts` {#h-fw-shortcode-atts}
*🧪 filter*

```php
add_filter( 'fw_shortcode_atts', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcode.php:187`</small>

### `fw_shortcode_column_thumbnails_data` {#h-fw-shortcode-column-thumbnails-data}
*🧪 filter*

```php
add_filter( 'fw_shortcode_column_thumbnails_data', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php:79`</small>

### `fw_shortcode_get_options` {#h-fw-shortcode-get-options}
*🧪 filter*

```php
add_filter( 'fw_shortcode_get_options', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcode.php:134`</small>

### `fw_shortcode_lottie_library_src` {#h-fw-shortcode-lottie-library-src}
*🧪 filter*

```php
add_filter( 'fw_shortcode_lottie_library_src', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/lottie/static.php:9`</small>

### `fw_shortcode_map_provider` {#h-fw-shortcode-map-provider}
*🧪 filter*

```php
add_filter( 'fw_shortcode_map_provider', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/map/class-fw-shortcode-map.php:21`</small>

### `fw_shortcode_render_view` {#h-fw-shortcode-render-view}
*🧪 filter*

```php
add_filter( 'fw_shortcode_render_view', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcode.php:212`</small>

### `fw_shortcode_render_view:atts` {#h-fw-shortcode-render-view-atts}
*🧪 filter*

```php
add_filter( 'fw_shortcode_render_view:atts', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcode.php:224`</small>

### `fw:ext:shortcodes:column:value-from-attributes` {#h-fw-ext-shortcodes-column-value-from-attributes}
*🧪 filter*

```php
add_filter( 'fw:ext:shortcodes:column:value-from-attributes', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php:124`</small>

### `fw:ext:shortcodes:enqueue_custom_content` {#h-fw-ext-shortcodes-enqueue-custom-content}
*🎬 action*

```php
add_action( 'fw:ext:shortcodes:enqueue_custom_content', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:579`</small>

### `fw:ext:shortcodes:enqueue_shortcodes_static:after` {#h-fw-ext-shortcodes-enqueue-shortcodes-static-after}
*🎬 action*

```php
add_action( 'fw:ext:shortcodes:enqueue_shortcodes_static:after', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:601`</small>

### `fw:ext:shortcodes:enqueue_shortcodes_static:before` {#h-fw-ext-shortcodes-enqueue-shortcodes-static-before}
*🎬 action*

```php
add_action( 'fw:ext:shortcodes:enqueue_shortcodes_static:before', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:591`</small>

### `fw:ext:shortcodes:enqueue-shortcodes-admin-scripts` {#h-fw-ext-shortcodes-enqueue-shortcodes-admin-scripts}
*🎬 action*

```php
add_action( 'fw:ext:shortcodes:enqueue-shortcodes-admin-scripts', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/helpers.php:61`</small>

### `fw:ext:shortcodes:table:button-shortcode-name` {#h-fw-ext-shortcodes-table-button-shortcode-name}
*🧪 filter*

If you disable default shortcode 'button' and create your own shortcode use this filter to specify its name. Fixes https://github.com/ThemeFuse/Unyson/issues/2056

```php
add_filter( 'fw:ext:shortcodes:table:button-shortcode-name', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/table/class-fw-shortcode-table.php:139`</small>

### `fw:ext:wp-shortcodes:default-shortcodes` {#h-fw-ext-wp-shortcodes-default-shortcodes}
*🧪 filter*

Filter default shortcodes list that will be displayed in default post editor and all of the wp-editors.

```php
add_filter( 'fw:ext:wp-shortcodes:default-shortcodes', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/wp-shortcodes/class-fw-extension-wp-shortcodes.php:52`</small>

### `fw:ext:wp-shortcodes:sort` {#h-fw-ext-wp-shortcodes-sort}
*🧪 filter*

```php
add_filter( 'fw:ext:wp-shortcodes:sort', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/wp-shortcodes/class-fw-extension-wp-shortcodes.php:61`</small>

### `sc_anim_collection_items` {#h-sc-anim-collection-items}
*🧪 filter*

```php
add_filter( 'sc_anim_collection_items', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:680`</small>

### `sc_anim_stagger_ms` {#h-sc-anim-stagger-ms}
*🧪 filter*

```php
add_filter( 'sc_anim_stagger_ms', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:766`</small>

### `sc_animation_fields` {#h-sc-animation-fields}
*🧪 filter*

```php
add_filter( 'sc_animation_fields', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:445`</small>

### `sc_build_wrapper_attr` {#h-sc-build-wrapper-attr}
*🧪 filter*

```php
add_filter( 'sc_build_wrapper_attr', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-build-helper.php:273`</small>

### `sc_hover_collection_items` {#h-sc-hover-collection-items}
*🧪 filter*

```php
add_filter( 'sc_hover_collection_items', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:707`</small>

### `sc_icon_svg_library_fallback_ids` {#h-sc-icon-svg-library-fallback-ids}
*🧪 filter*

Let themes/extensions add their own recovery ids for an icon id. Return an array of '&lt;pack&gt;/&lt;name&gt;' candidates, tried in order.

```php
add_filter( 'sc_icon_svg_library_fallback_ids', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3328`</small>

### `sc_icon_svg_library_markup` {#h-sc-icon-svg-library-markup}
*🧪 filter*

```php
add_filter( 'sc_icon_svg_library_markup', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3282`</small>

### `sc_needs_wrapper` {#h-sc-needs-wrapper}
*🧪 filter*

```php
add_filter( 'sc_needs_wrapper', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1863`</small>

### `sc_notification_default_icons` {#h-sc-notification-default-icons}
*🧪 filter*

```php
add_filter( 'sc_notification_default_icons', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/notification/views/view.php:60`</small>

### `sc_notification_default_labels` {#h-sc-notification-default-labels}
*🧪 filter*

```php
add_filter( 'sc_notification_default_labels', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/notification/views/view.php:49`</small>

### `sc_posts_query_args` {#h-sc-posts-query-args}
*🧪 filter*

```php
add_filter( 'sc_posts_query_args', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:297`</small>

### `sc_rating_star_paths` {#h-sc-rating-star-paths}
*🧪 filter*

```php
add_filter( 'sc_rating_star_paths', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3514`</small>

### `sc_rating_star_svg` {#h-sc-rating-star-svg}
*🧪 filter*

```php
add_filter( 'sc_rating_star_svg', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3567`</small>

### `sc_section_background_effects` {#h-sc-section-background-effects}
*🧪 filter*

```php
add_filter( 'sc_section_background_effects', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:144`</small>

### `sc_smooth_scroll_post_types` {#h-sc-smooth-scroll-post-types}
*🧪 filter*

```php
add_filter( 'sc_smooth_scroll_post_types', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-smooth-scroll.php:26`</small>

### `sc_theme_provides_settings_ui` {#h-sc-theme-provides-settings-ui}
*🧪 filter*

```php
add_filter( 'sc_theme_provides_settings_ui', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:110`</small>

### `sc_theme_settings_url` {#h-sc-theme-settings-url}
*🧪 filter*

```php
add_filter( 'sc_theme_settings_url', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:92`</small>

### `unysonplus_components_settings_options` {#h-unysonplus-components-settings-options}
*🧪 filter*

```php
add_filter( 'unysonplus_components_settings_options', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/components-options.php:64`</small>

### `unysonplus_design_enabled_shortcodes` {#h-unysonplus-design-enabled-shortcodes}
*🧪 filter · 2 call sites*

```php
add_filter( 'unysonplus_design_enabled_shortcodes', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/design-presets/design-library.php:63`</small>

### `unysonplus_editor_list_formats` {#h-unysonplus-editor-list-formats}
*🧪 filter*

```php
add_filter( 'unysonplus_editor_list_formats', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcodes-editor.php:55`</small>

### `unysonplus_force_list_styles_css` {#h-unysonplus-force-list-styles-css}
*🧪 filter*

```php
add_filter( 'unysonplus_force_list_styles_css', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcodes-editor.php:113`</small>

### `upw_sc_lib_catalog_url` {#h-upw-sc-lib-catalog-url}
*🧪 filter*

```php
add_filter( 'upw_sc_lib_catalog_url', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/library/installer.php:22`</small>

### `upw_sc_lib_install_dir` {#h-upw-sc-lib-install-dir}
*🧪 filter*

```php
add_filter( 'upw_sc_lib_install_dir', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/library/installer.php:31`</small>

← Back to [Hooks overview](./index.md)
