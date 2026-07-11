---
title: "Gradient"
sidebar_position: 12
---


Pick gradient colors.

<img src="/img/options/opt-gradient.png" alt="gradient option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_gradient' => [
		'label' => __( 'Gradient', 'unysonplus' ),  // or false to hide the label column
		'type' => 'gradient',
		'value' => [
			'primary' => '#ffffff',
			'secondary' => '#ffffff'
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

`gradient` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_gradient'];
printf( 'linear-gradient(%s, %s)', esc_attr( $value['primary'] ), esc_attr( $value['secondary'] ) );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_gradient' );
printf( 'linear-gradient(%s, %s)', esc_attr( $value['primary'] ), esc_attr( $value['secondary'] ) );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_gradient'];
printf( 'linear-gradient(%s, %s)', esc_attr( $value['primary'] ), esc_attr( $value['secondary'] ) );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_gradient' );
printf( 'linear-gradient(%s, %s)', esc_attr( $value['primary'] ), esc_attr( $value['secondary'] ) );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_gradient' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [primary] => #e5322d
    [secondary] => #2f74e6
)
```
