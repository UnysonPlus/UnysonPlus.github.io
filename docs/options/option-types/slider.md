---
title: "Slider"
sidebar_position: 21
---


Drag the handle to select a numeric value.

<img src="/img/options/opt-slider.png" alt="slider option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_slider' => [
		'label' => __( 'Slider', 'unysonplus' ),  // or false to hide the label column
		'type' => 'slider',
		'value' => 10,
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'properties' => [ 'min' => 0, 'max' => 100, 'step' => 1 ],
	],
];
```

## Reading the value

`slider` returns a **number** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo (float) $atts['demo_slider'];
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_slider' );
echo (float) $value;
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo (float) $book['demo_slider'];
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_slider' );
echo (float) $value;
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_slider' ) )` outputs — the shape of this option type's stored value:

```text
7
```

## In Gutenberg blocks (the React control)

`slider` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. That works in the page builder and on Theme Settings, which are ordinary admin pages. A block's settings sidebar is a **React app**, which draws the whole panel itself and will not accept ready-made HTML from PHP.

So the option type gets a **second renderer**. Both read the same schema — the array you write in `options.php` — and both produce the **same saved value**. The PHP path stays authoritative; the React path is additive. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation of how the two fit together.

### What the `slider` control does

It wraps WordPress's [`RangeControl`](https://developer.wordpress.org/block-editor/reference-guides/components/range-control/), reading its bounds from `properties`:

| Schema key | Becomes |
| --- | --- |
| `label` | the field label |
| `desc` | the help text |
| `properties.min` | the range minimum |
| `properties.max` | the range maximum |
| `properties.step` | the step increment |

The stored value is a **number** — `_get_value_from_input()` ends in `floatval()`, so the control emits `40`, never the string `"40"` an input element would otherwise give. Storing the wrong one makes a value compare unequal to itself across the two renderers.

The same control also serves `short-slider`, which differs only in rendered width on PHP-driven admin screens — a distinction a block sidebar has nothing to express.
