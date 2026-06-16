---
title: "Multi-Select"
sidebar_position: 8
---


Select multiple choices from different sources: posts, taxonomies, users or a custom array.

```php
$options = [
	'demo_multi_select_array'      => [
		'type'       => 'multi-select',
		'label'      => __( 'Multi-Select: Custom Array', 'unysonplus' ),
		'population' => 'array',
		'choices'    => [
			'hello' => __( 'Hello', 'unysonplus' ),
			'world' => __( 'World', 'unysonplus' ),
		],
		'desc'       => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help'       => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```
