---
title: "Color Picker"
sidebar_position: 10
---


Pick a color.

<img src="/img/options/opt-color-picker.png" alt="color-picker option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_color_picker' => [
		'label' => __( 'Color Picker', 'unysonplus' ),  // or false to hide the label column
		'type'  => 'color-picker',
		'value' => '',
		'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'palettes' => false,  // hide the preset colour palettes
	],
];
```
