---
title: "Page Builder & builder hooks"
sidebar_position: 4
---

# Page Builder & builder hooks

Hooks fired by the **Page Builder** and the generic **builder** option type it extends. These let you alter the builder JSON correction pipeline (how loose items are wrapped into section → row → column), tweak column-width fitting, register custom item types, and hook the editor's enqueue/render points.

Most of these are advanced and fire during the shortcode-conversion / render pass. For the data flow they sit in, see [How the Page Builder works](/docs/page-builder/how-it-works). Example — adjust a column's effective width during correction:

```php
add_filter( 'fw:ext:page-builder:item-corrector:column-width', function ( $width, $column ) {
    return $width; // return a different N_M fraction to re-fit the row
}, 10, 2 );
```

## Page Builder

### Actions (1)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw:ext:page-builder:item-type:simple:enqueue_static` | — | _unysonplus/framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/item-types/simple/class-page-builder-simple-item.php_ |

### Filters (11)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_page_builder_content_wrapper_class` | `'fw-page-builder-content'` | _unysonplus/framework/extensions/shortcodes/extensions/page-builder/class-fw-extension-page-builder.php_ |
| `fw_ext_page_builder_settings_options` | `array()` | _unysonplus/framework/extensions/shortcodes/extensions/page-builder/settings-options.php_ |
| `fw_ext_page_builder_supported_post_types` | `$result` | _unysonplus/framework/extensions/shortcodes/extensions/page-builder/helpers.php_ |
| `fw_ext_page_builder_templates` | _see source_ | _unysonplus/framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php_ |
| `fw_ext_page-builder_custom_item_section_correction` | `$section[$i], $this, $fixed_section` | TODO: determine some good way to handle custom item types |
| `fw_ext_page-builder_items_correction_complete` | _see source_ | _unysonplus/framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/items-corrector/class-page-builder-items-corrector.php_ |
| `fw_page_builder_set_as_default` | `false` | _unysonplus/framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/class-fw-option-type-page-builder.php_ |
| `fw_page_builder_thumbs_before_display` | `$thumbs` | (@since 1.6.8) |
| `fw_section_like_types` | `self::$types` | _unysonplus/framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/item-types/class-fw-section-like-registry.php_ |
| `fw:ext:page-builder:generate-post-content-html` | `true, $post_id` | Just to create a revision if content was changed Also for SEO admin inspector and WP Search to work Note: Treat " because it create problems with slashes (" -&gt; \") and duplicate revisions |
| `fw:ext:page-builder:item-corrector:column-width` | `$section[ $i ]['width'], $section[ $i ]` | _unysonplus/framework/extensions/shortcodes/extensions/page-builder/includes/page-builder/includes/items-corrector/class-page-builder-items-corrector.php_ |


## Builder option type

### Actions (6)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_builder_fullscreen_add_backdrop` | — | _unysonplus/framework/extensions/builder/includes/option-types/builder/view.php_ |
| `fw_builder:` | — | _unysonplus/framework/extensions/builder/includes/option-types/builder/view.php_ |
| `fw_ext_builder:option_type:builder:before_enqueue` | _see source_ | _unysonplus/framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php_ |
| `fw_ext_builder:option_type:builder:enqueue` | _see source_ | _unysonplus/framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php_ |
| `fw_ext_builder:template_components_register` | — | _unysonplus/framework/extensions/builder/includes/option-types/builder/includes/templates/class-fw-ext-builder-templates.php_ |
| `fw_option_type_builder:` | — | (@since 1.2.4) |

### Filters (3)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_builder_fullscreen_add_classes` | `''` | _unysonplus/framework/extensions/builder/includes/option-types/builder/extends/class-fw-option-type-builder.php_ |
| `fw_builder_item_widths:` | `$widths` | _unysonplus/framework/extensions/builder/helpers.php_ |
| `fw_ext_builder:predefined_templates:` | _see source_ | _unysonplus/framework/extensions/builder/includes/option-types/builder/includes/templates/class-fw-ext-builder-templates-component.php_ |


