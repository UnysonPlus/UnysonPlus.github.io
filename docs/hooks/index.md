---
title: "Hooks & Filters"
slug: /hooks
---

# Hooks & Filters

Unyson+ exposes WordPress actions and filters so themes and extensions can extend the
framework.

:::tip Auto-generating this reference
Because hooks are defined in code with docblocks, you can auto-generate this page from the
plugin source using a tool like
[pronamic/wp-documentor](https://github.com/pronamic/wp-documentor) or
[wp-hooks-generator](https://github.com/johnbillion/wp-hooks-generator), then paste the
output here. The user-facing guide stays hand-written; only the reference is generated.
:::

## Actions

### General

- `fw_init` - The framework is fully loaded and you can safely access any of its components. Useful when you need to init some theme components only when the framework is installed.

  > ``` php
  > add_action('fw_init', '_action_theme_fw_init');
  > function _action_theme_fw_init() {
  >     $value = fw_get_db_customizer_option('hello');
  >     // fw()->...
  > }
  > ```

- `fw_backend_add_custom_settings_menu` - Change **Theme Settings** menu. You can register the menu yourself as a top or sub menu, then the script will detect if it was registered (by slug) and will skip the default internal register.

  > ``` php
  > add_action('fw_backend_add_custom_settings_menu', '_action_theme_custom_fw_settings_menu');
  > function _action_theme_custom_fw_settings_menu($data) {
  >     add_menu_page(
  >         __( 'Awesome Settings', '{domain}' ),
  >         __( 'Awesome Settings', '{domain}' ),
  >         $data['capability'],
  >         $data['slug'],
  >         $data['content_callback']
  >     );
  > }
  > ```

- `fw_backend_add_custom_extensions_menu` - Change **Unyson+** menu. Works the same as previous action.

### Assets Enqueue

- `fw_admin_enqueue_scripts:settings` - Enqueue assets only in **Theme Settings** page.

  > ``` php
  > add_action('fw_admin_enqueue_scripts:settings', '_action_theme_enqueue_scripts_theme_settings');
  > function _action_theme_enqueue_scripts_theme_settings() {
  >     wp_enqueue_script(
  >         'theme-settings-scripts',
  >         get_template_directory_uri() .'/js/admin-theme-settings.js',
  >         array('fw'),
  >         fw()->theme->manifest->get_version(),
  >         true
  >     );
  > }
  > ```

- `fw_admin_enqueue_scripts:customizer` - Enqueue assets only in **Customizer** page.

- `fw_admin_enqueue_scripts:post` - Enqueue assets only in **Post Edit** page.

  > ``` php
  > add_action('fw_admin_enqueue_scripts:post', '_action_theme_enqueue_scripts_post_edit');
  > function _action_theme_enqueue_scripts_post_edit(WP_Post $post) {
  >     if ($post->post_type == 'page') {
  >         wp_enqueue_script(
  >             'page-edit-scripts',
  >             get_template_directory_uri() .'/js/admin-page-edit.js',
  >             array('fw'),
  >             fw()->theme->manifest->get_version(),
  >             true
  >         );
  >     }
  > }
  > ```

- `fw_admin_enqueue_scripts:term` - Enqueue assets only in **Taxonomy Term Edit** page.

  > ``` php
  > add_action('fw_admin_enqueue_scripts:term', '_action_theme_enqueue_scripts_term_edit');
  > function _action_theme_enqueue_scripts_term_edit($taxonomy) {
  >     if ($taxonomy == 'category') {
  >         wp_enqueue_script(
  >             'category-edit-scripts',
  >             get_template_directory_uri() .'/js/admin-category-edit.js',
  >             array('fw'),
  >             fw()->theme->manifest->get_version(),
  >             true
  >         );
  >     }
  > }
  > ```

### Database

- `fw_post_options_update` - After database post option or all options were updated. The description of parameters can be found here.

  > ``` php
  > add_action('fw_post_options_update', '_action_theme_fw_post_options_update', 10, 4);
  > function _action_theme_fw_post_options_update($post_id, $option_id, $sub_keys, $old_value) {
  >     if ($option_id === 'hello' && empty($sub_keys)) {
  >         // do something ...
  >     }
  > }
  > ```

## Filters

### General

- `fw_framework_customizations_dir_rel_path` - Relative path of the customizations directory located in theme. By default it is `/framework-customizations`.

  > ``` php
  > add_filter(
  >     'fw_framework_customizations_dir_rel_path',
  >     '_filter_theme_fw_customizations_dir_rel_path'
  > );
  > function _filter_theme_fw_customizations_dir_rel_path($rel_path) {
  >     /**
  >      * Make the directory name shorter. Instead of
  >      * {theme}/framework-customizations/theme/options/post.php
  >      * will be
  >      * {theme}/fw/theme/options/post.php
  >      */
  >     return '/fw';
  > }
  > ```

- `fw_ext_mngr_github_branch` - The GitHub branch an extension is downloaded/updated from.

  > ``` php
  > add_filter( 'fw_ext_mngr_github_branch', function ( $branch, $user_repo ) {
  >     return 'main';
  > }, 10, 2 );
  > ```

### Options

- `fw_settings_options` - Theme **Settings Options**, which are loaded from `{theme}/framework-customizations/theme/options/settings.php`

  > ``` php
  > add_filter('fw_settings_options', '_filter_theme_fw_settings_options');
  > function _filter_theme_fw_settings_options($options) {
  >     $options['extra-tab'] = array(
  >         'type' => 'tab',
  >         'title' => __('Extra Tab', 'domain'),
  >         'options' => array(
  >             'test' => array('type' => 'text'),
  >         ),
  >     );
  >
  >     return $options;
  > }
  > ```

- `fw_customizer_options` - Theme **Customizer Options**, which are loaded from `{theme}/framework-customizations/theme/options/customizer.php`

  > ``` php
  > add_filter('fw_customizer_options', '_filter_theme_fw_customizer_options');
  > function _filter_theme_fw_customizer_options($options) {
  >     $options['extra-option'] = array('type' => 'text');
  >
  >     return $options;
  > }
  > ```

- `fw_post_options` - **Post Options**, which are loaded from `{theme}/framework-customizations/theme/options/posts/{post-type}.php`

  > ``` php
  > add_filter('fw_post_options', '_filter_theme_fw_post_options', 10, 2);
  > function _filter_theme_fw_post_options($options, $post_type) {
  >     if ($post_type == 'page') {
  >         $options['extra-option'] = array('type' => 'text');
  >     }
  >
  >     return $options;
  > }
  > ```

- `fw_taxonomy_options` - **Taxonomy Term Options**, which are loaded from `{theme}/framework-customizations/theme/options/taxonomies/{taxonomy}.php`

  > ``` php
  > add_filter('fw_taxonomy_options', '_filter_theme_fw_taxonomy_options', 10, 2);
  > function _filter_theme_fw_taxonomy_options($options, $taxonomy) {
  >     if ($taxonomy == 'category') {
  >         $options['extra-option'] = array('type' => 'text');
  >     }
  >
  >     return $options;
  > }
  > ```

- `fw_shortcode_get_options` - **Page builder shortcodes options**, can be loaded from anywhere functions.php, your php file but before wordpress hook `add_meta_boxes`

  > ``` php
  > add_action( 'fw_shortcode_get_options', '_filter_theme_fw_shortcode_get_options', 10, 2 );
  > function _filter_theme_fw_shortcode_get_options( $options, $shortcode ) {
  >
  >     $options = array(
  >         'default_options' => array(
  >             'type'    => 'tab',
  >             'options' => $options, // Add default options to the first tab.
  >             'title'   => __( 'Tab with default shortcode options', '{domain}' ),
  >             'attr'    => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
  >         ),
  >         'new_tab_options'          => array(
  >             'type'    => 'tab',
  >             'options' => array(
  >                 'option_id' => array( 'type' => 'text' ),
  >             ),
  >             'title'   => __( 'Tab with our custom options', '{domain}' ),
  >             'attr'    => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
  >         )
  >     );
  >
  >     return $options;
  > }
  > ```
