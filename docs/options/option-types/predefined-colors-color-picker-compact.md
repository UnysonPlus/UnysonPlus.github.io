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
    [predefined] => ''
    [custom] => ''
)
```
