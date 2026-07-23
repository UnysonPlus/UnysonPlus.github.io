---
title: "Image Style Picker"
sidebar_position: 57
---

A dropdown that previews each **Image Style preset** as a live thumbnail swatch — the sample image is rendered with the preset's real CSS (crop ratio, corner radius, mask, filter, scrim), so you see the treatment before picking it. Reused by every shortcode that offers an Image Style (Posts, Gallery, Image Box, Image, Image Content, Post Carousel, Featured Image). Stores the class string, e.g. `imgs-rounded`.

Presets are managed in **Theme Settings → Components → Image Styles**; each preset emits a `.imgs-{slug}` token bundle consumed by the shared `.imgs-wrap` base rule.

```php
$options = [
	'demo_image_style_picker' => [
		'label' => __( 'Image Style', 'unysonplus' ),
		'type' => 'image-style-picker',
		'choices' => sc_get_image_style_choices(),
		'desc' => __( 'Apply a reusable Image Style (crop, corners, mask, filter, scrim). Stores the class string, e.g. <code>imgs-rounded</code>.', 'unysonplus' ),
		// — Optional attributes you can add —
		// 'value' => '',
	],
];
```

Inside a shortcode, prefer the helper — it returns this option type (with label, desc and the live choices pre-filled) and degrades to a plain `select` if the option type isn't registered:

```php
'image_style' => sc_image_style_field(),
```

## Reading the value

`image-style-picker` returns a **string** — the `imgs-{slug}` class (empty string = none). Put it on the image's **wrapper** element:

```php
$cls = sc_image_style_class( $atts['image_style'] ); // sanitized 'imgs-…' or ''
printf( '<span class="imgs-wrap %s"><img … /></span>', esc_attr( $cls ) );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_image_style_picker' );
echo esc_html( $value );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_image_style_picker' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_image_style_picker' ) )` outputs — the shape of this option type's stored value:

```text
imgs-rounded
```
