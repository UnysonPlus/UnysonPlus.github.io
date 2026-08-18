---
title: "Popover"
sidebar_position: 46
slug: /options/option-types/popover
---

Collapses an option into a compact trigger that expands an in-flow panel on click. With a **single** inner option the value passes straight through; with **tabs** the value is a hash keyed by inner-option id.

:::tip[Building a preset preview picker?]
To make a compact popover that previews **presets** (like the Section’s Background Pattern), see [Preset preview pickers](./preset-preview-pickers.md).
:::

## Popover

<img src="/img/options/opt-demo_popover.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_popover' => [
		'label' => __( 'Popover', 'unysonplus' ),
		'type' => 'popover',
		'value' => 'a',
		'desc' => __( 'Collapses an option into a compact trigger that expands an in-flow panel on click (like the color picker dropdown, but anchored inline — not the modal "popup" type). With a single inner option the value passes straight through, so it is a drop-in for that option without the inline clutter.', 'unysonplus' ),
		'help' => __( 'Click the field to reveal the hosted control; pick a value and it collapses again, showing the selection. The "summary" map turns the saved value into the friendly label on the trigger.', 'unysonplus' ),
		// value => trigger label
		'summary' => [
			'a' => __( 'Dots', 'unysonplus' ),
			'b' => __( 'Romb', 'unysonplus' ),
			'c' => __( 'Squares', 'unysonplus' ),
			'd' => __( 'Waves', 'unysonplus' ),
		],
		// One inner option → its value is the popover's value (passthrough).
		'inner-options' => [
			'pattern' => [
				'type' => 'image-picker',
				'label' => false,
				'value' => 'a',
				'choices' => [
					'a' => get_template_directory_uri() . '/images/patterns/dots_pattern_preview.jpg',
					'b' => get_template_directory_uri() . '/images/patterns/romb_pattern_preview.jpg',
					'c' => get_template_directory_uri() . '/images/patterns/square_pattern_preview.jpg',
					'd' => get_template_directory_uri() . '/images/patterns/waves_pattern_preview.jpg',
				],
			],
		],
		// — Optional attributes you can add —
		// 'summary_key' => '',
		// 'reflect' => null,
		// 'autoclose' => null,
	],
];
```

## Popover (Tabs)

<img src="/img/options/opt-demo_popover_tabs.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_popover_tabs' => [
		'label' => __( 'Popover (Tabs)', 'unysonplus' ),
		'type' => 'popover',
		'trigger_label' => __( 'Edit settings…', 'unysonplus' ),
		'desc' => __( 'A popover hosting several options organized into tabs (like Background Pro). Multiple options / tabs → the value is a hash keyed by inner option id; the tab grouping is purely visual. Option ids must be unique across all tabs.', 'unysonplus' ),
		'help' => __( 'Click to open, switch tabs to reach each group of controls. The trigger keeps a static label here because there is no single value to summarise.', 'unysonplus' ),
		'tabs' => [
			'content' => [
				'label' => __( 'Content', 'unysonplus' ),
				'options' => [
					'title' => [ 'type' => 'text', 'label' => __( 'Title', 'unysonplus' ), 'value' => '' ],
					'subtitle' => [ 'type' => 'text', 'label' => __( 'Subtitle', 'unysonplus' ), 'value' => '' ],
				],
			],
			'style' => [
				'label' => __( 'Style', 'unysonplus' ),
				'options' => [
					'color' => [ 'type' => 'color-picker', 'label' => __( 'Color', 'unysonplus' ), 'value' => '#2271b1' ],
					'size' => [
						'type' => 'select',
						'label' => __( 'Size', 'unysonplus' ),
						'value' => 'md',
						'choices' => [
							'sm' => __( 'Small', 'unysonplus' ),
							'md' => __( 'Medium', 'unysonplus' ),
							'lg' => __( 'Large', 'unysonplus' ),
						],
					],
				],
			],
			'advanced' => [
				'label' => __( 'Advanced', 'unysonplus' ),
				'options' => [
					'css_class' => [ 'type' => 'text', 'label' => __( 'CSS Class', 'unysonplus' ), 'value' => '' ],
				],
			],
		],
	],
];
```

## Reading the value

`popover` returns a **string** — output it directly.

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
echo esc_html( $atts['demo_popover'] );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_popover' );
echo esc_html( $value );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book = fw_get_db_post_option( get_the_ID(), 'book' );
echo esc_html( $book['demo_popover'] );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_popover' );
echo esc_html( $value );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_popover' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [width] => Array
        (
            [value] => 320
            [unit] => px
        )

)
```

## In Gutenberg blocks (the React control)

`popover` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](../text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `popover` control does

The inner options, rendered **inline** rather than behind a trigger — the same reasoning as the repeaters: a floating panel launched from a narrow sidebar covers the very preview you are editing against.

:::caution[The stored shape depends on how many inner options there are]
This is the detail that decides whether a popover works at all:

- **One** inner option — the popover's value **is** that option's value, stored unwrapped. A schema declaring `[ 'fx' => … ]` stores `'left'`, not `[ 'fx' => 'left' ]`.
- **Two or more** — a hash keyed by inner id, like `multi`.

`_get_value_from_input()` branches on exactly that count. A control that always wrapped — or never did — would produce a value the element's view cannot read, and for the single-option case, which is most of them, the symptom is a setting that silently reverts.

Both shapes are asserted in the parity suite so the branch cannot be tidied away.
:::

:::note[Inner options come from two places]
`inner-options` and `tabs[].options` are merged, in that order, exactly as `collect_definitions()` does. A schema may use either or both.
:::

:::note[The label is borrowed when the inner option has none]
A popover usually carries the human-readable label while its lone inner option sets `label => false`. The control uses the popover's label in that case, rather than rendering a field with no name.
:::
