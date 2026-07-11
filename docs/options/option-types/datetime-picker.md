---
title: "Datetime Picker"
sidebar_position: 16
---


Pick a datetime in calendar.

<img src="/img/options/opt-datetime-picker.png" alt="datetime-picker option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_datetime_picker' => [
		'type' => 'datetime-picker',
		'value' => '',
		'attr' => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label' => __( 'Date & Time picker', 'unysonplus' ),  // or false to hide the label column
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		'datetime-picker' => [
			'format' => 'd-m-Y H:i',
			'extra-formats' => [],
			'moment-format' => 'DD-MM-YYYY HH:mm',
			'scrollInput' => false,
			'maxDate' => false,
			'minDate' => false,
			'timepicker' => true,
			'datepicker' => true,
			'defaultTime' => '12:00'
		]
	],
];
```

## Reading the value

`datetime-picker` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_datetime_picker_2'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_datetime_picker_2' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_datetime_picker_2'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_datetime_picker_2' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_datetime_picker_2' ) )` outputs — the shape of this option type's stored value:

```text
''
```
