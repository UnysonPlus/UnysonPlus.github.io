---
title: "Image Picker"
sidebar_position: 13
---


Pick an image.

<img src="/img/options/opt-image-picker.png" alt="image-picker option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_image_picker' => [
		'label' => __( 'Image Picker', 'unysonplus' ),  // or false to hide the label column
		'type' => 'image-picker',
		'value' => '',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'choice-1' => [
				'small' => [
					'height' => 70,
					'src' => get_template_directory_uri() . '/images/image-picker-demo/thumb1.jpg'
				],
				'large' => [
					'height' => 214,
					'src' => get_template_directory_uri() . '/images/image-picker-demo/tooltip1.jpg'
				],
			],
			'choice-2' => [
				'small' => [
					'height' => 70,
					'src' => get_template_directory_uri() . '/images/image-picker-demo/thumb2.jpg'
				],
				'large' => [
					'height' => 214,
					'src' => get_template_directory_uri() . '/images/image-picker-demo/tooltip2.jpg'
				],
			],
		],
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'blank' => true,  // allow deselecting (no choice)
	],
];
```

**Custom Events**

`fw:option-type:image-picker:clicked` - A thumbnail was clicked.

`fw:option-type:image-picker:changed` - Value was changed.

## Reading the value

`image-picker` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_image_picker_2'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_image_picker_2' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_image_picker_2'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_image_picker_2' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_image_picker_2' ) )` outputs — the shape of this option type's stored value:

```text
'choice-1'
```
