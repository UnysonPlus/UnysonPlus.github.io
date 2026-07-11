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

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_predefined_colors_2' )` returns — so you can see the shape of this option type's stored value:

```text
'#3f51b5'
```
