---
title: "WP Editor"
sidebar_position: 28
---


Textarea with the WordPress Editor like the one you use on the blog posts edit pages.

```php
$options = [
	'demo_wp_editor' => [
		'label' => __( 'Rich Text Editor', 'unysonplus' ),  // or false to hide the label column
		'type' => 'wp-editor',
		'value' => 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		'reinit' => true,
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'dynamic_content' => false,  // hide the Dynamic Content (database) picker
	],
];
```

## Reading the value

`wp-editor` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo wp_kses_post( $atts['demo_wp_editor_2'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_wp_editor_2' );
echo wp_kses_post( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo wp_kses_post( $book['demo_wp_editor_2'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_wp_editor_2' );
echo wp_kses_post( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_wp_editor_2' ) )` outputs — the shape of this option type's stored value:

```text
'<p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>'
```
