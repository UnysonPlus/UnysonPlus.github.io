---
title: "Switch"
sidebar_position: 9
---


Switch between two choices.

<img src="/img/options/opt-switch.png" alt="switch option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_switch' => [
		'label' => __( 'Switch', 'unysonplus' ),  // or false to hide the label column
		'type' => 'switch',
		'right-choice' => [
			'value' => 'yes',
			'label' => __( 'Yes', 'unysonplus' )
		],
		'left-choice' => [
			'value' => 'no',
			'label' => __( 'No', 'unysonplus' )
		],
		'value' => 'yes',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
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

**Custom Events**

`fw:option-type:switch:change` - Value was changed.

:::note
Switch value in html is json encoded to prevent issues with boolean values, so before using the html value in javascript do `value = JSON.parse(value);`
:::

## Reading the value

`switch` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo $atts['demo_switch'] === 'yes' ? 'On' : 'Off';
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_switch' );
echo $value === 'yes' ? 'On' : 'Off';
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo $book['demo_switch'] === 'yes' ? 'On' : 'Off';
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_switch' );
echo $value === 'yes' ? 'On' : 'Off';
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_switch' ) )` outputs — the shape of this option type's stored value:

```text
'yes'
```
