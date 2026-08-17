---
title: "Unit Input"
sidebar_position: 53
---

A numeric field + a configurable unit dropdown. Saved value is `{ value, unit }`; consume with `FW_Option_Type_Unit_Input::to_string( $val )`.

## Default (px / em / rem)

<img src="/img/options/opt-demo_unit_input.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_unit_input' => [
		'label' => __( 'Unit Input', 'unysonplus' ),
		'type' => 'unit-input',
		'value' => [ 'value' => '24', 'unit' => 'px' ],
		'desc' => __( 'Numeric field + a configurable unit dropdown (defaults px / em / rem). Saved value is <code>{ value, unit }</code>; consume with <code>FW_Option_Type_Unit_Input::to_string( $val )</code> → "24px".', 'unysonplus' ),
		// — Optional attributes you can add —
		// 'max' => '',
	],
];
```

## Separate units

<img src="/img/options/opt-demo_unit_input_separate.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_unit_input_separate' => [
		'label' => __( 'Unit Input (separate units)', 'unysonplus' ),
		'type' => 'unit-input',
		'units' => [ 'inches', 'cm', 'm' ],
		'separate' => true,
		'min' => 0,
		'step' => 0.5,
		'value' => [ 'value' => '24', 'unit' => 'inches' ],
		'desc' => __( 'Same control with a custom unit list and <code>separate => true</code>, so <code>to_string()</code> emits a space — "24 inches" — for human measurements rather than CSS. Also shows the optional min/step number attributes.', 'unysonplus' ),
	],
];
```

## Reading the value

`unit-input` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_unit_input'];
echo esc_attr( $value['value'] . $value['unit'] ); // e.g. "20px"
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_unit_input' );
echo esc_attr( $value['value'] . $value['unit'] ); // e.g. "20px"
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_unit_input'];
echo esc_attr( $value['value'] . $value['unit'] ); // e.g. "20px"
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_unit_input' );
echo esc_attr( $value['value'] . $value['unit'] ); // e.g. "20px"
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_unit_input' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [value] => 24
    [unit] => px
)
```

## In Gutenberg blocks (the React control)

`unit-input` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. That works in the page builder and on Theme Settings, which are ordinary admin pages. A block's settings sidebar is a **React app**, which draws the whole panel itself and will not accept ready-made HTML from PHP.

So the option type gets a **second renderer**. Both read the same schema — the array you write in `options.php` — and both produce the **same saved value**. The PHP path stays authoritative; the React path is additive. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation of how the two fit together.

### What the `unit-input` control does

A number field paired with a unit dropdown, built from WordPress's `NumberControl` and `SelectControl`.

| Schema key | Becomes |
| --- | --- |
| `label` | the field label |
| `desc` | the help text |
| `units` | the dropdown options |
| `min` / `max` / `step` | the number field's bounds |

:::caution[The number half is a string, deliberately]
The stored shape is `{ value: '12', unit: 'px' }`, and `value` is a **string** — that is what keeps an empty value distinguishable from `'0'`. A control emitting a real number would save an empty field as `0` and apply a `0px` where the option meant "inherit".
:::

`units` may be declared as a sequential list (`['px','em']`) or a value to label map (`['px' => 'PX']`); the control normalises both exactly as the server does, so the dropdown offers only units the server will accept. A unit outside that set is rewritten server-side to the first configured one.
