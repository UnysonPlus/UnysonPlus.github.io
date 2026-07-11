---
title: "Background Pro"
sidebar_position: 51
---

Composite background option with **Color / Gradient / Image / Video** tabs that stack as CSS layers (color underneath → video on top). The dot on a tab marks a layer that has a value.

<img src="/img/options/opt-demo_background_pro.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_background_pro' => [
		'label' => __( 'Background Pro', 'unysonplus' ),
		'type' => 'background-pro',
		'desc' => __( 'Composite background option (v1). Four tabs: Color / Gradient / Image / Video. Values stack as CSS layers — color underneath, gradient over, image over, video on top. The dot on each tab indicates that layer has a value.', 'unysonplus' ),
	],
];
```

## Reading the value

`background-pro` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_background_pro'];
echo esc_attr( $value['color'] ); // + gradient / image / video / overlay (see Saved value)
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_background_pro' );
echo esc_attr( $value['color'] ); // + gradient / image / video / overlay (see Saved value)
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_background_pro'];
echo esc_attr( $value['color'] ); // + gradient / image / video / overlay (see Saved value)
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_background_pro' );
echo esc_attr( $value['color'] ); // + gradient / image / video / overlay (see Saved value)
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_background_pro' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [color] => Array
        (
            [value] => Array
                (
                    [predefined] => ''
                    [custom] => ''
                )
        )
    [gradient] => Array
        (
            [data] => Array
                (
                    [type] => 'linear'
                    [angle] => 90
                    [stops] => Array
                        (
                        )
                )
        )
    [image] => Array
        (
            [src] => Array
                (
                )
            [position] => 'center center'
            [size] => Array
                (
                    [selected] => 'cover'
                    [custom] => ''
                )
            [repeat] => 'no-repeat'
            [attachment] => 'scroll'
        )
    [video] => Array
        (
            [enabled] => 'no'
            [external_url] => ''
            [source_mp4] => Array
                (
                )
            [source_webm] => Array
                (
                )
            [poster] => Array
                (
                )
            [fallback] => Array
                (
                )
            [loop] => 'no'
            [autoplay] => 'yes'
            [mute] => 'yes'
            [playsinline] => 'yes'
            [allow_interaction] => 'no'
        )
    [overlay] => Array
        (
            [color] => ''
            [gradient] => Array
                (
                    [type] => 'linear'
                    [angle] => 90
                    [stops] => Array
                        (
                        )
                )
        )
    [advanced] => Array
        (
        )
)
```
