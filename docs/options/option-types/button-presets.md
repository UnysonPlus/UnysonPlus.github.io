---
title: "Button Presets"
sidebar_position: 55
---

The full button builder used by **Theme Settings → General → Buttons** — collapsible presets, each with Default / Hover / Active / Focus / Disabled state tabs, a Font control, a transition and a custom-CSS box. Each preset compiles to a `.btn-{slug}` class.

<img src="/img/options/opt-demo_button_presets.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_button_presets'            => [
		'label'         => __( 'Button Presets', 'unysonplus' ),
		'type'          => 'button-presets',
		'color-choices' => unysonplus_demo_compact_choices( 'bg' ),
		'value'         => [],
		'desc'          => __( 'The full button builder used by Theme Settings → General → Buttons. Collapsible presets, each with Default / Hover / Active / Focus / Disabled state tabs (colors, spacing, border, box-shadow), a Font control, a transition, and a custom-CSS box. Each preset compiles to a <code>.btn-{slug}</code> class.', 'unysonplus' ),
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_button_presets_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
)
```
