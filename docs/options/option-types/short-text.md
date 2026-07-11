---
title: "Short Text"
sidebar_position: 40
---

A narrow, compact-width text input — otherwise identical to **Text**.

<img src="/img/options/opt-demo_short_text.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_short_text' => [
		'label' => __( 'Short Text', 'unysonplus' ),
		'type' => 'short-text',
		'value' => '7',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_short_text_2' )` returns — so you can see the shape of this option type's stored value:

```text
7
```
