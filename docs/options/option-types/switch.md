---
title: "Switch"
sidebar_position: 9
---


Switch between two choices.

<img src="/img/options/opt-switch.png" alt="switch option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_switch' => [
		'label' => __( 'Switch', 'unysonplus' ),  // or false to hide the label column
		'type' => 'switch',
		'right-choice' => [
			'value' => 'yes',
			'label' => __( 'Yes', 'unysonplus' )
		],
		'left-choice' => [
			'value' => 'no',
			'label' => __( 'No', 'unysonplus' )
		],
		'value' => 'yes',
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
	],
];
```

**Custom Events**

`fw:option-type:switch:change` - Value was changed.

:::note
Switch value in html is json encoded to prevent issues with boolean values, so before using the html value in javascript do `value = JSON.parse(value);`
:::

## Reading the value

`switch` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo $atts['demo_switch'] === 'yes' ? 'On' : 'Off';
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_switch' );
echo $value === 'yes' ? 'On' : 'Off';
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo $book['demo_switch'] === 'yes' ? 'On' : 'Off';
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_switch' );
echo $value === 'yes' ? 'On' : 'Off';
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_switch' ) )` outputs — the shape of this option type's stored value:

```text
yes
```

## In Gutenberg blocks (the React control)

`switch` is one of five option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

### Why this exists

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. That is fine on ordinary admin screens like the page builder and Theme Settings.

A Gutenberg block's settings sidebar is a **React app**, and React draws that panel itself; it will not accept ready-made HTML from PHP. So an option type that exists only as PHP cannot appear there at all.

Rather than rewrite the option type, it gets a **second renderer**. Both read the same schema you write in `options.php`, and both produce the same saved value:

| | Renders | Used by |
| --- | --- | --- |
| PHP `_render()` | HTML | Page builder, Theme Settings, metaboxes |
| React control | a React component | Gutenberg block sidebars |

Nothing about your option definition changes. The PHP path stays authoritative; React is additive, and only for editing — the front end is still rendered by PHP.

### What the `switch` control does

It wraps WordPress's own [`ToggleControl`](https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/) — the same on/off switch used by native block settings.

The interesting part is that a `switch` is **not** a plain boolean. Its two sides are configurable:

```php
'left-choice'  => [ 'value' => 'no',  'label' => __( 'No', 'unysonplus' ) ],
'right-choice' => [ 'value' => 'yes', 'label' => __( 'Yes', 'unysonplus' ) ],
```

So the stored value may be `'yes'`/`'no'`, `true`/`false`, `1`/`0` — whatever you declared. The React control reads your `left-choice` / `right-choice` and toggles between **those** values, so the saved result matches the PHP renderer exactly.

### One subtlety worth knowing

Values reach the browser as JSON encoded by PHP, so a value declared as the number `1` can arrive as the string `"1"`. Comparing with `===` would then wrongly report "off".

The control compares by serializing both sides instead:

```js
const same = ( a, b ) => JSON.stringify( a ) === JSON.stringify( b );
```

That keeps booleans, numbers and strings comparable without falling back to loose `==`, which would introduce its own surprises. If you write your own control for a type with configurable choices, this is the trap to avoid.

### No second copy of React

The bundle contains **no React**. JSX compiles to `wp.element.createElement`, and `wp.element` is the React WordPress already loads in wp-admin — so the control uses React without shipping it.

:::tip[For option-type authors]
Most option types have no React control yet. That is a coverage gap, not an error — such an option shows a clear notice in a block sidebar and works normally everywhere else. Controls get ported when a block actually needs them.
:::
