---
title: "Button Hover Animation"
sidebar_position: 58
slug: /options/option-types/button-hover-animation
description: The Unyson+ button-hover-animation option type — a preview picker for a button's hover effect.
---

# Button Hover Animation

A picker that previews and selects a **button hover effect** from a set of choices. Each option renders
a live preview button (styled by `preview_base`, default `btn btn-primary`) so you can see the effect
before choosing. The saved value is the chosen effect's key (empty = none).

```php
$options = [
	'demo_btn_fx' => [
		'type'         => 'button-hover-animation',
		'label'        => __( 'Hover Animation', 'unysonplus' ),
		'value'        => '',
		'preview_base' => 'btn btn-primary',  // classes used on the preview buttons
		'placeholder'  => __( 'None', 'unysonplus' ),
	],
];
```

## Saved value

A **string** — the selected effect key, or `''` for none.

## In Gutenberg blocks (the React control)

``button-hover-animation`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `button-hover-animation` control does

The same row-of-real-buttons shape, with the effect classes applied. Hover a row to see the effect.

:::note[The empty value is ALWAYS accepted here]
Unlike [`button-style-picker`](./button-style-picker.md) and [`image-style-picker`](./image-style-picker.md), this type has no `allow_none` config: "no hover effect" is valid for every button, so the None row is unconditional.

The three controls look almost identical, which is exactly why that difference is pinned in the parity suite — a well-meaning unification into one shared control would otherwise start refusing a legal empty value.
:::

:::note[The control links `fx_css` itself]
The `.btnfx-*` classes are **not** part of the admin preset CSS — they live in a separate stylesheet the schema points at through `fx_css`, which the PHP renderer enqueues in `_enqueue_static()`. Nothing runs that for a block sidebar, so the React control links the file directly.

Without it every row would render an identical unstyled button: a preview that previews nothing, and worse than a plain list because it suggests the effects are all the same.
:::

:::note[No resting preview, by nature]
A hover effect has no appearance until hovered. The effect name is always visible, so the list stays usable by keyboard and for anyone who never hovers a row.
:::
