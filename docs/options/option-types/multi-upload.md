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
    [0] => Array
        (
            [attachment_id] => 123
            [url] => https://example.com/wp-content/uploads/2026/06/one.jpg
        )

    [1] => Array
        (
            [attachment_id] => 124
            [url] => https://example.com/wp-content/uploads/2026/06/two.jpg
        )

)
```

## In Gutenberg blocks (the React control)

``multi-upload`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `multi-upload` control does

A thumbnail grid with reorder and remove controls, and WordPress's own media modal behind an **Add media** button.

:::caution[The URL is stored protocol-relative]
`get_attachments_info()` runs `preg_replace( '/^https?:\/\//', '//', $url )` on every attachment, so a stored value carries `//example.com/…` rather than `https://example.com/…`.

The control does the same. A value carrying an absolute scheme differs from what the page builder saves and pins one scheme on a site served over both.
:::

:::note[The key is `attachment_id`, not `id`]
Element views read that name. It is the sort of detail that produces an empty gallery rather than an error, so it is worth stating plainly.
:::
