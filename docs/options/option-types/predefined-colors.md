---
title: "Predefined Colors"
sidebar_position: 47
---

A swatch grid backed by a hidden `<select>`. Saved value is a single hex string (e.g. `#3f51b5`) or empty. `blank => true` lets the user deselect.

<img src="/img/options/opt-demo_predefined_colors.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_predefined_colors' => [
		'label' => __( 'Predefined Colors', 'unysonplus' ),
		'type' => 'predefined-colors',
		'value' => '',
		'blank' => true,
		'choices' => unysonplus_option_color_palette(),
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => __( 'Swatch grid backed by a hidden &lt;select&gt;. Saved value is a single hex string (e.g. <code>#3f51b5</code>) or empty when nothing is selected. Palette comes from <code>unysonplus_option_color_palette()</code>, which reads Theme Settings → General → Colors and falls back to a built-in default. <code>blank => true</code> lets the user click an already-selected swatch to deselect.',
			'unysonplus' ),
	],
];
```

## Reading the value

`predefined-colors` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_attr( $atts['demo_predefined_colors'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_predefined_colors' );
echo esc_attr( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_attr( $book['demo_predefined_colors'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_predefined_colors' );
echo esc_attr( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_predefined_colors' ) )` outputs — the shape of this option type's stored value:

```text
primary
```
