---
title: "Gradient V2"
sidebar_position: 50
---

Advanced gradient picker: a read-only CSS output that opens a dropdown editor (unlimited stops, linear/radial, angle, RGBA, live preview). Blank = no gradient.

<img src="/img/options/opt-demo_gradient_v2.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_gradient_v2'               => [
		'label' => __( 'Gradient V2', 'unysonplus' ),
		'type'  => 'gradient-v2',
		'value' => [
			'type'  => 'linear',
			'angle' => 90,
			'stops' => [], // Blank by default: read-only output stays empty until you open the dropdown and add stops.
		],
		'desc'  => __( 'Advanced gradient picker: a read-only CSS output that opens a dropdown editor (unlimited stops, linear/radial, angle, RGBA, live preview). Blank = no gradient.', 'unysonplus' ),
	],
];
```
