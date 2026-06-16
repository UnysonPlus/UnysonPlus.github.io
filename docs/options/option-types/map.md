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
		'label' => __('Label', 'unysonplus'),
		'desc'  => __('Description', 'unysonplus'),
		'help'  => __('Help tip', 'unysonplus'),
	],
];
```
