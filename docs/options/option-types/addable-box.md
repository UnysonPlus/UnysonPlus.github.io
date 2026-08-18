---
title: "Addable Box"
sidebar_position: 26
---


Addable box with options.

<img src="/img/options/opt-addable-box.png" alt="addable-box option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_addable_box' => [
		'label' => __( 'Addable Box', 'unysonplus' ),  // or false to hide the label column
		'type' => 'addable-box',
		'value' => [],
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		'box-controls' => [//'custom' => '<small class="dashicons dashicons-smiley" title="Custom"></small>',
		],
		'box-options' => [
			'demo_text' => [
				'label' => __( 'Text', 'unysonplus' ),
				'type' => 'text',
				'value' => 'Lorem ipsum dolor sit amet',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
			'demo_textarea' => [
				'label' => __( 'Textarea', 'unysonplus' ),
				'type' => 'textarea',
				'value' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => [
					'icon' => 'video',
					'html' => '<iframe width="420" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>'
				],
			],
		],
		'template' => '{{- demo_text }}',
		'limit' => 3,
		// — Optional attributes you can add —
		// 'box-duplicate' => true,
		// 'width' => 'fixed',  // fixed | auto | full
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'add-button-text' => __( 'Add', 'unysonplus' ),
		// 'sortable' => false,
	],
];
```

**Custom Events**

`fw:option-type:addable-box:box:init` - Box was initialized. Triggered for each existing box after page load, or when a box was added.

`fw:option-type:addable-box:control:click` - A custom control was clicked.

## Reading the value

`addable-box` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_addable_box'];
foreach ( (array) $value as $row ) {
	// each $row is one added box (an array of its sub-option values)
}
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_addable_box' );
foreach ( (array) $value as $row ) {
	// each $row is one added box (an array of its sub-option values)
}
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_addable_box'];
foreach ( (array) $value as $row ) {
	// each $row is one added box (an array of its sub-option values)
}
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_addable_box' );
foreach ( (array) $value as $row ) {
	// each $row is one added box (an array of its sub-option values)
}
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_addable_box' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [0] => Array
        (
            [title] => First card
            [text] => Some text for the first card.
        )

    [1] => Array
        (
            [title] => Second card
            [text] => Some text for the second card.
        )

)
```

## In Gutenberg blocks (the React control)

``addable-box`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `addable-box` control does

The same repeater as [`addable-popup`](./addable-popup.md) — items expand in place rather than opening a modal — reading its children from **`box-options`**.

:::note[One component, two option types]
The React control wraps the addable-popup component with the child-options key remapped, rather than being a second copy of a repeater. Two copies would drift on the first fix that only one of them received.
:::

:::note[This type DOES validate its children]
Unlike `addable-popup`, `_get_value_from_input()` runs each child option's validator. That changes nothing on the block path, where no validation runs at all, but it is why the children must emit the **wire** format for the page-builder path to agree — which rendering them through the shared registry provides.
:::
