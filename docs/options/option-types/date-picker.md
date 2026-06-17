---
title: "Date Picker"
sidebar_position: 15
---


Pick a date in calendar.

```php
$options = [
	'demo_date_picker' => [
		'type'  => 'date-picker',
		// — Optional attributes you can add (commented) —
		// 'label' => __( 'Label', 'unysonplus' ),  // or false to hide the label column
		// 'desc'  => __( 'Short description', 'unysonplus' ),
		// 'help'  => __( 'Help tip text', 'unysonplus' ),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		// 'attr'  => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		'value' => '',
		'attr'  => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label' => __('Label', 'unysonplus'),
		'desc'  => __('Description', 'unysonplus'),
		'help'  => __('Help tip', 'unysonplus'),
		'monday-first' => true, // The week will begin with Monday; for Sunday, set to false
		'min-date' => date('d-m-Y'), // By default minimum date will be current day. Set a date in format d-m-Y as a start date
		'max-date' => null, // By default there is not maximum date. Set a date in format d-m-Y as a start date
	],
];
```
