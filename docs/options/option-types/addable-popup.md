---
title: "Addable Popup"
sidebar_position: 24
---


Addable popup with options.

```php
$options = [
	'demo_addable_popup'             => [
		'label'         => __( 'Addable Popup', 'unysonplus' ),
		'type'          => 'addable-popup',
		'desc'          => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'template'      => '{{- demo_text }}',
		'popup-options' => [
			'demo_text'                => [
				'label' => __( 'Text', 'unysonplus' ),
				'type'  => 'text',
				'value' => 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
			'demo_image_picker'        => [
				'label'   => __( 'Image Picker', 'unysonplus' ),
				'type'    => 'image-picker',
				'value'   => '',
				'desc'    => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'choices' => [
					'choice-1' => [
						'label' => __( 'First Image', 'unysonplus' ),
						'small' => [
							'height' => 70,
							'src'    => get_template_directory_uri() . '/images/image-picker-demo/thumb1.jpg'
						],
						'large' => [
							'height' => 214,
							'src'    => get_template_directory_uri() . '/images/image-picker-demo/tooltip1.jpg'
						],
					],
					'choice-2' => [
						'label' => __( 'Second Image', 'unysonplus' ),
						'small' => [
							'height' => 70,
							'src'    => get_template_directory_uri() . '/images/image-picker-demo/thumb2.jpg'
						],
						'large' => [
							'height' => 214,
							'src'    => get_template_directory_uri() . '/images/image-picker-demo/tooltip2.jpg'
						],
					],
				],
				'help'    => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
			'demo_upload_images'       => [
				'label' => __( 'Single Upload (Images Only)', 'unysonplus' ),
				'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'type'  => 'upload',
				'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
			'demo_addable_popup_inner' => [
				'label'         => __( 'Addable Popup', 'unysonplus' ),
				'type'          => 'addable-popup',
				'desc'          => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'template'      => 'Title color-picker value : {{- demo_color_picker }}',
				'popup-options' => [
					'demo_multi_upload_images' => [
						'label' => __( 'Multi Upload (images only)', 'unysonplus' ),
						'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
							'unysonplus' ),
						'type'  => 'multi-upload',
						'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
							__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
								'unysonplus' ),
							__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
								'unysonplus' )
						),
					],
					'demo_color_picker'        => [
						'label' => __( 'Color Picker', 'unysonplus' ),
						'type'  => 'color-picker',
						'value' => '',
						'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
							'unysonplus' ),
						'help'  => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
							__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
								'unysonplus' ),
							__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
								'unysonplus' )
						),
					]
				]
			],
		],
	],
];
```
