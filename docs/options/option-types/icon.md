---
title: "Icon"
sidebar_position: 37
---


Choose a [FontAwesome](http://fontawesome.io/) icon.

<img src="/img/options/opt-icon.png" alt="icon option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_icon' => [
		'label' => __( 'Icon', 'unysonplus' ),  // or false to hide the label column
		'type' => 'icon',
		'value' => 'fa fa-linux',
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
		// 'set' => 'font-awesome',  // icon set
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_icon_2' )` returns — so you can see the shape of this option type's stored value:

```text
fa fa-linux
```
