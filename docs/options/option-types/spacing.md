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
		// — Optional attributes you can add —
		// 'value' => [],
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
$value = $atts['demo_spacing'];
// $value['padding'] and $value['margin'] hold the sides (see Saved value)
$padding = $value['padding'];
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_spacing' );
// $value['padding'] and $value['margin'] hold the sides (see Saved value)
$padding = $value['padding'];
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_spacing'];
// $value['padding'] and $value['margin'] hold the sides (see Saved value)
$padding = $value['padding'];
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_spacing' );
// $value['padding'] and $value['margin'] hold the sides (see Saved value)
$padding = $value['padding'];
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_spacing' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [margin] => Array
        (
            [all] => 
            [top] => mt-4
            [right] => 
            [bottom] => mb-4
            [left] => 
        )

    [padding] => Array
        (
            [all] => p-3
            [top] => 
            [right] => 
            [bottom] => 
            [left] => 
        )

    [advanced] => Array
        (
        )

)
```

## In Gutenberg blocks (the React control)

`spacing` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. A block's settings sidebar is a **React app**, which draws the whole panel itself and will not accept ready-made HTML from PHP. So the option type gets a **second renderer**: both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `spacing` control does

Device tabs (**Base / md / lg**) switch which layer you are editing, and each visible section shows five dropdowns — `all`, `top`, `right`, `bottom`, `left`.

| Schema key | Effect |
| --- | --- |
| `label` | the field label |
| `desc` | the help text |
| `mode` | which sections appear — `both` (default), `margin`, or `padding` |
| `scale` | optional override for the token ladder (see below) |

:::caution[The values are Bootstrap tokens, not CSS lengths]
Every slot stores a **token name** from the spacing scale — `'0'`–`'5'` by default — or an empty string for "not set". They are not lengths.

The server sanitises each slot with `preg_replace( '/[^a-zA-Z0-9_-]/', '' )`, so a value like `12%` would be stored as `12` and a value like `1.5rem` as `15rem` — surviving sanitisation while meaning nothing to the CSS generator. The React control therefore only ever offers tokens from the scale, never a free-text length.
:::

:::note[The scale is resolved on the server]
`get_scale()` applies the `fw_option_type_spacing_scale` filter, so a site can replace Bootstrap's ladder entirely. That resolved scale is **not part of the option schema**, so a React control cannot read it.

The control uses `option.scale` when a caller supplies it, and otherwise falls back to the same built-in default the PHP type uses — so the common case is exact. If your site filters the scale and you want it reflected in block sidebars, pass it through the schema explicitly.
:::

:::note[`mode` narrows what is saved]
The server only reads the sections `mode` permits — a `padding` value submitted to a `mode: 'margin'` option is **dropped**, not stored. The control renders only the permitted sections for the same reason: offering an edit that silently vanishes on save is worse than not offering it.
:::

The control always emits the **complete** value structure (both sections, all three device layers), because the server rebuilds that shape from its defaults on every save. Emitting it whole is what keeps a value saved from a block sidebar byte-identical to one saved in the page builder.
