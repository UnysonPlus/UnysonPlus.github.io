---
title: "Multi"
sidebar_position: 31
---


Group any options database values under a single array key. This option has no design, inner options will look the same as other options (it's like the `group` container).

<img src="/img/options/opt-multi.png" alt="multi option type — Theme Settings example" width="1040" />

```php
// database value structure

'option_type_multi_id' => array(
    'inner_option_1' => ...
    'inner_option_2' => ...
)
```

```php
$options = [
	'demo_multi' => [
		'label' => false,  // or false to hide the label column
		'type' => 'multi',
		'value' => [],
		'desc' => false,
		'inner-options' => [
			'demo_text' => [
				'label' => __( 'Text in Multi', 'unysonplus' ),
				'type' => 'text',
				'value' => 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
			'demo_textarea' => [
				'label' => __( 'Textarea in Multi', 'unysonplus' ),
				'type' => 'textarea',
				'value' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
		],
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
	],
];
```

:::info
The parameter that contains options is named `inner-options` not `options` otherwise this will be treated as a container option.
:::

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_multi_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [demo_text] => 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium'
    [demo_textarea] => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
)
```
