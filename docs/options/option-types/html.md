---
title: "HTML"
sidebar_position: 33
---


If you want to display a custom piece of html, use this option type.

:::note
This option type has a value stored in a hidden input. Advanced users can create some javascript functionality in html and store the value in that hidden input.
:::

<img src="/img/options/opt-html.png" alt="html option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_html' => [
		'label' => __( 'HTML', 'unysonplus' ),  // or false to hide the label column
		'type' => 'html',
		'value' => '{some: "json"}',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'html' => '<em>Lorem</em> <b>ipsum</b> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADWSURBVDjLlZNNCsIwEEZzKW/jyoVbD+Aip/AGgmvRldCKNxDBv4LSfSG7kBZix37BQGiapA48ZpjMvIZAGRExwDmnESw7MMvsHnMFTdOQUsqjrmtXsggKEEVReCDseZc/HbOgoCxLDytwUEFBVVUe/fjNDguEEFGSAiml4Xq+DdZJAV78sM1oOpnT/fI0oEYPZ0lBtjuaBWSttcHtRQWvx9sMrlcb7+HQwxlmojfI9ycziGyj34sK3AV8zd7KFSYFCCwO1aMFsQgK8DO1bRsFM0HBP9i9L2ONMKHNZV7xAAAAAElFTkSuQmCC">',
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
	],
];
```

:::note
There are `html-fixed` and `html-full` option types as well. They are the same as `html` but has **fixed** and **full** option width.
:::

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_html_2' )` returns — so you can see the shape of this option type's stored value:

```text
'{some: "json"}'
```
