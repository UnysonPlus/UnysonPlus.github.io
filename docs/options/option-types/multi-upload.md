---
title: "Multi-Upload"
sidebar_position: 20
---


Upload multiple files.

<img src="/img/options/opt-multi-upload.png" alt="multi-upload option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_multi_upload' => [
		'label' => __( 'Multi Upload', 'unysonplus' ),  // or false to hide the label column
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'type' => 'multi-upload',
		'images_only' => false,
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'texts' => [],
		// 'value' => [],
		// 'extra_mime_types' => [],
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'files_ext' => [ 'pdf', 'zip' ],
	],
];
```

**Custom Events**

`fw:option-type:multi-upload:change` - The value was changed.

`fw:option-type:multi-upload:clear` - The value is cleared (all the selected items are removed).

`fw:option-type:multi-upload:remove` - A thumb (selected item) is removed. Triggered only when `images_only` is set to `true`.

## Reading the value

`multi-upload` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_multi_upload'];
foreach ( (array) $value as $item ) {
	echo wp_get_attachment_image( is_array( $item ) ? ( $item['attachment_id'] ?? 0 ) : 0, 'medium' );
}
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_multi_upload' );
foreach ( (array) $value as $item ) {
	echo wp_get_attachment_image( is_array( $item ) ? ( $item['attachment_id'] ?? 0 ) : 0, 'medium' );
}
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_multi_upload'];
foreach ( (array) $value as $item ) {
	echo wp_get_attachment_image( is_array( $item ) ? ( $item['attachment_id'] ?? 0 ) : 0, 'medium' );
}
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_multi_upload' );
foreach ( (array) $value as $item ) {
	echo wp_get_attachment_image( is_array( $item ) ? ( $item['attachment_id'] ?? 0 ) : 0, 'medium' );
}
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_multi_upload' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
)
```
