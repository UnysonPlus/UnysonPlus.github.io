---
title: "Image Style Picker"
sidebar_position: 57
---

A dropdown that previews each **Image Style preset** as a live thumbnail swatch — the sample image is rendered with the preset's real CSS (crop ratio, corner radius, mask, filter, scrim), so you see the treatment before picking it. Reused by every shortcode that offers an Image Style (Posts, Gallery, Image Box, Image, Image Content, Featured Image). Stores the class string, e.g. `imgs-rounded`.

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

## In Gutenberg blocks (the React control)

`image-style-picker` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `image-style-picker` control does

A grid of tiles, each showing the sample photo with that preset's treatment actually applied, plus a **None** tile when `allow_none` is on.

:::note[Why this control previews and `border-style-picker` does not]
Both are "pick a preset", and the two controls deliberately look different.

[`border-style-picker`](./border-style-picker.md) previews a choice by applying the preset's class to a sample box, and those classes live in the **theme's compiled stylesheet** — which loads into the editor's canvas iframe, not the sidebar. Tiles there would be a grid of identical unstyled boxes: a preview that previews nothing.

The Image Style presets ship in `unysonplus-presets`, enqueued on `admin_enqueue_scripts`, so they **are** present in the outer admin document the sidebar renders into. The swatches really are treated, and a picture of the treatment beats its name.
:::

:::caution[An unknown key reads as unselected]
`_get_value_from_input()` accepts a key present in `choices` — plus `''` when `allow_none` is on — and silently substitutes the option default for anything else. So a preset that has since been renamed or removed does not error; it quietly becomes something else on the next save.

The control shows such a value as **unselected** rather than displaying a selection the server would refuse. Better to see that nothing is chosen than to believe something is.
:::
