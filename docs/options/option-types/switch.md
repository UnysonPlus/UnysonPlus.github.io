---
title: "Switch"
sidebar_position: 9
---


Switch between two choices.

<img src="/img/options/opt-switch.png" alt="switch option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_switch'                    => [
		'label'        => __( 'Switch', 'unysonplus' ),  // or false to hide the label column
		'type'         => 'switch',
		'right-choice' => [
			'value' => 'yes',
			'label' => __( 'Yes', 'unysonplus' )
		],
		'left-choice'  => [
			'value' => 'no',
			'label' => __( 'No', 'unysonplus' )
		],
		'value'        => 'yes',
		'desc'         => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help'         => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
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

**Custom Events**

`fw:option-type:switch:change` - Value was changed.

:::note
Switch value in html is json encoded to prevent issues with boolean values, so before using the html value in javascript do `value = JSON.parse(value);`
:::

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_switch_2' )` returns — so you can see the shape of this option type's stored value:

```text
yes
```
