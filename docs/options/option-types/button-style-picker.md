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
