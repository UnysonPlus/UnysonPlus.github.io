---
title: "Popup"
sidebar_position: 23
---

Popup with options.

<img src="/img/options/opt-popup.png" alt="popup option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_popup' => [
		'type' => 'popup',
		'value' => [
			'option_1' => 'value 1',
			'option_2' => 'value 2',
		],
		'label' => __('Popup', 'unysonplus'),  // or false to hide the label column
		'desc' => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus'),
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
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
	],
];
```

## Reading the value

`popup` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_popup'];
echo esc_html( $value['heading'] ); // each key is an inner option id
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_popup' );
echo esc_html( $value['heading'] ); // each key is an inner option id
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_popup'];
echo esc_html( $value['heading'] ); // each key is an inner option id
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_popup' );
echo esc_html( $value['heading'] ); // each key is an inner option id
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_popup' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [heading] => 'Our Team'
    [columns] => 3
)
```
