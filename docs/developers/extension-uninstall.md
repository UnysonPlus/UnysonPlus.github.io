---
sidebar_position: 40
title: "Extension uninstall.php"
description: "Run cleanup code when a Unyson+ extension is deleted from the Extensions screen: an uninstall.php in the extension folder, run just before the folder is removed."
---

# Extension uninstall.php

When someone deletes an extension from **Unyson+ → Extensions**, the framework looks for an
**`uninstall.php`** in the extension's folder and runs it just before it deletes the folder. It works
the same way as a WordPress plugin's `uninstall.php`.

It is a file rather than a hook because the extension may be **inactive** when it is deleted, and an
inactive extension's code is never loaded. This file is the last moment its code exists.

## The rules

- **Check the constant first.** `FW_EXTENSION_UNINSTALL` is defined only while the framework runs the
  file. Return straight away without it, so the file does nothing if it is ever loaded any other way.
- **Don't rely on your own classes.** The extension may not have been loaded, so write the file to
  stand alone: plain WordPress functions and `$wpdb`.
- **Ask before deleting.** Most people who delete an extension reinstall it. Delete stored data only
  when the site owner opted in, usually with a setting. Your settings are in the option
  `fw_ext_settings_options:<extension-name>`.
- **Multisite:** loop over the sites and check each site's own setting.
- A fatal error or exception in the file is caught, and the uninstall carries on. Leftover data is
  better than a half-deleted extension.

Two variables are available: `$fw_extension_name` (the extension's name) and `$fw_uninstall_file`.

## Example

```php title="framework/extensions/my-extension/uninstall.php"
<?php
if ( ! defined( 'FW_EXTENSION_UNINSTALL' ) ) {
	return;
}

$my_cleanup = static function () {
	global $wpdb;

	$settings = get_option( 'fw_ext_settings_options:my-extension', [] );

	if ( empty( $settings['delete_on_uninstall'] ) ) {
		return; // The owner did not ask for it.
	}

	delete_option( 'fw_ext_settings_options:my-extension' );
	$wpdb->query( $wpdb->prepare(
		"DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE %s",
		$wpdb->esc_like( '_my_extension_' ) . '%'
	) );
	wp_clear_scheduled_hook( 'my_extension_cron' );
};

if ( is_multisite() ) {
	foreach ( get_sites( [ 'fields' => 'ids', 'number' => 0 ] ) as $blog_id ) {
		switch_to_blog( $blog_id );
		$my_cleanup();
		restore_current_blog();
	}
} else {
	$my_cleanup();
}
```

The SEO extension's `uninstall.php` is a complete working example; see
[Access and removal](/seo/access-and-removal) for what it removes.

## When it does not run

- **Deactivating** an extension never runs it.
- **Updating** the plugin replaces the extension folders without running it.
- Deleting the extension folder by hand (FTP, a file manager) skips it, as it would for a plugin.
