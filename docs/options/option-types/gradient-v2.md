---
title: "Gradient V2"
sidebar_position: 50
---

Advanced gradient picker: a read-only CSS output that opens a dropdown editor (unlimited stops, linear/radial, angle, RGBA, live preview). Blank = no gradient.

<img src="/img/options/opt-demo_gradient_v2.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_gradient_v2' => [
		'label' => __( 'Gradient V2', 'unysonplus' ),
		'type' => 'gradient-v2',
		'value' => [
			'type' => 'linear',
			'angle' => 90,
			'stops' => [], // Blank by default: read-only output stays empty until you open the dropdown and add stops.
		],
		'desc' => __( 'Advanced gradient picker: a read-only CSS output that opens a dropdown editor (unlimited stops, linear/radial, angle, RGBA, live preview). Blank = no gradient.', 'unysonplus' ),
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_gradient_v2_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [type] => radial
    [angle] => 90
    [stops] => Array
        (
            [0] => Array
                (
                    [color] => rgba(42, 123, 155, 1)
                    [position] => 0
                )

            [1] => Array
                (
                    [color] => rgba(87, 199, 133, 1)
                    [position] => 50
                )

            [2] => Array
                (
                    [color] => rgba(237, 221, 83, 1)
                    [position] => 100
                )

        )

)
```
