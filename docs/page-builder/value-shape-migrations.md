---
title: Migrating an option's value shape
sidebar_position: 5
---

# Migrating an option's value shape

When you change an existing option on an existing element — most often changing its **type** —
the value already saved on live pages no longer matches what the new option expects. If you do
nothing, old pages either mis-render or throw the blank **"error:"** modal described in
[the editor-load gotcha](./items-corrector.md#the-editor-load-gotcha).

The fix is a **two-sided migration**: a JS migrator in the element's `scripts.js` (for the
editor) and a mirrored PHP migrator (for the shortcode→builder and front-end paths). This page
walks through the canonical example: the **Section `min_height`** option, which went from a
`select` storing a plain string (`''`, `'40vh'`, `'600px'`…) to a `multi-picker` storing an
object.

## Why two migrators

| Path | Runs PHP `get_value_from_attributes()`? | Needs which migrator |
| --- | --- | --- |
| Opening the options modal in the builder | **No** — modal renders raw `atts` | **JS** (in `scripts.js`) |
| Shortcode → builder conversion | Yes | PHP |
| Front-end render | Yes | PHP (+ tolerant `view.php`) |

A PHP migrator alone leaves the **editor** broken; a JS migrator alone leaves **conversion and
front-end** broken. You need both.

## The JS migrator (editor)

In the element's `…/page-builder-<name>-item/static/js/scripts.js`, migrate the model's `atts`
inside `lazyInitModal()` **before** constructing the modal, then set it back on the model so a
save persists the upgraded shape:

```js
lazyInitModal: function () {
    // get_value_from_attributes (PHP) does NOT run on normal builder load — the
    // modal opens with raw saved atts — so migrate here or the multi-picker's PHP
    // render throws and the modal shows a blank "error:".
    this.model.set('atts', migrateSectionAtts(this.model.get('atts')));

    this.modal = new fw.OptionsModal({
        options: this.initOptions.modalOptions,
        values:  this.model.get('atts'),
        // …
    });
    // …
}
```

The migrator itself just normalizes the one changed field; array values (already migrated) pass
through untouched:

```js
function migrateSectionAtts (atts) {
    if (!_.isObject(atts)) { return atts; }
    if (_.has(atts, 'min_height') && !_.isObject(atts.min_height)) {
        atts = _.clone(atts);
        atts.min_height = migrateMinHeight(atts.min_height);
    }
    return atts;
}

function migrateMinHeight (v) {
    v = (v === null || typeof v === 'undefined') ? '' : String(v).replace(/^\s+|\s+$/g, '');
    if (v === '' || v === 'auto')                      { return {preset: 'auto'}; }
    if (['40vh','60vh','80vh','100vh'].indexOf(v) !== -1) { return {preset: v}; }
    var m = v.match(/^([0-9.]+)\s*([a-z%]+)$/i);
    return {preset: 'custom', custom: {custom_height: {
        value: m ? m[1] : v.replace(/[^0-9.]/g, ''),
        unit:  m ? m[2].toLowerCase() : 'px'
    }}};
}
```

## The PHP migrator (conversion + front end)

Mirror the exact same logic in `…/shortcodes/<name>/includes/migration.php`, guarded with
`function_exists()` so it can be shared by `view.php` and the page-builder item:

```php
function section_migrate_min_height( $value ) {
    if ( is_array( $value ) ) { return $value; }      // already migrated
    $v = trim( (string) $value );
    if ( $v === '' || $v === 'auto' ) { return array( 'preset' => 'auto' ); }
    if ( in_array( $v, array( '40vh','60vh','80vh','100vh' ), true ) ) {
        return array( 'preset' => $v );
    }
    if ( preg_match( '/^([0-9.]+)\s*([a-z%]+)$/i', $v, $m ) ) {
        $num = $m[1]; $unit = strtolower( $m[2] );
    } else {
        $num = preg_replace( '/[^0-9.]/', '', $v ); $unit = 'px';
    }
    return array( 'preset' => 'custom', 'custom' => array(
        'custom_height' => array( 'value' => $num, 'unit' => $unit ),
    ) );
}
```

## Keep `view.php` backward-compatible

The render guard means a bad shape won't wipe content, but the field still needs to *render*
correctly for not-yet-re-saved pages. Have `view.php` accept the legacy scalar as well as the new
shape (run it through the same PHP migrator, or branch on `is_array()`), so old and new pages both
display correctly.

## Checklist for any value-shape change

1. **JS migrator** in the item's `scripts.js`, applied in `lazyInitModal()` before the modal,
   with `model.set('atts', migrated)`.
2. **PHP migrator** in `includes/migration.php`, `function_exists()`-guarded.
3. **`view.php` tolerates the legacy value** (front-end render of un-re-saved pages).
4. Idempotent: already-migrated values pass through unchanged (so re-running is safe).

:::tip Non-destructive migration
Migrate *on read*, don't rewrite the database. The Section background migration
(`section_migrate_legacy_background()`) is a good model: it synthesizes the new
background-pro-shaped value from the old `background_color` / `background_image` / `video` /
`bg_color` atts at render and edit time, but leaves the stored legacy atts untouched until the
user re-saves. Old pages keep rendering identically; nothing is lost.
:::
