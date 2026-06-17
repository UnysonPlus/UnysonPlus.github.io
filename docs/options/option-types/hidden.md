---
title: "Hidden"
sidebar_position: 32
---


Simple hidden input.

```php
$options = [
	'demo_hidden'                    => [
		'label' => false,
		'type'  => 'hidden',
		// — Optional attributes you can add (commented) —
		// 'label' => __( 'Label', 'unysonplus' ),  // or false to hide the label column
		// 'desc'  => __( 'Short description', 'unysonplus' ),
		// 'help'  => __( 'Help tip text', 'unysonplus' ),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		// 'attr'  => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		'value' => '{some: "json"}',
		'desc'  => false,
	],
];
```

:::tip
The hidden input is not visible, so parameters like `label`, `desc` and `help` have no sense here.
:::
