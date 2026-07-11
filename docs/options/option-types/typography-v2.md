---
title: "Typography v2"
sidebar_position: 27
---


Choose font family, style, weight, size, line-height, letter-spacing and color.

<img src="/img/options/opt-typography-v2.png" alt="typography-v2 option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_typography-v2' => [
		'label' => __( 'Typography V2', 'unysonplus' ),  // or false to hide the label column
		'type' => 'typography-v2',
		'value' => [
			'family' => 'Amarante',
//			For standard fonts, instead of subset and variation you should set 'style' and 'weight'.
//			'style' => 'italic',
//			'weight' => 700,
			'subset' => 'latin-ext',
			'variation' => 'regular',
			'size' => 14,
			'line-height' => 13,
			'letter-spacing' => -2,
			'color' => '#0000ff'
		],
		'components' => [
			'family' => true,
			//'style', 'weight', 'subset', 'variation' will appear and disappear along with 'family'
			'size' => true,
			'line-height' => true,
			'letter-spacing' => true,
			'color' => true
		],
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

## Reading the value

`typography-v2` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_typography-v2_2'];
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_typography-v2_2' );
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_typography-v2_2'];
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_typography-v2_2' );
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_typography-v2_2' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [google_font] => true
    [subset] => 'latin-ext'
    [variation] => 'regular'
    [family] => 'Amarante'
    [style] => false
    [weight] => false
    [size] => '14'
    [line-height] => '13'
    [letter-spacing] => '-2'
    [color] => '#0000ff'
)
```
