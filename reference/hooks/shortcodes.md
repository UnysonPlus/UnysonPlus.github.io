---
title: Shortcodes — hooks
sidebar_label: Shortcodes
slug: /hooks/shortcodes
description: Actions and filters exposed by the UnysonPlus Shortcodes subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Shortcodes — hooks

**61 hooks** — 8 actions · 53 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_design_lib_catalog_url`](#h-fw-design-lib-catalog-url) | filter | Filters the remote URL of the design library's catalog.json in the UnysonPlus-Library repo used for Browse Library. |
| [`fw_design_lib_dir`](#h-fw-design-lib-dir) | filter | Filters the server path to a shortcode's designs folder under uploads/unysonplus/designs. |
| [`fw_design_lib_url`](#h-fw-design-lib-url) | filter | Filters the public URL of a shortcode's designs folder used for design thumbnails. |
| [`fw_ext_shortcodes_coders`](#h-fw-ext-shortcodes-coders) | filter | Filters the list of custom shortcode attribute coder instances to register alongside the built-in JSON, aggressive, and post-meta coders. |
| [`fw_ext_shortcodes_column_description`](#h-fw-ext-shortcodes-column-description) | filter | Filters the page-builder column item description text for a given column width key. |
| [`fw_ext_shortcodes_column_title`](#h-fw-ext-shortcodes-column-title) | filter | Filters the page-builder column item title for a given column width key. |
| [`fw_ext_shortcodes_disable_shortcodes`](#h-fw-ext-shortcodes-disable-shortcodes) | filter | Filters the array of shortcode tags to disable so they are skipped when the shortcode loader registers shortcodes. |
| [`fw_ext_shortcodes_enqueue_static_before`](#h-fw-ext-shortcodes-enqueue-static-before) | action | Fires before a shortcode's static assets are enqueued during content scan, passing the tag, raw shortcode, atts string, and post. |
| [`fw_ext_shortcodes_enqueue_static:button`](#h-fw-ext-shortcodes-enqueue-static-button) | action | Must be exactly the same as https://github.com/ThemeFuse/Unyson-Shortcodes-Extension/blob/v1.3.19/class-fw-extension-shortcodes.php#L226-L237 |
| [`fw_ext_shortcodes_table_max_columns`](#h-fw-ext-shortcodes-table-max-columns) | filter | Filters the maximum number of columns allowed in the table shortcode builder, defaulting to 6. |
| [`fw_ext_shortcodes:after_shortcode_enqueue_static`](#h-fw-ext-shortcodes-after-shortcode-enqueue-static) | action | Fires after a shortcode's static assets are enqueued during page scan, passing the raw shortcode array. |
| [`fw_ext:shortcodes:collect_shortcodes_data`](#h-fw-ext-shortcodes-collect-shortcodes-data) | filter | Filters the collected structure of shortcode data, letting listeners register or augment shortcode metadata. |
| [`fw_ext:shortcodes:config_shortcode`](#h-fw-ext-shortcodes-config-shortcode) | filter | Filters a shortcode's builder item config (icon, title template, popup size, localized labels) before it is registered. |
| [`fw_newsletter_handled`](#h-fw-newsletter-handled) | filter | Filters whether a newsletter signup has already been handled by an integration, allowing the built-in admin notification email to be suppressed. |
| [`fw_newsletter_recipient`](#h-fw-newsletter-recipient) | filter | Filters the recipient email address for the newsletter-signup notification (default the site admin email). |
| [`fw_newsletter_subscribe`](#h-fw-newsletter-subscribe) | action | Integrations (Mailchimp, etc.) hook here. Return a WP_Error from the `fw_newsletter_subscribe_result` filter to surface a failure to the user. |
| [`fw_newsletter_subscribe_result`](#h-fw-newsletter-subscribe-result) | filter | Filters the newsletter subscription result; return a WP_Error to surface a failure message to the user. |
| [`fw_option_type_table_allowed_cell_html`](#h-fw-option-type-table-allowed-cell-html) | filter | Filters the list of inline HTML tags/attributes allowed inside a table option cell. |
| [`fw_option_type_table_defaults`](#h-fw-option-type-table-defaults) | filter | Filters the default option definitions used by the table option type's header/body settings. |
| [`fw_sc_design_pack_enabled`](#h-fw-sc-design-pack-enabled) | filter | Filters whether an installed design pack (for a shortcode tag/key) is enabled, letting code override the per-shortcode disabled toggle. |
| [`fw_sc_designs`](#h-fw-sc-designs) | filter | Filters the merged registry of available designs discovered for a shortcode tag, letting code add, remove, or alter design entries. |
| [`fw_sc_display_conditions`](#h-fw-sc-display-conditions) | filter | Filters the boolean visibility decision for a builder element, letting code override whether it renders based on its display-condition atts. |
| [`fw_sc_svg_upload_allowed`](#h-fw-sc-svg-upload-allowed) | filter | Filters whether the current context may upload SVGs, letting a trusted flow lift the manage_options gate without an admin user. |
| [`fw_shortcode_atts`](#h-fw-shortcode-atts) | filter | Filters raw shortcode attributes before rendering (deprecated since Shortcodes 1.3.0), allowing legacy attribute adjustment. |
| [`fw_shortcode_column_thumbnails_data`](#h-fw-shortcode-column-thumbnails-data) | filter | Filters the column-width thumbnail data offered in the page builder, letting code add or alter available column layouts. |
| [`fw_shortcode_get_options`](#h-fw-shortcode-get-options) | filter | Filters a shortcode's option definitions after they are loaded from options.php, keyed by tag, letting code adjust its options. |
| [`fw_shortcode_lottie_library_src`](#h-fw-shortcode-lottie-library-src) | filter | Filters the URL of the vendored lottie-web library script, letting a site swap in a CDN or the full canvas-renderer build. |
| [`fw_shortcode_map_provider`](#h-fw-shortcode-map-provider) | filter | Filters the registered map location providers, letting code add or modify map data sources and their callbacks/options. |
| [`fw_shortcode_render_view`](#h-fw-shortcode-render-view) | filter | Filters the before/after wrapper markup applied around a shortcode's rendered view, keyed by atts and tag. |
| [`fw_shortcode_render_view:atts`](#h-fw-shortcode-render-view-atts) | filter | Filters the attributes passed into a shortcode's view template at render time, letting code adjust per-tag render data. |
| [`fw:ext:shortcodes:column:value-from-attributes`](#h-fw-ext-shortcodes-column-value-from-attributes) | filter | Filters the column item's parsed attribute values derived from its shortcode attributes. |
| [`fw:ext:shortcodes:enqueue_custom_content`](#h-fw-ext-shortcodes-enqueue-custom-content) | action | Fires when shortcode static assets are enqueued into the front-end head, letting extensions add head-time statics. |
| [`fw:ext:shortcodes:enqueue_shortcodes_static:after`](#h-fw-ext-shortcodes-enqueue-shortcodes-static-after) | action | Fires after a post's shortcode static assets are enqueued, passing the post content for follow-up work. |
| [`fw:ext:shortcodes:enqueue_shortcodes_static:before`](#h-fw-ext-shortcodes-enqueue-shortcodes-static-before) | action | Fires before a post's shortcode static assets are enqueued, passing the post content for preparation. |
| [`fw:ext:shortcodes:enqueue-shortcodes-admin-scripts`](#h-fw-ext-shortcodes-enqueue-shortcodes-admin-scripts) | action | Fires after every shortcode's option statics are enqueued in admin, so extensions can enqueue their own admin scripts. |
| [`fw:ext:shortcodes:table:button-shortcode-name`](#h-fw-ext-shortcodes-table-button-shortcode-name) | filter | If you disable default shortcode 'button' and create your own shortcode use this filter to specify its name. Fixes https://github.com/ThemeFuse/Unyson/issues/2056 |
| [`fw:ext:wp-shortcodes:default-shortcodes`](#h-fw-ext-wp-shortcodes-default-shortcodes) | filter | Filter default shortcodes list that will be displayed in default post editor and all of the wp-editors. |
| [`fw:ext:wp-shortcodes:sort`](#h-fw-ext-wp-shortcodes-sort) | filter | Filters the sorted list of default shortcodes available in the WP editor. |
| [`sc_anim_collection_items`](#h-sc-anim-collection-items) | filter | Filters the broad registry mapping collection element base classes to their item selectors for scroll-animation cascades. |
| [`sc_anim_stagger_ms`](#h-sc-anim-stagger-ms) | filter | Filters the default per-item stagger delay in milliseconds for a collection's animation cascade, keyed by base class and atts. |
| [`sc_animation_fields`](#h-sc-animation-fields) | filter | Filters the shortcode animation option fields, letting the Animation Engine append Scroll Motion and Hover field groups when active. |
| [`sc_build_wrapper_attr`](#h-sc-build-wrapper-attr) | filter | Filters the assembled HTML attribute array for a shortcode wrapper element before it is rendered. |
| [`sc_hover_collection_items`](#h-sc-hover-collection-items) | filter | Filters the narrower registry mapping collection element base classes to their item selectors for per-card hover interactions. |
| [`sc_icon_svg_library_fallback_ids`](#h-sc-icon-svg-library-fallback-ids) | filter | Let themes/extensions add their own recovery ids for an icon id. Return an array of '&lt;pack&gt;/&lt;name&gt;' candidates, tried in order. |
| [`sc_icon_svg_library_markup`](#h-sc-icon-svg-library-markup) | filter | Filters the resolved SVG markup for a built-in library icon id, letting code override or patch an icon's glyph. |
| [`sc_needs_wrapper`](#h-sc-needs-wrapper) | filter | Filters whether a shortcode's styling atts require a wrapper element, defaulting to false so custom atts can force one. |
| [`sc_notification_default_icons`](#h-sc-notification-default-icons) | filter | Filters the default per-type icon classes (primary, success, warning, etc.) used by the notification shortcode. |
| [`sc_notification_default_labels`](#h-sc-notification-default-labels) | filter | Filters the default per-type heading labels (Note!, Success!, Warning!, etc.) used by the notification shortcode. |
| [`sc_posts_query_args`](#h-sc-posts-query-args) | filter | Filters the WP_Query args built by the posts shortcode before the query runs, letting code adjust which posts are fetched. |
| [`sc_rating_star_paths`](#h-sc-rating-star-paths) | filter | Filters the map of rating symbol shapes (star, heart, circle) with their viewBox and SVG path, to add or replace symbols. |
| [`sc_rating_star_svg`](#h-sc-rating-star-svg) | filter | Filters the inner SVG markup for a rating symbol, allowing a full path/markup override per symbol before the sprite is built. |
| [`sc_section_background_effects`](#h-sc-section-background-effects) | filter | Filters the registry of available section background effects, letting extensions register additional effect definitions. |
| [`sc_smooth_scroll_post_types`](#h-sc-smooth-scroll-post-types) | filter | Filters which post types (default page and post) get the per-page smooth-scroll toggle metabox in the editor. |
| [`sc_theme_provides_settings_ui`](#h-sc-theme-provides-settings-ui) | filter | Filters whether the active theme ships the Unyson+ Theme Settings UI, so third-party themes can declare their own support. |
| [`sc_theme_settings_url`](#h-sc-theme-settings-url) | filter | Filters the admin URL (with tab anchor) pointing to the theme's settings page for a given context. |
| [`unysonplus_components_settings_options`](#h-unysonplus-components-settings-options) | filter | Filters the Components settings tab definitions (Color Presets, Text Styles, Spacing, Buttons) for the theme settings UI. |
| [`unysonplus_design_enabled_shortcodes`](#h-unysonplus-design-enabled-shortcodes) | filter | Filters the fallback list of shortcodes allowed to carry design library presets when the primary resolver is unavailable. |
| [`unysonplus_editor_list_formats`](#h-unysonplus-editor-list-formats) | filter | Filters the styled-list format definitions (Pros, Cons, Steps, Arrow) offered in the TinyMCE list-styles menu. |
| [`unysonplus_force_list_styles_css`](#h-unysonplus-force-list-styles-css) | filter | Filters whether to force-load the fw-list-* styled-list CSS, for dynamic content that injects styled lists outside the main post. |
| [`upw_sc_lib_catalog_url`](#h-upw-sc-lib-catalog-url) | filter | Filters the remote shortcode-library catalog URL, letting a developer point at a local copy. |
| [`upw_sc_lib_install_dir`](#h-upw-sc-lib-install-dir) | filter | Filters the directory library shortcodes install into (the active theme's shortcodes customization tree). |

---

### `fw_design_lib_catalog_url` {#h-fw-design-lib-catalog-url}
*🧪 filter*

Filters the remote URL of the design library's catalog.json in the UnysonPlus-Library repo used for Browse Library.

```php
add_filter( 'fw_design_lib_catalog_url', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/design-presets/design-library.php:335`</small>

### `fw_design_lib_dir` {#h-fw-design-lib-dir}
*🧪 filter*

Filters the server path to a shortcode's designs folder under uploads/unysonplus/designs.

```php
add_filter( 'fw_design_lib_dir', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/design-presets/design-library.php:45`</small>

### `fw_design_lib_url` {#h-fw-design-lib-url}
*🧪 filter*

Filters the public URL of a shortcode's designs folder used for design thumbnails.

```php
add_filter( 'fw_design_lib_url', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/design-presets/design-library.php:55`</small>

### `fw_ext_shortcodes_coders` {#h-fw-ext-shortcodes-coders}
*🧪 filter*

Filters the list of custom shortcode attribute coder instances to register alongside the built-in JSON, aggressive, and post-meta coders.

```php
add_filter( 'fw_ext_shortcodes_coders', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:718`</small>

### `fw_ext_shortcodes_column_description` {#h-fw-ext-shortcodes-column-description}
*🧪 filter*

Filters the page-builder column item description text for a given column width key.

```php
add_filter( 'fw_ext_shortcodes_column_description', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php:71`</small>

### `fw_ext_shortcodes_column_title` {#h-fw-ext-shortcodes-column-title}
*🧪 filter*

Filters the page-builder column item title for a given column width key.

```php
add_filter( 'fw_ext_shortcodes_column_title', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php:69`</small>

### `fw_ext_shortcodes_disable_shortcodes` {#h-fw-ext-shortcodes-disable-shortcodes}
*🧪 filter*

Filters the array of shortcode tags to disable so they are skipped when the shortcode loader registers shortcodes.

```php
add_filter( 'fw_ext_shortcodes_disable_shortcodes', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:534`</small>

### `fw_ext_shortcodes_enqueue_static_before` {#h-fw-ext-shortcodes-enqueue-static-before}
*🎬 action*

Fires before a shortcode's static assets are enqueued during content scan, passing the tag, raw shortcode, atts string, and post.

```php
add_action( 'fw_ext_shortcodes_enqueue_static_before', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:651`</small>

### `fw_ext_shortcodes_enqueue_static:button` {#h-fw-ext-shortcodes-enqueue-static-button}
*🎬 action*

Must be exactly the same as https://github.com/ThemeFuse/Unyson-Shortcodes-Extension/blob/v1.3.19/class-fw-extension-shortcodes.php#L226-L237

```php
add_action( 'fw_ext_shortcodes_enqueue_static:button', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/table/class-fw-shortcode-table.php:95`</small>

### `fw_ext_shortcodes_table_max_columns` {#h-fw-ext-shortcodes-table-max-columns}
*🧪 filter · 2 call sites*

Filters the maximum number of columns allowed in the table shortcode builder, defaulting to 6.

```php
add_filter( 'fw_ext_shortcodes_table_max_columns', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/table/includes/fw-option-type-table/class-fw-option-type-table.php:98`</small>

### `fw_ext_shortcodes:after_shortcode_enqueue_static` {#h-fw-ext-shortcodes-after-shortcode-enqueue-static}
*🎬 action*

Fires after a shortcode's static assets are enqueued during page scan, passing the raw shortcode array.

```php
add_action( 'fw_ext_shortcodes:after_shortcode_enqueue_static', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:679`</small>

### `fw_ext:shortcodes:collect_shortcodes_data` {#h-fw-ext-shortcodes-collect-shortcodes-data}
*🧪 filter*

Filters the collected structure of shortcode data, letting listeners register or augment shortcode metadata.

```php
add_filter( 'fw_ext:shortcodes:collect_shortcodes_data', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:423`</small>

### `fw_ext:shortcodes:config_shortcode` {#h-fw-ext-shortcodes-config-shortcode}
*🧪 filter*

Filters a shortcode's builder item config (icon, title template, popup size, localized labels) before it is registered.

```php
add_filter( 'fw_ext:shortcodes:config_shortcode', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:813`</small>

### `fw_newsletter_handled` {#h-fw-newsletter-handled}
*🧪 filter*

Filters whether a newsletter signup has already been handled by an integration, allowing the built-in admin notification email to be suppressed.

```php
add_filter( 'fw_newsletter_handled', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php:66`</small>

### `fw_newsletter_recipient` {#h-fw-newsletter-recipient}
*🧪 filter*

Filters the recipient email address for the newsletter-signup notification (default the site admin email).

```php
add_filter( 'fw_newsletter_recipient', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php:69`</small>

### `fw_newsletter_subscribe` {#h-fw-newsletter-subscribe}
*🎬 action*

Integrations (Mailchimp, etc.) hook here. Return a WP_Error from the `fw_newsletter_subscribe_result` filter to surface a failure to the user.

```php
add_action( 'fw_newsletter_subscribe', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php:56`</small>

### `fw_newsletter_subscribe_result` {#h-fw-newsletter-subscribe-result}
*🧪 filter*

Filters the newsletter subscription result; return a WP_Error to surface a failure message to the user.

```php
add_filter( 'fw_newsletter_subscribe_result', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php:58`</small>

### `fw_option_type_table_allowed_cell_html` {#h-fw-option-type-table-allowed-cell-html}
*🧪 filter*

Filters the list of inline HTML tags/attributes allowed inside a table option cell.

```php
add_filter( 'fw_option_type_table_allowed_cell_html', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/table/includes/fw-option-type-table/class-fw-option-type-table.php:20`</small>

### `fw_option_type_table_defaults` {#h-fw-option-type-table-defaults}
*🧪 filter*

Filters the default option definitions used by the table option type's header/body settings.

```php
add_filter( 'fw_option_type_table_defaults', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/table/includes/fw-option-type-table/class-fw-option-type-table.php:501`</small>

### `fw_sc_design_pack_enabled` {#h-fw-sc-design-pack-enabled}
*🧪 filter*

Filters whether an installed design pack (for a shortcode tag/key) is enabled, letting code override the per-shortcode disabled toggle.

```php
add_filter( 'fw_sc_design_pack_enabled', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/pluggable-designs.php:176`</small>

### `fw_sc_designs` {#h-fw-sc-designs}
*🧪 filter*

Filters the merged registry of available designs discovered for a shortcode tag, letting code add, remove, or alter design entries.

```php
add_filter( 'fw_sc_designs', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/pluggable-designs.php:162`</small>

### `fw_sc_display_conditions` {#h-fw-sc-display-conditions}
*🧪 filter*

Filters the boolean visibility decision for a builder element, letting code override whether it renders based on its display-condition atts.

```php
add_filter( 'fw_sc_display_conditions', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-get-option-helpers.php:313`</small>

### `fw_sc_svg_upload_allowed` {#h-fw-sc-svg-upload-allowed}
*🧪 filter*

Filters whether the current context may upload SVGs, letting a trusted flow lift the manage_options gate without an admin user.

```php
add_filter( 'fw_sc_svg_upload_allowed', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3384`</small>

### `fw_shortcode_atts` {#h-fw-shortcode-atts}
*🧪 filter*

Filters raw shortcode attributes before rendering (deprecated since Shortcodes 1.3.0), allowing legacy attribute adjustment.

```php
add_filter( 'fw_shortcode_atts', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcode.php:190`</small>

### `fw_shortcode_column_thumbnails_data` {#h-fw-shortcode-column-thumbnails-data}
*🧪 filter*

Filters the column-width thumbnail data offered in the page builder, letting code add or alter available column layouts.

```php
add_filter( 'fw_shortcode_column_thumbnails_data', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php:82`</small>

### `fw_shortcode_get_options` {#h-fw-shortcode-get-options}
*🧪 filter*

Filters a shortcode's option definitions after they are loaded from options.php, keyed by tag, letting code adjust its options.

```php
add_filter( 'fw_shortcode_get_options', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcode.php:135`</small>

### `fw_shortcode_lottie_library_src` {#h-fw-shortcode-lottie-library-src}
*🧪 filter*

Filters the URL of the vendored lottie-web library script, letting a site swap in a CDN or the full canvas-renderer build.

```php
add_filter( 'fw_shortcode_lottie_library_src', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/lottie/static.php:10`</small>

### `fw_shortcode_map_provider` {#h-fw-shortcode-map-provider}
*🧪 filter*

Filters the registered map location providers, letting code add or modify map data sources and their callbacks/options.

```php
add_filter( 'fw_shortcode_map_provider', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/map/class-fw-shortcode-map.php:22`</small>

### `fw_shortcode_render_view` {#h-fw-shortcode-render-view}
*🧪 filter*

Filters the before/after wrapper markup applied around a shortcode's rendered view, keyed by atts and tag.

```php
add_filter( 'fw_shortcode_render_view', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcode.php:216`</small>

### `fw_shortcode_render_view:atts` {#h-fw-shortcode-render-view-atts}
*🧪 filter*

Filters the attributes passed into a shortcode's view template at render time, letting code adjust per-tag render data.

```php
add_filter( 'fw_shortcode_render_view:atts', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcode.php:229`</small>

### `fw:ext:shortcodes:column:value-from-attributes` {#h-fw-ext-shortcodes-column-value-from-attributes}
*🧪 filter*

Filters the column item's parsed attribute values derived from its shortcode attributes.

```php
add_filter( 'fw:ext:shortcodes:column:value-from-attributes', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php:128`</small>

### `fw:ext:shortcodes:enqueue_custom_content` {#h-fw-ext-shortcodes-enqueue-custom-content}
*🎬 action*

Fires when shortcode static assets are enqueued into the front-end head, letting extensions add head-time statics.

```php
add_action( 'fw:ext:shortcodes:enqueue_custom_content', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:582`</small>

### `fw:ext:shortcodes:enqueue_shortcodes_static:after` {#h-fw-ext-shortcodes-enqueue-shortcodes-static-after}
*🎬 action*

Fires after a post's shortcode static assets are enqueued, passing the post content for follow-up work.

```php
add_action( 'fw:ext:shortcodes:enqueue_shortcodes_static:after', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:608`</small>

### `fw:ext:shortcodes:enqueue_shortcodes_static:before` {#h-fw-ext-shortcodes-enqueue-shortcodes-static-before}
*🎬 action*

Fires before a post's shortcode static assets are enqueued, passing the post content for preparation.

```php
add_action( 'fw:ext:shortcodes:enqueue_shortcodes_static:before', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/class-fw-extension-shortcodes.php:596`</small>

### `fw:ext:shortcodes:enqueue-shortcodes-admin-scripts` {#h-fw-ext-shortcodes-enqueue-shortcodes-admin-scripts}
*🎬 action*

Fires after every shortcode's option statics are enqueued in admin, so extensions can enqueue their own admin scripts.

```php
add_action( 'fw:ext:shortcodes:enqueue-shortcodes-admin-scripts', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/helpers.php:65`</small>

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

Filters the sorted list of default shortcodes available in the WP editor.

```php
add_filter( 'fw:ext:wp-shortcodes:sort', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/extensions/wp-shortcodes/class-fw-extension-wp-shortcodes.php:62`</small>

### `sc_anim_collection_items` {#h-sc-anim-collection-items}
*🧪 filter*

Filters the broad registry mapping collection element base classes to their item selectors for scroll-animation cascades.

```php
add_filter( 'sc_anim_collection_items', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:683`</small>

### `sc_anim_stagger_ms` {#h-sc-anim-stagger-ms}
*🧪 filter*

Filters the default per-item stagger delay in milliseconds for a collection's animation cascade, keyed by base class and atts.

```php
add_filter( 'sc_anim_stagger_ms', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:771`</small>

### `sc_animation_fields` {#h-sc-animation-fields}
*🧪 filter*

Filters the shortcode animation option fields, letting the Animation Engine append Scroll Motion and Hover field groups when active.

```php
add_filter( 'sc_animation_fields', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:447`</small>

### `sc_build_wrapper_attr` {#h-sc-build-wrapper-attr}
*🧪 filter*

Filters the assembled HTML attribute array for a shortcode wrapper element before it is rendered.

```php
add_filter( 'sc_build_wrapper_attr', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-build-helper.php:277`</small>

### `sc_hover_collection_items` {#h-sc-hover-collection-items}
*🧪 filter*

Filters the narrower registry mapping collection element base classes to their item selectors for per-card hover interactions.

```php
add_filter( 'sc_hover_collection_items', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-animation-helper.php:711`</small>

### `sc_icon_svg_library_fallback_ids` {#h-sc-icon-svg-library-fallback-ids}
*🧪 filter*

Let themes/extensions add their own recovery ids for an icon id. Return an array of '&lt;pack&gt;/&lt;name&gt;' candidates, tried in order.

```php
add_filter( 'sc_icon_svg_library_fallback_ids', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3351`</small>

### `sc_icon_svg_library_markup` {#h-sc-icon-svg-library-markup}
*🧪 filter*

Filters the resolved SVG markup for a built-in library icon id, letting code override or patch an icon's glyph.

```php
add_filter( 'sc_icon_svg_library_markup', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3303`</small>

### `sc_needs_wrapper` {#h-sc-needs-wrapper}
*🧪 filter*

Filters whether a shortcode's styling atts require a wrapper element, defaulting to false so custom atts can force one.

```php
add_filter( 'sc_needs_wrapper', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:1879`</small>

### `sc_notification_default_icons` {#h-sc-notification-default-icons}
*🧪 filter*

Filters the default per-type icon classes (primary, success, warning, etc.) used by the notification shortcode.

```php
add_filter( 'sc_notification_default_icons', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/notification/views/view.php:62`</small>

### `sc_notification_default_labels` {#h-sc-notification-default-labels}
*🧪 filter*

Filters the default per-type heading labels (Note!, Success!, Warning!, etc.) used by the notification shortcode.

```php
add_filter( 'sc_notification_default_labels', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/notification/views/view.php:50`</small>

### `sc_posts_query_args` {#h-sc-posts-query-args}
*🧪 filter*

Filters the WP_Query args built by the posts shortcode before the query runs, letting code adjust which posts are fetched.

```php
add_filter( 'sc_posts_query_args', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/shortcodes/posts/views/view.php:304`</small>

### `sc_rating_star_paths` {#h-sc-rating-star-paths}
*🧪 filter*

Filters the map of rating symbol shapes (star, heart, circle) with their viewBox and SVG path, to add or replace symbols.

```php
add_filter( 'sc_rating_star_paths', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3543`</small>

### `sc_rating_star_svg` {#h-sc-rating-star-svg}
*🧪 filter*

Filters the inner SVG markup for a rating symbol, allowing a full path/markup override per symbol before the sprite is built.

```php
add_filter( 'sc_rating_star_svg', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:3597`</small>

### `sc_section_background_effects` {#h-sc-section-background-effects}
*🧪 filter*

Filters the registry of available section background effects, letting extensions register additional effect definitions.

```php
add_filter( 'sc_section_background_effects', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-background-helper.php:148`</small>

### `sc_smooth_scroll_post_types` {#h-sc-smooth-scroll-post-types}
*🧪 filter*

Filters which post types (default page and post) get the per-page smooth-scroll toggle metabox in the editor.

```php
add_filter( 'sc_smooth_scroll_post_types', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-smooth-scroll.php:27`</small>

### `sc_theme_provides_settings_ui` {#h-sc-theme-provides-settings-ui}
*🧪 filter*

Filters whether the active theme ships the Unyson+ Theme Settings UI, so third-party themes can declare their own support.

```php
add_filter( 'sc_theme_provides_settings_ui', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:112`</small>

### `sc_theme_settings_url` {#h-sc-theme-settings-url}
*🧪 filter*

Filters the admin URL (with tab anchor) pointing to the theme's settings page for a given context.

```php
add_filter( 'sc_theme_settings_url', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/shortcode-styling-helper.php:93`</small>

### `unysonplus_components_settings_options` {#h-unysonplus-components-settings-options}
*🧪 filter*

Filters the Components settings tab definitions (Color Presets, Text Styles, Spacing, Buttons) for the theme settings UI.

```php
add_filter( 'unysonplus_components_settings_options', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/components-options.php:66`</small>

### `unysonplus_design_enabled_shortcodes` {#h-unysonplus-design-enabled-shortcodes}
*🧪 filter · 2 call sites*

Filters the fallback list of shortcodes allowed to carry design library presets when the primary resolver is unavailable.

```php
add_filter( 'unysonplus_design_enabled_shortcodes', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/design-presets/design-library.php:66`</small>

### `unysonplus_editor_list_formats` {#h-unysonplus-editor-list-formats}
*🧪 filter*

Filters the styled-list format definitions (Pros, Cons, Steps, Arrow) offered in the TinyMCE list-styles menu.

```php
add_filter( 'unysonplus_editor_list_formats', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcodes-editor.php:56`</small>

### `unysonplus_force_list_styles_css` {#h-unysonplus-force-list-styles-css}
*🧪 filter*

Filters whether to force-load the fw-list-* styled-list CSS, for dynamic content that injects styled lists outside the main post.

```php
add_filter( 'unysonplus_force_list_styles_css', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/class-fw-shortcodes-editor.php:115`</small>

### `upw_sc_lib_catalog_url` {#h-upw-sc-lib-catalog-url}
*🧪 filter*

Filters the remote shortcode-library catalog URL, letting a developer point at a local copy.

```php
add_filter( 'upw_sc_lib_catalog_url', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/library/installer.php:23`</small>

### `upw_sc_lib_install_dir` {#h-upw-sc-lib-install-dir}
*🧪 filter*

Filters the directory library shortcodes install into (the active theme's shortcodes customization tree).

```php
add_filter( 'upw_sc_lib_install_dir', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/library/installer.php:33`</small>

← Back to [Hooks overview](./index.md)
