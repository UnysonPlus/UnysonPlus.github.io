---
title: "Code Editor"
sidebar_position: 44
---

A syntax-highlighted code field (WordPress CodeMirror). The top-level `mode` key selects the language: `css`, `javascript`, `htmlmixed`, `php`, `json` or `xml`.

<img src="/img/options/opt-demo_code_editor.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_code_editor' => [
		'label' => __( 'Code Editor', 'unysonplus' ),
		'type' => 'code-editor',
		'mode' => 'css',
		'value' => "selector {\n\tcolor: #2563eb;\n\tpadding: 2rem 0;\n}",
		'desc' => __( 'Syntax-highlighted code field (WordPress CodeMirror). The top-level "mode" key selects the language: css, javascript, htmlmixed, php, json or xml.', 'unysonplus' ),
		'placeholder' => "/* Write CSS here */\nselector { … }",
		// — Optional attributes you can add —
		// 'height' => 300,
	],
];
```

## Reading the value

`code-editor` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_code_editor'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_code_editor' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_code_editor'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_code_editor' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_code_editor' ) )` outputs — the shape of this option type's stored value:

```text
selector {
    color: #e5322d;
}
```
