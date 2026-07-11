---
title: "Background Image"
sidebar_position: 14
---


Choose background image.

<img src="/img/options/opt-background-image.png" alt="background-image option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_background_image' => [
		'label' => __( 'Background Image', 'unysonplus' ),  // or false to hide the label column
		'type' => 'background-image',
		'value' => 'none',
		'choices' => [
			'none' => [
				'icon' => get_template_directory_uri() . '/images/patterns/no_pattern.jpg',
				'css' => [
					'background-image' => 'none'
				]
			],
			'bg-1' => [
				'icon' => get_template_directory_uri() . '/images/patterns/diagonal_bottom_to_top_pattern_preview.jpg',
				'css' => [
					'background-image' => 'url("' . get_template_directory_uri() . '/images/patterns/diagonal_bottom_to_top_pattern.png' . '")',
					'background-repeat' => 'repeat',
				]
			],
			'bg-2' => [
				'icon' => get_template_directory_uri() . '/images/patterns/diagonal_top_to_bottom_pattern_preview.jpg',
				'css' => [
					'background-image' => 'url("' . get_template_directory_uri() . '/images/patterns/diagonal_top_to_bottom_pattern.png' . '")',
					'background-repeat' => 'repeat',
				]
			],
			'bg-3' => [
				'icon' => get_template_directory_uri() . '/images/patterns/dots_pattern_preview.jpg',
				'css' => [
					'background-image' => 'url("' . get_template_directory_uri() . '/images/patterns/dots_pattern.png' . '")',
					'background-repeat' => 'repeat',
				]
			],
			'bg-4' => [
				'icon' => get_template_directory_uri() . '/images/patterns/romb_pattern_preview.jpg',
				'css' => [
					'background-image' => 'url("' . get_template_directory_uri() . '/images/patterns/romb_pattern.png' . '")',
					'background-repeat' => 'repeat',
				]
			],
			'bg-5' => [

				'icon' => get_template_directory_uri() . '/images/patterns/square_pattern_preview.jpg',
				'css' => [
					'background-image' => 'url("' . get_template_directory_uri() . '/images/patterns/square_pattern.png' . '")',
					'background-repeat' => 'repeat',
				]
			],
			'bg-6' => [
				'icon' => get_template_directory_uri() . '/images/patterns/noise_pattern_preview.jpg',
				'css' => [
					'background-image' => 'url("' . get_template_directory_uri() . '/images/patterns/noise_pattern.png' . '")',
					'background-repeat' => 'repeat',
				]
			],
			'bg-7' => [
				'icon' => get_template_directory_uri() . '/images/patterns/vertical_lines_pattern_preview.jpg',
				'css' => [
					'background-image' => 'url("' . get_template_directory_uri() . '/images/patterns/vertical_lines_pattern.png' . '")',
					'background-repeat' => 'repeat',
				]
			],
			'bg-8' => [
				'icon' => get_template_directory_uri() . '/images/patterns/waves_pattern_preview.jpg',
				'css' => [
					'background-image' => 'url("' . get_template_directory_uri() . '/images/patterns/waves_pattern.png' . '")',
					'background-repeat' => 'repeat',
				]
			],
		],
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
	],
];
```

## Reading the value

`background-image` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_background_image_2'];
echo esc_attr( $value['type'] ); // + predefined / custom / data (see Saved value)
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_background_image_2' );
echo esc_attr( $value['type'] ); // + predefined / custom / data (see Saved value)
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_background_image_2'];
echo esc_attr( $value['type'] ); // + predefined / custom / data (see Saved value)
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_background_image_2' );
echo esc_attr( $value['type'] ); // + predefined / custom / data (see Saved value)
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_background_image_2' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [type] => 'predefined'
    [predefined] => 'none'
    [custom] => ''
    [data] => Array
        (
            [icon] => 'http://localhost/testsite/wp-content/themes/unysonplus-theme/images/patterns/no_pattern.jpg'
            [css] => Array
                (
                    [background-image] => 'none'
                )
        )
)
```
