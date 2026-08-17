---
title: "Image Picker"
sidebar_position: 13
---


Pick an image.

<img src="/img/options/opt-image-picker.png" alt="image-picker option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_image_picker' => [
		'label' => __( 'Image Picker', 'unysonplus' ),  // or false to hide the label column
		'type' => 'image-picker',
		'value' => '',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'choice-1' => [
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
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'blank' => true,  // allow deselecting (no choice)
	],
];
```

**Custom Events**

`fw:option-type:image-picker:clicked` - A thumbnail was clicked.

`fw:option-type:image-picker:changed` - Value was changed.

## Reading the value

`image-picker` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_image_picker'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_image_picker' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_image_picker'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_image_picker' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_image_picker' ) )` outputs — the shape of this option type's stored value:

```text
choice-1
```

## In Gutenberg blocks (the React control)

`image-picker` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. That works in the page builder and on Theme Settings, which are ordinary admin pages. A block's settings sidebar is a **React app**, which draws the whole panel itself and will not accept ready-made HTML from PHP.

So the option type gets a **second renderer**. Both read the same schema — the array you write in `options.php` — and both produce the **same saved value**. The PHP path stays authoritative; the React path is additive. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation of how the two fit together.

### What the `image-picker` control does

A grid of image tiles built from `choices`, with the selected tile outlined in the admin accent colour.

Three parts of the schema change how it behaves:

| Schema key | Effect |
| --- | --- |
| `choices` | the tiles — a choice carrying its own `choices` is a **category group**, flattened recursively |
| `multiple` | changes the value **type**: a key string when off, an **array of keys** when on |
| `blank` | whether clicking the selected tile clears it |

A tile's image can be declared three ways, and all three are read: a plain src string, a `small` / `large` / `data` object, or a `small` object carrying `src` and `alt`.

:::note[blank and deselection]
When `blank` is off, PHP refuses an empty key and restores the default — so the control does not offer a deselect the server would immediately undo. Turn `blank` on if you want the tile to be clearable.
:::
