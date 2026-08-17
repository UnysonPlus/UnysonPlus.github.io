---
title: "Short Select"
sidebar_position: 42
---

A narrow **Select** dropdown.

<img src="/img/options/opt-demo_short_select.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_short_select' => [
		'label' => __( 'Short Select', 'unysonplus' ),
		'type' => 'short-select',
		'value' => '7',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'1' => '1',
			'2' => '2',
			'3' => '3',
			'4' => '4',
			'5' => '5',
			'6' => '6',
			'7' => '7',
		],
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```

## Reading the value

`short-select` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_short_select'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_short_select' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_short_select'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_short_select' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_short_select' ) )` outputs — the shape of this option type's stored value:

```text
choice_2
```

## In Gutenberg blocks (the React control)

`short-select` has a **React version**, so it can appear inside a Gutenberg block's sidebar — and it is served by the **same React component as [`select`](./select.md)**.

### Why this exists

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive, which is fine on ordinary admin screens like the page builder and Theme Settings.

A Gutenberg block's settings sidebar is a **React app**. React draws that panel itself and will not accept ready-made HTML from PHP, so a PHP-only option type cannot appear there.

So the option type gains a **second renderer** — a React component reading the same schema and saving the same value. Your option definition does not change, and the front end is still rendered by PHP.

### Why it shares `select`'s control

`short-select` differs from `select` in exactly one way: **width**. It is the same dropdown with the same `choices` array and the same saved value, rendered narrower on PHP-driven admin screens where the field sits in a wide two-column layout.

A Gutenberg sidebar has no such layout. The panel is already narrow and WordPress owns the spacing, so "short" has nothing left to express there. Registering one component for both option types reflects that the difference is purely presentational:

```js
register( 'select', Select );
register( 'short-select', Select );
```

This is worth understanding as a general principle: **a React control is registered per option *type*, but two types can share one implementation** when their difference does not survive the move. Should `short-select` ever gain behaviour of its own, it would get its own component — the registry makes that a one-line change.

For what the control does with `choices`, and how it handles both the `key => label` and `key => array` shapes, see [`select`](./select.md#in-gutenberg-blocks-the-react-control).

:::tip[For option-type authors]
Most option types have no React control yet. That is a coverage gap, not an error — such an option shows a clear notice in a block sidebar and works normally everywhere else. Controls get ported when a block actually needs them.
:::
