---
title: "Button Presets"
sidebar_position: 55
---

The full button builder used by **Theme Settings → General → Buttons** — collapsible presets, each with Default / Hover / Active / Focus / Disabled state tabs, a Font control, a transition and a custom-CSS box. Each preset compiles to a `.btn-{slug}` class.

<img src="/img/options/opt-demo_button_presets.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_button_presets' => [
		'label' => __( 'Button Presets', 'unysonplus' ),
		'type' => 'button-presets',
		'color-choices' => unysonplus_demo_compact_choices( 'bg' ),
		'value' => [],
		'desc' => __( 'The full button builder used by Theme Settings → General → Buttons. Collapsible presets, each with Default / Hover / Active / Focus / Disabled state tabs (colors, spacing, border, box-shadow), a Font control, a transition, and a custom-CSS box. Each preset compiles to a <code>.btn-{slug}</code> class.', 'unysonplus' ),
	],
];
```

## Reading the value

`button-presets` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_button_presets'];
foreach ( (array) $value as $preset ) {
	// each entry is a chosen button preset
}
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_button_presets' );
foreach ( (array) $value as $preset ) {
	// each entry is a chosen button preset
}
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_button_presets'];
foreach ( (array) $value as $preset ) {
	// each entry is a chosen button preset
}
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_button_presets' );
foreach ( (array) $value as $preset ) {
	// each entry is a chosen button preset
}
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_button_presets' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
)
```
