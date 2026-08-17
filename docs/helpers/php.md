---
title: "PHP Helpers"
sidebar_position: 2
---


## General

General PHP helpers:

- `fw_print($value)` - styled version of `print_r()`.

- `fw_html_tag($tag, array $attr, $end = null)` - generate html tag.

  > ``` php
  > echo fw_html_tag('script', array('src' => '/demo.js'), true);
  >
  > // <script src="/demo.js"></script>
  > ```

- `fw_attr_to_html(array $attr_array)` - generate html attributes from array.

  > ``` php
  > echo '<div '. fw_attr_to_html(array('id' => 'foo', 'class' => 'bar')) .'></div>';
  >
  > // <div id="foo" class="bar" ></div>
  > ```

- `fw_akg($keys, &$array_or_object, $default_value = null, $keys_delimiter = '/')` - get array multikey value.

  > > [!NOTE]
  > > **MultiKey** is a string composed from multiple array keys, separated by a delimiter character, that represents an array structure. For example
  > >
  > > ``` text
  > > 'a/b/c'
  > > ```
  > >
  > > represents
  > >
  > > ``` php
  > > array(
  > >     'a' => array(
  > >         'b' => array(
  > >             'c' => null
  > >         )
  > >     )
  > > )
  > > ```
  >
  > ``` php
  > $demo = array(
  >     'a' => array(
  >         'b' => 'hello'
  >     )
  >  );
  >
  > echo fw_akg('a/b', $demo);
  >
  > // 'hello'
  > ```

- `fw_aks($keys, $value, &$array_or_object, $keys_delimiter = '/')` - set a multikey value in array.

  > ``` php
  > $demo = array(
  >     'a' => array()
  > );
  >
  > fw_aks('a/b', 'hello', $demo);
  >
  > print_r($demo);
  >
  > /*
  > array(
  >     'a' => array(
  >         'b' => 'hello'
  >     )
  > )
  > */
  > ```

- `fw_aku($keys, &$array_or_object, $keys_delimiter = '/')` - unset a multikey from array.

  > ``` php
  > $demo = array(
  >     'a' => array(
  >         'b' => array()
  >     )
  > );
  >
  > fw_aku('a/b', $demo);
  >
  > print_r($demo);
  >
  > /*
  > array(
  >     'a' => array()
  > )
  > */
  > ```

- `fw_rand_md5()` - generate a random [md5](https://www.google.md/#q=what+is+md5).

- `fw_unique_increment()` - random number incremented every time you call the function.

  > ``` php
  > echo fw_unique_increment(), PHP_EOL;
  > echo fw_unique_increment(), PHP_EOL;
  > echo fw_unique_increment(), PHP_EOL;
  >
  > /*
  > 9370
  > 9371
  > 9372
  > */
  > ```

- `fw_stripslashes_deep_keys($value)` - strip slashes (recursive) from values and keys (if value is array) if `magic_quotes_gpc = On`.

- `fw_addslashes_deep_keys($value)` - add slashes (recursive) to values and keys (if value is array) if `magic_quotes_gpc = On`.

- `fw_current_screen_match($rules)` - check if current `global $current_screen;` (available in admin side) matches the given rules. Used to detect on which admin page you currently are. Thus you can for example enqueue a script only on a target page, not on all admin pages.

  > ``` php
  > /**
  >  * @internal
  >  */
  > function _action_enqueue_demo_admin_scripts() {
  >     // To find out what is the current screen of the current page, uncomment next line
  >     //global $current_screen; fw_print($current_screen);
  >
  >     $only = array(
  >         'only' => array(
  >             array( 'id' => 'dashboard' )
  >         )
  >     );
  >
  >     if (fw_current_screen_match($only)) {
  >         // enqueue this script only on dashboard page
  >         wp_enqueue_script(
  >             'demo-dashboard',
  >             get_template_directory_uri() .'/js/demo-only.js'
  >         );
  >     }
  >
  >     $exclude = array(
  >         'exclude' => array(
  >             array( 'id' => 'dashboard' ),
  >             array( 'post_type' => 'post' )
  >         )
  >     );
  >
  >     if (fw_current_screen_match($exclude)) {
  >         // enqueue this script on all admin pages
  >         // except dashboard page and all pages from posts menu (add, edit, categories, tags)
  >         wp_enqueue_script(
  >             'demo-dashboard',
  >             get_template_directory_uri() .'/js/demo-excluded.js'
  >         );
  >     }
  > }
  > add_action('admin_enqueue_scripts', '_action_enqueue_demo_admin_scripts');
  > ```
  >
  > > [!NOTE]
  > > You can combine `only` and `exclude` in the same rules array.

- `fw_locate_theme_path_uri($rel_path)` - search by relative path, in child then in parent theme directory, and return URI.

  > ``` php
  > echo fw_locate_theme_path_uri('/styles.css');
  >
  > // http://your-site.com/wp-content/themes/child-theme/style.css
  > ```

- `fw_locate_theme_path($rel_path)` - search by relative path, in child then in parent theme directory, and return full path.

  > ``` php
  > echo fw_locate_theme_path('/styles.css');
  >
  > // /var/www/wordpress/public_html/wp-content/themes/child-theme/style.css
  > ```

- `fw_render_view($file_path, $view_variables = array())` - safe render view and return html. In view will be accessible only passed variables, not current context variables.

  > ``` php
  > $private = 'Top Secret';
  >
  > echo fw_render_view(
  >     get_stylesheet_directory() .'/demo-view.php',
  >     array('message' => 'Hello')
  > );
  >
  > /* demo-view.php
  > <?php if (!defined('FW')) die('Forbidden');
  >
  > echo $message;
  > echo $private;
  > */
  >
  > // Hello
  > // Notice: Undefined variable: private
  > ```

- `fw_get_variables_from_file($file_path, array $variables)` - extract specified variables from file.

  > ``` php
  > $variables = fw_get_variables_from_file(
  >     get_stylesheet_directory() .'/demo-variables.php',
  >     array(
  >         'message' => 'Hi',
  >         'foo' => 'bar'
  >     )
  > );
  >
  > /* demo-variables.php
  > <?php if (!defined('FW')) die('Forbidden');
  >
  > $message = 'Hello';
  > */
  >
  > print_r($variables);
  >
  > /*
  > array(
  >     'message' => 'Hello',
  >     'foo' => 'bar'
  > )
  > */
  > ```

- `fw_include_file_isolated($file_path)` - include files isolated and don't give access to current context variables.

  > ``` php
  > $private = 'Top Secret';
  >
  > fw_include_file_isolated(get_stylesheet_directory() .'/demo-isolated.php');
  >
  > /* demo-isolated.php
  > <?php if (!defined('FW')) die('Forbidden');
  >
  > echo $private;
  > */
  >
  > // Notice: Undefined variable: private
  > ```

- `fw_html_attr_name_to_array_multi_key($attr_name)` - convert html `name` attribute to multikey.

  > ``` php
  > echo fw_html_attr_name_to_array_multi_key('a[b][c]');
  >
  > // 'a/b/c'
  > ```

- `fw_current_url()` - generate current page url from `$_SERVER` data.

- `fw_is_valid_domain_name($domain_name)` - check if a domain name is valid.

- `fw_htmlspecialchars($string)` - UTF-8 version of php's `htmlspecialchars()`. Just a shorthand not to write two more parameters for default `htmlspecialchars()` every time.

  > > [!NOTE]
  > > In php 5.2 `htmlspecialchars()` default encoding is not UTF-8.

- `fw_human_time($seconds)` - convert seconds to human readable time.

  > ``` php
  > echo fw_human_time(12345);
  >
  > // '3 hours'
  > ```

- `fw_human_bytes($bytes)` - convert bytes to human readable size.

  > ``` php
  > echo fw_human_bytes(12345);
  >
  > // '2.06 KB'
  > ```

- `fw_strlen($string)` - UTF-8 version of php's `strlen()`.

  > ``` php
  > echo strlen('Привет!'), PHP_EOL;
  > echo fw_strlen('Привет!'), PHP_EOL;
  >
  > // 13
  > // 7
  > ```

- `fw_fix_path($path)` - make sure a path is in unix style, with `/` directory separators.

- `fw_get_stylesheet_customizations_directory()` - Full path to the child-theme/framework-customizations directory.

- `fw_get_stylesheet_customizations_directory_uri()` - URI to the child-theme/framework-customizations directory.

- `fw_get_template_customizations_directory()` - Full path to the parent-theme/framework-customizations directory.

- `fw_get_template_customizations_directory_uri()` - URI to the parent-theme/framework-customizations directory.

- `fw_get_framework_directory()` - Full path to the parent-theme/framework directory.

- `fw_get_framework_directory_uri()` - URI to the parent-theme/framework directory

## Options

Functions for working with options:

- `fw_extract_only_options(array $options)` - extract only regular options from any array of options.

  > ``` php
  > $options = array(
  >     array(
  >         'type' => 'box',
  >         'options' => array(
  >             'demo-1' => array(
  >                 'type' => 'text'
  >             )
  >         )
  >     ),
  >     array(
  >         'type' => 'box',
  >         'options' => array(
  >             array(
  >                 'type' => 'tab',
  >                 'options' => array(
  >                     'demo-2' => array(
  >                         'type' => 'textarea'
  >                     )
  >                 )
  >             )
  >         )
  >     )
  > );
  >
  > print_r( fw_extract_only_options($options) );
  >
  > /*
  > array(
  >     'demo-1' => array(
  >         'type' => 'text'
  >     ),
  >     'demo-2' => array(
  >         'type' => 'textarea'
  >     )
  > )
  > */
  > ```

- `fw_get_options_values_from_input(array $options, $input_array = null)` - extract options values from input array. If no input array is provided, values from `$_POST` will be used.

  > ``` php
  > $options = array(
  >     'demo-1' => array( 'type' => 'text', 'value' => 'default value 1' ),
  >     'demo-2' => array( 'type' => 'text', 'value' => 'default value 2' ),
  > );
  >
  > $input_values = array(
  >     'demo-1' => 'input value 1',
  >     'demo-3' => 'input value 3',
  > );
  >
  > $values = fw_get_options_values_from_input($options, $input_values);
  >
  > print_r($values);
  >
  > /*
  > array(
  >     'demo-1' => 'input value 1',
  >     'demo-2' => 'default value 2',
  > )
  > */
  > ```

- `fw_prepare_option_value($value)` - by default WordPress offers filters for other plugins to alter database options and post meta. For ex translation plugins use these filters to translate things. If you save your options values in a custom place (like framework does by default, by saving options in a serialized array in database options and post meta) the WordPress filter doesn't know how to work with them.

  > > [!TIP]
  > > Use this function to pass an option value through filters and translation features that simulates WordPress default behavior. This function is already used in core so you don't have to bother about passing options values through it each time. Use it if you will do something custom and strings will not be translated.

## Database

- `fw_get_db_settings_option($option_id, $default_value = null)` - get value from the database of an option from the theme settings page. Settings options are located in `framework-customizations/theme/options/settings.php`.
- `fw_set_db_settings_option($option_id, $value)` - set a value in the database for an option from the theme settings page.

------------------------------------------------------------------------

- `fw_get_db_customizer_option($option_id, $default_value = null)` - get value from the database of an option from the customizer page. Customizer options are located in `framework-customizations/theme/options/customizer.php`.
- `fw_set_db_customizer_option($option_id, $value)` - set a value in the database for an option from the customizer page.

------------------------------------------------------------------------

- `fw_get_db_post_option($post_id, $option_id, $default_value = null)` - get a post option value from the database. Post options are located in `framework-customizations/theme/options/posts/{post-type}.php`.
- `fw_set_db_post_option($post_id, $option_id, $value)` - set a post option value in the database.

------------------------------------------------------------------------

- `fw_get_db_term_option($term_id, $taxonomy, $option_id, $default_value = null)` - get a term option value from the database. Term options are located in `framework-customizations/theme/options/taxonomies/{taxonomy}.php`.
- `fw_set_db_term_option($term_id, $taxonomy, $option_id, $value)` - set a term option value in the database.

------------------------------------------------------------------------

- `fw_get_db_ext_settings_option($extension_name, $option_id, $default_value = null)` - get extension settings option value from the database.
- `fw_set_db_ext_settings_option($extension_name, $option_id, $value)` - update extension settings option value in the database.
- `fw_get_db_extension_data($extension_name, $key, $default_value = null)` - get a value from the database of some private data stored by an extension.
- `fw_set_db_extension_data($extension_name, $key, $value)` - extensions uses this function to store private values in the database.

## Rate limiting

:::info[Added in core 2.16.20]
Use these on any endpoint reachable by logged-out visitors — anything registered with
`wp_ajax_nopriv_*`.
:::

A nonce is not a secret on a public page. It is printed into the HTML every visitor
receives, so anyone can read it and replay the endpoint as fast as they can open
connections. `check_ajax_referer()` proves a request came from a page you rendered; it
says nothing about how many times.

That matters wherever a request costs the site something — sending mail, running an
unbounded `WP_Query`, rendering a template.

```php
public function _ajax_subscribe() {
    check_ajax_referer( 'my_form', 'nonce' );

    // 5 requests per 10 minutes, per visitor. Ends the request with a 429
    // and a JSON error when exceeded.
    fw_rate_limit_ajax( 'my_form_subscribe', 5, 600 );

    // … the expensive part …
}
```

| Helper | Purpose |
| --- | --- |
| `fw_rate_limit_ajax( $action, $limit, $window )` | One-line guard for an AJAX handler. Ends the request with HTTP **429** and a JSON error when the limit is passed. |
| `fw_rate_limit_exceeded( $action, $limit, $window )` | Counts a hit and returns `true` when the caller is over budget. Use when you want to handle the refusal yourself. |
| `fw_rate_limit_id()` | The salted-hash identity a limit is counted against. |

`$window` is in seconds. Pick limits from what a request *costs*, not from what feels
strict: the framework uses 5 per 10 minutes for newsletter signup (it sends mail on every
call) and 40–90 per minute for the query-backed endpoints.

### Behaviour worth knowing

- **The client IP is never stored in cleartext.** It is salted and hashed before use.
  Without a persistent object cache these counters live in the options table, and a
  throttle should not quietly accumulate a log of visitor IP addresses.
- **`REMOTE_ADDR` only.** `X-Forwarded-For` is caller-controlled unless a known proxy sets
  it, so trusting it by default would let anyone bypass every limit by varying one header.
  Behind a load balancer or CDN, supply the real address through
  `fw_rate_limit_client_ip` — and validate the proxy before trusting it.
- **Users who can `edit_posts` are exempt.** They are authenticated, already trusted with
  far more damaging capabilities, and are the people most likely to trip a limit while
  legitimately testing a form.
- **It fails open.** If the transient layer misbehaves, visitors keep working and the site
  loses throttling. The opposite choice would let a cache problem take the front end down.

### Filters

```php
// Loosen, tighten, or switch a limit off entirely (return 0 to disable).
add_filter( 'fw_rate_limit', function ( $limit, $action, $window ) {
    return 'my_form_subscribe' === $action ? 20 : $limit;
}, 10, 3 );

// Behind a reverse proxy you control:
add_filter( 'fw_rate_limit_client_ip', function ( $ip ) {
    return $my_validated_forwarded_ip ?: $ip;
} );
```

:::caution[This is a courtesy limiter, not a DDoS defence]
It runs inside PHP, so WordPress has already booted by the time it says no. Anything at
that scale belongs in front of the application — a CDN, a WAF, fail2ban. The goal here is
narrower: stop one visitor with a loop from flooding a mailbox or hammering the database.
:::

## Editor context

`fw_is_editor_context()` — whether the current request is an **editing surface** rather than a visitor page view.

Shortcode views use it to show authoring guidance that a visitor must never see — an empty-state hint, a "choose an image" placeholder, a warning that a required field is unset:

```php
if ( $poster === '' && $video === '' ) {
    if ( fw_is_editor_context() ) {
        return '<div class="fw-vp__empty">' . esc_html__( 'Add a poster image and a video URL.', 'fw' ) . '</div>';
    }

    return ''; // visitors get nothing
}
```

:::caution[Use this instead of `is_admin() || DOING_AJAX`]
That older test has a blind spot that only appears once an element is available as a **Gutenberg block**: `ServerSideRender` renders through the **REST API**, which is neither `is_admin()` nor `DOING_AJAX`.

A view guarded the old way returns nothing in a block preview, so the block shows Gutenberg's bare *"Block rendered as empty"* instead of the element's own guidance — which reads as a broken block.
:::

:::note[REST is narrowed, on purpose]
Only the block-renderer route counts as an editor. A public REST consumer fetching post content is a **visitor**, and must not receive editor-only markup — so accepting every `REST_REQUEST` would leak authoring hints into API output.
:::

Added in core 2.16.23.
