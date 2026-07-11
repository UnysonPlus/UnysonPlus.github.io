---
title: "Upload"
sidebar_position: 19
---


Single file upload.

<img src="/img/options/opt-upload.png" alt="upload option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_upload' => [
		'label' => __( 'Single Upload', 'unysonplus' ),  // or false to hide the label column
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'type' => 'upload',
		'images_only' => false,
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'files_ext' => [ 'pdf', 'zip' ],  // restrict to these extensions
		// 'thumb_max_width' => '240px',  // cap the preview thumbnail width
	],
];
```

**Custom Events**

`fw:option-type:upload:change` - The value was changed.

`fw:option-type:upload:clear` - The value was cleared (the selected item is removed).

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_upload_2' )` returns — so you can see the shape of this option type's stored value:

```text

```
