---
title: "Multi-Inline"
sidebar_position: 53
slug: /options/option-types/multi-inline
description: The Unyson+ multi-inline option type — several small controls side-by-side on one row, each with a caption below.
---

# Multi-Inline

Several small controls on **one row**, each with a muted caption beneath it — for example a border's
**Width · Style · Color**, or a pair of icon pickers (Open · Close). Sub-controls are declared under
**`fw_multi_options`** (not `options`), and the saved value is a hash keyed by sub-option id.

```php
$options = [
	'demo_border' => [
		'type'  => 'multi-inline',
		'label' => __( 'Border', 'unysonplus' ),
		'fw_multi_options' => [
			'width' => [ 'type' => 'unit-input', 'label' => __( 'Width', 'unysonplus' ) ],
			'style' => [ 'type' => 'short-select', 'label' => __( 'Style', 'unysonplus' ),
				'choices' => [ 'solid' => 'Solid', 'dashed' => 'Dashed', 'dotted' => 'Dotted' ] ],
			'color' => [ 'type' => 'color-picker', 'label' => __( 'Color', 'unysonplus' ) ],
		],
	],
];
```

## Saved value

A hash keyed by sub-option id — each value is that child option type's own value:

```text
Array
(
    [width] => Array ( [value] => 1, [unit] => px )
    [style] => solid
    [color] => #e2e2e2
)
```

:::caution[Adding a new child control type]
Saving is generic (any child type saves correctly), but the **render** path is a whitelist. A child
whose control the whitelist doesn't know saves fine yet shows a **blank row, no error**. The rendered
child types are the common ones (`short-text` / `text`, `color` / `rgba-color`, `short-select` /
`select`, `unit-input`, compact color, and `icon`). To use a different child control, add a render
branch for it in the option type's `view.php`.
:::
