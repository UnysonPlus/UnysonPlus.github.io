---
title: "Radio"
sidebar_position: 5
---


A list of radio buttons.

```php
$options = [
	'demo_radio'                     => [
		'label'   => __( 'Radio', 'unysonplus' ),
		'type'    => 'radio',
		'value'   => 'c2',
		'desc'    => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'c1' => __( 'Radio 1 Custom Text', 'unysonplus' ),
			'c2' => __( 'Radio 2 Custom Text', 'unysonplus' ),
			'c3' => __( 'Radio 3 Custom Text', 'unysonplus' ),
		],
		'help'    => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```
