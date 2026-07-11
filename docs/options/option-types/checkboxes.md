---
title: "Checkboxes"
sidebar_position: 4
---


A list of checkboxes.

<img src="/img/options/opt-checkboxes.png" alt="checkboxes option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_checkboxes' => [
		'label' => __( 'Checkboxes', 'unysonplus' ),  // or false to hide the label column
		'type' => 'checkboxes',
		'value' => [
			'c1' => false,
			'c2' => true,
		],
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'c1' => __( 'Checkbox 1 Custom Text', 'unysonplus' ),
			'c2' => __( 'Checkbox 2 Custom Text', 'unysonplus' ),
			'c3' => __( 'Checkbox 3 Custom Text', 'unysonplus' ),
		],
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'inline' => true,  // lay them out in a row
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_checkboxes_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [c2] => true
)
```
