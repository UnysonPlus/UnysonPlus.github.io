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
