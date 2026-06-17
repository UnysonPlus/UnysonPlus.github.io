---
title: "Password"
sidebar_position: 34
---


Regular password input.

<img src="/img/options/opt-password.png" alt="password option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_password'                  => [
		'label' => __( 'Password', 'unysonplus' ),  // or false to hide the label column
		'type'  => 'password',
		'value' => 'Dotted text',
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
		// 'dynamic_content' => false,  // hide the Dynamic Content (database) picker
	],
];
```
