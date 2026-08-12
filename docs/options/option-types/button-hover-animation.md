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
