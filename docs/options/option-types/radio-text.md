---
title: "Radio Text"
sidebar_position: 45
---

Radio buttons rendered as a connected button group.

<img src="/img/options/opt-demo_radio_text.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_radio_text' => [
		'label' => __( 'Radio Text', 'unysonplus' ),
		'type' => 'radio-text',
		'value' => '50',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'choices' => [
			'25' => __( '25%', 'unysonplus' ),
			'50' => __( '50%', 'unysonplus' ),
			'100' => __( '100%', 'unysonplus' ),
		],
		'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		),
	],
];
```

## Reading the value

`radio-text` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_radio_text_2'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_radio_text_2' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_radio_text_2'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_radio_text_2' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_radio_text_2' ) )` outputs — the shape of this option type's stored value:

```text
'75'
```
