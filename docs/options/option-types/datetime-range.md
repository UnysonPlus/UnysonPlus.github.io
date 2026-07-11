---
title: "Datetime Range"
sidebar_position: 17
---


Set a datetime range.

<img src="/img/options/opt-datetime-range.png" alt="datetime-range option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_datetime_range' => [
		'type' => 'datetime-range',
		'attr' => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label' => __( 'Demo date range', 'unysonplus' ),  // or false to hide the label column
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		'datetime-pickers' => [
			'from' => [
				'timepicker' => false,
				'datepicker' => true,
			],
			'to' => [
				'timepicker' => false,
				'datepicker' => true,
			]
		],
		'value' => [
			'from' => '',
			'to' => ''
		]
	],
];
```

## Reading the value

`datetime-range` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_datetime_range'];
echo esc_html( $value['from'] ) . ' - ' . esc_html( $value['to'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_datetime_range' );
echo esc_html( $value['from'] ) . ' - ' . esc_html( $value['to'] );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_datetime_range'];
echo esc_html( $value['from'] ) . ' - ' . esc_html( $value['to'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_datetime_range' );
echo esc_html( $value['from'] ) . ' - ' . esc_html( $value['to'] );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_datetime_range' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [from] => ''
    [to] => ''
)
```
