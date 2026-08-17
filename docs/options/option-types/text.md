---
title: "Text"
sidebar_position: 1
---


Regular text input.

<img src="/img/options/opt-text.png" alt="text option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_text' => [
		'label' => __( 'Text', 'unysonplus' ),  // or false to hide the label column
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
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'dynamic_content' => false,  // hide the Dynamic Content (database) picker
	],
];
```

## Reading the value

`text` returns a plain **string**, so you can output it directly. How you *get* it depends on where the option is registered — the three places are shown below.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_text'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_text' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' ); // 'book' = the box/group id
echo esc_html( $book['demo_text'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_text' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_text' ) )` outputs — the shape of this option type's stored value:

```text
Build premium WordPress themes
```

## In Gutenberg blocks (the React control)

`text` is one of five option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

### Why this exists

Everything above is rendered by **PHP**. `_render()` builds the HTML, WordPress prints it, and jQuery makes it interactive. That works perfectly in the page builder and on Theme Settings — those are ordinary admin pages.

Gutenberg is different. A block's settings sidebar is a **React app**. React draws the whole panel itself and will not accept a chunk of ready-made HTML from PHP. So an option type that only exists as PHP simply cannot appear there.

The answer is not to rewrite the option type. It is to give it a **second renderer**:

| | Renders | Used by |
| --- | --- | --- |
| PHP `_render()` | HTML | Page builder, Theme Settings, metaboxes |
| React control | a React component | Gutenberg block sidebars |

Both read the **same option schema** — the very array you write in `options.php` — and both produce the **same saved value**. Nothing about your option definition changes. The PHP path stays authoritative; the React path is additive.

### How it works, step by step

1. You declare the option in PHP, exactly as documented above.
2. That array is JSON-encoded into the page as `window.fwBlocks[ blockName ].options`.
3. In the block editor, `fw.controls.Option` reads the `type` field and picks the matching React control.
4. The control renders, and when the user edits it, the new value flows back into the block's attributes.
5. On the front end, **PHP renders the output as usual** — the block delegates to the existing shortcode.

So React handles *editing*, and PHP still handles *rendering*. That split is deliberate: it means a block can never drift away from what the shortcode actually outputs.

### What the `text` control does

It wraps WordPress's own [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/), mapping the schema onto it:

| Schema key | Becomes |
| --- | --- |
| `label` | the field label |
| `desc` | the help text under the field |
| `attr.placeholder` | the input's placeholder |

Because it is WordPress's own component, it looks identical to every native block setting — same spacing, same focus ring, same dark-mode behaviour. Nothing is styled by hand.

### No second copy of React

The bundle contains **no React**. JSX is compiled to `wp.element.createElement`, and `wp.element` *is* the React that WordPress already loads in wp-admin. So the control uses React without shipping it — the whole bundle is a few kilobytes.

:::tip[For option-type authors]
Not every option type needs a React control, and most do not have one yet. That is a coverage gap, not an error — an option type with no React renderer shows a clear "no React control yet" notice in a block sidebar and remains fully usable everywhere else. Controls get ported when a block actually needs them.
:::
