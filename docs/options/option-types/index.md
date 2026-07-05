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
extending `FW_Option_Type`. For a **complete worked example** (the PHP class, the prefixed CSS, and
the `fw:options:init` JS), see **[Create an option type](/docs/options/create-option-type)**. The
conventions below are the rules that example follows.

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

All 54 built-in types, grouped by what they're for. Click any type for its reference and a
copy-pasteable example.

### Text & rich input

| Type | For |
| --- | --- |
| [`text`](./text.md) | A single-line text input |
| [`short-text`](./short-text.md) | A narrow text input |
| [`medium-text`](./medium-text.md) | A mid-width text input |
| [`textarea`](./textarea.md) | Multi-line plain text |
| [`password`](./password.md) | A masked text input |
| [`number`](./number.md) | A numeric input with min / max / step |
| [`unit-input`](./unit-input.md) | A number paired with a unit selector (px / rem / em / %) |
| [`code-editor`](./code-editor.md) | A syntax-highlighted code editor |
| [`wp-editor`](./wp-editor.md) | The WordPress rich-text (TinyMCE) editor |
| [`html`](./html.md) | Render arbitrary HTML in the form (no stored value) |
| [`hidden`](./hidden.md) | A stored value with no visible control |

### Choice

| Type | For |
| --- | --- |
| [`select`](./select.md) | A single-choice dropdown |
| [`short-select`](./short-select.md) | A narrow dropdown |
| [`select-multiple`](./select-multiple.md) | A multi-choice dropdown |
| [`multi-select`](./multi-select.md) | A tag-style multi-select (posts, terms, users, …) |
| [`radio`](./radio.md) | A single choice as radio buttons |
| [`radio-text`](./radio-text.md) | Radio buttons rendered as a segmented control |
| [`checkbox`](./checkbox.md) | A single on/off checkbox |
| [`checkboxes`](./checkboxes.md) | Multiple checkboxes |
| [`switch`](./switch.md) | An on/off toggle |
| [`image-picker`](./image-picker.md) | Choose one option by clicking an image swatch |

### Color

| Type | For |
| --- | --- |
| [`color-picker`](./color-picker.md) | A single solid color |
| [`rgba-color-picker`](./rgba-color-picker.md) | A color with alpha / opacity |
| [`predefined-colors`](./predefined-colors.md) | Pick from a fixed palette |
| [`predefined-colors-color-picker`](./predefined-colors-color-picker.md) | A palette preset or a custom color |
| [`predefined-colors-color-picker-compact`](./predefined-colors-color-picker-compact.md) | The compact preset-or-custom picker |
| [`gradient`](./gradient.md) | A two-stop gradient |
| [`gradient-v2`](./gradient-v2.md) | A multi-stop gradient with angle and type |

### Media & icons

| Type | For |
| --- | --- |
| [`upload`](./upload.md) | Upload or select one file from the Media Library |
| [`multi-upload`](./multi-upload.md) | Select multiple files / a gallery |
| [`background-image`](./background-image.md) | An image with position / repeat / size |
| [`background-pro`](./background-pro.md) | Full background: color + gradient + image + video layers |
| [`oembed`](./oembed.md) | Embed by URL (YouTube, Vimeo, …) |
| [`icon`](./icon.md) | Pick an icon (Font Awesome) |
| [`icon-v2`](./icon-v2.md) | Pick an icon from multiple packs, or upload a custom SVG |
| [`map`](./map.md) | A location picker returning coordinates + address |

### Typography, spacing & effects

| Type | For |
| --- | --- |
| [`typography`](./typography.md) | Font family / size / weight / style / line-height / color |
| [`typography-v2`](./typography-v2.md) | The modern typography control (+ Google Fonts) |
| [`spacing`](./spacing.md) | Margin / padding per side, with per-device overrides |
| [`box-shadow`](./box-shadow.md) | A box-shadow builder |

### Sliders & ranges

| Type | For |
| --- | --- |
| [`slider`](./slider.md) | A single-value slider |
| [`range-slider`](./range-slider.md) | A min / max range slider |

### Date & time

| Type | For |
| --- | --- |
| [`date-picker`](./date-picker.md) | Pick a date |
| [`datetime-picker`](./datetime-picker.md) | Pick a date and time |
| [`datetime-range`](./datetime-range.md) | Pick a start / end date-time range |

### Presets & pickers

| Type | For |
| --- | --- |
| [`button-presets`](./button-presets.md) | Manage reusable button-style presets |
| [`button-style-picker`](./button-style-picker.md) | Pick a button preset with a live preview |

### Composite & repeatable

| Type | For |
| --- | --- |
| [`multi`](./multi.md) | Group several options into one stored value |
| [`multi-picker`](./multi-picker.md) | Reveal different sub-options based on a picker choice |
| [`responsive`](./responsive.md) | Wrap any control to make it per-device (Phone / Tablet / Desktop) |
| [`popup`](./popup.md) | Edit a set of options inside a modal |
| [`popover`](./popover.md) | Edit options inside an inline popover panel |
| [`addable-option`](./addable-option.md) | A repeatable single option (add / remove rows) |
| [`addable-box`](./addable-box.md) | A repeatable group of options (add / remove boxes) |
| [`addable-popup`](./addable-popup.md) | Repeatable items, each edited in a popup |
