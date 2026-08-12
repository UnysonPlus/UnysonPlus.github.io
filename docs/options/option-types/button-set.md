---
title: "Button Set"
sidebar_position: 45.5
---

A segmented control: every choice is visible on one row, as connected buttons. It covers
**single** selection (radio semantics) and **multiple** selection (checkbox semantics) in one
option type.

It is a presentation alternative to [`radio`](./radio.md) and [`checkboxes`](./checkboxes.md) —
the stored value is identical, so an existing option can switch to `button-set` **without a data
migration**.

```php
$options = [
	'demo_button_set' => [
		'label' => __( 'Button Set', 'unysonplus' ),  // or false to hide the label column
		'type' => 'button-set',
		'value' => 'c2',
		'desc' => __( 'Segmented control. Same stored value as a radio, shown on one row.',
			'unysonplus' ),
		'choices' => [
			'c1' => __( 'Choice 1', 'unysonplus' ),
			'c2' => __( 'Choice 2', 'unysonplus' ),
			'c3' => __( 'Choice 3', 'unysonplus' ),
		],
		// — Optional attributes you can add —
		// 'multiple' => true,          // checkbox semantics; value becomes an array
		// 'stretch' => true,           // buttons share the row width evenly
		// 'show_labels' => false,      // icon-only buttons (label becomes the tooltip)
		// 'allow_deselect' => true,    // single mode: click the active button to clear it
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],
	],
];
```

## Options

| Key | Type | Default | What it does |
| --- | --- | --- | --- |
| `choices` | array | `[]` | `key => label`, or `key => [ 'label' => …, 'icon' => … ]` |
| `value` | string / array | `null` | The choice key, or `[ key => true ]` when `multiple` |
| `multiple` | bool | `false` | `false` = radio semantics, `true` = checkbox semantics |
| `stretch` | bool | `false` | Buttons share the row evenly instead of sizing to their content |
| `show_labels` | bool | `true` | `false` renders icon-only buttons |
| `allow_deselect` | bool | `false` | Single mode only — click the active button to clear the value |

### Icons

A choice can be a plain string, or an array with an icon class. The two forms can be mixed in the
same set:

```php
'choices' => [
	'left'   => [ 'label' => __( 'Left', 'unysonplus' ),   'icon' => 'dashicons dashicons-editor-alignleft' ],
	'center' => __( 'Center', 'unysonplus' ),
	'right'  => [ 'label' => __( 'Right', 'unysonplus' ),  'icon' => 'dashicons dashicons-editor-alignright' ],
],
```

With `'show_labels' => false` the buttons show only the icon, and the label becomes the button's
tooltip **and** its accessible name — so nothing is lost for screen readers. This is the usual
setup for alignment, heading-tag and layout pickers.

:::note Colors are not configurable
The control inherits `--wp-admin-theme-color` through the framework's `--fw-accent` token, so it
follows the admin color scheme **the user chose**. A per-option color would override that
preference and break consistency with the rest of the panel. If a theme genuinely needs a
different look, override the CSS custom property rather than adding an option key.
:::

## Accessibility

The control is built on native `<input type="radio">` / `<input type="checkbox">` elements with
the input visually hidden and its `<label>` styled as the button. Keyboard navigation, focus
rings, screen-reader group semantics and form serialization are all handled by the browser — there
is no JavaScript involved in selection, and no third-party library.

## Reading the value

### Single (default)

`button-set` returns the **choice key** as a string, exactly like [`radio`](./radio.md).

```php
// In a shortcode — values arrive as $atts in view.php
$value = $atts['demo_button_set'];   // e.g. 'c2'

// A per-page option (metabox)
$value = fw_get_db_post_option( get_the_ID(), 'demo_button_set' );

// A global option in Theme Settings
$value = fw_get_db_settings_option( 'demo_button_set' );

echo esc_html( $value );
```

When the field sits inside a **box/group**, read the group once and pick the field by key:

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_button_set'];
```

### Multiple

With `'multiple' => true` it returns an **array** in the same shape as
[`checkboxes`](./checkboxes.md) — only the selected keys are present, each set to `true`:

```php
$value = fw_get_db_settings_option( 'demo_button_set_multi' );

echo esc_html( implode( ', ', array_keys( $value ) ) ); // the selected keys

if ( ! empty( $value['header'] ) ) {
	// 'header' is selected
}
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_button_set' ) )` — single mode:

```text
c2
```

`fw_print( fw_get_db_settings_option( 'demo_button_set_multi' ) )` — multiple mode:

```text
Array
(
    [header] => 1
    [sidebar] => 1
)
```

With `'allow_deselect' => true` and nothing selected, single mode stores an empty string (`''`),
which is how an option expresses "no override".

## Migrating from `radio` or `checkboxes`

The value shapes match, so switching is a one-line change and existing saved values keep working:

```diff
 'align' => [
-	'type' => 'radio',
+	'type' => 'button-set',
 	'value' => 'center',
 	'choices' => [ 'left' => 'Left', 'center' => 'Center', 'right' => 'Right' ],
 ],
```

## See also

- [`radio`](./radio.md) — the same single-choice value, as a vertical list
- [`checkboxes`](./checkboxes.md) — the same multi-choice value, as a checkbox list
- [`switch`](./switch.md) — a two-state toggle with custom labels
- [`image-picker`](./image-picker.md) — choose one option by clicking an image swatch
