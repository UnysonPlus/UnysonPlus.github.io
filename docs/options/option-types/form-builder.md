---
title: "Form Builder"
sidebar_position: 62
slug: /options/option-types/form-builder
description: The Unyson+ form-builder option type — a form's fields, stored as a JSON item list.
---

# Form Builder

The fields of a form. Extends the base builder option type, and is used by the [`contact_form`](/shortcodes/components/contact-form) element.

## Stored value

```php
array( 'json' => '[ … items … ]' )   // a JSON *string* under one key
```

Each item:

```json
{
  "type": "text",
  "shortcode": "text_a1b2c3d",
  "width": "",
  "options": { "label": "Your name", "required": true, "placeholder": "", "info": "" }
}
```

The field's settings live under **`options`**, not flat on the item — the item views read `$item['options']['label']`.

`shortcode` is the field's identifier: submitted values are keyed by it. `get_value_from_items()` regenerates it whenever it is missing **or duplicated**, as `sanitize_key( type_with_underscores . '_' . 7 hex )`.

## Item types

Twelve ship with the forms extension: text, textarea, number, email, website, select, radio, checkboxes, file upload, form header title, honeypot and reCAPTCHA. Each declares its own option schema in its class.

Those schemas are `public function get_options()` on the item classes — widened from private so a renderer other than the page builder's can build a field editor from them.

## In Gutenberg blocks (the React control)

``form-builder`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `form-builder` control does

The form's fields as a list: add one from a type dropdown, expand it to edit its own settings, reorder, duplicate, remove.

:::caution[Every field needs a UNIQUE `shortcode`]
`shortcode` is the field's identifier — submitted values are keyed by it. `get_value_from_items()` regenerates it whenever it is missing **or duplicated**.

Nothing regenerates anything on the block path, so two fields sharing one would collide and a field's submissions would vanish: no error, on a form, which is the worst place for a silent failure. The control mints them in PHP's own format and never duplicates one when cloning a field.
:::

:::note[The field's settings live under an `options` key]
An item is `{ type, shortcode, width, options: { label, required, … } }` — **not** flat. The item views read `$item['options']['label']`, and a flat item renders a field with no label while warning on every access.

That is not visible in the option schema; it comes from the item views and from the default form the element seeds. Rendering one was the only way to find it.
:::

:::note[Item schemas come from PHP classes]
Each item type's options live in a class rather than in the option array, so the Gutenberg bridge resolves them and attaches them as `item_types`. That is why a text field offers its constraints and a select offers its choices without this control knowing anything about either.
:::

:::note[Field widths stay in the page builder]
The builder lays fields out on a grid; a sidebar column is not one, and a width picker there would be guesswork. Widths already set are preserved untouched.
:::
