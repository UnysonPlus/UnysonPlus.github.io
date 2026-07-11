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

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_background_pro_2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [color] => Array
        (
            [value] => Array
                (
                    [predefined] => 
                    [custom] => #0d3c54
                )

        )

    [gradient] => Array
        (
            [data] => Array
                (
                    [type] => linear
                    [angle] => 135
                    [stops] => Array
                        (
                            [0] => Array
                                (
                                    [color] => rgba(42, 123, 155, 1)
                                    [position] => 0
                                )

                            [1] => Array
                                (
                                    [color] => rgba(87, 199, 133, 1)
                                    [position] => 50
                                )

                            [2] => Array
                                (
                                    [color] => rgba(237, 221, 83, 1)
                                    [position] => 100
                                )

                        )

                )

        )

    [image] => Array
        (
            [src] => Array
                (
                    [attachment_id] => 11
                    [url] => //localhost/testsite/wp-content/uploads/2026/06/studio.jpg
                )

            [position] => center center
            [size] => Array
                (
                    [selected] => cover
                    [custom] => 
                )

            [repeat] => no-repeat
            [attachment] => scroll
        )

    [video] => Array
        (
            [enabled] => no
            [external_url] => 
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

            [loop] => no
            [autoplay] => yes
            [mute] => yes
            [playsinline] => yes
            [allow_interaction] => no
        )

    [overlay] => Array
        (
            [color] => 
            [gradient] => Array
                (
                    [type] => linear
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
