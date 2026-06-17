---
title: "Multi-Select"
sidebar_position: 8
---


Select multiple choices from different sources: posts, taxonomies, users or a custom array.

<img src="/img/options/opt-multi-select.png" alt="multi-select option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_multi_select_array'      => [
		'type'       => 'multi-select',
		// — Optional attributes you can add (commented) —
		// 'label' => __( 'Label', 'unysonplus' ),  // or false to hide the label column
		// 'desc'  => __( 'Short description', 'unysonplus' ),
		// 'help'  => __( 'Help tip text', 'unysonplus' ),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		// 'attr'  => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
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
