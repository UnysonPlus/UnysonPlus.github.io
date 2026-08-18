---
title: "Column Split"
sidebar_position: 55
slug: /options/option-types/column-split
description: The Unyson+ column-split option type — pick a column width as a fraction (e.g. 1/2, 1/3, twelfths).
---

# Column Split

Pick a column width as a **fraction**. By default the choices are twelfths (`1/12` … `11/12`); the
option can supply its own `fractions` list. Used by the page builder to set a column's share of the
row.

```php
$options = [
	'demo_col' => [
		'type'      => 'column-split',
		'label'     => __( 'Column Width', 'unysonplus' ),
		'value'     => '1/2',
		'fractions' => null,   // null → twelfths 1/12…11/12; or supply your own list
	],
];
```

## Saved value

A fraction **string**, e.g. `1/2`, `1/3`, `2/3`.

## In Gutenberg blocks (the React control)

``column-split`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `column-split` control does

The allowed splits as buttons, each drawn as a miniature of the split itself, with the fraction printed beneath.

:::caution[Fractions are stored in LOWEST TERMS]
`_get_value_from_input()` reduces every fraction, so the twelfths set is `1/12`, `1/6`, `1/4`, `1/3`, `5/12`, `1/2`, … — never `6/12` or `4/12`.

The control reduces before rendering its tiles for exactly that reason. An earlier version did not, and offered a `6/12` tile that PHP rewrote to `1/2` on every save: click it, reopen, find something else selected. The parity suite caught it.
:::

:::note[Out-of-set values are SNAPPED, not rejected]
Hand PHP `2/5` where the schema allows twelfths and it stores `5/12` — the nearest allowed fraction by ratio.

That is sensible for a dragged slider and confusing as a surprise, so the control offers only allowed fractions. Nothing you can click here needs snapping, which means what the sidebar shows after a save is what you chose.
:::
