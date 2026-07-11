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
$value = $atts['demo_addable_box_2'];
foreach ( (array) $value as $row ) {
	// each $row is one added box (an array of its sub-option values)
}
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_addable_box_2' );
foreach ( (array) $value as $row ) {
	// each $row is one added box (an array of its sub-option values)
}
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_addable_box_2'];
foreach ( (array) $value as $row ) {
	// each $row is one added box (an array of its sub-option values)
}
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_addable_box_2' );
foreach ( (array) $value as $row ) {
	// each $row is one added box (an array of its sub-option values)
}
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_addable_box_2' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
)
```
