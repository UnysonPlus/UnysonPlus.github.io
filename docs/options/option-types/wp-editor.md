---
title: "WP Editor"
sidebar_position: 28
---


Textarea with the WordPress Editor like the one you use on the blog posts edit pages.

```php
$options = [
	'demo_wp_editor' => [
		'label' => __( 'Rich Text Editor', 'unysonplus' ),  // or false to hide the label column
		'type' => 'wp-editor',
		'value' => 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		'reinit' => true,
		// — Optional attributes you can add —
		// 'size' => 'small',  // small, medium, large
		// 'editor_height' => 160,
		// 'wpautop' => true,
		// 'editor_type' => false,
		// 'shortcodes' => false,
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'dynamic_content' => false,  // hide the Dynamic Content (database) picker
	],
];
```

## Reading the value

`wp-editor` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo wp_kses_post( $atts['demo_wp_editor'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_wp_editor' );
echo wp_kses_post( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo wp_kses_post( $book['demo_wp_editor'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_wp_editor' );
echo wp_kses_post( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_wp_editor' ) )` outputs — the shape of this option type's stored value:

```text
<p>Rich text <strong>content</strong> from the editor.</p>
```

## In Gutenberg blocks (the React control)

`wp-editor` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `wp-editor` control does

It edits the **markup directly**, in a plain code field — not a WYSIWYG.

:::caution[Why it is not a rich-text field]
The obvious choice is Gutenberg's `RichText`, and it is the wrong one here.

`RichText` edits the contents of **one** block-level element. This option stores a whole HTML fragment, which routinely contains several — `<p>a</p><p>b</p>`, a `<ul>`, a heading. There is no lossless way to hand that to a single `RichText`: you either strip the outer tag (mangling anything with more than one block) or nest tags that were not nested. Both silently corrupt content authored in the page builder, and neither failure is visible until someone opens the page again.

Editing the markup is plainer and **lossless** — the right trade for a second authoring surface whose whole justification is that it agrees with the first. Rich editing stays in the page builder.
:::

:::note[The save transforms your value — and that is safe]
With `wpautop` on (the default), saving runs the value through `wpautop()` and strips newlines, so typing `Hello` stores `<p>Hello</p>`.

A transforming save is the shape most likely to corrupt content a little more on each edit, so it is asserted in the test suite: the transform is **idempotent** for plain text, blank-line paragraphs, already-wrapped `<p>`, inline markup, lists and empty values. Saving repeatedly does not drift the markup.

Set `'wpautop' => false` to store exactly what is written.
:::
