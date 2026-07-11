---
title: "Gradient"
sidebar_position: 12
---


Pick gradient colors.

<img src="/img/options/opt-gradient.png" alt="gradient option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_gradient' => [
		'label' => __( 'Gradient', 'unysonplus' ),  // or false to hide the label column
		'type'  => 'gradient',
		'value' => [
			'primary'   => '#ffffff',
			'secondary' => '#ffffff'
		],
		'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_gradient_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [primary] => #ffffff
    [secondary] => #ffffff
)
```
