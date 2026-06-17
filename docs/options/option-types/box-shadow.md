---
title: "Box Shadow"
sidebar_position: 54
---

Structured box-shadow builder: X / Y / blur / spread / color / inset, with a live preview and the generated CSS string. Consume with `FW_Option_Type_Box_Shadow::to_css( $val )`.

<img src="/img/options/opt-demo_box_shadow.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_box_shadow'                => [
		'label' => __( 'Box Shadow', 'unysonplus' ),
		'type'  => 'box-shadow',
		'value' => [ 'x' => 0, 'y' => 6, 'blur' => 18, 'spread' => 0, 'color' => 'rgba(0,0,0,0.25)', 'inset' => false ],
		'desc'  => __( 'Structured box-shadow builder: X / Y / blur / spread / color / inset, with a 300px live preview on top and the generated CSS string below. Consume with <code>FW_Option_Type_Box_Shadow::to_css( $val )</code>.', 'unysonplus' ),
	],
];
```
