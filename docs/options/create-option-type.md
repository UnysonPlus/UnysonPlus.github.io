---
title: "Create Option Type"
sidebar_position: 6
---


# Create an option type

To define a new option type, create a class that extends `FW_Option_Type` and register it. An option
type is responsible for **rendering** its control, **reading** a safe value back from the submitted
form, and declaring its **defaults**.

## The four methods you implement

A custom option type overrides four methods (a fifth is optional):

| Method | Runs when | Does |
| --- | --- | --- |
| `get_type()` | always | Returns the type id (the string you put in `'type' => '…'`). |
| `_get_defaults()` | when an option is normalized | Returns default config merged into every option of this type, at minimum a `value`. |
| `_render( $id, $option, $data )` | rendering the form | Returns the control's HTML. `$data['value']` is the current value; the wrapper element must carry the `.fw-option-type-{type}` class. |
| `_get_value_from_input( $option, $input_value )` | saving | Returns a clean, safe value to store. `$input_value` is `null` when nothing was submitted, return the default then. |
| `_enqueue_static( $id, $option, $data )` | rendering (optional) | Enqueue the type's CSS/JS. |

The value round-trips through your type: `_get_value_from_input()` sanitizes what the form posts, the
stored value comes back as `$data['value']` in `_render()`, and your CSS/JS are scoped to the
`.fw-option-type-{type}` wrapper so they never collide with other options.

Below is a complete worked example, a text input with a "Clear" button.

:::note
It doesn't matter where you place your new option type. If you use the Theme Includes directory structure, place it in the `{theme}/inc/includes/option-types/my-option/` directory and include it on `fw_option_types_init` action:

```php
// file: {theme}/inc/hooks.php

/** @internal */
function _action_theme_include_custom_option_types() {
    require_once dirname(__FILE__) . '/includes/option-types/new/class-fw-option-type-new.php';
}
add_action('fw_option_types_init', '_action_theme_include_custom_option_types');
```
:::

```php
class FW_Option_Type_New extends FW_Option_Type
{
    public function get_type()
    {
        return 'new';
    }

    /**
     * @internal
     */
    protected function _enqueue_static($id, $option, $data)
    {
        $uri = get_template_directory_uri() .'/inc/includes/option-types/'. $this->get_type() .'/static';

        wp_enqueue_style(
            'fw-option-'. $this->get_type(),
            $uri .'/css/styles.css'
        );

        wp_enqueue_script(
            'fw-option-'. $this->get_type(),
            $uri .'/js/scripts.js',
            array('fw-events', 'jquery')
        );
    }

    /**
     * @internal
     */
    protected function _render($id, $option, $data)
    {
        /**
         * $data['value'] contains correct value returned by the _get_value_from_input()
         * You decide how to use it in html
         */
        $option['attr']['value'] = (string)$data['value'];

        /**
         * $option['attr'] contains all attributes.
         *
         * Main (wrapper) option html element should have "id" and "class" attribute.
         *
         * All option types should have in main element the class "fw-option-type-{$type}".
         * Every javascript and css in that option should use that class.
         *
         * Remaining attributes you can:
         *  1. use them all in main element (if option itself has no input elements)
         *  2. use them in input element (if option has input element that contains option value)
         *
         * In this case you will use second option.
         */

        $wrapper_attr = array(
            'id'    => $option['attr']['id'],
            'class' => $option['attr']['class'],
        );

        unset(
            $option['attr']['id'],
            $option['attr']['class']
        );

        $html  = '<div '. fw_attr_to_html($wrapper_attr) .'>';
        $html .= '<input '. fw_attr_to_html($option['attr']) .' type="text" />';
        $html .= '<button type="button" class="button">'. __('Clear text', '{domain}') .'</button>';
        $html .= '</div>';

        return $html;
    }

    /**
     * @internal
     */
    protected function _get_value_from_input($option, $input_value)
    {
        /**
         * In this method you receive $input_value (from form submit or whatever)
         * and must return correct and safe value that will be stored in database.
         *
         * $input_value can be null.
         * In this case you should return default value from $option['value']
         */

        if (is_null($input_value)) {
            $input_value = $option['value'];
        }

        return (string)$input_value;
    }

    /**
     * @internal
     */
    protected function _get_defaults()
    {
        /**
         * These are default parameters that will be merged with option array.
         * They makes possible that any option has
         * only one required parameter array('type' => 'new').
         */

        return array(
            'value' => ''
        );
    }
}

FW_Option_Type::register('FW_Option_Type_New');
```

```css
/**
 * Prefix (namespace) all css rules with ".fw-option-type-{$option_type}"
 * This guarantees that there will be no conflicts with other styles.
 */

.fw-option-type-new input {
    background-color: green;
    color: white;
}

.fw-option-type-new button {
    display: block;
}
```

```js
jQuery(document).ready(function ($) {
    var optionTypeClass = '.fw-option-type-new';

    /**
     * Listen to special event that is triggered for uninitialized elements
     */
    fwEvents.on('fw:options:init', function (data) {
        /**
         * data.$elements are jQuery selected elements
         * that contains options html that needs to be initialized
         *
         * Find uninitialized options by main class
         */
        var $options = data.$elements.find(optionTypeClass +':not(.initialized)');

        /**
         * Listen for button click and clear input value
         */
        $options.on('click', 'button', function(){
            $(this).closest(optionTypeClass).find('input').val('');
        });

        /**
         * After everything has done, mark options as initialized
         */
        $options.addClass('initialized');
    });
});
```

## Option Width

There are three width types:

- **auto** - dynamically adapted to the contents of the option.
- **fixed** - fixed size (it doesn't matter what size, it's just fixed).
- **full** - full available width (100%).

Every option has its own width type specified in `FW_Option_Type::_get_backend_width_type()`.

## Going further

Once the basics work, the base class offers more to override:

- **Server-side validation** — implement `_get_value_error( $option, $input_value )` (return an error
  string or `null`), or hook the `fw_option_value_error` filter, to reject invalid input on save.
- **Dynamic Content** — add `'dynamic_content' => true` to `_get_defaults()` to give a text-like type
  the `{{token}}` picker (see [Dynamic Content](/docs/dynamic-content)).
- **Custom storage** — override `_storage_load()` / `_storage_save()` when the value needs to be
  transformed on its way to/from the database (e.g. resolving an attachment id to a URL).

:::danger
Don't confuse `.fw-option-type-{type}` (your wrapper class, used by your CSS/JS) with
`.fw-backend-option-type-{type}`, which is used internally by the framework and must not be targeted
from an option type's scripts.
:::
