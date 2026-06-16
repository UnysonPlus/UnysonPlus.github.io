---
title: Option Types
slug: /options/option-types
---

# Option Types

Option types are the building blocks of Unyson+ settings, meta boxes, and shortcode
options. The framework ships with many — text, textarea, select, switch, color, typography,
image/upload, gallery, spacing, gradient, box-shadow, and more.

Every option has `type` as a required parameter. Its value should be an existing registered
option type.

## Defining options

Options are declared as a PHP array:

```php
<?php
$options = array(
    'heading' => array(
        'type'  => 'text',
        'label' => __( 'Heading', 'fw' ),
        'value' => 'Hello world',
    ),
    'accent' => array(
        'type'  => 'color-picker',
        'label' => __( 'Accent color', 'fw' ),
        'value' => '#ffcc00',
    ),
);
```

## Reading saved values

```php
<?php
// Theme settings
$accent = fw_get_db_settings_option( 'accent' );

// Post meta (e.g. from a Custom Fields group or a meta box)
$heading = fw_get_field( 'heading' );
```

## Adding a new option type

New option types live in `framework/includes/option-types/`. Each registers a class
extending `FW_Option_Type`. See the existing option types in the plugin source for working
examples, and the per-area `AGENTS.md` notes for conventions. When you build a custom option
type, follow the conventions below.

### HTML

All option types must have a `.fw-option-type-{type}` class on the main/wrapper html element.

### CSS

If the option type has css, all rules must be prefixed with the `.fw-option-type-{type}` class:

```css
/* correct */
.fw-option-type-demo .some-class {
    color: blue;
}

/* wrong */
.some-class {
    color: blue;
}
```

:::tip
This is done to prevent css conflicts.
:::

### JavaScript

All javascript must stick to the `.fw-option-type-{type}` class and work only within the
main/wrapper element (no events attached to the body). If the option type has custom
javascript events, those events must be triggered on the main element.

```javascript
$someInnerElement.closest('.fw-option-type-demo')
    .trigger('fw:option-type:demo:custom-event', {some: 'data'});
```

If it's specified in the documentation that an option type has custom events, it means that
you can attach event listeners on the elements with the `.fw-option-type-{type}` class (not on
body or `fwEvents`). Some events send data that can be accessed this way:

```php
jQuery('.fw-option-type-demo#fw-option-demo')
    .on('fw:option-type:demo:custom-event', function(event, data){
        console.log(data);
    });
```

:::danger
Do not confuse `.fw-option-type-{type}` with the `.fw-backend-option-type-{type}` class which
is used internally by the framework and should not be used in option type scripts.
:::

## Built-in option types

<iframe src="https://player.vimeo.com/video/105002864?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<br/><br/>

Here is a complete list of all built-in option types with all available parameters for each
option. Click through any type below for its reference and a copy-pasteable example.
