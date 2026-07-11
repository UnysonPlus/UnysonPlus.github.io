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

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_predefined_colors_color_picker_compact_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [predefined] => bg-primary
    [custom] => 
)
```
