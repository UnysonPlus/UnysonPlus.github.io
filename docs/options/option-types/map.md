---
title: "Map"
sidebar_position: 30
---


Google maps location.

```php
$options = [
	'demo_map' => [
		'type'  => 'map',
		// — Optional attributes you can add (commented) —
		// 'label' => __( 'Label', 'unysonplus' ),  // or false to hide the label column
		// 'desc'  => __( 'Short description', 'unysonplus' ),
		// 'help'  => __( 'Help tip text', 'unysonplus' ),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		// 'attr'  => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		'value' => [
			'coordinates' => [
				'lat'   => -34,
				'lng'   => 150,
			]
		],
		'attr'  => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label' => __('Label', 'unysonplus'),
		'desc'  => __('Description', 'unysonplus'),
		'help'  => __('Help tip', 'unysonplus'),
	],
];
```
