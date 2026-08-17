---
title: "Color Picker"
sidebar_position: 10
---


Pick a color.

<img src="/img/options/opt-color-picker.png" alt="color-picker option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_color_picker' => [
		'label' => __( 'Color Picker', 'unysonplus' ),  // or false to hide the label column
		'type' => 'color-picker',
		'value' => '',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'palettes' => false,  // hide the preset colour palettes
	],
];
```

## Reading the value

`color-picker` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_attr( $atts['demo_color_picker'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_color_picker' );
echo esc_attr( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_attr( $book['demo_color_picker'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_color_picker' );
echo esc_attr( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_color_picker' ) )` outputs — the shape of this option type's stored value:

```text
#e5322d
```

## In Gutenberg blocks (the React control)

`color-picker` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. That works in the page builder and on Theme Settings, which are ordinary admin pages. A block's settings sidebar is a **React app**, which draws the whole panel itself and will not accept ready-made HTML from PHP.

So the option type gets a **second renderer**. Both read the same schema — the array you write in `options.php` — and both produce the **same saved value**. The PHP path stays authoritative; the React path is additive. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation of how the two fit together.

### What the `color-picker` control does

It wraps WordPress's [`ColorPicker`](https://developer.wordpress.org/block-editor/reference-guides/components/color-picker/), behind a swatch button so the panel stays compact. `alpha` enables the opacity slider; a **Clear** button appears once a colour is set.

:::caution[The stored value is always hex — never rgba()]
`_get_value_from_input()` accepts only 3, 4, 6 or 8-digit hex and **silently falls back to the option default** on anything else. Alpha is therefore expressed as **8-digit hex** (`#rrggbbaa`), not as an `rgba()` string.

This matters because `ColorPicker` will hand back an `rgba()` string once alpha is enabled. The React control normalises everything to hex before saving, so the user's colour is never quietly replaced by the default. If you write your own control for this option type, do the same.
:::
