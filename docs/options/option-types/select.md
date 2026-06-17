---
title: "Select"
sidebar_position: 6
---


Regular select.

<img src="/img/options/opt-select.png" alt="select option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_select'                    => [
		'label'   => __( 'Select', 'unysonplus' ),
		'type'    => 'select',
		'value'   => 'c',
		'desc'    => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			''  => '---',
			'a' => __( 'Lorem ipsum', 'unysonplus' ),
			'b' => [
				'text' => __( 'Consectetur', 'unysonplus' ),
				'attr' => [
					'label'         => 'Label overrides text',
					'data-whatever' => 'some data',
				],
			],
			[
				'attr'    => [
					'label'         => __( 'Optgroup Label', 'unysonplus' ),
					'data-whatever' => 'some data',
				],
				'choices' => [
					'c' => __( 'Sed ut perspiciatis', 'unysonplus' ),
					'd' => __( 'Excepteur sint occaecat', 'unysonplus' ),
				],
			],
			1   => __( 'One', 'unysonplus' ),
			2   => __( 'Two', 'unysonplus' ),
			3   => __( 'Three', 'unysonplus' ),
		],
		'help'    => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```
