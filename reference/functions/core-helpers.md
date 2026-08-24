---
title: Core Helpers — functions
sidebar_label: Core Helpers
slug: /functions/core-helpers
description: Public PHP helper functions in the UnysonPlus Core Helpers subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Core Helpers — functions

**100 public functions.** 5 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_add_comment_meta`](#fw_add_comment_meta) | Add meta data field to a comment. |
| [`fw_add_metadata`](#fw_add_metadata) | Add metadata for the specified object. |
| [`fw_add_post_meta`](#fw_add_post_meta) | Add meta data field to a post. |
| [`fw_add_term_meta`](#fw_add_term_meta) | Add meta data field to a term. |
| [`fw_add_user_meta`](#fw_add_user_meta) | Add meta data field to a user. |
| [`fw_addslashes_deep_keys`](#fw_addslashes_deep_keys) | Add slashes to values, and to keys if magic_quotes_gpc = On |
| [`fw_akg`](#fw_akg) | Recursively find a key's value in array |
| [`fw_aks`](#fw_aks) | Set (or create if not exists) value for specified key in some array level |
| [`fw_aku`](#fw_aku) | Unset specified key in some array level |
| [`fw_attr_to_html`](#fw_attr_to_html) | Generate attributes string for html tag |
| [`fw_call`](#fw_call) | In the value is instance of FW_Callback class then it is executed and returns the callback value In other case function returns the provided value |
| [`fw_callback`](#fw_callback) | Recommend when the function call may require many resources or time (database requests) , or the value is small Not recommended using on very large values |
| [`fw_collect_first_level_options`](#fw_collect_first_level_options) | Collect correct options from the first level of the array and group them |
| [`fw_collect_options`](#fw_collect_options) | Recursively walks an options array and collects every option and container into the referenced result array. |
| [`fw_current_screen_match`](#fw_current_screen_match) | Check if current screen pass/match give rules |
| [`fw_current_url`](#fw_current_url) | Returns the full URL of the current request, resolved against the site home and cached statically. |
| [`fw_current_user_can`](#fw_current_user_can) | Check if current user has one capability from the given list |
| [`fw_db_option_storage_load`](#fw_db_option_storage_load) | Loads an option value through its configured fw-storage backend, or returns the value unchanged when none is set. |
| [`fw_db_option_storage_save`](#fw_db_option_storage_save) | Saves an option value through its configured fw-storage backend, or returns the value unchanged when none is set. |
| [`fw_db_option_storage_type`](#fw_db_option_storage_type) | Returns the registered option storage type instance for the given type, all types when none is given, or null. |
| [`fw_delete_comment_meta`](#fw_delete_comment_meta) | Remove metadata matching criteria from a comment. |
| [`fw_delete_metadata`](#fw_delete_metadata) | Deletes object metadata rows matching the given meta type, object, key and optional value. |
| [`fw_delete_post_meta`](#fw_delete_post_meta) | Remove metadata matching criteria from a post. |
| [`fw_delete_term_meta`](#fw_delete_term_meta) | Remove metadata matching criteria from a term. |
| [`fw_delete_user_meta`](#fw_delete_user_meta) | Remove metadata matching criteria from a user. |
| [`fw_dirname_to_classname`](#fw_dirname_to_classname) | Converts a hyphenated directory name into an underscore-separated class name (e.g. 'foo-bar' to 'Foo_Bar'). |
| [`fw_ext`](#fw_ext) | Returns the given URL with its scheme stripped down to a protocol-relative '//' prefix. |
| [`fw_extract_only_options`](#fw_extract_only_options) | Extract only input options (without containers) |
| [`fw_fix_path`](#fw_fix_path) | Convert to Unix style directory separators |
| [`fw_get_db_customizer_option`](#fw_get_db_customizer_option) | Get a customizer framework option value from the database |
| [`fw_get_db_ext_settings_option`](#fw_get_db_ext_settings_option) | Get extension's settings option value from the database |
| [`fw_get_db_extension_data`](#fw_get_db_extension_data) | Get extension's data from the database |
| [`fw_get_db_extension_user_data`](#fw_get_db_extension_user_data) | Get user meta set by specific extension |
| [`fw_get_db_post_option`](#fw_get_db_post_option) | Get post option value from the database |
| [`fw_get_db_settings_option`](#fw_get_db_settings_option) | Get a theme settings option value from the database |
| [`fw_get_db_term_option`](#fw_get_db_term_option) | Get term option value from the database |
| [`fw_get_framework_asset_uri`](#fw_get_framework_asset_uri) | URI to a framework asset, preferring its minified (.min) build when present. |
| [`fw_get_framework_customizations_dir_rel_path`](#fw_get_framework_customizations_dir_rel_path) | Relative path of the framework customizations directory |
| [`fw_get_framework_directory`](#fw_get_framework_directory) | Full path to the parent-theme/framework directory |
| [`fw_get_framework_directory_uri`](#fw_get_framework_directory_uri) | URI to the parent-theme/framework directory |
| [`fw_get_google_fonts`](#fw_get_google_fonts) | Returns the cached list of Google fonts keyed by family, with position metadata. |
| [`fw_get_google_fonts_v2`](#fw_get_google_fonts_v2) | Returns the Google fonts catalog as a JSON string, preferring the bundled static file. |
| [`fw_get_image_sizes`](#fw_get_image_sizes) | Return all images sizes register by add_image_size() merged with WordPress default image sizes. |
| [`fw_get_json_last_error_message`](#fw_get_json_last_error_message) | Returns a human-readable message for the last json_decode error, or null when there was none. |
| [`fw_get_mime_type_by_ext`](#fw_get_mime_type_by_ext) | Return mime_types by file extension ex : input : array( 'png', 'jpg', 'jpeg' ) =&gt; output : array( 'image/jpeg' ). |
| [`fw_get_options_errors_from_input`](#fw_get_options_errors_from_input) | Validates option input and returns a map of option ids to their validation error messages. |
| [`fw_get_options_values_from_input`](#fw_get_options_values_from_input) | Get correct values from input (POST) for given options This values can be saved in db then replaced with $option['value'] for each option |
| [`fw_get_path_url`](#fw_get_path_url) | fw_get_path_url( dirname(__FILE__) .'/test.css' ) --&gt; http://site.url/path/to/test.css |
| [`fw_get_stylesheet_customizations_directory`](#fw_get_stylesheet_customizations_directory) | Full path to the child-theme framework customizations directory |
| [`fw_get_stylesheet_customizations_directory_uri`](#fw_get_stylesheet_customizations_directory_uri) | URI to the child-theme framework customizations directory |
| [`fw_get_template_customizations_directory`](#fw_get_template_customizations_directory) | Full path to the parent-theme framework customizations directory |
| [`fw_get_template_customizations_directory_uri`](#fw_get_template_customizations_directory_uri) | URI to the parent-theme framework customizations directory |
| [`fw_get_term_meta`](#fw_get_term_meta) | Retrieve term meta field for a term. |
| [`fw_get_url_without_scheme`](#fw_get_url_without_scheme) | Returns the given URL with its scheme stripped down to a protocol-relative '//' prefix. |
| [`fw_get_variables_from_file`](#fw_get_variables_from_file) | Safe load variables from an file Use this function to not include files directly and to not give access to current context variables (like $this) |
| [`fw_html_attr_name_to_array_multi_key`](#fw_html_attr_name_to_array_multi_key) | Converts an HTML array-attribute name like 'hello[world]' into a slash-separated multikey path. |
| [`fw_html_tag`](#fw_html_tag) | Generate html tag |
| [`fw_htmlspecialchars`](#fw_htmlspecialchars) | Use this id do not want to enter every time same last two parameters Info: Cannot use default parameters because in php 5.2 encoding is not UTF-8 by default |
| [`fw_human_bytes`](#fw_human_bytes) | Convert bytes to human readable format |
| [`fw_human_time`](#fw_human_time) | Convert number of seconds to 'X &#123;units&#125;' |
| [`fw_id_to_title`](#fw_id_to_title) | Try to make user friendly title from an id |
| [`fw_image_tag`](#fw_image_tag) | Builds a responsive img tag for an attachment ID or image URL with sizing, srcset and loading hints. |
| [`fw_include_file_isolated`](#fw_include_file_isolated) | Use this function to not include files directly and to not give access to current context variables (like $this) |
| [`fw_is_built_asset`](#fw_is_built_asset) | Was this framework-relative source path minified by our build pipeline? |
| [`fw_is_callback`](#fw_is_callback) | Check is the current value is instance of FW_Callback class |
| [`fw_is_cli`](#fw_is_cli) | Check for command line interface |
| [`fw_is_editor_context`](#fw_is_editor_context) | Returns whether the current request is rendering for an editor (admin, AJAX, or block-renderer REST). |
| [`fw_is_post_edit`](#fw_is_post_edit) | If currently is a Post Edit page display/submit |
| [`fw_is_real_post_save`](#fw_is_real_post_save) | Returns whether the current save_post is a genuine Save rather than a revision or autosave (deprecated). |
| [`fw_is_valid_domain_name`](#fw_is_valid_domain_name) | Returns whether the given string is a syntactically valid domain name. |
| [`fw_locate_theme_path`](#fw_locate_theme_path) | Search relative path in child then in parent theme directory and return full path |
| [`fw_locate_theme_path_uri`](#fw_locate_theme_path_uri) | Search relative path in child then in parent theme directory and return URI |
| [`fw_make_stylesheet_portable`](#fw_make_stylesheet_portable) | Make stylesheet contents (portable) independent of directory location For e.g. replace relative paths 'url(img/bg.png)' with full paths 'url(http://site.com/assets/img/bg.png)' |
| [`fw_min_uri`](#fw_min_uri) | Rewrites a framework CSS/JS asset URI to its .min variant when a built minified file exists. |
| [`fw_multi_ext2type`](#fw_multi_ext2type) | Return types from file extensions ex : input array( 'png', 'jpg', 'zip' ) =&gt; output : array( 'image', 'archive' ). |
| [`fw_oembed_get`](#fw_oembed_get) | This function is a wrapper function that set correct width and height for iframes from wp_oembed_get() function |
| [`fw_prepare_option_value`](#fw_prepare_option_value) | Used when getting some option value from serialized array saved in a custom place and that option is unreachable for standard WordPress filters by other plugins For e.g. that option cannot be translated by plugins, so we pass its value through this function and do the fixes |
| [`fw_print`](#fw_print) | print_r() alternative |
| [`fw_rand_md5`](#fw_rand_md5) | Generate a random unique 32-char hex token. |
| [`fw_read_file_by_uri`](#fw_read_file_by_uri) | Try to find file path by its uri and read the file contents |
| [`fw_render_view`](#fw_render_view) | Safe render a view and return html In view will be accessible only passed variables Use this function to not include files directly and to not give access to current context variables (like $this) |
| [`fw_resize`](#fw_resize) | Resizes an image URL to the given dimensions via FW_Resize, returning the original URL on failure. |
| [`fw_secure_rand`](#fw_secure_rand) | Reference |
| [`fw_set_db_customizer_option`](#fw_set_db_customizer_option) | Set a theme customizer option value in database |
| [`fw_set_db_ext_settings_option`](#fw_set_db_ext_settings_option) | Set extension's setting option value in database |
| [`fw_set_db_extension_data`](#fw_set_db_extension_data) | Set some extension's data in database |
| [`fw_set_db_extension_user_data`](#fw_set_db_extension_user_data) | In case the extension doesn't exist or is disabled, or the value is equal to previous, returns false |
| [`fw_set_db_post_option`](#fw_set_db_post_option) | Set post option value in database |
| [`fw_set_db_settings_option`](#fw_set_db_settings_option) | Set a theme settings option value in database |
| [`fw_set_db_term_option`](#fw_set_db_term_option) | Set term option value in database |
| [`fw_string_to_icon_html`](#fw_string_to_icon_html) | @param array Additional attributes |
| [`fw_stripslashes_deep_keys`](#fw_stripslashes_deep_keys) | Strip slashes from values, and from keys if magic_quotes_gpc = On |
| [`fw_strlen`](#fw_strlen) | Returns the UTF-8 length of a string, using mb_strlen() when available. |
| [`fw_typography_size_css`](#fw_typography_size_css) | Resolve a typography `size` value to a CSS length string, tolerating every shape the value can take across the size_format migration: - a `unit-input` array array( 'value' =&gt; '1.5', 'unit' =&gt; 'rem' ) -&gt; "1.5rem" - a JSON string of that '&#123;"value":"24","unit":"px"&#125;' -&gt; "24px" - a legacy plain number 16 / "16" -&gt; "16px" - an already-typed CSS length string "1.25em" -&gt; passthrough - blank / false -&gt; '' So a size that predates the unit-input control (a bare integer) resolves exactly as before (+px), and a new unit-input value keeps its chosen unit. |
| [`fw_unique_increment`](#fw_unique_increment) | Returns a per-request incrementing counter, unique within the current page load. |
| [`fw_update_comment_meta`](#fw_update_comment_meta) | Update comment meta field based on comment ID. |
| [`fw_update_metadata`](#fw_update_metadata) | Update metadata for the specified object. If no value already exists for the specified object ID and metadata key, the metadata will be added. |
| [`fw_update_post_meta`](#fw_update_post_meta) | Updates a post meta value via fw_update_metadata(), adding it if the key does not exist. |
| [`fw_update_term_meta`](#fw_update_term_meta) | Update term meta field based on term ID. |
| [`fw_update_user_meta`](#fw_update_user_meta) | Update user meta field based on user ID. |

---

### `fw_add_comment_meta` {#fw_add_comment_meta}

```php
fw_add_comment_meta( $comment_id, $meta_key, $meta_value, $unique = false )
```

Add meta data field to a comment.

| Parameter | Type | Description |
| --- | --- | --- |
| `$comment_id` | `int` | Comment ID. |
| `$meta_key` | `string` | Metadata name. |
| `$meta_value` | `mixed` | Metadata value. |
| `$unique` | `bool` | Optional, default is false. Whether the same key should not be added. |

**Returns** `int\|bool` Meta ID on success, false on failure.

<small>Source: `framework/helpers/meta.php:600`</small>

### `fw_add_metadata` {#fw_add_metadata}

```php
fw_add_metadata( $meta_type, $object_id, $meta_key, $meta_value, $unique = false )
```

Add metadata for the specified object.

@uses $wpdb WordPress database object for queries.

       unique for the object. If true, and the object already has a value for the specified
       metadata key, no change will be made

| Parameter | Type | Description |
| --- | --- | --- |
| `$meta_type` | `string` | Type of object metadata is for (e.g., comment, post, or user) |
| `$object_id` | `int` | ID of the object metadata is for |
| `$meta_key` | `string` | Metadata key |
| `$meta_value` | `mixed` | Metadata value. Must be serializable if non-scalar. |
| `$unique` | `bool` | Optional, default is false. Whether the specified metadata key should be |

**Returns** `int\|bool` The meta ID on success, false on failure.

<small>Source: `framework/helpers/meta.php:64`</small>

### `fw_add_post_meta` {#fw_add_post_meta}

```php
fw_add_post_meta( $post_id, $meta_key, $meta_value, $unique = false )
```

Add meta data field to a post.

Post meta data is called "Custom Fields" on the Administration Screen.

                          Default false.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | Post ID. |
| `$meta_key` | `string` | Metadata name. |
| `$meta_value` | `mixed` | Metadata value. Must be serializable if non-scalar. |
| `$unique` | `bool` | Optional. Whether the same key should not be added. |

**Returns** `int\|bool` Meta ID on success, false on failure.

<small>Source: `framework/helpers/meta.php:526`</small>

### `fw_add_term_meta` {#fw_add_term_meta}

```php
fw_add_term_meta( $term_id, $meta_key, $meta_value, $unique = false )
```

Add meta data field to a term.

| Parameter | Type | Description |
| --- | --- | --- |
| `$term_id` | `int` | Post ID. |
| `$key` | `string` | Metadata name. |
| `$value` | `mixed` | Metadata value. |
| `$unique` | `bool` | Optional, default is false. Whether the same key should not be added. |

**Returns** `bool` False for failure. True for success.

<small>Source: `framework/helpers/meta.php:653`</small>

### `fw_add_user_meta` {#fw_add_user_meta}

```php
fw_add_user_meta( $user_id, $meta_key, $meta_value, $unique = false )
```

Add meta data field to a user.

Post meta data is called "Custom Fields" on the Administration Screens.

| Parameter | Type | Description |
| --- | --- | --- |
| `$user_id` | `int` | User ID. |
| `$meta_key` | `string` | Metadata name. |
| `$meta_value` | `mixed` | Metadata value. |
| `$unique` | `bool` | Optional, default is false. Whether the same key should not be added. |

**Returns** `int\|bool` Meta ID on success, false on failure.

<small>Source: `framework/helpers/meta.php:473`</small>

### `fw_addslashes_deep_keys` {#fw_addslashes_deep_keys}

```php
fw_addslashes_deep_keys( $value )
```

Add slashes to values, and to keys if magic_quotes_gpc = On

<small>Source: `framework/helpers/general.php:630`</small>

### `fw_akg` {#fw_akg}

```php
fw_akg( $keys, $array_or_object, $default_value = null, $keys_delimiter = '/' )
```

Recursively find a key's value in array

| Parameter | Type | Description |
| --- | --- | --- |
| `$keys` | `string` | 'a/b/c' |
| `$array_or_object` | `array\|object` | — |
| `$default_value` | `null\|mixed` | — |
| `$keys_delimiter` | `string` | — |

**Returns** `null\|mixed`

<small>Source: `framework/helpers/general.php:284`</small>

### `fw_aks` {#fw_aks}

```php
fw_aks( $keys, $value, &$array_or_object, $keys_delimiter = '/' )
```

Set (or create if not exists) value for specified key in some array level

| Parameter | Type | Description |
| --- | --- | --- |
| `$keys` | `string` | 'a/b/c', or 'a/b/c/' equivalent to: $arr['a']['b']['c'][] = $val; |
| `$value` | `mixed` | — |
| `$array_or_object` | `array\|object` | — |
| `$keys_delimiter` | `string` | — |

**Returns** `array\|object`

<small>Source: `framework/helpers/general.php:333`</small>

### `fw_aku` {#fw_aku}

```php
fw_aku( $keys, &$array_or_object, $keys_delimiter = '/' )
```

Unset specified key in some array level

| Parameter | Type | Description |
| --- | --- | --- |
| `$keys` | `string` | 'a/b/c' -&gt; unset($arr['a']['b']['c']); |
| `$array_or_object` | `array\|object` | — |
| `$keys_delimiter` | `string` | — |

**Returns** `array\|object`

<small>Source: `framework/helpers/general.php:403`</small>

### `fw_attr_to_html` {#fw_attr_to_html}

```php
fw_attr_to_html( array $attr_array )
```

Generate attributes string for html tag

| Parameter | Type | Description |
| --- | --- | --- |
| `$attr_array` | `array` | array('href' =&gt; '/', 'title' =&gt; 'Test') |

**Returns** `string` 'href="/" title="Test"'

<small>Source: `framework/helpers/general.php:581`</small>

### `fw_call` {#fw_call}
*since 2.6.14*

```php
fw_call( $value )
```

In the value is instance of FW_Callback class then it is executed and returns the callback value In other case function returns the provided value

| Parameter | Type | Description |
| --- | --- | --- |
| `$value` | `mixed\|FW_Callback` | — |

**Returns** `mixed`

<small>Source: `framework/helpers/general.php:2349`</small>

### `fw_callback` {#fw_callback}
*since 2.6.14*

```php
fw_callback( $callback, array $args = array(), $cache = true )
```

Recommend when the function call may require many resources or time (database requests) , or the value is small Not recommended using on very large values

| Parameter | Type | Description |
| --- | --- | --- |
| `$callback` | `string\|array` | Callback function |
| `$args` | `array` | Callback arguments |
| `$cache` | `bool` | Whenever you want to cache the function value after it's first call or not |

**Returns** `FW_Callback`

<small>Source: `framework/helpers/general.php:2335`</small>

### `fw_collect_first_level_options` {#fw_collect_first_level_options}
*⚠️ deprecated*

```php
fw_collect_first_level_options( &$collected, &$options )
```

Collect correct options from the first level of the array and group them

It is deprecated since 2.4 because container types were added and there can be any type of containers
but this function is hardcoded only for tab,box,group.
Use fw_collect_options()

| Parameter | Type | Description |
| --- | --- | --- |
| `$collected` | `array` | Will be filled with found correct options |
| `$options` | `array` | — |

<small>Source: `framework/helpers/general.php:960`</small>

### `fw_collect_options` {#fw_collect_options}

```php
fw_collect_options( &$result, &$options, $settings = array(), $_recursion_data = array() )
```

Recursively walks an options array and collects every option and container into the referenced result array.

| Parameter | Type | Description |
| --- | --- | --- |
| `$result` | `array` | — |
| `$options` | `array` | — |
| `$settings` | `array` | — |
| `$_recursion_data` | `array` | (private) for internal use |

<small>Source: `framework/helpers/general.php:1060`</small>

### `fw_current_screen_match` {#fw_current_screen_match}

```php
fw_current_screen_match( array $rules )
```

Check if current screen pass/match give rules

| Parameter | Type | Description |
| --- | --- | --- |
| `$rules` | `array` | Rules for current screen |

**Returns** `bool`

<small>Source: `framework/helpers/general.php:666`</small>

### `fw_current_url` {#fw_current_url}

```php
fw_current_url()
```

Returns the full URL of the current request, resolved against the site home and cached statically.

**Returns** `string` Current url

<small>Source: `framework/helpers/general.php:1600`</small>

### `fw_current_user_can` {#fw_current_user_can}

```php
fw_current_user_can( $capabilities, $default_value = null )
```

Check if current user has one capability from the given list

Return first capability that user can.
 Else, return default value if it is not null, else return first capability from list.
 Use default value false to check if user can some of the capabilities

| Parameter | Type | Description |
| --- | --- | --- |
| `$capabilities` | `array` | list of capabilities to check |
| `$default_value` | `mixed` | — |

**Returns** `string\|bool\|mixed`

<small>Source: `framework/helpers/general.php:1657`</small>

### `fw_db_option_storage_load` {#fw_db_option_storage_load}
*since 2.5.0*

```php
fw_db_option_storage_load($id, array $option, $value, array $params = array())
```

Loads an option value through its configured fw-storage backend, or returns the value unchanged when none is set.

| Parameter | Type | Description |
| --- | --- | --- |
| `$id` | `string` | — |
| `$option` | `array` | — |
| `$value` | `mixed` | — |
| `$params` | `array` | — |

**Returns** `mixed`

<small>Source: `framework/helpers/fw-storage.php:56`</small>

### `fw_db_option_storage_save` {#fw_db_option_storage_save}
*since 2.5.0*

```php
fw_db_option_storage_save($id, array $option, $value, array $params = array())
```

Saves an option value through its configured fw-storage backend, or returns the value unchanged when none is set.

| Parameter | Type | Description |
| --- | --- | --- |
| `$id` | `string` | — |
| `$option` | `array` | — |
| `$value` | `mixed` | — |
| `$params` | `array` | — |

**Returns** `mixed`

<small>Source: `framework/helpers/fw-storage.php:21`</small>

### `fw_db_option_storage_type` {#fw_db_option_storage_type}
*since 2.5.0*

```php
fw_db_option_storage_type($type = null)
```

Returns the registered option storage type instance for the given type, all types when none is given, or null.

| Parameter | Type | Description |
| --- | --- | --- |
| `$type` | `null\|string` | — |

**Returns** `FW_Option_Storage_Type\|FW_Option_Storage_Type[]\|null`

<small>Source: `framework/helpers/fw-storage.php:101`</small>

### `fw_delete_comment_meta` {#fw_delete_comment_meta}

```php
fw_delete_comment_meta( $comment_id, $meta_key, $meta_value = '' )
```

Remove metadata matching criteria from a comment.

You can match based on the key, or key and value. Removing based on key and
value, will keep from removing duplicate metadata with the same key. It also
allows removing all metadata matching key, if needed.

| Parameter | Type | Description |
| --- | --- | --- |
| `$comment_id` | `int` | comment ID |
| `$meta_key` | `string` | Metadata name. |
| `$meta_value` | `mixed` | Optional. Metadata value. |

**Returns** `bool` True on success, false on failure.

<small>Source: `framework/helpers/meta.php:636`</small>

### `fw_delete_metadata` {#fw_delete_metadata}

```php
fw_delete_metadata( $meta_type, $object_id, $meta_key, $meta_value = '', $delete_all = false )
```

Deletes object metadata rows matching the given meta type, object, key and optional value.

Delete metadata for the specified object.

@uses $wpdb WordPress database object for queries.

       with this value. Otherwise, delete all entries with the specified meta_key.
       for all objects, ignoring the specified object_id. Otherwise, only delete matching
       metadata entries for the specified object_id.

| Parameter | Type | Description |
| --- | --- | --- |
| `$meta_type` | `string` | Type of object metadata is for (e.g., comment, post, or user) |
| `$object_id` | `int` | ID of the object metadata is for |
| `$meta_key` | `string` | Metadata key |
| `$meta_value` | `mixed` | Optional. Metadata value. Must be serializable if non-scalar. If specified, only delete metadata entries |
| `$delete_all` | `bool` | Optional, default is false. If true, delete matching metadata entries |

**Returns** `bool` True on successful delete, false on failure.

<small>Source: `framework/helpers/meta.php:328`</small>

### `fw_delete_post_meta` {#fw_delete_post_meta}

```php
fw_delete_post_meta( $post_id, $meta_key, $meta_value = '' )
```

Remove metadata matching criteria from a post.

You can match based on the key, or key and value. Removing based on key and
value, will keep from removing duplicate metadata with the same key. It also
allows removing all metadata matching key, if needed.

                          non-scalar. Default empty.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | Post ID. |
| `$meta_key` | `string` | Metadata name. |
| `$meta_value` | `mixed` | Optional. Metadata value. Must be serializable if |

**Returns** `bool` True on success, false on failure.

<small>Source: `framework/helpers/meta.php:577`</small>

### `fw_delete_term_meta` {#fw_delete_term_meta}

```php
fw_delete_term_meta( $term_id, $meta_key, $meta_value = '' )
```

Remove metadata matching criteria from a term.

You can match based on the key, or key and value. Removing based on key and
value, will keep from removing duplicate metadata with the same key. It also
allows removing all metadata matching key, if needed.

| Parameter | Type | Description |
| --- | --- | --- |
| `$term_id` | `int` | term ID |
| `$meta_key` | `string` | Metadata name. |
| `$meta_value` | `mixed` | Optional. Metadata value. |

**Returns** `bool` False for failure. True for success.

<small>Source: `framework/helpers/meta.php:670`</small>

### `fw_delete_user_meta` {#fw_delete_user_meta}

```php
fw_delete_user_meta( $user_id, $meta_key, $meta_value = '' )
```

Remove metadata matching criteria from a user.

You can match based on the key, or key and value. Removing based on key and
value, will keep from removing duplicate metadata with the same key. It also
allows removing all metadata matching key, if needed.

| Parameter | Type | Description |
| --- | --- | --- |
| `$user_id` | `int` | user ID |
| `$meta_key` | `string` | Metadata name. |
| `$meta_value` | `mixed` | Optional. Metadata value. |

**Returns** `bool` True on success, false on failure.

<small>Source: `framework/helpers/meta.php:509`</small>

### `fw_dirname_to_classname` {#fw_dirname_to_classname}

```php
fw_dirname_to_classname( $dirname )
```

Converts a hyphenated directory name into an underscore-separated class name (e.g. 'foo-bar' to 'Foo_Bar').

| Parameter | Type | Description |
| --- | --- | --- |
| `$dirname` | `string` | 'foo-bar' |

**Returns** `string` 'Foo_Bar'

<small>Source: `framework/helpers/general.php:1819`</small>

### `fw_ext` {#fw_ext}

```php
fw_ext( $extension_name )
```

Returns the given URL with its scheme stripped down to a protocol-relative '//' prefix.

Alias

| Parameter | Type | Description |
| --- | --- | --- |
| `$extension_name` | `string` | — |

**Returns** `FW_Extension\|null`

<small>Source: `framework/helpers/general.php:1924`</small>

### `fw_extract_only_options` {#fw_extract_only_options}

```php
fw_extract_only_options( array $options )
```

Extract only input options (without containers)

| Parameter | Type | Description |
| --- | --- | --- |
| `$options` | `array` | — |

**Returns** `array` &#123;option_id =&gt; option&#125;

<small>Source: `framework/helpers/general.php:941`</small>

### `fw_fix_path` {#fw_fix_path}

```php
fw_fix_path( $path )
```

Convert to Unix style directory separators

<small>Source: `framework/helpers/general.php:11`</small>

### `fw_get_db_customizer_option` {#fw_get_db_customizer_option}

```php
fw_get_db_customizer_option( $option_id = null, $default_value = null )
```

Get a customizer framework option value from the database

| Parameter | Type | Description |
| --- | --- | --- |
| `$option_id` | `string\|null` | Specific option id (accepts multikey). null - all options |
| `$default_value` | `null\|mixed` | If no option found in the database, this value will be returned |

**Returns** `mixed\|null`

<small>Source: `framework/helpers/database.php:591`</small>

### `fw_get_db_ext_settings_option` {#fw_get_db_ext_settings_option}

```php
fw_get_db_ext_settings_option( $extension_name, $option_id = null, $default_value = null, $get_original_value = null )
```

Get extension's settings option value from the database

| Parameter | Type | Description |
| --- | --- | --- |
| `$extension_name` | `string` | — |
| `$option_id` | `string\|null` | — |
| `$default_value` | `null\|mixed` | If no option found in the database, this value will be returned |
| `$get_original_value` | `null\|bool` | REMOVED https://github.com/ThemeFuse/Unyson/issues/1676 |

**Returns** `mixed\|null`

<small>Source: `framework/helpers/database.php:497`</small>

### `fw_get_db_extension_data` {#fw_get_db_extension_data}

```php
fw_get_db_extension_data( $extension_name, $multi_key = null, $default_value = null, $get_original_value = null )
```

Get extension's data from the database

| Parameter | Type | Description |
| --- | --- | --- |
| `$extension_name` | `string` | — |
| `$multi_key` | `string\|null` | The key of the data you want to get. null - all data |
| `$default_value` | `null\|mixed` | If no option found in the database, this value will be returned |
| `$get_original_value` | `null\|bool` | REMOVED https://github.com/ThemeFuse/Unyson/issues/1676 |

**Returns** `mixed\|null`

<small>Source: `framework/helpers/database.php:688`</small>

### `fw_get_db_extension_user_data` {#fw_get_db_extension_user_data}

```php
fw_get_db_extension_user_data( $user_id, $extension_name, $keys = null )
```

Get user meta set by specific extension

If the extension doesn't exist or is disabled, or meta key doesn't exist, returns null,
else returns the meta key value

| Parameter | Type | Description |
| --- | --- | --- |
| `$user_id` | `int` | — |
| `$extension_name` | `string` | — |
| `$keys` | `string` | — |

**Returns** `mixed\|null`

<small>Source: `framework/helpers/database.php:626`</small>

### `fw_get_db_post_option` {#fw_get_db_post_option}

```php
fw_get_db_post_option($post_id = null, $option_id = null, $default_value = null, $get_original_value = null)
```

Get post option value from the database

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `null\|int` | — |
| `$option_id` | `string\|null` | Specific option id (accepts multikey). null - all options |
| `$default_value` | `null\|mixed` | If no option found in the database, this value will be returned |
| `$get_original_value` | `null\|bool` | REMOVED https://github.com/ThemeFuse/Unyson/issues/1676 |

**Returns** `mixed\|null`

<small>Source: `framework/helpers/database.php:229`</small>

### `fw_get_db_settings_option` {#fw_get_db_settings_option}

```php
fw_get_db_settings_option( $option_id = null, $default_value = null, $get_original_value = null )
```

Get a theme settings option value from the database

| Parameter | Type | Description |
| --- | --- | --- |
| `$option_id` | `string\|null` | Specific option id (accepts multikey). null - all options |
| `$default_value` | `null\|mixed` | If no option found in the database, this value will be returned |
| `$get_original_value` | `null\|bool` | REMOVED https://github.com/ThemeFuse/Unyson/issues/1676 |

**Returns** `mixed\|null`

<small>Source: `framework/helpers/database.php:66`</small>

### `fw_get_db_term_option` {#fw_get_db_term_option}

```php
fw_get_db_term_option( $term_id, $taxonomy, $option_id = null, $default_value = null, $get_original_value = null )
```

Get term option value from the database

| Parameter | Type | Description |
| --- | --- | --- |
| `$term_id` | `int` | — |
| `$taxonomy` | `string` | — |
| `$option_id` | `string\|null` | Specific option id (accepts multikey). null - all options |
| `$default_value` | `null\|mixed` | If no option found in the database, this value will be returned |
| `$get_original_value` | `null\|bool` | REMOVED https://github.com/ThemeFuse/Unyson/issues/1676 |

**Returns** `mixed\|null`

<small>Source: `framework/helpers/database.php:426`</small>

### `fw_get_framework_asset_uri` {#fw_get_framework_asset_uri}

```php
fw_get_framework_asset_uri( $rel_path = '' )
```

URI to a framework asset, preferring its minified (.min) build when present.

Returns the `.min.css` / `.min.js` sibling ONLY when our build pipeline
actually produced it (per fw_is_built_asset()) and SCRIPT_DEBUG is off;
otherwise falls back to the unminified source. So a missing/skipped build
— or a stale pre-shipped vendor .min — never gets served by mistake.

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | e.g. '/static/css/fw.css' |

**Returns** `string`

<small>Source: `framework/helpers/general.php:212`</small>

### `fw_get_framework_customizations_dir_rel_path` {#fw_get_framework_customizations_dir_rel_path}

```php
fw_get_framework_customizations_dir_rel_path( $append = '' )
```

Relative path of the framework customizations directory

| Parameter | Type | Description |
| --- | --- | --- |
| `$append` | `string` | — |

**Returns** `string`

<small>Source: `framework/helpers/general.php:35`</small>

### `fw_get_framework_directory` {#fw_get_framework_directory}

```php
fw_get_framework_directory( $rel_path = '' )
```

Full path to the parent-theme/framework directory

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | — |

**Returns** `string`

<small>Source: `framework/helpers/general.php:135`</small>

### `fw_get_framework_directory_uri` {#fw_get_framework_directory_uri}

```php
fw_get_framework_directory_uri( $rel_path = '' )
```

URI to the parent-theme/framework directory

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | — |

**Returns** `string`

<small>Source: `framework/helpers/general.php:158`</small>

### `fw_get_google_fonts` {#fw_get_google_fonts}

```php
fw_get_google_fonts()
```

Returns the cached list of Google fonts keyed by family, with position metadata.

**Returns** `Array` with Google fonts

<small>Source: `framework/helpers/general.php:1508`</small>

### `fw_get_google_fonts_v2` {#fw_get_google_fonts_v2}

```php
fw_get_google_fonts_v2()
```

Returns the Google fonts catalog as a JSON string, preferring the bundled static file.

**Returns** `string` JSON encoded array with Google fonts

<small>Source: `framework/helpers/general.php:1541`</small>

### `fw_get_image_sizes` {#fw_get_image_sizes}

```php
fw_get_image_sizes( $size = '' )
```

Return all images sizes register by add_image_size() merged with WordPress default image sizes.

| Parameter | Type | Description |
| --- | --- | --- |
| `$size` | `string` | — |

**Returns** `array\|bool`

<small>Source: `framework/helpers/general.php:2015`</small>

### `fw_get_json_last_error_message` {#fw_get_json_last_error_message}
*since 2.4.10*

```php
fw_get_json_last_error_message()
```

Returns a human-readable message for the last json_decode error, or null when there was none.

**Returns** `string\|null`

<small>Source: `framework/helpers/general.php:2098`</small>

### `fw_get_mime_type_by_ext` {#fw_get_mime_type_by_ext}

```php
fw_get_mime_type_by_ext( $type = array() )
```

Return mime_types by file extension ex : input : array( 'png', 'jpg', 'jpeg' ) =&gt; output : array( 'image/jpeg' ).

| Parameter | Type | Description |
| --- | --- | --- |
| `$type` | `array` | — |

**Returns** `array`

<small>Source: `framework/helpers/general.php:2131`</small>

### `fw_get_options_errors_from_input` {#fw_get_options_errors_from_input}

```php
fw_get_options_errors_from_input( array $options, $input_array = null )
```

Validates option input and returns a map of option ids to their validation error messages.

Collect server-side validation errors for option input (Phase 3b).

Returns a map of &#123; option_id =&gt; error_message &#125; for every leaf option that
fails validation. An empty array means "all valid".

Validation is fully opt-in and backward compatible: an option with no
`validation` rules, whose type doesn't override _get_value_error(), and which
nothing hooks via `fw_option_value_error`, never produces an error — so this
returns [] and the normal save proceeds unchanged.

| Parameter | Type | Description |
| --- | --- | --- |
| `$options` | `array` | — |
| `$input_array` | `array\|null` | — |

**Returns** `array` &#123; option_id =&gt; message &#125;

<small>Source: `framework/helpers/general.php:1334`</small>

### `fw_get_options_values_from_input` {#fw_get_options_values_from_input}

```php
fw_get_options_values_from_input( array $options, $input_array = null )
```

Get correct values from input (POST) for given options This values can be saved in db then replaced with $option['value'] for each option

| Parameter | Type | Description |
| --- | --- | --- |
| `$options` | `array` | — |
| `$input_array` | `array` | — |

**Returns** `array` Values

<small>Source: `framework/helpers/general.php:1284`</small>

### `fw_get_path_url` {#fw_get_path_url}
*since 2.6.11*

```php
fw_get_path_url( $path )
```

fw_get_path_url( dirname(__FILE__) .'/test.css' ) --&gt; http://site.url/path/to/test.css

| Parameter | Type | Description |
| --- | --- | --- |
| `$path` | `string` | — |

**Returns** `string\|null`

<small>Source: `framework/helpers/general.php:2294`</small>

### `fw_get_stylesheet_customizations_directory` {#fw_get_stylesheet_customizations_directory}

```php
fw_get_stylesheet_customizations_directory( $rel_path = '' )
```

Full path to the child-theme framework customizations directory

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | — |

**Returns** `null\|string`

<small>Source: `framework/helpers/general.php:57`</small>

### `fw_get_stylesheet_customizations_directory_uri` {#fw_get_stylesheet_customizations_directory_uri}

```php
fw_get_stylesheet_customizations_directory_uri( $rel_path = '' )
```

URI to the child-theme framework customizations directory

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | — |

**Returns** `null\|string`

<small>Source: `framework/helpers/general.php:73`</small>

### `fw_get_template_customizations_directory` {#fw_get_template_customizations_directory}

```php
fw_get_template_customizations_directory( $rel_path = '' )
```

Full path to the parent-theme framework customizations directory

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | — |

**Returns** `string`

<small>Source: `framework/helpers/general.php:92`</small>

### `fw_get_template_customizations_directory_uri` {#fw_get_template_customizations_directory_uri}

```php
fw_get_template_customizations_directory_uri( $rel_path = '' )
```

URI to the parent-theme framework customizations directory

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | — |

**Returns** `string`

<small>Source: `framework/helpers/general.php:112`</small>

### `fw_get_term_meta` {#fw_get_term_meta}

```php
fw_get_term_meta( $term_id, $key, $single = false )
```

Retrieve term meta field for a term.

is true.

| Parameter | Type | Description |
| --- | --- | --- |
| `$term_id` | `int` | Term ID. |
| `$key` | `string` | The meta key to retrieve. |
| `$single` | `bool` | Whether to return a single value. |

**Returns** `mixed` Will be an array if $single is false. Will be value of meta data field if $single

<small>Source: `framework/helpers/meta.php:684`</small>

### `fw_get_url_without_scheme` {#fw_get_url_without_scheme}

```php
fw_get_url_without_scheme( $url )
```

Returns the given URL with its scheme stripped down to a protocol-relative '//' prefix.

<small>Source: `framework/helpers/general.php:1929`</small>

### `fw_get_variables_from_file` {#fw_get_variables_from_file}

```php
fw_get_variables_from_file( $file_path, array $_extract_variables, array $_set_variables = array() )
```

Safe load variables from an file Use this function to not include files directly and to not give access to current context variables (like $this)

| Parameter | Type | Description |
| --- | --- | --- |
| `$file_path` | `string` | — |
| `$_extract_variables` | `array` | Extract these from file array('variable_name' =&gt; 'default_value') |
| `$_set_variables` | `array` | Set these to be available in file (like variables in view) |

**Returns** `array`

<small>Source: `framework/helpers/general.php:897`</small>

### `fw_html_attr_name_to_array_multi_key` {#fw_html_attr_name_to_array_multi_key}

```php
fw_html_attr_name_to_array_multi_key( $attr_name, $set_mode = false )
```

Converts an HTML array-attribute name like 'hello[world]' into a slash-separated multikey path.

| Parameter | Type | Description |
| --- | --- | --- |
| `$attr_name` | — | — |
| `$set_mode` | `bool` | — |

**Returns** `mixed`

<small>Source: `framework/helpers/general.php:1380`</small>

### `fw_html_tag` {#fw_html_tag}

```php
fw_html_tag( $tag, $attr = array(), $end = false )
```

Generate html tag

| Parameter | Type | Description |
| --- | --- | --- |
| `$tag` | `string` | Tag name |
| `$attr` | `array` | Tag attributes |
| `$end` | `bool\|string` | Append closing tag. Also accepts body content |

**Returns** `string` The tag's html

<small>Source: `framework/helpers/general.php:557`</small>

### `fw_htmlspecialchars` {#fw_htmlspecialchars}

```php
fw_htmlspecialchars( $string )
```

Use this id do not want to enter every time same last two parameters Info: Cannot use default parameters because in php 5.2 encoding is not UTF-8 by default

| Parameter | Type | Description |
| --- | --- | --- |
| `$string` | `string` | — |

**Returns** `string`

<small>Source: `framework/helpers/general.php:1642`</small>

### `fw_human_bytes` {#fw_human_bytes}
*since 2.4.17*

```php
fw_human_bytes( $bytes, $precision = 2 )
```

Convert bytes to human readable format

| Parameter | Type | Description |
| --- | --- | --- |
| `$bytes` | `integer` | Size in bytes to convert |
| `$precision` | `integer` | — |

**Returns** `string`

<small>Source: `framework/helpers/general.php:1736`</small>

### `fw_human_time` {#fw_human_time}

```php
fw_human_time( $seconds )
```

Convert number of seconds to 'X &#123;units&#125;'

E.g. 123 =&gt; '2 minutes'
then you can use this string how you want, for e.g. append ' ago' =&gt; '2 minutes ago'

| Parameter | Type | Description |
| --- | --- | --- |
| `$seconds` | `int` | — |

**Returns** `string`

<small>Source: `framework/helpers/general.php:1679`</small>

### `fw_id_to_title` {#fw_id_to_title}

```php
fw_id_to_title( $id )
```

Try to make user friendly title from an id

| Parameter | Type | Description |
| --- | --- | --- |
| `$id` | `string` | 'hello-world' |

**Returns** `string` 'Hello world'

<small>Source: `framework/helpers/general.php:1901`</small>

### `fw_image_tag` {#fw_image_tag}
*🔌 pluggable*

```php
fw_image_tag( $source, $args = array() )
```

Builds a responsive img tag for an attachment ID or image URL with sizing, srcset and loading hints.

Modern &lt;img&gt; builder shared across shortcodes (media-image, reviews-table …).

Improvements over hand-built &lt;img&gt; tags from the Unyson era:
 - Responsive `srcset`/`sizes` (via wp_get_attachment_image) when the
   display size isn't an exact px crop; a 1x/2x density srcset for exact
   px crops when the source is large enough.
 - `width`/`height` attributes (px) to reduce CLS.
 - `fetchpriority="high"` + eager loading for above-the-fold (LCP) images;
   lazy + async decoding otherwise.
 - Inline CSS for non-px units (%, vw, rem…); alt resolved from the media
   library; graceful fallback when GD/Imagick (fw_resize) is unavailable.

                           alt, fetchpriority ('high'|''), sizes, fallback_size,
                           extra_attr (assoc array merged onto the tag).

| Parameter | Type | Description |
| --- | --- | --- |
| `$source` | `int\|string` | Attachment ID (enables srcset/crop) OR an image URL. |
| `$args` | `array` | width, height (unit-input value \| px \| ''), class, |

**Returns** `string`

<small>Source: `framework/helpers/general.php:2199`</small>

### `fw_include_file_isolated` {#fw_include_file_isolated}

```php
fw_include_file_isolated( $file_path, $once = false )
```

Use this function to not include files directly and to not give access to current context variables (like $this)

| Parameter | Type | Description |
| --- | --- | --- |
| `$file_path` | `string` | — |
| `$once` | `bool` | — |

**Returns** `bool` If was included or not

<small>Source: `framework/helpers/general.php:920`</small>

### `fw_is_built_asset` {#fw_is_built_asset}

```php
fw_is_built_asset( $rel_path )
```

Was this framework-relative source path minified by our build pipeline?

Reads the build manifest (framework/build-manifest.php, generated by
build/build.mjs) once per request. The asset helpers consult this so they
only ever serve a `.min` WE produced — never a stale, pre-shipped vendor
`*.min.*` that doesn't correspond to its (possibly customized) source.

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | framework-relative, e.g. '/static/css/fw.css' |

**Returns** `bool`

<small>Source: `framework/helpers/general.php:188`</small>

### `fw_is_callback` {#fw_is_callback}

```php
fw_is_callback( $value )
```

Check is the current value is instance of FW_Callback class

| Parameter | Type | Description |
| --- | --- | --- |
| `$value` | `mixed` | — |

**Returns** `bool`

<small>Source: `framework/helpers/general.php:2366`</small>

### `fw_is_cli` {#fw_is_cli}
*since 2.6.16*

```php
fw_is_cli()
```

Check for command line interface

**Returns** `bool`

<small>Source: `framework/helpers/general.php:2376`</small>

### `fw_is_editor_context` {#fw_is_editor_context}
*since 2.16.23*

```php
fw_is_editor_context()
```

Returns whether the current request is rendering for an editor (admin, AJAX, or block-renderer REST).

Whether the current request is an EDITING surface rather than a visitor page view.

Shortcode views use this to show authoring guidance — "Add a poster image and a
video URL", an empty-state hint, a placeholder — that a visitor must never see.

The historic test was `is_admin() || DOING_AJAX`, and it has a blind spot that
only appeared once elements became Gutenberg blocks: **ServerSideRender renders
through the REST API**, which is neither. A view guarded the old way returns
nothing in a block preview, so the block shows Gutenberg's bare "Block rendered
as empty" instead of the element's own guidance.

REST is deliberately narrowed to the block-renderer route rather than accepting
every REST request: a public REST consumer fetching post content is a VISITOR,
and must not receive editor-only markup.

**Returns** `bool` True when the caller is rendering for an editor.

<small>Source: `framework/helpers/general.php:1447`</small>

### `fw_is_post_edit` {#fw_is_post_edit}

```php
fw_is_post_edit()
```

If currently is a Post Edit page display/submit

**Returns** `bool`

<small>Source: `framework/helpers/general.php:1774`</small>

### `fw_is_real_post_save` {#fw_is_real_post_save}
*⚠️ deprecated*

```php
fw_is_real_post_save( $post_id )
```

Returns whether the current save_post is a genuine Save rather than a revision or autosave (deprecated).

This function is used in 'save_post' action

Used to check if current post save is a regular "Save" button press
not a revision, auto-save or something else



save_post action happens also happens on Preview, Revision, Auto-save Restore, ...
the verifications in this function simplifies too much the save process,
the developers should study and understand better how it works
and handle different save cases in their scripts using wp functions

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | — | — |

**Returns** `bool`

<small>Source: `framework/helpers/general.php:1491`</small>

### `fw_is_valid_domain_name` {#fw_is_valid_domain_name}

```php
fw_is_valid_domain_name( $domain_name )
```

Returns whether the given string is a syntactically valid domain name.

<small>Source: `framework/helpers/general.php:1628`</small>

### `fw_locate_theme_path` {#fw_locate_theme_path}

```php
fw_locate_theme_path( $rel_path )
```

Search relative path in child then in parent theme directory and return full path

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | '/some/path_to_dir' or '/some/path_to_file.php' |

**Returns** `string` URI

<small>Source: `framework/helpers/general.php:820`</small>

### `fw_locate_theme_path_uri` {#fw_locate_theme_path_uri}

```php
fw_locate_theme_path_uri( $rel_path )
```

Search relative path in child then in parent theme directory and return URI

| Parameter | Type | Description |
| --- | --- | --- |
| `$rel_path` | `string` | '/some/path_to_dir' or '/some/path_to_file.php' |

**Returns** `string` URI

<small>Source: `framework/helpers/general.php:803`</small>

### `fw_make_stylesheet_portable` {#fw_make_stylesheet_portable}

```php
fw_make_stylesheet_portable( $href, $contents = null )
```

Make stylesheet contents (portable) independent of directory location For e.g. replace relative paths 'url(img/bg.png)' with full paths 'url(http://site.com/assets/img/bg.png)'

| Parameter | Type | Description |
| --- | --- | --- |
| `$href` | `string` | 'http://.../style.css' |
| `$contents` | `null\|string` | If not specified, will try to read from $href |

**Returns** `bool\|string` false - on failure; string - stylesheet contents

<small>Source: `framework/helpers/general.php:1975`</small>

### `fw_min_uri` {#fw_min_uri}
*🔌 pluggable*

```php
fw_min_uri( $uri = '' )
```

Rewrites a framework CSS/JS asset URI to its .min variant when a built minified file exists.

Receiver-agnostic minified-asset wrapper.

Wrap any already-built framework/extension asset URL (e.g. the result of
an extension's get_uri()/get_declared_URI(), regardless of which class
produced it) and get back the `.min.css` / `.min.js` sibling when it
exists on disk and SCRIPT_DEBUG is off; the original URL otherwise.

Operates purely on the URL string, so — unlike a per-class method — it can
never trigger an undefined-method fatal. Only rewrites assets served from
within the framework directory (anything else, e.g. a theme customization
override, is returned untouched).

| Parameter | Type | Description |
| --- | --- | --- |
| `$uri` | `string` | e.g. 'https://site/.../extensions/shortcodes/.../styles.css?ver=1' |

**Returns** `string`

<small>Source: `framework/helpers/general.php:245`</small>

### `fw_multi_ext2type` {#fw_multi_ext2type}

```php
fw_multi_ext2type( $ext_array = array() )
```

Return types from file extensions ex : input array( 'png', 'jpg', 'zip' ) =&gt; output : array( 'image', 'archive' ).

| Parameter | Type | Description |
| --- | --- | --- |
| `$ext_array` | `array` | — |

**Returns** `array`

<small>Source: `framework/helpers/general.php:2155`</small>

### `fw_oembed_get` {#fw_oembed_get}

```php
fw_oembed_get( $url, $args = array() )
```

This function is a wrapper function that set correct width and height for iframes from wp_oembed_get() function

| Parameter | Type | Description |
| --- | --- | --- |
| `$url` | — | — |
| `$args` | `array` | — |

**Returns** `bool\|string`

<small>Source: `framework/helpers/general.php:1835`</small>

### `fw_prepare_option_value` {#fw_prepare_option_value}

```php
fw_prepare_option_value( $value )
```

Used when getting some option value from serialized array saved in a custom place and that option is unreachable for standard WordPress filters by other plugins For e.g. that option cannot be translated by plugins, so we pass its value through this function and do the fixes

| Parameter | Type | Description |
| --- | --- | --- |
| `$value` | — | — |

**Returns** `array`

<small>Source: `framework/helpers/general.php:1413`</small>

### `fw_print` {#fw_print}

```php
fw_print( $value )
```

print_r() alternative

| Parameter | Type | Description |
| --- | --- | --- |
| `$value` | `mixed` | Value to debug |

<small>Source: `framework/helpers/general.php:475`</small>

### `fw_rand_md5` {#fw_rand_md5}

```php
fw_rand_md5()
```

Generate a random unique 32-char hex token.

Uses random_bytes() (CSPRNG) on PHP 7+, falling back to wp_generate_password()
if random_bytes is unavailable. Previously built from rand()/mt_rand()/uniqid()
which are not cryptographically secure and would be flagged by security review
if this token ever ends up in a security-sensitive context.

**Returns** `string` 32-character hexadecimal string.

<small>Source: `framework/helpers/general.php:452`</small>

### `fw_read_file_by_uri` {#fw_read_file_by_uri}

```php
fw_read_file_by_uri( $file_uri )
```

Try to find file path by its uri and read the file contents

| Parameter | Type | Description |
| --- | --- | --- |
| `$file_uri` | `string` | — |

**Returns** `bool\|string` false or string - the file contents

<small>Source: `framework/helpers/general.php:1940`</small>

### `fw_render_view` {#fw_render_view}
*🔌 pluggable*

```php
fw_render_view( $file_path, $view_variables = array(), $return = true )
```

Safe render a view and return html In view will be accessible only passed variables Use this function to not include files directly and to not give access to current context variables (like $this)

| Parameter | Type | Description |
| --- | --- | --- |
| `$file_path` | `string` | — |
| `$view_variables` | `array` | — |
| `$return` | `bool` | In some cases, for memory saving reasons, you can disable the use of output buffering |

**Returns** `string` HTML

<small>Source: `framework/helpers/general.php:848`</small>

### `fw_resize` {#fw_resize}
*🔌 pluggable*

```php
fw_resize( $url, $width = false, $height = false, $crop = false )
```

Resizes an image URL to the given dimensions via FW_Resize, returning the original URL on failure.

<small>Source: `framework/helpers/general.php:2169`</small>

### `fw_secure_rand` {#fw_secure_rand}

```php
fw_secure_rand( $length )
```

Reference

Strong cryptography in PHP
http://www.zimuel.it/en/strong-cryptography-in-php/
&gt; Don't use rand() or mt_rand()

**Returns** `string`

<small>Source: `framework/helpers/general.php:1863`</small>

### `fw_set_db_customizer_option` {#fw_set_db_customizer_option}

```php
fw_set_db_customizer_option( $option_id = null, $value = '' )
```

Set a theme customizer option value in database

| Parameter | Type | Description |
| --- | --- | --- |
| `$option_id` | `null` | Specific option id (accepts multikey). null - all options |
| `$value` | `mixed` | — |

<small>Source: `framework/helpers/database.php:601`</small>

### `fw_set_db_ext_settings_option` {#fw_set_db_ext_settings_option}

```php
fw_set_db_ext_settings_option( $extension_name, $option_id = null, $value = '' )
```

Set extension's setting option value in database

| Parameter | Type | Description |
| --- | --- | --- |
| `$extension_name` | `string` | — |
| `$option_id` | `string\|null` | — |
| `$value` | `mixed` | — |

<small>Source: `framework/helpers/database.php:513`</small>

### `fw_set_db_extension_data` {#fw_set_db_extension_data}

```php
fw_set_db_extension_data( $extension_name, $multi_key = null, $value = '' )
```

Set some extension's data in database

| Parameter | Type | Description |
| --- | --- | --- |
| `$extension_name` | `string` | — |
| `$multi_key` | `string\|null` | The key of the data you want to set. null - all data |
| `$value` | `mixed` | — |

<small>Source: `framework/helpers/database.php:711`</small>

### `fw_set_db_extension_user_data` {#fw_set_db_extension_user_data}

```php
fw_set_db_extension_user_data( $user_id, $extension_name, $value, $keys = null )
```

In case the extension doesn't exist or is disabled, or the value is equal to previous, returns false

| Parameter | Type | Description |
| --- | --- | --- |
| `$user_id` | `int` | — |
| `$extension_name` | `string` | — |
| `$value` | `mixed` | — |
| `$keys` | `string` | — |

**Returns** `bool\|int`

<small>Source: `framework/helpers/database.php:651`</small>

### `fw_set_db_post_option` {#fw_set_db_post_option}

```php
fw_set_db_post_option( $post_id = null, $option_id = null, $value = '' )
```

Set post option value in database

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `null\|int` | — |
| `$option_id` | `string\|null` | Specific option id (accepts multikey). null - all options |
| `$value` | — | — |

<small>Source: `framework/helpers/database.php:240`</small>

### `fw_set_db_settings_option` {#fw_set_db_settings_option}

```php
fw_set_db_settings_option( $option_id = null, $value = '' )
```

Set a theme settings option value in database

| Parameter | Type | Description |
| --- | --- | --- |
| `$option_id` | `null` | Specific option id (accepts multikey). null - all options |
| `$value` | `mixed` | — |

<small>Source: `framework/helpers/database.php:76`</small>

### `fw_set_db_term_option` {#fw_set_db_term_option}

```php
fw_set_db_term_option( $term_id, $taxonomy, $option_id = null, $value = '' )
```

Set term option value in database

| Parameter | Type | Description |
| --- | --- | --- |
| `$term_id` | `int` | — |
| `$taxonomy` | `string` | — |
| `$option_id` | `string\|null` | Specific option id (accepts multikey). null - all options |
| `$value` | `mixed` | — |

**Returns** `null`

<small>Source: `framework/helpers/database.php:446`</small>

### `fw_string_to_icon_html` {#fw_string_to_icon_html}

```php
fw_string_to_icon_html( $icon, array $attributes = array() )
```

@param array Additional attributes

| Parameter | Type | Description |
| --- | --- | --- |
| `$icon` | `string` | A string that is meant to be an icon (an image, a font icon class, or something else) |

**Returns** `string`

<small>Source: `framework/helpers/general.php:2054`</small>

### `fw_stripslashes_deep_keys` {#fw_stripslashes_deep_keys}

```php
fw_stripslashes_deep_keys( $value )
```

Strip slashes from values, and from keys if magic_quotes_gpc = On

<small>Source: `framework/helpers/general.php:598`</small>

### `fw_strlen` {#fw_strlen}

```php
fw_strlen( $string )
```

Returns the UTF-8 length of a string, using mb_strlen() when available.

<small>Source: `framework/helpers/general.php:1762`</small>

### `fw_typography_size_css` {#fw_typography_size_css}
*🔌 pluggable*

```php
fw_typography_size_css( $size, $default_unit = 'px' )
```

Resolve a typography `size` value to a CSS length string, tolerating every shape the value can take across the size_format migration: - a `unit-input` array array( 'value' =&gt; '1.5', 'unit' =&gt; 'rem' ) -&gt; "1.5rem" - a JSON string of that '&#123;"value":"24","unit":"px"&#125;' -&gt; "24px" - a legacy plain number 16 / "16" -&gt; "16px" - an already-typed CSS length string "1.25em" -&gt; passthrough - blank / false -&gt; '' So a size that predates the unit-input control (a bare integer) resolves exactly as before (+px), and a new unit-input value keeps its chosen unit.

| Parameter | Type | Description |
| --- | --- | --- |
| `$size` | `mixed` | — |
| `$default_unit` | `string` | unit appended to a bare number (default 'px'). |

**Returns** `string` CSS length, or '' when there's nothing to emit.

<small>Source: `framework/helpers/general.php:2396`</small>

### `fw_unique_increment` {#fw_unique_increment}

```php
fw_unique_increment()
```

Returns a per-request incrementing counter, unique within the current page load.

<small>Source: `framework/helpers/general.php:464`</small>

### `fw_update_comment_meta` {#fw_update_comment_meta}

```php
fw_update_comment_meta( $comment_id, $meta_key, $meta_value, $prev_value = '' )
```

Update comment meta field based on comment ID.

Use the $prev_value parameter to differentiate between meta fields with the
same key and comment ID.

If the meta field for the comment does not exist, it will be added.

| Parameter | Type | Description |
| --- | --- | --- |
| `$comment_id` | `int` | Comment ID. |
| `$meta_key` | `string` | Metadata key. |
| `$meta_value` | `mixed` | Metadata value. |
| `$prev_value` | `mixed` | Optional. Previous value to check before removing. |

**Returns** `int\|bool` Meta ID if the key didn't exist, true on successful update, false on failure.

<small>Source: `framework/helpers/meta.php:619`</small>

### `fw_update_metadata` {#fw_update_metadata}

```php
fw_update_metadata( $meta_type, $object_id, $meta_key, $meta_value, $prev_value = '' )
```

Update metadata for the specified object. If no value already exists for the specified object ID and metadata key, the metadata will be added.

@uses $wpdb WordPress database object for queries.

       the specified value. Otherwise, update all entries.

| Parameter | Type | Description |
| --- | --- | --- |
| `$meta_type` | `string` | Type of object metadata is for (e.g., comment, post, or user) |
| `$object_id` | `int` | ID of the object metadata is for |
| `$meta_key` | `string` | Metadata key |
| `$meta_value` | `mixed` | Metadata value. Must be serializable if non-scalar. |
| `$prev_value` | `mixed` | Optional. If specified, only update existing metadata entries with |

**Returns** `int\|bool` Meta ID if the key didn't exist, true on successful update, false on failure.

<small>Source: `framework/helpers/meta.php:177`</small>

### `fw_update_post_meta` {#fw_update_post_meta}

```php
fw_update_post_meta( $post_id, $meta_key, $meta_value, $prev_value = '' )
```

Updates a post meta value via fw_update_metadata(), adding it if the key does not exist.

Update post meta field based on post ID.

Use the $prev_value parameter to differentiate between meta fields with the
same key and post ID.

If the meta field for the post does not exist, it will be added.

                          Default empty.

                 false on failure.

| Parameter | Type | Description |
| --- | --- | --- |
| `$post_id` | `int` | Post ID. |
| `$meta_key` | `string` | Metadata key. |
| `$meta_value` | `mixed` | Metadata value. Must be serializable if non-scalar. |
| `$prev_value` | `mixed` | Optional. Previous value to check before removing. |

**Returns** `int\|bool` Meta ID if the key didn't exist, true on successful update,

<small>Source: `framework/helpers/meta.php:554`</small>

### `fw_update_term_meta` {#fw_update_term_meta}

```php
fw_update_term_meta( $term_id, $meta_key, $meta_value, $prev_value = '' )
```

Update term meta field based on term ID.

Use the $prev_value parameter to differentiate between meta fields with the
same key and term ID.

If the meta field for the term does not exist, it will be added.

| Parameter | Type | Description |
| --- | --- | --- |
| `$term_id` | `int` | Term ID. |
| `$key` | `string` | Metadata key. |
| `$value` | `mixed` | Metadata value. |
| `$prev_value` | `mixed` | Optional. Previous value to check before removing. |

**Returns** `bool` False on failure, true if success.

<small>Source: `framework/helpers/meta.php:703`</small>

### `fw_update_user_meta` {#fw_update_user_meta}

```php
fw_update_user_meta( $user_id, $meta_key, $meta_value, $prev_value = '' )
```

Update user meta field based on user ID.

Use the $prev_value parameter to differentiate between meta fields with the
same key and user ID.

If the meta field for the user does not exist, it will be added.

| Parameter | Type | Description |
| --- | --- | --- |
| `$user_id` | `int` | User ID. |
| `$meta_key` | `string` | Metadata key. |
| `$meta_value` | `mixed` | Metadata value. |
| `$prev_value` | `mixed` | Optional. Previous value to check before removing. |

**Returns** `int\|bool` Meta ID if the key didn't exist, true on successful update, false on failure.

<small>Source: `framework/helpers/meta.php:492`</small>

← Back to [Functions overview](./index.md)
