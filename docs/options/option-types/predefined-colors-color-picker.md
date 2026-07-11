---
title: "Predefined Colors + Color Picker"
sidebar_position: 48
---

Hybrid control — a predefined swatch grid plus a custom color picker. Saved value is `{ predefined, custom }`; only one half is live at a time.

<img src="/img/options/opt-demo_predefined_colors_color_picker.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_predefined_colors_color_picker' => [
		'label' => __( 'Predefined Colors + Color Picker', 'unysonplus' ),
		'type' => 'predefined-colors-color-picker',
		'value' => [
			'predefined' => '',
			'custom' => '',
		],
		'colors' => [
			'predefined' => [
				'type' => 'predefined',
				'choices' => unysonplus_option_color_palette(),
			],
			'custom' => [
				'type' => 'custom',
				'picker' => 'color-picker', // or 'rgba-color-picker' for alpha
			],
		],
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => __( 'Hybrid control. Saved value is a two-key array: <code>{ predefined: "", custom: "" }</code>. Only one half is meant to be live at a time — picking a swatch clears <code>custom</code>; opening the picker clears <code>predefined</code> (the JS handles this mutual exclusion automatically). Switch <code>picker</code> from <code>color-picker</code> to <code>rgba-color-picker</code> to allow alpha.',
			'unysonplus' ),
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_predefined_colors_color_picker_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [predefined] => ''
    [custom] => '#0d3c54'
)
```
