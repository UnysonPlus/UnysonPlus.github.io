---
title: "Checkboxes"
sidebar_position: 4
---


A list of checkboxes.

<img src="/img/options/opt-checkboxes.png" alt="checkboxes option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_checkboxes' => [
		'label' => __( 'Checkboxes', 'unysonplus' ),  // or false to hide the label column
		'type' => 'checkboxes',
		'value' => [
			'c1' => false,
			'c2' => true,
		],
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'c1' => __( 'Checkbox 1 Custom Text', 'unysonplus' ),
			'c2' => __( 'Checkbox 2 Custom Text', 'unysonplus' ),
			'c3' => __( 'Checkbox 3 Custom Text', 'unysonplus' ),
		],
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'inline' => true,  // lay them out in a row
	],
];
```

## Reading the value

`checkboxes` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_checkboxes'];
echo esc_html( implode( ', ', array_keys( array_filter( $value ) ) ) ); // the ticked keys
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_checkboxes' );
echo esc_html( implode( ', ', array_keys( array_filter( $value ) ) ) ); // the ticked keys
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_checkboxes'];
echo esc_html( implode( ', ', array_keys( array_filter( $value ) ) ) ); // the ticked keys
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_checkboxes' );
echo esc_html( implode( ', ', array_keys( array_filter( $value ) ) ) ); // the ticked keys
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_checkboxes' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [choice_a] => 1
    [choice_b] => 
    [choice_c] => 1
)
```

## In Gutenberg blocks (the React control)

``checkboxes`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `checkboxes` control does

A list of independent toggles, laid out inline when the schema sets `inline`.

:::caution[Unchecked boxes are omitted, never sent as `false`]
`_get_value_from_input()` keeps every submitted entry whose value is not the **empty string**, and stores it as `true`. It never tests truthiness.

So sending `{ author: false }` for an unchecked box would store `author => true` — the box would come back **checked**. The control therefore omits unchecked keys entirely, and the parity suite asserts both halves: that omitting works, and that `false` really does round-trip to `true`.

That second assertion looks strange in a test file. It is there so a later "simplification" that sends both states fails loudly instead of quietly re-checking boxes people unticked.
:::

:::note[Stale keys disappear on their own]
A saved key that is no longer in `choices` is dropped server-side. The control does not render a box for it either — better to show nothing than a control the server will refuse.
:::
