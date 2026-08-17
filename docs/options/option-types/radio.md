---
title: "Radio"
sidebar_position: 5
---


A list of radio buttons.

<img src="/img/options/opt-radio.png" alt="radio option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_radio' => [
		'label' => __( 'Radio', 'unysonplus' ),  // or false to hide the label column
		'type' => 'radio',
		'value' => 'c2',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'c1' => __( 'Radio 1 Custom Text', 'unysonplus' ),
			'c2' => __( 'Radio 2 Custom Text', 'unysonplus' ),
			'c3' => __( 'Radio 3 Custom Text', 'unysonplus' ),
		],
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'inline' => false,
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
	],
];
```

## Reading the value

`radio` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_radio'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_radio' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_radio'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_radio' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_radio' ) )` outputs — the shape of this option type's stored value:

```text
choice_2
```

## In Gutenberg blocks (the React control)

`radio` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. That works in the page builder and on Theme Settings, which are ordinary admin pages. A block's settings sidebar is a **React app**, which draws the whole panel itself and will not accept ready-made HTML from PHP.

So the option type gets a **second renderer**. Both read the same schema — the array you write in `options.php` — and both produce the **same saved value**. The PHP path stays authoritative; the React path is additive. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation of how the two fit together.

### What the `radio` control does

It wraps WordPress's [`RadioControl`](https://developer.wordpress.org/block-editor/reference-guides/components/radio-control/). The `choices` map becomes the radio list, in declaration order.

| Schema key | Becomes |
| --- | --- |
| `label` | the field label |
| `desc` | the help text |
| `choices` | the radio options (value to label) |

The stored value is always the choice **key**, never the label.

:::note[`inline` is not reproduced]
`RadioControl` has no inline mode, and a block sidebar is a narrow column where stacked radios are the right layout anyway. This is a presentation difference only — the saved value is unaffected.
:::
