---
title: "Box Shadow"
sidebar_position: 54
---

Structured box-shadow builder: X / Y / blur / spread / color / inset, with a live preview and the generated CSS string. Consume with `FW_Option_Type_Box_Shadow::to_css( $val )`.

<img src="/img/options/opt-demo_box_shadow.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_box_shadow' => [
		'label' => __( 'Box Shadow', 'unysonplus' ),
		'type' => 'box-shadow',
		'value' => [ 'x' => 0, 'y' => 6, 'blur' => 18, 'spread' => 0, 'color' => 'rgba(0,0,0,0.25)', 'inset' => false ],
		'desc' => __( 'Structured box-shadow builder: X / Y / blur / spread / color / inset, with a 300px live preview on top and the generated CSS string below. Consume with <code>FW_Option_Type_Box_Shadow::to_css( $val )</code>.', 'unysonplus' ),
	],
];
```

## Reading the value

`box-shadow` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_box_shadow'];
printf( '%spx %spx %spx %spx %s',
	(int) $value['x'], (int) $value['y'], (int) $value['blur'], (int) $value['spread'], esc_attr( $value['color'] ) );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_box_shadow' );
printf( '%spx %spx %spx %spx %s',
	(int) $value['x'], (int) $value['y'], (int) $value['blur'], (int) $value['spread'], esc_attr( $value['color'] ) );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_box_shadow'];
printf( '%spx %spx %spx %spx %s',
	(int) $value['x'], (int) $value['y'], (int) $value['blur'], (int) $value['spread'], esc_attr( $value['color'] ) );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_box_shadow' );
printf( '%spx %spx %spx %spx %s',
	(int) $value['x'], (int) $value['y'], (int) $value['blur'], (int) $value['spread'], esc_attr( $value['color'] ) );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_box_shadow' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [x] => 0
    [y] => 4
    [blur] => 12
    [spread] => 0
    [color] => rgba(0,0,0,0.15)
    [inset] => 
)
```
