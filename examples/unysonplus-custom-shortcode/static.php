<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );
/**
 * static.php — enqueue the element's front-end assets (optional).
 *
 * This runs only when the element is present on the page. The version from the
 * extension manifest cache-busts the file whenever you bump the extension.
 *
 * NOTE: fw_ext( 'shortcodes' )->get_uri() resolves inside the Shortcodes
 * EXTENSION. That is correct when this folder lives in the extension
 * (framework/extensions/shortcodes/shortcodes/my_element/). If you instead drop
 * it into a child theme override folder, enqueue from the theme URI instead,
 * e.g. get_stylesheet_directory_uri() . '/.../static/css/my_element.css'.
 */

wp_enqueue_style(
	'my-element',
	fw_ext( 'shortcodes' )->get_uri( '/shortcodes/my_element/static/css/my_element.css' ),
	array(),
	fw_ext( 'shortcodes' )->manifest->get_version()
);
