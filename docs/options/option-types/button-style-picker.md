---
title: "Button Style Picker"
sidebar_position: 56
---

A dropdown that previews each Button Preset as a real button. Reused by the Button shortcode's Style and Size pickers. Stores the class string, e.g. `btn-primary`.

<img src="/img/options/opt-demo_button_style_picker.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_button_style_picker'       => [
		'label'        => __( 'Button Style Picker', 'unysonplus' ),
		'type'         => 'button-style-picker',
		'choices'      => sc_get_button_style_choices(),
		'preview_text' => __( 'Button', 'unysonplus' ),
		'desc'         => __( 'A dropdown that previews each Button Preset as a real button (trigger + every row). Reused by the Button shortcode\'s Style and Size pickers. Stores the class string, e.g. <code>btn-primary</code>.', 'unysonplus' ),
	],
];
```
