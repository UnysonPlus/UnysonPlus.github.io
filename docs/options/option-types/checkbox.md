---
title: "Checkbox"
sidebar_position: 3
---


Single checkbox.

<img src="/img/options/opt-checkbox.png" alt="checkbox option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_checkbox' => [
		'label' => __( 'Checkbox', 'unysonplus' ),  // or false to hide the label column
		'type' => 'checkbox',
		'value' => true,
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'text' => __( 'Custom text', 'unysonplus' ),
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

`checkbox` returns a **boolean** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo $atts['demo_checkbox'] ? 'Yes' : 'No';
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_checkbox' );
echo $value ? 'Yes' : 'No';
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo $book['demo_checkbox'] ? 'Yes' : 'No';
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_checkbox' );
echo $value ? 'Yes' : 'No';
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_checkbox' ) )` outputs — the shape of this option type's stored value:

```text
true
```
