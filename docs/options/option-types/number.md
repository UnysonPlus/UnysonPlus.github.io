---
title: "Number"
sidebar_position: 43
---

An HTML5 number input with optional `min` / `max` / `step`. Saved as integer or float depending on `numeric_type` / `step`.

## Integer

<img src="/img/options/opt-demo_number.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_number'                    => [
		'label'        => __( 'Number', 'unysonplus' ),
		'type'         => 'number',
		'value'        => 7,
		'min'          => 0,
		'max'          => 100,
		'step'         => 1,
		'numeric_type' => 'integer',
		'desc'         => __( 'HTML5 number input with min/max/step. Saved as integer.', 'unysonplus' ),
	],
];
```

## Float

<img src="/img/options/opt-demo_number_float.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_number_float'              => [
		'label' => __( 'Number (float)', 'unysonplus' ),
		'type'  => 'number',
		'value' => 1.5,
		'step'  => 0.1,
		'desc'  => __( 'Unbounded number input. Saved as float.', 'unysonplus' ),
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_number_2' )` returns — so you can see the shape of this option type's stored value:

```text
7
```
