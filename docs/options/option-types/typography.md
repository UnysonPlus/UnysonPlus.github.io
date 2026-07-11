---
title: "Typography"
sidebar_position: 36
---


Choose font family, size, style and color.

<img src="/img/options/opt-typography.png" alt="typography option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_typography' => [
		'label' => __( 'Typography', 'unysonplus' ),  // or false to hide the label column
		'type' => 'typography',
		'value' => [
			'size' => 17,
			'family' => 'Verdana',
			'style' => '300italic',
			'color' => '#0000ff'
		],
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
		// 'components' => [ 'family' => true, 'size' => true, 'color' => true ],
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_typography_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [size] => 17
    [family] => 'Verdana'
    [style] => '300italic'
    [color] => '#0000ff'
)
```
