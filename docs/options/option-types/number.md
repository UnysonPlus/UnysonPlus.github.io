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
echo (int) $atts['demo_number'];
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_number' );
echo (int) $value;
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo (int) $book['demo_number'];
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_number' );
echo (int) $value;
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_number' ) )` outputs — the shape of this option type's stored value:

```text
42
```

## In Gutenberg blocks (the React control)

``number`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `number` control does

A numeric field with the declared `min`, `max` and `step` — and, crucially, one that stores a **number** rather than the string an `<input>` hands back. `numeric_type` decides whether that is an integer or a float, exactly as it does in PHP.

:::note[Clamping happens when you leave the field, not as you type]
Clamping on every keystroke makes a `min` of `10` impossible to reach: type `1` and it snaps to `10`, so the `2` you meant to type next lands *after* it and you get `102`.

So while the field has focus it holds what you typed, and it is reconciled when you leave — which is also the moment PHP would have clamped it. The two agree on the value that is finally stored.
:::

:::note[Clearing the field does not store zero]
An emptied field stays empty rather than snapping to `0`. Clearing is usually a step on the way to typing something else, not an instruction to store zero. On blur it resolves to the option's declared default.
:::
