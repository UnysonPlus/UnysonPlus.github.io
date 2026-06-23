---
title: The items corrector & editor-load gotcha
sidebar_position: 4
---

# The items corrector & the editor-load gotcha

Two related mechanisms live here: the **items corrector**, which turns a loose tree into a valid
grid at render time, and the **editor-load path**, which is where the single most common
extension bug comes from. They're documented together because the bug is a direct consequence of
*when* each one runs.

## The items corrector

`_Page_Builder_Items_Corrector` (in `…/includes/items-corrector/`) is run by
`json_to_shortcodes()` before the shortcode string is generated. Its job is to guarantee a valid
**section → row → column → element** grid no matter how loosely the user (or an importer) arranged
things.

### What it does

- **Wraps loose simple elements.** A bare element with no surrounding column/row/section becomes
  `section → row → column → element`. At the root, consecutive loose elements are gathered into
  one **auto-generated** section (`atts.auto_generated = true`).
- **Groups columns into rows.** Consecutive `column` items are accumulated into a `row`. In the
  default (Bootstrap 5) mode every column of a section stays in one `.fw-row` and CSS flex-wrap
  handles the visual wrapping; in legacy mode the corrector splits columns into multiple rows once
  their widths exceed 12/12. See [Column widths](./column-widths.md).
- **Handles nested columns.** A column whose `_items` contain child columns gets an inner row
  synthesized around them (`correct_nested_columns()`), recursing to any depth.
- **Handles the Container element.** When a section contains a `container` item, the section's own
  loose rows are wrapped into a default `.fw-container` so user Container elements sit beside it
  as siblings (never nested), and the section view is flagged (`has_inner_containers`) to skip its
  own container wrapper.

### When it runs (and when it doesn't)

Correction runs only when `section`, `row` **and** `column` item types are all registered and
no explicit disable config is set (`needs_correction()`). It is **skipped** for single-item
re-renders such as the Live Editor refreshing one column — that path runs only
`normalize_nested_columns()` so nested columns still alias correctly. The whole decision is
filterable via `fw:ext:page-builder:json-structure-needs-correction`.

## The editor-load gotcha

Here is the trap that bites anyone who changes an existing option on an existing element.

### `get_value_from_attributes()` does NOT run on normal editor load

`Page_Builder_Simple_Item::get_value_from_attributes()` is the PHP method that re-derives an
element's option values (filling defaults, refreshing auto-generated values). It runs during:

- **shortcode → builder conversion** (the items-corrector path), and
- **front-end render**.

It does **not** run when you simply open an element's options modal in the builder. The modal is
constructed straight from the raw saved `atts`:

```js
// in each item's static/js/scripts.js
this.modal = new fw.OptionsModal({
    options: this.initOptions.modalOptions,
    values:  this.model.get('atts'),   // ← RAW saved atts, no PHP migration
});
```

### Why that breaks pre-existing items

Suppose you convert an existing option from a scalar (say a `select` storing a string) to a
`multi-picker` (which stores an array). For a **newly added** element everything is fine — the
default value is already the new array shape. But a **pre-existing** element still has the old
**string** saved. When its modal opens, that string reaches the multi-picker's PHP `_render()`,
which does `$value['preset']` on a string → *illegal string offset* → the options-render AJAX
corrupts → the modal shows a blank **"error:"**.

The tell-tale symptom: **only old items error; newly-added ones are fine.**

:::caution The fix is JS-side, in the item's `scripts.js`
Because the modal renders raw atts, a PHP migration in `get_value_from_attributes()` alone does
**not** fix the editor — you must migrate the value **in the item's `scripts.js` before the modal
opens**, and `this.model.set('atts', migrated)` so a save persists the new shape. Keep the PHP
migrator too (it covers the shortcode→builder and front-end paths). The canonical worked example
is the Section's `min_height` migration — see
[Migrating an option's value shape](./value-shape-migrations.md).
:::

### The resilience guard

Even with migrations in place, a value-shape mismatch on the **render** path used to be
catastrophic: one option throwing inside `get_value_from_attributes()` aborted the *entire*
conversion, the item loaded with **empty `atts`**, and if the page was then saved, the user's real
content was silently overwritten with nothing.

That re-derivation is now wrapped in a guard:

```php
try {
    $attributes['atts'] = fw_get_options_values_from_input( $options, array() );
} catch ( \Throwable $e ) {
    // Fall back to the raw saved atts: a shape change can at worst mis-render
    // a single field, never wipe the whole item.
    unset( $e );
}
```

:::note A safety net, not a substitute for migration
The guard prevents data loss, but a mis-shaped value still **mis-renders** until you migrate it.
Changing an existing option's type is a breaking value-shape change — add the JS + PHP migrators
**and** keep the consuming `view.php` tolerant of the legacy value, so the field renders
correctly rather than merely surviving.
:::
