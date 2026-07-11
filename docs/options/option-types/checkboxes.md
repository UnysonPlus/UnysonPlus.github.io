---
title: "Checkboxes"
sidebar_position: 4
---


A list of checkboxes.

<img src="/img/options/opt-checkboxes.png" alt="checkboxes option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_checkboxes' => [
		'label' => __( 'Checkboxes', 'unysonplus' ),  // or false to hide the label column
		'type' => 'checkboxes',
		'value' => [
			'c1' => false,
			'c2' => true,
		],
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'c1' => __( 'Checkbox 1 Custom Text', 'unysonplus' ),
			'c2' => __( 'Checkbox 2 Custom Text', 'unysonplus' ),
			'c3' => __( 'Checkbox 3 Custom Text', 'unysonplus' ),
		],
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'inline' => true,  // lay them out in a row
	],
];
```

## Reading the value

`checkboxes` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_checkboxes'];
echo esc_html( implode( ', ', array_keys( array_filter( $value ) ) ) ); // the ticked keys
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_checkboxes' );
echo esc_html( implode( ', ', array_keys( array_filter( $value ) ) ) ); // the ticked keys
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_checkboxes'];
echo esc_html( implode( ', ', array_keys( array_filter( $value ) ) ) ); // the ticked keys
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_checkboxes' );
echo esc_html( implode( ', ', array_keys( array_filter( $value ) ) ) ); // the ticked keys
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_checkboxes' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [choice_a] => 1
    [choice_b] => 
    [choice_c] => 1
)
```
