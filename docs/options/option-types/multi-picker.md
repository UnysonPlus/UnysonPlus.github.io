---
title: "Multi-Picker"
sidebar_position: 29
---

Pick a choice, then complete options related to that choice.

The `picker` parameter holds a valid option type with choices. Supported option types are `select`, `radio`, `image-picker` and `switch`.

## Multi Picker: Select

<img src="/img/options/opt-demo_multi_picker_select.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_multi_picker_select' => [
		'type' => 'multi-picker',
		'label' => false,
		'desc' => false,
		'picker' => [
			'gadget' => [
				'label' => __( 'Multi Picker: Select', 'unysonplus' ),
				'type' => 'select',
				'choices' => [
					'phone' => __( 'Phone', 'unysonplus' ),
					'laptop' => __( 'Laptop', 'unysonplus' )
				],
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				)
			]
		],
		'choices' => [
			'phone' => [
				'price' => [
					'type' => 'text',
					'label' => __( 'Price', 'unysonplus' ),

				],
				'memory' => [
					'type' => 'select',
					'label' => __( 'Memory', 'unysonplus' ),
					'choices' => [
						'16' => __( '16Gb', 'unysonplus' ),
						'32' => __( '32Gb', 'unysonplus' ),
						'64' => __( '64Gb', 'unysonplus' ),
					]
				]
			],
			'laptop' => [
				'price' => [
					'type' => 'text',
					'label' => __( 'Price', 'unysonplus' ),
				],
				'webcam' => [
					'type' => 'switch',
					'label' => __( 'Webcam', 'unysonplus' ),
				]
			],
		],
		'show_borders' => false,
		// — Optional attributes you can add —
		// 'hide_picker' => false,  // hide the picker control
		// 'popover' => false,  // render the picker in a popover
	],
];
```

## Multi Picker: Radio

<img src="/img/options/opt-demo_multi_picker_radio.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_multi_picker_radio' => [
		'type' => 'multi-picker',
		'label' => false,
		'desc' => false,
		'value' => [
			'gadget' => 'laptop',
		],
		'picker' => [
			'gadget' => [
				'label' => __( 'Multi Picker: Radio', 'unysonplus' ),
				'type' => 'radio',
				'choices' => [
					'phone' => __( 'Phone', 'unysonplus' ),
					'laptop' => __( 'Laptop', 'unysonplus' )
				],
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				)
			]
		],
		'choices' => [
			'phone' => [
				'price' => [
					'type' => 'text',
					'label' => __( 'Price', 'unysonplus' ),
				],
				'memory' => [
					'type' => 'select',
					'label' => __( 'Memory', 'unysonplus' ),
					'choices' => [
						'16' => __( '16Gb', 'unysonplus' ),
						'32' => __( '32Gb', 'unysonplus' ),
						'64' => __( '64Gb', 'unysonplus' ),
					]
				]
			],
			'laptop' => [
				'price' => [
					'type' => 'text',
					'label' => __( 'Price', 'unysonplus' ),
				],
				'webcam' => [
					'type' => 'switch',
					'label' => __( 'Webcam', 'unysonplus' ),
				]
			],
		],
		'show_borders' => false,
	],
];
```

## Multi Picker: Image Picker

<img src="/img/options/opt-demo_multi_picker_image_picker.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_multi_picker_image_picker' => [
		'type' => 'multi-picker',
		'label' => false,
		'desc' => false,
		'picker' => [
			'gadget' => [
				'label' => __( 'Multi Picker: Image Picker', 'unysonplus' ),
				'type' => 'image-picker',
				'choices' => [
					'phone' => [
						'label' => __( 'Phone', 'unysonplus' ),
						'small' => [
							'height' => 70,
							'src' => get_template_directory_uri() . '/images/image-picker-demo/thumb1.jpg'
						],
						'large' => [
							'height' => 214,
							'src' => get_template_directory_uri() . '/images/image-picker-demo/tooltip1.jpg'
						],
					],
					'laptop' => [
						'label' => __( 'Laptop', 'unysonplus' ),
						'small' => [
							'height' => 70,
							'src' => get_template_directory_uri() . '/images/image-picker-demo/thumb2.jpg'
						],
						'large' => [
							'height' => 214,
							'src' => get_template_directory_uri() . '/images/image-picker-demo/tooltip2.jpg'
						],
					]
				],
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				)
			]
		],
		'choices' => [
			'phone' => [
				'price' => [
					'type' => 'text',
					'label' => __( 'Price', 'unysonplus' ),
				],
				'memory' => [
					'type' => 'select',
					'label' => __( 'Memory', 'unysonplus' ),
					'choices' => [
						'16' => __( '16Gb', 'unysonplus' ),
						'32' => __( '32Gb', 'unysonplus' ),
						'64' => __( '64Gb', 'unysonplus' ),
					]
				]
			],
			'laptop' => [
				'price' => [
					'type' => 'text',
					'label' => __( 'Price', 'unysonplus' ),
				],
				'webcam' => [
					'type' => 'switch',
					'label' => __( 'Webcam', 'unysonplus' ),
				]
			],
		],
		'show_borders' => false,
	],
];
```

## Multi Picker: Switch

<img src="/img/options/opt-demo_multi_picker_switch.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_multi_picker_switch' => [
		'type' => 'multi-picker',
		'label' => false,
		'desc' => false,
		'picker' => [
			'gadget' => [
				'label' => __( 'Switch', 'unysonplus' ),
				'type' => 'switch',
				'right-choice' => [
					'value' => 'laptop',
					'label' => __( 'Laptop', 'unysonplus' )
				],
				'left-choice' => [
					'value' => 'phone',
					'label' => __( 'Phone', 'unysonplus' )
				],
				'value' => 'yes',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			]
		],
		'choices' => [
			'phone' => [
				'price' => [
					'type' => 'text',
					'label' => __( 'Price', 'unysonplus' ),
				],
				'memory' => [
					'type' => 'select',
					'label' => __( 'Memory', 'unysonplus' ),
					'choices' => [
						'16' => __( '16Gb', 'unysonplus' ),
						'32' => __( '32Gb', 'unysonplus' ),
						'64' => __( '64Gb', 'unysonplus' ),
					]
				]
			],
			'laptop' => [
				'price' => [
					'type' => 'text',
					'label' => __( 'Price', 'unysonplus' ),
				],
				'webcam' => [
					'type' => 'switch',
					'label' => __( 'Webcam', 'unysonplus' ),
				]
			],
		],
		'show_borders' => false,
	],
];
```

**Get database option value**

```php
$value = fw_get_db_..._option(
    'option_id/'. fw_get_db_..._option('option_id/'. 'gadget')
);
```

**Add support for new option type in picker**

If you want to use in `picker` an option type that is not supported by default (is not present in the examples above), follow the steps below. In this example, is added support for `icon` option type *(it is not practical, just for demonstration purposes)*.

1.  Add in `{theme}/inc/hooks.php`

    > ``` php
    > /**
    >  * Generate array( 'choice_id' => array( Choice Options ) )
    >  * @internal
    >  * @param array $choices
    >  * @param array $data
    >  * @return array
    >  */
    > function _filter_theme_option_type_multi_picker_choices_icon($choices, $data) {
    >     $choices = $data['option']['choices'];
    >
    >     // maybe check and remove invalid choices ...
    >
    >     return $choices;
    > }
    > add_filter(
    >     'fw_option_type_multi_picker_choices:icon',
    >     '_filter_theme_option_type_multi_picker_choices_icon',
    >     10, 2
    > );
    >
    > /**
    >  * @internal
    >  */
    > function _admin_theme_multi_picker_custom_picker_scripts() {
    >     wp_enqueue_script(
    >         'multi-picker-custom-pickers',
    >         get_template_directory_uri() . '/js/multi-picker-custom-pickers.js',
    >         array('fw-events'),
    >         false,
    >         true
    >     );
    > }
    > add_action(
    >     'admin_enqueue_scripts',
    >     '_admin_theme_multi_picker_custom_picker_scripts'
    > );
    > ```

2.  Add in `{theme}/js/multi-picker-custom-pickers.js`

    > ``` javascript
    > fwEvents.on('fw:option-type:multi-picker:init:icon', function(data){
    >     data.$pickerGroup.find('.fw-option-type-icon > input[type="hidden"]').on('change', function() {
    >         data.chooseGroup(
    >             this.value // this is `choice_id` from the `fw_option_type_multi_picker_choices:{type}` filter (above)
    >         );
    >     }).trigger('change');
    > });
    > ```

3.  Add in `{theme}/framework-customizations/theme/options/settings.php`

    > ``` php
    > $options = array(
    >
    >     'demo_multi_picker_icon' => array(
    >         'type' => 'multi-picker',
    >         'label' => false,
    >         'desc' => false,
    >         'picker' => array(
    >             'gadget' => array(
    >                 'label' => __( 'Multi Picker: Icon', 'unyson' ),
    >                 'type' => 'icon',
    >             )
    >         ),
    >         'choices' => array(
    >             'fa fa-btc' => array(
    >                 'price' => array(
    >                     'label' => __( 'Price', 'unyson' ),
    >                     'type' => 'slider',
    >                     'value' => 70,
    >                 ),
    >             ),
    >             'fa fa-viacoin' => array(
    >                 'price' => array(
    >                     'label' => __( 'Price', 'unyson' ),
    >                     'type' => 'slider',
    >                     'value' => 30
    >                 ),
    >             ),
    >         ),
    >     ),
    >
    > );
    > ```

4.  Open **Theme Settings** page and pick the Bitcoin or Viacoin icon.

## Dynamic Multi Picker

While basic set of pre-defined pickers is enough in most of the cases, you may want to move it somewhere up or down from the main multi picker block. You may even want to move the picker in another tab so that your options looks more clean. In this case, the possibility of **detaching** the picker for the multi picker will help you a lot.

The first step is to define your picker somewhere in the same **form** (we name that a **context**) Please note that the `select` here is not nested under a `multi` or other option. Also, it is important to note that the ID for the `select` here is `gadget`.

> ``` php
> $options = array(
>     'gadget' => array(
>         'type' => 'select',
>         'choices' => array(
>             'phone' => __('Phone', '{domain}'),
>             'laptop' => __('Laptop', '{domain}')
>         ),
>     ),
> );
>
> // In view.php
> $current_value = fw_akg('gadget', $atts);
> ```

Next, you would add the `multi-picker` body and **connect** it to that particular `select` with `gadget` ID.

> ``` php
> $options = array(
>     'gadget' => array(
>         'type' => 'select',
>         'choices' => array(
>             'phone' => __('Phone', '{domain}'),
>             'laptop' => __('Laptop', '{domain}')
>         ),
>     ),
>
>     'multi-picker' => array(
>         'type' => 'multi-picker',
>
>         // Here is the ID of our select
>         'picker' => 'gadget',
>
>         'choices' => array(
>             'phone' => array(
>                 'text' => array(
>                     'type' => 'text'
>                 )
>             ),
>
>             'laptop' => array(
>                 'text' => array(
>                     'type' => 'icon-v2'
>                 )
>             )
>         )
>     ),
>
>
> );
>
>
> // In view.php
> $current_value = fw_akg('gadget', $atts);
>
> $current_picker_value = fw_akg(
>     'multi-picker/' . $current_value . '/text',
>     $atts
> );
>
> fw_print($current_picker_value);
> ```

You would notice that the multi picker updates when that select changes.

You can even connect two (or three) multi pickers to the same picker.

> ``` php
> $options = array(
>     'gadget' => array(
>         'type' => 'select',
>         'choices' => array(
>             'phone' => __('Phone', '{domain}'),
>             'laptop' => __('Laptop', '{domain}')
>         ),
>     ),
>
>     'first-multi-picker' => array(
>         'type' => 'multi-picker',
>
>         // Here is the ID of our select
>         'picker' => 'gadget',
>
>         'choices' => array(
>             'phone' => array(
>                 // options for the first choice
>             ),
>
>             'laptop' => array(
>                 // options for the second choice
>             )
>         )
>     ),
>
>     'second-multi-picker' => array(
>         'type' => 'multi-picker',
>
>         // Here is the ID of our select
>         'picker' => 'gadget',
>
>         'choices' => array(
>             'phone' => array(
>                 // options for the first choice
>             ),
>
>             'laptop' => array(
>                 // options for the second choice
>             )
>         )
>     ),
> );
> ```

Enjoy!

## Reading the value

`multi-picker` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_multi_picker_select'];
$picked = $value['gadget'];        // the chosen value
$fields = $value[ $picked ] ?? array(); // its revealed sub-options
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_multi_picker_select' );
$picked = $value['gadget'];        // the chosen value
$fields = $value[ $picked ] ?? array(); // its revealed sub-options
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_multi_picker_select'];
$picked = $value['gadget'];        // the chosen value
$fields = $value[ $picked ] ?? array(); // its revealed sub-options
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_multi_picker_select' );
$picked = $value['gadget'];        // the chosen value
$fields = $value[ $picked ] ?? array(); // its revealed sub-options
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_multi_picker_select' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [preset] => custom
    [custom] => Array
        (
            [custom_height] => Array
                (
                    [value] => 480
                    [unit] => px
                )

        )

)
```
