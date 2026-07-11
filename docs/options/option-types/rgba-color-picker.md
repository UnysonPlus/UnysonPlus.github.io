---
title: "RGBA Color Picker"
sidebar_position: 11
---


Pick a `rgba()` color.

<img src="/img/options/opt-rgba-color-picker.png" alt="rgba-color-picker option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_rgba_color_picker' => [
		'label' => __( 'RGBA Color Picker', 'unysonplus' ),  // or false to hide the label column
		'type' => 'rgba-color-picker',
		'value' => 'rgba(255, 0, 0, .5)',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'palettes' => false,  // hide the preset colour palettes
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_rgba_color_picker_2' )` returns — so you can see the shape of this option type's stored value:

```text

```
