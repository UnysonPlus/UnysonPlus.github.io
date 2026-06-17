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
		// — Optional attributes you can add (commented) —
		// 'label' => __( 'Label', 'unysonplus' ),  // or false to hide the label column
		// 'desc'  => __( 'Short description', 'unysonplus' ),
		// 'help'  => __( 'Help tip text', 'unysonplus' ),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		// 'attr'  => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'properties' => [ 'min' => 0, 'max' => 100, 'step' => 1 ],
		'value' => 10,
		'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
		'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'unysonplus' )
		),
	],
];
```
