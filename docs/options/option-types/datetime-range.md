---
title: "Datetime Range"
sidebar_position: 17
---


Set a datetime range.

<img src="/img/options/opt-datetime-range.png" alt="datetime-range option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_datetime_range'            => [
		'type'             => 'datetime-range',
		'attr'             => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label'            => __( 'Demo date range', 'unysonplus' ),  // or false to hide the label column
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

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_datetime_range_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [from] => 
    [to] => 
)
```
