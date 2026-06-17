---
title: "Upload"
sidebar_position: 19
---


Single file upload.

<img src="/img/options/opt-upload.png" alt="upload option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_upload' => [
		'label'       => __( 'Single Upload', 'unysonplus' ),
		'desc'        => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'type'        => 'upload',
		// — Optional attributes you can add (commented) —
		// 'label' => __( 'Label', 'unysonplus' ),  // or false to hide the label column
		// 'desc'  => __( 'Short description', 'unysonplus' ),
		// 'help'  => __( 'Help tip text', 'unysonplus' ),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		// 'attr'  => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'images_only'      => false,            // allow any file type, not just images
		// 'files_ext'        => [ 'pdf', 'zip' ], // restrict to these extensions
		// 'extra_mime_types' => [ 'application/pdf' ],
		// 'thumb_max_width'  => '240px',          // cap the preview thumbnail width
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
