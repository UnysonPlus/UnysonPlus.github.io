---
title: "Datetime Range"
sidebar_position: 17
---


Set a datetime range.

```php
$options = [
	'demo_datetime_range'            => [
		'type'             => 'datetime-range',
		'attr'             => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label'            => __( 'Demo date range', 'unysonplus' ),
		'desc'             => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help'             => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		'datetime-pickers' => [
			'from' => [
				'timepicker' => false,
				'datepicker' => true,
			],
			'to'   => [
				'timepicker' => false,
				'datepicker' => true,
			]
		],
		'value'            => [
			'from' => '',
			'to'   => ''
		]
	],
];
```
