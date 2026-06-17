---
title: "Popover"
sidebar_position: 46
---

Collapses an option into a compact trigger that expands an in-flow panel on click. With a **single** inner option the value passes straight through; with **tabs** the value is a hash keyed by inner-option id.

## Popover

<img src="/img/options/opt-demo_popover.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_popover' => [
		'label'         => __( 'Popover', 'unysonplus' ),
		'type'          => 'popover',
		'value'         => 'a',
		'desc'          => __( 'Collapses an option into a compact trigger that expands an in-flow panel on click (like the color picker dropdown, but anchored inline — not the modal "popup" type). With a single inner option the value passes straight through, so it is a drop-in for that option without the inline clutter.', 'unysonplus' ),
		'help'          => __( 'Click the field to reveal the hosted control; pick a value and it collapses again, showing the selection. The "summary" map turns the saved value into the friendly label on the trigger.', 'unysonplus' ),
		// value => trigger label
		'summary'       => [
			'a' => __( 'Dots', 'unysonplus' ),
			'b' => __( 'Romb', 'unysonplus' ),
			'c' => __( 'Squares', 'unysonplus' ),
			'd' => __( 'Waves', 'unysonplus' ),
		],
		// One inner option → its value is the popover's value (passthrough).
		'inner-options' => [
			'pattern' => [
				'type'    => 'image-picker',
				'label'   => false,
				'value'   => 'a',
				'choices' => [
					'a' => get_template_directory_uri() . '/images/patterns/dots_pattern_preview.jpg',
					'b' => get_template_directory_uri() . '/images/patterns/romb_pattern_preview.jpg',
					'c' => get_template_directory_uri() . '/images/patterns/square_pattern_preview.jpg',
					'd' => get_template_directory_uri() . '/images/patterns/waves_pattern_preview.jpg',
				],
			],
		],
	],
];
```

## Popover (Tabs)

<img src="/img/options/opt-demo_popover_tabs.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_popover_tabs' => [
		'label'         => __( 'Popover (Tabs)', 'unysonplus' ),
		'type'          => 'popover',
		'trigger_label' => __( 'Edit settings…', 'unysonplus' ),
		'desc'          => __( 'A popover hosting several options organized into tabs (like Background Pro). Multiple options / tabs → the value is a hash keyed by inner option id; the tab grouping is purely visual. Option ids must be unique across all tabs.', 'unysonplus' ),
		'help'          => __( 'Click to open, switch tabs to reach each group of controls. The trigger keeps a static label here because there is no single value to summarise.', 'unysonplus' ),
		'tabs'          => [
			'content' => [
				'label'   => __( 'Content', 'unysonplus' ),
				'options' => [
					'title'    => [ 'type' => 'text', 'label' => __( 'Title', 'unysonplus' ), 'value' => '' ],
					'subtitle' => [ 'type' => 'text', 'label' => __( 'Subtitle', 'unysonplus' ), 'value' => '' ],
				],
			],
			'style' => [
				'label'   => __( 'Style', 'unysonplus' ),
				'options' => [
					'color' => [ 'type' => 'color-picker', 'label' => __( 'Color', 'unysonplus' ), 'value' => '#2271b1' ],
					'size'  => [
						'type'    => 'select',
						'label'   => __( 'Size', 'unysonplus' ),
						'value'   => 'md',
						'choices' => [
							'sm' => __( 'Small', 'unysonplus' ),
							'md' => __( 'Medium', 'unysonplus' ),
							'lg' => __( 'Large', 'unysonplus' ),
						],
					],
				],
			],
			'advanced' => [
				'label'   => __( 'Advanced', 'unysonplus' ),
				'options' => [
					'css_class' => [ 'type' => 'text', 'label' => __( 'CSS Class', 'unysonplus' ), 'value' => '' ],
				],
			],
		],
	],
];
```
