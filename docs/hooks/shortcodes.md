---
title: "Shortcode & element hooks"
sidebar_position: 5
---

# Shortcode & element hooks

Hooks fired by the **Shortcodes** extension and individual elements: altering a shortcode's options before the modal renders, filtering an element's atts/HTML at render time, registering shortcode data for the builder, and the dynamic-content token pass.

The most common one adds or wraps an element's options:

```php
add_filter( 'fw_shortcode_get_options', function ( $options, $shortcode ) {
    if ( $shortcode === 'button' ) {
        $options['my_extra'] = array( 'type' => 'text', 'label' => 'Extra' );
    }
    return $options;
}, 10, 2 );
```

To transform an element's resolved atts at render time (where dynamic-content tokens resolve), hook `fw_shortcode_render_view:atts`.

### Actions (6)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_shortcodes_enqueue_static_before` | _see source_ | (@since 1.3.26) |
| `fw_ext_shortcodes_enqueue_static:` | _see source_ | _unysonplus/framework/extensions/shortcodes/class-fw-extension-shortcodes.php_ |
| `fw_ext_shortcodes_enqueue_static:button` | _see source_ | Must be exactly the same as https://github.com/ThemeFuse/Unyson-Shortcodes-Extension/blob/v1.3.19/class-fw-extension-shortcodes.php#L226-L237 |
| `fw_newsletter_subscribe` | `$email, $name, $list` | Integrations (Mailchimp, etc.) hook here. Return a WP_Error from the `fw_newsletter_subscribe_result` filter to surface a failure to the user. |
| `fw:ext:shortcodes:enqueue_custom_content` | — | _unysonplus/framework/extensions/shortcodes/class-fw-extension-shortcodes.php_ |
| `fw:ext:shortcodes:enqueue-shortcodes-admin-scripts` | — | _unysonplus/framework/extensions/shortcodes/helpers.php_ |

### Filters (28)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_shortcodes_coders` | `array()` | _unysonplus/framework/extensions/shortcodes/class-fw-extension-shortcodes.php_ |
| `fw_ext_shortcodes_column_description` | _see source_ | _unysonplus/framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php_ |
| `fw_ext_shortcodes_column_title` | `$value['title'], $key` | _unysonplus/framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php_ |
| `fw_ext_shortcodes_disable_shortcodes` | `array()` | _unysonplus/framework/extensions/shortcodes/class-fw-extension-shortcodes.php_ |
| `fw_ext_shortcodes_table_max_columns` | `6` | _unysonplus/framework/extensions/shortcodes/shortcodes/table/includes/fw-option-type-table/class-fw-option-type-table.php_ |
| `fw_ext:shortcodes:collect_shortcodes_data` | `$structure` | _unysonplus/framework/extensions/shortcodes/class-fw-extension-shortcodes.php_ |
| `fw_ext:shortcodes:config_shortcode` | `$config, $tag` | _unysonplus/framework/extensions/shortcodes/class-fw-extension-shortcodes.php_ |
| `fw_newsletter_handled` | `false, $email, $name, $list` | Notify the site (uses the Mailer extension's SMTP through wp_mail). `fw_newsletter_handled` lets an integration suppress this email. |
| `fw_newsletter_recipient` | `get_option( 'admin_email' ), $email, $list` | _unysonplus/framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php_ |
| `fw_newsletter_subscribe_result` | `true, $email, $name, $list` | _unysonplus/framework/extensions/shortcodes/shortcodes/newsletter/class-fw-shortcode-newsletter.php_ |
| `fw_option_type_table_allowed_cell_html` | _see source_ | _unysonplus/framework/extensions/shortcodes/shortcodes/table/includes/fw-option-type-table/class-fw-option-type-table.php_ |
| `fw_option_type_table_defaults` | _see source_ | _unysonplus/framework/extensions/shortcodes/shortcodes/table/includes/fw-option-type-table/class-fw-option-type-table.php_ |
| `fw_shortcode_atts` | `$atts, $content, $this->tag` | @deprecated Since Shortcodes 1.3.0 |
| `fw_shortcode_column_thumbnails_data` | `$column_thumbnails` | _unysonplus/framework/extensions/shortcodes/shortcodes/column/includes/page-builder-column-item/class-page-builder-column-item.php_ |
| `fw_shortcode_get_options` | `$this->options, $this->tag` | _unysonplus/framework/extensions/shortcodes/includes/class-fw-shortcode.php_ |
| `fw_shortcode_map_provider` | _see source_ | _unysonplus/framework/extensions/shortcodes/shortcodes/map/class-fw-shortcode-map.php_ |
| `fw_shortcode_render_view` | _see source_ | _unysonplus/framework/extensions/shortcodes/includes/class-fw-shortcode.php_ |
| `fw_shortcode_render_view:atts` | `$atts, $this->tag` | _unysonplus/framework/extensions/shortcodes/includes/class-fw-shortcode.php_ |
| `fw:ext:shortcodes:table:button-shortcode-name` | `'button'` | If you disable default shortcode 'button' and create your own shortcode use this filter to specify its name. Fixes https://github.com/ThemeFuse/Unyson/issues/2056 |
| `sc_needs_wrapper` | `false, $atts` | _unysonplus/framework/extensions/shortcodes/includes/shortcode-styling-helper.php_ |
| `sc_notification_default_icons` | _see source_ | _unysonplus/framework/extensions/shortcodes/shortcodes/notification/views/view.php_ |
| `sc_notification_default_labels` | _see source_ | _unysonplus/framework/extensions/shortcodes/shortcodes/notification/views/view.php_ |
| `sc_posts_query_args` | `$args, $atts` | 'pin_top' and 'ignore' are handled at render time / via ignore_sticky_posts already set. |
| `sc_smooth_scroll_post_types` | `[ 'page', 'post' ]` | _unysonplus/framework/extensions/shortcodes/includes/shortcode-smooth-scroll.php_ |
| `sc_theme_settings_url` | `$url, $context` | _unysonplus/framework/extensions/shortcodes/includes/shortcode-styling-helper.php_ |
| `unysonplus_components_settings_options` | _see source_ | _unysonplus/framework/extensions/shortcodes/includes/components-options.php_ |
| `unysonplus_editor_list_formats` | `$styles` | _unysonplus/framework/extensions/shortcodes/includes/class-fw-shortcodes-editor.php_ |
| `unysonplus_force_list_styles_css` | `false` | _unysonplus/framework/extensions/shortcodes/includes/class-fw-shortcodes-editor.php_ |

