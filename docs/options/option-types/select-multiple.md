---
title: "Select Multiple"
sidebar_position: 7
---


Select with multiple values.

<img src="/img/options/opt-select-multiple.png" alt="select-multiple option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_select_multiple' => [
		'label' => __( 'Select Multiple', 'unysonplus' ),  // or false to hide the label column
		'type' => 'select-multiple',
		'value' => [ 'c', '2' ],
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

`select-multiple` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_select_multiple_2'];
echo esc_html( implode( ', ', (array) $value ) );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_select_multiple_2' );
echo esc_html( implode( ', ', (array) $value ) );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_select_multiple_2'];
echo esc_html( implode( ', ', (array) $value ) );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_select_multiple_2' );
echo esc_html( implode( ', ', (array) $value ) );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_select_multiple_2' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [0] => 'c'
    [1] => '2'
)
```
