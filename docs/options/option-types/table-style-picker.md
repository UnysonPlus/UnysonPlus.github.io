---
title: "Table Style Picker"
sidebar_position: 60
slug: /options/option-types/table-style-picker
description: The Unyson+ table-style-picker option type — choose a table style from a previewed list of presets.
---

# Table Style Picker

A preview picker for a **table style preset** — the table equivalent of the
[Border Style Picker](./border-style-picker.md). It previews each available table style and stores the
chosen preset's key; `allow_none` (default on) lets the user clear it.

```php
$options = [
	'demo_table_style' => [
		'type'         => 'table-style-picker',
		'label'        => __( 'Table Style', 'unysonplus' ),
		'value'        => '',
		'preview_text' => __( 'Table', 'unysonplus' ),
		'allow_none'   => true,
	],
];
```

## Saved value

A **string** — the selected table-style preset key, or `''` when none is chosen.
