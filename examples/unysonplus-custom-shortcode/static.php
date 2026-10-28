<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );
/**
 * static.php — enqueue the element's front-end assets (optional).
 *
 * Runs only on pages where this element actually renders, so there is never an
 * is_page() guard and nothing loads globally. The manifest version cache-busts
 * the files whenever you bump the extension.
 */

$ext = fw_ext( 'shortcodes' );

/*
 * get_declared_URI() resolves through the theme / child-theme override chain,
 * so a site can drop a replacement asset at the same relative path and have it
 * win. Prefer it over a hand-built plugins_url(), which bypasses overrides —
 * and it is why this works whether the folder lives in the extension or in a
 * child theme's framework-customizations/.
 */
$uri     = $ext->get_declared_URI( '/shortcodes/my_element' );
$version = $ext->manifest->get_version();

wp_enqueue_style(
	'my-element',
	$uri . '/static/css/my_element.css',
	array(),
	$version
);

wp_enqueue_script(
	'my-element',
	$uri . '/static/js/my_element.js',
	array(),   // no jQuery unless you genuinely need it
	$version,
	true       // in the footer
);
