---
title: "Datetime Picker"
sidebar_position: 16
---


Pick a datetime in calendar.

```php
$options = [
	'demo_datetime_picker'           => [
		'type'            => 'datetime-picker',
		'value'           => '',
		'attr'            => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label'           => __( 'Date & Time picker', 'unysonplus' ),
		'desc'            => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help'            => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		'datetime-picker' => [
			'format'        => 'd-m-Y H:i',
			'extra-formats' => [],
			'moment-format' => 'DD-MM-YYYY HH:mm',
			'scrollInput'   => false,
			'maxDate'       => false,
			'minDate'       => false,
			'timepicker'    => true,
			'datepicker'    => true,
			'defaultTime'   => '12:00'
		]
	],
];
```
