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
