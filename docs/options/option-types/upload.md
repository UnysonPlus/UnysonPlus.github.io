---
title: "Upload"
sidebar_position: 19
---


Single file upload.

<img src="/img/options/opt-upload.png" alt="upload option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_upload' => [
		'label' => __( 'Single Upload', 'unysonplus' ),  // or false to hide the label column
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'type' => 'upload',
		'images_only' => false,
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'texts' => [],
		// 'value' => '',
		// 'extra_mime_types' => [],
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'files_ext' => [ 'pdf', 'zip' ],  // restrict to these extensions
		// 'thumb_max_width' => '240px',  // cap the preview thumbnail width
	],
];
```

**Custom Events**

`fw:option-type:upload:change` - The value was changed.

`fw:option-type:upload:clear` - The value was cleared (the selected item is removed).

## Reading the value

`upload` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_url( $atts['demo_upload'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_upload' );
echo esc_url( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_url( $book['demo_upload'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_upload' );
echo esc_url( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_upload' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [attachment_id] => 123
    [url] => https://example.com/wp-content/uploads/2026/06/photo.jpg
)
```

## In Gutenberg blocks (the React control)

`upload` is one of five option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

### Why this exists

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery wires up the media button. That works on ordinary admin screens like the page builder and Theme Settings.

A Gutenberg block's settings sidebar is a **React app**. React draws that panel itself and will not accept ready-made HTML from PHP, so a PHP-only option type cannot appear there.

Rather than rewrite the option type, it gets a **second renderer**. Both read the same schema you write in `options.php`, and — crucially for this type — both save the **same value shape**:

| | Renders | Used by |
| --- | --- | --- |
| PHP `_render()` | HTML | Page builder, Theme Settings, metaboxes |
| React control | a React component | Gutenberg block sidebars |

React handles *editing* only. The front end is still rendered by PHP.

### What the `upload` control does

It uses WordPress's own `MediaUpload` component to open the **standard media library modal** — the same one you get from the PHP version, and the same one core blocks use. There is no custom uploader.

Around it, the control renders a thumbnail of the current image and Select / Replace / Remove buttons using WordPress's `Button` and `BaseControl` components, so it matches native block settings.

### The value shape is the contract

This is the part that matters most for `upload`. As shown under **Saved value** above, the stored value is an array:

```text
Array
(
    [attachment_id] => 123
    [url] => //example.com/wp-content/uploads/2026/06/photo.jpg
)
```

The React control writes **exactly that shape**:

```js
onChange( {
    attachment_id: media.id,
    url: toProtocolRelative( media.url ),
} );
```

That is what makes the two renderers interchangeable. An image picked in a block sidebar and an image picked in the page builder produce identical stored data, so the same PHP reads both, and switching a value between contexts never corrupts it.

### Why the URL loses its `https:`

Note `toProtocolRelative()` — it strips `https://` down to `//`. This is a **protocol-relative URL**, and it matches what the PHP renderer has always stored.

The reason is portability: a site that later moves between `http` and `https`, or is cloned to a staging domain, would otherwise carry hard-coded schemes into every saved option. A `//` URL simply adopts whatever the page is using.

For display inside the editor the control converts it back (`toDisplayUrl()`), because an `<img src="//…">` is fine in a browser but awkward to reason about while debugging.

### Graceful degradation

The media library is not available on every admin screen. If `wp.mediaUtils` and `wp.blockEditor` are both absent, the control renders a plain message rather than throwing — the option stays visible and the rest of the sidebar keeps working.

### No second copy of React

The bundle contains **no React**. JSX compiles to `wp.element.createElement`, and `wp.element` is the React WordPress already loads in wp-admin — so the control uses React without shipping it.

:::tip[For option-type authors]
Most option types have no React control yet. That is a coverage gap, not an error — such an option shows a clear notice in a block sidebar and works normally everywhere else. Controls get ported when a block actually needs them.
:::
