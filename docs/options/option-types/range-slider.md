---
title: "Range Slider"
sidebar_position: 22
---


Drag the handles to set a numeric value range.

```php
$options = [
	'demo_range_slider' => [
		'label' => __( 'Range Slider', 'unysonplus' ),
		'type'  => 'range-slider',
		'value' => [
			'from' => 30,
			'to' => 50
		],
		'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
		'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'unysonplus' )
		),
	],
];
```
