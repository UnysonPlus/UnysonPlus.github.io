---
title: "Medium Text"
sidebar_position: 41
---

A medium-width text input.

<img src="/img/options/opt-demo_medium_text.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_medium_text' => [
		'label' => __( 'Medium Text', 'unysonplus' ),  // or false to hide the label column
		'type' => 'medium-text',
		'value' => '',
		'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help' => __( 'Optional help tip shown next to the label.', 'unysonplus' ),
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'dynamic_content' => false,  // hide the Dynamic Content (database) picker
	],
];
```

## Reading the value

`medium-text` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_medium_text'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_medium_text' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_medium_text'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_medium_text' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_medium_text' ) )` outputs — the shape of this option type's stored value:

```text
'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
```
