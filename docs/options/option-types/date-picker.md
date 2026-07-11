---
title: "Date Picker"
sidebar_position: 15
---

Pick a date in calendar.

<img src="/img/options/opt-date-picker.png" alt="date-picker option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_date_picker' => [
		'type' => 'date-picker',
		'value' => '',
		'attr' => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label' => __('Label', 'unysonplus'),  // or false to hide the label column
		'desc' => __('Description', 'unysonplus'),
		'help' => __('Help tip', 'unysonplus'),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		'monday-first' => true, // The week will begin with Monday; for Sunday, set to false
		'min-date' => date('d-m-Y'), // By default minimum date will be current day. Set a date in format d-m-Y as a start date
		'max-date' => null, // By default there is not maximum date. Set a date in format d-m-Y as a start date
	],
];
```

## Reading the value

`date-picker` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_date_picker'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_date_picker' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_date_picker'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_date_picker' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_date_picker' ) )` outputs — the shape of this option type's stored value:

```text
'2026-06-15'
```
