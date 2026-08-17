---
title: "Select"
sidebar_position: 6
---


Regular select.

<img src="/img/options/opt-select.png" alt="select option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_select' => [
		'label' => __( 'Select', 'unysonplus' ),  // or false to hide the label column
		'type' => 'select',
		'value' => 'c',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'' => '---',
			'a' => __( 'Lorem ipsum', 'unysonplus' ),
			'b' => [
				'text' => __( 'Consectetur', 'unysonplus' ),
				'attr' => [
					'label' => 'Label overrides text',
					'data-whatever' => 'some data',
				],
			],
			[
				'attr' => [
					'label' => __( 'Optgroup Label', 'unysonplus' ),
					'data-whatever' => 'some data',
				],
				'choices' => [
					'c' => __( 'Sed ut perspiciatis', 'unysonplus' ),
					'd' => __( 'Excepteur sint occaecat', 'unysonplus' ),
				],
			],
			1 => __( 'One', 'unysonplus' ),
			2 => __( 'Two', 'unysonplus' ),
			3 => __( 'Three', 'unysonplus' ),
		],
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

`select` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_select'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_select' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_select'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_select' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_select' ) )` outputs — the shape of this option type's stored value:

```text
choice_2
```

## In Gutenberg blocks (the React control)

`select` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar. The same control also serves [`short-select`](./short-select.md) — the two share one implementation.

### Why this exists

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. That works on ordinary admin screens like the page builder and Theme Settings.

A Gutenberg block's settings sidebar is a **React app**. React draws that panel itself and will not accept ready-made HTML from PHP, so a PHP-only option type cannot appear there.

Rather than rewrite the option type, it gets a **second renderer**. Both read the same schema you write in `options.php`, and both save the same value:

| | Renders | Used by |
| --- | --- | --- |
| PHP `_render()` | HTML | Page builder, Theme Settings, metaboxes |
| React control | a React component | Gutenberg block sidebars |

Your option definition does not change. React handles *editing* only; the front end is still rendered by PHP.

### What the `select` control does

It wraps WordPress's own [`SelectControl`](https://developer.wordpress.org/block-editor/reference-guides/components/select-control/), converting your `choices` array into the option list.

`choices` is flexible, and the control handles both shapes:

```php
// 1 — key => label
'choices' => [ 'left' => __( 'Left', 'unysonplus' ), 'right' => __( 'Right', 'unysonplus' ) ],

// 2 — key => array, when a choice carries extra metadata
'choices' => [ 'left' => [ 'text' => __( 'Left', 'unysonplus' ), 'icon' => 'dashicons-arrow-left' ] ],
```

For the second shape it reads `text`, falls back to `label`, and finally to the key itself — so a choice can never render blank, even if its metadata is shaped unexpectedly. The **key** is always what gets saved, matching the PHP renderer.

### Why one control serves two option types

`short-select` differs from `select` only in **width** — it is the same dropdown, rendered narrower on PHP-driven admin screens. In a Gutenberg sidebar the panel is already narrow and WordPress controls the layout, so that distinction has nothing to express. Registering the same component for both is therefore not a shortcut; it reflects that the difference is purely presentational:

```js
register( 'select', Select );
register( 'short-select', Select );
```

### No second copy of React

The bundle contains **no React**. JSX compiles to `wp.element.createElement`, and `wp.element` is the React WordPress already loads in wp-admin — so the control uses React without shipping it.

:::tip[For option-type authors]
Most option types have no React control yet. That is a coverage gap, not an error — such an option shows a clear notice in a block sidebar and works normally everywhere else. Controls get ported when a block actually needs them.
:::
