---
title: "Checkbox"
sidebar_position: 3
---


Single checkbox.

```php
$options = [
	'demo_checkbox'                  => [
		'label' => __( 'Checkbox', 'unysonplus' ),
		'type'  => 'checkbox',
		'value' => true,
		'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'text'  => __( 'Custom text', 'unysonplus' ),
		'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```
