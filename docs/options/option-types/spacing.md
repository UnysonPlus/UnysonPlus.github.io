---
title: "Spacing"
sidebar_position: 52
---

Composite Margin + Padding widget — each column has an *All Sides* select plus a Top / Right / Bottom / Left quadrant arranged like a "+". Values are Bootstrap utility class names from the live spacing scale. Scope it with `mode => margin` or `mode => padding`.

## Margin + Padding

<img src="/img/options/opt-demo_spacing.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_spacing' => [
		'label' => __( 'Spacing (Margin + Padding)', 'unysonplus' ),
		'type' => 'spacing',
		'desc' => __( 'Composite spacing option. Two columns side-by-side; each has an All Sides select plus a Top / Right / Bottom / Left quadrant arranged like a "+". Values are Bootstrap utility class names sourced from the live spacing scale.', 'unysonplus' ),
	],
];
```

## Margin only

<img src="/img/options/opt-demo_spacing_margin_only.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_spacing_margin_only' => [
		'label' => __( 'Spacing (Margin Only)', 'unysonplus' ),
		'type' => 'spacing',
		'mode' => 'margin',
		'desc' => __( 'Same composite, scoped to the margin column. The padding subtree is force-reset to defaults on save.', 'unysonplus' ),
	],
];
```

## Padding only

<img src="/img/options/opt-demo_spacing_padding_only.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_spacing_padding_only' => [
		'label' => __( 'Spacing (Padding Only)', 'unysonplus' ),
		'type' => 'spacing',
		'mode' => 'padding',
		'desc' => __( 'Same composite, scoped to the padding column.', 'unysonplus' ),
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_spacing_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [margin] => Array
        (
            [all] => 
            [top] => 
            [right] => 
            [bottom] => 
            [left] => 
        )

    [padding] => Array
        (
            [all] => 
            [top] => 
            [right] => 
            [bottom] => 
            [left] => 
        )

    [advanced] => Array
        (
            [md] => Array
                (
                    [margin] => Array
                        (
                            [all] => 
                            [top] => 
                            [right] => 
                            [bottom] => 
                            [left] => 
                        )

                    [padding] => Array
                        (
                            [all] => 
                            [top] => 
                            [right] => 
                            [bottom] => 
                            [left] => 
                        )

                )

            [lg] => Array
                (
                    [margin] => Array
                        (
                            [all] => 
                            [top] => 
                            [right] => 
                            [bottom] => 
                            [left] => 
                        )

                    [padding] => Array
                        (
                            [all] => 
                            [top] => 
                            [right] => 
                            [bottom] => 
                            [left] => 
                        )

                )

        )

)
```
