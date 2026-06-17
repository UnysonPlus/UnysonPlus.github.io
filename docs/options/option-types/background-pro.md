---
title: "Background Pro"
sidebar_position: 51
---

Composite background option with **Color / Gradient / Image / Video** tabs that stack as CSS layers (color underneath → video on top). The dot on a tab marks a layer that has a value.

<img src="/img/options/opt-demo_background_pro.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_background_pro'            => [
		'label' => __( 'Background Pro', 'unysonplus' ),
		'type'  => 'background-pro',
		'desc'  => __( 'Composite background option (v1). Four tabs: Color / Gradient / Image / Video. Values stack as CSS layers — color underneath, gradient over, image over, video on top. The dot on each tab indicates that layer has a value.', 'unysonplus' ),
	],
];
```
