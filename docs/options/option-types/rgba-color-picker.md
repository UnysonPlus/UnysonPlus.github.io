---
title: "RGBA Color Picker"
sidebar_position: 11
---


Pick a `rgba()` color.

<img src="/img/options/opt-rgba-color-picker.png" alt="rgba-color-picker option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_rgba_color_picker' => [
		'label' => __( 'RGBA Color Picker', 'unysonplus' ),  // or false to hide the label column
		'type' => 'rgba-color-picker',
		'value' => 'rgba(255, 0, 0, .5)',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'palettes' => false,  // hide the preset colour palettes
	],
];
```

## Reading the value

`rgba-color-picker` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_attr( $atts['demo_rgba_color_picker'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_rgba_color_picker' );
echo esc_attr( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_attr( $book['demo_rgba_color_picker'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_rgba_color_picker' );
echo esc_attr( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_rgba_color_picker' ) )` outputs — the shape of this option type's stored value:

```text
'rgba(255, 0, 0, .5)'
```
