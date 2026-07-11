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

## Reading the value

`spacing` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_spacing_2'];
// $value['padding'] and $value['margin'] hold the sides (see Saved value)
$padding = $value['padding'];
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_spacing_2' );
// $value['padding'] and $value['margin'] hold the sides (see Saved value)
$padding = $value['padding'];
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_spacing_2'];
// $value['padding'] and $value['margin'] hold the sides (see Saved value)
$padding = $value['padding'];
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_spacing_2' );
// $value['padding'] and $value['margin'] hold the sides (see Saved value)
$padding = $value['padding'];
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_spacing_2' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [margin] => Array
        (
            [all] => ''
            [top] => ''
            [right] => ''
            [bottom] => ''
            [left] => ''
        )
    [padding] => Array
        (
            [all] => ''
            [top] => ''
            [right] => ''
            [bottom] => ''
            [left] => ''
        )
    [advanced] => Array
        (
            [md] => Array
                (
                    [margin] => Array
                        (
                            [all] => ''
                            [top] => ''
                            [right] => ''
                            [bottom] => ''
                            [left] => ''
                        )
                    [padding] => Array
                        (
                            [all] => ''
                            [top] => ''
                            [right] => ''
                            [bottom] => ''
                            [left] => ''
                        )
                )
            [lg] => Array
                (
                    [margin] => Array
                        (
                            [all] => ''
                            [top] => ''
                            [right] => ''
                            [bottom] => ''
                            [left] => ''
                        )
                    [padding] => Array
                        (
                            [all] => ''
                            [top] => ''
                            [right] => ''
                            [bottom] => ''
                            [left] => ''
                        )
                )
        )
)
```
