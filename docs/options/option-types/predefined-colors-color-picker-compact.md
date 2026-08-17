---
title: "Predefined Colors + Color Picker (Compact)"
sidebar_position: 49
---

Compact dropdown variant of the hybrid — each option shows a swatch and the preset name painted in that color.

<img src="/img/options/opt-demo_predefined_colors_color_picker_compact.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_predefined_colors_color_picker_compact' => [
		'label' => __( 'Predefined Colors + Color Picker (Compact)', 'unysonplus' ),
		'type' => 'predefined-colors-color-picker-compact',
		'picker' => 'color-picker',
		'value' => [
			'predefined' => '',
			'custom' => '',
		],
		'choices' => unysonplus_demo_compact_choices( 'bg' ),
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => __( 'Compact dropdown variant of the wide hybrid. Each option shows BOTH a colored swatch and the preset name painted in that color. Near-white presets (luminance > 0.95) get a subtle gray chip behind the label so they don\'t disappear against the panel background. Saved value shape: <code>{ predefined: "bg-red", custom: "" }</code> when a preset is picked, or <code>{ predefined: "", custom: "#abc123" }</code> when a custom color is picked. Consumers emit <code>predefined</code> as <code>class="..."</code> directly; <code>custom</code> as inline <code>style="…"</code>. This demo uses <code>bg-{slug}</code> keys; switch the call to <code>unysonplus_demo_compact_choices( "text" )</code> to get <code>text-{slug}</code> keys for a text-color context.',
			'unysonplus' ),
	],
];
```

## Reading the value

`predefined-colors-color-picker-compact` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_predefined_colors_color_picker_compact'];
echo esc_attr( $value['custom'] !== '' ? $value['custom'] : $value['predefined'] ); // custom overrides the preset
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_predefined_colors_color_picker_compact' );
echo esc_attr( $value['custom'] !== '' ? $value['custom'] : $value['predefined'] ); // custom overrides the preset
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_predefined_colors_color_picker_compact'];
echo esc_attr( $value['custom'] !== '' ? $value['custom'] : $value['predefined'] ); // custom overrides the preset
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_predefined_colors_color_picker_compact' );
echo esc_attr( $value['custom'] !== '' ? $value['custom'] : $value['predefined'] ); // custom overrides the preset
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_predefined_colors_color_picker_compact' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [predefined] => text-primary
    [custom] => 
)
```

## In Gutenberg blocks (the React control)

`predefined-colors-color-picker-compact` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

This one matters more than most: it is the **shared colour field across the shortcode set** — 73 shortcodes declare it through `sc_color_field_compact()`. Without a React control, colour could not be edited in any block sidebar at all.

### What the control does

A preset dropdown (from the theme's Color Presets) plus a swatch that opens a custom colour picker, with **Clear custom** once one is set.

:::caution[The value is a pair, and both halves are kept]
The stored shape is `{ predefined: 'text-red', custom: '#ff0000' }`. `_get_value_from_input()` stores **both**, casting each to a string — it never clears one because the other is set.

The control follows that: choosing a preset leaves any custom colour intact underneath, which is what makes switching back and forth non-destructive.
:::

:::note[The custom value is NOT validated]
Unlike the plain [`color-picker`](./color-picker.md) option type — which accepts hex only and silently falls back to the default on anything else — this type casts the custom value to a string and stores it **verbatim**.

So `rgba()` is legitimate here when `picker` is `'rgba-color-picker'`, and a control must **not** reuse the `color-picker`'s hex normaliser: doing so would discard alpha the schema explicitly allows.
:::

:::note[Legacy bare strings]
A shortcode migrated from the older `sc_color_field()` may carry a plain string default like `'text-red'`. PHP rescues that to `{ predefined: 'text-red', custom: '' }` on first save, and the React control reads the same shape — so a value that has not been re-saved yet still renders correctly.
:::
