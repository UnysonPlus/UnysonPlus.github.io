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
2026-06-24
```

## In Gutenberg blocks (the React control)

``date-picker`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `date-picker` control does

A native date input that reads and writes the stored format, **`dd-MM-yyyy`** — `01-09-2026`.

:::caution[The validator accepts anything, so the control has to be right]
`_get_value_from_input()` only casts to string. A wrong format is not rejected — it is **misread later**.

Emit ISO (`2026-09-01`) and it saves happily. Then PHP reads it, and `strtotime()` treats a dash-separated date as **d-m-Y** — so `2026-09-01` parses as day 2026 of month 09. The symptom is an event on a nonsensical date, months from where it belongs, with no error anywhere.

The format is not a guess: the option type's own script sets `dateFormat: 'dd-MM-yyyy'` and parses values back with `/^(\d{2})-(\d{2})-(\d{4})/`.
:::

:::note[`min-date` / `max-date` are converted for the input]
They are declared in the same `dd-MM-yyyy` form, so the browser enforces the range the schema intends instead of leaving it to the server.
:::
