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
echo esc_html( $atts['demo_datetime_picker'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_datetime_picker' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_datetime_picker'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_datetime_picker' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_datetime_picker' ) )` outputs — the shape of this option type's stored value:

```text
2026-06-24 14:30
```

## In Gutenberg blocks (the React control)

``datetime-picker`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `datetime-picker` control does

A native date / time / datetime input, matched to the schema's `datepicker` and `timepicker` flags — and it writes the value back in the schema's **PHP `date()` format**.

:::caution[The server validates the FORMATTING, not just the date]
`_fw_validate_date_format()` re-formats the value it parsed and compares it back to the input. A perfectly valid date in the **wrong shape** is therefore discarded and replaced by the option default.

An ISO string (`2026-09-01T14:30`) into a `Y/m/d H:i` field is the exact mistake a React control is likely to make, and it fails silently: the picker looks like it worked, and the countdown quietly counts to nothing. That case is asserted in the parity suite as a *rejection*.
:::

:::note[An unsupported format falls back to a text field]
The control renders the tokens this codebase's schemas actually use (`Y y m n d j H G i s`, plus backslash escapes). Meet anything else and it degrades to a plain text input **showing the expected format**, rather than emitting a string built from a partial understanding of it.

A text field that says `Y/m/d H:i` is mildly annoying. A picker that writes an unparseable string is a bug someone debugs on launch day.
:::

:::note[`minDate` / `maxDate` are passed to the input]
They are enforced server-side regardless; giving them to the browser means an out-of-range value is refused up front instead of being discarded on save without explanation.
