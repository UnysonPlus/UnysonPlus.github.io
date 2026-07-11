---
title: "Date Picker"
sidebar_position: 15
---

Pick a date in calendar.

<img src="/img/options/opt-date-picker.png" alt="date-picker option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_date_picker' => [
		'type'  => 'date-picker',
		'value' => '',
		'attr'  => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label' => __('Label', 'unysonplus'),  // or false to hide the label column
		'desc'  => __('Description', 'unysonplus'),
		'help'  => __('Help tip', 'unysonplus'),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		'monday-first' => true, // The week will begin with Monday; for Sunday, set to false
		'min-date' => date('d-m-Y'), // By default minimum date will be current day. Set a date in format d-m-Y as a start date
		'max-date' => null, // By default there is not maximum date. Set a date in format d-m-Y as a start date
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_date_picker' )` returns — so you can see the shape of this option type's stored value:

```text
2026-06-15
```
