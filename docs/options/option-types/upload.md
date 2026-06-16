---
title: "Upload"
sidebar_position: 19
---


Single file upload.

```php
$options = [
	'demo_upload' => [
		'label'       => __( 'Single Upload', 'unysonplus' ),
		'desc'        => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'type'        => 'upload',
		'images_only' => false,
		'help'        => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```

**Custom Events**

`fw:option-type:upload:change` - The value was changed.

`fw:option-type:upload:clear` - The value was cleared (the selected item is removed).
