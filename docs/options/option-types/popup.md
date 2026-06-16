---
title: "Popup"
sidebar_position: 23
---


Popup with options.

```php
$options = [
	'demo_popup' => [
		'type' => 'popup',
		'value' => [
			'option_1' => 'value 1',
			'option_2' => 'value 2',
		],
		'label' => __('Popup', 'unysonplus'),
		'desc'  => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus'),
		'popup-title' => __('Popup Title', 'unysonplus'),
		'button' => __('Edit', 'unysonplus'),
		'popup-title' => null,
		'size' => 'small', // small, medium, large
		'popup-options' => [
			'option_1' => [
				'label' => __('Text', 'unysonplus'),
				'type' => 'text',
				'value' => 'Demo text value',
				'desc' => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus'),
				'help' => sprintf("%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus'),
					__('Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'unysonplus')
				),
			],
			'option_2' => [
				'label' => __('Textarea', 'unysonplus'),
				'type' => 'textarea',
				'value' => 'Demo textarea value',
				'desc' => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus'),
				'help' => sprintf("%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus'),
					__('Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'unysonplus')
				),
			],
		],
	],
];
```
