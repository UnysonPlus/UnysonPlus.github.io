---
title: "Split Slider"
sidebar_position: 54
slug: /options/option-types/split-slider
description: The Unyson+ split-slider option type — a draggable ratio control that divides 100% across N named parts.
---

# Split Slider

A draggable **ratio** control: split 100% across N parts by dragging the dividers. Each part carries a
width `w` (the parts always sum to 100) and an optional `name`. Used for column ratios — for example
the theme's footer column widths.

```php
$options = [
	'demo_split' => [
		'type'  => 'split-slider',
		'label' => __( 'Column Ratio', 'unysonplus' ),
		'min'   => 1,                                  // min width per part
		'value' => [
			[ 'w' => 60, 'name' => 'Main' ],
			[ 'w' => 40, 'name' => 'Aside' ],
		],
	],
];
```

## Saved value

An array of `{ w, name }` rows whose `w` values sum to 100:

```text
Array
(
    [0] => Array ( [w] => 60, [name] => Main )
    [1] => Array ( [w] => 40, [name] => Aside )
)
```

## In Gutenberg blocks (the React control)

``split-slider`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `split-slider` control does

A number field per pane, with a proportional bar above them, plus **Equal columns** for the AUTO state.

:::note[An empty value is a real value: AUTO]
It means equal columns, not "unset". `_get_value_from_input()` returns an empty array for empty input and never expands it into explicit halves, so the control keeps the distinction rather than helpfully filling it in.

Switching *off* Equal columns materialises the split that was already on screen, so the first explicit value matches what you were just looking at.
:::

:::note[Widths normalise as you type]
`normalize()` scales the widths to sum 100 and clamps each to `min_width`. On the page-builder path that happens on save; on the block path nothing runs at all — so the control normalises immediately, and the numbers in the sidebar are the numbers that render.
:::

:::note[No drag handles here]
The page builder offers a drag splitter. A three-handle splitter inside a 280px column is fiddlier than typing a number, and dragging in a block sidebar competes with the editor's own gestures.
:::
