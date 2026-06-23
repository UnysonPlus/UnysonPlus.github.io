---
title: "Per-extension hooks"
sidebar_position: 8
---

# Per-extension hooks

Hooks fired by individual bundled extensions. Each section below covers one extension; the hook is only available when that extension is active (`fw()->extensions->get( '<name>' )`). Grouped by extension so you can jump straight to the one you're extending.

## Breadcrumbs extension

### Actions (0)

_None._

### Filters (11)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_breadcrumbs_args` | `$args` | _unysonplus/framework/extensions/breadcrumbs/class-fw-extension-breadcrumbs.php_ |
| `fw_ext_breadcrumbs_build` | `$return` | } |
| `fw_ext_breadcrumbs_current_page` | `[]` | _unysonplus/framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php_ |
| `fw_ext_breadcrumbs_date_day_format` | `'d F Y'` | _unysonplus/framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php_ |
| `fw_ext_breadcrumbs_date_month_format` | `'F Y'` | _unysonplus/framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php_ |
| `fw_ext_breadcrumbs_date_year_format` | `'Y'` | _unysonplus/framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php_ |
| `fw_ext_breadcrumbs_items` | `$items, $args` | _unysonplus/framework/extensions/breadcrumbs/class-fw-extension-breadcrumbs.php_ |
| `fw_ext_breadcrumbs_search_query` | `get_search_query()` | _unysonplus/framework/extensions/breadcrumbs/includes/class-breadcrumbs-builder.php_ |
| `fw_ext_breadcrumbs_settings_options_default_values` | _see source_ | _unysonplus/framework/extensions/breadcrumbs/settings-options.php_ |
| `fw:ext:breadcrumbs:settings-options:after` | `[]` | _unysonplus/framework/extensions/breadcrumbs/settings-options.php_ |
| `fw:ext:breadcrumbs:settings-options:before` | `[]` | _unysonplus/framework/extensions/breadcrumbs/settings-options.php_ |


## Forms extension

### Actions (3)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_forms_frontend_submit` | _see source_ | _unysonplus/framework/extensions/forms/class-fw-extension-forms.php_ |
| `fw_option_type_form_builder_init` | — | _unysonplus/framework/extensions/forms/includes/option-types/form-builder/class-fw-option-type-form-builder.php_ |
| `fw:ext:contact-forms:sent` | `$entry_data` | _unysonplus/framework/extensions/forms/extensions/contact-forms/class-fw-extension-contact-forms.php_ |

### Filters (5)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw:ext:contact-forms:email:bcc` | `array( /* 'john@smith.com' => 'John Smith' */ )` | (@since 2.0.30) |
| `fw:ext:contact-forms:email:cc` | `array( /* 'john@smith.com' => 'John Smith' */ )` | (@since 2.0.30) |
| `fw:ext:forms:attr:class` | `$data['attr']['class'] ?? ''` | _unysonplus/framework/extensions/forms/class-fw-extension-forms.php_ |
| `fw:ext:forms:builder:load-item:form-header-title` | `true` | _unysonplus/framework/extensions/forms/extensions/contact-forms/shortcodes/contact-form/options.php_ |
| `fw:ext:forms:collect-uploads` | `array(), $shortcode_to_item` | _unysonplus/framework/extensions/forms/class-fw-extension-forms.php_ |


## Mega Menu extension

### Actions (0)

_None._

### Filters (7)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_mega_menu_container` | _see source_ | _unysonplus/framework/extensions/megamenu/includes/class-fw-ext-mega-menu-walker.php_ |
| `fw_ext_mega_menu_start_lvl_classes` | _see source_ | _unysonplus/framework/extensions/megamenu/includes/class-fw-ext-mega-menu-walker.php_ |
| `fw:ext:megamenu:enqueue-frontend-css` | `true` | Baseline front-end layout (opt-out via the filter below). |
| `fw:ext:megamenu:enqueue-icon-css` | `true` | Icon font for the front end — match whatever the configured icon picker stores. |
| `fw:ext:megamenu:icon-option` | _see source_ | _unysonplus/framework/extensions/megamenu/class-fw-extension-megamenu.php_ |
| `fw:ext:megamenu:label:item-options-btn` | `__('Settings', 'fw')` | _unysonplus/framework/extensions/megamenu/class-fw-extension-megamenu.php_ |
| `fw:ext:megamenu:start_el_item_content:disable` | `false, $item` | (@since 1.1.3) |


## Portfolio extension

### Actions (0)

_None._

### Filters (6)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_portfolio_category_name` | _see source_ | _unysonplus/framework/extensions/portfolio/class-fw-extension-portfolio.php_ |
| `fw_ext_portfolio_post_slug` | `$this->slug` | _unysonplus/framework/extensions/portfolio/class-fw-extension-portfolio.php_ |
| `fw_ext_portfolio_tag_name` | _see source_ | _unysonplus/framework/extensions/portfolio/class-fw-extension-portfolio.php_ |
| `fw_ext_portfolio_taxonomy_slug` | `$this->taxonomy_slug` | _unysonplus/framework/extensions/portfolio/class-fw-extension-portfolio.php_ |
| `fw_ext_projects_post_type_name` | _see source_ | _unysonplus/framework/extensions/portfolio/class-fw-extension-portfolio.php_ |
| `fw:ext:portfolio:enable-tags` | `$this->feature_enabled( 'enable_tags', false )` | _unysonplus/framework/extensions/portfolio/class-fw-extension-portfolio.php_ |


## Sidebars extension

### Actions (0)

_None._

### Filters (4)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_sidebars_conditional_tags` | `$this->config['select_options']['conditional_tags']` | _unysonplus/framework/extensions/sidebars/includes/class-fw-extension-sidebars-config.php_ |
| `fw_ext_sidebars_post_types` | _see source_ | _unysonplus/framework/extensions/sidebars/includes/class-fw-extension-sidebars-config.php_ |
| `fw_ext_sidebars_settings_options` | `array()` | _unysonplus/framework/extensions/sidebars/settings-options.php_ |
| `fw_ext_sidebars_taxonomies` | _see source_ | _unysonplus/framework/extensions/sidebars/includes/class-fw-extension-sidebars-config.php_ |


## Asset Optimizer extension

### Actions (0)

_None._

### Filters (4)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw:ext:asset-optimizer:css_exclude_handles` | `array(), $known` | Force-exclude CSS handles from combining (developer escape hatch). @param string[] $handles Extra handles to leave as separate requests. @param array    $known   The known handle => src map. |
| `fw:ext:asset-optimizer:js_exclude_handles` | `array()` | Force-exclude JS handles from combining (developer escape hatch). @param string[] $handles Handles to never fold into the bundle. |
| `fw:ext:asset-optimizer:settings-options:after` | `array()` | _unysonplus/framework/extensions/asset-optimizer/settings-options.php_ |
| `fw:ext:asset-optimizer:settings-options:before` | `array()` | _unysonplus/framework/extensions/asset-optimizer/settings-options.php_ |


## Post Types extension

### Actions (0)

_None._

### Filters (3)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_post_types_args` | `$args, $slug, $def` | Filter the final register_post_type() args for a user-created post type. @param array  $args The arguments passed to register_post_type(). @param string $slug The post type key. @param array  $def  The raw saved definition row. |
| `fw_ext_post_types_taxonomy_args` | `$args, $slug, $object_types, $def` | Filter the final register_taxonomy() args for a user-created taxonomy. @param array    $args         The arguments passed to register_taxonomy(). @param string   $slug         The taxonomy key. @param string[] $object_types Post type keys the taxonomy is bound to. @param array... |
| `fw_unysonplus_admin_submenu_order` | _see source_ | The leading order of the Unyson+ submenu, by page slug. The parent slug itself is the "Extensions" landing item and stays on top. @param string[] $order |


## Mailer extension

### Actions (0)

_None._

### Filters (2)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_mailer_before_send` | `$email` | (@since 1.2.10) |
| `fw_ext_mailer_send_methods` | `array()` | _unysonplus/framework/extensions/mailer/class-fw-extension-mailer.php_ |


## Snippets extension

### Actions (0)

_None._

### Filters (1)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_ext_snippets_strip_auto_sections` | `true, $snippet_id` | _unysonplus/framework/extensions/snippets/helpers.php_ |


## Live Page Editor extension

### Actions (0)

_None._

### Filters (1)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `sc_build_wrapper_attr` | `$attr, $atts` | Non-destructive direct test: is our stamp filter registered, and does the deployed sc_build_wrapper_attr actually run it? sc_build_wrapper_attr is a pure array-builder (no side effects), and our filter just appends an attr. probeFired=false while stampHooked=true ⇒ the deploye... |


## WooCommerce extension

### Actions (0)

_None._

### Filters (1)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `upwc_wc_free_shipping_threshold` | `$threshold` | _unysonplus/framework/extensions/woocommerce/helpers.php_ |


