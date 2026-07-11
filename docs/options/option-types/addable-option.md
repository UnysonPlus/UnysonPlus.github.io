---
title: "Addable Option"
sidebar_position: 25
---


Create a list of options.

<img src="/img/options/opt-addable-option.png" alt="addable-option option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_addable_option' => [
		'label' => __( 'Addable Option', 'unysonplus' ),  // or false to hide the label column
		'type' => 'addable-option',
		'option' => [
			'type' => 'text',
		],
		'value' => [ 'Option 1', 'Option 2', 'Option 3' ],
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		)
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'add-button-text' => __( 'Add', 'unysonplus' ),
		// 'sortable' => false,  // disable drag-to-reorder
	],
];
```

**Custom Events**

`fw:option-type:addable-option:option:init` - New option was added and initialized.

## Reading the value

`addable-option` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_addable_option'];
foreach ( (array) $value as $row ) {
	// each $row is one added item (an array of its sub-option values)
}
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_addable_option' );
foreach ( (array) $value as $row ) {
	// each $row is one added item (an array of its sub-option values)
}
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_addable_option'];
foreach ( (array) $value as $row ) {
	// each $row is one added item (an array of its sub-option values)
}
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_addable_option' );
foreach ( (array) $value as $row ) {
	// each $row is one added item (an array of its sub-option values)
}
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_addable_option' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [0] => First item
    [1] => Second item
    [2] => Third item
)
```
