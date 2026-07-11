---
title: "Slider"
sidebar_position: 21
---


Drag the handle to select a numeric value.

<img src="/img/options/opt-slider.png" alt="slider option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_slider' => [
		'label' => __( 'Slider', 'unysonplus' ),  // or false to hide the label column
		'type' => 'slider',
		'value' => 10,
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'properties' => [ 'min' => 0, 'max' => 100, 'step' => 1 ],
	],
];
```

## Reading the value

`slider` returns a **number** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo (float) $atts['demo_slider'];
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_slider' );
echo (float) $value;
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo (float) $book['demo_slider'];
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_slider' );
echo (float) $value;
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_slider' ) )` outputs — the shape of this option type's stored value:

```text
10
```
