---
title: "Addable Popup"
sidebar_position: 24
---


Addable popup with options.

<img src="/img/options/opt-addable-popup.png" alt="addable-popup option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_addable_popup' => [
		'label' => __( 'Addable Popup', 'unysonplus' ),  // or false to hide the label column
		'type' => 'addable-popup',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'template' => '{{- demo_text }}',
		'popup-options' => [
			'demo_text' => [
				'label' => __( 'Text', 'unysonplus' ),
				'type' => 'text',
				'value' => 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
			'demo_image_picker' => [
				'label' => __( 'Image Picker', 'unysonplus' ),
				'type' => 'image-picker',
				'value' => '',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'choices' => [
					'choice-1' => [
						'label' => __( 'First Image', 'unysonplus' ),
						'small' => [
							'height' => 70,
							'src' => get_template_directory_uri() . '/images/image-picker-demo/thumb1.jpg'
						],
						'large' => [
							'height' => 214,
							'src' => get_template_directory_uri() . '/images/image-picker-demo/tooltip1.jpg'
						],
					],
					'choice-2' => [
						'label' => __( 'Second Image', 'unysonplus' ),
						'small' => [
							'height' => 70,
							'src' => get_template_directory_uri() . '/images/image-picker-demo/thumb2.jpg'
						],
						'large' => [
							'height' => 214,
							'src' => get_template_directory_uri() . '/images/image-picker-demo/tooltip2.jpg'
						],
					],
				],
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
			'demo_upload_images' => [
				'label' => __( 'Single Upload (Images Only)', 'unysonplus' ),
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'type' => 'upload',
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
			'demo_addable_popup_inner' => [
				'label' => __( 'Addable Popup', 'unysonplus' ),
				'type' => 'addable-popup',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'template' => 'Title color-picker value : {{- demo_color_picker }}',
				'popup-options' => [
					'demo_multi_upload_images' => [
						'label' => __( 'Multi Upload (images only)', 'unysonplus' ),
						'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
							'unysonplus' ),
						'type' => 'multi-upload',
						'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
							__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
								'unysonplus' ),
							__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
								'unysonplus' )
						),
					],
					'demo_color_picker' => [
						'label' => __( 'Color Picker', 'unysonplus' ),
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
					]
				]
			],
		],
		// — Optional attributes you can add —
		// 'popup-title' => null,
		// 'size' => 'small',  // small, medium, large
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'add-button-text' => __( 'Add', 'unysonplus' ),
		// 'sortable' => false,
		// 'limit' => 5,
		// 'connect_group' => 'my_group',  // cross-list drag-and-drop (see below)
	],
];
```

## Cross-list drag-and-drop — `connect_group`

Set the **same non-empty `connect_group`** on two or more `addable-popup`s and their items can be
dragged **between** them (not just reordered within one list). This is what powers dragging an
element from one header/footer column to another. Empty (the default) keeps each list
self-contained.

```php
// Two lists that share a group id → items drag across; a third, ungrouped list stays isolated.
$options = [
	'column_left' => [
		'type'          => 'addable-popup',
		'label'         => __( 'Left Column', 'unysonplus' ),
		'connect_group' => 'my_bar',       // ← same id
		'template'      => '{{- label }}',
		'popup-options' => [ 'label' => [ 'type' => 'text', 'label' => __( 'Label', 'unysonplus' ) ] ],
	],
	'column_right' => [
		'type'          => 'addable-popup',
		'label'         => __( 'Right Column', 'unysonplus' ),
		'connect_group' => 'my_bar',       // ← same id → interlinks with column_left
		'template'      => '{{- label }}',
		'popup-options' => [ 'label' => [ 'type' => 'text', 'label' => __( 'Label', 'unysonplus' ) ] ],
	],
];
```

**Scope the group id** per logical group (one bar's columns, one row + its column count) so
**unrelated** `addable-popup`s on the same settings page don't interlink. The id is sanitized to a
CSS-safe token and emitted as `.fw-ap-connect-<group>` on the wrapper.

Notes:

- **Empty connected lists stay visible** as a "Drag an item here" drop target (a `display:none`
  list can't receive a drop).
- **Moves persist automatically.** Under the hood the form saves by input name, so a dragged item
  is re-keyed to the receiving list on drop — you don't need to do anything; just set the same
  `connect_group`.
- Try it live in **Theme Settings → (demo pages)**: the *Connected List A / B* pair, or the real
  thing in **Header → Main** and **Footer → Main Footer** (drag an element between columns).

## Reading the value

`addable-popup` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_addable_popup'];
foreach ( (array) $value as $row ) {
	// each $row is one added item (an array of its sub-option values)
}
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_addable_popup' );
foreach ( (array) $value as $row ) {
	// each $row is one added item (an array of its sub-option values)
}
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_addable_popup'];
foreach ( (array) $value as $row ) {
	// each $row is one added item (an array of its sub-option values)
}
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_addable_popup' );
foreach ( (array) $value as $row ) {
	// each $row is one added item (an array of its sub-option values)
}
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_addable_popup' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [0] => Array
        (
            [demo_text] => Row one text
        )

    [1] => Array
        (
            [demo_text] => Row two text
        )

)
```
