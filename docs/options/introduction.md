---
title: "Introduction"
sidebar_position: 1
---


<iframe src="https://player.vimeo.com/video/115152971?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<br><br>

## Introduction

**Options** are intended for creating form fields representing different kind of data e.g. rich and plain text, icons, media content, fonts and more. With options you can easily create tabs, boxes and form inputs for the admin pages. You just build an array and it will be transformed to html. On form submit, values will be saved into the database, and you will be able to access them anywhere you want using `fw_get_db_..._option()` [helper functions](/helpers/php).

For advanced users, this is an easy way to create form inputs and use them for various purposes. The simplest options array looks something like this:

```php
$options = array(
    'option_id' => array(
        'type' => 'text'
    )
);
```

This will generate a text input. The array key is used as option id, it should be unique. Values in the database will be stored as `array('option_id' => 'value')`.

:::note
The only required parameter for any option is `type`.
:::

All options have some base parameters:

- `label` *(string)* Label
- `desc` *(string)* Description
- `value` *(mixed)* Default value
- `attr` *(array)* HTML attributes *(some options will place these attributes in input, other in wrapper div)*
- `help` *(string\|array)* Additional info about option. This will generate an ![help-tip](/img/legacy/help-tip.png) next to option that will show the text in a tip popup.

Some options can have additional (optional) parameters. A better customized option will look like this:

```php
$options = array(
    'option_id' => array(
        'type'  => 'text',
        'value' => 'Default value',
        'label' => __('Option Label', '{domain}'),
        'desc'  => __('Option Description', '{domain}'),
        'attr'  => array('class' => 'custom-class', 'data-foo' => 'bar'),
        'help'  => __('Some html that will appear in tip popup', '{domain}'),
    )
);
```

You can test the above array by creating any of the below options file and placing the array in it.

## Options files

These are the main places where options are used:

- **Theme Settings Page**: Loads the options from `{theme}/framework-customizations/theme/options/settings.php`
- **Customizer Page**: Loads the options from `{theme}/framework-customizations/theme/options/customizer.php`
- **Post Add/Edit Page**: Loads the options from `{theme}/framework-customizations/theme/options/posts/{$post_type}.php`
- **Taxonomy Term Edit Page**: Loads the options from `{theme}/framework-customizations/theme/options/taxonomies/{$taxonomy}.php`

## Containers

<iframe src="https://player.vimeo.com/video/116053617?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<br><br>

Options that have no value and contain other options in the `options` parameter are containers. If an option has the `options` parameter, it is considered a container.

The simplest container option array looks as in the below example and will generate an empty metabox without title:

```php
$options = array(
    array(
        'type'    => 'box',
        'options' => array()
    )
);
```

:::note
Like options, containers have a minimum set of required parameters: `type` and `options`. The `type` parameter in Customizer options is optional and it's not used (has no effect).
:::

There are 4 built-in container types:

- `box` - WordPress metabox

  > ``` php
  > 'box_id' => array(
  >     'type' => 'box',
  >     'options' => array(
  >         'option_id'  => array( 'type' => 'text' ),
  >     ),
  >     'title' => __('Box Title', '{domain}'),
  >     'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
  >
  >     /**
  >      * When used in Post Options on the first array level
  >      * the ``box`` container accepts additional parameters
  >      */
  >     //'context' => 'normal|advanced|side',
  >     //'priority' => 'default|high|core|low',
  > ),
  > ```

- `tab` - One tab *(Tabs from the same array level will be collected and rendered as multiple tabs)*

  > ``` php
  > 'tab_id' => array(
  >     'type' => 'tab',
  >     'options' => array(
  >         'option_id'  => array( 'type' => 'text' ),
  >     ),
  >     'title' => __('Tab Title', '{domain}'),
  >     'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
  > ),
  > 'tab_id_2' => array(
  >     'type' => 'tab',
  >     'options' => array(
  >         'option_id_2'  => array( 'type' => 'text' ),
  >     ),
  >     'title' => __('Tab Title #2', '{domain}'),
  >     'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
  > ),
  > ```

- `group` - Group options into a wrapper div. Usually used to visually box related options (and to show/hide a group from javascript). Supports two optional presentational parameters, rendered only when set:
  - `title` — a heading shown at the top of the group box (plain text, escaped).
  - `desc` — a short note under the title (limited inline HTML allowed, e.g. `<strong>`).

  > ``` php
  > 'group_id' => array(
  >     'type'    => 'group',
  >     'title'   => __( 'Section Title', 'your-textdomain' ), // optional heading
  >     'desc'    => __( 'A short note for this section.', 'your-textdomain' ), // optional note
  >     'options' => array(
  >         'option_id'  => array( 'type' => 'text' ),
  >     ),
  >     'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
  > ),
  > ```

- `column` - Lay options out side by side. Two or more `column` containers placed next to each other
  form one row of columns; each keeps its options' values flat, exactly as if the column weren't there,
  so options can be wrapped in columns (or taken out again) without touching saved data.

  > ``` php
  > 'main' => array(
  >     'type'    => 'column',
  >     'width'   => '3/5',            // its share of the row; columns without a width share the rest
  >     'options' => array(
  >         'option_id' => array( 'type' => 'text' ),
  >     ),
  > ),
  > 'side' => array(
  >     'type'        => 'column',
  >     'width'       => '2/5',
  >     'sticky'      => true,         // stays in view while the other column scrolls
  >     'stack_first' => true,         // leads when the row is stacked
  >     'options'     => array(
  >         'preview_id' => array( 'type' => 'text' ),
  >     ),
  > ),
  > ```

  The row turns into columns only when it is at least **960 px** wide (set `stack_below` on the first
  column to change that); narrower — a small modal, a small screen, the Live Editor's side panel — the
  columns stack one under another. See [Columns](#columns) below.

- `popup` - A button, when clicked it will open a modal with options

  > ``` php
  > 'popup_id' => array(
  >     'type' => 'popup',
  >     'options' => array(
  >         'option_id'  => array( 'type' => 'text' ),
  >     ),
  >     'title' => __('Button and Popup Title', '{domain}'),
  >     'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
  >     'modal-size' => 'small', // small, medium, large, full
  >     'desc' => __('Button Description', '{domain}'),
  > ),
  > ```

## Columns

The `column` container is for forms with room to spare — mostly the **`full`** shortcode popup size,
where one long column of options would stretch across the whole window. The Motion Gallery's Design tab
uses it to put the design picker and its controls on the left and a live preview on the right, pinned in
view while the controls scroll:

<img src="/img/options/column-container.png" alt="The Motion Gallery's options in a full-size popup: the design's controls in a column on the left, the live preview in a pinned column on the right" width="1860" />

| Setting | On | What it does |
|---|---|---|
| `width` | each column | Its share of the row as a fraction, `"3/5"`, `"1/3"` (the same strings the `column-split` option type stores). Columns without one share the rest equally. |
| `sticky` | each column | Keeps the column in view while the row scrolls — a preview beside long controls. Side by side only, unless the column is also `stack_first`. |
| `stack_first` | each column | When the row is stacked, this column comes first (and, if sticky, stays pinned at the top). |
| `stack_below` | the first column | The row's width in px under which the columns stack. Default `960`. It is measured on the row itself, not the window. |
| `attr` | each column | Extra HTML attributes for the column's wrapper (a `class` is added to its own). |

Limits: columns are laid out with a container query, so the browser must support CSS container queries
(every current browser does). A single `column` on its own is just a full-width block. Columns can hold
any options, including other containers, but not tabs that are meant to be top-level.

## Restrictions

Here are some restrictions to keep in mind:

- `attr` parameter from **Post Options** first level `box` containers, is not used. Because boxes are added with [add_meta_box()](http://codex.wordpress.org/Function_Reference/add_meta_box#Parameters) which has no parameter for specifying attributes.

:::note
There are no restrictions (except Customizer) for what options are contained in the `options` parameter. It's possible to create multi level options: boxes inside boxes, tabs inside boxes, tabs inside tabs, and so on.
:::
