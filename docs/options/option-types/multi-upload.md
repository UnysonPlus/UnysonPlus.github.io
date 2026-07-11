---
title: "Multi-Upload"
sidebar_position: 20
---


Upload multiple files.

<img src="/img/options/opt-multi-upload.png" alt="multi-upload option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_multi_upload' => [
		'label' => __( 'Multi Upload', 'unysonplus' ),  // or false to hide the label column
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'type' => 'multi-upload',
		'images_only' => false,
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'files_ext' => [ 'pdf', 'zip' ],
	],
];
```

**Custom Events**

`fw:option-type:multi-upload:change` - The value was changed.

`fw:option-type:multi-upload:clear` - The value is cleared (all the selected items are removed).

`fw:option-type:multi-upload:remove` - A thumb (selected item) is removed. Triggered only when `images_only` is set to `true`.

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_multi_upload_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
)
```
