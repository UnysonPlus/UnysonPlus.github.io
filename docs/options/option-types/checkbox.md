---
title: "Checkbox"
sidebar_position: 3
---


Single checkbox.

<img src="/img/options/opt-checkbox.png" alt="checkbox option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_checkbox' => [
		'label' => __( 'Checkbox', 'unysonplus' ),  // or false to hide the label column
		'type' => 'checkbox',
		'value' => true,
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'text' => __( 'Custom text', 'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
	],
];
```

## Reading the value

`checkbox` returns a **boolean** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo $atts['demo_checkbox'] ? 'Yes' : 'No';
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_checkbox' );
echo $value ? 'Yes' : 'No';
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo $book['demo_checkbox'] ? 'Yes' : 'No';
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_checkbox' );
echo $value ? 'Yes' : 'No';
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_checkbox' ) )` outputs — the shape of this option type's stored value:

```text
yes
```

## In Gutenberg blocks (the React control)

`checkbox` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. That works in the page builder and on Theme Settings, which are ordinary admin pages. A block's settings sidebar is a **React app**, which draws the whole panel itself and will not accept ready-made HTML from PHP.

So the option type gets a **second renderer**. Both read the same schema — the array you write in `options.php` — and both produce the **same saved value**. The PHP path stays authoritative; the React path is additive. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation of how the two fit together.

### What the `checkbox` control does

It wraps WordPress's [`CheckboxControl`](https://developer.wordpress.org/block-editor/reference-guides/components/checkbox-control/).

| Schema key | Becomes |
| --- | --- |
| `label` | a heading above the checkbox (when it differs from `text`) |
| `text` | the caption printed beside the box itself |
| `desc` | the help text |

:::tip[Why two labels]
This option type carries **both** a `label` (the field's name) and a `text` (the caption next to the box, defaulting to "Yes"). `CheckboxControl` has only one label slot and it renders beside the box, so `text` maps there and `label` is restored by wrapping the control. Collapsing them would silently drop whichever you wrote second.
:::

The value is a real **boolean** — `_get_value_from_input()` ends in `(bool)`, so the React control emits `true` / `false`, never `'1'` or `'yes'`.
