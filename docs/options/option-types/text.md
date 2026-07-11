---
title: "Text"
sidebar_position: 1
---


Regular text input.

<img src="/img/options/opt-text.png" alt="text option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_text' => [
		'label' => __( 'Text', 'unysonplus' ),  // or false to hide the label column
		'type' => 'text',
		'value' => 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
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
		// 'dynamic_content' => false,  // hide the Dynamic Content (database) picker
	],
];
```

## Reading the value

`text` returns a plain **string**, so you can output it directly. How you *get* it depends on where the option is registered — the three places are shown below.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_text'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_text' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' ); // 'book' = the box/group id
echo esc_html( $book['demo_text'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_text' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_text' ) )` outputs — the shape of this option type's stored value:

```text
Build premium WordPress themes
```
