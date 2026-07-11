---
title: "Range Slider"
sidebar_position: 22
---


Drag the handles to set a numeric value range.

<img src="/img/options/opt-range-slider.png" alt="range-slider option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_range_slider' => [
		'label' => __( 'Range Slider', 'unysonplus' ),  // or false to hide the label column
		'type' => 'range-slider',
		'value' => [
			'from' => 30,
			'to' => 50
		],
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'unysonplus' )
		),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'properties' => [ 'min' => 0, 'max' => 100, 'step' => 1 ],  // ion.rangeSlider settings
	],
];
```

## Reading the value

`range-slider` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_range_slider_2'];
echo esc_html( $value['from'] ) . ' - ' . esc_html( $value['to'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_range_slider_2' );
echo esc_html( $value['from'] ) . ' - ' . esc_html( $value['to'] );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_range_slider_2'];
echo esc_html( $value['from'] ) . ' - ' . esc_html( $value['to'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_range_slider_2' );
echo esc_html( $value['from'] ) . ' - ' . esc_html( $value['to'] );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_range_slider_2' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [from] => 30
    [to] => 50
)
```
