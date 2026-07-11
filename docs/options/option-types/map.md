---
title: "Map"
sidebar_position: 30
---

Google maps location.

<img src="/img/options/opt-map.png" alt="map option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_map' => [
		'type'  => 'map',
		'value' => [
			'coordinates' => [
				'lat'   => -34,
				'lng'   => 150,
			]
		],
		'attr'  => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label' => __('Label', 'unysonplus'),  // or false to hide the label column
		'desc'  => __('Description', 'unysonplus'),
		'help'  => __('Help tip', 'unysonplus'),  // string, or [ 'icon' => 'video', 'html' => '…' ]
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_map' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [location] => 
    [venue] => 
    [address] => 
    [city] => 
    [state] => 
    [country] => 
    [zip] => 
    [coordinates] => Array
        (
            [lat] => -34
            [lng] => 150
        )

)
```
