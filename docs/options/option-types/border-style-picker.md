---
title: "Border Style Picker"
sidebar_position: 59
slug: /options/option-types/border-style-picker
description: The Unyson+ border-style-picker option type — choose a border style from a previewed list of presets.
---

# Border Style Picker

A preview picker for a **border style preset**. It shows each available style as a small preview and
stores the chosen preset's key. `allow_none` (default on) lets the user clear the selection.

```php
$options = [
	'demo_border_style' => [
		'type'         => 'border-style-picker',
		'label'        => __( 'Border Style', 'unysonplus' ),
		'value'        => '',
		'preview_text' => __( 'Border', 'unysonplus' ),
		'allow_none'   => true,
	],
];
```

## Saved value

A **string** — the selected border-style preset key, or `''` when none is chosen.

## In Gutenberg blocks (the React control)

`border-style-picker` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `border-style-picker` control does

A labelled dropdown of the declared presets, with `— Select —` first when `allow_none` is on.

:::note[Why a dropdown and not the tile grid the page builder shows]
The PHP renderer previews each choice by applying the preset's **class** to a sample box. Those classes come from the theme's compiled stylesheet, which is not loaded in a block sidebar — the sidebar is the outer document, while theme styles load into the canvas iframe.

Drawing the tiles there would produce a grid of identical, unstyled boxes: a preview that previews nothing and actively misleads. `preview_kind: 'badge'` choices carry **inline** styles rather than classes, so where those are declared the swatch *is* meaningful and is shown beside the dropdown.
:::

:::caution[`allow_none` changes what is valid]
The server accepts only keys present in `choices` — plus the empty string, **and only when `allow_none` is on**. With it off, an empty value is rejected and replaced by the option default.

So the control offers a blank entry only when the schema allows one. Offering it otherwise would let a user pick something the server silently undoes.
:::
