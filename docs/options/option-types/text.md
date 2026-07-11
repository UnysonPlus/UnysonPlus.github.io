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

`text` returns a plain **string**, so you can output it directly.

**In a shortcode** — the option values reach the view (`view.php`) as `$atts`:

```php
echo esc_html( $atts['demo_text'] );
```

**In a page template** — read a per-page option (metabox) with `fw_get_db_post_option()`, or a global Theme Settings option with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_text' ); // per-page option
// $value = fw_get_db_settings_option( 'demo_text' );        // Theme Settings option

echo esc_html( $value );
```

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_text' )` returns — so you can see the shape of this option type's stored value:

```text
Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
```
