---
title: "Select"
sidebar_position: 6
---


Regular select.

<img src="/img/options/opt-select.png" alt="select option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_select' => [
		'label' => __( 'Select', 'unysonplus' ),  // or false to hide the label column
		'type' => 'select',
		'value' => 'c',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'' => '---',
			'a' => __( 'Lorem ipsum', 'unysonplus' ),
			'b' => [
				'text' => __( 'Consectetur', 'unysonplus' ),
				'attr' => [
					'label' => 'Label overrides text',
					'data-whatever' => 'some data',
				],
			],
			[
				'attr' => [
					'label' => __( 'Optgroup Label', 'unysonplus' ),
					'data-whatever' => 'some data',
				],
				'choices' => [
					'c' => __( 'Sed ut perspiciatis', 'unysonplus' ),
					'd' => __( 'Excepteur sint occaecat', 'unysonplus' ),
				],
			],
			1 => __( 'One', 'unysonplus' ),
			2 => __( 'Two', 'unysonplus' ),
			3 => __( 'Three', 'unysonplus' ),
		],
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

`select` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_select'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_select' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_select'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_select' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_select' ) )` outputs — the shape of this option type's stored value:

```text
choice_2
```
