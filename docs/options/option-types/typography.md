---
title: "Typography"
sidebar_position: 36
---


Choose font family, size, style and color.

<img src="/img/options/opt-typography.png" alt="typography option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_typography' => [
		'label' => __( 'Typography', 'unysonplus' ),  // or false to hide the label column
		'type' => 'typography',
		'value' => [
			'size' => 17,
			'family' => 'Verdana',
			'style' => '300italic',
			'color' => '#0000ff'
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
		// 'components' => [ 'family' => true, 'size' => true, 'color' => true ],
	],
];
```

## Reading the value

`typography` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_typography'];
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_typography' );
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_typography'];
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_typography' );
printf( 'font-family:%s; font-size:%spx; color:%s;',
	esc_attr( $value['family'] ), esc_attr( $value['size'] ), esc_attr( $value['color'] ) );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_typography' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [size] => 17
    [family] => 'Verdana'
    [style] => '300italic'
    [color] => '#0000ff'
)
```
