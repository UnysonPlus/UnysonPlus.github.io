---
title: "Number"
sidebar_position: 43
---

An HTML5 number input with optional `min` / `max` / `step`. Saved as integer or float depending on `numeric_type` / `step`.

## Integer

<img src="/img/options/opt-demo_number.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_number' => [
		'label' => __( 'Number', 'unysonplus' ),
		'type' => 'number',
		'value' => 7,
		'min' => 0,
		'max' => 100,
		'step' => 1,
		'numeric_type' => 'integer',
		'desc' => __( 'HTML5 number input with min/max/step. Saved as integer.', 'unysonplus' ),
	],
];
```

## Float

<img src="/img/options/opt-demo_number_float.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_number_float' => [
		'label' => __( 'Number (float)', 'unysonplus' ),
		'type' => 'number',
		'value' => 1.5,
		'step' => 0.1,
		'desc' => __( 'Unbounded number input. Saved as float.', 'unysonplus' ),
	],
];
```

## Reading the value

`number` returns an **integer** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo (int) $atts['demo_number_2'];
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_number_2' );
echo (int) $value;
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo (int) $book['demo_number_2'];
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_number_2' );
echo (int) $value;
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_number_2' ) )` outputs — the shape of this option type's stored value:

```text
7
```
