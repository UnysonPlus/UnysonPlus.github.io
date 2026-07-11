---
title: "Unit Input"
sidebar_position: 53
---

A numeric field + a configurable unit dropdown. Saved value is `{ value, unit }`; consume with `FW_Option_Type_Unit_Input::to_string( $val )`.

## Default (px / em / rem)

<img src="/img/options/opt-demo_unit_input.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_unit_input'                => [
		'label' => __( 'Unit Input', 'unysonplus' ),
		'type'  => 'unit-input',
		'value' => [ 'value' => '24', 'unit' => 'px' ],
		'desc'  => __( 'Numeric field + a configurable unit dropdown (defaults px / em / rem). Saved value is <code>{ value, unit }</code>; consume with <code>FW_Option_Type_Unit_Input::to_string( $val )</code> → "24px".', 'unysonplus' ),
	],
];
```

## Separate units

<img src="/img/options/opt-demo_unit_input_separate.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_unit_input_separate'       => [
		'label'    => __( 'Unit Input (separate units)', 'unysonplus' ),
		'type'     => 'unit-input',
		'units'    => [ 'inches', 'cm', 'm' ],
		'separate' => true,
		'min'      => 0,
		'step'     => 0.5,
		'value'    => [ 'value' => '24', 'unit' => 'inches' ],
		'desc'     => __( 'Same control with a custom unit list and <code>separate => true</code>, so <code>to_string()</code> emits a space — "24 inches" — for human measurements rather than CSS. Also shows the optional min/step number attributes.', 'unysonplus' ),
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_unit_input_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [value] => 1.5
    [unit] => rem
)
```
