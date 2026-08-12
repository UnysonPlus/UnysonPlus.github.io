---
title: "Split Slider"
sidebar_position: 54
slug: /options/option-types/split-slider
description: The Unyson+ split-slider option type — a draggable ratio control that divides 100% across N named parts.
---

# Split Slider

A draggable **ratio** control: split 100% across N parts by dragging the dividers. Each part carries a
width `w` (the parts always sum to 100) and an optional `name`. Used for column ratios — for example
the theme's footer column widths.

```php
$options = [
	'demo_split' => [
		'type'  => 'split-slider',
		'label' => __( 'Column Ratio', 'unysonplus' ),
		'min'   => 1,                                  // min width per part
		'value' => [
			[ 'w' => 60, 'name' => 'Main' ],
			[ 'w' => 40, 'name' => 'Aside' ],
		],
	],
];
```

## Saved value

An array of `{ w, name }` rows whose `w` values sum to 100:

```text
Array
(
    [0] => Array ( [w] => 60, [name] => Main )
    [1] => Array ( [w] => 40, [name] => Aside )
)
```
