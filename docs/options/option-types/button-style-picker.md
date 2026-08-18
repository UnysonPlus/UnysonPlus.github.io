---
title: "Button Style Picker"
sidebar_position: 56
---

A dropdown that previews each Button Preset as a real button. Reused by the Button shortcode's Style and Size pickers. Stores the class string, e.g. `btn-primary`.

<img src="/img/options/opt-demo_button_style_picker.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_button_style_picker' => [
		'label' => __( 'Button Style Picker', 'unysonplus' ),
		'type' => 'button-style-picker',
		'choices' => sc_get_button_style_choices(),
		'preview_text' => __( 'Button', 'unysonplus' ),
		'desc' => __( 'A dropdown that previews each Button Preset as a real button (trigger + every row). Reused by the Button shortcode\'s Style and Size pickers. Stores the class string, e.g. <code>btn-primary</code>.', 'unysonplus' ),
		// — Optional attributes you can add —
		// 'value' => '',
		// 'preview_base' => 'btn',
		// 'placeholder' => '— Select —',
		// 'allow_none' => true,
	],
];
```

## Reading the value

`button-style-picker` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_button_style_picker'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_button_style_picker' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_button_style_picker'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_button_style_picker' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_button_style_picker' ) )` outputs — the shape of this option type's stored value:

```text
btn-primary
```

## In Gutenberg blocks (the React control)

``button-style-picker`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `button-style-picker` control does

A list of rows, each rendering a **real button** with that preset's classes applied, plus a **— Select —** row when `allow_none` is on.

:::note[Real previews here, a plain dropdown for `border-style-picker`]
The difference is which document the CSS is in, not a style choice.

These presets ship in `unysonplus-presets`, enqueued on `admin_enqueue_scripts`, so they are present in the **outer admin document** a block sidebar renders into — the buttons really paint. [`border-style-picker`](./border-style-picker.md)'s classes live in the theme's compiled stylesheet, which loads into the canvas iframe only, so drawing tiles there would produce a grid of identical unstyled boxes.
:::

:::caution[`allow_none => false` means an empty value is refused]
Some fields require a real preset — a button always has *some* style. With `allow_none` off, an empty value is replaced by the option default on save, so the control offers no empty row.
:::
