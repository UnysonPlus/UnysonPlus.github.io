---
title: "Short Select"
sidebar_position: 42
---

A narrow **Select** dropdown.

<img src="/img/options/opt-demo_short_select.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_short_select'              => [
		'label'   => __( 'Short Select', 'unysonplus' ),
		'type'    => 'short-select',
		'value'   => '7',
		'desc'    => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'1' => '1',
			'2' => '2',
			'3' => '3',
			'4' => '4',
			'5' => '5',
			'6' => '6',
			'7' => '7',
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
