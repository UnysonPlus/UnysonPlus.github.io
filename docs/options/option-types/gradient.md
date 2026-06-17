---
title: "Gradient"
sidebar_position: 12
---


Pick gradient colors.

<img src="/img/options/opt-gradient.png" alt="gradient option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_gradient' => [
		'label' => __( 'Gradient', 'unysonplus' ),
		'type'  => 'gradient',
		'value' => [
			'primary'   => '#ffffff',
			'secondary' => '#ffffff'
		],
		'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```
