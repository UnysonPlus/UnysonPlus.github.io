---
title: Preset preview pickers
sidebar_position: 1
slug: /options/option-types/popover/preset-preview-pickers
description: How to build a compact popover that previews presets — like the Section shortcode's Background Pattern picker — from a preset library, image-picker choices, and a popover.
---

# Preset preview pickers

The Section shortcode's **Background Pattern** control is a compact trigger that opens a popover of
**thumbnail previews**, one per pattern preset. This page shows how that's built, so you can make your
own preset picker (patterns, overlays, textures, any reusable CSS/HTML preset).

It comes down to three parts:

1. a **preset library** the user can edit (add / remove / reorder),
2. a **choices provider** that turns each preset into an image-picker choice with a preview image, and
3. a **popover picker** that shows those choices as thumbnails.

:::info[What the real control uses]
Background Pattern is a **`multi-picker` with `popover: true`** (not the `popover` option type) whose
inner picker is an [`image-picker`](../image-picker.md). The `popover` option type can host the same
image-picker for a simpler single-value version — both give you a thumbnail popover.
:::

## 1. The preset library (an `addable-box` with live previews)

Presets live in **Theme Settings → Components** as an [`addable-box`](../addable-box.md) — the user
pastes HTML + CSS per row, and each collapsed row renders a **live, isolated `<iframe>` thumbnail** so
the preset's CSS can't leak into wp-admin. Each preset is a small array:

```php
// One preset row
[
	'id'           => 'dots',                 // stable id (stored value)
	'pattern_name' => 'Dots',                 // label
	'root_class'   => 'pat-dots',
	'html'         => '<div class="pat-dots"></div>',
	'css'          => '.pat-dots{width:100%;height:100%;background:radial-gradient(...)}',
]
```

The live thumbnail is produced by the `addable-box`'s `template` — an isolated iframe built from the
row's own HTML + CSS:

```js
// addable-box `template` (Underscore) — an isolated <iframe srcdoc> preview per row
"<span class='upw-pat-thumb'><iframe sandbox='allow-same-origin' scrolling='no' srcdoc='"
  + _.escape("<style>html,body{margin:0;width:100%;height:100%;overflow:hidden}</style><style>"
      + (o.css || "") + "</style>" + (o.html || "")) + "'></iframe></span>"
```

`_.escape()` entity-encodes the markup so it rides safely inside the single-quoted `srcdoc`; the
iframe then decodes and renders it in full isolation.

## 2. The choices provider (preset → image-picker choice)

A small function maps the stored presets into [`image-picker`](../image-picker.md) `choices` — each
keyed by preset id, with a `small` / `large` preview `src` and a `label`. The preview image is a
data-URI rendered from the preset's own HTML + CSS (so the picker thumbnail matches the real pattern):

```php
function my_pattern_imagepicker_choices() {
	$choices = [
		'none' => [
			'small' => [ 'src' => my_none_thumb_datauri(), 'height' => 66 ],
			'large' => [ 'src' => my_none_thumb_datauri(), 'height' => 132 ],
			'label' => __( 'None', 'fw' ),
		],
	];
	foreach ( my_get_pattern_presets() as $p ) {
		if ( empty( $p['id'] ) ) { continue; }
		$uri = my_pattern_thumb_datauri( $p['html'] ?? '', $p['css'] ?? '' ); // preview image
		$choices[ $p['id'] ] = [
			'small' => [ 'src' => $uri, 'height' => 66 ],
			'large' => [ 'src' => $uri, 'height' => 132 ],
			'label' => $p['pattern_name'] ?? $p['id'],
		];
	}
	return $choices;
}
```

The framework's built-in pattern picker uses `unysonplus_pattern_imagepicker_choices()` (which reads
`unysonplus_get_pattern_presets()` and renders each thumbnail with
`unysonplus_pattern_thumb_datauri()`) — mirror that shape for your own presets.

## 3. The popover picker

Feed those choices into an [`image-picker`](../image-picker.md), wrapped in a popover so it stays
compact. This is exactly the Section's Background Pattern option:

```php
'background_pattern' => [
	'type'    => 'multi-picker',
	'label'   => __( 'Background Pattern', 'fw' ),
	'popover' => true,                          // render as a compact popover trigger
	'value'   => [ 'pattern' => 'none' ],
	'picker'  => [
		'pattern' => [
			'type'    => 'image-picker',
			'label'   => false,
			'choices' => my_pattern_imagepicker_choices(),  // the thumbnails from step 2
		],
	],
	'choices'      => [],                        // reveal extra sub-options per choice here, if any
	'show_borders' => false,
],
```

The stored value is `[ 'pattern' => '<preset-id>' ]`. Because it stores the **preset id** (not the CSS),
renaming or recoloring a preset later updates everywhere it's used.

### Simpler: the `popover` option type

If you only need the picker (no extra per-choice sub-options), the [`popover`](./index.md) option type
hosts the same image-picker and passes its value straight through:

```php
'pattern' => [
	'type'          => 'popover',
	'label'         => __( 'Pattern', 'fw' ),
	'value'         => 'none',
	'inner-options' => [
		'pattern' => [ 'type' => 'image-picker', 'label' => false, 'choices' => my_pattern_imagepicker_choices() ],
	],
	'summary' => [ /* value => trigger label */ ],
],
```

## Rendering the chosen preset

On the front end, read the stored id and apply the matching preset's class (or its CSS). For the
built-in patterns, the plugin renders `.pattern-{id}` behind the section content; do the same for a
custom library — look the id up in your presets, output its `root_class` (or inject its CSS once).

## See also

- [`multi-picker`](../multi-picker.md) — the reveal-by-choice container (with `popover: true`)
- [`image-picker`](../image-picker.md) — the thumbnail picker
- [`addable-box`](../addable-box.md) — the editable preset library
- [Popover](./index.md) — the popover option type
