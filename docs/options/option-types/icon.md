---
title: "Icon"
sidebar_position: 37
---


Choose a [FontAwesome](http://fontawesome.io/) icon.

```php
$options = [
	'demo_icon'                      => [
		'label' => __( 'Icon', 'unysonplus' ),
		'type'  => 'icon',
		'value' => 'fa fa-linux',
		'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```
