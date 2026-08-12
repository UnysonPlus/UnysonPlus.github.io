---
title: "Time Picker"
sidebar_position: 57
slug: /options/option-types/time-picker
description: The Unyson+ time-picker option type — pick a time of day. Sibling of the date and datetime pickers.
---

# Time Picker

A time-of-day picker (the time half of the datetime family). The saved value is a **time string** in
the picker's format (default `H:i`, e.g. `14:30`).

```php
$options = [
	'demo_time' => [
		'type'  => 'time-picker',
		'label' => __( 'Time', 'unysonplus' ),
		'value' => '',                        // e.g. '14:30'
		// Optional: pass datetime-picker config
		'datetime-picker' => [
			'format' => 'H:i',                // 24-hour by default
		],
	],
];
```

## Saved value

A plain string, e.g. `14:30` (empty when nothing is chosen). Read it like any scalar option with
`fw_get_db_settings_option()` / `fw_get_db_post_option()`.

See also [Date Picker](./date-picker.md) and [Datetime Picker](./datetime-picker.md).
