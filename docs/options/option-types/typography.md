---
title: "Typography"
sidebar_position: 36
---


Choose font family, size, style and color.

<img src="/img/options/opt-typography.png" alt="typography option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_typography' => [
		'label' => __( 'Typography', 'unysonplus' ),  // or false to hide the label column
		'type' => 'typography',
		'value' => [
			'size' => 17,
			'family' => 'Verdana',
			'style' => '300italic',
			'color' => '#0000ff'
		],
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
		// 'components' => [ 'family' => true, 'size' => true, 'color' => true ],
	],
];
```

## Reading the value

`typography` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_typography'];
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_typography' );
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_typography'];
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_typography' );
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_typography' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [size] => 18
    [family] => Roboto
    [style] => 400
    [color] => #212529
)
```

## In Gutenberg blocks (the React control)

`typography` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar. The same control serves [`typography-v2`](./typography-v2.md), which is a pure deprecation alias.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app**, which draws the whole panel itself and will not accept ready-made HTML from PHP — so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `typography` control does

It renders one field per enabled component — family, size, line height, letter spacing, weight, style and colour — and emits the **whole value** on every edit.

:::caution[Most of this value is derived by the server, not submitted]
`_get_value_from_input()` rewrites several keys itself, based on `family`:

| Condition | What the server sets |
| --- | --- |
| `family` is `false` | `google_font`, `style`, `weight`, `subset`, `variation` all become `false` |
| `family` is a Google font | `google_font` becomes `true`; `style` and `weight` become `false` |
| otherwise | `google_font`, `subset`, `variation` all become `false` |

So the React control edits what a user actually sets and lets the server derive the rest. Guessing at `google_font` would simply be overwritten — and guessing it *wrong* would be silently corrected, which is worse than not guessing.
:::

:::caution[Colour here is stricter than the color-picker option type]
Typography validates with `/^#([a-f0-9]{3}){1,2}$/i` — **3 or 6 digits only**. The 4- and 8-digit alpha forms that [`color-picker`](./color-picker.md) accepts are rejected here and replaced with the option default.

The React control therefore strips alpha before saving and never offers an opacity slider. If you write your own control for this option type, do not reuse a colour normaliser that emits 8-digit hex.
:::

:::note[Two format switches change field types]
- `size_format: 'unit'` (default) stores `{ value, unit }`; `'number'` stores a **bare pixel number**. They are not interchangeable — a consumer that feeds size into JS needs the number form.
- `color_format: 'picker'` stores a hex string.
:::

:::note[`components` gates which fields exist]
A component switched off is stored as `false`, not omitted — and the control renders no field for it, because offering an edit the server discards is worse than offering nothing.
:::

**The font family field is a text input with suggestions, not the full Google Fonts picker.** That list is resolved server-side from `google-fonts.json` and is not part of the option schema, so a React control cannot read it. Typing a Google family name still works exactly as it should — the server recognises it and sets `google_font` itself. For browsing the full catalogue, use the page builder.
