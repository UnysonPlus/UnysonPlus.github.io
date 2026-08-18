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

## Reading the value

`gradient-v2` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_gradient_v2'];
echo esc_attr( $value['type'] ); // + $value['angle'], $value['stops'] (see Saved value)
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_gradient_v2' );
echo esc_attr( $value['type'] ); // + $value['angle'], $value['stops'] (see Saved value)
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_gradient_v2'];
echo esc_attr( $value['type'] ); // + $value['angle'], $value['stops'] (see Saved value)
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_gradient_v2' );
echo esc_attr( $value['type'] ); // + $value['angle'], $value['stops'] (see Saved value)
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_gradient_v2' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [type] => linear
    [angle] => 135
    [stops] => Array
        (
            [0] => Array
                (
                    [color] => #e5322d
                    [position] => 0
                )

            [1] => Array
                (
                    [color] => #2f74e6
                    [position] => 100
                )

        )

)
```

## In Gutenberg blocks (the React control)

``gradient-v2`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `gradient-v2` control does

A live swatch, a linear/radial switch, an angle slider, and a colour-plus-position row per stop.

:::caution[Fewer than two stops means NO gradient]
`_get_value_from_input()` discards the stops array entirely when fewer than two survive validation, and stores the empty form rather than restoring a default. That empty array is what turns the layer **off** — there is no enable switch.

So removing the second-to-last stop clears the gradient outright, which is what the server would have done anyway. The alternative is a picker showing one stop while the page renders nothing.
:::

:::note[What the validator accepts]
`type` is `linear` or `radial` (anything else becomes linear); `angle` is an integer clamped 0–360; stop colours must be hex (3 or 6) **or** `rgb()`/`rgba()`, and a stop whose colour matches neither is dropped **silently**; positions are floats clamped 0–100.
:::
