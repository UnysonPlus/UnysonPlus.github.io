---
title: "Slider"
sidebar_position: 21
---


Drag the handle to select a numeric value.

<img src="/img/options/opt-slider.png" alt="slider option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_slider' => [
		'label' => __( 'Slider', 'unysonplus' ),
		'type'  => 'slider',
		'value' => 10,
		'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
		'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'unysonplus' )
		),
	],
];
```
