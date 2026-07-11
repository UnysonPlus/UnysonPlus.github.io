---
title: "Hidden"
sidebar_position: 32
---


Simple hidden input.

```php
$options = [
	'demo_hidden' => [
		'label' => false,  // or false to hide the label column
		'type' => 'hidden',
		'value' => '{some: "json"}',
		'desc' => false,
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
	],
];
```

:::tip
The hidden input is not visible, so parameters like `label`, `desc` and `help` have no sense here.
:::

## Reading the value

`hidden` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_hidden'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_hidden' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_hidden'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_hidden' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_hidden' ) )` outputs — the shape of this option type's stored value:

```text
auto-generated-token-a1b2c3
```
