---
title: "Map"
sidebar_position: 30
---


Google maps location.

```php
$options = [
	'demo_map' => [
		'type'  => 'map',
		'value' => [
			'coordinates' => [
				'lat'   => -34,
				'lng'   => 150,
			]
		],
		'attr'  => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label' => __('Label', 'unysonplus'),  // or false to hide the label column
		'desc'  => __('Description', 'unysonplus'),
		'help'  => __('Help tip', 'unysonplus'),  // string, or [ 'icon' => 'video', 'html' => '…' ]
	],
];
```
