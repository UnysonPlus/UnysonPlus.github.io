---
title: "Oembed"
sidebar_position: 35
---


Generate oembed preview of the inserted link, for more details see [Embeds](https://codex.wordpress.org/Embeds) in WordPress.

```php
$options = [
	'demo_oembed' => [
		'type'  => 'oembed',
		'value' => 'https://vimeo.com/113078377',
		'label' => __('Label', 'unysonplus'),  // or false to hide the label column
		'desc'  => __('Description', 'unysonplus'),
		'help'  => __('Help tip', 'unysonplus'),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		'preview' => [
			'width'  => 300, // optional, if you want to set the fixed width to iframe
			'height' => 300, // optional, if you want to set the fixed height to iframe
			/**
			 * if is set to false it will force to fit the dimensions,
			 * because some widgets return iframe with aspect ratio and ignore applied dimensions
			 */
			'keep_ratio' => true
		]
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
	],
];
```
