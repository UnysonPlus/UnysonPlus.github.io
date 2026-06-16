---
title: Option Types
slug: /options/option-types
---

# Option Types

Option types are the building blocks of every Unyson+ form — theme settings, meta boxes,
Customizer panels and shortcode options. The framework ships with many: text, textarea,
select, switch, color, typography, image/upload, gallery, spacing, gradient, box-shadow and
more. Every page below documents one type and the parameters it accepts.

Every option has a `type` parameter (required) — its value is the id of a registered option
type. Most options also accept a small set of base parameters:

- `label` *(string)* — the field label.
- `desc` *(string)* — a description shown under the label.
- `value` *(mixed)* — the default value.
- `attr` *(array)* — extra HTML attributes (placed on the input or wrapper, depending on the type).
- `help` *(string\|array)* — extra info shown in a help tip next to the option.

## Defining options

Options are declared as a PHP array. The array **key** is the option id (must be unique) and is
how you read the saved value back:

```php
$options = [
	'demo_text' => [
		'label' => __( 'Text', 'unysonplus' ),
		'type'  => 'text',
		'value' => 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem',
		'desc'  => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'unysonplus' ),
		'help'  => __( 'Help tip shown next to the option.', 'unysonplus' ),
	],
	'demo_accent' => [
		'label' => __( 'Accent color', 'unysonplus' ),
		'type'  => 'color-picker',
		'value' => '#2563eb',
	],
];
```

:::tip Reference: `demo.php`
Every code example in this section mirrors the live demo options in the parent theme at
`framework-customizations/theme/options/demo.php`. Copy a block from there to get a working,
copy-pasteable example of any option type.
:::

## Reading saved values

```php
<?php
// Theme settings
$accent = fw_get_db_settings_option( 'demo_accent' );

// Post meta (e.g. from a Custom Fields group or a meta box)
$text = fw_get_field( 'demo_text' );
```

## Conventions for custom option types

New option types live in `framework/includes/option-types/`. Each registers a class extending
`FW_Option_Type`. When you build one, follow these conventions:

### HTML

The main/wrapper element of every option type must carry the `.fw-option-type-{type}` class.

### CSS

Prefix every rule with `.fw-option-type-{type}` to prevent conflicts:

```css
/* correct */
.fw-option-type-demo .some-class { color: blue; }

/* wrong */
.some-class { color: blue; }
```

### JavaScript

All JavaScript must scope to the `.fw-option-type-{type}` element (no events attached to the
body). If an option type fires custom events, they are triggered on that element:

```javascript
// Listen for an option type's custom event
jQuery( '.fw-option-type-demo#fw-option-demo' )
	.on( 'fw:option-type:demo:custom-event', function ( event, data ) {
		console.log( data );
	} );
```

:::danger
Don't confuse `.fw-option-type-{type}` with `.fw-backend-option-type-{type}`, which is used
internally by the framework and must not be relied on in option-type scripts.
:::

See the existing option types in the plugin source for working examples, and the per-area
`AGENTS.md` notes for conventions.

## Built-in option types

Below is the complete list of built-in option types, each with its available parameters. Click
through for the reference and a copy-pasteable example.
