---
title: "Radio Text"
sidebar_position: 45
---

Radio buttons rendered as a connected button group.

<img src="/img/options/opt-demo_radio_text.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_radio_text'                => [
		'label'   => __( 'Radio Text', 'unysonplus' ),
		'type'    => 'radio-text',
		'value'   => '50',
		'desc'    => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'25'  => __( '25%', 'unysonplus' ),
			'50'  => __( '50%', 'unysonplus' ),
			'100' => __( '100%', 'unysonplus' ),
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
