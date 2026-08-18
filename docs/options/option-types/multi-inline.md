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

## In Gutenberg blocks (the React control)

``multi-inline`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `multi-inline` control does

The child fields side by side when `equal` is set and there are no more than three of them, stacked otherwise — four text inputs in a 280px column are too narrow to read what is in them.

:::caution[The child schema uses `title`, not `label`]
Nearly every other option type names it `label`. This one names it `title`, and that is the key the PHP view reads.

A control passing the child schema straight to a shared control would therefore render every field **unlabelled**. The React control maps it across.
:::

:::note[Values pass through untouched]
`_get_value_from_input()` returns any array it is handed, so the child controls' output is stored exactly as produced — the flat map `{ monthly: '29', yearly: '' }`.
:::
